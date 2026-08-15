--SPSG_GetCamerasBySerial
CREATE OR ALTER PROCEDURE [dbo].[SPSG_GetCamerasBySerial]
    @DeviceSerial VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @Count INT;
    SELECT @Count = COUNT(*) 
	    FROM _Datos.dbo.HikVisionP2PCameras 
    WHERE hpc_cDeviceSerial = @DeviceSerial AND hpc_bIsDeleted = 0;
    
    IF @Count > 0
    BEGIN
        SELECT 
            (
                SELECT 
                    hpc_cDeviceSerial AS deviceSerial,
                    hpc_iChannelNo AS channelNo,
                    hpc_cChannelName AS channelName,
                    hpc_iStatus AS status,
                    hpc_cIsShared AS isShared,
                    hpc_bIsEncrypt AS isEncrypt,
                    FORMAT(hpc_tLastUpdated, 'yyyy-MM-ddTHH:mm:ss.fffZ') AS lastUpdated
                FROM _Datos.dbo.HikVisionP2PCameras 
                WHERE hpc_cDeviceSerial = @DeviceSerial 
                  AND hpc_bIsDeleted = 0
                ORDER BY hpc_iChannelNo
                FOR JSON PATH
            ) AS JsonResult;
    END
    ELSE
    BEGIN
        SELECT '[]' AS JsonResult;  
    END
END