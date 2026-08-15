CREATE OR ALTER PROCEDURE [dbo].[IPRS_packetProcesor]
	@cCuenta [varchar](10) = '',
	@cEvento [varchar](10) = '',
	@cZona [varchar](10) = '',
	@cUsuario [varchar](100) = '',
	@cParticion [varchar](10) = '',
	@iPuerto [int] = 0,
	@cData [nvarchar](max) = '',
	@lat [real] = 0,
	@lng [real] = 0,
	@imei [varchar](128) = '',
	@velocidad [int] = 0,
	@rumbo [int] = 0,
	@rawFechaHora [datetime] = NULL,
	@cProtocolo [varchar](10) = '',
	@remoteIp [varchar](15) = '',
	@remotePort [int] = 0,
	@iFormato [int] = 0,
	@postimages [varchar](4000) = '',
	@cIdCtaExtendido [varchar](100) = '',
	@iOdometro [int] = 0,
	@rAccuracy [real] = 0,
	@cMethod [varchar](10) = '',
	@iBattery [int] = 0,
	@iExtBattery [int] = 0,
	@iNivelSenial [int] = 0,
	@iSatelites [int] = 0,
	@iSignalLevel [int] = 0,
	@iChannelNoise [int] = 0,
	@rec_iid [int] OUTPUT,
	@cue_ncuenta [varchar](10) OUTPUT,
	@cue_clinea [varchar](3) OUTPUT,
	@rec_calarma [char](3) OUTPUT,
	@cue_iid [int] OUTPUT,
	@rec_cobservaciones [nvarchar](4000) = '',
	@cCallerID [varchar](100) = '',
	@bEsACM [int] = 0,
	@iTiempoSOSDemorado [int] = 0,
	@cLineCard [char](3) = '',
	@iTension [int] = 0,
	@rxt_iConexion [int] = 0,
	@cReference [varchar](100) = '',
	@rec_ccontenido [varchar](50) = '',
	@cmd_iid [int] = 0,
	@AssemblyClassName [varchar](150) = '',
	@ProtocolModel [varchar](150) = '',
	@preventNotification [int] = 1,
	@spGeoAutoproceso [int] = 0,
	@cDebug Char(2) = 'No',		--'Si' 
	@idIRS [int] = 0,
	@iFuel [int] = 0,
	@iEngineStatus [int] = 3
WITH EXECUTE AS CALLER
AS
BEGIN TRY
	SET NOCOUNT ON

	-- simulo un error para obligar a buffer de IPRS a guardar el evento y probar mas tarde.
	--RAISERROR( 'test buffer', 25,1,'') WITH NOWAIT
	
	Declare @message nVarChar(Max) = '',
		@StartDateTimeText nVarChar(max)=''

	Declare @idUsuario INT
	
	if (   ( @AssemblyClassName In('TCMPacketParser','Sera4PacketParser','IntelektronPacketParser','SieraPacketParser') 
		Or ( @AssemblyClassName = 'HikVisionPacketParser' And @ProtocolModel IN('HikvisionAccessController','HikvisionHPPAccessController')) ) And @cUsuario != '' )
		Set @idUsuario = 0
	Else
		Set @idUsuario = ISNULL(CONVERT(INT, @cUsuario), 0);

	Declare @ahora DATETIME = getdate();
	Declare @cGeoFenceName VARCHAR(100);
	Declare @cGeoFenceID INT;
	Declare @cue_cProvincia char(3)
	Declare @rxt_nspip INT = 0
	Declare @rxt_nvcip INT = 0
	Declare @sct_cPushToken varchar(1024)
	Declare @sct_iSmartPanicID int
	Declare @iGenera INT = 1
	Declare @bGuardoPTimer INT = 0
	Declare @bControlAcceso INT = 0
	Declare @iCtaOriginal Int = 0

	Declare @cVecino nVarchar(100) = '',
			@cTransito nVarchar(20) = '',
			@cMatricula nVarchar(10) = '',
			@cUnidadFuncional nVarchar(10) = ''
	
	Declare @iValor [int] = 0
	Declare @cSplitTable table (id Int PRIMARY KEY, Item nVarchar(200))

	--Pablo 2018-07-02 Agregue control de Year x que de PG/IR le llega @rawFechaHora=''
	IF (@rawFechaHora IS NULL Or Year(@rawFechaHora)=1900)
		SET @rawFechaHora = @ahora

	-- Control de Cuenta No Habilitada : se analiza si el paquete recibido es de una cuenta no habilitada y se lo marca para guarda el evento como procesado con esa categorización
	--			 						 se ocupa SGSP_pRecepcionINS
	-- Sp_BuscoReceptorIP : con el valor de puerto por el cual se escucho se obtiene que receptor es el que se está escuchando
	-- Busco la DLL del receptor (para asegurar el nombre configurado pora ahora)
	Declare @ipc_iReceptor AS INT;
	Declare @cDll AS VARCHAR(50) = '';
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	--Verifico que particion sea numerico.
	if isnumeric(left(@cParticion,2)) = 0
		Begin
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Particion no es numerico, configuro como 00'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Set @cParticion = '00'
		End
	
	--Quito los ceros a la izquierda de zona.
	If @cZona Like '0%' And Len(@cZona) > 1
	Begin
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Existe Datos de Zona Con Ceros, Elimino los Ceros a la Izquierda (@cZona= ' + @cZona + ')'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		Select @cZona=SubString(@cZona, PatIndex('%[^0]%',@cZona), 10)
	
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Zona Quedo (@cZona = ' + @cZona + ')'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	--Si es un ack de comando cambio el estado del comando y no genero evento
	if (@cmd_iid > 0 and @cEvento ='ACKCMD')
	BEGIN
		--IF (@AssemblyClassName = 'ReleFullPacketParser')
		--	Set @iGenera = 1 -- dejo pasar para que se pueda generar evento, pedido por HERNAN 1/10/2018
		--Else
			Set @iGenera = 1

		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Actualizo estado del comando '+convert(varchar(20),@cmd_iid)
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		update _datos..p_comandos_ip set cmd_nestado = 3 where cmd_iid = @cmd_iid
	END

	If @iPuerto > 1000  Or @rxt_iConexion > 0
		Begin
			IF @cDebug = 'Si'
			Begin
				Print '[IPRS_packetProcesor] Execute [_Datos].[dbo].[SGSP_IRSBuscoReceptorIP]'
				Print '[IPRS_packetProcesor]  @iPuerto       : ' + CONVERT(VARCHAR(10), @iPuerto)
				Print '[IPRS_packetProcesor]  @iConexion     : ' + CONVERT(VARCHAR(10), @rxt_iConexion)
			End

			EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoReceptorIP] @iPuerto = @iPuerto, @iConexion = @rxt_iConexion, @iReceptor = @ipc_iReceptor OUTPUT ,@cDll = @cDll OUTPUT
		End
	Else
		Begin
			IF @cDebug = 'Si'
			Begin
				Print '[IPRS_packetProcesor] Execute [_Datos].[dbo].[SGSP_IRSBuscoReceptor]'
				Print '[IPRS_packetProcesor]  @iPuerto       : ' + CONVERT(VARCHAR(10), @iPuerto)
			End

			EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoReceptor] @iPuerto = @iPuerto,@iReceptor = @ipc_iReceptor OUTPUT ,@cDll = @cDll OUTPUT
		End

	IF (@ipc_iReceptor IS NULL)
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Se descarto por @iReceptor Null'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Receptor : ' + CONVERT(VARCHAR(10), @ipc_iReceptor)
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Dll : ' + @cDll;
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Busco los datos de la cuenta';
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF (@cDll = 'EBSPacketParser')
	Begin
		IF ( @cReference != '')
		Begin
			Delete From @cSplitTable
			Insert @cSplitTable Select * From dbo.SplitString( @cReference, '|') 

			Declare @TagCuenta Char(1) = (Select item From @cSplitTable Where id = 1)
			Declare @TagValue nVarchar(200) = (Select item From @cSplitTable where id = 2)
			Set @TagValue = Ltrim(Rtrim(@TagValue))

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] EBSPacketParser ModelValue: ' + @ProtocolModel
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			/*Leer 2021-03-26 mas abajo
			if @ProtocolModel = 'ActiveTrackVC'
				Begin
					/*
					Para ActiveTrackVC
					Si son eventos READ tengo que buscar en [t_CheckPoints_VC] el Tag leido y guardado en zona y pisar zona
					*/
					Select Top 1 @cZona=IsNull(chp_cZona,'') From [_Tablas].[dbo].[t_CheckPoints_VC] With (NOLOCK) 
						Where chp_cReference = @TagValue

					--Si el evento no trae Lat/Lng se pidio que guarde la posicion del CheckPoint que leyo
					If ( @lat=0 Or @lng=0 )
						Select Top 1 @lat=IsNull(chp_rLatitud,0), @lng=IsNull(chp_rLongitud,0) From [_Tablas].[dbo].[t_CheckPoints_VC] With (NOLOCK) 
							Where chp_cReference = @TagValue
					
					--Hay que guardar el codigo de usuario
					Select Top 1 @idUsuario=IsNull(usu_icodigo,0) From [_Datos].[dbo].[m_usuarios]
						Where [usu_cIdExtendido] = @imei
				End
			Else
			*/
			if @ProtocolModel != 'ActiveTrackVC' And @ProtocolModel != 'ActiveTrackSG'
				Begin
					/*
					Para Lx/Px/Ex/ActiveGuard/ActiveTrack
					Si son eventos READ tengo que "convertir" el TAG leido y guardado en zona y pisar zona
					*/
					Select Top 1 @cZona=IsNull(tag_czona,''),@cue_iid = tag_iCuenta 
						From [_Tablas].[dbo].[t_tags_ag] With (NOLOCK) 
					Where tag_ctag = @TagValue
			
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Lx/Px/Ex/ActiveGuard/ActiveTrack. Si son eventos READ tengo que "convertir" el TAG leido y guardado en zona y pisar zona | @TagCuenta : ' + Cast(@TagCuenta As Varchar(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					--iTagCuenta = 0 - Forma historica la cuenta del evento es la asociada al tag | 1 - La cuenta del evento es la que leyo el tag
					If @TagCuenta = '0'
					Begin
						Select Top 1 @cue_iid = tag_iCuenta ,@ccuenta=cue_ncuenta,@imei=cue_cIMEI,@cue_clinea=cue_clinea,@cue_cProvincia=cue_cProvincia 
						From [_Tablas].[dbo].[t_tags_ag] With (NOLOCK) 
						Inner Join [_Datos].[dbo].[m_cuentas] On cue_iid=tag_iCuenta
						Where tag_ctag = @TagValue And cue_cimei=@imei

						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Lx/Px/Ex/ActiveGuard/ActiveTrack. | @cue_clinea : '+@cue_clinea +' | @ccuenta : ' + @ccuenta + ' | @imei : ' + @imei + ' | @cue_cProvincia : '+@cue_cProvincia
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					End
				End	
		End	
		Else
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] EBSPacketParser Resuelvo usuario';
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			--Hay que guardar el codigo de usuario
			Select Top 1 @idUsuario=IsNull(usu_icodigo,0) From [_Datos].[dbo].[m_usuarios] With (NOLOCK) 
				Where [usu_cIdExtendido] = @imei
		End 						
	End

	--2021-12-01 Pablo : x que puede venir una linea con numero y espacios
	Set @cLineCard = Ltrim(Rtrim(@cLineCard))
	--2019-12-16 Pablo : x que hay emuladores que envian mas de 32 lineas
	If @cLineCard Is Not Null And @cLineCard !='' --or @cLineCard = '00' or @cLineCard = '0'
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Se analiza numero de linea : '+@cLineCard;
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		--x que hay lineas que vienen con letra, se valida si es numerico el valor de @cLineCard
		If IsNumeric(@cLineCard) = 1
		Begin
			If (Cast(@cLineCard As Int) Not Between 1 and 32 Or IsNumeric(@cLineCard) = 0)
			Begin
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] @cLineCard ('+@cLineCard+') no esta dentro de 1 a 32. Se cambia a 1.'
				Set @cLineCard = '1'
			End
		End
		Else
		Begin
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] @cLineCard ('+@cLineCard+') no es numerico. Se cambia a 1.'
			Set @cLineCard = '1'
		End

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	--2021-12-14 : Son eventos del WebHook Hay que buscar el evento en pRecepcion y actualizar las observaciones
	IF (@cDll = 'RapidSOSPacketParser')
	Begin
		IF ( @cReference != '')
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] RapidSOSPacketParser Inserto TimeLine del rec_iid : ' + @cReference
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Declare @iOpe Int = 0
			Select @cue_iid=[rec_iidcuenta], @iOpe=[rec_ioperador] From [_Datos].[dbo].[p_recepcion] With (NOLOCK) 
				Where rec_iid=@cReference

			Insert Into [_Datos].[dbo].[EventosTimeLine]
						([etl_iRecID]
						,[etl_iCuenta]
						,[etl_tFechaHora]
						,[etl_cAccion]
						,[etl_cObservacion]
						,[etl_cOwner]
						,[etl_iOperador])
				Values
						(@cReference
						,@cue_iid
						,GetDate()
						,'IngresoComentarios'
						,@rec_cObservaciones
						,'%SISTEMA%'
						,@iOpe)

			Set NoExec On
		End
	End

	--2023-09-06 : DS-881 Cuando los eventos lleguen desde el servicio de monitoreo de energía, resolver cuenta tomando desde la tabla [dbo].[p_EnergyDevices] 
	IF (@cDll = 'EnergyMonitoringPacketParser')
	Begin
		IF @cDebug = 'Si'
		Begin
			Print ' Execute [IPRS_GetEnergyDeviceCta]'
			Print ' @cDeviceID : ' + @imei
		End

		Set @cReference=RTrim(@cReference)
		Execute [_Desktop].[dbo].[IPRS_GetEnergyDeviceCta] @cDeviceID=@imei, @cue_iid=@cue_iid OUTPUT, @cue_clinea=@cue_clinea  OUTPUT, @cue_cProvincia=@cue_cProvincia  OUTPUT

		If @cue_iid = 0 Or @cue_iid Is Null
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] No hay cuenta asignada para el panel de energia'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
	End

	--2021-09-06 : LPR no tiene IMEI ni Cuenta, hay que buscar IDCTA por patente
	IF (@cDll = 'NeuralLabsPacketParser')
	Begin
		Declare @compatibility_level Int = (Select compatibility_level From sys.databases WHERE name = '_Desktop')

		If (@compatibility_level >= 130)
		Begin
			IF ( @cReference != '')
			Begin

				IF @cDebug = 'Si'
				Begin
					Print ' Execute [IPRS_GetVehicleDomain]'
					Print ' @Patente   : ' + @cReference
				End

				Set @cReference=RTrim(@cReference)
				Execute [_Desktop].[dbo].[IPRS_GetVehicleDomain] @Patente=@cReference, @cue_iid=@cue_iid OUTPUT, @cue_clinea=@cue_clinea  OUTPUT, @cue_cProvincia=@cue_cProvincia  OUTPUT
		
			End
		End
		Else
			Set @cue_iid=Null
	End

	Declare @Obs nVarchar(max) = ''
	Declare @Est Int = 0
	Declare @FechaProceso DateTime = null	
	--2024-06-14 : Son eventos del WebHook Hay que buscar el evento en pRecepcion, y actuar en consecuencia a la opcion recibida
	IF (@cDll = 'SoftGuardWAAutomationPacketParser')
	Begin
		IF ( @cReference != '' And @cReference Like '%|%' )
		Begin
			--Parse  Reference :64620636|CONFIRMADO
			--Parse  Observaciones :Contacto : 5491112345678. Nombre : Elmer Luza
			
			Delete From @cSplitTable
			Insert @cSplitTable Select * From dbo.SplitString( @cReference, '|') 

			Declare @ri VarChar(10) = (Select item From @cSplitTable Where id = 1)
			Declare @Opcion Varchar(50) = (Select item From @cSplitTable where id = 2)
			
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] SoftGuardWAAutomationPacketParser Reference : ' + @cReference
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @rec_cobservaciones = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [Sistema] ' + @Opcion + ' ' + Rtrim(@rec_cobservaciones)

			Select @Obs=rec_cobservaciones From [_Datos].[dbo].[p_recepcion] With (NOLOCK) Where rec_iid = @ri
		
			If (@Obs Is Not Null And @Obs != '')
				Set @Obs += Char(13) + @rec_cobservaciones
			Else
				Set @Obs = @rec_cobservaciones

			If @Opcion = 'CONFIRMADO'
			Begin
				Set @Est = 3	--Procesado
				Set @FechaProceso = @ahora
			End
			Else --CONTACTAR / ERROR_DESTINATARIO
				Set @Est = 0	--Pendiente

			Update [_Datos].[dbo].[p_recepcion] 
			Set rec_cObservaciones = @Obs, rec_nestado = @Est, rec_tFechaProceso = @FechaProceso
			Where rec_iid=@ri
		End

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] SoftGuardWAAutomationPacketParser. Se descarta'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On

	End

	--2026-02-05 : Son eventos de SofIA OperadorVirtual Hay que buscar el evento en pRecepcion, y actuar en consecuencia a la opcion recibida
	IF (@cDll = 'SofIAPacketParser')
	Begin
		IF ( @cReference != '' And @cReference Like '%|%' )
		Begin
			/*
			d_evento_softguard | keyword_verified | event_id | requires_immediate_attention 
			keyword_verified
			true... (Exito)
			false...(Clave mal / No dada)
			na......(No correspondía pedirla)
			fail....(Error tecnico de plataforma)
			*/
			--Parse  Reference:84820924|true|sg_1773414695060_56|Normal
			--Parse  Reference:72922053|false|sg_1770319232197_22|Urgent
			--Parse  Reference:84813755|na|sg_1773411453954_54|Normal
			
			Delete From @cSplitTable
			Insert @cSplitTable Select * From dbo.SplitString( @cReference, '|') 

			Declare @id_evento_softguard VarChar(10) = (Select item From @cSplitTable Where id = 1)
			Declare @keyword_verified VarChar(5) = (Select item From @cSplitTable Where id = 2)
			Declare @event_id Varchar(50) = (Select item From @cSplitTable where id = 3)
			Declare @requires_immediate_attention Varchar(50) = (Select item From @cSplitTable where id = 4)
			
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] SofIAPacketParser Reference : ' + @cReference
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @rec_cobservaciones = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [SofIA] ' + Rtrim(@rec_cobservaciones)

			Declare @iPrioridad Int = 0
			Select @Obs=rec_cobservaciones,@iPrioridad=rec_iPrioridad From [_Datos].[dbo].[p_recepcion] With (NOLOCK) Where rec_iid = @id_evento_softguard
		
			If (@Obs Is Not Null And @Obs != '')
				Set @Obs += Char(13) + @rec_cobservaciones
			Else
				Set @Obs = @rec_cobservaciones

			If Lower(@keyword_verified) = 'true' Or Lower(@keyword_verified) = 'na'
			Begin
				Set @Est = 3	--Procesado
				Set @FechaProceso = @ahora
			End
			Else If Lower(@keyword_verified) = 'false' Or ( Lower(@keyword_verified) = 'fail' And Lower(@requires_immediate_attention)='urgent' )
			Begin
				Set @Est = 0	--Pendiente
				Set @iPrioridad = 1 --Se escala
			End

			--Grabo TimeLine
			Set @iOpe = 0
			Select @cue_iid=[rec_iidcuenta], @iOpe=[rec_ioperador] From [_Datos].[dbo].[p_recepcion] With (NOLOCK) 
				Where rec_iid=@id_evento_softguard

			Insert Into [_Datos].[dbo].[EventosTimeLine]
					([etl_iRecID]
					,[etl_iCuenta]
					,[etl_tFechaHora]
					,[etl_cAccion]
					,[etl_cObservacion]
					,[etl_cOwner]
					,[etl_iOperador])
			Values
					(@id_evento_softguard
					,@cue_iid
					,GetDate()
					,'IngresoComentarios'
					,@rec_cObservaciones
					,'%SISTEMA%'
					,@iOpe)

			--Actualizo p_Recepcion
			Update [_Datos].[dbo].[p_recepcion] 
			Set rec_cObservaciones = @Obs, rec_nestado = @Est, rec_tFechaProceso = @FechaProceso, rec_iPrioridad = @iPrioridad, rec_iMinutosEspera=0
			Where rec_iid=@id_evento_softguard

			--Si es respuesta con Error, hay que generar evento inforamtivo en la _SG-INTE y deshabilitar OperadorVirtualConfig
			If Lower(@keyword_verified) = 'fail'
			Begin
				Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] | Deshabilitar OperadorVirtualConfig'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				UPDATE [_Datos].[dbo].[OperadorVirtualConfig]
				   Set [ovc_iStatus] = 0
				Where [ovc_iStatus] = 1

				Select TOP 1 @cue_iid = cue_iid, @cue_clinea = cue_clinea, @cue_cProvincia = cue_cProvincia
					From _Datos.dbo.m_cuentas With (NOLOCK) 
				Where cue_clinea='_SG' And cue_ncuenta = 'INTE' 			

				Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] | Se genera evento en SG-INTE'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Execute [_Datos].[dbo].[SGSP_AlarmaGenerar] @idCta=@cue_iid, @cAlarma='_VO', @cQuien ='SoftGuard', @iValor=@iValor OUTPUT

				Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] | buscar en SofIA_VoiceCallEvents los registros con [sve_iStatus]=0 (pendientes) y con el [sve_iRecId] verificar si estan en estado 3-Espera y devolverlos a pendiente'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Set @Obs = 'Se detecto un error en el servicio de Operador Virtual. Se debe procesar manualmente'
				DECLARE @tFechaHoraInicio DATETIME;
				DECLARE @rec_nestado INT = 3;

				Declare @trans AS VARCHAR(1024);

				EXECUTE [dbo].[LocalizationGetLocale] @Name = @Obs, @soloOutput=1,@translation = @trans OUTPUT

				Set @Obs = @trans

				SET @tFechaHoraInicio = DATEADD(MINUTE, -5, GETDATE());
				Set @rec_cobservaciones = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [SofIA] ' + Rtrim(@Obs)

				UPDATE _Datos.dbo.p_recepcion
				SET 
					rec_nestado = 4,
					rec_cobservaciones = CASE 
						WHEN rec_cobservaciones IS NOT NULL AND Cast(rec_cobservaciones As VarChar(max)) != ''
						THEN CAST(rec_cobservaciones AS NVARCHAR(MAX)) + CHAR(13) + @rec_cobservaciones
						ELSE @rec_cobservaciones
					END
				FROM _Datos.dbo.p_recepcion pr
				INNER JOIN (
					SELECT s.sve_iRecId
					FROM _Datos.dbo.SofIA_VoiceCallEvents AS s
					INNER JOIN _Datos.dbo.EventosPendientes p ON s.sve_iRecId = p.rec_iid
					WHERE s.sve_tCreatedDate >= @tFechaHoraInicio 
						AND p.rec_nEstado = 3
				) AS tmp ON pr.rec_iid = tmp.sve_iRecId
					AND pr.rec_nestado = @rec_nestado

			End
		End

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] SofIAPacketParser. La respuesta no se guarda como nuevo evento'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On

	End
	--2024-12-10 : DK-541 Hay que bucar el IMEI como DeviceID
	IF (@cDll = 'MQTTSubscriberPacketParser')
	Begin
		Select Top 1 @cue_iid=[cue_iidCuenta],@ccuenta=cue_ncuenta,@cue_clinea=cue_clinea,@cue_cProvincia=cue_cProvincia 
			From [_Datos].[dbo].[v_MQTTDevices]
			Inner Join [_Datos].[dbo].[m_cuentas] WITH (NOLOCK) On [cue_iid]=[cue_iidCuenta] 
		Where [cue_iMQTTDeviceID]=@imei

		If @cue_iid = 0 Or @cue_iid Is Null
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] No hay cuenta asignada para el deviceId MQTT'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Se descarto por idCta 0/Null';
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set NoExec On
		End
	End

	--2019-08-18 Pablo : Si paso por lectura de Tag de AG y ya tiene el idCta NO tiene que volver a buscarlo
	If @cue_iid = 0 Or @cue_iid Is Null
	Begin
		Set @cue_clinea = '';
		If @iPuerto > 1000 --Or @rxt_iConexion > 0
			BEGIN
				IF @cDebug = 'Si'
				Begin
					Print ' Execute [IPRS_GetCue_iid]'
					Print ' @ProtocolModel   : ' + @ProtocolModel
					Print ' @ccuenta         : ' + @ccuenta
					Print ' @imei            : ' + @imei
					Print ' @iPuerto         : ' + CONVERT(VARCHAR(10), @iPuerto)
					Print ' @cIdCtaExtendido : ' + @cIdCtaExtendido
					Print ' @rxt_iConexion   : ' + CONVERT(VARCHAR(10), @rxt_iConexion)
					Print ' @cDll            : ' + @cDll
					Print ' @cDebug          : ' + @cDebug
				End

				EXECUTE [_Desktop].[dbo].[IPRS_GetCue_iid] @ccuenta=@ccuenta, @imei=@imei, @iPuerto=@iPuerto, @cIdCtaExtendido=@cIdCtaExtendido, @iConexion=@rxt_iConexion, @cDll=@cDll, @ProtocolModel=@ProtocolModel, @cue_iid=@cue_iid OUTPUT, @cue_clinea=@cue_clinea OUTPUT, @cue_cProvincia=@cue_cProvincia OUTPUT, @cDebug=@cDebug

			END
		Else
			BEGIN
				--2019-12-11 : Pablo. Las nuevas conexiones seriales que ingresan por IRS pueden tener @cIdCtaExtendido
				Declare @iExt Int = IsNull((Select par_ivalor From _Tablas.dbo.t_parametros WITH (NOLOCK) WHERE par_cCodigo = 'IDEXTENDIDO'), 0)

				IF @iExt IN(1,2) AND @cIdCtaExtendido <> ''
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] IDEXTENDIDO en Si. Busco por IdCtaExtendido : ' + @cIdCtaExtendido
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						Select TOP 1 @cue_iid = cue_iid, @cue_clinea = cue_clinea, @cue_cProvincia = cue_cProvincia
							From _Datos.dbo.m_cuentas With (NOLOCK) 
						Where cue_cIdExtendido LIKE '%' + Ltrim(Rtrim(@cIdCtaExtendido)) + '%'

						IF (@cue_iid IS NULL OR @cue_iid = 0)
						Begin
							Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [IPRS_packetProcesor]. La busqueda por IdCtaExtendido volvio sin valor'
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							If @iExt = 2  --Si Unicamente		
							Begin
								--2023-01-25 : DS-489. Si no pudo resolver por IDExtendido no busca por otra via y lo manda a la _SG-INTE
								Set @message = 'Start DateTime : %s | [IPRS_packetProcesor]. IDEXTENDIDO en Si Unicamente no sigue buscando y lo manda a la _SG-INTE'
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
									
								Select TOP 1 @cue_iid = cue_iid, @cue_clinea = cue_clinea, @cue_cProvincia = cue_cProvincia
									From _Datos.dbo.m_cuentas With (NOLOCK) 
								Where cue_clinea='_SG' And cue_ncuenta = 'INTE' 
							End
							Else
							Begin
								IF @cDebug = 'Si'
								Begin
									Print ' Execute [SGSP_IRSBuscoIdCuentaIP]'
									Print ' @iPuerto   : ' + CONVERT(VARCHAR(10), @iPuerto)
									Print ' @ccuenta   : ' + @ccuenta
									Print ' @iConexion : ' + CONVERT(VARCHAR(10), @rxt_iConexion)
								End

								EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoIdCuentaIP] @iPuerto = @iPuerto, @cCuenta = @cCuenta, @iConexion = @rxt_iConexion, @iIdCta = @cue_iid OUTPUT, @cLinea = @cue_clinea OUTPUT,@cue_cProvincia = @cue_cProvincia OUTPUT
							End
						End
					End
				Else
					Begin
						IF @cDebug = 'Si'
						Begin
							Print ' Execute [_Datos].[dbo].[SGSP_IRSBuscoIdCuenta]'
							Print ' @iPuerto       : ' + CONVERT(VARCHAR(10), @iPuerto)
							Print ' @ccuenta       : ' + @ccuenta
							Print ' @rxt_iConexion : ' + CONVERT(VARCHAR(10), @rxt_iConexion)
							Print ' @cLineCard     : ' + @cLineCard
						End

						EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoIdCuenta] @iPuerto = @iPuerto, @ccuenta = @ccuenta, @iConexion = @rxt_iConexion, @cLineCard = @cLineCard, @iIdCta = @cue_iid OUTPUT, @cLinea = @cue_clinea OUTPUT, @cue_cProvincia = @cue_cProvincia OUTPUT
					End
			END
	End
	
	--2021-03-26 Pablo : Estaba arriba y como necesito IDCTA si es ActiveTrackVC lo puse aca 
	IF (@cDll = 'EBSPacketParser') And ( @ProtocolModel = 'ActiveTrackVC' Or @ProtocolModel = 'ActiveTrackSG' )
	Begin
		IF ( @cReference != '')
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] EBSPacketParser resuelvo TAG: ' + @TagValue
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] EBSPacketParser ModelValue: ' + @ProtocolModel
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			if @ProtocolModel = 'ActiveTrackVC'
				Begin
					/*
					Para ActiveTrackVC
					Si son eventos READ tengo que buscar en [t_CheckPoints_VC] el Tag leido y guardado en zona y pisar zona
					*/
					Select Top 1 @cZona=IsNull(chp_cZona,'') From [_Tablas].[dbo].[t_CheckPoints_VC] With (NOLOCK) 
						Where chp_cReference = @TagValue And chp_iCuenta = @cue_iid

					--Si el evento no trae Lat/Lng se pidio que guarde la posicion del CheckPoint que leyo
					If ( @lat=0 Or @lng=0 )
						Select Top 1 @lat=IsNull(chp_rLatitud,0), @lng=IsNull(chp_rLongitud,0) From [_Tablas].[dbo].[t_CheckPoints_VC] With (NOLOCK) 
							Where chp_cReference = @TagValue
					
					--Hay que guardar el codigo de usuario
					Select Top 1 @idUsuario=IsNull(usu_icodigo,0) From [_Datos].[dbo].[m_usuarios] With (NOLOCK) 
						Where [usu_cIdExtendido] = @imei
				End
			Else if @ProtocolModel = 'ActiveTrackSG'
				Begin
					/*
					Para ActiveTrackSG
					Si son eventos READ tengo que buscar en [t_CheckPoints_VC] el Tag leido y guardado en zona y pisar zona y usar el idCta del CP
					*/
					
					--Hay que guardar el codigo de usuario
					Select Top 1 @idUsuario=IsNull(usu_icodigo,0) From [_Datos].[dbo].[m_usuarios] With (NOLOCK) 
						Where [usu_cIdExtendido] = @imei

					Select Top 1 @cue_iid=tag_iCuenta, @cZona=IsNull(tag_czona,''), @ccuenta=cue_ncuenta, @imei=cue_cIMEI, @cue_clinea=cue_clinea, @cue_cProvincia=cue_cProvincia
					From [_Tablas].[dbo].[t_tags_ag] With (NOLOCK) 
					Inner Join [_Datos].[dbo].[m_cuentas] On cue_iid=tag_iCuenta
					Where tag_ctag = @TagValue

					--Si el evento no trae Lat/Lng se pidio que guarde la posicion del CheckPoint que leyo
					If ( @lat=0 Or @lng=0 )
						Select Top 1 @lat=IsNull(chp_rLatitud,0), @lng=IsNull(chp_rLongitud,0) From [_Tablas].[dbo].[t_CheckPoints_VC] With (NOLOCK) 
							Where chp_cReference = @TagValue
					
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] EBSPacketParser idCta del objetivo : ' + Cast(@cue_iid As Varchar(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
		End	
	End

	If @bEsACM=1
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Es Alarma comunitaria';
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
		If @cZona <> ''
		Begin
			--Si hay dato de zona, tengo que ver si la cuenta tiene zonas LNK
			Declare @cLink Varchar(10) = REPLACE(@cZona,' ','')
			Set @cLink = 'LNK'+Right('0000'+Rtrim(Upper(@cLink)),4)
			
			Declare @cm_ccuenta Varchar(10) = ''
			Declare @idCM Int =0

			Select @idCM = MC.cue_iid, @cm_ccuenta = MZ.zon_ccuenta 
				From _datos..m_zonas MZ With (NOLOCK) 
				Inner Join _datos..m_cuentas MC On MC.cue_clinea=MZ.zon_cdealer And MC.cue_ncuenta=MZ.zon_ccuenta
				Where MZ.zon_ccodigo=@cLink And MZ.zon_iidcuenta=@cue_iid
		
			If @idCM > 0 
			Begin
				--Si encontro zona @idCM reemplazo el IdCta y el CodCta por los del link
				Set @cue_iid = @idCM
				--La guardo x que si viene SIA mas de un evento, al cambiar la cuenta y entrar x particion, el 2do evento da cuenta invalida					
				Set @cCuenta = @cm_ccuenta		
				--El usuario en Cta destino sera 10mil + el LNK recibido
				Set @cUsuario = '1'+SUBSTRING(@cLink,0,4)		
			End 
		End
	End

	If ( @cDll In('TCMPacketParser','Sera4PacketParser','SieraPacketParser') Or ( @cDLL = 'HikVisionPacketParser' And @ProtocolModel IN('HikvisionAccessController','HikvisionHPPAccessController')) ) And @cUsuario <> ''
	Begin
		--Hay que guardar el codigo de usuario
		Select Top 1 @idUsuario=IsNull(usu_icodigo,0)
			From [_Datos].[dbo].[m_usuarios] With (NOLOCK) 
			Where [usu_cIdExtendido] = @cUsuario
	End

	--2021-10-21 Pablo : Si es IntelektronPacketParser tengo que buscar idCta por usuario de la UF sin IMEI
	If @cDll In('IntelektronPacketParser') And @cUsuario <> ''
	Begin
		Set @iCtaOriginal = @cue_iid
		--Hay que guardar el codigo de usuario y obtener el idCta
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control Acceso.	IDExt : ' + @cUsuario+ ' IMEI : ' + @imei
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @auxcue_iid Int = 0,
				@auxidUsuario Int = 0
		Declare @auxcCuenta Varchar(10) = '',
				@auxcue_clinea Char(3) = '',
				@auxcue_cProvincia Char(3) = ''

		Select Top 1 @auxcue_iid=usu_iidcuenta,@auxidUsuario=IsNull(usu_icodigo,0),@auxccuenta=cue_ncuenta,@auxcue_clinea=cue_clinea,@auxcue_cProvincia=cue_cProvincia
			From [_Datos].[dbo].[m_usuarios] With (NOLOCK) 
			Inner Join [_Datos].[dbo].[m_cuentas] On cue_iid=usu_iidcuenta
		Where [usu_cIdExtendido] = @cUsuario
		 	And PATINDEX('%'+convert(varchar(50),@imei)+'%' ,cue_cIMEI)=0

		If @auxcue_iid > 0
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control Acceso.	Se encontro IDExt : ' + @cUsuario+ '. Se cambio idCta'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Set @bControlAcceso = 1

			Set @cue_iid = @auxcue_iid
			Set @idUsuario = @auxidUsuario
			Set @cCuenta = @auxcCuenta
			Set @cue_clinea = @auxcue_clinea
			Set @cue_cProvincia = @auxcue_cProvincia
		End
	End

	If @cue_iid = 0 Or @cue_iid Is Null
	BEGIN
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Se descarto por idCta 0/Null';
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	END

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] idCuenta : ' + Convert(VARCHAR(20), @cue_iid) + ' Linea : ' + @cue_clinea+ ' Provincia : ' + @cue_cProvincia
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	--Shelly
	IF (@cDll = 'ShellyPacketParser')
	Begin
		Declare @Channel tinyint = TRY_CONVERT(tinyint, STUFF(@cZona, 1, 1, ''));

		-- Extraer valores desde CReference con dbo.ReferenceGetValue
		Declare @PowerWatts Decimal(9,3) = 0
		Declare @Switch Int = 0,
				@RefId Int = 0,
				@Amperes Decimal(9,3) = Null;

		IF ( @cReference != '')
		Begin
			Declare @pwStr Varchar(100) = '',
				@swStr Varchar(100) = '',
				@idStr Varchar(100) = '',
				@amStr Varchar(100) = '';

			Set @pwStr = dbo.ReferenceGetValue(@cReference, 'pw');
			Set @swStr = dbo.ReferenceGetValue(@cReference, 'switch');
			Set @idStr = dbo.ReferenceGetValue(@cReference, 'id');
			SET @amStr = dbo.ReferenceGetValue(@cReference, 'amp');
		End
		Set @PowerWatts = TRY_CONVERT(decimal(9,3), REPLACE(@pwStr, ',', '.'));
		Set @Switch = TRY_CONVERT(int, @swStr);
		Set @RefId = TRY_CONVERT(int, @idStr);
		SET @Amperes = TRY_CONVERT(decimal(9,3), REPLACE(@amStr, ',', '.'));

		-- Debug prints
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] ShellyPacketParser | Channel : ' + COALESCE(CAST(@Channel AS varchar(10)),'NULL')
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] ShellyPacketParser | PowerWatts : ' + COALESCE(CAST(@PowerWatts AS varchar(20)),'NULL');
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] ShellyPacketParser | Switch : ' + COALESCE(CAST(@Switch AS varchar(10)),'NULL');
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] ShellyPacketParser | RefId : ' + COALESCE(CAST(@RefId AS varchar(10)),'NULL');
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		SET @message = 'Start DateTime : %s | [IPRS_packetProcesor] ShellyPacketParser | Amperes : ' + COALESCE(CAST(@Amperes AS varchar(20)), 'NULL');
		RAISERROR(@message, 10, 1, @StartDateTimeText) WITH NOWAIT;

		IF @cEvento = 'HB_KA' AND @PowerWatts IS NOT NULL
		BEGIN
			INSERT INTO [_Datos].[dbo].[DeviceChannelPower] (dcp_iIdCta, dcp_cIMEI, dcp_iChannel, dcp_tDateTime, dcp_nPowerWatts, dcp_nVoltage)
				VALUES	(@cue_iid, @imei, TRY_CONVERT(int, @Channel), @rawFechaHora, @PowerWatts, TRY_CONVERT(decimal(6,2), @iBattery));
		END
		ELSE IF @cEvento IN ('SHUV','SHOV')
		BEGIN
			-- 0 = overvoltage, 1 = undervoltage
			Declare @UnderUV Int = IIF(@cEvento='SHUV', 1, 0);

			-- Canal efectivo: CZona -> switch -> id -> 0
			Declare @ChannelEff int = COALESCE(TRY_CONVERT(int, @Channel),@Switch,@RefId,0);

			INSERT INTO [_Datos].[dbo].[DeviceVoltageAlert]	(dva_iIdCta, dva_cIMEI, dva_iChannel, dva_tDateTime, dva_bUnder, dva_nVoltage, dva_iSwitch, dva_iRefId)
				VALUES (@cue_iid, @imei, @ChannelEff, @rawFechaHora, @UnderUV, TRY_CONVERT(decimal(6,2), @iBattery), @Switch, @RefId);
		END
		ELSE IF @cEvento = 'SHOC'
		BEGIN
			-- 2 = overcurrent
			Declare @UnderOC INT = 2;
			Declare @ChannelEffOC int = COALESCE(TRY_CONVERT(int, @Channel), @Switch, @RefId, 0);

			-- Nota: guardamos el AMPERAJE en dva_nVoltage
			INSERT INTO [_Datos].[dbo].[DeviceVoltageAlert] (dva_iIdCta, dva_cIMEI, dva_iChannel, dva_tDateTime, dva_bUnder, dva_nVoltage, dva_iSwitch, dva_iRefId)
				VALUES	(@cue_iid, @imei, @ChannelEffOC, @rawFechaHora, @UnderOC, @Amperes, @Switch, @RefId);
		END
		ELSE IF @cEvento IN ('SHCU','SHCD')
		BEGIN
			INSERT INTO [_Datos].[dbo].[DeviceCloudEvent] (dce_iIdCta, dce_cIMEI, dce_tDateTime, dce_bConnected)
				VALUES (@cue_iid, @imei, @rawFechaHora, IIF(@cEvento='SHCU', 1, 0));
		END
		/*
		ELSE IF @cEvento = 'SHOP'
		BEGIN
			--Por ahora NO se almacena info porque llega todo en 0
		END
		*/
	End

	/*
    // Control de duplicidad de eventos :  si el parametro DESCARTADUPLICADOS esta en SI se analiza y descarta el evento si estuviera duplicado
    */
	--Lo puse despues de [SGSP_IRSBuscoReceptorIP] porque necesito @cDll-- Pablo 20/10/2017	

	--Saco el Char(20) x que si se graba en RxLog rompe los reportes-- Pablo 11/09/2019
	Set @cData = Replace(@cData,Char(20),'')
	Declare @cDataCtrl nVARCHAR(Max) = @cData
	Declare @iPos INT = 0
	Declare @stringToSplit nVARCHAR(Max) = @cData
	Declare @iLoop INT = 0

	IF (@cDll = 'NANOCOMM' OR @cDll = 'NanocommPacketParser')
	BEGIN
		--Tomamos para controlar hasta la 3er coma
		SET @cDataCtrl = ''

		WHILE CHARINDEX(',', @stringToSplit) > 0 AND @iLoop < 3
		BEGIN
			SET @iLoop = @iLoop + 1
			SET @iPos = CHARINDEX(',', @stringToSplit)
			SET @cDataCtrl = @cDataCtrl + SUBSTRING(@stringToSplit, 1, @iPos - 1) + ','
			SET @stringToSplit = SUBSTRING(@stringToSplit, @iPos + 1, LEN(@stringToSplit) - @iPos)
		END
	END
	ELSE
	IF (@cDll = 'DxControlPacketParser' And @ProtocolModel = '2S/3S')
	BEGIN
		--Tomamos para controlar hasta la 2do punto y coma
		SET @cDataCtrl = ''

		WHILE CHARINDEX(';', @stringToSplit) > 0 AND @iLoop < 2
		BEGIN
			SET @iLoop = @iLoop + 1
			SET @iPos = CHARINDEX(';', @stringToSplit)
			SET @cDataCtrl = @cDataCtrl + SUBSTRING(@stringToSplit, 1, @iPos - 1) + ';'
			SET @stringToSplit = SUBSTRING(@stringToSplit, @iPos + 1, LEN(@stringToSplit) - @iPos)
		END
	END
	ELSE
	IF (@cDll = 'SurgardMLR2PacketParser' And @ProtocolModel = 'SystemN')
	Begin
		--Tomamos para controlar desde el [
		SET @cDataCtrl = ''
		--@cData = 'S01003[#411801|Nri1/BH18/BA18/BH18/BA18/BH18/BA18]'
		SET @iPos = CHARINDEX('[', @stringToSplit)
		SET @cDataCtrl = @cDataCtrl + SUBSTRING(@stringToSplit,@iPos , Len(@stringToSplit))
	End
	ELSE
	IF (@cDll = 'HikVisionPacketParser' And @ProtocolModel = 'HikVisionLPR')
	Begin
		--Tomamos para controlar el cReference x que cData viene siempre con el mismo header
		--@cReference = 'LicensePlate :1234ABC| ListType :white' 
		SET @cDataCtrl = Rtrim(@cReference)
	End

	Declare @idescarta INT = 0;
	IF @cProtocolo != 'HB'
	BEGIN
		IF ( Right(@cData,4) = '_vs_' And  @cProtocolo != 'CID' ) Or @cDll = 'SurgardSystem5XMLPacketParser'
		BEGIN
			Set @cData = SUBSTRING(@cData, 0,Len(@cData)-5);  

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] [SGSP_DescartaDuplicados] No controla paquete multiple'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		END
		ELSE
		BEGIN
			IF Right(@cDataCtrl,4) = '_vs_' And @cDll = 'IntelbrasPacketParser'
				Set @cDataCtrl = SUBSTRING(@cDataCtrl, 0,Len(@cDataCtrl)-5);  

			Declare @fechahora [smalldatetime] = GetDate();

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] [SGSP_DescartaDuplicados] con @cDataString : '+@cDataCtrl +' | @tFechaHora : '+ Convert(VarChar(MAX), @fechahora, 20);
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			EXECUTE @idescarta = [_Datos].[dbo].[SGSP_DescartaDuplicados] @idCta = @cue_iid ,@cDataString = @cDataCtrl	,@tFechaHora = @fechahora, @iConexion = @rxt_iConexion
		END
	END

	--IF (@idescarta = 1 and @cProtocolo != 'HB')
	IF @idescarta = 1 
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Se descarto por duplicado'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		SELECT @rec_calarma = 'DPL';
		Set NoExec On
	END

	-- Resuelvo el usuario de smartpanics
	IF (@cDll = 'SMARTPANICSHTTP' OR @cDll = 'SmartPanicsPacketParser')
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Resuelvo usuario SmartPanics'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @rxt_nspip = 1

		SELECT @idUsuario = IsNull(u.usu_icodigo,0), @sct_cPushToken = s.pushtoken, @sct_iSmartPanicID = s.Id
			FROM _datos..m_telefonos With (NOLOCK) 
		INNER JOIN _datos..smartpanic s ON (tel_iidcuenta = cuentaId)
		INNER JOIN _datos..m_usuarios u ON (u.usu_icodigo = tel_iid + 700 AND u.usu_iidcuenta = cuentaid)
		WHERE s.imei = @imei AND right(tel_ctelefono, 8) = right(s.telefono, 8)

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Usuario SmartPanics : ' + Cast(@idUsuario As Varchar(10))
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] ID SmartPanics : ' + Cast(@sct_iSmartPanicID As Varchar(10))
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] PushToken SmartPanics : ' + @sct_cPushToken
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	END

	-- Ver partición : si hay datos de partición se analiza si hay que redireccionar el evento a la cuenta partición.
	-- Control de cuentas Partición : si la cuenta es partición de otra se cambia el código de alarma a uno interno que indica eso mismo
	-- Este query verifica : Si busco el IdCuenta y cue_nparticion es <> 0 significa que esa cuenta es particion
	Declare @iAlerta AS INT;

	SET @iAlerta = ( SELECT cod_nalerta	FROM _Tablas.dbo.t_codigos_alarma WITH (NOLOCK)	WHERE cod_ccodigo = '_NP');

	Declare @for_cAlarma AS VARCHAR(10);
	Declare @iCtaMap INT;
	Declare @iCtaFwd INT;

	--Traduccion del mensaje se hace afuera del IF para que se generen las palabras
	Declare @translation AS VARCHAR(1024);

	EXECUTE [dbo].[LocalizationGetLocale] @Name = N'Cuenta NO Permitida', @soloOutput=1,@translation = @translation OUTPUT;

	IF EXISTS (	SELECT MC.cue_nparticion
			FROM _Datos.dbo.m_zonas AS MZ WITH (NOLOCK)
			INNER JOIN _Datos.dbo.m_cuentas AS MC ON MC.cue_clinea = MZ.zon_cdealer
			Left Outer Join _Datos.dbo.m_cuentasxtrainfo XT On XT.cue_iidCuenta = @cue_iid AND MC.cue_ncuenta = MZ.zon_ccuenta
			WHERE MZ.zon_ccodigo LIKE 'PAR%'
				AND MC.cue_iid = @cue_iid
				AND MC.cue_nparticion > 0
				And XT.cue_ilicenciapar !=  1)
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control cuentas particion. Cuenta no permitida'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @iEstado AS INT = 0;

		IF (@iAlerta = 2)
		BEGIN
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control cuentas particion. Cuenta no permitida. [_NP] es un Evento de NO GENERAR. NO se graba p_recepcion'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set NoExec On
		END

		IF @iAlerta < 2
		BEGIN
			SET @iEstado = 0;

			IF @iAlerta = 0
			BEGIN
				SET @iEstado = 5;

				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control cuentas particion. Cuenta no permitida. Si [_NP] NO Genera Alerta (0) lo grabo con estado 5'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			END

			SET @rec_cContenido = 'E:' + '_NP' + ' Z:' + @cZona;
			--2020-09-28 Acordamos que el header de las observaciones lo completa AlarmaGenerar
			--SET @rec_cObservaciones = '[' + CONVERT(VARCHAR(256), GETDATE(), 120) + '] [IpReader] ' + @translation + CHAR(13)+CHAR(10) ;
			SET @rec_cObservaciones =  @translation 

			IF @cDebug = 'Si'
			Begin
				Print ' Execute [SGSP_pRecepcionINS]'
				Print ' @rec_iidcuenta      : ' + CONVERT(VARCHAR(10), @cue_iid)
				Print ' @rec_nestado        : ' + CONVERT(VARCHAR(10), @iEstado)
				Print ' @rec_cContenido     : ' + @rec_cContenido
				Print ' @rec_cObservaciones : ' + @rec_cObservaciones
				Print ' @rec_iPuerto        : ' + CONVERT(VARCHAR(10), @iPuerto)
				Print ' @rec_idReceptor     : ' + CONVERT(VARCHAR(10), @ipc_iReceptor)
				Print ' @rec_iUsuario       : ' + CONVERT(VARCHAR(10), @idUsuario)
			End

			EXECUTE [_Datos].[dbo].[SGSP_pRecepcionINS]
				 @rec_iidcuenta = @cue_iid
				,@rec_calarma = '_NP'
				,@rec_nestado = @iEstado
				,@rec_cContenido = @rec_cContenido
				,@rec_cObservaciones = @rec_cObservaciones
				,@rec_nOrigen = 2
				,@rec_iPuerto = @iPuerto
				,@rec_idReceptor = @ipc_iReceptor
				,@rec_iUsuario = @idUsuario
				,@iValor = @iValor OUTPUT

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] . Cuenta no permitida. Guardo p_RXLog'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @cDebug = 'Si'
			Begin
				Print ' rxl_iRecId    : ' + CONVERT(VARCHAR(10), @iValor)
				Print ' rxl_cLog      : ' + Left(@cData, 1000)
				Print ' rxl_cDll      : ' + Left(@cDll, 2)
				Print ' rxl_cEvento   : ' + @cEvento 
				Print ' rxl_cLineCard : ' + @cLineCard 
			End

			INSERT INTO [_Datos].[dbo].[p_RXLog] (rxl_iRecId,rxl_cLog,rxl_cDll,rxl_cEvento,rxl_cLineCard)
			VALUES (@rec_iid,LEFT(@cData, 1000),Left(@cDll, 2),@cEvento,@cLineCard);

			--Parar todo posProcesamiento, es decir no deberia hacer mas nada, solo insertar en pRecepcion.
			Set NoExec On

		END
	END

	-- Si hay dato de particion, tengo que ver si la cuenta tiene zonas particion
	-- Esto significa que si despues de parsear el paquete hay algun valor en la variable @cParticion, hay que hacer este control. Esto es porque hay DLLs-Paquetes que NO traen el dato de particion ( ejemplo SmartPanics, o Vigicontrol por mencionar algunos)
	-- Lo hago con este query
	Declare @cue_iidZona AS INT;
	Declare @zon_ccuenta AS VARCHAR(10);

	-- Pablo : x que puede venir ' ' y la instruccion de Replace da error
	Set @cParticion = Ltrim(Rtrim(@cParticion))
	-- agrego 0 a la izq a particiones
	SELECT @cParticion = REPLACE(STR(@cParticion, 2), ' ', '0')

	SELECT @cue_iidZona = MC.cue_iid, @zon_ccuenta = MZ.zon_ccuenta
		FROM _Datos.dbo.m_zonas AS MZ With (NOLOCK) 
		INNER JOIN _Datos.dbo.m_cuentas AS MC ON MC.cue_clinea = MZ.zon_cdealer AND MC.cue_ncuenta = MZ.zon_ccuenta
	WHERE MZ.zon_ccodigo = 'PAR' + @cParticion
		AND MZ.zon_iidcuenta = @cue_iid;

	IF (@cue_iidZona IS NOT NULL AND @zon_ccuenta IS NOT NULL)
	BEGIN
		--Si obtengo algun valor entonces reemplazo el IdCta y el CodCta por los de la particion
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Redirijo a cuenta particion. idCuenta original : ' + CONVERT(VARCHAR(10), @cue_iid) + ' idCuenta nueva : ' + CONVERT(VARCHAR(10), @cue_iidZona)
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		SET @cue_iid = @cue_iidZona;
		SET @cCuenta = @zon_ccuenta;
		SET @cParticion = '';
	END
	-----------------------------------------------

	--Si es un evento de Geocerca 'SPGE' o 'SPGI', tengo que guardar el nombre de la GeoCerca en rxTraInfo y reemplazar la zona con GEO
	IF @cEvento IN ('SPGE','SPGI')
	BEGIN
		SET @cGeoFenceID = CAST(replace(@cZona, 'SP', '') AS INT);
		SET @cZona = '' --<== IMPORTANTE!!!! HAY QUE LIMPIAR LA ZONA para que NO se guarde en pRecepcion

		SELECT @cGeoFenceName = [Name] 
			FROM _datos.dbo.SmartTrackGeoFense With (NOLOCK) 
		WHERE [Id] = @cGeoFenceID --<== x que la zona es SP1 x ejemplo

		--Tambien hay que guardar la imagen a enviar por mail en p_RXtraInfo )	
		--El problema esta en que eso lo obtengo de un handler que vos me das
		--https://gcs.softguard.com:443/handler/getStaticMapEvent?type=html&rec_iid=8486&GeoId=105
		--Donde:
		--rec_iid: el id del evento en p_recepcion 
		--GeoId: es el id de la geocerca (@cGeoFenceID)
		--y cuando graba p_RXtraInfo que ya lo tenes, en el campo [rxt_cGeoFenceName] va @cGeoFenceName y en el campo [rxt_cData] va @cData
		-- p_RXtraInfo esta resuelto en alarmagenerar
	END

	--Nuevo BuscoFormato--
	--Donde todos los valores vienen del parseo de la dll, de valor ya calculado o bien de la configuracion de la conexion como por ejemplo @iFormato 
	--@iFormato => 0 : Resuelve por evento
	--          => 1 : Resuelve por evento+zona
	--Esto devuelve @cAlarma  @iCtaMap  @iCtaFwd :
	--En cAlarma esta el valor del codigo de alarma buscado, En caso de no encontrarlo devuelve un '_NE' (Salvo el caso que corte por exceso de recursividad en donde devuelve Null ) 
	--Si @iCtaMap viene con algun valor, ese es el idCta de la cuenta MAP y ese valor se deberia grabar en pRecepcion.rec_idMap
	--Si @iCtaFwd viene con algun valor, ese es el idCta de la cuenta FWD y ese valor se deberia grabar en pRecepcion.rec_idFwd
	-- Si el evento es un KA le saco el KA
	Declare @cEvt [varchar] (10) = @cEvento

	--2021-06-07 : Pablo lo modifique x que hay eventos en SIA que llegan como @cEvento = 'KA' y no son KeepAlive
	IF (Right(Rtrim(@cEvt), 3) = '_KA')
		SET @cEvt = Replace(@cEvt, 'KA', '')
	Else IF (@cDll = 'Alari3PacketParser' And Right(Rtrim(@cEvt), 2) = 'KA')  --2021-06-30 : Pablo lo modifique x que hay eventos de Alari que vienen @cEvento = 'AL99KA' y son KeepAlive especiales
		SET @cEvt = Replace(@cEvt, 'KA', '')

	IF @cEvt = '#T#'
		Set @for_cAlarma =  '#T#'
	Else If @cEvento = 'CIPR'
		Set @for_cAlarma = '_CR'
	Else If @cEvento = '_CC'
		Set @for_cAlarma = '_CC'
	ELSE
	Begin
		Declare	@cTemporalZone VarChar(10) =  ''
		IF @iFormato=1 And @cZona='' And @idUsuario>0 And Left(@cProtocolo, 3) IN ('CID','XML','S3 ','EVT','MII','SIA')
		Begin
			Set	@cTemporalZone = Rtrim(Cast(@idUsuario As Char(3)))
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Es '+Left(@cProtocolo, 3)+' : Se pasa usuario a Zona : ' + @cTemporalZone
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		Else
			Set	@cTemporalZone = @cZona

		IF @cDebug = 'Si'
		Begin
			Print '[IPRS_packetProcesor] Execute [_Datos].[dbo].[SGSP_IRSBuscoFormato]'
			Print '[IPRS_packetProcesor]  @iReceptor  : ' + CONVERT(VARCHAR(10), @ipc_iReceptor)
			Print '[IPRS_packetProcesor]  @iCuenta    : ' + CONVERT(VARCHAR(10), @cue_iid)
			Print '[IPRS_packetProcesor]  @iTipo      : ' + CONVERT(VARCHAR(10), @iFormato)
			Print '[IPRS_packetProcesor]  @cEvento    : ' + @cEvt
			Print '[IPRS_packetProcesor]  @cZona      : ' + @cTemporalZone
			Print '[IPRS_packetProcesor]  @cProtocolo : ' + @cProtocolo
			Print '[IPRS_packetProcesor]  @iConexion  : ' + CONVERT(VARCHAR(10), @rxt_iConexion)
			Print '[IPRS_packetProcesor]  @cDebug     : Si'
		End

		EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoFormato]
			 @iReceptor = @ipc_iReceptor
			,@iCuenta = @cue_iid
			,@iTipo = @iFormato
			,@cEvento = @cEvt
			,@cZona = @cTemporalZone
			,@cProtocolo = @cProtocolo
			,@iConexion = @rxt_iConexion
			,@cAlarma = @for_cAlarma OUTPUT
			,@iCtaMap = @iCtaMap OUTPUT
			,@iCtaFwd = @iCtaFwd OUTPUT
			,@cDebug = @cDebug
	End

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Alarma : ' + @for_cAlarma;
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	-- VIGICONTROL
	IF @cDll = 'VigiControlPacketParser'
	Begin
		Set @rxt_nvcip = 1

		IF @cReference != ''
		Begin
			Declare @chp_rlatitud real
			Declare @chp_rlongitud real
			Declare @chp_itolerancia int
			Declare @chp_dist int

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] CheckPoint VigiControl. Busco el cpoint que corresponde'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			--,@cReference = '1618244118125;' 
			--,@cReference = '1742392320211;www.google.com' 

			Delete From @cSplitTable
			Insert @cSplitTable Select * From dbo.SplitString( @cReference, ';') 

			Set @cReference = (Select item From @cSplitTable Where id = 1)
			
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] CheckPoint VigiControl. Reference : ' + @cReference
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Select Top 1 @cZona= chp_cZona, @chp_rlatitud= chp_rlatitud, @chp_rlongitud = chp_rlongitud, @chp_itolerancia = chp_itolerancia
				From _tablas..t_CheckPoints_VC With (NOLOCK) 
			Inner Join [_Datos].[dbo].[m_cuentas] On [chp_iCuenta]=[cue_iid]
			Where chp_cReference = @cReference And cue_iid = @cue_iid

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] CheckPoint VigiControl. Lat : '+Convert(varchar(100),@chp_rlatitud)+' Lng : '+Convert(varchar(100),@chp_rlongitud)+' Tol : '+convert(varchar(100),@chp_itolerancia)
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @chp_rlongitud <> 0 and @chp_rlatitud <> 0 AND @chp_itolerancia > 0
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] CheckPoint VigiControl. Controlo que este dentro de la tolerancia'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Declare @g geography, @h geography;
				Set @g = geography::Point(@chp_rlatitud, @chp_rlongitud, 4326)  
				Set @h = geography::Point(@lat, @lng, 4326)  

				Select @chp_dist = @g.STDistance(@h)

				IF @chp_dist > (@chp_itolerancia+@rAccuracy)
				BEGIN
					-- separo el evento de posicion invalida de partida y arribo
					If @cEvt = 'VGPAR'
						Set @for_cAlarma = '_PD' 
					ELSE
						Set @for_cAlarma = '_PI'
				
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] CheckPoint VigiControl. Fuera de la tolerancia, Se genera '+@for_cAlarma
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				END
			END
		End
	End

	--2018-03-29 Modifico Pablo para permitir grabar zona en eventos puros de 4+2
	--IF ( @cProtocolo = '4+2' And @cZona='' )	2019-04-16 Pablo : x que PG en modo PacketProcesor manda zona en 4+2 y no Evt
	--2019-06-24 Modifico Pablo porque en PG hay protocolos '4+2 S3'
	--IF  @cProtocolo = '4+2'
	IF  @cProtocolo Like '4+2%'
	Begin
		If @cZona=''
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] 4+2 : @cZona Esta Vacio, Seteo @cZona = @cEvt: ' + Cast(@cEvt As nVarChar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
			Set @cZona = @cEvt

			If Len(@cZona)=2 And Left(@cZona,1)='0'
				Set @cZona = Right(@cZona,1)

		End								
			
		--2019-01-16 Pablo para grabar usuario en eventos 4+2
		--2019-01-31 Pablo modifico para que controle si el usuario existe en la cuenta, caso contrario solo queda el valor en zona

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] 4+2 : Verifico Tipo de Codigo de Alarma'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @nTipo Int = 0
		Select @nTipo = cod_ntipo From [_Tablas].[dbo].[t_codigos_alarma] WITH (NOLOCK) Where cod_ccodigo = @for_cAlarma
			
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] 4+2 : @for_cAlarma = ' + @for_cAlarma + ' | ' + '@nTipo = ' + Cast(@nTipo As nVarChar(4))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		If @nTipo IN (1,2)		--Es OPN/CLO
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] 4+2 : El Codigo de Alarma Es Tipo OPN/CLO, Seteo Usuario'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Declare @bOK Bit = 0
			If IsNumeric(Right(@cZona,1)) = 1 --Ultimo caracter de zona es numerico
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] 4+2 : Ultimo Caracter Es Numerico'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Set @cUsuario = Right(@cZona,1)
				Set @idUsuario = IsNull(Convert (Int, @cUsuario), 0)
				Set @bOK = 1
			End

			If @bOK = 1
			Begin
				If ( Select usu_icodigo From [_Datos].[dbo].[m_usuarios] Where usu_iidcuenta=@cue_iid And usu_icodigo=@idUsuario ) > 0
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] 4+2 : Configuro como Usuario : ' + Cast(@idUsuario As nVarChar(3))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
				Else
				Begin
					Set @cUsuario = ''
					Set @idUsuario = 0
				End
			End

			If Len(@cZona)=2 And Left(@cZona,1)='0' -- Verifico si tiene cero a la izquierda para eliminar el caracter
				Set @cZona = Right(@cZona,1)

		End
			--If IsNumeric(Right(@cZona,1)) = 1	--Analizar si la zona se guarda tambien en usuario
			--Begin
				--Set @idUsuario = ISNULL(CONVERT(INT, @cZona), 0)
				--If ( Select usu_icodigo From [_Datos].[dbo].[m_usuarios] Where usu_iidcuenta=@cue_iid And usu_icodigo=@idUsuario ) Is Null
				--Begin
					--Set @cUsuario = Right(@cZona,1)
					--Set @idUsuario = ISNULL(CONVERT(INT, @cUsuario), 0)
				--End
			--End
		--End
		--If Len(@cZona)=2 And Left(@cZona,1)='0'
			--Set @cZona = Right(@cZona,1)
	End

	Declare @rec_idFwd INT;

	IF (@iCtaFwd > 0)
	BEGIN
		SET @rec_idFwd = @cue_iid;
		SET @cue_iid = @iCtaFwd;
	END

	IF (@cDll = 'EBSPacketParser')
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Es EBSPacketParser, Actualizo m_paneles'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @cDebug = 'Si'
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Es EBSPacketParser | @remotePort : ' + CAST(@remotePort As nVarChar(6))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Es EBSPacketParser | @remoteIp : ' + CAST(@remoteIp As nVarChar(30))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Es EBSPacketParser | @cue_iid : ' + CAST(@cue_iid As nVarChar(6))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		END

		UPDATE _datos.dbo.m_paneles --WITH (UPDLOCK)
		SET pan_iremoteport = @remotePort, pan_cremoteip = @remoteIp
		WHERE pan_iidcuenta = @cue_iid
	End
	Else
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] NO ES EBSPacketParser, No Actualizo RemoteIP en Panel'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	/*2019-09-05 Pablo : consulte con Rodrigo y "se supone qe no lo uso mas"
	-- me fijo el tipo de cuenta y guardo IP y puerto donde corresponder (para envio de comandos)
	-- busco si hay un panel para la cuenta
	-- el modelo debe tener comandos... o el receptor tiene comandos sin modelo, sino no actualizo
	
	IF EXISTS (	SELECT pan_iidcuenta FROM _datos.dbo.m_paneles	WHERE pan_iidcuenta = @cue_iid	) 
			And @cDll != 'SmartPanicsPacketParser' 
			And @cDll != 'SMARTPANICS'
			And (
					-- hay comandos para el modelo
					exists (
						select rpm_idkey from _tablas..t_comandos 
							inner join _tablas..t_receptorprotocolmodel on [tcm_rpmidKey] = [rpm_idKey]
							where rpm_cmodelo = @protocolmodel) -- existe comando para el modelo
					OR (
						-- hay comandos para el receptor
						exists (
							select * from _tablas..t_comandos 
								where [tcm_iReceptor] = @ipc_iReceptor
						)
						-- no hay comandos con modelos para este receptor
						AND not exists(
							select * from _tablas..t_comandos 
								where [tcm_iReceptor] = @ipc_iReceptor
								and [tcm_rpmidKey] > 0
						)
					)
				)
	BEGIN
		-- hay panel para la cuenta actualizo ip y puerto
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Hay panel para la cuenta actualizo ip y puerto'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		UPDATE _datos.dbo.m_paneles  WITH (UPDLOCK)
		SET pan_iremoteport = @remotePort
			,pan_cremoteip = @remoteIp
		WHERE pan_iidcuenta = @cue_iid
	END
	*/

	/*2019-09-05 Pablo : consulte con Rodrigo y "es todo de lo mismo, ahi hay que probar comandos a GPS que sigan funcionando ok"
	--siempre hay panel de la cuenta entonces tengo que buscar siempre el panel del equipo movil... no uso else por si luego migramos todo a la misma tabla' 
	Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Busco panel del equipo movil' 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Declare @idEquipo INT = 0

	SELECT @idEquipo = idEquipo
		FROM _Datos.dbo.EquipoDispositivoMovil WITH (NOLOCK)
		WHERE idcuenta = @cue_iid

	IF (@idEquipo > 0)
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Hay un equipo movil. Actualizo IP y Puerto'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		-- hay un equipo movil, actualizo ip y puerto
		UPDATE _datos..EquipoDispositivoMovil
		SET iremoteport = @remotePort
			,cremoteip = @remoteIp
		WHERE idcuenta = @cue_iid
	END
	*/

	-- Ver_AutoMonitoreo : se analiza si la cuenta tiene configurado el automonitoreo. => Se encarga SGSP_pRecepcionINS 
	-- Agregar analisis de cuentas en prueba => Se encarga SGSP_pRecepcionINS 
	-- GrabaStatus : se actualiza mStatus -> se ocupa [AlarmaGenerar]
	-- CONTROL DE HORARIOS	<= Esto se hace con los nuevos triggers y nuevo Timer

	IF (@for_cAlarma = '_NE')
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Si el codigo no existe agrego el formato a rec_cContenido' 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		--Pablo : se pidio que el mensaje de codigo no existe para 4+2 con ceros a izquierda no muestre el cero--
		IF  @cProtocolo Like '4+2%' And @cEvento Like '0%' And Len(@cEvento) > 1
			Set @cEvento=SubString(@cEvento, PatIndex('%[^0]%',@cEvento), 10)

		SET @rec_cContenido = 'E:' + @cEvento + ' Z:' + @cZona;

		EXECUTE [dbo].[LocalizationGetLocale] @Name = N'Código no existe', @soloOutput=1,@translation = @translation OUTPUT;

		--2020-09-28 Acordamos que el header de las observaciones lo completa AlarmaGenerar
		--SET @rec_cObservaciones = '[' + CONVERT(VARCHAR(256), GETDATE(), 120) + '] [IRS] ' + @translation + ' ' + 'E:' + @cEvento + ' Z:' + @cZona;
		Set @rec_cObservaciones = @translation + ' ' + 'E:' + @cEvento + ' Z:' + @cZona;
	END

	-- si no hay ccuenta lo busco
	--IF (@cCuenta IS NULL OR @cCuenta = '')
	-- [13/11/2019]  Lo busco siempre para resolver caso donde el idcuenta es invalido pero llega igual y resuelve por imei, en ese caso se muestra mal la cuenta en iprsmanager
	SELECT @cCuenta = cue_ncuenta FROM _Datos.dbo.m_cuentas WITH (NOLOCK) WHERE cue_iid = @cue_iid


	--i-Boton
	IF ( (@cDll = 'LantrixPacketParser' Or @cDll = 'QueclinkPacketParser' Or @cDll = 'TraxGPSPacketParser' ) And @cReference != '')
	Begin
		Select @idUsuario=[usu_icodigo]
			From [_Datos].[dbo].[m_usuarios]
		Where [usu_cIdExtendido]=@cReference 
			And [usu_iidcuenta]=@cue_iid

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Usuario i-Boton Lantrix/Queclink/TraxGPS : ' + Cast(@idUsuario As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	--Davantis
	IF (@cDll = 'DavantisPacketParser' And @cReference != '' And @rec_cContenido='')
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Davantis Reference : ' + @cReference
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @rec_cContenido = '[DAV][' + Rtrim(@cReference) + ']'

		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Davantis rec_cContenido : ' + @rec_cContenido
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	--Intelbras
	IF (@cDll = 'IntelbrasPacketParser' And @cReference != '' )
	Begin
		--Hay que generar un comando de pedido de foto
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Intelbras Reference : ' + @cReference
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		IF @cDebug = 'Si'
		Begin
			Print ' Execute [SGSP_GenerateCommand]'
			Print ' @idCta	    : ' + CONVERT(VARCHAR(10), @cue_iid)
			Print ' @cReference : ' + @cReference
			Print ' @iReceptor	: ' + CONVERT(VARCHAR(10), @ipc_iReceptor)
		End

		Set @cReference=RTrim(@cReference)
		Execute [_Datos].[dbo].[SGSP_GenerateCommand] @idCta=@cue_iid, @cReference=@cReference, @iReceptor = @ipc_iReceptor
	End

	--VecinalGo
	IF ( @cDll = 'VecinalGoPacketParser' And @cReference != '')
	Begin
		Select @idUsuario=[usu_icodigo]
			From [_Datos].[dbo].[m_usuarios]
		Where [usu_cIdExtendido]=@cReference 
			And [usu_iidcuenta]=@cue_iid

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Usuario VecinalGo : ' + Cast(@idUsuario As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	--HikVisionLPR
	IF (@cDll = 'HikVisionPacketParser ' And @cReference Like '%LicensePlate%' )
	Begin
		/*
		Reference :LicensePlate :AB123CD| ListType :white
		Reference :LicensePlate :NVZ087| ListType :black
		Reference :LicensePlate :AB420NN| ListType :temporary
		*/
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] HikVisionLPR Reference : ' + @cReference
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Delete From @cSplitTable
		Insert @cSplitTable Select * From dbo.SplitString( @cReference, '|') 
		Declare @cItem nVarchar(100) = Ltrim(Rtrim((Select item From @cSplitTable Where id = 1)))
		Set @iPos = CHARINDEX(':', @cItem)
		Set @rec_cContenido = SUBSTRING(@cItem,@iPos+1 , Len(@cItem))

		Set @rec_cobservaciones = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [Sistema]  ID : ' + Rtrim(@rec_cContenido)

		--Buscar IdCta de la UF hacia donde se dirige la matricula detectada
		IF @cDebug = 'Si'
		Begin
			Print ' Execute [IPRS_GetVehicleDomain]'
			Print ' @Patente   : ' + @rec_cContenido
		End

		Set @rec_cContenido=RTrim(@rec_cContenido)

		Declare @cProvinciaTmp Char(3) = @cue_cProvincia,
				@cLineaTmp Char(3) = @cue_clinea
		Declare @iidTmp Int = @cue_iid

		Execute [_Desktop].[dbo].[IPRS_GetVehicleDomain] @Patente=@rec_cContenido, @cue_iid=@cue_iid OUTPUT, @cue_clinea=@cue_clinea  OUTPUT, @cue_cProvincia=@cue_cProvincia  OUTPUT

		If @cue_iid = 0 Or @cue_iid Is Null
		Begin
			--Los dejo con su valor original
			Set @cue_iid=@iidTmp
			Set @cue_cProvincia=@cProvinciaTmp
			Set @cue_clinea=@cLineaTmp
		End
		Else
		Begin
			--Tengo que buscar el nombre del vecino en usu_cmetadata de la patente leida
			Set @cMatricula = @rec_cContenido

			Select Top 1 @cVecino=[usu_cnombre],@cue_clinea=[cue_clinea],@cCuenta=[cue_ncuenta]
				From [_Datos].[dbo].[m_usuarios] WITH (NOLOCK)
			Inner Join [_Datos].[dbo].[m_cuentas]  On [cue_iid]=[usu_iidcuenta]
			Where [usu_iidcuenta]=@cue_iid
					And [usu_cmetadata] Like '%"domain"%' 
					And ISJSON(usu_cmetadata) = 1 
					And Cast(JSON_VALUE([usu_cmetadata],'$.domain') As Varchar(10))=@cMatricula

			If @cue_clinea != '' And @cue_clinea Is Not Null
			Begin				
				If @cCuenta != '' And @cCuenta Is Not Null
					Set @cUnidadFuncional = Rtrim(@cue_clinea) + '-' + Rtrim(@cCuenta)
			End 

			If @cVecino = '' Or @cVecino Is Null
				Set @cVecino = 'Sin datos'

			Declare @cTipo Char(3) = ''
			Select @cTipo=cue_ctipo 
				From [_Datos].[dbo].[m_cuentas] WITH (NOLOCK)
			Where [cue_iid]=@iidTmp

			Set @cTransito = 'Entrada'
			If @cTipo='LPS'	--Tipo harcodeado para identificar una cuenta camara en puerta de salida
			Begin
				/*
				HKI	Hikvision - Lectura de patente invalida
				HKN	Hikvision - Patente inexistente
				HKV	Hikvision - Lectura de patente válida
				HSI	Hikvision - Salida Lectura de patente invalida
				HSN	Hikvision - Salida Patente inexistente
				HSV	Hikvision - Salida Lectura de patente válida
				*/
				Set @cTransito = 'Salida'
				If @for_cAlarma='HKI'
					Set @for_cAlarma='HSI'
				Else If @for_cAlarma='HKN'
					Set @for_cAlarma='HSN'
				Else If @for_cAlarma='HKV'
					Set @for_cAlarma='HSV'
			End

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] HikVisionLPR | @cMatricula : ' + @cMatricula + ' | @cVecino : ' + @cVecino + ' | @cTransito : ' + @cTransito + ' | @cUnidadFuncional : ' + @cUnidadFuncional + ' | @for_cAlarma : ' + @for_cAlarma
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
	End

	-- Si el codigo es un KA tengo que grabar pHeartBeats
	IF (Right(Rtrim(@cEvento), 3) = '_KA')
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] El codigo es un KA tengo que grabar pHeartBeats'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @cDebug = 'Si'
		Begin
			Print ' Execute [SGSP_IRSHeartBeats]'
			Print ' @iPuerto	: ' + CONVERT(VARCHAR(10), @iPuerto)
			Print ' @cIMEI		: ' + @cCuenta
			Print ' @tFechaHora : ' + Convert(VarChar(MAX), @ahora, 20)
			Print ' @iConexion  : ' + CONVERT(VARCHAR(10), @rxt_iConexion)
		End

		Execute [_Datos].[dbo].[SGSP_IRSHeartBeats]
			 @iPuerto = @iPuerto
			,@cIMEI = @cCuenta
			,@tFechaHora = @ahora	--Antes estaba @rawFechaHora Pablo 27-03-2019
			,@iConexion = @rxt_iConexion

		SET @iGenera = 0
		IF (@cDll = 'Alari3PacketParser')
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Alari3PacketParser. Actualizo estados dinamicos'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @cDebug = 'Si'
			Begin
				Print ' Execute [SGSP_IRSAlariEstadosDinamicos]'
				Print ' @iCuenta : ' + CONVERT(VARCHAR(10), @cue_iid)
				Print ' @cEvt    : ' + @cEvt
			End

			Execute [_Datos].[dbo].[SGSP_IRSAlariEstadosDinamicos]
				 @iCuenta = @cue_iid
				,@cEvt = @cEvt
				,@iGenera = @iGenera OUTPUT

			IF @iGenera = 1 --Si hay que guardar evento tengo que buscar el codAlarma nuevo	
			BEGIN
				Declare @cAGenerar CHAR(4) = @cEvt --Upper(Substring(@cEvento, 1, 4))

				IF @cDebug = 'Si'
				Begin
					Print '[IPRS_packetProcesor] Execute [_Datos].[dbo].[SGSP_IRSBuscoFormato]'
					Print '[IPRS_packetProcesor]  @iReceptor  : ' + CONVERT(VARCHAR(10), @ipc_iReceptor)
					Print '[IPRS_packetProcesor]  @iCuenta    : ' + CONVERT(VARCHAR(10), @cue_iid)
					Print '[IPRS_packetProcesor]  @iTipo      : ' + CONVERT(VARCHAR(10), @iFormato)
					Print '[IPRS_packetProcesor]  @cEvento    : ' + @cAGenerar
					Print '[IPRS_packetProcesor]  @cZona      : ' + @cZona
					Print '[IPRS_packetProcesor]  @cProtocolo : ' + @cProtocolo
					Print '[IPRS_packetProcesor]  @iConexion  : ' + CONVERT(VARCHAR(10), @rxt_iConexion)
					Print '[IPRS_packetProcesor]  @cDebug     : Si'
				End

				Execute [_Datos].[dbo].[SGSP_IRSBuscoFormato]
					 @iReceptor = @ipc_iReceptor
					,@iCuenta = @cue_iid
					,@iTipo = @iFormato
					,@cEvento = @cAGenerar
					,@cZona = @cZona
					,@cProtocolo = @cProtocolo
					,@iConexion = @rxt_iConexion
					,@cAlarma = @for_cAlarma OUTPUT
					,@iCtaMap = @iCtaMap OUTPUT
					,@iCtaFwd = @iCtaFwd OUTPUT
					,@cDebug = @cDebug

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Alari3PacketParser. Alarma KA: ' + @for_cAlarma;
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			END
		END

		IF @iGenera = 0
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Es KA y no genera evento. Execute [IPRS_UPD_m_status]'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @cDebug = 'Si'
			Begin
				Print ' Execute [IPRS_UPD_m_status]'
				Print ' @idCta               : ' + CONVERT(VARCHAR(10), @cue_iid)
				Print ' @cAlarma             : ' + @for_cAlarma
				Print ' @idUsuario           : ' + CONVERT(VARCHAR(10), @idUsuario)
				Print ' @cZona               : ' + @cZona
				Print ' @rec_idFwd           : ' + CONVERT(VARCHAR(10), @rec_idFwd)
				Print ' @cDll                : ' + @cDll
			End		

			Execute [_Desktop].[dbo].[IPRS_UPD_m_status] 
					@idCta =@cue_iid,
					@cAlarma =@for_cAlarma,
					@idUsuario =@idUsuario,
					@cZona =@cZona,
					@rec_idFwd = @rec_idFwd,
					@rec_cdll = @cDll,
					@bGuardoPTimer = @bGuardoPTimer OUTPUT
		
			IF (@for_cAlarma = '_KA')
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Es ('+@for_cAlarma+') hay que verificar EventosEnFalloTesteo. Execute [SGSP_IRSEventosEnFalloTesteo]'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
				IF @cDebug = 'Si'
				Begin
					Print ' Execute [SGSP_IRSEventosEnFalloTesteo]'
					Print ' @cAlarma   : ' + @for_cAlarma
					Print ' @idCta     : ' + CONVERT(VARCHAR(10), @cue_iid)
				End		

				Execute [_Datos].[dbo].[SGSP_IRSEventosEnFalloTesteo] @cAlarma=@for_cAlarma, @idCta=@cue_iid

			End
		END

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] El codigo es un KA tengo que verificar si autoprocesa'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @cDebug = 'Si'
		Begin
			Print ' Execute [SGSP_AutoProcesoEventoKA]'
			Print ' @cCodAlarma : ' + '_KA'
			Print ' @idCuenta   : ' + CONVERT(VARCHAR(10), @cue_iid)
		End

		Execute [_Datos].[dbo].[SGSP_AutoProcesoEventoKA]
				@cCodAlarma = '_KA',
				@idCuenta = @cue_iid
	END

	IF (@cDll != 'SmartPanicsPacketParser')	--2022-06-13 Pablo : Esto es x que los eventos llegan a otro IRS y los comandos son enviados al IRS de SmartPanics
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Actualizo en m_CuentasXtraInfo el ID de IRS : ' + Cast(@idIRS As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		if @idIRS>0
		Begin
			Update  [_Datos].[dbo].[m_CuentasXtraInfo]
				Set [cue_iidIRS] = @idIRS
			Where [cue_iidCuenta] = @cue_iid
		End
	End

	IF (@cDll = 'NtComPacketParser' And @ProtocolModel != 'TCP Protocol' )	--Para TCP Protocol el valor que llega en |03= es directamente el nivel de señal
	BEGIN
		/*
		Valor entre -53 maximo y -113 minimo

		Entre -53 y -79 hace un solo parpadeo indicando buena señal
		Entre -80 y -95 hace dos parpadeos indicando nivel medio de señal
		Entre -96 y -101 hace 3 parpadeos indicando nivel bajo
		Entre -102 y -113 parpadea continuamente indicando que está a punto de explotar

		Case Between(iNivel,25,32)	SignalFullDiag
		Case Between(iNivel,17,24)	Signal34Diag
		Case Between(iNivel,9,16)	Signal12Diag
		Case Between(iNivel,1,8)	Signal14Diag
		*/
		IF (@iSignalLevel Between -79 And -53 )
			Set @iSignalLevel  = 32
		Else IF (@iSignalLevel Between -95 And -80 )
			Set @iSignalLevel  = 24
		Else IF (@iSignalLevel Between -101 And -96 )
			Set @iSignalLevel  = 16
		Else IF (@iSignalLevel Between -113 And -102 )
			Set @iSignalLevel  = 8
        Else 
			Set @iSignalLevel = 1
		            
	END
		
	-- guardo nivel de senial y ruido
	IF (@iSignalLevel > 0 OR @iChannelNoise > 0	OR @iTension > 0 )
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Guardo SignalLevel, ChannelNoise y Tension'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		INSERT INTO _datos..[p_nivelsenal] ([nvs_tfechahora],[nvs_idCuenta],[nvs_nNivel],[nvs_iRuido],[nvs_nTension])
			VALUES (GETDATE(),@cue_iid,@ISignalLevel,@IChannelNoise,@iTension)
	END

	IF @iGenera = 1
	BEGIN
		--Verificar si la cuenta tiene configurado control por video
		If ( @AssemblyClassName = 'DahuaPacketParser' And  @ProtocolModel = 'Alarm Receiver' ) Or
		   ( @AssemblyClassName = 'HikVisionPacketParser' And @ProtocolModel = 'HikVisionTotem') 
		   --( @AssemblyClassName = 'HikVisionPacketParser' And ( @ProtocolModel = 'HikvisionSubscriberAlarm' Or @ProtocolModel = 'HikVisionTotem') )
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Verificar control por video'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			Declare @iActivacionCxV Int = 1
			Select @iActivacionCxV=IsNull([cvc_iActivacionTotal],0)
			  From [_Datos].[dbo].[m_cuentas_video_control]
			Where [cvc_iIdCta]=@cue_iid

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			If @iActivacionCxV=1
				Begin
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control por video activado. Se genera evento'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
			Else 
				Begin
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control por video desactivado. No se genera evento'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					Set NoExec On
				End
		End

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Execute [AlarmaGenerar]'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @cDebug = 'Si'
		Begin
			Print ' Execute [AlarmaGenerar]'
			Print ' @idCta               : ' + CONVERT(VARCHAR(10), @cue_iid)
			Print ' @cAlarma             : ' + @for_cAlarma
			Print ' @cObservaciones      : ' + @rec_cObservaciones
			Print ' @cContenido          : ' + @rec_cContenido
			Print ' @cGeofenceName       : ' + IsNull(@cGeofenceName,'')
			Print ' @lat                 : ' + CONVERT(VARCHAR(10), @lat)
			Print ' @lng                 : ' + CONVERT(VARCHAR(10), @lng)
			Print ' @imei                : ' + @imei
			Print ' @rumbo               : ' + CONVERT(VARCHAR(10), @rumbo)
			Print ' @rawFechaHora        : ' + Convert(VarChar(MAX), @rawFechaHora, 20)
			Print ' @velocidad           : ' + CONVERT(VARCHAR(10), @velocidad)
			Print ' @cData               : ' + @cData
			Print ' @idUsuario           : ' + CONVERT(VARCHAR(10), @idUsuario)
			Print ' @cZona               : ' + @cZona
			Print ' @iPuerto             : ' + CONVERT(VARCHAR(10), @iPuerto)
			Print ' @rec_idMap           : ' + CONVERT(VARCHAR(10), IsNull(@iCtaMap,0))
			Print ' @rec_idFwd           : ' + CONVERT(VARCHAR(10), IsNull(@rec_idFwd,0))
			Print ' @rec_idReceptor      : ' + CONVERT(VARCHAR(10), @ipc_iReceptor)
			Print ' @cDll                : ' + @cDll
			Print ' @iOdometro           : ' + CONVERT(VARCHAR(10), @iOdometro)
			Print ' @rAccuracy           : ' + CONVERT(VARCHAR(10), @rAccuracy)
			Print ' @cMethod             : ' + @cMethod
			Print ' @iBattery            : ' + CONVERT(VARCHAR(10), @iBattery)
			Print ' @iExtBattery         : ' + CONVERT(VARCHAR(10), @iExtBattery)
			Print ' @iNivelSenial        : ' + CONVERT(VARCHAR(10), @iNivelSenial)
			Print ' @iSatelites          : ' + CONVERT(VARCHAR(10), @iSatelites)
			Print ' @cCallerID           : ' + @cCallerID
			Print ' @preventNotification : ' + CONVERT(VARCHAR(10), @preventNotification)
			Print ' @cEvento             : ' + @cEvento
			Print ' @spGeoAutoproceso    : ' + CONVERT(VARCHAR(10), @spGeoAutoproceso)
			Print ' @iFuel		         : ' + CONVERT(VARCHAR(10), @iFuel)
			Print ' @iEngineStatus       : ' + CONVERT(VARCHAR(10), @iEngineStatus)
		End

		Execute @rec_iid = [_Desktop].[dbo].[AlarmaGenerar]
			 @idCta = @cue_iid
			,@cAlarma = @for_cAlarma
			,@cObservaciones = @rec_cObservaciones
			,@cContenido = @rec_cContenido
			,@cRoute = N''
			,@cGeofenceName = @cGeoFenceName
			,@iroute = 0
			,@lat = @lat
			,@lng = @lng
			,@imei = @imei
			,@rumbo = @rumbo
			,@rawFechaHora = @rawFechaHora
			,@velocidad = @velocidad
			,@cData = @cData
			,@idUsuario = @idUsuario
			,@cZona = @cZona
			,@rec_norigen = 2
			,@cUser = N'IRServices'
			,@iPuerto = @iPuerto
			,@rec_idMap = @iCtaMap
			,@rec_idFwd = @rec_idFwd
			,@rec_idReceptor = @ipc_iReceptor
			,@cDll = @cDll
			,@iOdometro = @iOdometro
			,@rAccuracy = @rAccuracy
			,@cMethod = @cMethod
			,@iBattery = @iBattery
			,@iExtBattery = @iExtBattery
			,@iNivelSenial = @iNivelSenial
			,@iSatelites = @iSatelites
			,@cCallerID = @cCallerID
			,@preventNotification = @preventNotification	-- no mando notificaciones, lo hace IRS
			,@cEvento = @cEvento 
			,@spGeoAutoproceso = @spGeoAutoproceso --autoprocesa 
			,@iFuel = @iFuel
			,@iEngineStatus = @iEngineStatus
			,@bGuardoPTimer = @bGuardoPTimer OUTPUT
			,@cDebug = @cDebug

		If @rec_iid = 0
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Execute [AlarmaGenerar] volvio con @rec_iid=0'
			Set @cue_ncuenta = @cCuenta
			Set @rec_calarma = @for_cAlarma
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF ( @cDll = 'VettiPacketParser' And @rec_ccontenido Like '%Respuesta a comando enviado desde Vetti Config%' )
			Begin
				IF @cDebug = 'Si'
				Begin
					Print 'Execute [_Datos].[dbo].[SGSP_IRSRespuestaComandos]'
					Print '@iReceptor      : ' + CONVERT(VARCHAR(10), @ipc_iReceptor)
					Print '@cRespuesta     : ' + @cData
				End

				EXECUTE [_Datos].[dbo].[SGSP_IRSRespuestaComandos] @cRespuesta = @cData, @iReceptor = @ipc_iReceptor
			End

			Set NoExec On
		End

		If @cVecino != '' And  @cTransito != '' And @cUnidadFuncional !='' And @cMatricula != ''
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Inserto en EventosIngresosEgresos'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			INSERT INTO [_Datos].[dbo].[EventosIngresosEgresos]
				   ([eie_iRecId]
				   ,[eie_iCuentaId]
				   ,[eie_tFechaHora]
				   ,[eie_cMatricula]
				   ,[eie_cUnidadFuncional]
				   ,[eie_cVecino]
				   ,[eie_cTransito]
				   ,[eie_cUsuario])
			 VALUES
				   (@rec_iid
				   ,@cue_iid
				   ,@rawFechaHora
				   ,@cMatricula
				   ,@cUnidadFuncional
				   ,@cVecino
				   ,@cTransito
				   ,'Residente')
		End


		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Actualizo p_RXtraInfo'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		--2018-04-25 : Pablo. Cambie por merge
		MERGE INTO [_Datos].[dbo].[p_RXtraInfo] AS TGT
		USING ( Select @rxt_iConexion As iConexion, @rxt_nspip As nSPIP, @rxt_nvcip As nVCIP, @rec_iid As iRecId ,@imei as cImei ) AS SRC 
			ON TGT.[rxt_iRecId] = SRC.[iRecId]
		WHEN MATCHED THEN
			UPDATE SET
				TGT.[rxt_iConexion] = SRC.[iConexion],
				TGT.[rxt_nSPIP] = SRC.[nSPIP],
				TGT.[rxt_nVCIP] = SRC.[nVCIP],
				TGT.[rxt_cImei] = SRC.[cImei]
 		WHEN NOT MATCHED THEN 
			INSERT ([rxt_iRecId],[rxt_iConexion],[rxt_nSPIP],[rxt_nVCIP],[rxt_cImei])
			VALUES (SRC.[iRecId],@rxt_iConexion,SRC.[nSPIP],SRC.[nVCIP],SRC.[cImei]);

		--VigiControl/CleanApp
		If @for_cAlarma IN('V10','V11','V97','CA1','CA2','V38','V39')  --CA1-CLEANAPP: Ingreso | CA2-CLEANAPP: Salida | V10-VIGICONTROL: Guardia entrada | V11-VIGICONTROL: Guardia salida |V38-VIGICONTROL: Guardia entrada Buffer | V39-VIGICONTROL: Guardia salida Buffer |V97-VigiControl: Deslogueo forzado
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] si es VC login (V10) o logout (V11) - CA login (CA1) o logout (CA2) actualizo sesiones. Execute [VigicontrolCreateUserSessions]'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			Execute _Desktop.dbo.[VigicontrolCreateUserSessions]
		END

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Guardo p_RXLog'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @cDebug = 'Si'
		Begin
			Print ' rxl_iRecId    : ' + CONVERT(VARCHAR(10), @rec_iid)
			Print ' rxl_cLog      : ' + LEFT(@cData, 1000)
			Print ' rxl_cDll      : ' + Left(@cDll, 2)
			Print ' rxl_cEvento   : ' + @cEvento 
			Print ' rxl_cLineCard : ' + @cLineCard 
		End

		INSERT INTO [_Datos].[dbo].[p_RXLog] (rxl_iRecId,rxl_cLog,rxl_cDll,rxl_cEvento,rxl_cLineCard)
		VALUES (@rec_iid,LEFT(@cData, 1000),Left(@cDll, 2),@cEvento,@cLineCard);-- Pablo : estaba cue_clinea lo saco porque me dijo hernan

		--Sera4 con Candado
		IF ( @cDll = 'Sera4PacketParser' And @cReference != '')
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Sera4 con Candado : ' + @cReference
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Delete From @cSplitTable
			Insert @cSplitTable Select * From dbo.SplitString( @rec_cobservaciones, '|') 
			Declare @cLockName nVarchar(100) = Ltrim(Rtrim((Select item From @cSplitTable Where id = 1)))
			Declare @cRequested nVarchar(200) = Ltrim(Rtrim((Select item From @cSplitTable Where id = 2)))
			Declare @cReqObservacion nvarchar(1024) = Ltrim(Rtrim((Select item From @cSplitTable where id = 3)))
			Declare @cReqMembershipId nvarchar(1024) = Ltrim(Rtrim((Select item From @cSplitTable where id = 4)))
			
			Insert Into [_Datos].[dbo].[p_PadLocks]
					   ([pdl_iRecId],[pdl_cRequested],[pdl_cReqObservacion],[pdl_cReference],[pdl_cLockName],[pdl_cReqMembershipId],[pdl_tReqFechaHora],[pdl_rLatitude],[pdl_rLongitude],[pdl_iStatus])
				 Values
					   (@rec_iid,@cRequested,@cReqObservacion,Rtrim(@cReference),@cLockName,@cReqMembershipId,@rawFechaHora,@lat,@lng,1)

		End

		--Si es NTCOM ACM y no encontro @idCM, inserto una observacion que indique el LNK que le corresponde al evento.
		If @idCM = 0 And @ProtocolModel = 'ACM' And @AssemblyClassName = 'NtComPacketParser'
		Begin 
			Declare @iOper Int = 0
			Select @iOper=[rec_ioperador] From [_Datos].[dbo].[p_recepcion] With (NOLOCK) 
				Where rec_iid=@rec_iid

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] No encuentro zona para enviar evento ACM, indico el LNK correspondiente | LNK' + @cZona
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Insert Into [_Datos].[dbo].[EventosTimeLine] ([etl_iRecID] ,[etl_iCuenta] ,[etl_tFechaHora] ,[etl_cAccion] ,[etl_cObservacion] ,[etl_cOwner] ,[etl_iOperador])
			Values (@rec_iid ,@cue_iid ,GetDate() ,'LNK Comunitaria' ,'Evento ACM | LNK' + @cZona ,'%SISTEMA%' ,@iOper)
		End

		IF ( @cDll = 'IntelbrasPacketParser' And @rec_ccontenido Like '%Respuesta a comando enviado desde AMT%' ) Or ( @cDll = 'VettiPacketParser' And @rec_ccontenido Like '%Respuesta a comando enviado desde Vetti Config%' )
		Begin
			IF @cDebug = 'Si'
			Begin
				Print 'Execute [_Datos].[dbo].[SGSP_IRSRespuestaComandos]'
				Print '@iRecId         : ' + CONVERT(VARCHAR(10), @rec_iid)
				Print '@iReceptor      : ' + CONVERT(VARCHAR(10), @ipc_iReceptor)
				Print '@cRespuesta     : ' + @cData
			End

			EXECUTE [_Datos].[dbo].[SGSP_IRSRespuestaComandos] @iRecId = @rec_iid, @cRespuesta = @cData, @iReceptor = @ipc_iReceptor
		End

		--Genero la multimedia
		Declare @EjecutoVideoLinkParser Int = 1
		IF (@postimages = '') 
		Begin
			Set @EjecutoVideoLinkParser = 0
			--Si no hay mutimedia igual hay que verificar porque puede haber configurado la pre-grabacion
			Declare @DURATIONINSECONDS INT = (SELECT par_ivalor	FROM _Tablas.dbo.t_parametros WHERE par_cCodigo = 'DURATIONINSECONDS')
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Parametros de Grabacion RTSP | DurationInSeconds : ' + CAST(@DURATIONINSECONDS AS VARCHAR(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @DURATIONINSECONDS > 0	
			Begin
				Declare @cTemplate VARCHAR(max)
				Declare @iVideoID INT
				Declare @Cuantos INT = 0

				SELECT @iVideoID = cuv_iVideoID,@cTemplate = tvi_cTemplate,@Cuantos = CHARINDEX(@for_cAlarma, cuv_meventos)
					FROM _Datos.dbo.m_cuentas_video
				INNER JOIN _Tablas.dbo.t_VideoID ON cuv_iVideoID = tvi_iid
				WHERE CHARINDEX(@for_cAlarma, cuv_meventos) > 0	AND cuv_iidCuenta = @cue_iid

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Busco Video por Alarma-Zona : '+@cZona
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				IF EXISTS(SELECT * FROM _Datos.dbo.m_cuentas_video_links WHERE cvl_calarma = @for_cAlarma AND cvl_czona = @cZona AND cvl_iidCuenta = @cue_iid)
				BEGIN
					SELECT @iVideoID = cvl_iVideoID,@cTemplate = tvi_cTemplate,@Cuantos = 1
						FROM _Datos.dbo.m_cuentas_video_links
					INNER JOIN _Tablas.dbo.t_VideoID ON cvl_iVideoID = tvi_iid
					WHERE cvl_calarma = @for_cAlarma AND cvl_czona = @cZona	AND cvl_iidCuenta = @cue_iid
				END
	
				--iVideoID = 22 => GRV:	Generic RTSP VLC Mode
				IF ( @Cuantos > 0 AND @iVideoID = 22 AND @cTemplate != '' )
				BEGIN
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Se detecta grabacion FFMPEG'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					Set @EjecutoVideoLinkParser = 1
				END
				Else
				Begin
					Declare @UTILIZADGUARD INT = (SELECT par_ivalor FROM _Tablas.dbo.t_parametros	WHERE par_cCodigo = 'UTILIZADGUARD')
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Parametros de Grabacion RTSP | UtilizaDGUARD : ' + CAST(@UTILIZADGUARD AS VARCHAR(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					IF ( @UTILIZADGUARD = 1	AND @Cuantos > 0 )
						Set @EjecutoVideoLinkParser = 1				
				End
			End
		End

		IF (@EjecutoVideoLinkParser=1) 
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Execute [IPRS_VideoLinkParser]'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @cDebug = 'Si'
			Begin
				Print ' Execute [IPRS_VideoLinkParser]'
				Print ' @iRecId     : ' + CONVERT(VARCHAR(10), @rec_iid)
				Print ' @idCta      : ' + CONVERT(VARCHAR(10), @cue_iid)
				Print ' @cAlarma    : ' + @for_cAlarma
				Print ' @cZona      : ' + @cZona
				Print ' @clinea     : ' + @cue_clinea
				Print ' @ncuenta    : ' + @ccuenta
				Print ' @cDll       : ' + @cDll
				Print ' @postimages : ' + @postimages
				Print ' @formato : ' + @cEvento
			End

			Execute _Desktop.dbo.[IPRS_VideoLinkParser]
					 @iRecID = @rec_iid
					,@idCta = @cue_iid
					,@cAlarma = @for_cAlarma
					,@cZona = @cZona
					,@clinea = @cue_clinea
					,@ncuenta = @ccuenta
					,@cDll = @cDll
					,@postImages = @postimages
					,@formato = @cEvento
		End
		Else
		Begin
			IF @cDll = 'VigicontrolPacketParser' AND @cEvento = 'VCMU'
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Busco el evento de asignacion y de ahi la cuenta destino'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Declare @cue INT
				SELECT @cue = rec_iidcuenta
				  FROM  [_Datos].[dbo].[m_asignacion_movil]
				  Inner JOin [_Datos].[dbo].SmartTrack s On s.Id = [amv_objectid]
				  Inner JOin [_Datos].[dbo].p_recepcion On rec_iid = amv_rec_iid
				  Where s.CuentaId = @cue_iid
					And amv_objecttypeid = 3113
					And amv_estado IN(11,12)

				IF @cue > 0
				BEGIN
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] EXECUTE EventoDuplicar @rec_iid ='+ Cast(@rec_iid AS VARCHAR(10))+ ',@idCuentaDestino =' + Cast(@cue AS VARCHAR(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					EXECUTE [EventoDuplicar] @rec_iid = @rec_iid, @idCuentaDestino = @cue
				END
				ELSE
				BEGIN
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] No se encontro la cuenta asignada buscando el evento _DV'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				END
			END
		End

		--p_EventosTimer
		IF OBJECT_ID('[_Datos].[dbo].[p_EventosTimer]') IS NOT NULL 
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] No se ejecuta Grabacion de p_EventosTimer'
			If @bGuardoPTimer = 0
			Begin
				Set @message += ' | bGuardoPTimer en 0'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End
			Else
			Begin
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] No se ejecuta Grabacion de p_EventosTimer'
				Declare  @iExecute Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='TIMEREXECUTE' )
				If @iExecute Is Null Or @iExecute = 0
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				Else
				Begin	
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Proceso grabacion de p_EventosTimer'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Declare @cOpnClo CHAR(1) = ''
					SELECT @cOpnClo = CASE WHEN cod_ntipo = 1 THEN 'O' WHEN cod_ntipo = 2 THEN 'C' ELSE '' END
						FROM [_Tablas].[dbo].[t_codigos_alarma]
					WHERE cod_ccodigo = @for_cAlarma;

					IF @cOpnClo IN ('O','C')
					BEGIN
						Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Grabacion de p_EventosTimer'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						IF @cDebug = 'Si'
						Begin
							Print ' pet_cTipo      : ' + @cOpnClo
							Print ' pet_idCuenta   : ' + CONVERT(VARCHAR(10), @cue_iid)
							Print ' pet_iRecId     : ' + CONVERT(VARCHAR(10), @rec_iid)
							Print ' pet_tFechaHora : ' + Convert(VarChar(MAX), @ahora, 20)
							Print ' pet_cAlarma    : ' + @for_cAlarma 
							Print ' pet_cZona      : ' + @cZona 
							Print ' pet_iUsuario   : ' + CONVERT(VARCHAR(10), @idUsuario)
						End

						INSERT INTO [_Datos].[dbo].[p_EventosTimer] ([pet_cTipo],[pet_idCuenta],[pet_iRecId],[pet_tFechaHora],[pet_cAlarma],[pet_cZona],[pet_iUsuario])
							VALUES (@cOpnClo,@cue_iid,@rec_iid,@ahora,@for_cAlarma,@cZona,@idUsuario)
																 ---@rawFechaHora Pablo 27-03-2019
					END
				  End
				End
		END

		--m_TSTConexion
		IF OBJECT_ID('[_Datos].[dbo].[m_TSTConexion]') IS NOT NULL
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Proceso grabacion de m_TSTConexion'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Declare @idKey Int = 0
			Declare @AlarmaEsperada Char(3) = ''

			Select @idKey=[txc_idKey], @AlarmaEsperada=[txc_cAlarmaEsperada]
			  From [_Datos].[dbo].[m_TSTConexion] With (NOLOCK)
			  Where [txc_idCuenta]=@cue_iid And [txc_idIRSConn]=@rxt_iConexion

			IF @cDebug = 'Si'
			Begin
				Print '[IPRS_packetProcesor]  @cue_iid		  : ' + CONVERT(VARCHAR(10), @cue_iid)
				Print '[IPRS_packetProcesor]  @rxt_iConexion  : ' + CONVERT(VARCHAR(10), @rxt_iConexion)
				Print '[IPRS_packetProcesor]  @AlarmaEsperada : ' + @AlarmaEsperada
			End
      
			IF @for_cAlarma = @AlarmaEsperada Or @AlarmaEsperada = '_Q_'	--<== _Q_ indicador de que espera cualquier evento
			BEGIN
				--Tengo que fijarme si son codigos internos. Estos no deberian actualizar. Salvo que sea _KA
				If EXISTS (	SELECT cod_idKey FROM _Tablas.dbo.t_codigos_alarma WHERE cod_ccodigo = @for_cAlarma And cod_nsistema=1 And Left(@for_cAlarma,1)='_' And @for_cAlarma != '_KA')
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] | m_TSTConexion | Codigo de alarma es interno no se actualiza txc_tFechaUltimaRX'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End
				Else
					UPDATE [_Datos].[dbo].[m_TSTConexion] Set [txc_tFechaUltimaRX] = GetDate() Where [txc_idKey]=@idKey

			END
		End

		--Reporte Autoridades
		Declare @aut_cCodigo char(3);
		Declare @aut_cprovincia char(3)
		Declare @aut_cdealer char(3)
		Declare @cEsAP char(1)
		Declare @iResolucion int

		--Busco Categorizacion de Reporte Autoridad Auto Procesado
		Select @iResolucion = par_ivalor From _Tablas.dbo.t_parametros WITH (NOLOCK)
			Where par_ccodigo = 'CATREPAUTORIDADAP'

		Declare aut_cursor CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
			For Select aut_ccodigo,aut_cdealer,aut_cprovincia, (Case When CHARINDEX(@for_cAlarma,aut_cAutoProcesados) > 0 Then 'S' Else 'N' End) 
				From _Tablas.dbo.t_autoridades With (NOLOCK)
			Where CHARINDEX(@for_cAlarma,aut_meventosauto) > 0 Or CHARINDEX(@for_cAlarma,aut_cAutoProcesados) > 0 

		OPEN aut_cursor  
		FETCH NEXT FROM aut_cursor Into @aut_cCodigo,@aut_cdealer,@aut_cprovincia,@cEsAP;  
		WHILE @@FETCH_STATUS = 0  
		BEGIN
			If @aut_cCodigo != ''
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Controlo Reporte Autoridades ('+@aut_cCodigo+')'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				--Esto puede traer varios registros x lo cual hay que loopear (*)
				Declare @bInsert int = 0
				If @aut_cdealer = @cue_cLinea And @aut_cprovincia = @cue_cProvincia
					Set @bInsert = 1
				Else If Ltrim(Rtrim(@aut_cdealer)) = '' And @aut_cprovincia = @cue_cProvincia
						Set @bInsert = 1
				Else If @aut_cdealer = @cue_cLinea And Ltrim(Rtrim(@aut_cprovincia)) = ''
						Set @bInsert = 1
				Else If Ltrim(Rtrim(@aut_cdealer)) = '' And Ltrim(Rtrim(@aut_cprovincia)) = ''
						Set @bInsert = 1

				If @bInsert = 1
				Begin
					INSERT INTO _datos..p_reporte_autoridades(rep_cautoridad,rep_iidcuenta,rep_calarma,rep_dfechahora,rep_czona,rep_iidrecepcion)
					VALUES(@aut_ccodigo,@cue_iid,@for_cAlarma,@ahora,@cZona,@rec_iid)  	
																--@rawFechaHora Pablo 27-03-2019
	
					If @cEsAP = 'S'		--Si es autoprocesado
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Tiene configurado Reporte Autoridades con auto-proceso'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						Set @translation =''
						EXECUTE [dbo].[LocalizationGetLocale] @Name = N'Tiene configurado Reporte Autoridades con auto-proceso', @soloOutput=1,@translation = @translation OUTPUT;

						Declare @AuxObs nVarchar(max) = ''
						Set @AuxObs = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [Sistema] ' + @translation
						Set @Obs = ''
						Select @Obs=rec_cobservaciones From [_Datos].[dbo].[p_recepcion] With (NOLOCK) Where rec_iid = @rec_iid
		
						If (@Obs Is Not Null And @Obs != '')
							Set @Obs += Char(13) + @AuxObs
						Else
							Set @Obs = @AuxObs

						Update _Datos.dbo.p_recepcion Set rec_nestado=5, rec_idResolucion=@iResolucion, @rec_cobservaciones=@Obs Where rec_iid=@rec_iid
					End

				End		 
			End	
			FETCH NEXT FROM aut_cursor Into @aut_cCodigo,@aut_cdealer,@aut_cprovincia,@cEsAP;  
		END
		CLOSE aut_cursor;  
		DEALLOCATE aut_cursor;  

		--Control EventosEnFalloTesteo
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Es ('+@for_cAlarma+') hay que verificar EventosEnFalloTesteo. Execute [SGSP_IRSEventosEnFalloTesteo]'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
		IF @cDebug = 'Si'
		Begin
			Print ' Execute [SGSP_IRSEventosEnFalloTesteo]'
			Print ' @cAlarma   : ' + @for_cAlarma
			Print ' @idCta     : ' + CONVERT(VARCHAR(10), @cue_iid)
		End		

		Execute [_Datos].[dbo].[SGSP_IRSEventosEnFalloTesteo] @cAlarma=@for_cAlarma, @idCta=@cue_iid
		--

		--Control de No Restauraciones
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control de No Restauraciones. cProtocolo : '+@cProtocolo
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @norestaurada BIT = 0;
		Declare @cEventoExtendido VARCHAR(10)
				
		--2020-01-10 Pablo : DMP no envia zona y el protocolo es S3 Msg
		--IF Left(@cProtocolo, 3) IN ('CID','XML','S3 ')
		--2022-04-28 Pablo : QUECLINK graba con protocolo EVT
		IF Left(@cProtocolo, 3) IN ('CID','XML','S3 ','EVT','MII')	--,'JSO')
		BEGIN
			IF @iFormato = 1
			BEGIN
				--SET @cEventoExtendido = RTRIM(@for_cAlarma) + RTRIM(@cZona)
				SET @cEventoExtendido = RTRIM(@cEvt) + RTRIM(@cZona)

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control de No Restauraciones. EventoExtendido '+@cEventoExtendido
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control de No Restauraciones. Execute [IPRS_GrabaNoRestauradas]'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				IF @cDebug = 'Si'
				Begin
					Print ' Execute [IPRS_GrabaNoRestauradas]'
					Print ' @iIdCuenta   : ' + CONVERT(VARCHAR(10), @cue_iid)
					Print ' @tFechaHora  : ' + Convert(VarChar(MAX), @ahora, 20);
					Print ' @cZona       : ' + @cEventoExtendido
					Print ' @cCodAlarma  : ' + @for_cAlarma
					Print ' @iRecId      : ' + CONVERT(VARCHAR(10), @rec_iid)
					Print ' @cZonaEvento : ' + @cZona
				End

				Execute [IPRS_GrabaNoRestauradas] 
					 @iIdCuenta = @cue_iid
					,@tFechaHora = @ahora
					,@cZona = @cEventoExtendido
					,@cCodAlarma = @for_cAlarma
					,@iRecId = @rec_iid
					,@cZonaEvento = @cZona
					,@bGrabo = @norestaurada OUTPUT

				IF @norestaurada = 0
				BEGIN
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control de No Restauraciones. No estaba Evento+Zona. Tiene que buscar por Evento solo. Execute [IPRS_GrabaNoRestauradas]'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					IF @cDebug = 'Si'
					Begin
						Print ' Execute [IPRS_GrabaNoRestauradas]'
						Print ' @iIdCuenta   : ' + CONVERT(VARCHAR(10), @cue_iid)
						Print ' @tFechaHora  : ' + Convert(VarChar(MAX), @ahora, 20);
						Print ' @cZona       : ' + @cEvento
						Print ' @cCodAlarma  : ' + @for_cAlarma
						Print ' @iRecId      : ' + CONVERT(VARCHAR(10), @rec_iid)
						Print ' @cZonaEvento : ' + @cZona
					End

					Execute [IPRS_GrabaNoRestauradas] 
						 @iIdCuenta = @cue_iid
						,@tFechaHora = @ahora
						,@cZona = @cEvento
						,@cCodAlarma = @for_cAlarma
						,@iRecId = @rec_iid
						,@cZonaEvento = @cZona
						,@bGrabo = @norestaurada OUTPUT

					IF @norestaurada = 0 
					BEGIN
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control de No Restauraciones. No estaba Evento solo. Tiene que buscar por zona. Execute [IPRS_GrabaNoRestauradas]'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						IF @cDebug = 'Si'
						Begin
							Print ' Execute [IPRS_GrabaNoRestauradas]'
							Print ' @iIdCuenta   : ' + CONVERT(VARCHAR(10), @cue_iid)
							Print ' @tFechaHora  : ' + Convert(VarChar(MAX), @ahora, 20);
							Print ' @cZona       : ' + @cZona
							Print ' @cCodAlarma  : ' + @for_cAlarma
							Print ' @iRecId      : ' + CONVERT(VARCHAR(10), @rec_iid)
							Print ' @cZonaEvento : ' + @cZona
						End

						Execute [IPRS_GrabaNoRestauradas] 
							 @iIdCuenta = @cue_iid
							,@tFechaHora = @ahora
							,@cZona = @cZona
							,@cCodAlarma = @for_cAlarma
							,@iRecId = @rec_iid
							,@cZonaEvento = @cZona
							,@bGrabo = @norestaurada OUTPUT
					END
				END
			END
			ELSE
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control de No Restauraciones. iFormato = 0. Execute [IPRS_GrabaNoRestauradas]'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				IF @cDebug = 'Si'
				Begin
					Print ' Execute [IPRS_GrabaNoRestauradas]'
					Print ' @iIdCuenta   : ' + CONVERT(VARCHAR(10), @cue_iid)
					Print ' @tFechaHora  : ' + Convert(VarChar(MAX), @ahora, 20);
					Print ' @cZona       : ' + @cZona
					Print ' @cCodAlarma  : ' + @cEvento
					Print ' @iRecId      : ' + CONVERT(VARCHAR(10), @rec_iid)
					Print ' @cZonaEvento : ' + @cZona
				End

				Execute [IPRS_GrabaNoRestauradas] 
					 @iIdCuenta = @cue_iid
					,@tFechaHora = @ahora
					,@cZona = @cZona
					,@cCodAlarma = @cEvento
					,@iRecId = @rec_iid
					,@cZonaEvento = @cZona
					,@bGrabo = @norestaurada OUTPUT

				IF @norestaurada = 0
				BEGIN
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control de No Restauraciones. iFormato = 0. No estaba Zona. Tiene que buscar por Evento solo. Execute [IPRS_GrabaNoRestauradas]'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					IF @cDebug = 'Si'
					Begin
						Print ' Execute [IPRS_GrabaNoRestauradas]'
						Print ' @iIdCuenta   : ' + CONVERT(VARCHAR(10), @cue_iid)
						Print ' @tFechaHora  : ' + Convert(VarChar(MAX), @ahora, 20);
						Print ' @cZona       : ' + @cEvento
						Print ' @cCodAlarma  : ' + @for_cAlarma
						Print ' @iRecId      : ' + CONVERT(VARCHAR(10), @rec_iid)
						Print ' @cZonaEvento : ' + @cZona
					End

					Execute [IPRS_GrabaNoRestauradas] 
						 @iIdCuenta = @cue_iid
						,@tFechaHora = @ahora
						,@cZona = @cEvento
						,@cCodAlarma = @for_cAlarma
						,@iRecId = @rec_iid
						,@cZonaEvento = @cZona
						,@bGrabo = @norestaurada OUTPUT

				END

				IF @norestaurada = 0
				BEGIN
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control de No Restauraciones. iFormato = 0. No estaba Evento en Zona. Tiene que buscar por Codigo de alarma. Execute [IPRS_GrabaNoRestauradas]'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					IF @cDebug = 'Si'
					Begin
						Print ' Execute [IPRS_GrabaNoRestauradas]'
						Print ' @iIdCuenta   : ' + CONVERT(VARCHAR(10), @cue_iid)
						Print ' @tFechaHora  : ' + Convert(VarChar(MAX), @ahora, 20);
						Print ' @cZona       : ' + @cZona
						Print ' @cCodAlarma  : ' + @for_cAlarma
						Print ' @iRecId      : ' + CONVERT(VARCHAR(10), @rec_iid)
						Print ' @cZonaEvento : ' + @cZona
					End

					Execute [IPRS_GrabaNoRestauradas] 
						 @iIdCuenta = @cue_iid
						,@tFechaHora = @ahora
						,@cZona = @cZona
						,@cCodAlarma = @for_cAlarma
						,@iRecId = @rec_iid
						,@cZonaEvento = @cZona
						,@bGrabo = @norestaurada OUTPUT

				END
			END
		END
		ELSE
		BEGIN

			-- Seteo la cuenta con la cual configura el control de no restaurada segun donde busco el formato 
			
			Declare @iCtaMapNR Int = 0
			
			If @iCtaMap > 0 Or @iCtaMap Is Not Null
			Begin
				Set @iCtaMapNR = @iCtaMap
			End Else
			Begin
				Set @iCtaMapNR = @cue_iid
			End

			IF @cDebug = 'Si'
			Begin
				Print ' Execute [IPRS_GrabaNoRestauradas]'
				Print ' @iIdCuenta   : ' +  CONVERT(VARCHAR(10), @iCtaMapNR)
				Print ' @tFechaHora  : ' + Convert(VarChar(MAX), @ahora, 20);
				Print ' @cZona       : ' + @cZona
				Print ' @cCodAlarma  : ' + @for_cAlarma
				Print ' @iRecId      : ' + CONVERT(VARCHAR(10), @rec_iid)
				Print ' @cZonaEvento : ' + @cZona
			End

			Execute [IPRS_GrabaNoRestauradas] 
				 @iIdCuenta = @iCtaMapNR
				,@tFechaHora = @ahora
				,@cZona = @cZona
				,@cCodAlarma = @for_cAlarma
				,@iRecId = @rec_iid
				,@cZonaEvento = @cZona
				,@bGrabo = @norestaurada OUTPUT

			IF @norestaurada = 0 AND Left(@cProtocolo, 3) = 'SIA' 
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control de No Restauraciones. Solamente si el protocolo es SIA. Execute [IPRS_GrabaNoRestauradas]'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				IF @cDebug = 'Si'
				Begin
					Print ' Execute [IPRS_GrabaNoRestauradas]'
					Print ' @iIdCuenta   : ' + CONVERT(VARCHAR(10), @cue_iid)
					Print ' @tFechaHora  : ' + Convert(VarChar(MAX), @ahora, 20);
					Print ' @cZona       : ' + @cEvento
					Print ' @cCodAlarma  : ' + @for_cAlarma
					Print ' @iRecId      : ' + CONVERT(VARCHAR(10), @rec_iid)
					Print ' @cZonaEvento : ' + @cZona
				End

				Execute [IPRS_GrabaNoRestauradas] 
					 @iIdCuenta = @cue_iid
					,@tFechaHora = @ahora
					,@cZona = @cEvento
					,@cCodAlarma = @for_cAlarma
					,@iRecId = @rec_iid
					,@cZonaEvento = @cZona
					,@bGrabo = @norestaurada OUTPUT
----
					IF @norestaurada = 0
					BEGIN
						IF @iFormato = 1
						BEGIN
							--SET @cEventoExtendido = RTRIM(@for_cAlarma) + RTRIM(@cZona)
							SET @cEventoExtendido = RTRIM(@cEvt) + RTRIM(@cZona)

							Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control de No Restauraciones. EventoExtendido '+@cEventoExtendido
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
							Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control de No Restauraciones. Execute [IPRS_GrabaNoRestauradas]'
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

							IF @cDebug = 'Si'
							Begin
								Print ' Execute [IPRS_GrabaNoRestauradas]'
								Print ' @iIdCuenta   : ' + CONVERT(VARCHAR(10), @cue_iid)
								Print ' @tFechaHora  : ' + Convert(VarChar(MAX), @ahora, 20);
								Print ' @cZona       : ' + @cEventoExtendido
								Print ' @cCodAlarma  : ' + @for_cAlarma
								Print ' @iRecId      : ' + CONVERT(VARCHAR(10), @rec_iid)
								Print ' @cZonaEvento : ' + @cZona
							End

							Execute [IPRS_GrabaNoRestauradas] 
								 @iIdCuenta = @cue_iid
								,@tFechaHora = @ahora
								,@cZona = @cEventoExtendido
								,@cCodAlarma = @for_cAlarma
								,@iRecId = @rec_iid
								,@cZonaEvento = @cZona
								,@bGrabo = @norestaurada OUTPUT
						END
					END
----

			END
		END
	END

	--SOS DEMORADO o En Camino
	IF (@cDll = 'SMARTPANICSHTTP' OR @cDll = 'SmartPanicsPacketParser') AND  @iTiempoSOSDemorado > 0
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Analizo Tiempo En Camino. Execute [IPRS_GrabaSosDemorado]'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF @cDebug = 'Si'
		Begin
			Print ' Execute [IPRS_GrabaSosDemorado]'
			Print ' @cEvento            : ' + @cEvento
			Print ' @rawFechaHora       : ' + Convert(VarChar(MAX), @ahora, 20);
			Print ' @cue_iid            : ' + CONVERT(VARCHAR(10), @cue_iid)
			Print ' @iTiempoSOSDemorado : ' + CONVERT(VARCHAR(10), @iTiempoSOSDemorado)
			Print ' @rec_iid            : ' + CONVERT(VARCHAR(10), @rec_iid)
			Print ' @idUsuario          : ' + CONVERT(VARCHAR(10), @idUsuario)
			Print ' @sct_iSmartPanicID  : ' + CONVERT(VARCHAR(10), @sct_iSmartPanicID)
			Print ' @sct_cPushToken     : ' + @sct_cPushToken
		End

		Execute [IPRS_GrabaSosDemorado] @cEvento,@ahora,@cue_iid,@iTiempoSOSDemorado,@rec_iid,@idUsuario,@sct_iSmartPanicID, @sct_cPushToken
												   --@rawFechaHora Pablo 27-03-2019
	END

	--Control Desactivacion con Alarma a Procesar
	Declare @iTipoAlarma Int = 0
	Select @iTipoAlarma = cod_ntipo From [_Tablas].[dbo].[t_codigos_alarma] WITH (NOLOCK) Where cod_ccodigo = @for_cAlarma
			
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control Desactivacion con Alarma a Procesar : @for_cAlarma = ' + @for_cAlarma + ' | ' + '@iTipoAlarma = ' + Cast(@iTipoAlarma As nVarChar(4))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If @iTipoAlarma = 1		--1	Desactivacion ( OPN )
	Begin
		--Buscar el seteo por dealer
		--0 = No Genera / 1 = Genera
		Declare @iGeneraAlarmaPorDesactivacion Int = 0
		Select @iGeneraAlarmaPorDesactivacion = lin_iGeneraAlarmaPorDesactivacion 
			From _Tablas.dbo.t_lineas With (NOLOCK)
		Inner Join _Datos.dbo.m_cuentas On cue_clinea=lin_ccodigo
			WHERE cue_iid = @cue_iid

		Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control Desactivacion con Alarma a Procesar : @iGeneraAlarmaPorDesactivacion = ' + Cast(@iGeneraAlarmaPorDesactivacion As nVarChar(4))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		If @iGeneraAlarmaPorDesactivacion = 1
		Begin
			--Buscar si la cuenta tiene eventospendientes en estado 0.Evento Nuevo/Pendiente - 2.Evento en Espera
			Declare @iCant Int = 0
			Select @iCant= Count(*)
				From [_Datos].[dbo].[EventosPendientes] WITH (NOLOCK)
			Where [rec_iidCuenta]=@cue_iid
			And [rec_nEstado] IN(0,2)

			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control Desactivacion con Alarma a Procesar : @iCant = ' + Cast(@iCant As nVarChar(4))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
			If @iCant > 0
			Begin
				--Generar _DP : Desactivacion con Alarma a Procesar
				Declare @iValorEvt [int] = 0
				Execute [_Datos].[dbo].[SGSP_TimerGeneroEVT] @idCuenta = @cue_iid,	@AlarmaGenerar = '_DP', @iUsuario = @idUsuario, @iValor = @iValorEvt OUTPUT
			End
		End
	End

	--Control Acceso
	If @cDll In('IntelektronPacketParser') And @bControlAcceso = 1
	Begin
		--Verificar si el codigo de alarma es tipo 11-Control Acceso Valido
		If @iTipoAlarma = 11
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Control Acceso | Execute [SGSP_FillAccesosPendientes]'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @cDebug = 'Si'
			Begin
				Print ' Execute [SGSP_FillAccesosPendientes]'
				Print ' @idRec            : ' + CONVERT(VARCHAR(10), @rec_iid)
				Print ' @idCta            : ' + CONVERT(VARCHAR(10), @cue_iid)
				Print ' @cIdExtendido     : ' + @cUsuario
				Print ' @tEventoFechaHora : ' + Convert(VarChar(MAX), @ahora, 20);
				Print ' @iPuntoAcceso     : ' + CONVERT(VARCHAR(10), @iCtaOriginal)
			End

			Execute [_Datos].[dbo].[SGSP_FillAccesosPendientes] @idRec=@rec_iid, @idCta=@cue_iid, @cIdExtendido=@cUsuario, @tEventoFechaHora=@ahora, @iPuntoAcceso=@iCtaOriginal  

		End
	End

	--Control Cierre Particiones
	Declare @iTipo Int = 0
	Select @iTipo = cod_ntipo From [_Tablas].[dbo].[t_codigos_alarma] WITH (NOLOCK) Where cod_ccodigo = @for_cAlarma --Lo vuelvo a buscar x que si no es 4+2 no entro en el query anterior
	If @iTipo = 2 --CLO
	Begin	
		Declare @iCtrl Int = IsNull((Select par_ivalor From _Tablas.dbo.t_parametros WITH (NOLOCK) WHERE par_cCodigo = 'CONTROLAPARTICIONES'), 0)
		If @iCtrl = 1
		Begin
			Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] | Execute [SGSP_ControlCierreParticiones] '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Execute [_Datos].[dbo].[SGSP_ControlCierreParticiones] @cue_iid
		End 
	End

	--Fin
	Set @cue_ncuenta = @cCuenta
	Set @rec_calarma = @for_cAlarma

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] | Dealer => '+@cue_clinea+' | Cuenta => '+@cue_ncuenta+' | Alarma => '+@rec_calarma+' | idCta => '+Cast(@cue_iid As Varchar(10))+' | idRec => '+Cast(@rec_iid As Varchar(10)) 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set NoExec Off		

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_packetProcesor] Fin'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
END TRY
BEGIN CATCH
	/*
    Declare @ErrorMessage NVARCHAR(MAX);
    SET @ErrorMessage = 'ERROR EN STORED PROCEDURE - ' +
                       'Number: ' + CAST(ERROR_NUMBER() AS VARCHAR(10)) +
                       ' | Message: ' + ERROR_MESSAGE() +
                       ' | Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10)) +
                       ' | State: ' + CAST(ERROR_STATE() AS VARCHAR(10)) +
                       ' | Line: ' + CAST(ERROR_LINE() AS VARCHAR(10));

    -- Log en tu tabla
    BEGIN TRY
        INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
        VALUES (GETDATE(), @TraceIDStr, 'ERROR', OBJECT_NAME(@@PROCID), @ErrorMessage, ERROR_MESSAGE(), @@PROCID, SCHEMA_NAME(), DB_NAME(), @@SERVERNAME);
    END TRY
    BEGIN CATCH
    END CATCH;
	*/
    PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VarChar(10));
    PRINT 'Error Message : ' + ERROR_MESSAGE();
    PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
    PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
    PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
    PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');

    -- Manejo de errores específicos
    IF ERROR_NUMBER() = 2627
    BEGIN
        PRINT 'Handling PK violation...';
        -- Para PK violation, no lanzar error
    END;
    ELSE IF ERROR_NUMBER() = 547
    BEGIN
        PRINT 'Handling CHECK/FK constraint violation...';
        -- Para constraint violations, lanzar el error
        THROW;
    END;
    ELSE IF ERROR_NUMBER() = 515
    BEGIN
        PRINT 'Handling NULL violation...';
        THROW;
    END;
    ELSE IF ERROR_NUMBER() = 245
    BEGIN
        PRINT 'Handling conversion error...';
        THROW;
    END;
    ELSE
    BEGIN
        PRINT 'Re-throwing error...';
        -- Para cualquier otro error, lanzar la excepción
        THROW;
    END;
    
END CATCH