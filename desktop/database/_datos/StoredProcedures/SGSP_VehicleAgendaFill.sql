CREATE OR ALTER PROCEDURE [dbo].[SGSP_VehicleAgendaFill]
    @cDomain VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    -- 1. Configuración estricta del primer día de la semana (Domingo = 1)
    SET DATEFIRST 7; 

    -- Variables operativas
    DECLARE @iProfileVehicleId INT = 0;
    DECLARE @iBlacklist INT = 0;
    
    -- Variables de control de Telemetría
    DECLARE @cDebug CHAR(2) = 'No'; -- Cambiar a 'Si' para debuggear en SSMS
    DECLARE @message VARCHAR(500);
    DECLARE @StartDateTimeText VARCHAR(30);
    
    -- Tiempos base (Hoy a las 00:00 y Mañana a las 00:00)
    DECLARE @dtHoy DATETIME = CAST(GETDATE() AS DATE);
    DECLARE @dtManana DATETIME = DATEADD(DAY, 1, @dtHoy);

    -- 2. Obtención atómica de Perfil y Blacklist
    SELECT 
        @iProfileVehicleId = ISNULL(ProfileVehicleId, 0),
        @iBlacklist = ISNULL(Blacklist, 0)
    FROM dbo.Vehicle WITH (NOLOCK)
    WHERE Domain = @cDomain;

    -- Telemetría: Lectura Inicial
    IF @cDebug = 'Si'
    BEGIN
        SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
        SET @message = 'Start DateTime : %s | [SGSP_VehicleAgendaFill] | Patente: ' + @cDomain + ' | ProfileId: ' + CAST(@iProfileVehicleId AS VARCHAR(10)) + ' | Blacklist: ' + CAST(@iBlacklist AS VARCHAR(2));
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
    END

    -- 3. Control de escape por Penalización (Blacklist)
    IF @iBlacklist = 1
    BEGIN
        IF @cDebug = 'Si'
        BEGIN
            SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
            SET @message = 'Start DateTime : %s | [SGSP_VehicleAgendaFill] | Escape por Blacklist activo.';
            RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
        END

        DELETE FROM dbo.VehicleAgenda WHERE vea_cDomain = @cDomain AND vea_iProcessed = 0;
        
        INSERT INTO dbo.VehicleAgenda (vea_cDomain, vea_dtExecution, vea_cAction, vea_iProcessed)
        VALUES (@cDomain, @dtHoy, 'BLACK', 0), (@cDomain, @dtManana, 'BLACK', 0);
        RETURN; 
    END

    -- 4. Control de escape por Acceso Libre (Sin Perfil Asignado)
    IF @iProfileVehicleId = 0
    BEGIN
        IF @cDebug = 'Si'
        BEGIN
            SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
            SET @message = 'Start DateTime : %s | [SGSP_VehicleAgendaFill] | Escape por ProfileId en cero (Acceso Libre).';
            RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
        END

        DELETE FROM dbo.VehicleAgenda WHERE vea_cDomain = @cDomain AND vea_iProcessed = 0;
        RETURN;
    END

    -- 5. Limpieza preventiva de marcas futuras no procesadas
    DELETE FROM dbo.VehicleAgenda WHERE vea_cDomain = @cDomain AND vea_iProcessed = 0;

    -- 6. Vector temporal de días a evaluar (Hoy y Mañana)
    DECLARE @DiasAEvaluar TABLE (Fecha DATE, DiaSemana INT);
    INSERT INTO @DiasAEvaluar VALUES 
        (@dtHoy, DATEPART(dw, @dtHoy)),
        (@dtManana, DATEPART(dw, @dtManana));

    -- Renglón 1: Bloqueos base a las 00:00 para ambos días
    INSERT INTO dbo.VehicleAgenda (vea_cDomain, vea_dtExecution, vea_cAction, vea_iProcessed)
    SELECT @cDomain, CAST(Fecha AS DATETIME), 'BLACK', 0
    FROM @DiasAEvaluar;
    
    IF @cDebug = 'Si'
    BEGIN
        SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
        SET @message = 'Start DateTime : %s | [SGSP_VehicleAgendaFill] | R1: Base 00:00 Insertados: ' + CAST(@@ROWCOUNT AS VARCHAR(10));
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
    END

    -- Renglón 2: Turnos regulares (Inicio < Fin) - Entrada ALLOW
    INSERT INTO dbo.VehicleAgenda (vea_cDomain, vea_dtExecution, vea_cAction, vea_iProcessed)
    SELECT 
        @cDomain,
        DATEADD(SECOND, DATEDIFF(SECOND, CAST(r.pvr_tHoraInicio AS DATE), r.pvr_tHoraInicio), CAST(d.Fecha AS DATETIME)),
        'ALLOW',
        0
    FROM _Tablas.dbo.t_PerfilVehicleRule r WITH (NOLOCK)
    CROSS JOIN @DiasAEvaluar d
    WHERE r.pvr_idPerfilVehicle = @iProfileVehicleId
      AND CAST(r.pvr_tHoraInicio AS TIME) < CAST(r.pvr_tHoraFin AS TIME)
      AND (
            (d.DiaSemana = 2 AND r.pvr_iLunes = 1) OR
            (d.DiaSemana = 3 AND r.pvr_iMartes = 1) OR
            (d.DiaSemana = 4 AND r.pvr_iMiercoles = 1) OR
            (d.DiaSemana = 5 AND r.pvr_iJueves = 1) OR
            (d.DiaSemana = 6 AND r.pvr_iViernes = 1) OR
            (d.DiaSemana = 7 AND r.pvr_iSabado = 1) OR
            (d.DiaSemana = 1 AND r.pvr_iDomingo = 1)
          );
          
    IF @cDebug = 'Si'
    BEGIN
        SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
        SET @message = 'Start DateTime : %s | [SGSP_VehicleAgendaFill] | R2: Regulares ALLOW Insertados: ' + CAST(@@ROWCOUNT AS VARCHAR(10));
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
    END

    -- Renglón 3: Turnos regulares (Inicio < Fin) - Salida BLACK
    INSERT INTO dbo.VehicleAgenda (vea_cDomain, vea_dtExecution, vea_cAction, vea_iProcessed)
    SELECT 
        @cDomain,
        DATEADD(SECOND, DATEDIFF(SECOND, CAST(r.pvr_tHoraFin AS DATE), r.pvr_tHoraFin), CAST(d.Fecha AS DATETIME)),
        'BLACK',
        0
    FROM _Tablas.dbo.t_PerfilVehicleRule r WITH (NOLOCK)
    CROSS JOIN @DiasAEvaluar d
    WHERE r.pvr_idPerfilVehicle = @iProfileVehicleId
      AND CAST(r.pvr_tHoraInicio AS TIME) < CAST(r.pvr_tHoraFin AS TIME)
      AND (
            (d.DiaSemana = 2 AND r.pvr_iLunes = 1) OR
            (d.DiaSemana = 3 AND r.pvr_iMartes = 1) OR
            (d.DiaSemana = 4 AND r.pvr_iMiercoles = 1) OR
            (d.DiaSemana = 5 AND r.pvr_iJueves = 1) OR
            (d.DiaSemana = 6 AND r.pvr_iViernes = 1) OR
            (d.DiaSemana = 7 AND r.pvr_iSabado = 1) OR
            (d.DiaSemana = 1 AND r.pvr_iDomingo = 1)
          );
          
    IF @cDebug = 'Si'
    BEGIN
        SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
        SET @message = 'Start DateTime : %s | [SGSP_VehicleAgendaFill] | R3: Regulares BLACK Insertados: ' + CAST(@@ROWCOUNT AS VARCHAR(10));
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
    END

    -- Renglón 4: Turnos nocturnos cruzados (Inicio > Fin) - Apertura ALLOW
    INSERT INTO dbo.VehicleAgenda (vea_cDomain, vea_dtExecution, vea_cAction, vea_iProcessed)
    SELECT 
        @cDomain,
        DATEADD(SECOND, DATEDIFF(SECOND, CAST(r.pvr_tHoraInicio AS DATE), r.pvr_tHoraInicio), CAST(d.Fecha AS DATETIME)),
        'ALLOW',
        0
    FROM _Tablas.dbo.t_PerfilVehicleRule r WITH (NOLOCK)
    CROSS JOIN @DiasAEvaluar d
    WHERE r.pvr_idPerfilVehicle = @iProfileVehicleId
      AND CAST(r.pvr_tHoraInicio AS TIME) > CAST(r.pvr_tHoraFin AS TIME)
      AND (
            (d.DiaSemana = 2 AND r.pvr_iLunes = 1) OR
            (d.DiaSemana = 3 AND r.pvr_iMartes = 1) OR
            (d.DiaSemana = 4 AND r.pvr_iMiercoles = 1) OR
            (d.DiaSemana = 5 AND r.pvr_iJueves = 1) OR
            (d.DiaSemana = 6 AND r.pvr_iViernes = 1) OR
            (d.DiaSemana = 7 AND r.pvr_iSabado = 1) OR
            (d.DiaSemana = 1 AND r.pvr_iDomingo = 1)
          );
          
    IF @cDebug = 'Si'
    BEGIN
        SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
        SET @message = 'Start DateTime : %s | [SGSP_VehicleAgendaFill] | R4: Nocturnos ALLOW Insertados: ' + CAST(@@ROWCOUNT AS VARCHAR(10));
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
    END

    -- Renglón 5: Turnos nocturnos cruzados (Inicio > Fin) - Cierre BLACK (+1 Día Proyectado)
    INSERT INTO dbo.VehicleAgenda (vea_cDomain, vea_dtExecution, vea_cAction, vea_iProcessed)
    SELECT 
        @cDomain,
        DATEADD(DAY, 1, DATEADD(SECOND, DATEDIFF(SECOND, CAST(r.pvr_tHoraFin AS DATE), r.pvr_tHoraFin), CAST(d.Fecha AS DATETIME))),
        'BLACK',
        0
    FROM _Tablas.dbo.t_PerfilVehicleRule r WITH (NOLOCK)
    CROSS JOIN @DiasAEvaluar d
    WHERE r.pvr_idPerfilVehicle = @iProfileVehicleId
      AND CAST(r.pvr_tHoraInicio AS TIME) > CAST(r.pvr_tHoraFin AS TIME)
      AND (
            (d.DiaSemana = 2 AND r.pvr_iLunes = 1) OR
            (d.DiaSemana = 3 AND r.pvr_iMartes = 1) OR
            (d.DiaSemana = 4 AND r.pvr_iMiercoles = 1) OR
            (d.DiaSemana = 5 AND r.pvr_iJueves = 1) OR
            (d.DiaSemana = 6 AND r.pvr_iViernes = 1) OR
            (d.DiaSemana = 7 AND r.pvr_iSabado = 1) OR
            (d.DiaSemana = 1 AND r.pvr_iDomingo = 1)
          );
          
    IF @cDebug = 'Si'
    BEGIN
        SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
        SET @message = 'Start DateTime : %s | [SGSP_VehicleAgendaFill] | R5: Nocturnos BLACK Cierre Insertados: ' + CAST(@@ROWCOUNT AS VARCHAR(10));
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
    END
END