--SPSG_GetCamerasSyncStatus
CREATE OR ALTER PROCEDURE [dbo].[SPSG_GetCamerasSyncStatus]
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        (
            SELECT 
                FORMAT(MAX(hps_tLastSyncDate), 'yyyy-MM-ddTHH:mm:ss.fffZ') AS lastSyncDate,
                (SELECT COUNT(*) FROM _Datos.dbo.HikVisionP2PCameras WHERE hpc_bIsDeleted = 0) AS totalCameras,
                (SELECT COUNT(*) FROM _Datos.dbo.HikVisionP2PSites WHERE hps_bIsActive = 1) AS activeSites,
                (SELECT COUNT(DISTINCT hpc_cDeviceSerial) FROM _Datos.dbo.HikVisionP2PCameras WHERE hpc_bIsDeleted = 0) AS totalDevices
				FROM _Datos.dbo.HikVisionP2PSites 
            WHERE hps_bIsActive = 1
            FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ) AS JsonResult;
END