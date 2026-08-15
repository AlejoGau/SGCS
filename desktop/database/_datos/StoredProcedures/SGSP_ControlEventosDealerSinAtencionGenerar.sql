CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlEventosDealerSinAtencionGenerar]
    @idOrganizacion         INT,
    @organizacion           NVARCHAR(255),
    @cantEventosPendientes  INT,
    @clinea                 VARCHAR(20),
    @razonSocialLinea       NVARCHAR(255),
    @ultimoLoginHistorico   DATETIME,
    @motivoAlerta           VARCHAR(100)
AS
--Genera evento de alarma _CM para una organización dealer sin atención
--Autor : Pablo Canonico
--Fecha : 05/06/2026

Set NoCount ON

BEGIN TRY

    DECLARE @message            NVARCHAR(MAX) = '',
            @StartDateTimeText  VARCHAR(MAX)  = '';

    SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
    SET @message = 'Start DateTime : %s | [SGSP_ControlEventosDealerSinAtencionGenerar] | Org => %d';
    RAISERROR(@message, 10, 1, @StartDateTimeText, @idOrganizacion) WITH NOWAIT;

    DECLARE @cue_iid    INT,
            @cObs       NVARCHAR(MAX),
            @iValor     INT;

    SET @cObs = 'Organizacion: '                  + ISNULL(@organizacion, '')                  +
                ' | Dealer: '             + ISNULL(@razonSocialLinea, '')               +
                ' | Eventos pendientes: '+ CAST(@cantEventosPendientes AS VARCHAR(10)) +
                ' | '                    + ISNULL(@motivoAlerta, '');

    SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
    SET @message = 'Start DateTime : %s | [SGSP_ControlEventosDealerSinAtencionGenerar] | Obs => '+@cObs;
    RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

    -- Cuenta INTE
    SELECT TOP 1 @cue_iid = cue_iid
        FROM dbo.m_cuentas WITH (NOLOCK)
    WHERE cue_clinea  = '_SG' AND cue_ncuenta = 'INTE';

    IF @cue_iid IS NULL
    BEGIN
        SET @message = 'Start DateTime : %s | [SGSP_ControlEventosDealerSinAtencionGenerar] | No se encontró cuenta INTE para _SG | Org => %d';
        RAISERROR(@message, 16, 1, @StartDateTimeText, @idOrganizacion) WITH NOWAIT;
        RETURN;
    END;

    EXEC dbo.SGSP_AlarmaGenerar
        @idCta   = @cue_iid,
        @cAlarma = '_CM',
        @cQuien  = 'SoftGuard',
        @cObs    = @cObs,
        @iValor  = @iValor OUTPUT;

    SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
    SET @message = 'Start DateTime : %s | [SGSP_ControlEventosDealerSinAtencionGenerar] | Alarma generada OK | idRec => %d';
    RAISERROR(@message, 10, 1, @StartDateTimeText, @iValor) WITH NOWAIT;

END TRY
BEGIN CATCH

    IF ERROR_NUMBER() = 2627      PRINT 'Handling PK violation...';
    ELSE IF ERROR_NUMBER() = 547  PRINT 'Handling CHECK/FK constraint violation...';
    ELSE IF ERROR_NUMBER() = 515  PRINT 'Handling NULL violation...';
    ELSE IF ERROR_NUMBER() = 245  PRINT 'Handling conversion error...';
    ELSE                          PRINT 'Re-throwing error...';

    PRINT 'Error Number  : ' + CAST(ERROR_NUMBER()    AS VARCHAR(10));
    PRINT 'Error Message : ' + ERROR_MESSAGE();
    PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY()  AS VARCHAR(10));
    PRINT 'Error State   : ' + CAST(ERROR_STATE()     AS VARCHAR(10));
    PRINT 'Error Line    : ' + CAST(ERROR_LINE()      AS VARCHAR(10));
    PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');

END CATCH