CREATE OR ALTER PROCEDURE [dbo].[EncuestaEnvioPush]
	@ids varchar(max) = '',
	@filter varchar(max) = '',
	@subject varchar(max) = '',
	@body varchar(max) = '',
	@token VARCHAR(128) = '',
	@fromId varchar(max) = '',
    @repetir INT = 0,
    @sendPush INT = 1,
    @app VARCHAR(2) = 'sp'
AS
BEGIN
	DECLARE @Sql NVARCHAR(MAX); -- Usamos NVARCHAR para soportar STRING_ESCAPE
	DECLARE @SqlR NVARCHAR(MAX);
	DECLARE @SqlFilter AS NVARCHAR(MAX)=N'';
	DECLARE @idcuenta NVARCHAR(1024) = ''; 
	DECLARE @imei NVARCHAR(1024) = ''; 
	DECLARE @nameEncuesta NVARCHAR(1024) = ''; 
    DECLARE @tableApp VARCHAR(128) = '[_Datos].[dbo].[SmartPanic] o'
	DECLARE	@badge NVARCHAR(5) = ''

	-- 1. Obtengo el nombre de la encuesta
	SELECT @nameEncuesta = enc_name FROM [_Datos].[dbo].[p_encuesta] WHERE enc_idkey = @subject

    -- 2. LIMPIEZA DE HTML (Para SQL 2019)
    -- Quitamos etiquetas HTML para evitar que se vea el código crudo en la App
    DECLARE @bodyPlain NVARCHAR(MAX) = @body;
    DECLARE @Start INT, @End INT, @Length INT;
    SET @Start = CHARINDEX('<', @bodyPlain);
    SET @End = CHARINDEX('>', @bodyPlain, CHARINDEX('<', @bodyPlain));
    SET @Length = (@End - @Start) + 1;
    WHILE @Start > 0 AND @End > 0 AND @Length > 0
    BEGIN
        SET @bodyPlain = STUFF(@bodyPlain, @Start, @Length, '');
        SET @Start = CHARINDEX('<', @bodyPlain);
        SET @End = CHARINDEX('>', @bodyPlain, CHARINDEX('<', @bodyPlain));
        SET @Length = (@End - @Start) + 1;
    END

    -- 3. SANITIZACIÓN PARA JSON (Evita el error 400 de Firebase)
    -- STRING_ESCAPE escapa comillas, barras y saltos de línea correctamente.
    DECLARE @bodySafe NVARCHAR(MAX) = STRING_ESCAPE(ISNULL(NULLIF(@bodyPlain,''), 'Encuesta'), 'json');
    DECLARE @nameSafe NVARCHAR(MAX) = STRING_ESCAPE(ISNULL(@nameEncuesta, 'Encuesta'), 'json');

	-- Armo el filter
	/*2026-03-03 Pablo lo saco porque ahora el where de Ids se calcula con el badge
	IF @ids != ''
		BEGIN
			SET @SqlFilter = ' AND Id IN ('+@ids+')'
		END
	ELSE
	*/
	IF @filter != ''
		BEGIN
			SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'SmartPanic')
		END

    IF @app != 'sp'
        BEGIN
            SET @tableApp = '[_Datos].[dbo].[SmartTrack] o'
        END

	-- RANGOS 
	DECLARE @SqlFilterRango AS NVARCHAR(max)
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
	SET @SqlFilter = @SqlFilter + @SqlFilterRango

    -- Inserción de respuesta
    SET @SqlR = 'INSERT INTO [_Datos].[dbo].[p_encuesta_respondidas] (
        enr_encidkey,
        enr_encname,
        enr_epricuenta,
        enr_eprspidkey,
        enr_eprcuser,
        enr_estado
    )
    SELECT 
        '+@subject+',
        '''+REPLACE(@nameEncuesta, '''', '''''')+''',
        CuentaId,
        Id,
        Imei,
        0
    FROM '+@tableApp+'
        LEFT JOIN _datos..m_cuentas c ON (o.CuentaId = c.cue_iid)
    WHERE 1=1 '+@SqlFilter

    -- DEBUG RESPUESTAS
	--Print '------'
    --Print @SqlR
    Execute(@SqlR)
	--Print '------'

    IF @sendPush = 1
	BEGIN
		-- Tabla para los IDs separados
		DECLARE @IDs_Table TABLE (id INT)
		INSERT INTO @IDs_Table
		SELECT CAST(TRIM(value) AS INT)
		FROM STRING_SPLIT(@ids, ',')
		WHERE TRIM(value) IS NOT NULL AND TRIM(value) != ''
    
		-- Variables del loop
		DECLARE @CurrentId INT
		DECLARE @iBadge Int = 0
    
		-- Loop por cada ID
		SELECT @CurrentId = MIN(id) FROM @IDs_Table
		--Print '------'
		--Print '@CurrentId'
		--Print @CurrentId
		--Print '------'
    
		WHILE @CurrentId IS NOT NULL
		BEGIN
			-- Calculo el Badge por ID
			SET @badge = N''
			If (@badge Is Null Or @badge = '')
			Begin
				SET @iBadge = 0
				Execute [dbo].[SGSP_BadgeCounter] @spId = @CurrentId, @badge = @iBadge OUTPUT
				SET @badge = CAST(@iBadge AS NVARCHAR(5))
				--Print '------'
				--Print '@badge'
				--Print @badge
				--Print '------'
			End
        
			-- Realizo la insercion del push de notificacion para este ID
			SET @Sql = 'INSERT INTO [_Datos].[dbo].[p_push_queue] (
				[ppq_msg]
				,[ppq_estado]
				,[ppq_fechacreacion]
				,[ppq_idmessage]
				,[ppq_idcuenta]
			)
			SELECT
				''{ 
					"message":{
						"data": {
							"action": "SURVEY",
							"sound": "notification_push.wav",
							"click_action" : "SURVEY",
							"id_survey": "'+@subject+'",
							"title": "'+@nameSafe+'",
							"body": "'+@bodySafe+'"
						},
						"apns": {
						  "payload": {
							"aps": {
								"alert": {
									"title": "' + @nameSafe + '",
									"body": "' + @bodySafe + '"
								},
							  "sound": "notification_push.wav",
							  "badge": ' + @badge + ',
							  "content_available":"true"
							}  
						  }
						},
						"token":"'' + o.pushToken + ''"
					}
				}''
				,0
				,GETDATE()
				,o.Id
				,c.cue_iid
				FROM [_datos].dbo.[SmartPanic] o
					LEFT JOIN _datos..m_cuentas c ON (o.CuentaId = c.cue_iid)
				WHERE 1=1 AND o.pushToken != '''' AND o.Id = '+CAST(@CurrentId AS VARCHAR(10))+' '+ @SqlFilter
        
			-- DEBUG PUSH
			--Print '--==='
			--Print @Sql
			Execute (@Sql)
			--Print '--==='
        
			-- Siguiente ID
			SELECT @CurrentId = MIN(id) FROM @IDs_Table WHERE id > @CurrentId
		END
	END
END