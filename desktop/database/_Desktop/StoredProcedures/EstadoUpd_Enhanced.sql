CREATE OR ALTER PROCEDURE [dbo].[EstadoUpd_Enhanced]
    @Id INT,
    @Name NVARCHAR(128),
    @est_nestado NUMERIC(1, 0),
    @est_ntipo NUMERIC(1, 0),
    @est_dfechadesde DATETIME,
    @est_nduracion NUMERIC(3, 0),
    @est_dfechahasta DATETIME,
    @est_mnota NVARCHAR(MAX),
    @token VARCHAR(128) = ''
WITH EXECUTE AS CALLER
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Variables para manejo de errores y logging
    DECLARE @ErrorNumber INT = 0,
            @ErrorMessage NVARCHAR(4000) = '',
            @StartDateTimeText NVARCHAR(MAX) = '',
            @message NVARCHAR(MAX) = '',
            @UserName VARCHAR(50) = '',
            @EstadoOld INT = NULL,
            @ReturnCode INT = 0;

    -- **VALIDACIÓN DE PARÁMETROS** (Crítico para evitar errores)
    IF @Id IS NULL OR @Id <= 0
    BEGIN
        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [EstadoUpd] ERROR: @Id debe ser un valor positivo válido'
        RAISERROR(@message, 16, 1, @StartDateTimeText);
        RETURN -1;
    END

    IF @est_nestado NOT IN (0, 1, 2, 3, 4)
    BEGIN
        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [EstadoUpd] ERROR: @est_nestado debe estar entre 0 y 4'
        RAISERROR(@message, 16, 1, @StartDateTimeText);
        RETURN -2;
    END

    IF @est_ntipo NOT IN (-1, 1, 2, 3, 4)
    BEGIN
        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [EstadoUpd] ERROR: @est_ntipo debe ser -1, 1, 2, 3 o 4'
        RAISERROR(@message, 16, 1, @StartDateTimeText);
        RETURN -3;
    END

    -- Validación de fechas crítica
    IF YEAR(@est_dfechadesde) = 2000 OR YEAR(@est_dfechahasta) = 2000
    BEGIN
        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [EstadoUpd] ERROR: Fechas inválidas detectadas (año 2000)'
        RAISERROR(@message, 16, 1, @StartDateTimeText);
        RETURN -4;
    END

    -- Log de inicio
    Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
    Set @message = 'Start DateTime : %s | [EstadoUpd] INICIO - ID: '+Cast(@Id As VarChar(10))+', Estado: '+Cast(@est_nestado As VarChar(1))
    RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

    BEGIN TRY
        IF @token != ''
            SELECT @UserName = ISNULL(dbo.GetUsernameByToken(@token), '--NN--');

        -- TRANSACCION PRINCIPAL
        BEGIN TRANSACTION;

        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [EstadoUpd] Delete de evento a futuro y en los historiales'
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

        -- Eliminar de tabla principal (parámetro ya validado)
		Delete From [_Datos].[dbo].[p_recepcion]
			Where rec_iidcuenta=@id And rec_calarma='_FP' And rec_tfechahora>GETDATE()

        DECLARE @HistoryTableSuffix VARCHAR(6) = CONVERT(VARCHAR(6), GETDATE(), 112); -- YYYYMM
        DECLARE @HistoryTableName NVARCHAR(100) = '[_Datos].[dbo].p_recepcion' + @HistoryTableSuffix;
        DECLARE @SafeSQL NVARCHAR(500);
        DECLARE @TableExists INT = 0;
        
        BEGIN TRY
            Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | [EstadoUpd] Verificando tabla histórica: '+@HistoryTableName
            RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

            -- Verificar que la tabla existe antes de intentar eliminar 
			DECLARE @CheckTableSQL NVARCHAR(500) = 	N'SELECT @TableExistsOut = COUNT(*) FROM _datos.sys.tables t
				  INNER JOIN _datos.sys.schemas s ON t.schema_id = s.schema_id  
				  WHERE s.name = ''dbo'' AND t.name = ''' + @HistoryTableName + '''';
            
            EXEC sp_executesql @CheckTableSQL, N'@TableExistsOut INT OUTPUT', @TableExistsOut = @TableExists OUTPUT;
            
            IF @TableExists > 0
            BEGIN
                SET @SafeSQL = N'DELETE FROM ' + @HistoryTableName + 
                              N' WHERE rec_iidcuenta = @IdParam AND rec_calarma = ''_FP'' AND rec_tfechahora > GETDATE()';
                
                EXEC sp_executesql @SafeSQL, N'@IdParam INT', @IdParam = @Id;
                
                Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
                Set @message = 'Start DateTime : %s | [EstadoUpd] Eliminación de tabla histórica completada'
                RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
            END
        END TRY
        BEGIN CATCH
            Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | [EstadoUpd] Error en eliminación de tabla histórica: '+ERROR_MESSAGE()
            RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
        END CATCH

        -- Obtener el estado actual antes de cambiar
        SELECT @EstadoOld = est_nestado 
			FROM _Datos.dbo.m_estado_cuenta_cab WITH (NOLOCK)
			WHERE est_iidcuenta = @Id;

        IF @EstadoOld IS NULL
        BEGIN
            ROLLBACK TRANSACTION;
            Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | [EstadoUpd] ERROR: No se encontró la cuenta especificada'
            RAISERROR(@message, 16, 1, @StartDateTimeText);
            RETURN -5;
        END

        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [EstadoUpd] Estado anterior: '+Cast(@EstadoOld As VarChar(1))+', Estado nuevo: '+Cast(@est_nestado As VarChar(1))
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

        --Update
        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [EstadoUpd] Actualizando m_estado_cuenta_cab'
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

		UPDATE [_Datos].[dbo].[m_estado_cuenta_cab] 
			SET [est_nestado] = @est_nestado, [est_ntipo] = @est_ntipo	, [est_dfechadesde] = @est_dfechadesde	, [est_nduracion] = @est_nduracion, [est_dfechahasta] = @est_dfechahasta, [est_mnota] = @est_mnota 
		WHERE [est_iidcuenta] = @Id      

        -- Verificar que el UPDATE afectó una fila
        IF @@ROWCOUNT = 0
        BEGIN
            ROLLBACK TRANSACTION;
            Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | [EstadoUpd] ERROR: No se pudo actualizar el estado de la cuenta'
            RAISERROR(@message, 16, 1, @StartDateTimeText);
            RETURN -6;
        END

        --Si no cambio el estado no hago mas nada y @est_ntipo no es -1
        IF @EstadoOld = @est_nestado AND @est_ntipo != -1
        BEGIN
            Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | [EstadoUpd] Sin cambios de estado, finalizando proceso'
            RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
            
            COMMIT TRANSACTION;
           
		   EXEC EstadoSel @Id;
           
		   RETURN 0;
        END

        --Genero un evento de cambio de situacion en p_recepcion
        DECLARE @Alarma NVARCHAR(3) = '_CS',
                @Msg NVARCHAR(MAX) = '',
                @rec_iid INT = 0;

        SET @Alarma = CASE 
            WHEN @est_nestado = 0 AND @est_ntipo = -1 THEN '_NH'
            WHEN @est_nestado = 0 THEN '_SH'
            WHEN @est_nestado = 1 THEN '_SP'
            WHEN @est_nestado = 2 THEN '_SN'
            WHEN @est_nestado = 3 THEN '_SZ'
            WHEN @est_nestado = 4 THEN '_EC'
            ELSE '_CS'
        END;

        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [EstadoUpd] Genero un evento de cambio de situacion en p_recepcion => '+ @Alarma	
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

        -- Obtener descripción de la alarma
        SELECT @Msg = ISNULL(cod_cdescripcion, '--Sin Datos--')
			FROM _tablas..t_codigos_alarma WITH (NOLOCK)
			WHERE cod_ccodigo = @Alarma;

        -- Agregar fecha si es programado
        IF @est_ntipo = -1
            SET @Msg = @Msg + ' (' + CONVERT(VARCHAR(20), @est_dfechadesde, 120) + ')';

        -- Agregar nota si existe
        IF LEN(RTRIM(ISNULL(@est_mnota, ''))) > 0
            SET @Msg = @Msg + ': ' + RTRIM(@est_mnota);

        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [EstadoUpd] Exec _Desktop..AlarmaGenerar con obs: '+@Msg
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

        DECLARE @AlarmaResult INT;
        EXEC @AlarmaResult = _Desktop..AlarmaGenerar
            @idCta = @Id,
            @cAlarma = @Alarma,
            @cObservaciones = @Msg,
            @cRoute = NULL,
            @cGeofenceName = NULL,
            @iroute = NULL,
            @lat = NULL,
            @lng = NULL,
            @idUsuario = 0,
            @cZona = '',
            @cUser = @UserName;

        SET @rec_iid = @AlarmaResult;

        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [EstadoUpd] AlarmaGenerar completado con @rec_iid: '+ISNULL(CAST(@rec_iid AS VARCHAR(10)), 'null')
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

        IF @est_nestado IN (1, 3) -- Prueba / Prueba por Zonas
        BEGIN
            Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | [EstadoUpd] Procesando estado de prueba'
            RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

            DECLARE @AlertaCod INT = 0,
                    @Estado INT = 0,
                    @IdRec INT = 0;

            --Veo si AlarmaAGenerar es un codigo que Genera Alerta	
            SELECT @AlertaCod = ISNULL(cod_nalerta, 0)
				FROM _Tablas.dbo.t_codigos_alarma WITH (NOLOCK)
				WHERE cod_ccodigo = '_FP';

            Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | [EstadoUpd] Código de alerta _FP: '+Cast(@AlertaCod As VarChar(10))
            RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

            IF @AlertaCod != 2 -- No es evento de NO GENERAR
            BEGIN  
                Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
                Set @message = 'Start DateTime : %s | [EstadoUpd] Generando evento fin de prueba (_FP)'
                RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

                SET @Estado = CASE WHEN @AlertaCod = 0 THEN 5 ELSE 0 END;

				--Si la zona horaria es anterior a la ahora del server, el evento de fin de prueba se genera "vencido"
                IF @est_dfechahasta < GETDATE()
                BEGIN
                    Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
                    Set @message = 'Start DateTime : %s | [EstadoUpd] Recalculando fecha hasta (era menor a fecha actual)'
                    RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

                    SET @est_dfechahasta = CASE @est_ntipo
                        WHEN 1 THEN DATEADD(MINUTE, @est_nduracion, GETDATE())
                        WHEN 2 THEN DATEADD(HOUR, @est_nduracion, GETDATE())
                        WHEN 3 THEN DATEADD(DAY, @est_nduracion, GETDATE())
                        WHEN 4 THEN DATEADD(MONTH, @est_nduracion, GETDATE())
                        ELSE DATEADD(HOUR, @est_nduracion, GETDATE())
                    END;

                    Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
                    Set @message = 'Start DateTime : %s | [EstadoUpd] Nueva fecha hasta: '+Convert(VarChar(20), @est_dfechahasta, 120)
                    RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
                END

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [EstadoUpd] NO Genera Alerta (0) lo grabo con estado 5'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Set @message = 'Start DateTime : %s | [EstadoUpd] @Id : '+Cast(@Id As VarChar(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Set @message = 'Start DateTime : %s | [EstadoUpd] @est_dfechahasta : '+Convert(Char(20),@est_dfechahasta,20)
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Set @message = 'Start DateTime : %s | [EstadoUpd] @Msg : '+@Msg
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

                Set @message = 'Start DateTime : %s | [EstadoUpd] Exec SGSP_pRecepcionINS para evento _FP'
                RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

                -- Insertar evento de fin de prueba
                EXEC _datos.dbo.SGSP_pRecepcionINS 
                    @rec_iidcuenta = @Id, 
                    @rec_calarma = '_FP', 
                    @rec_czona = '', 
                    @rec_iusuario = 0, 
                    @rec_tfechahora = @est_dfechahasta, 
                    @rec_tFechaRecepcion = @est_dfechahasta, 
                    @rec_nestado = @Estado, 
                    @rec_nOrigen = 5,
                    @ivalor = @IdRec OUTPUT;

                Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
                Set @message = 'Start DateTime : %s | [EstadoUpd] Evento _FP creado con IdRec : '+ISNULL(CAST(@IdRec AS VARCHAR(10)), 'null')
                RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
            END
        END

        IF @est_nestado = 2   --No Habilitado - Lo tengo que sacar de las cuentas en falla de tst
        BEGIN
            Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | [EstadoUpd] est_nestado = 2 -No Habilitado - Lo tengo que sacar de las cuentas en falla de tst'
            RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

			UPDATE [_Datos].[dbo].[m_status] SET sta_nCuentaEnFalloDeTST = 0,sta_nCuentaEnFallo2doTST = 0,sta_dfechaOPNdesde=Null WHERE sta_iidcuenta = @Id
        END

        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [EstadoUpd] Genero Timeline para el evento que se creo'
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

        DECLARE @Accion VARCHAR(100) = CASE 
            WHEN @est_ntipo = -1 THEN '%CAMBIO DE ESTADO PROGRAMADO%'
            ELSE '%CAMBIO DE ESTADO%'
        END;

        DECLARE @Observacion VARCHAR(MAX) = @Accion + ' ' + ISNULL(@UserName, 'Sistema');
        DECLARE @TimelineDateTime DATETIME = GETDATE();

        Insert Into [_Datos].[dbo].[EventosTimeline]  (etl_irecid, etl_icuenta, etl_tfechahora, etl_caccion, etl_cobservacion, etl_cowner)
			VALUES (@rec_iid, @Id, @TimelineDateTime, @Accion, @Observacion, ISNULL(@UserName, 'Sistema'));

        COMMIT TRANSACTION;

        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [EstadoUpd] Proceso completado exitosamente'
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

        EXEC EstadoSel @Id;
        
        RETURN 0;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        SET @ErrorNumber = ERROR_NUMBER();
        SET @ErrorMessage = ERROR_MESSAGE();
        
        Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
        Set @message = 'Start DateTime : %s | [EstadoUpd] ERROR '+Cast(@ErrorNumber As VarChar(10))+': '+@ErrorMessage
        RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT; -- Cambiado severity a 10 para no abortar

        BEGIN TRY
            Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | [EstadoUpd] Ejecutando EstadoSel después de error'
            RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
            
            EXEC EstadoSel @Id;
        END TRY
        BEGIN CATCH
            Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
            Set @message = 'Start DateTime : %s | [EstadoUpd] Error ejecutando EstadoSel: '+ERROR_MESSAGE()
            RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;
        END CATCH

        RETURN @ErrorNumber * -1;
    END CATCH
END