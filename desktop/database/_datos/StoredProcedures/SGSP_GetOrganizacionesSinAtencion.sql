CREATE OR ALTER PROCEDURE [dbo].[SGSP_GetOrganizacionesSinAtencion]
    @iOrganizacion INT = NULL
AS
--Retorna organizaciones dealer con eventos pendientes sin usuario activo en el horario vigente
--Autor : Pablo Canonico    
--Fecha : 05/06/2026

Set NoCount ON

BEGIN TRY

    DECLARE @message            NVARCHAR(MAX) = '',
            @StartDateTimeText  VARCHAR(MAX)  = '',
            @iOrgLog            INT           = 0;

    SET @iOrgLog           = ISNULL(@iOrganizacion, 0);
    SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
    SET @message = 'Start DateTime : %s | [SGSP_GetOrganizacionesSinAtencion] | Org => %d';
    RAISERROR(@message, 10, 1, @StartDateTimeText, @iOrgLog) WITH NOWAIT;

    SET DATEFIRST 7;

    DECLARE
        @dtNow  DATETIME    = GETDATE(),
        @sTime  VARCHAR(5)  = CONVERT(VARCHAR(5), GETDATE(), 108),
        @iDow   INT         = DATEPART(WEEKDAY, GETDATE());

    -- =================================================================================
    -- 1. Organizaciones con horario activo AHORA y que no esten en situacion Inactivo
    -- =================================================================================
    ;WITH OrganizacionesActivas AS (
        SELECT
            tmd_iorganizacion   AS idOrganizacion,
            tmd_clinea          AS clinea,
            tmd_horadesde       AS horaDesde,
            tmd_horahasta       AS horaHasta
        FROM _tablas..t_monitoreo_dealer WITH (NOLOCK)
        INNER JOIN _Datos..Organization org WITH (NOLOCK)
            ON org.Id = tmd_iorganizacion
        WHERE tmd_diasemana = @iDow
          AND @sTime        BETWEEN tmd_horadesde AND tmd_horahasta
          AND tmd_estado    = 1
          AND org.Status    != 0
          AND (@iOrganizacion IS NULL OR tmd_iorganizacion = @iOrganizacion)
    ),

    -- =====================================================================
    -- 2. Organizaciones con eventos pendientes sin atención ahora
    -- =====================================================================
    OrganizacionesConEventos AS (
        SELECT
            ep._idorganizacion  AS idOrganizacion,
            oa.clinea,
            oa.horaDesde,
            oa.horaHasta,
            COUNT(*)            AS cantEventosPendientes
        FROM _datos..EventosPendientes ep WITH (NOLOCK)
        INNER JOIN _datos..m_cuentas mc WITH (NOLOCK)
            ON mc.cue_iid        = ep.rec_iidcuenta
        INNER JOIN OrganizacionesActivas oa
            ON oa.idOrganizacion = ep._idorganizacion
           AND oa.clinea         = mc.cue_clinea COLLATE DATABASE_DEFAULT
        WHERE ep.rec_iidcuenta NOT IN (
            SELECT subre.rec_iidcuenta
            FROM _datos..EventosPendientes subre WITH (NOLOCK)
            WHERE subre.rec_nestado   IN (1, 2, 4, 9)
              AND subre.rec_ioperador != 0
        )
        GROUP BY
            ep._idorganizacion,
            oa.clinea,
            oa.horaDesde,
            oa.horaHasta
    ),

    -- =====================================================================
    -- 3a. Último login histórico por organización (con o sin token)
    -- =====================================================================
    UltimoLoginHistorico AS (
        SELECT
            u.udw_empresa       AS idOrganizacion,
            MAX(o.AuditDate)    AS ultimoLogin
        FROM _Desktop..FrameworkAudit           o
        INNER JOIN _Desktop..FrameworkAuditExtend e  ON e.Id          = o.Id
        INNER JOIN _Desktop..[Object]           oj   ON oj.Id         = o.ObjectTypeId
        INNER JOIN _Desktop..[function]          f   ON f.Id          = o.FunctionId AND f.Id = 7
        INNER JOIN _Sistema..UsersDesktopWeb     u   ON u.udw_usuario  = e.UserName COLLATE DATABASE_DEFAULT
        LEFT  JOIN _Datos..m_cuentas             c   ON c.cue_iid      = o.ObjectId
        WHERE (@iOrganizacion IS NULL OR u.udw_empresa = @iOrganizacion)
        GROUP BY u.udw_empresa
    ),

    -- =====================================================================
    -- 3b. Usuarios con sesión activa HOY (token vigente + login de hoy)
    -- =====================================================================
    UsuariosConTokenActivo AS (
        SELECT
            u.udw_empresa       AS idOrganizacion,
            MAX(o.AuditDate)    AS ultimoLogin
        FROM _Desktop..FrameworkAudit           o
        INNER JOIN _Desktop..FrameworkAuditExtend e  ON e.Id          = o.Id
        INNER JOIN _Desktop..[Object]           oj   ON oj.Id         = o.ObjectTypeId
        INNER JOIN _Desktop..[function]          f   ON f.Id          = o.FunctionId AND f.Id = 7
        INNER JOIN _Sistema..UsersDesktopWeb     u   ON u.udw_usuario  = e.UserName COLLATE DATABASE_DEFAULT
        INNER JOIN _Datos..Token                 t   ON t.UserId       = e.UserName COLLATE DATABASE_DEFAULT
        LEFT  JOIN _Datos..m_cuentas             c   ON c.cue_iid      = o.ObjectId
        WHERE (@iOrganizacion IS NULL OR u.udw_empresa = @iOrganizacion)
          AND CAST(o.AuditDate AS DATE) = CAST(GETDATE() AS DATE)
        GROUP BY u.udw_empresa
    )

    -- =====================================================================
    -- 4. Resultado final: organizaciones con eventos SIN usuario activo
    -- =====================================================================
    SELECT
        oe.idOrganizacion,
        org.[Name]                                                  AS organizacion,
        oe.cantEventosPendientes,
        oe.clinea,
        lin.lin_crazonsocial                                        AS razonSocialLinea,
        oe.horaDesde,
        oe.horaHasta,
        uh.ultimoLogin                                              AS ultimoLoginHistorico,
        CASE
            WHEN uh.ultimoLogin IS NULL
                THEN 'NUNCA TUVO LOGIN'
            WHEN ut.ultimoLogin IS NULL
                THEN 'SE DESLOGUEÓ - último: ' + CONVERT(VARCHAR(19), uh.ultimoLogin, 120)
            WHEN CONVERT(VARCHAR(5), ut.ultimoLogin, 108) NOT BETWEEN oe.horaDesde AND oe.horaHasta
                THEN 'LOGIN FUERA DE RANGO - último: ' + CONVERT(VARCHAR(19), ut.ultimoLogin, 120)
            ELSE 'SIN COBERTURA'
        END AS motivoAlerta
    FROM OrganizacionesConEventos oe
    LEFT JOIN _Datos..Organization          org ON org.Id           = oe.idOrganizacion
    LEFT JOIN _Tablas..t_lineas             lin ON lin.lin_ccodigo   = oe.clinea COLLATE DATABASE_DEFAULT
    LEFT JOIN UltimoLoginHistorico          uh  ON uh.idOrganizacion = oe.idOrganizacion
    LEFT JOIN UsuariosConTokenActivo        ut  ON ut.idOrganizacion = oe.idOrganizacion
    WHERE
        ut.ultimoLogin IS NULL
        OR CONVERT(VARCHAR(5), ut.ultimoLogin, 108) NOT BETWEEN oe.horaDesde AND oe.horaHasta
    ORDER BY
        oe.cantEventosPendientes DESC,
        oe.idOrganizacion;

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