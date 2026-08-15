CREATE OR ALTER PROCEDURE dbo.SGSP_VerificaPruebaPorZonasSinMovimiento
(
      @FilasBorradas       INT OUTPUT
    , @CuentasActualizadas INT OUTPUT
)
AS
BEGIN
--Detecta Cuentas en situacion Prueba x Zonas y si no tienen movimiento las habilita
--Autor .Pablo O. Canónico 04-03-2026
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

	-- Aviso que la tarea esta funcionando	60min * 25hs * 1 dia = 1500
	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'VerificaPruebaPorZonasSinMovimiento', @Repetition = 1500

    DECLARE @dDiaHoy        DATE      = CAST(GETDATE() AS DATE);
    DECLARE @FechaDesde     DATETIME  = DATEADD(DAY, -15, GETDATE());
    DECLARE @TablaMesActual SYSNAME   = 'p_recepcion' + CONVERT(CHAR(6), GETDATE(), 112);
    DECLARE @TablaMesDesde  SYSNAME   = 'p_recepcion' + CONVERT(CHAR(6), @FechaDesde, 112);
    DECLARE @SQL            NVARCHAR(MAX) = N'';

    SET @FilasBorradas = 0;
    SET @CuentasActualizadas = 0;

    IF OBJECT_ID('tempdb..#RecepcionUlt15')  IS NOT NULL DROP TABLE #RecepcionUlt15;
    IF OBJECT_ID('tempdb..#ZonasABorrar')    IS NOT NULL DROP TABLE #ZonasABorrar;
    IF OBJECT_ID('tempdb..#CuentasARevisar') IS NOT NULL DROP TABLE #CuentasARevisar;

    CREATE TABLE #RecepcionUlt15
    (
        rec_iidcuenta INT,
        rec_czona     VARCHAR(50)
    );

    ------------------------------------------------------------
    -- 1) Cargar movimientos de los últimos 15 días
    --    desde p_recepcion + tablas mensuales involucradas
    ------------------------------------------------------------
    IF OBJECT_ID('dbo.p_recepcion', 'U') IS NOT NULL
    BEGIN
        SET @SQL = @SQL + '
        INSERT INTO #RecepcionUlt15 (rec_iidcuenta, rec_czona)
        SELECT DISTINCT rec_iidcuenta, rec_czona
        FROM dbo.p_recepcion
        WHERE rec_tfechahora > @FechaDesde;';
    END

    IF OBJECT_ID('dbo.' + @TablaMesActual, 'U') IS NOT NULL
    BEGIN
        SET @SQL = @SQL + '
        INSERT INTO #RecepcionUlt15 (rec_iidcuenta, rec_czona)
        SELECT DISTINCT rec_iidcuenta, rec_czona
        FROM dbo.' + QUOTENAME(@TablaMesActual) + '
        WHERE rec_tfechahora > @FechaDesde;';
    END

    IF @TablaMesDesde <> @TablaMesActual
       AND OBJECT_ID('dbo.' + @TablaMesDesde, 'U') IS NOT NULL
    BEGIN
        SET @SQL = @SQL + '
        INSERT INTO #RecepcionUlt15 (rec_iidcuenta, rec_czona)
        SELECT DISTINCT rec_iidcuenta, rec_czona
        FROM dbo.' + QUOTENAME(@TablaMesDesde) + '
        WHERE rec_tfechahora > @FechaDesde;';
    END

    EXEC sp_executesql
        @SQL,
        N'@FechaDesde DATETIME',
        @FechaDesde = @FechaDesde;

    ------------------------------------------------------------
    -- 2) Armar zonas a borrar
    ------------------------------------------------------------
    ;WITH Movimientos AS
    (
        SELECT DISTINCT
               rec_iidcuenta,
               rec_czona
        FROM #RecepcionUlt15
    )
    SELECT DISTINCT
           i.est_iidcuenta AS IdCta,
           i.est_czona     AS Zona
    INTO #ZonasABorrar
    FROM m_cuentas c
    INNER JOIN m_estado_cuenta_cab cab
        ON cab.est_iidcuenta = c.cue_iid
    INNER JOIN m_estado_cuenta_item i
        ON i.est_iidcuenta = c.cue_iid
    WHERE c.cue_clinea NOT IN ('_MP', '_SG', '')
      AND cab.est_nEstado = 3
      AND i.est_czona <> '_COD_'
      AND NOT EXISTS
      (
          SELECT 1
          FROM Movimientos m
          WHERE m.rec_iidcuenta = i.est_iidcuenta
            AND m.rec_czona COLLATE Latin1_General_CI_AS = i.est_czona COLLATE Latin1_General_CI_AS
      );

    SELECT DISTINCT IdCta
    INTO #CuentasARevisar
    FROM #ZonasABorrar;

    BEGIN TRY
        BEGIN TRAN;

        --------------------------------------------------------
        -- 3) DELETE de items sin movimiento
        --------------------------------------------------------
        DELETE i
        FROM m_estado_cuenta_item i
        INNER JOIN #ZonasABorrar z
            ON z.IdCta = i.est_iidcuenta
           AND z.Zona  = i.est_czona;

        SET @FilasBorradas = @@ROWCOUNT;

        --------------------------------------------------------
        -- 4) UPDATE del cab
        --    Una cuenta queda en estado 3 solo si le queda:
        --    - alguna zona <> '_COD_'
        --    o
        --    - '_COD_' con est_cData no vacío
        --------------------------------------------------------
        UPDATE cab
           SET cab.est_nEstado     = 0,
               cab.est_nTipo       = 0,
               cab.est_dFechaDesde = CONVERT(CHAR(8), @dDiaHoy, 112),
               cab.est_nDuracion   = 0,
               cab.est_dFechaHasta = CONVERT(CHAR(8), GETDATE(), 112),
               cab.est_mNota       = ''
        FROM m_estado_cuenta_cab cab
        INNER JOIN #CuentasARevisar x
            ON x.IdCta = cab.est_iidcuenta
        WHERE cab.est_nEstado = 3
          AND NOT EXISTS
          (
              SELECT 1
              FROM m_estado_cuenta_item i
              WHERE i.est_iidcuenta = cab.est_iidcuenta
                AND
                (
                    i.est_czona <> '_COD_'
                    OR
                    (
                        i.est_czona = '_COD_'
                        AND NULLIF(LTRIM(RTRIM(ISNULL(i.est_cData, ''))), '') IS NOT NULL
                    )
                )
          );

        SET @CuentasActualizadas = @@ROWCOUNT;

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        THROW;
    END CATCH
END