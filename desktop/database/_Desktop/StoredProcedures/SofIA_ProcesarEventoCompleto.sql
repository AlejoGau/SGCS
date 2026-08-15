CREATE OR ALTER PROCEDURE [dbo].[SofIA_ProcesarEventoCompleto]
    @idCta INT,
    @cAlarma NVARCHAR(10),
    @cObservaciones NVARCHAR(500),
    @cData NVARCHAR(MAX),
    @cZona NVARCHAR(50) = '',
    @formato NVARCHAR(100) = '',
    @postImages NVARCHAR(500) = NULL,
    @cUser NVARCHAR(50) = 'SISTEMA',
    @rec_norigen INT = 5,
    @cDll NVARCHAR(50) = 'SofIA'
AS
BEGIN
    SET NOCOUNT ON;
    PRINT CONCAT('[SofIA_ProcesarEventoCompleto] START idCta=', @idCta, ', alarma=', @cAlarma, ', zona=', @cZona);

    DECLARE @cue_clinea NVARCHAR(50), @ccuenta NVARCHAR(50)
    SELECT @cue_clinea = cue_clinea, @ccuenta = cue_ncuenta
    FROM _Datos..m_cuentas WHERE cue_iid = @idCta;
    PRINT CONCAT('[SofIA_ProcesarEventoCompleto] Cuenta=', ISNULL(@ccuenta,''), ', linea=', ISNULL(@cue_clinea,''));

    DECLARE @rec_id INT;

    EXEC dbo.AlarmaGenerar
        @idCta          = @idCta,
        @cAlarma        = @cAlarma,
        @cObservaciones = @cObservaciones,
        @cContenido     = NULL,
        @cData          = @cData,
        @idUsuario      = 0,
        @rec_norigen    = @rec_norigen,
        @cUser          = @cUser,
        @cDll           = @cDll,
        @cZona          = @cZona,
        @rec_iid        = @rec_id OUTPUT;
    PRINT CONCAT('[SofIA_ProcesarEventoCompleto] Alarm generated rec_id=', ISNULL(CAST(@rec_id AS NVARCHAR(20)),'NULL'));

    IF (@postImages IS NOT NULL AND LTRIM(RTRIM(@postImages)) <> '')
    BEGIN
        EXEC _Desktop.dbo.IPRS_VideoLinkParser
            @iRecID     = @rec_id,
            @idCta      = @idCta,
            @cAlarma    = @cAlarma,
            @cZona      = @cZona,
            @clinea     = @cue_clinea,
            @ncuenta    = @ccuenta,
            @cDll       = @cDll,
            @postImages = @postImages,
            @formato    = '';
        PRINT '[SofIA_ProcesarEventoCompleto] Multimedia asociado';
    END

    PRINT CONCAT('[SofIA_ProcesarEventoCompleto] END rec_id=', ISNULL(CAST(@rec_id AS NVARCHAR(20)),'NULL'));
END