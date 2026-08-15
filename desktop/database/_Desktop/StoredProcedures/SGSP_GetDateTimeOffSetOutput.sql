CREATE OR ALTER PROCEDURE [dbo].[SGSP_GetDateTimeOffSetOutput]
    @iCta INT,
    @FechaOffSet DATETIME OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @OffsetServerMin INT = DATEPART(TZoffset, SYSDATETIMEOFFSET()),  
            @OffsetUserMin   INT;                                           

    -- 1) Lee el offset de la cuenta en minutos
    SELECT @OffsetUserMin = CAST(ISNULL(TZ.ttz_nOffSet, 0) * 60 AS INT)
		FROM _Datos.dbo.m_cuentas MC
    LEFT JOIN _Tablas.dbo.t_TimeZone TZ ON TZ.ttz_idKey = MC.cue_iZonaHoraria
		WHERE MC.cue_iid = @iCta;

    -- 2) GETDATE() es la hora del servidor sin offset: 2025-05-08 10:31:12
    --    le sumas (user – server): -300 – (-360) = +60 minutos
    SET @FechaOffSet = DATEADD( MINUTE, @OffsetUserMin - @OffsetServerMin, GETDATE() );
END