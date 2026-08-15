CREATE OR ALTER PROCEDURE [dbo].[SchedulerCreateSofiaRoutes]
    @days INT = 0,
    @idCuenta INT = 0,
    @nodelete INT = 0,
    @_dc VARCHAR(36) = '',
    @token NVARCHAR(256) = ''
AS
BEGIN
    SET NOCOUNT ON;
    SET DATEFIRST 7;

    DECLARE 
        @fecha DATETIME,
        @date DATETIME,
        @deletedate DATETIME,
        @deletedatehasta DATETIME,
        @currentWeekday INT,
        @currentDay INT,
        @routeId INT,
        @programId INT,
        @cuentaId INT,
        @routeName NVARCHAR(128),
        @starthour INT,
        @startminutes INT,
        @schdate DATETIME,
        @limitdate DATETIME,
        @desc NVARCHAR(256),
        @programType NVARCHAR(5),
        @dayOfWeek INT,
        @dayOfMonth INT,
        @startOfDay DATETIME,
        @logMessage NVARCHAR(4000),
        @deletedRows INT,
        @totalPrograms INT,
        @processed INT,
        @created INT,
        @skippedExisting INT;

    DECLARE @SofiaRoutes TABLE (
        RouteId INT,
        CuentaId INT,
        RouteName NVARCHAR(128),
        ProgramId INT,
        ProgramType NVARCHAR(5),
        DayOfWeek INT,
        DayOfMonth INT,
        StartHour INT,
        StartMinutes INT
    );

    -- inicializacion
    SET @fecha = GETDATE();
    SET @date = DATEADD(DAY, @days, @fecha);
    SET @currentWeekday = DATEPART(WEEKDAY, @date);
    SET @currentDay = DATEPART(DAY, @date);
    SET @startOfDay = DATEADD(DAY, DATEDIFF(DAY, 0, @date), 0);
    SET @processed = 0;
    SET @created = 0;
    SET @skippedExisting = 0;

    SET @logMessage = FORMATMESSAGE(
        N'SchedulerCreateSofiaRoutes -> fecha objetivo %s (weekday=%d, day=%d, offset=%d, cuenta=%d)',
        CONVERT(NVARCHAR(19), @date, 120),
        @currentWeekday,
        @currentDay,
        @days,
        @idCuenta
    );
    RAISERROR(@logMessage, 10, 1) WITH NOWAIT;

    -- Eliminacion previa
    IF @nodelete = 0
    BEGIN
        SET @deletedate = CONVERT(DATE, @date);
        SET @deletedatehasta = DATEADD(DAY, 1, @deletedate);

        DELETE FROM _Datos..Scheduler
        WHERE limitdate >= @deletedate
          AND limitdate < @deletedatehasta
          AND startdate >= @deletedate
          AND template = 9101
          AND [status] = 0
          AND (idCuenta = @idCuenta OR @idCuenta = 0);

        SET @deletedRows = @@ROWCOUNT;
        SET @logMessage = FORMATMESSAGE(
            N'SchedulerCreateSofiaRoutes -> registros previos eliminados: %d (fecha %s - %s)',
            @deletedRows,
            CONVERT(NVARCHAR(10), @deletedate, 120),
            CONVERT(NVARCHAR(10), @deletedatehasta, 120)
        );
        RAISERROR(@logMessage, 10, 1) WITH NOWAIT;
    END
    ELSE
    BEGIN
        RAISERROR(N'SchedulerCreateSofiaRoutes -> nodelete=1, se preservan registros existentes.', 10, 1) WITH NOWAIT;
    END

    INSERT INTO @SofiaRoutes (
        RouteId,
        CuentaId,
        RouteName,
        ProgramId,
        ProgramType,
        DayOfWeek,
        DayOfMonth,
        StartHour,
        StartMinutes
    )
    SELECT 
        r.svr_iid,
        r.svr_iCuentaId,
        r.svr_cName,
        p.srp_iid,
        p.srp_cProgramType,
        p.srp_iDayOfWeek,
        p.srp_iDayOfMonth,
        p.srp_iStartHour,
        p.srp_iStartMinutes
    FROM _Datos..SV_Routes r
    INNER JOIN _Datos..SV_Route_Programs p ON p.srp_iRouteId = r.svr_iid
    WHERE r.svr_dDateStart <= @date
      AND (r.svr_iCuentaId = @idCuenta OR @idCuenta = 0)
      AND (
            p.srp_cProgramType = '1' OR
            (p.srp_cProgramType = '2' AND @currentWeekday BETWEEN 2 AND 6) OR
            (p.srp_cProgramType = '3' AND @currentWeekday = p.srp_iDayOfWeek + 1) OR
            (p.srp_cProgramType = '4' AND @currentDay = p.srp_iDayOfMonth)
      )
    ORDER BY p.srp_iid;

    SET @totalPrograms = @@ROWCOUNT;
    SET @logMessage = FORMATMESSAGE(
        N'SchedulerCreateSofiaRoutes -> programas encontrados: %d',
        @totalPrograms
    );
    RAISERROR(@logMessage, 10, 1) WITH NOWAIT;

    IF @totalPrograms = 0
    BEGIN
        RAISERROR(N'SchedulerCreateSofiaRoutes -> sin rutas/programas para procesar.', 10, 1) WITH NOWAIT;
        RETURN;
    END

    DECLARE SofiaCursor CURSOR FOR
        SELECT 
            RouteId,
            CuentaId,
            RouteName,
            ProgramId,
            ProgramType,
            DayOfWeek,
            DayOfMonth,
            StartHour,
            StartMinutes
        FROM @SofiaRoutes
        ORDER BY ProgramId;

    OPEN SofiaCursor;

    FETCH NEXT FROM SofiaCursor INTO
        @routeId,
        @cuentaId,
        @routeName,
        @programId,
        @programType,
        @dayOfWeek,
        @dayOfMonth,
        @starthour,
        @startminutes;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @schdate = DATEADD(MINUTE, @startminutes, DATEADD(HOUR, @starthour, @startOfDay));
        SET @limitdate =  @schdate;
        SET @desc = CONCAT('SofIA Plan: ', @routeName);
        SET @processed = @processed + 1;

        SET @logMessage = FORMATMESSAGE(
            N'SchedulerCreateSofiaRoutes -> [%d/%d] Ruta=%s (ID=%d) Programa=%d Tipo=%s Inicio=%s',
            @processed,
            @totalPrograms,
            ISNULL(@routeName, N'<sin nombre>'),
            @routeId,
            @programId,
            ISNULL(@programType, N'-'),
            CONVERT(NVARCHAR(8), @schdate, 108)
        );
        RAISERROR(@logMessage, 10, 1) WITH NOWAIT;

        IF NOT EXISTS (
            SELECT 1 FROM _Datos..Scheduler 
            WHERE template = 9101 
              AND programId = @programId 
              AND idCuenta = @cuentaId 
              AND limitdate = @limitdate 
              AND eventtype = '_SR'
        )
        BEGIN
            INSERT INTO _Datos..Scheduler (
                Name, [sql], limitdate, [status],
                eventtype, condition, idCuenta, iRoute,
                template, idUsuario, programId, startdate
            )
            VALUES (
                @desc,
                'Select @result_out=0',
                @limitdate,
                0,
                '_SR',
                1,
                @cuentaId,
                @routeId,
                9101,
                0,
                @programId,
                @schdate
            );

            SET @created = @created + 1;
            SET @logMessage = FORMATMESSAGE(
                N'SchedulerCreateSofiaRoutes -> evento creado para programa %d en %s',
                @programId,
                CONVERT(NVARCHAR(19), @limitdate, 120)
            );
            RAISERROR(@logMessage, 10, 1) WITH NOWAIT;
        END
        ELSE
        BEGIN
            SET @skippedExisting = @skippedExisting + 1;
            SET @logMessage = FORMATMESSAGE(
                N'SchedulerCreateSofiaRoutes -> evento existente detectado para programa %d, se omite creacion.',
                @programId
            );
            RAISERROR(@logMessage, 10, 1) WITH NOWAIT;
        END

        FETCH NEXT FROM SofiaCursor INTO
            @routeId,
            @cuentaId,
            @routeName,
            @programId,
            @programType,
            @dayOfWeek,
            @dayOfMonth,
            @starthour,
            @startminutes;
    END

    CLOSE SofiaCursor;
    DEALLOCATE SofiaCursor;

    SET @logMessage = FORMATMESSAGE(
        N'SchedulerCreateSofiaRoutes -> resumen: procesados=%d, creados=%d, existentes=%d',
        @processed,
        @created,
        @skippedExisting
    );
    RAISERROR(@logMessage, 10, 1) WITH NOWAIT;
END