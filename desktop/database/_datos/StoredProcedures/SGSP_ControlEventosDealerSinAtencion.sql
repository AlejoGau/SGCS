CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlEventosDealerSinAtencion]
AS
--Orquestador: obtiene organizaciones dealer sin atención y genera alarma por cada una
--Autor : Pablo Canonico
--Fecha : 05/06/2026

Set NoCount ON

BEGIN TRY

    DECLARE @message            NVARCHAR(MAX) = '',
            @StartDateTimeText  VARCHAR(MAX)  = '',
            @cantSinAtencion    INT           = 0;

    SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
    SET @message = 'Start DateTime : %s | [SGSP_ControlEventosDealerSinAtencion]';
    RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

    -- Tabla temporal para capturar resultado de SGSP_GetOrganizacionesSinAtencion
    CREATE TABLE #SinAtencion (
        idOrganizacion          INT,
        organizacion            NVARCHAR(255),
        cantEventosPendientes   INT,
        clinea                  VARCHAR(20),
        razonSocialLinea        NVARCHAR(255),
        horaDesde               VARCHAR(5),
        horaHasta               VARCHAR(5),
        ultimoLoginHistorico    DATETIME,
        motivoAlerta            VARCHAR(100)
    );

    INSERT INTO #SinAtencion
    EXEC dbo.SGSP_GetOrganizacionesSinAtencion;

    SET @cantSinAtencion = @@ROWCOUNT;

    SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
    SET @message = 'Start DateTime : %s | [SGSP_ControlEventosDealerSinAtencion] | Organizaciones sin atención encontradas : %d';
    RAISERROR(@message, 10, 1, @StartDateTimeText, @cantSinAtencion) WITH NOWAIT;

    DECLARE
        @idOrganizacion         INT,
        @organizacion           NVARCHAR(255),
        @cantEventosPendientes  INT,
        @clinea                 VARCHAR(20),
        @razonSocialLinea       NVARCHAR(255),
        @ultimoLoginHistorico   DATETIME,
        @motivoAlerta           VARCHAR(100);

    DECLARE cur CURSOR LOCAL FAST_FORWARD FOR
        SELECT idOrganizacion,organizacion,cantEventosPendientes,clinea,razonSocialLinea,ultimoLoginHistorico,motivoAlerta 
        FROM #SinAtencion;

    OPEN cur;
    FETCH NEXT FROM cur INTO @idOrganizacion,@organizacion,@cantEventosPendientes,@clinea,@razonSocialLinea,@ultimoLoginHistorico,@motivoAlerta;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
        SET @message = 'Start DateTime : %s | [SGSP_ControlEventosDealerSinAtencion] | Procesando Organizacion : %d';
        RAISERROR(@message, 10, 1, @StartDateTimeText, @idOrganizacion) WITH NOWAIT;

        EXEC dbo.SGSP_ControlEventosDealerSinAtencionGenerar
            @idOrganizacion         = @idOrganizacion,
            @organizacion           = @organizacion,
            @cantEventosPendientes  = @cantEventosPendientes,
            @clinea                 = @clinea,
            @razonSocialLinea       = @razonSocialLinea,
            @ultimoLoginHistorico   = @ultimoLoginHistorico,
            @motivoAlerta           = @motivoAlerta;

        FETCH NEXT FROM cur INTO @idOrganizacion,@organizacion,@cantEventosPendientes,@clinea,@razonSocialLinea,@ultimoLoginHistorico,@motivoAlerta;
    END;

    CLOSE cur;
    DEALLOCATE cur;

    DROP TABLE #SinAtencion;

END TRY
BEGIN CATCH

    IF CURSOR_STATUS('local', 'cur') >= 0
    BEGIN
        CLOSE cur;
        DEALLOCATE cur;
    END;

    IF OBJECT_ID('tempdb..#SinAtencion') IS NOT NULL
        DROP TABLE #SinAtencion;

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