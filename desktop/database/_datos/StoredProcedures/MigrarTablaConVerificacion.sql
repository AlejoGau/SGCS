CREATE OR ALTER PROCEDURE MigrarTablaConVerificacion
	@NombreTabla SYSNAME,
    @CantidadDatos INT OUTPUT,
    @CantidadHistory INT OUTPUT,
    @DuracionSegundos INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TablaOriginal SYSNAME = QUOTENAME(@NombreTabla),
            @TablaTemporal SYSNAME = @NombreTabla + '_old',
            @SQL NVARCHAR(MAX),
            @Mensaje NVARCHAR(MAX),
            @Resultado NVARCHAR(50),
            @Usuario SYSNAME = SUSER_SNAME(),
            @Inicio DATETIME = GETDATE(),
            @cCierre CHAR(6),
            @Error INT;

    SET @Mensaje = '[MigrarTablaConVerificacion] | Se intentara migrar de la tabla [' + @NombreTabla + '].';
    RAISERROR(@Mensaje, 10, 1) WITH NOWAIT;

    -- Verificar existencia en _Datos
    IF OBJECT_ID('_Datos.dbo.' + @NombreTabla, 'U') IS NULL
    BEGIN
        SET @Mensaje = '[MigrarTablaConVerificacion] | ERROR: La tabla [' + @NombreTabla + '] no existe en _Datos.';
        RAISERROR(@Mensaje, 16, 1) WITH NOWAIT;

        SET @DuracionSegundos = DATEDIFF(SECOND, @Inicio, GETDATE());
        INSERT INTO _LogDB.dbo.LogMigracionTablas
            (NombreTabla, FechaMigracion, RegistrosDatos, RegistrosHistory, Resultado, Mensaje, Usuario, DuracionSegundos)
        VALUES
            (@NombreTabla, GETDATE(), NULL, NULL, 'ERROR', @Mensaje, @Usuario, @DuracionSegundos);

        RETURN -1;
    END

    -- Verificar si ya existe como SYNONYM
    IF OBJECT_ID('_Datos.dbo.' + @NombreTabla, 'SN') IS NOT NULL
    BEGIN
        SET @Mensaje = '[MigrarTablaConVerificacion] | NO SE MIGRA. Ya existe el SYNONYM [' + @NombreTabla + '] en _Datos.';
        RAISERROR(@Mensaje, 10, 1) WITH NOWAIT;

        SET @DuracionSegundos = DATEDIFF(SECOND, @Inicio, GETDATE());
        INSERT INTO _LogDB.dbo.LogMigracionTablas
            (NombreTabla, FechaMigracion, RegistrosDatos, RegistrosHistory, Resultado, Mensaje, Usuario, DuracionSegundos)
        VALUES
            (@NombreTabla, GETDATE(), NULL, NULL, 'OMITIDA', @Mensaje, @Usuario, @DuracionSegundos);

        RETURN -2;
    END

	-- Renombrar tabla en _Datos
	SET @Mensaje = '[MigrarTablaConVerificacion] | Renombrar la tabla temporalmente como [' + @TablaTemporal + '].';
    RAISERROR(@Mensaje, 10, 1) WITH NOWAIT;
    
    SET @SQL = 'EXEC _Datos.sys.sp_rename ''' + @TablaOriginal + ''', ''' + @TablaTemporal + ''';';
    EXEC sp_executesql @SQL;

    -- Ejecutar procedimiento que crea tabla en _History y el SYNONYM
	SET @Mensaje = '[MigrarTablaConVerificacion] | Crear tabla depurada  [' + @NombreTabla + '] en _History';
    RAISERROR(@Mensaje, 10, 1) WITH NOWAIT;

    SET @cCierre = RIGHT(@NombreTabla, 6); -- AAAAMM
    EXEC @Error = [dbo].[SGSP_CreoPRDepurado] @cCierre = @cCierre, @nError = @Error OUTPUT, @CrearSynonym = 0;

    IF @Error <> 0
    BEGIN
        SET @Mensaje = '[MigrarTablaConVerificacion] | ERROR: Falló la creación de la tabla [' + @NombreTabla + '] en _History';
        RAISERROR(@Mensaje, 16, 1) WITH NOWAIT;

		-- Restaurar nombre original en _Datos
		SET @Mensaje = '[MigrarTablaConVerificacion] | Restaurar nombre original [' + @NombreTabla + ']  en _Datos';
		RAISERROR(@Mensaje, 10, 1) WITH NOWAIT;

        SET @SQL = 'EXEC _Datos.sys.sp_rename ''' + QUOTENAME(@TablaTemporal) + ''', ''' + @NombreTabla + ''';';
        EXEC sp_executesql @SQL;

        SET @DuracionSegundos = DATEDIFF(SECOND, @Inicio, GETDATE());
        INSERT INTO _LogDB.dbo.LogMigracionTablas
            (NombreTabla, FechaMigracion, RegistrosDatos, RegistrosHistory, Resultado, Mensaje, Usuario, DuracionSegundos)
        VALUES
            (@NombreTabla, GETDATE(), NULL, NULL, 'ERROR', @Mensaje, @Usuario, @DuracionSegundos);

        RETURN -3;
    END

	-- Insertar datos desde la tabla temporal a la nueva en _History
	SET @Mensaje = '[MigrarTablaConVerificacion] | Insertar datos desde la tabla temporal [' + @TablaTemporal + '] a la nueva en _History';
    RAISERROR(@Mensaje, 10, 1) WITH NOWAIT;

	SET @SQL = 'INSERT INTO _History.dbo.' + QUOTENAME(@NombreTabla) +
			   ' SELECT * FROM _Datos.dbo.' + QUOTENAME(@TablaTemporal);
	EXEC sp_executesql @SQL;

    -- Contar registros en tabla temporal
    SET @SQL = 'SELECT @Cantidad = COUNT(*) FROM _Datos.dbo.' + QUOTENAME(@TablaTemporal) + ';';
    EXEC sp_executesql @SQL, N'@Cantidad INT OUTPUT', @CantidadDatos OUTPUT;

    -- Contar registros en tabla _History
    SET @SQL = 'SELECT @Cantidad = COUNT(*) FROM _History.dbo.' + QUOTENAME(@NombreTabla) + ';';
    EXEC sp_executesql @SQL, N'@Cantidad INT OUTPUT', @CantidadHistory OUTPUT;

	SET @Mensaje = '[MigrarTablaConVerificacion] | Verificar cantidad de registros copiados a _History';
    RAISERROR(@Mensaje, 10, 1) WITH NOWAIT;
    IF @CantidadDatos <> @CantidadHistory
    BEGIN
        SET @Mensaje = '[MigrarTablaConVerificacion] | ERROR: Cantidad de registros no coincide al migrar [' + @NombreTabla + '] - _Datos=' +
                       CAST(@CantidadDatos AS VARCHAR) + ', _History=' + CAST(@CantidadHistory AS VARCHAR);
        RAISERROR(@Mensaje, 16, 1) WITH NOWAIT;

        -- Restaurar nombre original en _Datos
		SET @Mensaje = '[MigrarTablaConVerificacion] | Restaurar nombre original [' + @NombreTabla + ']  en _Datos';
		RAISERROR(@Mensaje, 10, 1) WITH NOWAIT;

        SET @SQL = 'EXEC _Datos.sys.sp_rename ''' + QUOTENAME(@TablaTemporal) + ''', ''' + @NombreTabla + ''';';
        EXEC sp_executesql @SQL;

        SET @DuracionSegundos = DATEDIFF(SECOND, @Inicio, GETDATE());
        INSERT INTO _LogDB.dbo.LogMigracionTablas
            (NombreTabla, FechaMigracion, RegistrosDatos, RegistrosHistory, Resultado, Mensaje, Usuario, DuracionSegundos)
        VALUES
            (@NombreTabla, GETDATE(), @CantidadDatos, @CantidadHistory, 'ERROR', @Mensaje, @Usuario, @DuracionSegundos);

        RETURN -4;
    END

    -- Eliminar tabla renombrada en _Datos
	SET @Mensaje = '[MigrarTablaConVerificacion] | Eliminar tabla renombrada [' + @TablaTemporal + ']  en _Datos';
	RAISERROR(@Mensaje, 10, 1) WITH NOWAIT;

    SET @SQL = 'DROP TABLE _Datos.dbo.' + QUOTENAME(@TablaTemporal) + ';';
    EXEC sp_executesql @SQL;

    SET @Mensaje = '[MigrarTablaConVerificacion] | Migración de la tabla [' + @NombreTabla + '] completada correctamente.';
    RAISERROR(@Mensaje, 10, 1) WITH NOWAIT;

    SET @DuracionSegundos = DATEDIFF(SECOND, @Inicio, GETDATE());
    INSERT INTO _LogDB.dbo.LogMigracionTablas
        (NombreTabla, FechaMigracion, RegistrosDatos, RegistrosHistory, Resultado, Mensaje, Usuario, DuracionSegundos)
    VALUES
        (@NombreTabla, GETDATE(), @CantidadDatos, @CantidadHistory, 'OK', @Mensaje, @Usuario, @DuracionSegundos);

    RETURN 0;
END