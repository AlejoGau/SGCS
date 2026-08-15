CREATE OR ALTER PROCEDURE [dbo].[TrackGuard_Restriccion_exec]                  
AS                  
BEGIN                  
 SET NOCOUNT ON     
 set DATEFORMAT ymd  
             

	-- declaro las variables
	declare @Id int
	declare @Name varchar(128)
	declare @Metadata varchar(max)

	-- busco todas las geocercas de exclusion

	DECLARE geofense_cursor CURSOR FOR 
		select Id,Name,MetaData
			FROM _Datos.dbo.GeoFense o
			WHERE GeoType = 'D'
	
	OPEN geofense_cursor

	FETCH NEXT FROM geofense_cursor INTO @Id
		,@Name
		,@Metadata


	WHILE @@FETCH_STATUS = 0
	BEGIN
		--tomo los valores de la metadata
		DECLARE @FilterTable TABLE(element_id INT NOT NULL, parent_ID INT, Object_ID INT, NAME VARCHAR(2000), StringValue VARCHAR(MAX) NOT NULL, ValueType VARCHAR(10) NOT null)
		INSERT INTO @FilterTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType) SELECT * FROM dbo.parseJSON(@Metadata)
		
		declare @cuenta1 int;
		declare @cuenta2 int;
		declare @distaciaMax int;

		select @cuenta1 = CAST(StringValue AS INT) from @FilterTable where NAME = 'cuentaMonitoreada'
		select @cuenta2 = CAST(StringValue AS INT) from @FilterTable where NAME = 'cuentaReceptora'
		select @distaciaMax = CAST(StringValue AS INT) from @FilterTable where NAME = 'distancia'

		-- me fijo la distancia entre las cuentas

		-- primero busco las posiciones de cada cuenta
		declare @rlatitud1 real;
		declare @rlatitud2 real;
		declare @rlongitud1 real;
		declare @rlongitud2 real;

		select @rlatitud1 = gps_rlatitud, @rlongitud1 = gps_rlongitud from _datos..p_gps where gps_idcuenta = @cuenta1
		select @rlatitud2 = gps_rlatitud, @rlongitud2 = gps_rlongitud from _datos..p_gps where gps_idcuenta = @cuenta2
		
		
		print @cuenta1
		print @rlatitud1
		print @cuenta2
		print @rlatitud2
		print @distaciaMax
		

		-- caculo la distancia
		declare @distancia real;

		select @distancia = geography::Point(@rlatitud1, @rlongitud1, 4326).STDistance(geography::Point(@rlatitud2, @rlongitud2, 4326))                         

		print @distancia
		-- creo los eventos de las que estan demasiado cerca

		if (@distancia < @distaciaMax)
		BEGIN
			print 'muy cerca'
			exec _desktop..[AlarmaGenerar] @idCta = @cuenta1, @cAlarma = '_RP',@cGeofenceName = @Name
			exec _desktop..[AlarmaGenerar] @idCta = @cuenta2, @cAlarma = '_RP',@cGeofenceName = @Name
		END

		FETCH NEXT FROM geofense_cursor INTO @Id
			,@Name
			,@Metadata
			
	END
	CLOSE geofense_cursor;
	DEALLOCATE geofense_cursor;

	-- actualizo tabla de tareas con la ultima ejecución
	EXEC [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'TrackGuard_Restriccion_exec', @Repetition = 2
END