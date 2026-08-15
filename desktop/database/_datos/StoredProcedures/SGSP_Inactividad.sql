CREATE OR ALTER PROCEDURE [dbo].[SGSP_Inactividad] AS 
--Detecta Inactividad de los puertos-conexiones ip
--Autor .Pablo O. Canónico 25-10-2006
--Modificado 04-04-2007 para tomar tambien HB
--Modificado 01-10-2007 Controla Corte de Linea para Pegasus 3i
--Modificado 05-08-2010 Asigna cuenta SG-INTE si no existe 0000
--Modificado 10-01-2013 Envia x SMS
--Modificado 19-04-2016 Cambio rutina insert en pRecepcion
--Modificado 30-05-2016 Se actualiza m_Status
--Modificado 03-11-2017 Se agrego control sobre conexiones de IRS
--Modificado 13-11-2017 Solamente asigna cuenta SG-INTE no utiliza mas 0000
--Modificado 26-09-2018 Si no existe el idRec en pRecepcion se busca en la depurada ( TST )
--Modificado 22-10-2018 Se controla sobre iStatus=A en conexiones IRS
--Modificado 04-08-2021 Se agrego conexion para poder controlar TCPClient porque todos tienen puerto 1025
--Modificado 06-08-2021 Se agrego grabacion de [p_RXtraInfo] con el valor de la conexion
--Modificado 06-01-2022 Se agrego control de conexion en de [p_heartbeats]
--Modificado 15-07-2025 Se agrego control en depurqada sin dato de conexion porque los TST que se autodepuran no graban en p_RXtraInfo
--Modificado 25-07-2025 Se cambio a IF OBJECT_ID(@SynName, 'SN') 
--Modificado 27-10-2025 Ajuste. Siempre tomar MAX(fecha) entre p_recepcion y depurada. En la depurada, si no hay match por conexión, buscar por puerto
SET NOCOUNT ON
-- Aviso que la tarea esta funcionando	
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'Inactividad', @Repetition = 4
--	
Set DateFormat ymd
Declare @dUltimoEvento  DateTime,
 @dDiaHoy     			DateTime=GetDate(),
 @tFechaProceso			DateTime,
 @dUltimoHB				DateTime

Declare @iIdInterno	Int=0,
 @iTiempo			Int=0,
 @iInactivo			Int=0,
 @iIdCuenta			Int=0,
 @iError 			Int=0,
 @iReceptor			Int=0,
 @iModemSMS 		Int=0,
 @nFin 				Int=0,
 @iprsiid 			Int=0

Declare @cGrabo	Char(1)='S',
 @cAlarma		Char(3)='_DI'

Declare @cReceptorDesc	nVarChar(40)='',
 @cToSMS 				nVarChar(150)='',
 @cDestinoSMS 			nVarChar(150)='',
 @cSubject 				nVarChar(150)=(SELECT cod_cdescripcion From _Tablas.dbo.t_codigos_alarma With (NOLOCK) Where cod_ccodigo=@cAlarma),
 @cMessage 				nVarChar(140)='',
 @Limite				VarChar(20),
 @cDll					VarChar(50)

Declare @nPuerto	Numeric(5,0)=0,
 @nGeneraAlerta		Numeric(1,0)=0,
 @nEstado			Numeric(1,0)=0,
 @nResetHB			Numeric(1,0)=0,
 @iConexion			Int=0

Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

If @cSubject Is Null
   Set @cSubject = 'Deteccion Inactividad en Receptor'

DECLARE Puertos_Cursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
SELECT pue_cdescripcion,pue_npuerto,pue_itiempoinactividad,pue_ireceptor,pue_cresetxhb,'' As rec_cdll,0 As iprsc_iprsiid,0 As iConexion FROM _Tablas.dbo.t_puertos With (NOLOCK)
	Where pue_nestado= 2 And pue_itiempoinactividad > 0
Union All
SELECT ipc_cdescripcion,ipc_nport,ipc_itiempoinactividad,ipc_ireceptor,ipc_cresetxhb,'' As rec_cdll,0 As iprsc_iprsiid,0 As iConexion FROM _Tablas.dbo.t_ip_con With (NOLOCK)
Inner Join _Datos.dbo.m_receptores_cab On rec_iid=ipc_ireceptor
	Where ipc_nestado= 2 And ipc_itiempoinactividad > 0 And rec_iEsIRS=0
Union All
SELECT ipc_cdescripcion,ipc_nport,ipc_itiempoinactividad,ipc_ireceptor,ipc_cresetxhb,rec_cdll,iprsc_iprsiid,iConexion=[ipc_idKey] FROM _Tablas.dbo.t_ip_con With (NOLOCK)
Inner Join _Datos.dbo.m_receptores_cab On rec_iid=ipc_ireceptor
Inner Join _Tablas.dbo.t_IPRSConn On ipc_idKey=iprsc_ipcidkey
	Where iprsc_status='A' And ipc_itiempoinactividad > 0 --And rec_iEsIRS=1
Order By 2

OPEN Puertos_Cursor
FETCH NEXT FROM Puertos_Cursor INTO @cReceptorDesc,@nPuerto,@iTiempo,@iReceptor,@nResetHB,@cDll,@iprsiid,@iConexion
WHILE @@FETCH_STATUS = 0
BEGIN
	Set @Limite = Replace(convert(varchar, DATEADD(MINUTE,-@iTiempo,@dDiaHoy),120),'-','')
	
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | ==========================================================='
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | Tiempo => '+ Rtrim(Cast(@iTiempo As varchar(10)))+' | Conexion => '+ Rtrim(Cast(@iConexion As varchar(10)))+' | ResetHB => '+ Rtrim(Cast(@nResetHB As varchar(10)))+' | Limite => '+ Rtrim(Convert(VarChar, @Limite,120))+' | DiaHoy => '+ Rtrim(Convert(VarChar, @dDiaHoy,120))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Declare @LimiteDT DateTime = DATEADD(MINUTE,-@iTiempo,@dDiaHoy)
	Declare @dUltimoVivo DateTime = Null
	Declare @dUltimoDep  DateTime = Null

	-- 1) Buscar ultimo en p_recepcion
	Select Top 1 @dUltimoVivo=R.rec_tFechaRecepcion
	From dbo.p_recepcion R With (NOLOCK)
	Left Join dbo.p_RXtraInfo X With (NOLOCK) On X.rxt_iRecId=R.rec_iid
	Where R.rec_iPuerto=@nPuerto
	  And R.rec_nOrigen In(2,8)
	  And R.rec_tFechaRecepcion Between @LimiteDT And @dDiaHoy
	  And ( @iConexion=0 Or X.rxt_iConexion=@iConexion )
	Order By R.rec_tFechaRecepcion Desc

	-- 2) Buscar ultimo en depuradas (mes actual y, si corresponde, meses previos)
	Declare @mDiff Int = Datediff(Month,@LimiteDT,@dDiaHoy)
	If @mDiff > 12 Set @mDiff = 12 
	Declare @m Int = 0
	While @m <= @mDiff
	Begin
		Declare @suf Char(6) = Convert(Char(6), Dateadd(Month, -@m, @dDiaHoy), 112)
		Declare @sql nvarchar(max)
		Declare @outFecha DateTime = Null

		-- 2.a) Intento por conexión (si existe RXtraInfoYYYYMM y hay conexión)
		Set @sql = N'
		IF OBJECT_ID(N''dbo.p_recepcion'+@suf+N''',''U'') IS NOT NULL
		BEGIN
			IF OBJECT_ID(N''dbo.p_RXtraInfo'+@suf+N''',''U'') IS NOT NULL AND @iConexion <> 0
			BEGIN
				SELECT TOP (1) @outFecha = R.rec_tFechaRecepcion
				FROM dbo.p_recepcion'+@suf+N' AS R WITH (NOLOCK)
				INNER JOIN dbo.p_RXtraInfo'+@suf+N' AS X WITH (NOLOCK) ON X.rxt_iRecId = R.rec_iid
				WHERE R.rec_iPuerto = @nPuerto
				  AND R.rec_nOrigen IN (2,8)
				  AND R.rec_tFechaRecepcion BETWEEN @LimiteDT AND @dDiaHoy
				  AND X.rxt_iConexion = @iConexion
				ORDER BY R.rec_tFechaRecepcion DESC
			END
		END'
		Exec sp_executesql
			@sql,
			N'@outFecha DateTime OUTPUT, @nPuerto Int, @iConexion Int, @LimiteDT DateTime, @dDiaHoy DateTime',
			@outFecha=@outFecha OUTPUT, @nPuerto=@nPuerto, @iConexion=@iConexion, @LimiteDT=@LimiteDT, @dDiaHoy=@dDiaHoy

		-- 2.b) Fallback: Solo por puerto (aunque exista RXtraInfoYYYYMM)
		If @outFecha Is Null
		Begin
			Set @sql = N'
			IF OBJECT_ID(N''dbo.p_recepcion'+@suf+N''',''U'') IS NOT NULL
			BEGIN
				SELECT TOP (1) @outFecha = R.rec_tFechaRecepcion
				FROM dbo.p_recepcion'+@suf+N' AS R WITH (NOLOCK)
				WHERE R.rec_iPuerto = @nPuerto
				  AND R.rec_nOrigen IN (2,8)
				  AND R.rec_tFechaRecepcion BETWEEN @LimiteDT AND @dDiaHoy
				ORDER BY R.rec_tFechaRecepcion DESC
			END'
			Exec sp_executesql
				@sql,
				N'@outFecha DateTime OUTPUT, @nPuerto Int, @LimiteDT DateTime, @dDiaHoy DateTime',
				@outFecha=@outFecha OUTPUT, @nPuerto=@nPuerto, @LimiteDT=@LimiteDT, @dDiaHoy=@dDiaHoy
		End

		If @outFecha Is Not Null
			Set @dUltimoDep = Case When @dUltimoDep Is Null Or @outFecha > @dUltimoDep Then @outFecha Else @dUltimoDep End

		Set @m = @m + 1
	End

	-- 3) Elegir el más nuevo entre online y depurada
	Set @dUltimoEvento = Case
		When @dUltimoVivo Is Null Then @dUltimoDep
		When @dUltimoDep  Is Null Then @dUltimoVivo
		When @dUltimoVivo >= @dUltimoDep Then @dUltimoVivo
		Else @dUltimoDep End

	-- Log informativo del ajuste
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc 
		+' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))
		+' | UltVivo => '+ IsNull(Rtrim(Convert(VarChar,@dUltimoVivo,120)),'NULL')
		+' | UltDep => '+ IsNull(Rtrim(Convert(VarChar,@dUltimoDep,120)),'NULL')
		+' | UltEvento => '+ IsNull(Rtrim(Convert(VarChar,@dUltimoEvento,120)),'NULL')
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	-- HB (con <= @dDiaHoy habilitado)
	If @nResetHB = 1
      Begin		
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | Busco HB | Conexion => '+ Rtrim(Cast(@iConexion As varchar(10)))+' | Limite => '+ Rtrim(Convert(VarChar, @Limite,120))+' | DiaHoy => '+ Rtrim(Convert(VarChar, @dDiaHoy,120))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	    Set @dUltimoHB = Null
		Select Top 1 @dUltimoHB=hbs_tfechahora
  			  FROM p_heartbeats With (NOLOCK)
		WHERE hbs_ipuerto=@nPuerto
			  And hbs_tfechahora >= @Limite
	   		  And hbs_tfechahora <= @dDiaHoy
			  And ( @iConexion=0 Or [hbs_iConexion]=@iConexion )
		ORDER BY hbs_tfechahora DESC

		If @dUltimoHB Is Not Null 
		Begin
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | UltimoHB => '+ Rtrim(Convert(VarChar, @dUltimoHB,120))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			If @dUltimoEvento Is Null Or @dUltimoHB > @dUltimoEvento  
				Set @dUltimoEvento = @dUltimoHB

			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | HB es UltimoEvento => '+ Rtrim(Convert(VarChar, @dUltimoEvento,120))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		Else
		Begin
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | UltimoHB => NO HAY'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
      End

   --Controlo
   If @dUltimoEvento Is Null
 	Begin
		Set @iIdCuenta = (Select Top 1 cue_iid From m_cuentas With (NOLOCK)
			Where cue_clinea='_SG' And cue_ncuenta = 'INTE' )

		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | idCta => '+ Rtrim(Cast(@iIdCuenta As Varchar(10)))+' | Conexion => '+ Rtrim(Cast(@iConexion As varchar(10)))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		If @iIdCuenta Is Not Null
		Begin
			--
			Set @nEstado = 0
			Set @nGeneraAlerta = (SELECT cod_nalerta From _Tablas.dbo.t_codigos_alarma With (NOLOCK) Where cod_ccodigo=@cAlarma)

			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | GeneraAlerta => '+ Rtrim(Cast(@nGeneraAlerta As Varchar(10)))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			If @nGeneraAlerta Is Null
				Set @nEstado = 0
			Else
				Begin
				If @nGeneraAlerta = 2  	   --Es un Evento de NO GENERAR, NO se graba p_recepcion
					Set @nEstado = 9
				Else 	
					If @nGeneraAlerta = 0	--Si NO Genera Alerta (0) lo grabo con estado 5
					Set @nEstado = 5
				End
			--

			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | Estado => '+ Rtrim(Cast(@nEstado As Varchar(10)))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			If @nEstado < 9
			Begin
				Select @tFechaProceso = (Case When @nEstado = 5 Then @dDiaHoy Else Null End)

				Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | EXEC [dbo].[SGSP_pRecepcionINS]'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				If @cGrabo = 'S'	
				Begin
					BEGIN TRY
						EXEC [dbo].[SGSP_pRecepcionINS]
								@rec_iidcuenta = @iidCuenta,
								@rec_calarma = @cAlarma,
								@rec_tfechahora  = @dDiaHoy,
								@rec_nestado  = @nEstado,
								@rec_cContenido = @cReceptorDesc,
								@rec_tFechaProceso = @tFechaProceso,
								@rec_idReceptor = @iReceptor,
								@rec_tFechaRecepcion = @dDiaHoy,
								@rec_iPuerto = @nPuerto,
								@rec_nOrigen = 8,
								@iValor = @iIdInterno OUTPUT
					END TRY
					BEGIN CATCH
						Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | EXEC [dbo].[SGSP_pRecepcionINS] Volvio con error'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

						Set @iIdInterno=0
					END CATCH

					if @iIdInterno > 0
					Begin

						--Tengo que actualizar [p_RXtraInfo] con el valor de la conexion
						If @iConexion > 0
						Begin
							Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | Actualizo p_RXtraInfo con iConexion => '+ Rtrim(Cast(@iConexion As Varchar(10)))
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
							MERGE INTO [_Datos].[dbo].[p_RXtraInfo] AS TGT
							USING ( Select @iConexion As iConexion, @iIdInterno As iRecId ) AS SRC 
								ON TGT.[rxt_iRecId] = SRC.[iRecId]
							WHEN MATCHED THEN
								UPDATE SET
									TGT.[rxt_iConexion] = SRC.[iConexion]
 							WHEN NOT MATCHED THEN 
								INSERT ([rxt_iRecId],[rxt_iConexion])
								VALUES (SRC.[iRecId],@iConexion);
						End 

						--Tengo que actualizar Status con ultima alarma y fecha
						Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | Tengo que actualizar Status con ultima alarma y fecha'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
						UPDATE m_status WITH (UPDLOCK) 
							Set sta_cultimaalarma = @cAlarma, sta_dfechautimaalarma = CONVERT(DateTime, CONVERT(Varchar(20), @dDiaHoy, 120),111) 
						Where sta_iidCuenta=@iidCuenta

						--Si es Alari generar comando en RemoteCallQueue
						If (@cDll = 'Alari3PacketParser')
						Begin
							Declare @cURLDesktop nVarChar(1000)= ( Select par_cValor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='URLDESKTOP' )
							If Upper(Rtrim(@cURLDesktop)) = Upper('http://DesktopURL:PORT')
							Begin
								Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
								Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | Falta configurar el parametro URLDESKTOP'
								RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
							End
							Else
							Begin
								Declare @cLocalIP Varchar(250) = ''
								Declare @iCmdPort Int = 0
								Select @cLocalIP=[iprs_localip], @iCmdPort=[iprs_commandport]
									From [_Sistema].[dbo].[s_iprservicios]
									Where [iprs_idKey]=@iprsiid

								If @cLocalIP Is Null Or @cLocalIP='' Or @iCmdPort Is Null Or @iCmdPort=0
								Begin
									Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
									Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | No existen valores de IP y Puerto de comandos para iprsiid '+Cast(@iprsiid As VarChar(10))
									RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
								End
								Else
								Begin
									--DATEDIFF_BIG funciona en 2016 o superior
									--Declare @Tick Varchar(30) = ( Select DATEDIFF_BIG( microsecond, '00010101', GetDate() ) * 10 +( DATEPART( NANOSECOND, GetDate() ) % 1000 ) / 100 )
									Declare @Tick Varchar(30) = ( Select  (DATEDIFF(DAY, '01/01/0001', CAST(Getdate() AS DATE)) * 864000000000.0)
																	+ (DATEDIFF(SECOND, '00:00', CAST(Getdate() AS TIME(7))) * 10000000.0) + (DATEPART(NANOSECOND, Getdate()) / 100.0) )
									Set @Tick = Substring(@Tick,1,18)
										
									Declare @rcq_url Varchar(500) = Ltrim(@cURLDesktop) + '/handler/IRS_RESETALL_handler?_dc' + Rtrim(@Tick) + '&ip=' + Rtrim(@cLocalIP) + '&port=' + Rtrim(Cast(@iCmdPort As VarChar(5)))
									INSERT INTO [dbo].[RemoteCallQueue] (
										[rcq_estado],
										[rcq_tipo],
										[rcq_url]
										)
									VALUES (
										0,
										'HTTPGET',
										@rcq_url
										)
								End
							End
						End

						--Envio de SMS
						Set @cMessage = @cSubject +' '+ Rtrim(@cReceptorDesc) + ' | ' +CONVERT(char(19), GetDate(),120)  

						Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | SGSP_Inactividad | Control de Inactividad | Receptor => ' +@cReceptorDesc +' Puerto => '+ Rtrim(Cast(@nPuerto As Varchar(10)))+' | Envio de SMS | Message => '+ Rtrim(@cMessage)
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
						Select Top 1 @cToSMS=sms_csmsparaeventos, @iModemSMS=sms_imodemsms From m_sms
			 					Where ( CHARINDEX(@cAlarma, sms_meventos) > 0  Or
							( sms_iNotificarAlertas=1 And @cAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma And cod_nalerta=1)))
								And sms_csmsparaeventos<> '' And sms_imodemsms > 0 And sms_iidCuenta=@iidCuenta 

						Set @cToSMS = Ltrim(Rtrim(@cToSMS))+';'
	
						WHILE CHARINDEX(';',@cToSMS) > 0 And @iModemSMS > 0
						BEGIN
							Set @nFin = CHARINDEX(';',@cToSMS)	
							Set @cDestinoSMS=SUBSTRING( @cToSMS, 1, @nFin-1 )
							If @cGrabo = 'S'
							Insert Into p_SMSqueue (que_idCuenta,que_iModemSMS,que_cAsunto,que_cDestino)
							Values (@iidCuenta,@iModemSMS,Left(@cMessage,140),@cDestinoSMS)
			
							Set @cToSMS = SUBSTRING( @cToSMS, @nFin+1, 150-@nFin )
						END
					End
				End
			End
		End
	End	

   FETCH NEXT FROM Puertos_Cursor INTO @cReceptorDesc,@nPuerto,@iTiempo,@iReceptor,@nResetHB,@cDll,@iprsiid,@iConexion
End

CLOSE Puertos_Cursor
DEALLOCATE Puertos_Cursor


--Analizo si hay Pegasus 3i con corte o restauracion de lineas telefonicas
Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | SGSP_Inactividad | Analizo si hay Pegasus 3i con corte o restauracion de lineas telefonicas'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Declare @cCorteLinea	Char(3)=''
Declare @cIMEI 			nVarChar(20)=''
Declare @iidHB			Integer=0

DECLARE pegasus_Cursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
Select ipc_cdescripcion,ipc_nport,ipc_ireceptor,hbs_cCorteLinea,hbs_cIMEI,hbs_iid
 FROM _Tablas.dbo.t_ip_con With (NOLOCK)
 Inner Join _Datos.dbo.m_receptores_cab With (NOLOCK) On rec_iid = ipc_ireceptor
 Inner Join _Datos.dbo.p_heartbeats With (NOLOCK) On hbs_ipuerto = ipc_nport
	Where ipc_nestado= 2 And rec_cdll='PEGASUS' And hbs_cIMEI Not In('    ','####') And hbs_cCorteLinea Not In('   ') 
Order By hbs_cIMEI

OPEN pegasus_Cursor
FETCH NEXT FROM pegasus_Cursor INTO @cReceptorDesc,@nPuerto,@iReceptor,@cCorteLinea,@cIMEI,@iidHB
WHILE @@FETCH_STATUS = 0
BEGIN
   If Right(@cCorteLinea,1) <> '*'
	Begin

     If @cGrabo = 'S'	
      Begin

		--Busco ID de cuenta del cIMEI
		Set @iIdCuenta = (Select Top 1 cue_iid From m_cuentas With (NOLOCK)
				Inner Join  _Tablas.Dbo.t_port_alias
					On cue_clinea=tpa_cdealer
				Inner Join  _Tablas.dbo.t_ip_con
					On ipc_icodigo=tpa_iportip
				Where ipc_nport = @nPuerto	
				And cue_ncuenta = @cIMEI
				   Order By cue_iid )

		If @iIdCuenta Is Null
		   Set @iIdCuenta = (Select Top 1 cue_iid From m_cuentas With (NOLOCK)
			Where cue_clinea='_SG' And cue_ncuenta = 'INTE' )

		If @iIdCuenta Is Null
		   Set @iIdCuenta = 0

		--
		Set @nEstado = 0
		If @cCorteLinea = '55'
	   	   Set @cAlarma = '_CL'	
		Else	--C5 / D5 / E5
	   	   Set @cAlarma = '_RL'	

		Set @nGeneraAlerta = (SELECT cod_nalerta From _Tablas.dbo.t_codigos_alarma With (NOLOCK) Where cod_ccodigo=@cAlarma)

		If @nGeneraAlerta Is Null
		   Set @nEstado = 0
		Else
		   Begin
				If @nGeneraAlerta = 2  	   --Es un Evento de NO GENERAR, NO se graba p_recepcion
					Set @nEstado = 9
				Else 	
					If @nGeneraAlerta = 0	--Si NO Genera Alerta (0) lo grabo con estado 5
					Set @nEstado = 5
				End

				If @nEstado < 9
					Begin
					--1ero genero alerta
						Select @tFechaProceso = (Case When @nEstado = 5 Then @dDiaHoy Else Null End)

						BEGIN TRY
							EXEC [dbo].[SGSP_pRecepcionINS]
									@rec_iidcuenta = @iidCuenta,
									@rec_calarma = @cAlarma,
									@rec_tfechahora  = @dDiaHoy,
									@rec_nestado  = @nEstado,
									@rec_cContenido = @cReceptorDesc,
									@rec_tFechaProceso = @tFechaProceso,
									@rec_idReceptor = @iReceptor,
									@rec_tFechaRecepcion = @dDiaHoy,
									@rec_iPuerto = @nPuerto,
									@rec_nOrigen = 8,
									@iValor = @iIdInterno OUTPUT
						END TRY
						BEGIN CATCH
							Print 'EXEC [dbo].[SGSP_pRecepcionINS] Volvio con error'
							Set @iIdInterno=0
						END CATCH

						if @iIdInterno > 0
						Begin
							--Tengo que actualizar Status con ultima alarma y fecha
							UPDATE m_status WITH (UPDLOCK)
								Set sta_cultimaalarma = @cAlarma, sta_dfechautimaalarma = CONVERT(DateTime, CONVERT(Varchar(20), @dDiaHoy, 120),111) 
							Where sta_iidCuenta=@iidCuenta

							--2do actualizo cortelinea
							UPDATE p_heartbeats WITH (UPDLOCK)
								Set hbs_cCorteLinea=Substring(hbs_cCorteLinea,1,2)+'*'
							Where hbs_iid=@iidHB
						End
					End
	      End
	End 

   FETCH NEXT FROM pegasus_Cursor INTO @cReceptorDesc,@nPuerto,@iReceptor,@cCorteLinea,@cIMEI,@iidHB
End
CLOSE pegasus_Cursor
DEALLOCATE pegasus_Cursor