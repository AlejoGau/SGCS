CREATE OR ALTER PROCEDURE [dbo].[MQTTDevicesSearch]
AS
BEGIN
	SET NOCOUNT ON;
	
	SELECT [cue_iidCuenta],[cue_iMQTTDeviceID]
	FROM [_Datos].[dbo].[v_MQTTDevices]
	ORDER BY [cue_iMQTTDeviceID]
END