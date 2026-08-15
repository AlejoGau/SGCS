CREATE OR ALTER PROCEDURE [dbo].[AlarmaGenerar]
	@idCta [int] = 0,
	@cAlarma [varchar](128) = '',
	@cObservaciones [varchar](max) = '',
	@cContenido [varchar](max) = '',
	@cRoute [varchar](max) = NULL,
	@cGeofenceName [varchar](100) = NULL,
	@iroute [int] = NULL,
	@lat [real] = NULL,
	@lng [real] = NULL,
	@imei [varchar](128) = '',
	@rumbo [int] = 0,
	@rawFechaHora [datetime] = null,
	@velocidad [int] = 0,
	@cData [varchar](max) = '',
	@idUsuario [int] = 0,
	@cZona [varchar](3) = '',
	@fecha [datetime] = NULL,
	@rec_norigen [int] = 5,
	@cUser [varchar](max) = 'SISTEMA',
	@rec_idReceptor [int] = NULL,
	@iPuerto [int] = 0,
	@rec_idMap [int] = 0,
	@rec_idFwd [int] = 0,
	@cDll [nvarchar](100) = '',
	@iOdometro [int] = 0,
	@rAccuracy [real] = 0,
	@cMethod [varchar](10) = '',
	@iBattery [int] = 0,
	@iExtBattery [int] = 0,
	@iNivelSenial [int] = 0,
	@iSatelites [int] = 0,
	@cCallerID [varchar](100) = '',
	@preventNotification [int] = 0,
	@cEvento [varchar](128) = '',
	@spGeoAutoproceso [int] = 0,
	@iFuel [int] = 0,
	@iEngineStatus [int] = 0,
	@utilizahorario [int] = 0,
	@rec_iid int = 0 OUTPUT,
	@bGuardoPTimer [int] = 0 OUTPUT,
	@cDebug Char(2) = 'No'	--'Si' 
WITH EXECUTE AS CALLER
AS
Begin
    Set NOCOUNT ON;
    --Hay una tabla con triggers TFN_ALARMAGENERAR para que se pueda utilizar desde otras DB. Si se cambian los parametros hay que cambiar eso tambien

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText nVarChar(max)=''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [AlarmaGenerar] Inicio'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;

	--@iEstado es como hay que grabar el evento dependiendo de @cAlarma
	Declare @cod_nalerta AS INT;
    Declare @iEstado AS INT;
    Declare @cod_ntipo AS INT;
	Declare @cod_nprioridad int;
	Declare @rec_tFechaProceso datetime = null;
    Declare @iid AS INT=0;
	Declare @iResuelve Int = 0

	IF @fecha = '' Or @fecha IS NULL
		Set @fecha = GetDate();

	IF ((@idCta IS NULL OR @idCta = 0) AND @imei !='')
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [AlarmaGenerar] No se informo idCta busco por IMEI de la cuenta'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;
		SELECT TOP 1 @idCta = cue_iid FROM _Datos.dbo.m_cuentas WITH (NOLOCK)
		WHERE PATINDEX('%'+convert(varchar(50),@imei)+'%' ,cue_cIMEI)>0 -- Para soportar N imei
	END

	IF @idCta IS NULL OR @idCta = 0
	Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [AlarmaGenerar] | idCuenta en cero!!! '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;
		Set NoExec On
	End

	IF @utilizahorario = 1
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [AlarmaGenerar] Se debe generar evento en fecha-hora del huso horario de la cuenta'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		Declare @iAjustaHora Int
		set @iAjustaHora =  (select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='AJUSTAHORARIO')     

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;
		if @iAjustaHora=0
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [AlarmaGenerar] El parametro AJUSTAHORARIO esta configurado en No'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		Else
		Begin
			Declare @DefOffSet decimal(4,2) = 0
			Select @DefOffSet=[ttz_nOffSet] From _tablas.dbo.t_TimeZone Where [ttz_idKey]=0
	
			Declare @cue_izonahoraria int=0
			Select Top 1 @cue_izonahoraria = cue_izonahoraria From _Datos.dbo.m_cuentas Where cue_iid = @idCta

			If @cue_izonahoraria = 0	
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [AlarmaGenerar] La cuenta no tiene configurado huso horario'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End
			Else
			Begin
				Declare @CueOffSet decimal(4,2) = 0
				Select @CueOffSet=[ttz_nOffSet] From _tablas.dbo.t_TimeZone Where [ttz_idKey]=@cue_izonahoraria

				--Si el OffSet de la cuenta es distinto al OffSet por default
				If @CueOffSet != @DefOffSet
				BEGIN
					Declare @FechaOffSet DatetimeOffSet 
					Select @FechaOffSet = SWITCHOFFSET (TODATETIMEOFFSET (@Fecha, DATENAME ( TZoffset , SYSDATETIMEOFFSET() )),IsNull(@CueOffSet,0.00)*60 ) 

					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [AlarmaGenerar] El OffSet de la cuenta es distinto al OffSet por default. La FechaHora recibida es : '+Convert(Char(20),@fecha,20)+ '. La FechaHora a guardar es : '+Convert(Char(20),@FechaOffSet,20)
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Set @fecha = @FechaOffSet

				END
			End
		End
	End

    SELECT @cod_nalerta = cod_nalerta, @cod_ntipo = cod_ntipo, @cod_nprioridad = cod_nprioridad, @iResuelve = cod_nResuelve
		FROM   _Tablas.dbo.t_codigos_alarma WITH (NOLOCK)
		WHERE  cod_ccodigo = @cAlarma;

    Declare @rec_cObservaciones AS NVARCHAR(MAX) = '';
    IF (@cObservaciones IS NOT NULL AND @cObservaciones != '')
	BEGIN
		if (@cUser!='')
		BEGIN
			Set @rec_cObservaciones = '[' + CONVERT (VARCHAR, GetDate(), 103) + ' ' + substring(CONVERT (VARCHAR, getdate(), 114), 1, 5) + '] [' + @cUser + '] ';
		END

		Set @rec_cObservaciones = @rec_cObservaciones + @cObservaciones+ CHAR(13)+CHAR(10) ;
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [AlarmaGenerar] cod_nalerta : '+Cast(@cod_nalerta As VarChar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;

    IF (@cod_nalerta = 2)
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [AlarmaGenerar] Es un Evento de NO GENERAR, NO se graba p_recepcion'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;
		-- Grabo m_status para los tst
		If @cAlarma='TST'
		Begin
			SELECT @cod_nalerta = cod_nalerta, @cod_ntipo = cod_ntipo, @cod_nprioridad = cod_nprioridad
				FROM   _Tablas.dbo.t_codigos_alarma WITH (NOLOCK)
				WHERE  cod_ccodigo = @cAlarma;

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [AlarmaGenerar] Es un TST. Execute [IPRS_UPD_m_status]'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;
			IF @cDebug = 'Si'
			Begin
				Print ' Execute [IPRS_UPD_m_status]'
				Print ' @idCta               : ' + CONVERT(VARCHAR(10), @idCta)
				Print ' @cod_nalerta         : ' + CONVERT(VARCHAR(10), @cod_nalerta)
				Print ' @cAlarma             : ' + @cAlarma
				Print ' @cod_ntipo           : ' + CONVERT(VARCHAR(10), @cod_ntipo)
				Print ' @cod_nprioridad      : ' + CONVERT(VARCHAR(10), @cod_nprioridad)
				Print ' @idUsuario           : ' + CONVERT(VARCHAR(10), @idUsuario)
				Print ' @cZona               : ' + @cZona
				Print ' @rec_idFwd           : ' + CONVERT(VARCHAR(10), @rec_idFwd)
				Print ' @cDll                : ' + @cDll
			End		

			Execute [_Desktop].[dbo].[IPRS_UPD_m_status] 
				@idCta =@idCta,
				@cod_nalerta = @cod_nalerta,
				@cAlarma =@cAlarma,
				@cod_ntipo = @cod_ntipo,
				@cod_nprioridad = @cod_nprioridad,
				@idUsuario =@idUsuario,
				@cZona =@cZona,
				@rec_idFwd = @rec_idFwd,
				@rec_cdll = @cDll,
				@bGuardoPTimer = @bGuardoPTimer OUTPUT
		End

		Set NoExec On
	End 
    
	IF @cod_nalerta < 2
    Begin
        Set @iEstado = 0;
        IF @cod_nalerta = 0
            Begin
                Set @iEstado = 5;
				Set @rec_tFechaProceso = GetDate()

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [AlarmaGenerar] NO Genera Alerta (0) lo grabo con estado 5'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				BEGIN TRY
					INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
													Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
				END TRY
				BEGIN CATCH
				END CATCH;
            End 

		-- Si el codigo es un #T# hay que controlar que el CallerID sea correcto
		if (@cAlarma = '#T#' Or Rtrim(@cCallerID)<>'')
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [AlarmaGenerar] Codigo es un #T# hay que controlar que el CallerID sea correcto'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			--Set @cZona = ''
			Declare @cCID1 [varchar](10) = '',
					@cCID2 [varchar](10) = '',
					@cCID3 [varchar](10) = '',
					@cCID4 [varchar](10) = '',
					@cCID5 [varchar](10) = ''

			Select @cCID1=Rtrim(Ltrim(pan_ccallerid1)),@cCID2=Rtrim(Ltrim(pan_ccallerid2)),@cCID3=Rtrim(Ltrim(pan_ccallerid3)),@cCID4=Rtrim(Ltrim(pan_ccallerid4)),@cCID5=Rtrim(Ltrim(pan_ccallerid5))
				From _Datos.dbo.m_paneles WITH (NOLOCK)
				Where pan_iidcuenta=@idCta

			--Si el callerId esta declaro o no se declaro ningun callerId 
			If @cDll= 'RR4LPacketParser'
				Begin
					If Len(@cCID1) < 10
						Set @cCID1 = Right('0000000000' + @cCID1,10)
					If Len(@cCID2) < 10
						Set @cCID2 = Right('0000000000' + @cCID2,10)
					If Len(@cCID3) < 10
						Set @cCID3 = Right('0000000000' + @cCID3,10)
					If Len(@cCID4) < 10
						Set @cCID4 = Right('0000000000' + @cCID4,10)
					If Len(@cCID5) < 10
						Set @cCID5 = Right('0000000000' + @cCID5,10)

					If Rtrim(Right(@cCallerID,10)) IN(@cCID1,@cCID2,@cCID3,@cCID4,@cCID5) Or ( @cCID1='0000000000' And @cCID2='0000000000' And @cCID3='0000000000' And @cCID4='0000000000' And @cCID5='0000000000' )
						Set @message = 'Start DateTime : %s | [AlarmaGenerar] Es un evento de CallerID existente o no se declaro CallerID'
					Else
					Begin
						Set @message = 'Start DateTime : %s | [AlarmaGenerar] Es un evento de CallerID Inexistente : '+@cCallerID
						Set @cAlarma = '_NV'
						Set @cZona = ''
					End
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
			Else
				Begin
					If Rtrim(Left(@cCallerID,10)) IN(@cCID1,@cCID2,@cCID3,@cCID4,@cCID5) Or ( @cCID1='' And @cCID2='' And @cCID3='' And @cCID4='' And @cCID5='' )
					Begin
						If @cAlarma = '#T#'
						Begin
							Set @iEstado = 8
							Set @rec_tFechaProceso = GetDate()
							Set @message = 'Start DateTime : %s | [AlarmaGenerar] Es un evento de CallerID existente lo grabo con estado 8'
							Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						End
					End
					Else
					Begin
						Set @cAlarma = '_NV'
						Set @cZona = ''
						Set @message = 'Start DateTime : %s | [AlarmaGenerar] Es un evento de CallerID Inexistente : '+@cCallerID
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End
				End
	

			--2020-09-17 : Pablo. pedido por BC
			If @cDll= 'IntelbrasPacketParser'
				Begin
					If  @cAlarma = '_NV'
						Set @rec_cObservaciones = '[' + CONVERT (VARCHAR, GetDate(), 103) + ' ' + substring(CONVERT (VARCHAR, getdate(), 114), 1, 5) + '] [IRServices] MAC : ' + @cCallerID + CHAR(13)+CHAR(10)
				End
			Else
				Set @cContenido = 'Tel : '+@cCallerID

			--2019-12-19 : Pablo. Si cambio el codigo de alarma a _NV hay que buscar otra vez @cod_nalerta
			if (@cAlarma = '_NV')
			Begin
				Select @cod_nalerta = cod_nalerta
					From _Tablas.dbo.t_codigos_alarma WITH (NOLOCK)
					Where cod_ccodigo = '_NV'

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [AlarmaGenerar] _NV cod_nalerta : '+Cast(@cod_nalerta As VarChar(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				IF (@cod_nalerta = 2)
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [AlarmaGenerar] _NV es un Evento de NO GENERAR, NO se graba p_recepcion'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Set NoExec On
				End 
    
				IF @cod_nalerta < 2
				Begin
					Set @iEstado = 0;
					IF @cod_nalerta = 0
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [AlarmaGenerar] _NV NO Genera Alerta (0) lo grabo con estado 5'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						Set @iEstado = 5;
						Set @rec_tFechaProceso = getdate()
					End 
				End
			End
		End
--------------------------------------------------------------------	
--22-07-2019 : Pablo. Modificacion para que zona/usuario se guarden dependiendo de la configuracion del codigo de alarma
/*
cod_nResuelve 0 = Graba en Zona
cod_nResuelve 1 = Graba en Usuario
*/
		If @iResuelve = 0 And @cZona = '' And @idUsuario > 0
		Begin
			Set @cZona = Rtrim(CONVERT(VarChar(10), @idUsuario))
			Set @idUsuario = 0
		End
		Else If @iResuelve = 1 And @idUsuario = 0 And  @cZona != '' And ISNUMERIC(@cZona)=1
		Begin
			Set @idUsuario = ISNull(Convert(Int, @cZona), 0)
			Set @cZona = ''
		End
--------------------------------------------------------------------	
		
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [AlarmaGenerar] Execute [_Datos].[dbo].[SGSP_pRecepcionINS]'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT		

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;
		IF @cDebug = 'Si'
		Begin
			Print ' @rec_iidcuenta       : ' + CONVERT(VARCHAR(10), @idCta)
			Print ' @rec_calarma         : ' + @cAlarma
			Print ' @rec_czona           : ' + @cZona
			Print ' @rec_iusuario        : ' + CONVERT(VARCHAR(10), @idUsuario)
			Print ' @rec_tfechahora      : ' + Convert(VarChar(MAX), @fecha, 20)
			Print ' @rec_tFechaRecepcion : ' + Convert(VarChar(MAX), @fecha, 20)
			Print ' @rec_nestado         : ' + CONVERT(VARCHAR(10), @iEstado)
			Print ' @rec_cObservaciones  : ' + @rec_cObservaciones
			Print ' @rec_cContenido      : ' + @cContenido
			Print ' @rec_nOrigen         : ' + CONVERT(VARCHAR(10), @rec_nOrigen)
			Print ' @rec_iPuerto         : ' + CONVERT(VARCHAR(10), @iPuerto)
			Print ' @rec_idReceptor      : ' + CONVERT(VARCHAR(10), @rec_idReceptor)
			Print ' @rec_idMap           : ' + CONVERT(VARCHAR(10), @rec_idMap)
			Print ' @rec_idFwd           : ' + CONVERT(VARCHAR(10), @rec_idFwd)
			Print ' @rec_tFechaProceso   : ' + Convert(VarChar(MAX), @rec_tFechaProceso, 20)
			Print ' @spGeoAutoproceso    : ' + CONVERT(VARCHAR(10), @spGeoAutoproceso)
		End

		DECLARE @tmpNewValue TABLE ([Id] int)

		INSERT INTO @tmpNewValue Execute [_Datos].[dbo].[SGSP_pRecepcionINS] 
			@rec_iidcuenta = @idCta, 
			@rec_calarma = @cAlarma, 
			@rec_czona = @cZona, 
			@rec_iusuario = @idUsuario, 
			@rec_tfechahora = @fecha, 
			@rec_tFechaRecepcion = @fecha, 
			@rec_nestado = @iEstado, 
			@rec_cObservaciones = @rec_cObservaciones, 
			@rec_cContenido = @cContenido, 
			@rec_nOrigen = @rec_norigen, 
			@rec_iPuerto = @iPuerto, 
			@rec_idReceptor = @rec_idReceptor, 
			@rec_idMap = @rec_idMap,
			@rec_idFwd = @rec_idFwd,
			@rec_tFechaProceso = @rec_tFechaProceso,
			@spGeoAutoproceso = @spGeoAutoproceso,
			@iValor = @iid OUTPUT;
    
		If @iid=0
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [AlarmaGenerar] Execute [_Datos].[dbo].[SGSP_pRecepcionINS] volvio con iValor 0!!!. No se guarda mStatus ni p_RXtraInfo'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	

			BEGIN TRY
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
												Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
			END TRY
			BEGIN CATCH
			END CATCH;
		End
		Else
		Begin

			--2019-12-26 : Pablo le agrego el IF acordado con Rodri
			If @cObservaciones !=''
			Begin
				-- si tiene observaciones lo sumo al timeline
				-- si llegaron datos extra los guardo en timeline

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [AlarmaGenerar] Insert en [_Datos].[dbo].[EventosTimeline]'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	

				INSERT  INTO _Datos..EventosTimeline (etl_iRecID, etl_iCuenta, etl_tFechaHora, etl_cAccion, etl_cObservacion, etl_cOwner, etl_iOperador)
				VALUES                              (@iid, @idCta, @fecha, 'IngresoComentarios', @cObservaciones, '%SISTEMA%', 0);
			End

			IF ((@cRoute IS NOT NULL and @cRoute<>'') OR (@cGeofenceName IS NOT NULL and @cGeofenceName<>'') OR @cData <> '' or @iroute > 0)
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [AlarmaGenerar] MERGE en [_Datos].[dbo].[p_RXtraInfo] |  iRecId : '+Cast(@iId As VarChar(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	
				
				Declare @rxt_nspip int = 0

				-- me fijo si es smartpanics.
				If (@cDll = 'SMARTPANICSHTTP' OR @cDll= 'SmartPanicsPacketParser')
				Begin
					Set @rxt_nspip = 1
					Set @message = 'Start DateTime : %s | [AlarmaGenerar] @rxt_nSPIP : '+Cast(@rxt_nspip As Char(1))
				End

				Declare @rxt_nvcip INT = 0
				-- Me fijo si es VIGICONTROL
				IF @cDll = 'VigiControlPacketParser'
				Begin
					Set @rxt_nvcip = 1
					Set @message = 'Start DateTime : %s | [AlarmaGenerar] @rxt_nVCIP : '+Cast(@rxt_nvcip As Char(1))
				End

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Declare @rxt_iID Int = 0
				Select TOP 1 @rxt_iID=[rxt_iId] From [_Datos].[dbo].[p_RXtraInfo] WITH (NOLOCK) Where [rxt_iRecId] = @iId
				If @rxt_iID > 0
				Begin
					Set @message = 'Start DateTime : %s | [AlarmaGenerar] Update [p_RXtraInfo] @rxt_iID : '+Cast(@rxt_iID As VarChar(10))
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Update [_Datos].[dbo].[p_RXtraInfo]
						Set	[rxt_dFechaHoraProcesaEvento] = Null,
							[rxt_cEvento]                 = @cEvento,
							[rxt_cGeoFenceName]           = @cGeofenceName,
							[rxt_cRoute]                  = @cRoute,
							[rxt_iRouteID]                = @iRoute,
							[rxt_cData]                   = @cData,
							[rxt_nSPIP]					  = @rxt_nspip,
							[rxt_nVCIP]				      = @rxt_nvcip
					Where [rxt_iId] = @rxt_iID
				End
				Else
				Begin
					Set @message = 'Start DateTime : %s | [AlarmaGenerar] Insert [p_RXtraInfo] @rxt_nVCIP : '+Cast(@rxt_nvcip As Char(1))
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Insert Into [_Datos].[dbo].[p_RXtraInfo] ([rxt_iRecId], [rxt_cEvento], [rxt_cGeoFenceName], [rxt_cRoute], [rxt_iRouteID], [rxt_cData], [rxt_nSPIP], [rxt_nVCIP])
						VALUES (@iId, @cEvento, @cGeofenceName, @cRoute, @iRoute, @cData, @rxt_nspip, @rxt_nvcip)

				End

				/*
				MERGE INTO [_Datos].[dbo].[p_RXtraInfo] AS TGT
					USING ( Select @iId As iRecId, Null As tFechaHora, @cEvento As cEvento, @cGeofenceName As cGeofenceName, @cRoute As cRoute, @iRoute As iRouteID, @cData As cData, @rxt_nspip As nSPIP, @rxt_nvcip As nVCIP ) AS SRC 
						ON TGT.[rxt_iRecId] = SRC.[iRecId]
					WHEN MATCHED THEN
						UPDATE SET
							TGT.[rxt_dFechaHoraProcesaEvento] = SRC.[tFechaHora],
							TGT.[rxt_cEvento]                 = SRC.[cEvento],
							TGT.[rxt_cGeoFenceName]           = SRC.[cGeofenceName],
							TGT.[rxt_cRoute]                  = SRC.[cRoute],
							TGT.[rxt_iRouteID]                = SRC.[iRouteID],
							TGT.[rxt_cData]                   = SRC.[cData],
							TGT.[rxt_nSPIP]					  = SRC.[nSPIP],
							TGT.[rxt_nVCIP]				      = SRC.[nVCIP]
 					WHEN NOT MATCHED THEN 
						INSERT ([rxt_iRecId], [rxt_cEvento], [rxt_cGeoFenceName], [rxt_cRoute], [rxt_iRouteID], [rxt_cData], [rxt_nSPIP], [rxt_nVCIP])
						VALUES (SRC.[iRecId], SRC.[cEvento], SRC.[cGeofenceName], SRC.[cRoute], SRC.[iRouteID], SRC.[cData], SRC.[nSPIP], SRC.[nVCIP]);
						*/

/*
				MERGE INTO _datos..[p_RXtraInfo]
					AS TGT
				USING (SELECT p.rec_iid, NULL AS rec_tFechaHora
						FROM   _datos..[p_Recepcion] AS p
						WHERE  p.[rec_iid] = @iid) AS SRC ON TGT.[rxt_iRecId] = SRC.[rec_iid]
				WHEN MATCHED THEN UPDATE 
					Set TGT.[rxt_dFechaHoraProcesaEvento] = SRC.[rec_tFechaHora],
						TGT.rxt_cEvento                   = @cEvento,
						TGT.rxt_cGeoFenceName             = @cGeofenceName,
						TGT.rxt_cRoute                    = @cRoute,
						TGT.rxt_iRouteID                  = @iroute,
						TGT.rxt_cData                     = @cData,
						TGT.rxt_nspip					  = @rxt_nspip,
						TGT.rxt_nVCIP				      = @rxt_nvcip
				WHEN NOT MATCHED THEN INSERT (
					rxt_iRecId
					, rxt_cEvento, rxt_cGeoFenceName, rxt_cRoute, rxt_iRouteID, rxt_cData, rxt_nspip, [rxt_nVCIP]) VALUES (@iid, @cEvento, @cGeofenceName, @cRoute, @iroute, @cData,@rxt_nspip,@rxt_nvcip);
*/
			End 
			---------------------
			----- MSTATUS -------
			---------------------
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [AlarmaGenerar]. Execute [IPRS_UPD_m_status]'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			BEGIN TRY
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
												Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
			END TRY
			BEGIN CATCH
			END CATCH;
			IF @cDebug = 'Si'
			Begin
				Print ' Execute [IPRS_UPD_m_status]'
				Print ' @idCta               : ' + CONVERT(VARCHAR(10), @idCta)
				Print ' @cod_nalerta         : ' + CONVERT(VARCHAR(10), @cod_nalerta)
				Print ' @cAlarma             : ' + @cAlarma
				Print ' @cod_ntipo           : ' + CONVERT(VARCHAR(10), @cod_ntipo)
				Print ' @cod_nprioridad      : ' + CONVERT(VARCHAR(10), @cod_nprioridad)
				Print ' @idUsuario           : ' + CONVERT(VARCHAR(10), @idUsuario)
				Print ' @cZona               : ' + @cZona
				Print ' @rec_idFwd           : ' + CONVERT(VARCHAR(10), @rec_idFwd)
				Print ' @cDll                : ' + @cDll
			End		

			Execute [_Desktop].[dbo].[IPRS_UPD_m_status] 
					@idCta =@idCta,
					@cod_nalerta = @cod_nalerta,
					@cAlarma =@cAlarma,
					@cod_ntipo = @cod_ntipo,
					@cod_nprioridad = @cod_nprioridad,
					@idUsuario =@idUsuario,
					@cZona =@cZona,
					@rec_idFwd = @rec_idFwd,
					@rec_cdll = @cDll,
					@bGuardoPTimer = @bGuardoPTimer OUTPUT

				
			If @spGeoAutoproceso = 1	--Evento fuera de la Geocerca de Cobertura
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [AlarmaGenerar] Evento fuera de la Geocerca de Cobertura'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Declare @cFecha Char(10) = (Select Convert(Char(10), GetDate(),103)),
						@cHora Char(10) = (Select Convert(Char(10), GetDate(),108)),
						@cMessageMerge nVarChar(max) = '',
						@cImagenes nVarChar(max) = '',
						@cSubject nVarChar(100) = 'Evento fuera de la Geocerca de Cobertura',
						@cDesc nVarChar(100) = '',
						@cPlantilla Char(3) = 'FCG',
						@Customdata nVarChar (max) = '',
						@cNombre nVarChar(50) = '',
						@dHoy DateTime = GetDate(),
						@idsPush Int = 0,
						@cTo nVarChar(150) = ''

				Declare @cFromName nVarChar(100) = ( Select Cast(par_cvalor As nVarChar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
				Declare @cNotificacionAsunto nVarChar(100) = ( Select Cast(par_cvalor As nVarChar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILNOTIFICACIONASUNTO')
				Declare @cAsunto nVarChar(max) = Rtrim(@cFromName)+' '+Rtrim(@cNotificacionAsunto)

				Execute [_Datos].[dbo].[SGSP_TextMerge] @idCta,@cZona,@cAlarma,@cPlantilla,@cFecha,@cHora,@iid, @cMessageMerge OUTPUT, @cImagenes OUTPUT
				If @cMessageMerge Is Null
					Set @cMessageMerge = @cSubject

				Select @cDesc=IsNull([cod_cdescripcion],@cAlarma) From [_Tablas].[dbo].[t_codigos_alarma] WITH (NOLOCK)
					Where [cod_ccodigo]=@cAlarma

				Select @cNombre=[usu_cnombre] From [_Datos].[dbo].[m_usuarios] WITH (NOLOCK)
					Where [usu_iidcuenta]=@idCta And [usu_icodigo]=@idUsuario
			
				If @cNombre Is Null
					Set @cNombre = ''
				Else
					Set @cNombre = ' : '+@cNombre

				Set @Customdata = '{"cod_cdescripcion":"'+Rtrim(@cDesc)+Rtrim(@cNombre)+'","rec_iid":"'+CONVERT(varchar(20), @iid)+'"}'

				Declare cPushlxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
					Select [id]
						FROM [_Datos].[dbo].[SmartPanic] WITH (NOLOCK)
						Where CuentaId = @idCta And Replace([Config],' ','') like '%"groupEnabled":1%'

				Open cPushlxEvento
				Fetch Next From cPushlxEvento Into @idsPush
				While @@FETCH_STATUS = 0
				Begin
					Set @cTo = Rtrim(Cast(@idsPush As nVarChar(150)))

					IF @cDebug = 'Si'
						PRINT '[Alarma Generar] entre al cPushlxEvento';

					Execute [_Desktop].[dbo].[MessageIns] @Name = @cAsunto, @Body = @cMessageMerge, @DateCreated = @dHoy, @FromTypeId = 0, @FromId = 0, @ToTypeId = 3067, @ToId = @cTo, @Customdata = @Customdata, @EventoID = @iid, @CuentaID = @idCta

					Fetch Next From cPushlxEvento Into @idsPush
				End
				Close cPushlxEvento
				Deallocate cPushlxEvento
			End
			
		End
	End 

	Set NoExec Off		

	--IF (@lat IS NOT NULL AND @lng IS NOT NULL AND @lat !=0 AND @lng!=0 AND @imei !='')
	IF (@lat IS NOT NULL AND @lng IS NOT NULL AND @lat !=0 AND @lng!=0)
    Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [AlarmaGenerar] Esta georeferenciado lo guardo aunque el evento sea de no generar'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;

		-->>--
		--Lantrix puede no tener IMEI y llega lat/lng pero no se graba
		--Pablo 14-09-2018
		If @imei =''
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [AlarmaGenerar] Esta georeferenciado y no tiene IMEI. Busco el de la cuenta'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Select @imei = IsNull(cue_cIMEI,'') From _Datos.dbo.m_cuentas WITH (NOLOCK) Where cue_iid=@idCta

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [AlarmaGenerar] IMEI de la cuenta : '+@imei
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			End
		--<<---

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [AlarmaGenerar] Esta georeferenciado. guardo en [_Datos].[dbo].[p_Gps]'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;
		If (@rawFechaHora Is Null)
			Set @rawFechaHora = @fecha
            
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Declare @gps_iid Int = 0

		-->>--
		-- DEDALO 20/08/2025
		-- CONCOX ajuste por fecha 2006
		if @cDll = 'ConcoxPacketParser' and YEAR(@rawFechaHora) <= 2016
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [AlarmaGenerar] Es concox con fecha 2006, ajusto anio al actual'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			SET @rawFechaHora = DATEADD(SECOND, 619315200, @rawFechaHora)
		End
		--<<--
		
		BEGIN TRANSACTION
			Select @gps_iid=[gps_iid] From _Datos.dbo.p_Gps WITH (UPDLOCK) Where gps_idcuenta = @idCta And gps_cIMEI = @imei
			IF @gps_iid > 0
				Begin
					Set @message = 'Start DateTime : %s | [AlarmaGenerar] UPDATE en  [_Datos].[dbo].[p_Gps] con gps_idcuenta = '+ Cast(@idCta As VarChar(10)) + ' gps_cIMEI = ' + @imei + ' gps_iid = '+ Cast(@gps_iid As VarChar(10)) 
                
					UPDATE _Datos.dbo.p_Gps WITH (ROWLOCK)
						Set gps_rLatitud	= @lat,
							gps_rLongitud	= @lng,
							gps_idrec		= @iid,
							gps_ivelocidad	= @velocidad,
							gps_irumbo		= @rumbo,
							gps_cIMEI		= @imei,
							gps_tRawFechaHora = @rawFechaHora,
							gps_tFechaHora	= @fecha,
							gps_iOdometro   = @iOdometro,
							gps_rAccuracy   = @rAccuracy,
							gps_cMethod     = @cMethod,
							gps_iBattery    = @iBattery,
							gps_iExtBattery = @iExtBattery,
							gps_iNivelSenial= @iNivelSenial,
							gps_iSatelites  = @iSatelites,
							gps_iFuel		= @iFuel,
							gps_iEngineStatus = @iEngineStatus
					Where [gps_iid]=@gps_iid
					--WHERE gps_idcuenta= @idCta And gps_cIMEI = @imei;
				End 
			ELSE
				Begin
					Set @message = 'Start DateTime : %s | [AlarmaGenerar] INSERT en  [_Datos].[dbo].[p_Gps] con gps_idcuenta = '+ Cast(@idCta As VarChar(10)) + ' gps_cIMEI = ' + @imei

					Insert Into _Datos.dbo.p_Gps (gps_idCuenta,gps_idRec,gps_rLatitud,gps_rLongitud,gps_iVelocidad,gps_iOdometro,gps_iRumbo,gps_tRawFechaHora,gps_cIMEI,gps_rAccuracy,gps_cMethod,gps_iBattery,gps_iNivelSenial,gps_iSatelites,gps_tfechahora,gps_iExtBattery,gps_iFuel,gps_iEngineStatus)
					  Values                     (@idCta      , @iid    , @lat       , @lng        ,@velocidad    ,@iOdometro   ,@rumbo    ,@rawFechaHora    ,@imei    ,@rAccuracy   ,@cMethod   ,@iBattery   ,@iNivelSenial   ,@iSatelites   ,@fecha        ,@iExtBattery	 ,@iFuel   ,@iEngineStatus);
				End 

			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		COMMIT

		-- Actualizo en la cuenta si esta NO es Condicion FIJO
		Declare @idm INT=0
		Select @idm = cue_iid From [_Datos]..[m_cuentas] WITH (NOLOCK)
			Inner Join  _Tablas.dbo.t_tipos On cue_ctipo=tip_ccodigo
			Where tip_nCondicion=0 And cue_iid=@idCta

	    If @idm > 0
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [AlarmaGenerar] No hay que actualizar latlng. Es condicion FIJO'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		Else
			Update [_Datos]..[m_cuentas]
			Set cue_cLatLng = Rtrim(Cast(@lat As Varchar(15)))+','+Rtrim(Cast(@lng As Varchar(15)))
			Where cue_iid=@idCta
		
    End 	

	--Tiene que ir ultimo x que si las notificaciones tienen posicion necesitan el dato
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [AlarmaGenerar] Analizo notificaciones'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;

	IF (@cod_nalerta <> 2 and @preventNotification != 1)
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [AlarmaGenerar] Envio notificaciones. Execute [_Datos].[dbo].[SGSP_AlarmaSMS]'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;

		IF @cDebug = 'Si'
		Begin
			Print ' Execute [SGSP_AlarmaSMS]'
			Print ' @idCta         : ' + CONVERT(VARCHAR(10), @idCta)
			Print ' @cCodigoAlarma : ' + @cAlarma
			Print ' @idRec         : ' + CONVERT(VARCHAR(10), @iid)
		End		
		
		Execute [_Datos].[dbo].[SGSP_AlarmaSMS] @idCta=@idCta, @cCodigoAlarma=@cAlarma, @idRec=@iid
	End

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [AlarmaGenerar]  @bGuardoPTimer : '+  Cast(@bGuardoPTimer As Char(1))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Select @rec_iid = @iid
	
	Set Noexec Off

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [AlarmaGenerar] Fin'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;

    RETURN @iid;
End