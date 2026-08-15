-- =============================================
-- Author:		Rodrigo Roman / Refactorizado Pablo
-- Create date: 18/10/2019
-- Refactor date: 2025-12-19
-- Description:	Genera eventos de geocerca (Sin cursores, Set-Based)
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[GeoFenceExecute]
AS
BEGIN
    SET NOCOUNT ON;

    -- ===== TODOS LOS DECLARE AL INICIO =====
    DECLARE @message NVARCHAR(MAX) = '';
    DECLARE @StartDateTimeText VARCHAR(MAX);
    DECLARE @cDebug CHAR(2) = 'No';  -- Cambiar a 'Si' para debug
    
    DECLARE @GEOFENCELASTID INT;
    DECLARE @GPSLASTID INT;
    DECLARE @VIAJEHORATOLERANCIA INT;
    DECLARE @TIEMPOEJECUCIONVIAJE INT;

    DECLARE @idCta INT;
    DECLARE @GeofenceId INT;
    DECLARE @rawFechaHora DATETIME;
    DECLARE @cGeofenceName NVARCHAR(128);
    DECLARE @lat REAL;
    DECLARE @lng REAL;
    DECLARE @cAlarma CHAR(3);
    DECLARE @Estado INT;
    DECLARE @gps_iid INT;

    DECLARE @tgv_estado INT;
    DECLARE @tgv_idkey INT;
    DECLARE @tgv_geofenseinicio INT;
    DECLARE @tgv_geofensefin INT;
    DECLARE @tgv_fecha_prg_inicio DATETIME;
    DECLARE @tgv_fecha_prg_fin DATETIME;
    DECLARE @tgv_codigoexterno NVARCHAR(255);
    DECLARE @tgv_nombre NVARCHAR(255);
    DECLARE @TipoEvento VARCHAR(10);
    DECLARE @cContenido NVARCHAR(MAX);

    DECLARE @AlarmasPendientes TABLE (
        idCta INT,
        GeofenceId INT,
        rawFechaHora DATETIME,
        cGeofenceName NVARCHAR(128),
        lat REAL,
        lng REAL,
        cAlarma CHAR(3),
        Estado INT,
        gps_iid INT,
        Procesado BIT DEFAULT 0
    );

    DECLARE @ViajesPendientes TABLE (
        idCta INT,
        GeoFenceId INT,
        rawFechaHora DATETIME,
        cGeofenceName NVARCHAR(255),
        lat REAL,
        lng REAL,
        gps_iid INT,
        tgv_estado INT,
        tgv_idkey INT,
        tgv_geofenseinicio INT,
        tgv_geofensefin INT,
        tgv_fecha_prg_inicio DATETIME,
        tgv_fecha_prg_fin DATETIME,
        tgv_codigoexterno NVARCHAR(255),
        tgv_nombre NVARCHAR(255),
        TipoEvento VARCHAR(10),
        Procesado BIT DEFAULT 0
    );

    -- ===== AHORA SÍ: LÓGICA DEL PROCEDIMIENTO =====
    SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
    SET @message = 'Start DateTime : %s | GeoFenceExecute | Control de GeoCercas';
    RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

    SET @GEOFENCELASTID = (
        SELECT par_ivalor 
        FROM _Tablas..t_parametros 
        WHERE RTRIM(par_ccodigo) = 'GEOFENCELASTID'
    );
    SET @GPSLASTID = (
        SELECT MAX(gps_iid) 
        FROM [_Datos].[dbo].p_PosicionesGPS
    );
    SET @VIAJEHORATOLERANCIA = ISNULL(
        (SELECT par_ivalor FROM _Tablas.dbo.t_parametros WITH (NOLOCK) WHERE par_cCodigo = 'TOLERANCIAENVIAJES'),
        120
    );
    SET @TIEMPOEJECUCIONVIAJE = ISNULL(
        (SELECT par_ivalor FROM _Tablas.dbo.t_parametros WITH (NOLOCK) WHERE par_cCodigo = 'TIEMPOEJECUCIONVIAJES'),
        120
    );

    -- Validación de rango: si no hay nuevas posiciones, salir
    IF @GPSLASTID IS NULL OR @GEOFENCELASTID >= @GPSLASTID
    BEGIN
        SET @message = 'Start DateTime : %s | GeoFenceExecute | Sin nuevas posiciones GPS para procesar';
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
        RETURN;
    END;

    BEGIN TRY
        -- ===== SECCIÓN 1: PROCESAMIENTO DE GEOCERCAS (INGRESOS/EGRESOS) =====
        SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
        SET @message = 'Start DateTime : %s | GeoFenceExecute | Procesando cambios de estado en geocercas';
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

        WITH EstadosActuales AS (
            SELECT 
                p.gps_idcuenta,
                g.id AS GeoFenceId,
                g.Name AS cGeoFenceName,
                g.GeoType,
                g.MetaData,
                gc.Estado AS EstadoAnterior,
                CASE 
                    WHEN GeoData.MakeValid().STIntersects(p.gps_geopoint.MakeValid()) = 1 THEN 1 
                    ELSE 0 
                END AS EstadoActual,
                p.gps_iid,
                p.gps_tRawfechahora,
                p.gps_rLatitud,
                p.gps_rLongitud,
                rec_calarma,
                ROW_NUMBER() OVER (
                    PARTITION BY p.gps_idcuenta, g.id 
                    ORDER BY p.gps_tRawfechahora DESC, p.gps_iid DESC
                ) AS rn
            FROM [_Datos].[dbo].p_PosicionesGPS p
            INNER JOIN [_Datos].[dbo].GeoFenseCuenta gc ON p.gps_idcuenta = gc.CuentaId
            INNER JOIN [_Datos].[dbo].GeoFense g ON gc.geofenseid = g.id
            LEFT JOIN [_Datos].[dbo].p_recepcion ON gps_idrec = rec_iid
            INNER JOIN [_Datos].[dbo].m_cuentas ON cue_cimei = gps_cimei
            WHERE p.gps_iid > @GEOFENCELASTID 
                AND p.gps_iid <= @GPSLASTID
                AND gps_cimei IS NOT NULL 
                AND gps_cimei != ''
        ),
        CambiosDeEstado AS (
            SELECT 
                gps_idcuenta,
                GeoFenceId,
                cGeoFenceName,
                GeoType,
                MetaData,
                EstadoAnterior,
                EstadoActual,
                gps_iid,
                gps_tRawfechahora,
                gps_rLatitud,
                gps_rLongitud
            FROM EstadosActuales
            WHERE rn = 1
                AND (rec_calarma IS NULL OR rec_calarma NOT IN ('_FR', '_IG', '_EG'))
                AND (
                    (EstadoActual = 1 AND (EstadoAnterior = 0 OR EstadoAnterior IS NULL) AND GeoType IN ('X', 'I'))
                    OR  
                    (EstadoActual = 0 AND (EstadoAnterior = 1 OR EstadoAnterior IS NULL) AND GeoType IN ('X', 'E'))
                )
        )
        INSERT INTO @AlarmasPendientes (idCta, GeofenceId, rawFechaHora, cGeofenceName, lat, lng, cAlarma, Estado, gps_iid)
        SELECT 
            gps_idcuenta,
            GeoFenceId,
            gps_tRawfechahora,
            cGeoFenceName,
            gps_rLatitud,
            gps_rLongitud,
            CASE
                WHEN MetaData LIKE '%polyline%' THEN '_FR'
                WHEN GeoType = 'I' THEN '_IG'
                WHEN GeoType = 'E' THEN '_EG'
                WHEN GeoType = 'X' AND EstadoActual = 1 THEN '_IG'
                WHEN GeoType = 'X' AND EstadoActual = 0 THEN '_EG'
            END,
            EstadoActual,
            gps_iid
        FROM CambiosDeEstado;

        -- Procesar alarmas
        WHILE EXISTS (SELECT 1 FROM @AlarmasPendientes WHERE Procesado = 0)
        BEGIN
            SELECT TOP 1
                @idCta = idCta,
                @GeofenceId = GeofenceId,
                @rawFechaHora = rawFechaHora,
                @cGeofenceName = cGeofenceName,
                @lat = lat,
                @lng = lng,
                @cAlarma = cAlarma,
                @Estado = Estado,
                @gps_iid = gps_iid
            FROM @AlarmasPendientes 
            WHERE Procesado = 0
            ORDER BY gps_iid;

            Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | GeoFenceExecute | Por cada punto genero una alarma'
            RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
         
            Set @message = 'Start DateTime : %s | GeoFenceExecute | gps_iid => '+ Rtrim(Cast(@gps_iid As Varchar(10)))
            RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

            If @cDebug = 'Si'
            Begin
                Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
                Set @message = 'Start DateTime : %s | GeoFenceExecute | Execute [_Desktop].[dbo].[AlarmaGenerar]'
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                Set @message = 'Start DateTime : %s | GeoFenceExecute | @idCta : ' + CONVERT(VARCHAR(10), @idCta)
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                Set @message = 'Start DateTime : %s | GeoFenceExecute | @cAlarma : ' + @cAlarma
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                Set @message = 'Start DateTime : %s | GeoFenceExecute | @cGeofenceName : ' + @cGeofenceName
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                Set @message = 'Start DateTime : %s | GeoFenceExecute | @lat : ' + CONVERT(VARCHAR(10), @lat)
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                Set @message = 'Start DateTime : %s | GeoFenceExecute | @lng : ' + CONVERT(VARCHAR(10), @lng)
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                Set @message = 'Start DateTime : %s | GeoFenceExecute | @rawFechaHora : ' + CONVERT(VarChar(MAX), @rawFechaHora, 20)
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    
            End

            EXECUTE [_Desktop].[dbo].[AlarmaGenerar] 
                @idCta = @idCta,
                @cAlarma = @cAlarma,
                @cGeofenceName = @cGeofenceName,
                @lat = @lat,
                @lng = @lng,
                @rawFechaHora = @rawFechaHora;

            Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | GeoFenceExecute | Seteo el estado de cada geocerca'
            RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      

            If @cDebug = 'Si'
            Begin
                Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
                Set @message = 'Start DateTime : %s | GeoFenceExecute | Execute [_Desktop].[dbo].[GEOFENCEESTADO]'
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                Set @message = 'Start DateTime : %s | GeoFenceExecute | @idCta : ' + CONVERT(VARCHAR(10), @idCta)
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                Set @message = 'Start DateTime : %s | GeoFenceExecute | @GeofenceId : ' + CONVERT(VARCHAR(10), @GeofenceId)
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                Set @message = 'Start DateTime : %s | GeoFenceExecute | @rawFechaHora : ' + CONVERT(VarChar(MAX), @rawFechaHora, 20)
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    
                Set @message = 'Start DateTime : %s | GeoFenceExecute | @Estado : ' + CONVERT(VARCHAR(10), @Estado)
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
            End

            EXECUTE [_Desktop].[dbo].[GeofenceEstado] 
                @idCta = @idCta, 
                @GeofenceId = @GeofenceId, 
                @rawFechaHora = @rawFechaHora, 
                @Estado = @Estado;

            UPDATE @AlarmasPendientes 
            SET Procesado = 1 
            WHERE gps_iid = @gps_iid;
        END;

        -- ===== SECCIÓN 2: PROCESAMIENTO DE VIAJES (INICIO/FIN) =====
        SET @StartDateTimeText = CONVERT(VARCHAR, GETDATE(), 120);
        SET @message = 'Start DateTime : %s | GeoFenceExecute | Genero comienzos y fin de viaje por geocercas';
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

        SET @GEOFENCELASTID = @GPSLASTID;

        WITH GeoFenseCandidatas AS (
            SELECT 
                p.gps_iid,
                p.gps_idcuenta,
                p.gps_tRawfechahora,
                p.gps_rLatitud,
                p.gps_rLongitud,
                gc.tgv_idkey,
                gc.tgv_estado,
                gc.tgv_geofenseinicio,
                gc.tgv_geofensefin,
                gc.tgv_fecha_prg_inicio,
                gc.tgv_fecha_prg_fin,
                gc.tgv_codigoexterno,
                gc.tgv_nombre,
                g.Id AS GeoFenceId,
                g.Name AS GeoFenceName,
                g.GeoType,
                g.MetaData,
                CASE
                    WHEN g.Id = gc.tgv_geofenseinicio THEN 'INICIO'
                    WHEN g.Id = gc.tgv_geofensefin THEN 'FIN'
                END AS TipoEvento,
                ROW_NUMBER() OVER (
                    PARTITION BY p.gps_iid, gc.tgv_idkey 
                    ORDER BY g.Id
                ) AS rn
            FROM [_Datos].[dbo].p_PosicionesGPS p
            INNER JOIN [_Datos].[dbo].m_tgviaje gc WITH (NOLOCK) ON p.gps_idcuenta = gc.tgv_cueiid
            LEFT JOIN [_Datos].[dbo].p_recepcion WITH (NOLOCK) ON gps_idrec = rec_iid
            INNER JOIN [_Datos].[dbo].m_cuentas WITH (NOLOCK) ON cue_cimei = gps_cimei
            INNER JOIN [_Datos].[dbo].GeoFense g WITH (NOLOCK) ON 
                (
                    g.Id = gc.tgv_geofenseinicio
                    AND (gc.tgv_estado = 0 OR gc.tgv_estado IS NULL)
                    AND p.gps_tRawfechahora BETWEEN DATEADD(MINUTE, -@TIEMPOEJECUCIONVIAJE, gc.tgv_fecha_prg_inicio) 
                                                 AND DATEADD(MINUTE, @TIEMPOEJECUCIONVIAJE, gc.tgv_fecha_prg_inicio)
                    AND NOT EXISTS (
                        SELECT 1 FROM [_Datos].[dbo].m_tgviaje t WITH (NOLOCK) 
                        WHERE t.tgv_estado = 1 AND t.tgv_cueiid = p.gps_idcuenta
                    )
                    AND (
                        (GeoData.MakeValid().STIntersects(p.gps_geopoint.MakeValid()) = 1 AND g.GeoType IN ('X', 'I'))
                        OR (GeoData.MakeValid().STIntersects(p.gps_geopoint.MakeValid()) = 0 AND g.GeoType IN ('X', 'E'))
                    )
                )
                OR
                (
                    g.Id = gc.tgv_geofensefin
                    AND gc.tgv_estado = 1
                    AND p.gps_tRawfechahora BETWEEN DATEADD(MINUTE, -@TIEMPOEJECUCIONVIAJE, gc.tgv_fecha_prg_fin) 
                                                 AND DATEADD(MINUTE, @TIEMPOEJECUCIONVIAJE, gc.tgv_fecha_prg_fin)
                    AND (
                        (GeoData.MakeValid().STIntersects(p.gps_geopoint.MakeValid()) = 1 AND g.GeoType IN ('X', 'I'))
                        OR (GeoData.MakeValid().STIntersects(p.gps_geopoint.MakeValid()) = 0 AND g.GeoType IN ('X', 'E'))
                    )
                )
            WHERE p.gps_iid > @GEOFENCELASTID
                AND p.gps_iid <= @GPSLASTID
                AND (rec_calarma IS NULL OR rec_calarma NOT IN ('_FR', '_IG', '_EG'))
                AND p.gps_cimei IS NOT NULL 
                AND p.gps_cimei != ''
        ),
        ViajesFinal AS (
            SELECT *
            FROM GeoFenseCandidatas
            WHERE rn = 1
        )
        INSERT INTO @ViajesPendientes (idCta, GeoFenceId, rawFechaHora, cGeofenceName, lat, lng, gps_iid, 
                                       tgv_estado, tgv_idkey, tgv_geofenseinicio, tgv_geofensefin, 
                                       tgv_fecha_prg_inicio, tgv_fecha_prg_fin, tgv_codigoexterno, 
                                       tgv_nombre, TipoEvento)
        SELECT 
            gps_idcuenta,
            GeoFenceId,
            gps_tRawfechahora,
            GeoFenceName,
            gps_rLatitud,
            gps_rLongitud,
            gps_iid,
            tgv_estado,
            tgv_idkey,
            tgv_geofenseinicio,
            tgv_geofensefin,
            tgv_fecha_prg_inicio,
            tgv_fecha_prg_fin,
            tgv_codigoexterno,
            tgv_nombre,
            TipoEvento
        FROM ViajesFinal;

        -- Procesar viajes
        WHILE EXISTS (SELECT 1 FROM @ViajesPendientes WHERE Procesado = 0)
        BEGIN
            SELECT TOP 1
                @idCta = idCta,
                @GeofenceId = GeoFenceId,
                @rawFechaHora = rawFechaHora,
                @cGeofenceName = cGeofenceName,
                @lat = lat,
                @lng = lng,
                @gps_iid = gps_iid,
                @tgv_estado = tgv_estado,
                @tgv_idkey = tgv_idkey,
                @tgv_geofenseinicio = tgv_geofenseinicio,
                @tgv_geofensefin = tgv_geofensefin,
                @tgv_fecha_prg_inicio = tgv_fecha_prg_inicio,
                @tgv_fecha_prg_fin = tgv_fecha_prg_fin,
                @tgv_codigoexterno = tgv_codigoexterno,
                @tgv_nombre = tgv_nombre,
                @TipoEvento = TipoEvento
            FROM @ViajesPendientes 
            WHERE Procesado = 0
            ORDER BY gps_iid;

            SET @cContenido = '';
            Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo el viaje | Me fijo si el viaje es de comienzo o fin | id posicion => '+ Rtrim(Cast(@gps_iid As Varchar(10)))
            RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     

            IF @TipoEvento = 'INICIO'
            BEGIN
                Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
                Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo el viaje | Grabo fecha de comienzo => '+ CONVERT(VarChar(MAX), @rawFechaHora, 20)
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     

                UPDATE [_Datos].[dbo].m_tgviaje 
                SET tgv_estado = 1, tgv_fechainicio = @rawFechaHora 
                WHERE tgv_idkey = @tgv_idkey;

                Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
                Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo el viaje | Creo evento de comienzo'
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     

                Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
                If DATEADD (minute , @VIAJEHORATOLERANCIA , @tgv_fecha_prg_inicio )  < @rawFechaHora
                Begin
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo el viaje | Creo evento de comienzo | Arranco tarde'
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     
                    Select @cAlarma ='_VR'
                End
                ELSE If DATEADD (minute , -@VIAJEHORATOLERANCIA , @tgv_fecha_prg_inicio )  > @rawFechaHora
                Begin
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo el viaje | Creo evento de comienzo | Arranco temprano'
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     
                    Select @cAlarma ='_VT'
                End
                ELSE
                Begin
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo el viaje | Creo evento de comienzo | Arranco en horario'
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     
                    Select @cAlarma ='_IV'
                End
                
                Select @cContenido = '{"idViaje":"'+@tgv_codigoexterno+'","identIficador":"'+@tgv_nombre+'"}'

                If @cDebug = 'Si'
                Begin
                    Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | Execute [_Desktop].[dbo].[AlarmaGenerar]'
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @idCta : ' + CONVERT(VARCHAR(10), @idCta)
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT   
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @cAlarma : ' + @cAlarma
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @cGeofenceName : ' + @cGeofenceName
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @lat : ' + CONVERT(VARCHAR(10), @lat)
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @lng : ' + CONVERT(VARCHAR(10), @lng)
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @rawFechaHora : ' + CONVERT(VarChar(MAX), @rawFechaHora, 20)
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @cContenido : ' + @cContenido
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                End

                Execute [_Desktop].[dbo].[AlarmaGenerar] @idCta = @idCta
                    ,@cAlarma = @cAlarma
                    ,@cGeofenceName = @cGeofenceName
                    ,@lat = @lat
                    ,@lng = @lng
                    ,@rawFechaHora = @rawFechaHora
                    ,@cContenido = @cContenido
            End
            ELSE IF @TipoEvento = 'FIN'
            BEGIN
                Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
                Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo el viaje | Grabo fecha de fin => '+ CONVERT(VarChar(MAX), @rawFechaHora, 20)
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     

                UPDATE [_Datos].[dbo].m_tgviaje 
                SET tgv_estado = 2, tgv_fechafin = @rawFechaHora 
                WHERE tgv_idkey = @tgv_idkey;

                Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
                Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo el viaje | Creo evento de fin'
                RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     

                If DATEADD (minute , @VIAJEHORATOLERANCIA , @tgv_fecha_prg_fin )  < @rawFechaHora
                Begin
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo el viaje | Creo evento de fin | Termino tarde'
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     
                    Select @cAlarma ='_LR'
                End
                ELSE If DATEADD (minute , -@VIAJEHORATOLERANCIA , @tgv_fecha_prg_fin ) > @rawFechaHora
                Begin
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo el viaje | Creo evento de fin | Termino temprano'
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     
                    Select @cAlarma ='_LT'
                End
                ELSE
                Begin
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo el viaje | Creo evento de fin | Termino en horario'
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     
                    Select @cAlarma ='_FV'
                End
                
                Select @cContenido = '{"idViaje":"'+@tgv_codigoexterno+'","identIficador":"'+@tgv_nombre+'"}'

                If @cDebug = 'Si'
                Begin
                    Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | Execute [_Desktop].[dbo].[AlarmaGenerar]'
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @idCta : ' + CONVERT(VARCHAR(10), @idCta)
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @cAlarma : ' + @cAlarma
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @cGeofenceName : ' + @cGeofenceName
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @lat : ' + CONVERT(VARCHAR(10), @lat)
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @lng : ' + CONVERT(VARCHAR(10), @lng)
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @rawFechaHora : ' + CONVERT(VarChar(MAX), @rawFechaHora, 20)
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                    Set @message = 'Start DateTime : %s | GeoFenceExecute | @cContenido : ' + @cContenido
                    RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT      
                End

                Execute [_Desktop].[dbo].[AlarmaGenerar] @idCta = @idCta
                    ,@cAlarma = @cAlarma
                    ,@cGeofenceName = @cGeofenceName
                    ,@lat = @lat
                    ,@lng = @lng
                    ,@rawFechaHora = @rawFechaHora
                    ,@cContenido = @cContenido
            END;

            UPDATE @ViajesPendientes 
            SET Procesado = 1 
            WHERE gps_iid = @gps_iid AND TipoEvento = @TipoEvento;
        END;

        -- ===== ACTUALIZAR PARÁMETRO DE CONTROL =====
        If @GEOFENCELASTID != @GPSLASTID
        Begin
            Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | GeoFenceExecute | Actualizo ultima posición analizada | GPSLASTID => '+ Rtrim(Cast(@GPSLASTID As Varchar(10)))
            RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT     

            UPDATE [_Tablas].[dbo].[t_parametros]
            SET par_ivalor = @GPSLASTID
            WHERE RTRIM(par_ccodigo) = 'GEOFENCELASTID'
        End

        Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | GeoFenceExecute | Completado exitosamente'
        RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        SET @message = 'Start DateTime : %s | GeoFenceExecute | ERROR: ' + @ErrorMessage;
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH;

END;