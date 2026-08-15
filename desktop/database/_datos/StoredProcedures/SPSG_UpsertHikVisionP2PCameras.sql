--SPSG_UpsertHikVisionP2PCameras
CREATE OR ALTER PROCEDURE [dbo].[SPSG_UpsertHikVisionP2PCameras]
    @AppKey VARCHAR(100),
    @AppSecret VARCHAR(100),
    @CamerasJsonArray NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @SiteId INT;
    DECLARE @ErrorMsg NVARCHAR(500);
    DECLARE @ProcessedCount INT = 0;
    
    -- 1. Buscar SiteId por AppKey + AppSecret
    SELECT @SiteId = hps_idKey 
		FROM [dbo].[HikVisionP2PSites] 
    WHERE hps_cAppKey = @AppKey 
      AND hps_cAppSecret = @AppSecret 
      AND hps_bIsActive = 1;
    
    -- 2. Validar que existe la combinación
    IF @SiteId IS NULL
    BEGIN
        SET @ErrorMsg = 'AppKey/AppSecret no encontrado o inactivo: ' + @AppKey;
        RAISERROR(@ErrorMsg, 16, 1);
        RETURN;
    END
    
    -- 3. Iniciar transacción solo cuando vamos a modificar datos
    BEGIN TRANSACTION;
    
    BEGIN TRY
        -- 4. MERGE masivo con datos de API
        MERGE [dbo].[HikVisionP2PCameras] AS target
        USING (
            SELECT 
                @SiteId AS SiteId,
                deviceSerial,
                channelNo,
                channelName,
                status,
                isShared,
                CASE WHEN isEncrypt = 1 THEN 1 ELSE 0 END AS isEncrypt
            FROM OPENJSON(@CamerasJsonArray) 
            WITH (
                deviceSerial VARCHAR(50),
                channelNo INT,
                channelName NVARCHAR(255),
                status INT,
                isShared VARCHAR(10),
                isEncrypt INT
            )
        ) AS source ON target.hpc_iSiteId = source.SiteId
                   AND target.hpc_cDeviceSerial = source.deviceSerial 
                   AND target.hpc_iChannelNo = source.channelNo
        WHEN MATCHED THEN
            UPDATE SET 
                hpc_cChannelName = source.channelName,
                hpc_iStatus = source.status,
                hpc_cIsShared = source.isShared,
                hpc_bIsEncrypt = source.isEncrypt,
                hpc_bIsDeleted = 0,
                hpc_tLastUpdated = GETDATE()
        WHEN NOT MATCHED BY TARGET THEN
            INSERT (hpc_iSiteId, hpc_cDeviceSerial, hpc_iChannelNo, hpc_cChannelName, 
                    hpc_iStatus, hpc_cIsShared, hpc_bIsEncrypt, hpc_bIsDeleted)
            VALUES (source.SiteId, source.deviceSerial, source.channelNo, source.channelName,
                    source.status, source.isShared, source.isEncrypt, 0)
        WHEN NOT MATCHED BY SOURCE AND target.hpc_iSiteId = @SiteId AND target.hpc_bIsDeleted = 0 THEN
            UPDATE SET hpc_bIsDeleted = 1, hpc_tLastUpdated = GETDATE();
        
        SET @ProcessedCount = @@ROWCOUNT;
        
        -- 5. Actualizar fecha de sincronización del site
        UPDATE [dbo].[HikVisionP2PSites] 
        SET hps_tLastSyncDate = GETDATE()
        WHERE hps_idKey = @SiteId;
        
        -- 6. Log de estadísticas
        RAISERROR('Sync completado - SiteId: %d, Registros procesados: %d', 0, 1, @SiteId, @ProcessedCount);
        
        COMMIT TRANSACTION;
    END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		IF ERROR_NUMBER() = 2627
		BEGIN
			PRINT 'Handling PK violation...';
		END;
		ELSE IF ERROR_NUMBER() = 547
		BEGIN
			PRINT 'Handling CHECK/FK constraint violation...';
		END;
		ELSE IF ERROR_NUMBER() = 515
		BEGIN
			PRINT 'Handling NULL violation...';
		END;
		ELSE IF ERROR_NUMBER() = 245
		BEGIN
			PRINT 'Handling conversion error...';
		END;
		ELSE
		BEGIN
			PRINT 'Re-throwing error...';
		END;

		PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
		PRINT 'Error Message : ' + ERROR_MESSAGE();
		PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
		PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
		PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
		PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
	END CATCH
END