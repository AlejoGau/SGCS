CREATE OR ALTER TRIGGER [dbo].[STGeofenceCreatePush]
ON [dbo].[SmartTrackGeoFense]
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @spToken NVARCHAR(1024) = '';
    DECLARE @msgType NVARCHAR(128) = 'UPDATE_LOGIN';

    SELECT TOP 1
        @spToken = ISNULL(sp.pushToken, '')
    FROM inserted i
    INNER JOIN _Datos.dbo.SmartPanic sp 
        ON sp.Imei = i.Imei;

    IF ISNULL(@spToken, '') <> ''
/*
    Se captura el resultado de createPushMessage para evitar que devuelva resultsets
    intermedios al flujo del INSERT, ya que la capa DAL espera recibir únicamente
    el resultset final de SmartTrackGeoFenseSel. Esto ocasiona que no devuelva el insert
    de las geocercas y daba error de Index was outside the bounds of the array.
*/
    BEGIN
        DECLARE @PushResult TABLE
        (
            Pending INT
        );

        INSERT INTO @PushResult
        EXECUTE _Desktop.dbo.[createPushMessage]
            @spToken = @spToken,
            @msgType = @msgType;
    END
END