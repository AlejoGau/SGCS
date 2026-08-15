CREATE OR ALTER TRIGGER [dbo].[trg_UpdateVehicle]
ON [dbo].[m_usuarios]
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(Max) = ''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [trg_UpdateVehicle] | Inicio'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

    DECLARE @json NVARCHAR(MAX), @OwnerId INT;

	Declare cUpdate CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY For 
    SELECT usu_cmetadata, usu_idkey 
    FROM inserted
    WHERE ISJSON(usu_cmetadata) = 1;

    OPEN cUpdate;
    FETCH NEXT FROM cUpdate INTO @json, @OwnerId;

    WHILE @@FETCH_STATUS = 0
    BEGIN

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [trg_UpdateVehicle] | @json = ' + @json
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		BEGIN TRY
          DECLARE 
                @RequestLoginImage INT = ISNULL(TRY_CAST(JSON_VALUE(@json, '$.solicitarimagenlogin') AS INT), 0),
                @Brand VARCHAR(1024) = CASE WHEN JSON_VALUE(@json, '$.brand') IS NULL THEN ''
                                            WHEN LTRIM(RTRIM(LOWER(JSON_VALUE(@json, '$.brand')))) IN ('null','undefined') THEN ''
                                            WHEN LEFT(LTRIM(JSON_VALUE(@json, '$.brand')), 1) = '@' THEN ''
                                            ELSE JSON_VALUE(@json, '$.brand') END,
                @Model VARCHAR(1024) = CASE WHEN JSON_VALUE(@json, '$.model') IS NULL THEN ''
                                            WHEN LTRIM(RTRIM(LOWER(JSON_VALUE(@json, '$.model')))) IN ('null','undefined') THEN ''
                                            WHEN LEFT(LTRIM(JSON_VALUE(@json, '$.model')), 1) = '@' THEN ''
                                            ELSE JSON_VALUE(@json, '$.model') END,
                @Domain VARCHAR(128) = CASE WHEN JSON_VALUE(@json, '$.domain') IS NULL THEN ''
                                            WHEN LTRIM(RTRIM(LOWER(JSON_VALUE(@json, '$.domain')))) IN ('null','undefined') THEN ''
                                            WHEN LEFT(LTRIM(JSON_VALUE(@json, '$.domain')), 1) = '@' THEN ''
                                            ELSE JSON_VALUE(@json, '$.domain') END,
                @Colour VARCHAR(1024) = CASE WHEN JSON_VALUE(@json, '$.colour') IS NULL THEN ''
                                            WHEN LTRIM(RTRIM(LOWER(JSON_VALUE(@json, '$.colour')))) IN ('null','undefined') THEN ''
                                            WHEN LEFT(LTRIM(JSON_VALUE(@json, '$.colour')), 1) = '@' THEN ''
                                            ELSE JSON_VALUE(@json, '$.colour') END,
                @Year INT = ISNULL(TRY_CAST(JSON_VALUE(@json, '$.year') AS INT), 0),
                @VehicleType VARCHAR(1024) = CASE WHEN JSON_VALUE(@json, '$.vehicleType') IS NULL THEN ''
                                                 WHEN LTRIM(RTRIM(LOWER(JSON_VALUE(@json, '$.vehicleType')))) IN ('null','undefined') THEN ''
                                                 WHEN LEFT(LTRIM(JSON_VALUE(@json, '$.vehicleType')), 1) = '@' THEN ''
                                                 ELSE JSON_VALUE(@json, '$.vehicleType') END,
                @InsuranceExpiration DATETIMEOFFSET = TRY_CAST(NULLIF(LTRIM(RTRIM(JSON_VALUE(@json, '$.seguroVto'))), '') AS DATETIMEOFFSET),
                @InsuranceCompany VARCHAR(1024) = CASE WHEN JSON_VALUE(@json, '$.seguroCia') IS NULL THEN ''
                                                     WHEN LTRIM(RTRIM(LOWER(JSON_VALUE(@json, '$.seguroCia')))) IN ('null','undefined') THEN ''
                                                     WHEN LEFT(LTRIM(JSON_VALUE(@json, '$.seguroCia')), 1) = '@' THEN ''
                                                     ELSE JSON_VALUE(@json, '$.seguroCia') END,
                @VTVExpiration DATETIMEOFFSET = TRY_CAST(NULLIF(LTRIM(RTRIM(JSON_VALUE(@json, '$.vtv'))), '') AS DATETIMEOFFSET),
                @Blacklist INT = ISNULL(TRY_CAST(JSON_VALUE(@json, '$.blacklist') AS INT), 0),
                @ProfileVehicleId INT = ISNULL(TRY_CAST(JSON_VALUE(@json, '$.profileVehicleId') AS INT), 0);

            IF @Domain = ''
                GOTO NEXT_RECORD;

			MERGE [dbo].[Vehicle] AS target
			USING (SELECT 1 AS dummy) AS src
				ON target.OwnerId = @OwnerId
				WHEN MATCHED THEN
					UPDATE SET
						[RequestLoginImage] = @RequestLoginImage,
						[Brand] = @Brand,
						[Model] = @Model,
						[Domain] = @Domain,
						[Colour] = @Colour,
						[Year] = @Year,
						[VehicleType] = @VehicleType,
						[InsuranceExpiration] = @InsuranceExpiration,
						[InsuranceCompany] = @InsuranceCompany,
						[VTVExpiration] = @VTVExpiration,
                        [Blacklist] = @Blacklist,
                        [LastUpdate] = GETDATE(),
                        [ProfileVehicleId] = @ProfileVehicleId
				WHEN NOT MATCHED THEN
					INSERT (OwnerId, [RequestLoginImage], [Brand], [Model], [Domain], [Colour], [Year], [VehicleType], [InsuranceExpiration], [InsuranceCompany], [VTVExpiration], [Blacklist], [ProfileVehicleId])
					VALUES (@OwnerId, @RequestLoginImage, @Brand, @Model, @Domain, @Colour, @Year, @VehicleType, @InsuranceExpiration, @InsuranceCompany, @VTVExpiration, @Blacklist, @ProfileVehicleId);

			-------------------------------------------------------------
			-- INTEGRACIÓN LPR: Actualización de Agenda en Tiempo Real --
			-------------------------------------------------------------
			IF ISNULL(@Domain, '') <> ''
			BEGIN
				EXEC dbo.SGSP_VehicleAgendaFill @cDomain = @Domain;
			END
			
			END TRY
			BEGIN CATCH
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [trg_UpdateVehicle] | Error al procesar OwnerId: ' + CAST(@OwnerId AS VARCHAR) + ' - ' + ERROR_MESSAGE()
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			END CATCH;

        NEXT_RECORD:
        FETCH NEXT FROM cUpdate INTO @json, @OwnerId;
    END

    CLOSE cUpdate;
    DEALLOCATE cUpdate;

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [trg_UpdateVehicle] | Fin'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
END