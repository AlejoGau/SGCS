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
        @checkpoint NVARCHAR(128),
        @starthour INT,
        @startminutes INT,
        @config NVARCHAR(MAX),
        @schdate DATETIME,
        @limitdate DATETIME,
        @desc NVARCHAR(256),
        @programType NVARCHAR(5),
        @dayOfWeek INT,
        @dayOfMonth INT,
        @analysisPointId INT,
        @cameraId INT,
        @startOfDay DATETIME;

    -- inicializacion
    SET @fecha = GETDATE();
    SET @date = DATEADD(DAY, @days, @fecha);
    SET @currentWeekday = DATEPART(WEEKDAY, @date);
    SET @currentDay = DATEPART(DAY, @date);
    SET @startOfDay = DATEADD(DAY, DATEDIFF(DAY, 0, @date), 0);

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
    END

    DECLARE SofiaCursor CURSOR FOR
        SELECT 
            r.svr_iid AS RouteId,
            r.svr_iCuentaId AS CuentaId,
            r.svr_cName AS RouteName,
            p.srp_iid AS ProgramId,
            p.srp_cProgramType,
            p.srp_iDayOfWeek,
            p.srp_iDayOfMonth,
            p.srp_iStartHour,
            p.srp_iStartMinutes,
            a.sra_iid AS AnalysisPointId,
            a.sra_cReference AS CheckpointName,
            a.sra_iCameraRefId AS CameraId,
            a.sra_cConfig AS Config
        FROM _Datos..SV_Routes r
        INNER JOIN _Datos..SV_Route_Programs p ON p.srp_iRouteId = r.svr_iid
        INNER JOIN _Datos..SV_Route_AnalysisPoints a ON a.sra_iRouteId = r.svr_iid
        WHERE r.svr_dDateStart <= @date
          AND (r.svr_iCuentaId = @idCuenta OR @idCuenta = 0)
          AND (
                p.srp_cProgramType = '1' OR
                (p.srp_cProgramType = '2' AND @currentWeekday BETWEEN 2 AND 6) OR
                (p.srp_cProgramType = '3' AND @currentWeekday = p.srp_iDayOfWeek + 1) OR
                (p.srp_cProgramType = '4' AND @currentDay = p.srp_iDayOfMonth)
          )
        ORDER BY p.srp_iid, a.sra_iOrder;

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
        @startminutes,
        @analysisPointId,
        @checkpoint,
        @cameraId,
        @config;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @schdate = DATEADD(MINUTE, @startminutes, DATEADD(HOUR, @starthour, @startOfDay));
        SET @limitdate = DATEADD(MINUTE, 5, @schdate);
        SET @desc = CONCAT('SofIA Plan: ', @routeName, ' / Punto: ', @checkpoint);

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
                JSON_QUERY(@config),
                @limitdate,
                0,
                '_SR',
                0,
                @cuentaId,
                @routeId,
                9101,
                NULL,
                @programId,
                @schdate
            );
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
            @startminutes,
            @analysisPointId,
            @checkpoint,
            @cameraId,
            @config;
    END

    CLOSE SofiaCursor;
    DEALLOCATE SofiaCursor;
END
GO
