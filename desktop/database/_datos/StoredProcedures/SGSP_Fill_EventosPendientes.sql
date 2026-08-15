CREATE OR ALTER PROCEDURE [dbo].[SGSP_Fill_EventosPendientes] @idRec BigInt=0, @nCheck Int=1, @cDebug Char(2) = 'No'	--'Si' 
As
--Es el store que ejecuta el trigger de fill en p_Recepcion
--Tiene Insert y Update x que hay tablas que se actualizan luego del insert en pRecepcion
--Autor :Pablo O. Canónico
--Fecha :10/07/2015
--Modificado 21-04-2016 Rutina depuracion automatica pRecepcion
--Modificado 08-06-2016 control de cuenta inexistente
--Modificado 27-06-2016 se agrega @nCheck para controlar y hacer solo insert si viene de RxLog (0)
--Modificado 28-10-2016 para los eventos _DI se resuelve el _Puerto
--Modificado 02-12-2016 se agrego debug de ejecucion
--Modificado 26-02-2018 se agrego control para estado 1,9
--Modificado 01-10-2018 se agrego WITH (NOLOCK) a los Join contra tablas estaticas ( sin movimiento )
--Modificado 28-10-2019 se agrego where por zona cuando idMap=0 para obtener imagen de la zona y no del codigo de alarma
--Modificado 10-11-2020 Ultima posicion para moviles por si no llego Lat/Lng
--Modificado 23-12-2020 se agrego [_ZonaParticion] para identificar el nro de particion en la cual llego el evento
--Modificado 13-01-2021 Se modifico cod_nTipo y tip_nTipo a INT
--Modificado 13-05-2022 Se modifico VideoLinkParser para considerar cuv_iTodosLosEventos
--Modificado 15-06-2022 Se modifico Actualizacion EngineStatus para considerar tabla [p_GPSEngine]
--Modificado 11-08-2023 para los eventos _DI se resuelve el _Puerto con rec_cContenido x que en las conexions TCPCLIENT el puerto puede estar duplicado 
--Modificado 29-07-2024 se busca si el evento tiene configurado auto asignacion de VC y se lo marca
--Modificado 13-12-2024 se agrego control de cuenta en falla/restauracion
--Modificado 11-06-2025 se utiliza parametro PERFOMANCECODE para saber que codigo ejecutar
--Modificado 22-07-2025 se cambio SP_CreoHistoria por [SGSP_CreoPRDepurado]
--Modificado 25-07-2025 Se cambio a IF OBJECT_ID(@SynName, 'SN') 
--Modificado 11-12-2025 Se agrego control de OperadorVirtual
--Modificado 21-01-2026 Se agrego en If @iTagged=1 el  And @nCheck = 1 para evitar que el trigger TG_UPD_ImgPendiente lo vuelva a ejecutar
--Modificado 26-05-2026 Se agrego TimeLine y nProceso para OperadorVirtual
--2026-07-81 : Se agrego @cDebug
SET NOCOUNT ON;

BEGIN TRY
--idCuenta | Origen--
Declare @idCuenta Int
Declare @rec_nOrigen Numeric(1, 0)=0,
		@rec_nEstado Numeric(1, 0)=0,
		@rec_iOperador Int = 0
Declare @message nVarChar(Max) = '',
		@StartDateTimeText nVarChar(max)='',
		@ope_cNombre nVarChar(100),
		@ope_cLogin nVarChar(100)

Declare @cCodAlarma Char(3)
Declare @rec_cTerminal Char(3) = ''
Declare @rec_tFechaProceso Datetime
Declare @rec_tFechaHora Datetime

Declare @iParametro Int = IsNull(( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='PERFOMANCECODE' ),0)

IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Inicio-- --idCuenta | Origen | Estado--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End
		
Select @idCuenta = rec_iidcuenta, @rec_nOrigen=rec_nOrigen, @rec_nestado = rec_nestado, @rec_iOperador=rec_iOperador, @rec_cTerminal=rec_cTerminal, @ope_cNombre=IsNull(ope_cNombre,''),
	 @ope_cLogin=IsNull(ope_cLogin,''),@rec_tFechaProceso=rec_tFechaProceso, @cCodAlarma=rec_cAlarma, @rec_tFechaHora=rec_tFechaHora
  	From p_Recepcion WITH (NOLOCK)
	Left Outer Join [_Sistema].[dbo].[s_operadores] OP WITH (NOLOCK) ON rec_iOperador = OP.ope_iid
	Where rec_iid = @idRec

--Si paso a estado 9 (Evento en estado Temporal usado por ProcesaTodo) o 1 (Evento esta siendo Procesado ) solamente actualizo el estado/operador/terminal/FechaProceso en EventosPendientes
If @rec_nEstado IN(1,9)
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		If @rec_nEstado = 9
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | estado 9 = Evento en estado Temporal usado por ProcesaTodo'
		Else
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | estado 1 = Evento esta siendo Procesado'

		IF @cDebug = 'Si'
		Begin
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			--Actualizo en EventosPendiente--
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Actualizo en EventosPendientes estado/operador/terminal--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Update [dbo].[EventosPendientes] With (UPDLOCK)
			Set [rec_nEstado]=@rec_nEstado, [rec_iOperador]=@rec_iOperador, [rec_cTerminal]=@rec_cTerminal, [ope_cNombre]=@ope_cNombre, [ope_cLogin]=@ope_cLogin, [rec_tFechaProceso]=@rec_tFechaProceso
		Where [rec_iid]=@idRec

		Set NoExec On
	End

--Verifico si el idCta existe en Cuentas--
IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Verifico si el idCta existe en Cuentas--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

If Not Exists ( Select cue_iid  From [dbo].[m_cuentas]  WITH (NOLOCK) Where cue_iid = @idCuenta )
	Begin
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | cue_iid ('+Cast(@idCuenta As Varchar(10))+') No Existe!!! '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Set NoExec On
	End

If @idCuenta = 0
	Begin
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | idCuenta en cero!!! '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Set NoExec On
	End

--Verifico @nCheck y origen--	
IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Verifico @nCheck y origen--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

If @nCheck = 1
	Begin
		If @rec_nOrigen	IN(2,6)	--Receptor/SMS
		Begin
			IF @cDebug = 'Si'
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | Origen ('+Cast(@rec_nOrigen As Varchar(10))+') No Actualiza EventosPendientes. Solamente CuentasXtraInfo '
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End

			--Me fijo si es un codigo de AWCC
			Declare @nWebCliente Int = 0,
					@nAlerta Int = 0
			
			Select @nWebCliente=cod_nWebCliente, @nAlerta=cod_nAlerta From [_Tablas].[dbo].[t_codigos_alarma] WITH (NOLOCK) 
				Where cod_cCodigo=@cCodAlarma

			Declare @UltimaAlarmaRecibidaAWCC Char(3) = '',
					@dFechaUltimaAlarmaRecibidaAWCC DateTime = Null,
					@cUltimaAlertaAWCC Char(3) = '',
					@dFechaUltimaAlertaAWCC DateTime = Null

			If @nWebCliente=1	--Es de AWCC
			Begin
				Set @UltimaAlarmaRecibidaAWCC = @cCodAlarma
				Set @dFechaUltimaAlarmaRecibidaAWCC = @rec_tFechaHora

				IF @nAlerta = 1 --Es evento que genera alerta
				Begin
					Set	@cUltimaAlertaAWCC = @cCodAlarma
					Set	@dFechaUltimaAlertaAWCC = @rec_tFechaHora
				End
			End

			Declare @cFalla Varchar(max) = '',
					@cRest Varchar(max) = ''
			Declare @iEnFalla Int = 0

			Select Top 1  @cFalla=[cef_cEventosFalla],@cRest=[cef_cEventosRest] From [_Tablas].[dbo].[t_CodigosEnFalla]  WITH (NOLOCK) 

			IF CHARINDEX(@cCodAlarma, @cFalla) > 0
				SET @iEnFalla = 1
			ELSE IF CHARINDEX(@cCodAlarma, @cRest) > 0 
				SET @iEnFalla = 0

			IF @iParametro = 1 
			Begin
				UPDATE [dbo].[m_CuentasXtraInfo]
				SET [cue_cUltimaAlarmaRecibida] = @cCodAlarma,
					[cue_dFechaUltimaAlarmaRecibida] = @rec_tFechaHora,
					[cue_cUltimaAlarmaRecibidaAWCC] = @UltimaAlarmaRecibidaAWCC,
					[cue_dFechaUltimaAlarmaRecibidaAWCC] = @dFechaUltimaAlarmaRecibidaAWCC,
					[cue_cUltimaAlertaAWCC] = @cUltimaAlertaAWCC,
					[cue_dFechaUltimaAlertaAWCC] = @dFechaUltimaAlertaAWCC,
					[cue_iEnFalla] = @iEnFalla
				WHERE [cue_iidCuenta] = @idCuenta

				IF @@ROWCOUNT = 0 AND NOT EXISTS (SELECT TOP 1 [cue_iidCuenta] FROM [dbo].[m_CuentasXtraInfo] WITH (NOLOCK) WHERE [cue_iidCuenta] = @idCuenta)
				BEGIN
					INSERT INTO [dbo].[m_CuentasXtraInfo] ([cue_iidCuenta],[cue_cUltimaAlarmaRecibida],[cue_dFechaUltimaAlarmaRecibida],[cue_cUltimaAlarmaRecibidaAWCC],[cue_dFechaUltimaAlarmaRecibidaAWCC],[cue_cUltimaAlertaAWCC],[cue_dFechaUltimaAlertaAWCC],[cue_iEnFalla])
					VALUES (@idCuenta,@cCodAlarma,@rec_tFechaHora,@UltimaAlarmaRecibidaAWCC,@dFechaUltimaAlarmaRecibidaAWCC,@cUltimaAlertaAWCC,@dFechaUltimaAlertaAWCC,@iEnFalla)
				END
			End
			Else 
			Begin
				MERGE INTO [dbo].[m_CuentasXtraInfo] AS TGT
				USING ( Select @idCuenta As rec_iidcuenta, @cCodAlarma As rec_cAlarma, @rec_tFechaHora As rec_tFechaHora, @UltimaAlarmaRecibidaAWCC As UltimaAlarmaAWCC, @dFechaUltimaAlarmaRecibidaAWCC As FechaUltimaAlarmaAWCC, @cUltimaAlertaAWCC As AlertaAWCC, @dFechaUltimaAlertaAWCC As FechaAlertaAWCC, @iEnFalla As iEnFalla) AS SRC 
				  ON TGT.[cue_iidCuenta] = SRC.[rec_iidcuenta]
				WHEN MATCHED THEN
				  UPDATE SET
					  TGT.[cue_cUltimaAlarmaRecibida] = SRC.[rec_cAlarma],
					  TGT.[cue_dFechaUltimaAlarmaRecibida] = SRC.[rec_tFechaHora],
					  TGT.[cue_cUltimaAlarmaRecibidaAWCC] = SRC.[UltimaAlarmaAWCC],
					  TGT.[cue_dFechaUltimaAlarmaRecibidaAWCC] = SRC.[FechaUltimaAlarmaAWCC],
					  TGT.[cue_cUltimaAlertaAWCC] = SRC.[AlertaAWCC],
					  TGT.[cue_dFechaUltimaAlertaAWCC] = SRC.[FechaAlertaAWCC],
					  TGT.[cue_iEnFalla] = SRC.[iEnFalla]
 				WHEN NOT MATCHED THEN 
					INSERT ([cue_iidCuenta],[cue_cUltimaAlarmaRecibida],[cue_dFechaUltimaAlarmaRecibida],[cue_cUltimaAlarmaRecibidaAWCC],[cue_dFechaUltimaAlarmaRecibidaAWCC],[cue_cUltimaAlertaAWCC],[cue_dFechaUltimaAlertaAWCC],[cue_iEnFalla])
					VALUES (SRC.[rec_iidcuenta],SRC.[rec_cAlarma],SRC.[rec_tFechaHora],SRC.[UltimaAlarmaAWCC],SRC.[FechaUltimaAlarmaAWCC],SRC.[AlertaAWCC],SRC.[FechaAlertaAWCC],SRC.[iEnFalla]);
			End
			Set NoExec On
		End
	End
	
--Prioridad | CodigoAlarma | idZona | idUsuario--
IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Prioridad | CodigoAlarma | idZona | idUsuario--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

Declare @cZon  Char(10)
Declare @iUsu  Int
Declare @iAlerta Int
Declare @nResuelve Numeric(1,0)
Declare @cod_cDescripcion nVarchar(100)
Declare @cod_nColor Int
Declare @cod_nColorLetra Int
Declare @cod_nTipo Int
Declare @cod_nLeeSonido Numeric(1,0)
Declare @cod_cSonido nVarChar(100)
--Declare @cCodAlarma Char(3)
Declare @iPrioridad Int
Declare @iImportancia int
--Desnormalizacion Usuario/Zonas/Origen/AAAAMM para depurados--
Declare @cName nVarChar(30)
Declare @cDesc nVarChar(60)
Declare @_Origen nVarChar(100)
Declare @_Puerto nVarChar(100)
--Resto de p_Recepcion | Origen Desnormalizado | Puerto Desnormalizado--
Declare @cCierre Char(6)
--Declare @rec_nEstado Numeric(1, 0) 
Declare @rec_cContenido nVarChar(50) 
--Declare @rec_tFechaHora Datetime
Declare @rec_tFechaRecepcion Datetime
--Declare @rec_tFechaProceso Datetime
--Declare @rec_iOperador Int
--Declare @rec_cTerminal Char(3)
Declare @rec_idResolucion NChar(3)
Declare @rec_idReceptor Int
Declare @rec_cCategorizacion Char(3)
Declare @rec_iNYR bigInt
Declare @rec_iTE bigInt
Declare @rec_idMap bigInt
Declare @rec_idFwd bigInt
Declare @rec_iMinutosEspera Smallint
Declare @rec_iPuerto Int
Declare @rec_idLoc Int
Declare @rec_isoFechaHora Varchar(30)
Declare @rec_isoFechaProceso Varchar(30)
Declare @rec_isoFechaRecepcion Varchar(30)
--Operador Nombre | Operador Login | Datos Receptor--
--Declare @ope_cNombre nVarChar(100)
--Declare @ope_cLogin nVarChar(100)
Declare @rec_cDescripcion nVarChar(100)
Declare @rec_cDll nVarChar(100)
Declare @rec_nTcpIp Numeric(1,0)
--Resolucion | Categorizacion--
Declare @res_cCodigo Char(3)
Declare @res_cDescripcion nVarChar(100)
Declare @res_nFalsaAlarma Numeric(1,0)
Declare @res_nEstado Numeric(1,0)
Declare @cat_cCodigo Char(3)
Declare @cat_cDescripcion nVarChar(100)

Select Top 1 @nResuelve=CA.cod_nResuelve, @iAlerta = CA.cod_nalerta, @cCodAlarma = rec_cAlarma, @cZon = rec_czona, @iUsu = rec_iusuario,
	@cod_cDescripcion=CA.cod_cDescripcion, @cod_nColor=IsNull(CA.cod_nColor,8421504), @cod_nColorLetra=IsNull(CA.cod_nColorLetra,0), @cod_nTipo=IsNull(CA.cod_nTipo,0), @cod_nLeeSonido=IsNull(CA.cod_nLeeSonido,0), @cod_cSonido=IsNull(CA.cod_cSonido,''),
	@iPrioridad = rec_iPrioridad, @iImportancia = IsNull(cue_iImportancia,0),
	@cName = (Case When CA.cod_nResuelve In(1,3) Then IsNull(usu_cNombre,Cast(rec_iUsuario As Varchar(30))) Else '' End),
	@cDesc = (Case When CA.cod_nResuelve In(0,3) Then Case When rec_idMap > 0 Then IsNull(map_zonas.zon_cdescripcion,IsNull(MZ.zon_cdescripcion,'')) Else IsNull(MZ.zon_cdescripcion,'') End Else Space(60) End ),
	@_Origen = (Case When rec_nOrigen=1 Then '%TI : Evento de Control%' When rec_nOrigen=2 And rec_iPuerto < 100 Then '%PG :%' When rec_nOrigen=2 Then '%IR :%' When rec_nOrigen=3 Then '%MAN : Evento Generado Manualmente%' When rec_nOrigen=6 And rec_iPuerto < 0 Then '%TR : Terminal Remota%' 
			When rec_nOrigen=6 Then '%SMS :% ' When rec_nOrigen=7 Then '%SCH : Evento Programado%' When rec_nOrigen=8 Then '%JOB : Tarea Programada%' Else '%SG : Evento Interno%' End ) +Space(1)+ Ltrim( (Case When rec_iPuerto<=0 Then '' Else Cast(rec_iPuerto As Char(5)) End ) ),
	@_Puerto=(Case When IsNull([rxt_iConexion],0) > 0 Then ( Select TCON.[ipc_cdescripcion] From [_Tablas].[dbo].[t_ip_con] TCON  WITH (NOLOCK) Where TCON.[ipc_idKey]=[rxt_iConexion] ) Else
	--(Case When rec_cAlarma = '_DI' Then IsNull(TIP.ipc_cdescripcion,IsNull(pue_cdescripcion,''))
	(Case When rec_cAlarma = '_DI' Then rec_cContenido
	 Else (Case When rec_nOrigen=2 And rec_iPuerto < 100 Then IsNull(pue_cdescripcion,'') 
		        When rec_nOrigen=2 Then IsNull(TIP.ipc_cdescripcion,'') Else '' End ) End) End),
	@rec_nEstado=rec_nEstado, @rec_cContenido=rec_cContenido, @rec_tFechaHora=rec_tFechaHora, @rec_tFechaRecepcion=rec_tFechaRecepcion, @rec_tFechaProceso=rec_tFechaProceso,
	@rec_iOperador=rec_iOperador, @rec_cTerminal=rec_cTerminal, @rec_idResolucion=rec_idResolucion, @rec_idReceptor=IsNull(rec_idReceptor,0), @rec_cCategorizacion=IsNull(rec_cCategorizacion,''), @rec_iNYR=IsNull(rec_iNYR,0), @rec_iTE=IsNull(rec_iTE,0),
	@rec_idMap=IsNull(rec_idMap,0), @rec_idFwd=IsNull(rec_idFwd,0), @rec_iMinutosEspera=rec_iMinutosEspera,	@rec_iPuerto=rec_iPuerto, @rec_idLoc=IsNull(rec_idLoc,0), @rec_isoFechaHora=Convert(Varchar, rec_tfechahora, 126),
	@rec_isoFechaProceso=Convert(Varchar, rec_tFechaProceso, 126), @rec_isoFechaRecepcion=Convert(Varchar, rec_tFechaRecepcion, 126), @cCierre=Left(Convert(CHARACTER, rec_tfechahora, 112),6),
	@ope_cNombre=IsNull(ope_cNombre,''), @ope_cLogin=IsNull(ope_cLogin,''), @rec_cDescripcion=IsNull(MR.rec_cDescripcion,''), @rec_cDll=IsNull(MR.rec_cDll,''), @rec_nTcpIp=IsNull(MR.rec_nTcpIp,0),
	@res_cCodigo=res_cCodigo, @res_cDescripcion=IsNull(res_cdescripcion,''), @res_nFalsaAlarma=res_nFalsaAlarma, @res_nEstado=res_nEstado, @cat_cCodigo=cat_cCodigo, @cat_cDescripcion=IsNull(cat_cdescripcion,'')
  	From p_Recepcion PR  WITH (NOLOCK)
	Left Outer Join [_Tablas].[dbo].[t_codigos_alarma] CA WITH (NOLOCK) ON rec_cAlarma = CA.cod_cCodigo
	Left Outer Join [m_CuentasXtraInfo] WITH (NOLOCK) On cue_iidCuenta = rec_iidcuenta
	Left Outer Join [_Tablas].[dbo].[t_puertos] WITH (NOLOCK) On [pue_npuerto]=rec_iPuerto
	Left Outer Join [p_RXtraInfo] On rxt_iRecId = PR.rec_iid
	Left Outer Join [_Tablas].[dbo].[t_ip_con] TIP WITH (NOLOCK) On [ipc_nport]=rec_iPuerto
	Left Outer Join [m_usuarios] WITH (NOLOCK) On rec_iusuario=usu_iid And usu_icodigo > 0 And rec_iidcuenta=usu_iidcuenta
	Left Outer Join [m_zonas] MZ WITH (NOLOCK) On rec_cZona=zon_cCodigo And rec_iidcuenta=zon_iidcuenta And MZ.zon_cCodigo<>'' 
	Left Outer Join ( Select zon_iidCuenta,zon_cCodigo,zon_cdescripcion From [m_zonas] WITH (NOLOCK) ) As map_zonas ON rec_idMap=map_zonas.zon_iidCuenta And rec_cZona=map_zonas.zon_cCodigo And map_zonas.zon_cCodigo<>''			
	Left Outer Join [_Sistema].[dbo].[s_operadores] OP WITH (NOLOCK) ON rec_iOperador = OP.ope_iid
	Left Outer Join [m_receptores_cab] MR WITH (NOLOCK) On MR.rec_iid = rec_idReceptor
	Left Outer Join [_Tablas].[dbo].[t_resoluciones] WITH (NOLOCK) On rec_idResolucion=res_ccodigo 
	Left Outer Join [_Tablas].[dbo].[t_categorizacion] WITH (NOLOCK) On rec_cCategorizacion=cat_ccodigo 
	Where PR.rec_iid = @idRec

If (@iPrioridad Is Null) Or (@iPrioridad = 0)
Begin
	Declare @nAlarma numeric(1,0)
	Set @nAlarma = (Select TOP 1 cod_nprioridad From _Tablas.dbo.t_codigos_alarma WITH (NOLOCK) Where cod_ccodigo=@cCodAlarma)
	If @nAlarma > 0
	Begin
		If @iImportancia = 0
			Set @iImportancia = 4

		Declare @cSuma char(2) = ''
		Select @cSuma = Cast(@nAlarma As Char(1)) + Cast(@iImportancia As Char(1))
		Set @iPrioridad = Cast(@cSuma As int)
	End
End

--Me fijo si hay nombre de Geocerca para despues pisar la descripcion de zona desnormalizada--
IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Me fijo si hay nombre de Geocerca para despues pisar la descripcion de zona desnormalizada--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

Declare @cGeoFenceName Varchar(60)
Select @cGeoFenceName = Left(Ltrim(IsNull(rxt_cGeoFenceName,'')),60) From p_RXtraInfo WITH (NOLOCK) Where rxt_iRecId = @idRec
	
If @cGeoFenceName <> ''
	Set @cDesc = @cGeoFenceName

/*
If NOT Exists ( Select [rec_iRecId] From [dbo].[p_Recepcion_D] Where [rec_iRecId]=@idRec )
	Insert Into [dbo].[p_Recepcion_D] ([rec_iRecId] ,[usu_iCodigo] ,[usu_cNombre] ,[zon_cCodigo] ,[zon_cDescripcion],[_Origen],[_Puerto])
	    Values (@idRec ,@iUsu ,@cName ,@cZon ,@cDesc, @_Origen, @_Puerto)
Else
	UPDATE [dbo].[p_Recepcion_D]
		Set [usu_iCodigo] = @iUsu
			,[usu_cNombre] = @cName
			,[zon_cCodigo] = @cZon
			,[zon_cDescripcion] = @cDesc
			,[_Origen] = @_Origen
			,[_Puerto] = @_Puerto
	Where [rec_iRecId] = @idRec
*/

--Actualizacion EngineStatus--
IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Actualizacion EngineStatus--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

If @cod_nTipo IN(5,6)	--5-Motor Encendido y 6-Motor Apagado
	Begin
		Declare @iEngineStatus Int = ( Case When @cod_nTipo = 5 Then 1 Else 0 End )

		--------------------------------------------------------------------------------------
		-- me fijo si tengo que iniciar o terminar un viaje
		--declare @GENEROVIAJESAUTOMATICO int = (select par_ivalor from _tablas..t_parametros where par_ccodigo = 'GENEROVIAJESAUTOMATICO ');
		--2022-05-16 : Pablo para que use 0 si no esta el parametro
		declare @GENEROVIAJESAUTOMATICO int = IsNull((select par_ivalor from _tablas..t_parametros With (NOLOCK) where par_ccodigo = 'GENEROVIAJESAUTOMATICO'),0);

		if (@GENEROVIAJESAUTOMATICO = 1)
		BEGIN
			declare @gps_iid int
			declare @gps_trawfechahora datetime
			Select @gps_iid = gps_iid, @gps_trawfechahora= gps_tRawfechahora From p_PosicionesGPS WITH (NOLOCK) Where gps_idRec=@idRec

			-- genero viaje
			if @iEngineStatus = 1
			BEGIN
				INSERT INTO _datos.[dbo].[m_tgviaje]
					([tgv_nombre]
					,[tgv_fechainicio]
					,[tgv_reciid_inicio]
					,[tgv_cueiid]
					,[tgv_estado]
				)
				 values ( 
					CONVERT(nvarchar, @gps_trawfechahora, 20)
					,@gps_trawfechahora
					,@gps_iid
					,@idCuenta
					,1
				)
			END
			ELSE
			-- termino viaje
			BEGIN
				update _datos.[dbo].[m_tgviaje] With (UPDLOCK)
					set tgv_estado = 2,
					tgv_nombre = tgv_nombre+' - '+CONVERT(nvarchar, @gps_trawfechahora, 20),
					tgv_fechafin = @gps_trawfechahora,
					tgv_reciid_fin = @gps_iid
					where tgv_estado = 1 and [tgv_cueiid] = @idCuenta
			END
		END
		--------------------------------------------------------------------------------------

		If NOT Exists ( Select [cue_iidCuenta] From [dbo].[m_CuentasXtraInfo] WITH (NOLOCK) Where [cue_iidCuenta]=@idCuenta )
			Insert Into [dbo].[m_CuentasXtraInfo] ([cue_iidCuenta],[cue_iLicenciasSP],[cue_cConfig],[cue_cCustom],[cue_iEngineStatus])
				Values (@idCuenta ,0 ,'' , '', @iEngineStatus)
		Else
			Update [dbo].[m_CuentasXtraInfo] With (UPDLOCK)
			   Set [cue_iEngineStatus] = @iEngineStatus
			 Where [cue_iidCuenta]=@idCuenta		
	
		--------------------------------------------------------------------------------------
		--Status de Motor
		If Not OBJECT_ID('p_GPSEngine') IS NULL
		Begin
			IF @cDebug = 'Si'
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | EngineStatus : '+Cast(@iEngineStatus As Char(1))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End

			If @iEngineStatus = 1	--Motor Encendido
				Begin
					INSERT INTO [_Datos].[dbo].[p_GPSEngine]
							   ([gen_iCta]
							   ,[gen_iStatus]
							   ,[gen_tFechaHoraOn]
							   ,[gen_iRecIdOn])
						 VALUES
							   (@idCuenta
							   ,1
							   ,@rec_tFechaHora
							   ,@idRec)
				End
			Else	--Motor Encendido
				Begin
					UPDATE [_Datos].[dbo].[p_GPSEngine] With (UPDLOCK)
					   SET [gen_iStatus] = 0
						  ,[gen_tFechaHoraOff] = @rec_tFechaHora
						  ,[gen_iRecIdOff] = @idRec
					 WHERE [gen_iCta] = @idCuenta And [gen_iStatus] = 1
				End
		End
	End

If @cod_nTipo IN(1,2)	--1-OPN	/ 2-CLO
Begin
	Declare @cOpnClo Char(1) = 'O'
	If @cod_nTipo = 1 
		Begin
			--Actualizacion FechaOPN--
			IF @cDebug = 'Si'
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Actualizacion FechaOPN--'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End

			MERGE INTO [dbo].[m_CuentasXtraInfo] AS TGT
			--USING ( Select rec_iidcuenta,rec_tFechaHora From [dbo].[p_Recepcion] Where [rec_iid] = @idRec ) AS SRC 
			USING ( Select @idCuenta As rec_iidcuenta, @rec_tFechaHora As rec_tFechaHora) AS SRC 
				ON TGT.[cue_iidCuenta] = SRC.[rec_iidcuenta]
			WHEN MATCHED THEN
				UPDATE SET
					TGT.[cue_dFechaOPN] = SRC.[rec_tFechaHora]
 			WHEN NOT MATCHED THEN 
				INSERT ([cue_iidCuenta],[cue_dFechaOPN])
				VALUES (SRC.[rec_iidcuenta],SRC.[rec_tFechaHora]);
		End
	Else
		Begin
			--Actualizacion FechaCLO--
			Set @cOpnClo = 'C'
			IF @cDebug = 'Si'
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Actualizacion FechaCLO--'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End

			MERGE INTO [dbo].[m_CuentasXtraInfo] AS TGT
			--USING ( Select rec_iidcuenta,rec_tFechaHora From [dbo].[p_Recepcion] Where [rec_iid] = @idRec ) AS SRC 
			USING ( Select @idCuenta As rec_iidcuenta, @rec_tFechaHora As rec_tFechaHora) AS SRC 
				ON TGT.[cue_iidCuenta] = SRC.[rec_iidcuenta]
			WHEN MATCHED THEN
				UPDATE SET
					TGT.[cue_dFechaCLO] = SRC.[rec_tFechaHora]
 			WHEN NOT MATCHED THEN 
				INSERT ([cue_iidCuenta],[cue_dFechaCLO])
				VALUES (SRC.[rec_iidcuenta],SRC.[rec_tFechaHora]);
		End
End

--Observaciones--	
IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Observaciones--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

Declare @cObs NVarchar(MAX)
Set @cObs = (Select Convert(NVarchar(MAX), rec_cObservaciones) From p_recepcion WITH (NOLOCK) Where rec_iid = @idRec)

--Si son de estados que no deben procesarse directamente los depuro--
If @rec_nEstado IN(3,5,6,7,8)
Begin
	IF @cDebug = 'Si'
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Si son de estados que no deben procesarse directamente los depuro-- | @rec_nEstado ('+Cast(@rec_nEstado As char(1))+')'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Set @iAlerta = 0
End

--Me fijo si son de GENERA ALERTA--
IF @cDebug = 'Si'
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Me fijo si son de GENERA ALERTA-- | @iAlerta ('+Cast(@iAlerta As char(1))+')'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
End

If @iAlerta = 0
	Begin
		--Creo el Historico Necesario
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Creo el Historico si es Necesario ('+@cCierre+')--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Declare	@nError Int = 0
		Declare @SynName NVarchar(128) = 'p_recepcion' + @cCierre;
		IF OBJECT_ID(@SynName, 'SN') Is NULL And OBJECT_ID(@SynName, 'U') Is NULL 
			Execute [SGSP_CreoPRDepurado] @cCierre, @nError = @nError OUTPUT

		If @nError <> -9	--No pudo crear historico
			Begin		
				--Verifico que no este guardado
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Verifico que no este guardado--'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
		
				Declare @cSQL nVarchar(MAX)
				Declare @idTop	Int = 0
				Set @cSQL = 'Select Top 1 @idTop=rec_iid From [dbo].[p_recepcion' +  @cCierre  +  '] WITH (NOLOCK) Where [rec_iId]='+Cast(@idRec As Varchar(10))

				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Verifico que no este guardado-- | cSQL => '+@cSQL+' | @idRec => '+ Cast(@idRec As varchar(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
				
				/*
				BEGIN TRY
					INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
													Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
				END TRY
				BEGIN CATCH
				END CATCH;		
				*/

				Declare @DynamicSqlParams NVarchar(MAX)
				
				Set @DynamicSqlParams =  '@idRec Int, @idTop int OUTPUT';
				EXECUTE sp_executesql @cSQL	,@DynamicSqlParams ,@idRec=@idRec ,@idTop = @idTop OUTPUT
				
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Verifico que no este guardado-- | @idTop => '+ Cast(@idTop As varchar(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
				/*
				BEGIN TRY
					INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
													Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
				END TRY
				BEGIN CATCH
				END CATCH;		
				*/

				if @idTop > 0
					Begin
						IF @cDebug = 'Si'
						Begin
							Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Verifico que no este guardado-- | Ya existe en depurada | @idTop => '+ Cast(@idTop As varchar(10))
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
						End

						/*
						BEGIN TRY
							INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
															Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
						END TRY
						BEGIN CATCH
						END CATCH;		
						*/
					End
				Else
					Begin
						Set @cSQL = 'INSERT INTO [dbo].[p_recepcion' +  @cCierre  + '] ([rec_iid], [rec_iidcuenta], [rec_calarma], [rec_czona], [rec_iusuario], [rec_tfechahora], [rec_nestado], [rec_cContenido], [rec_tFechaProceso], [rec_ioperador], [rec_cObservaciones], [rec_cTerminal], [rec_idResolucion], [rec_idReceptor], [rec_cCategorizacion], [rec_iNYR], [rec_iTE], [rec_tFechaRecepcion], [rec_nOrigen], [rec_idMap], [rec_idFwd], [rec_iMinutosEspera], [rec_iPuerto], [rec_idLoc], [rec_iPrioridad], [usuario_iCodigo], [usuario_cNombre], [zonas_cCodigo], [zonas_cDescripcion], [_Origen], [_Puerto] )'
						Set @cSQL = @cSQL + ' VALUES (@idRec,@idCuenta,@cCodAlarma,@cZon,@iUsu,@rec_isoFechaHora,@rec_nEstado,@rec_cContenido,@rec_isoFechaProceso,@rec_iOperador,@cObs,@rec_cTerminal,@rec_idResolucion,@rec_idReceptor,@rec_cCategorizacion,@rec_iNYR,@rec_iTE,@rec_isoFechaRecepcion,@rec_nOrigen,@rec_idMap,@rec_idFwd,@rec_iMinutosEspera,@rec_iPuerto,@rec_idLoc,@iPrioridad,@iUsu,@cName,@cZon,@cDesc,@_Origen,@_Puerto)'

						Set @DynamicSqlParams = '@idRec Int,@idCuenta Int,@cCodAlarma Char(3),@cZon Char(10),@iUsu Int,@rec_isoFechaHora VarChar(30),@rec_nEstado Numeric(1,0),@rec_cContenido VarChar(50),@rec_isoFechaProceso nVarChar(30),@rec_iOperador Int,@cObs nVarChar(Max),@rec_cTerminal Char(3),@rec_idResolucion nChar(3),@rec_idReceptor Int,@rec_cCategorizacion Char(3),@rec_iNYR Int,@rec_iTE Int,@rec_isoFechaRecepcion VarChar(30),@rec_nOrigen Numeric(1,0),@rec_idMap Int,@rec_idFwd Int,@rec_iMinutosEspera Int,@rec_iPuerto Int,@rec_idLoc Int,@iPrioridad Int,@cName VarChar(30),@cDesc nVarChar(60),@_Origen nVarChar(100),@_Puerto nVarChar(100)'

						IF @cDebug = 'Si'
						Begin
							Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
							Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Verifico que no este guardado-- | No existe en depurada | @cSQL => '+ @cSQL 
							RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
						End
						
						/*
						BEGIN TRY
							INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
															Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
						END TRY
						BEGIN CATCH
						END CATCH;								
						*/
						/*No muestra el valor que inserta
						Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Verifico que no este guardado-- | No existe en depurada | @DynamicSqlParams => ' + @DynamicSqlParams
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
						*/
						Execute sp_executesql @cSQL, @DynamicSqlParams, @idRec=@idRec, @idCuenta=@idCuenta, @cCodAlarma=@cCodAlarma, @cZon=@cZon ,@iUsu=@iUsu, @rec_isoFechaHora=@rec_isoFechaHora, @rec_nEstado=@rec_nEstado, @rec_cContenido=@rec_cContenido, @rec_isoFechaProceso=@rec_isoFechaProceso, @rec_iOperador=@rec_iOperador, @cObs=@cObs, @rec_cTerminal=@rec_cTerminal, @rec_idResolucion=@rec_idResolucion, @rec_idReceptor=@rec_idReceptor, @rec_cCategorizacion=@rec_cCategorizacion, @rec_iNYR=@rec_iNYR, @rec_iTE=@rec_iTE, @rec_isoFechaRecepcion=@rec_isoFechaRecepcion, @rec_nOrigen=@rec_nOrigen, @rec_idMap=@rec_idMap, @rec_idFwd=@rec_idFwd, @rec_iMinutosEspera=@rec_iMinutosEspera, @rec_iPuerto=@rec_iPuerto, @rec_idLoc=@rec_idLoc, @iPrioridad=@iPrioridad, @cName=@cName, @cDesc=@cDesc, @_Origen=@_Origen, @_Puerto=@_Puerto

					End
			End

		--Inserto en EventosTimeLine--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Inserto en EventosTimeLine--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Insert Into [dbo].[EventosTimeLine]
				([etl_iRecID]
				,[etl_iCuenta]
				,[etl_tFechaHora]
				,[etl_cAccion]
				,[etl_cObservacion]
				,[etl_cOwner]
				,[etl_iOperador])
			Values
				(@idRec
				,@idCuenta
				,@rec_tFechaHora
				,'Inicio'
				,'%Evento recibido en la Central%'
				,Rtrim(@_Origen) +' '+Rtrim(@_Puerto)
				,@rec_iOperador)

	    Declare @etl_cObservacion nVarChar(Max)
		Select @etl_cObservacion=(Case When est_nEstado=1 And GetDate() BetWeen est_dfechadesde And est_dfechahasta Then '%Evento autoproesado por Cuenta en Prueba%' When est_nEstado=2 Then '%Evento autoproesado por Cuenta No Habilitada%' 
					When est_nEstado=3 And EI.est_czona=@cZon Then '%Evento autoproesado por Cuenta en Prueba x Zonas%' When @rec_nEstado=5 Then '%Evento autoproesado por No Genera Alerta%' Else '' End )
			From m_estado_cuenta_cab EC WITH (NOLOCK)
			Left Outer Join m_estado_cuenta_item EI On EC.est_iidcuenta = EI.est_iidcuenta
		Where EC.est_iidcuenta = @idCuenta

		Insert Into [dbo].[EventosTimeLine]
				([etl_iRecID]
				,[etl_iCuenta]
				,[etl_tFechaHora]
				,[etl_cAccion]
				,[etl_cObservacion]
				,[etl_cOwner]
				,[etl_iOperador])
			Values
				(@idRec
				,@idCuenta
				,@rec_tFechaHora
				,'Procesamiento'
				,@etl_cObservacion
				,Rtrim(@_Origen) +' '+Rtrim(@_Puerto)
				,@rec_iOperador)
		--

		--Si es TST lo elimino de pRecepcion--
		If @cCodAlarma='TST'
		Begin
			IF @cDebug = 'Si'
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Si es TST lo elimino de pRecepcion--'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End

			Delete From [dbo].[p_recepcion] Where [rec_iid] = @idRec
		End
	End
Else
	Begin		
		--RXLog--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --RXLog--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Declare @rxl_cLog nVarChar(MAX)
		Declare @rxl_cEvento nVarChar(10)

		Select @rxl_cLog=rxl_cLog, @rxl_cEvento=rxl_cEvento From p_RXLog WITH (NOLOCK) Where rxl_iRecId=@idRec
		
		--Si hay rxl_cEvento busco la zona CIDExtendida--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Si hay rxl_cEvento busco la zona CIDExtendida--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		
		If @rxl_cEvento > ''
		Begin
			Declare @cDescExt nVarChar(60)
			Select 	@cDescExt = (Case When CA.cod_nResuelve In(0,3) Then IsNull(MZ.zon_cdescripcion,'') Else  Space(60) End )
				From p_RXLog RX WITH (NOLOCK)
				Left Outer Join m_zonas MZ WITH (NOLOCK) On RX.rxl_cEvento=MZ.zon_cCodigo And zon_iidcuenta=@idCuenta
				Left Outer Join _Tablas.dbo.t_codigos_alarma CA WITH (NOLOCK) ON MZ.zon_codigoalarma = CA.cod_cCodigo
			Where rxl_iRecId=@idRec

			If @cDescExt > ''
				Set @cDesc = @cDescExt
		End

		--VideoLinkParser--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --VideoLinkParser--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Declare @cSaveImageRX  nVarChar(200)
		Declare @cLinkDSS      nVarChar(200)
		Declare @cRemoteHostIP nVarChar(20)

		If (Select par_ivalor FROM _Tablas.dbo.t_parametros WITH (NOLOCK) WHERE par_cCodigo='UTILIZAVI') = 1
			Begin
				Declare @cData nVarChar(200)
				Declare @cLink nVarChar(200)
				Set @cSaveImageRX = ''

				Set @cZon = Rtrim(@cZon)
				--Me fijo si se configuro video para la alarma--
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Me fijo si se configuro video para la alarma-- | CodAlarma : ' + @cCodAlarma +' | Zona : ' + @cZon +'| idCuenta : '+ Cast(@idCuenta As varchar(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

				Select @cData = cuv_clink, @cLinkDSS = cuv_cLinkDSS From m_cuentas_video WITH (NOLOCK)
					Where ( CHARINDEX(@cCodAlarma, cuv_meventos) > 0 Or cuv_iTodosLosEventos = 1 )
						And cuv_iidCuenta = @idCuenta

				If @cData <>''
					Set @cSaveImageRX = @cData
				
				IF EXISTS (SELECT * FROM _Datos.dbo.m_cuentas_video_links with (NOLOCK) Where (cvl_calarma = @cCodAlarma OR cuv_iTodosLosEventos = 1) And cvl_czona = @cZon And cvl_iidCuenta  = @idCuenta)
				Begin
					--Busco por Alarma-Zona
					Select @cLink = cvl_clink From _Datos.dbo.m_cuentas_video_links WITH (NOLOCK)
						Where ( ( cvl_calarma = @cCodAlarma And cvl_czona = @cZon ) Or cuv_iTodosLosEventos = 1 )
							And cvl_iidCuenta  = @idCuenta

					If @cLink <>''	
						Set @cSaveImageRX = @cLink
				End
				
				--Veo si es D-Guard--
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Veo si es D-Guard--'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

				If Upper(Left(@cSaveImageRX,4))='DGR:'	
					Set @cSaveImageRX = 'http://'+Rtrim(SubString(@cLink,5,195))
				
				--Tengo que devolver el link de video que tiene configurado para poder usarlo en DSSVideoLauncher-- 
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Tengo que devolver el link de video que tiene configurado para poder usarlo en DSSVideoLauncher-- | '+@cSaveImageRX
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

				Select Top 1 @cRemoteHostIP = ( Case When ipc_cremotehostip <> '' Then ipc_cremotehostip Else '(nada)' End )
					From _Tablas.dbo.t_ip_con WITH (NOLOCK)
				 Where ipc_nport=@rec_iPuerto
					And Left(@cSaveImageRX,3) In ( Select Left(tvi_cdescripcion,3) FROM _Tablas.dbo.t_VideoID WITH (NOLOCK) Where tvi_nLaunch=1)

				--Select @cRemoteHostIP = ( Case When ipc_cremotehostip <> '' Then ipc_cremotehostip Else '(nada)' End )
				--		From p_Recepcion
				--		Inner Join _Tablas.dbo.t_ip_con WITH (NOLOCK) On ipc_nport = rec_iPuerto
				--		And Left(@cSaveImageRX,3) In ( Select Left(tvi_cdescripcion,3) FROM _Tablas.dbo.t_VideoID Where tvi_nLaunch=1)
				--Where rec_iid = @idRec

			End

		--Campos de m_cuentas--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Campos de m_cuentas--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Declare @cue_cLinea Char(3)
		Declare @cue_nCuenta Char(10)
		Declare @cue_cNombre nVarChar(100)
		Declare @cue_cCalle nVarChar(100)
		Declare @cue_cLocalidad nVarChar(100)
		Declare @cue_cProvincia Char(3)
		Declare @cue_cClave nVarChar(100)
		Declare @cue_cPermiso nVarChar(100)
		Declare @cue_nParticion Int
		Declare @cue_ctelefono nVarChar(100)
		Declare @cue_cUbicacion nVarChar(MAX)
		Declare @cue_cLatLng nVarChar(30) 
		Declare @cue_cIMEI nVarChar(120)
		--Descripcion Servicios Patrulla | Icon Servicios Patrulla | Tipo Cuenta--
		Declare @tsp_cDescripcion nVarChar(100)
		Declare @tsp_cPathIcon nVarChar(100)
		Declare @tip_nTipo Int
		Declare @tip_nCondicion Numeric(1,0)

		Select @cue_cLinea=cue_cLinea, @cue_nCuenta=cue_nCuenta, @cue_cNombre=cue_cNombre, @cue_cCalle=cue_cCalle, @cue_cLocalidad=cue_cLocalidad, @cue_cProvincia=cue_cProvincia,
			@cue_cClave=[cue_cClave], @cue_cPermiso=cue_cPermiso, @cue_nParticion=cue_nParticion, @cue_ctelefono=cue_ctelefono, @cue_cUbicacion=cue_cUbicacion, @cue_cLatLng=cue_cLatLng,
			@cue_cIMEI=[cue_cIMEI], @tsp_cDescripcion = IsNull(tsp_cdescripcion,''), @tsp_cPathIcon = IsNull(tsp_cpathicon,''), @tip_nTipo=IsNull(tip_nTipo,0), @tip_nCondicion=IsNull(tip_nCondicion,0)
			From m_cuentas WITH (NOLOCK)
			Left Outer Join [_Tablas].[dbo].[t_tipos] WITH (NOLOCK) On [tip_ccodigo]=[cue_ctipo]
			Left Outer Join [_Tablas].[dbo].[t_ServiciosPatrulla] WITH (NOLOCK) On [tsp_ccodigo]=[tip_cservicio]
			Where cue_iid = @idCuenta

		If @cue_cLatLng Is Null
			Set @cue_cLatLng = '0.0,0.0'

		--Cuenta Madre de Particion--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Cuenta Madre de Particion--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Declare @madre_cLinea Char(3)
		Declare @madre_nCuenta Char(10)
		Declare @madre_cNombre nVarChar(100)
		Declare @_ZonaParticion Char(2)

		Select @madre_cLinea=cue_clinea, @madre_nCuenta=cue_ncuenta, @madre_cNombre=cue_cnombre, @_ZonaParticion=SUBSTRING(zon_ccodigo,4,2)
			From m_cuentas WITH (NOLOCK)
		Inner Join m_zonas On zon_iidcuenta=cue_iid 
			Where cue_iid = @cue_nParticion
			And zon_cdealer = @cue_cLinea
			And zon_ccuenta = @cue_nCuenta

		--Resto de campos de Zonas--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Resto de campos de Zonas--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Declare @zon_cImagen nVarChar(100)
		Declare @zon_cAlarmaAGenerar Char(3)
		Declare @zon_cCodigoRestauracion Char(20)
		Declare @zon_cDealer Char(3)
		Declare @zon_cCuenta Char(10)
		Declare @zon_cListaEmergencia Char(3)
		Declare @zon_CodigoAlarma Char(3)
		Declare @zon_mObservacion nVarChar(MAX)
		Declare @zon_nAutoProcesa Numeric(1, 0)
		Declare @zon_nMinutosRestauracion Numeric(3, 0)
		Declare @zon_nMostrar Numeric(1, 0)

		If @nResuelve IN(0,3)		--Significa que debe mostrar descripcion de zona
			Begin
				--Busco Descripcion de la zona x si MAPearon / LOCearon-- 
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Busco Descripcion de la zona x si MAPearon / LOCearon--'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

				If @rec_idMap > 0 		
					Select Top 1 @zon_cImagen=zon_cImagen, @zon_cAlarmaAGenerar=zon_cAlarmaAGenerar, @zon_cCodigoRestauracion=zon_cCodigoRestauracion, @zon_cDealer=zon_cDealer,
						@zon_cCuenta=zon_cCuenta, @zon_cListaEmergencia=zon_cListaEmergencia, @zon_CodigoAlarma=zon_CodigoAlarma, @zon_mObservacion=zon_mObservacion,
						@zon_nAutoProcesa=zon_nAutoProcesa, @zon_nMinutosRestauracion=zon_nMinutosRestauracion, @zon_nMostrar=zon_nMostrar
					From m_zonas ZO WITH (NOLOCK) 
					Inner Join p_RXLog RX On RX.rxl_cEvento=ZO.zon_cCodigo
					Where ZO.zon_iidcuenta=@rec_idMap And RX.rxl_iRecId = @idRec
						--From p_Recepcion 
						--Inner Join p_RXLog RX On RX.rxl_iRecId = rec_iid 
						--Inner Join m_zonas ZO WITH (NOLOCK) ON RX.rxl_cEvento=ZO.zon_cCodigo And ZO.zon_iidcuenta=rec_idMap
					--Where RX.rxl_cEvento<>'' And ZO.zon_codigoalarma = rec_calarma 
					--And rec_iid = @idRec
				Else
					If @rec_idLoc > 0 	
						Select Top 1 @zon_cImagen=zon_cImagen, @zon_cAlarmaAGenerar=zon_cAlarmaAGenerar, @zon_cCodigoRestauracion=zon_cCodigoRestauracion, @zon_cDealer=zon_cDealer,
							@zon_cCuenta=zon_cCuenta, @zon_cListaEmergencia=zon_cListaEmergencia, @zon_CodigoAlarma=zon_CodigoAlarma, @zon_mObservacion=zon_mObservacion,
							@zon_nAutoProcesa=zon_nAutoProcesa, @zon_nMinutosRestauracion=zon_nMinutosRestauracion, @zon_nMostrar=zon_nMostrar
						From m_zonas ZO WITH (NOLOCK) 
						Where ZO.zon_iidcuenta=@rec_idLoc And ZO.zon_cCodigo<>'' And ZO.zon_cCodigo=@cZon 
							--From p_Recepcion 
							--Inner Join p_RXLog RX On RX.rxl_iRecId = rec_iid 
							--Inner Join m_zonas ZO WITH (NOLOCK) ON rec_idLoc = ZO.zon_iidCuenta And rec_cZona = ZO.zon_cCodigo And ZO.zon_cCodigo<>'' 
							--And rec_iid = @idRec
					Else
						If @rec_idMap = 0 Or @rec_idMap Is Null
							Select Top 1 @zon_cImagen=zon_cImagen, @zon_cAlarmaAGenerar=zon_cAlarmaAGenerar, @zon_cCodigoRestauracion=zon_cCodigoRestauracion, @zon_cDealer=zon_cDealer,
								@zon_cCuenta=zon_cCuenta, @zon_cListaEmergencia=zon_cListaEmergencia, @zon_CodigoAlarma=zon_CodigoAlarma, @zon_mObservacion=zon_mObservacion,
								@zon_nAutoProcesa=zon_nAutoProcesa, @zon_nMinutosRestauracion=zon_nMinutosRestauracion, @zon_nMostrar=zon_nMostrar
							From m_zonas ZO WITH (NOLOCK) 
							  Where ZO.zon_iidcuenta=@idCuenta And ZO.zon_cCodigo=@cZon 
							--Where ZO.zon_iidcuenta=@idCuenta And ( ZO.zon_codigoalarma=@cCodAlarma Or ZO.zon_cCodigo=@cZon )
								--From p_Recepcion 
								--Inner Join m_zonas ZO WITH (NOLOCK) ON ZO.zon_codigoalarma = rec_calarma  And ZO.zon_iidcuenta=rec_iidcuenta
								--Where rec_iid = @idRec
			End

		--Campos de RXImg--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Campos de RXImg--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Declare @rxi_cImg nVarChar(200)
		Declare @rxi_cCarpeta nVarChar(200)
		Declare @rxi_nEstado Numeric(1,0)
		Declare @rxi_cTipo nVarChar(20)
		Declare @rxi_cConfig nVarChar(MAX)

		Select @rxi_cImg=rxi_cImg, @rxi_cCarpeta=rxi_cCarpeta, @rxi_nEstado=rxi_nEstado, @rxi_cTipo=rxi_cTipo, @rxi_cConfig=rxi_cConfig
			From p_RXImg WITH (NOLOCK) Where rxi_iRecId=@idRec

		--Latitud | Longitud GPS--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Latitud | Longitud GPS--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		
		Declare @gps_rLatitud Real
		Declare @gps_rLongitud Real
		Select @gps_rLatitud=gps_rLatitud, @gps_rLongitud=gps_rLongitud From p_PosicionesGPS WITH (NOLOCK) Where gps_idRec=@idRec
		
		--Ultima posicion para moviles por si no llego Lat/Lng
		If @gps_rLatitud Is Null And @tip_nCondicion=1 And @cue_cIMEI!=''
			Select @gps_rLatitud=gps_rLatitud, @gps_rLongitud=gps_rLongitud From p_Gps Where [gps_cIMEI]=@cue_cIMEI

		--Latitud | Longitud Seguimiento--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Latitud | Longitud Seguimiento--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Declare @sp_rLatitud Real=0
		Declare @sp_rLongitud Real=0
		If Not OBJECT_ID('p_posicionesSP') IS NULL
			Select @sp_rLatitud=sp_rLatitud, @sp_rLongitud=sp_rLongitud From p_PosicionesSP WITH (NOLOCK) Where sp_reciid=@idRec
	
		--Contador FA--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Contador FA--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Declare @sta_nContadorFA Int

		Select @sta_nContadorFA=sta_ncontadorfa From m_status WITH (NOLOCK) Where sta_iidcuenta=@idCuenta

		--Margen FA--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Margen FA--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Declare @fal_nMargen Numeric(3,0)

		Select @fal_nMargen=fal_nmargen From m_falsas WITH (NOLOCK) Where fal_iidcuenta=@idCuenta

		--Campos Calculados--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Campos Calculados--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Declare @_Morosidad Numeric(1,0)
		Declare @_NotaTemporal Numeric(1,0)
		Declare @_SituacionCuenta nVarChar(100)
		Declare @_EventoEnPruebaPorZona Numeric(1,0)
		Declare @_WorkFlowStatus nVarChar(MAX)
		Declare @_idOrganizacion Int	--(sale de la llamada a un Store que hace Rodrigo. El se fija si esa cuenta tiene activada Monitoreo Dealer y si hay un operador conectado)

		If ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='UTILIZAFC' ) = 1	--Usa MoneyGuard
			Begin
				Declare @nSituacion Numeric(1,0)
				Set @nSituacion = (Select Top 1 cli_nsituacion From m_clientes_fc WITH (NOLOCK)
								Inner Join m_relacion_cliente_cuentas_fc WITH (NOLOCK) On cli_icodigo_ID = rel_icliente
								Where cli_nsituacion = 2 And 
								( ( rel_icuenta= @idCuenta And rel_cdealer=@cue_cLinea ) Or
									( rel_icuenta=-1 And rel_cdealer=@cue_cLinea ) ) )
			
				If @nSituacion > 1		--	1.Normal | 2.Moroso	| 3.En litigio | 4.Incobrable
					Set @_Morosidad = 1
				Else
					Set @_Morosidad = 0
			End

		Declare @mNotaTemporal nVarChar(MAX)
		Select @mNotaTemporal=not_mnotatemporal From m_notas WITH (NOLOCK) Where not_iidcuenta=@idCuenta And Convert(Varchar, GetDate(), 126) Between Convert(Varchar, not_dtemporaldesde, 126) And Convert(Varchar, not_dtemporalhasta, 126)
		If @mNotaTemporal <> ''
			Set @_NotaTemporal = 1
		Else
			Set @_NotaTemporal = 0

		Select @_SituacionCuenta=(Case When est_nEstado=1 And GetDate() BetWeen est_dfechadesde And est_dfechahasta Then 'Prueba' When est_nEstado=2 Then 'No Habilitado' 
							When est_nEstado=3 Then 'Prueba x Zonas' Else 'Habilitado' End )
			From m_estado_cuenta_cab WITH (NOLOCK) Where est_iidcuenta = @idCuenta

		Select @_EventoEnPruebaPorZona=(Case When EC.est_nEstado=3 Then 1  Else 0 End )
			From m_estado_cuenta_cab EC WITH (NOLOCK)
				Inner Join m_estado_cuenta_item EI On EC.est_iidcuenta=EI.est_iidcuenta
				Where EC.est_iidcuenta = @idCuenta And EI.est_czona=@cZon

		/*
		Execute [_Desktop].[dbo].[AssignOrganizationByRecId] @rec_iid=@idRec, @clinea=@cue_cLinea, @organizationId=@_idOrganizacion OUTPUT

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Execute [_Desktop].[dbo].[AssignOrganizationByRecId]-- | @idRec = '+ Cast( @idRec As VarChar(10)) +' | @cue_cLinea = '+ @cue_cLinea +' | OUTPUT @_idOrganizacion = '+Cast(@_idOrganizacion As VarChar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		*/
	
		-- me fijo si hay una organizacion activa para el dealer
		SET DATEFIRST 7;
		Declare @mydate datetime = getdate()
		Declare @mytime varchar(5) = convert(varchar(5), @mydate, 108)
		Declare @dow int = datepart(weekday,@mydate)

		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Busca si hay una organizacion activa para el dealer-- | @cue_cLinea = '+ @cue_cLinea + ' | @mytime = ' + Convert(VarChar, @mytime,120)  +' | @dow = '+Cast(@dow As VarChar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End

		Select @_idOrganizacion = IsNull(tmd_iorganizacion,0) 
			From [_Tablas].[dbo].[t_monitoreo_dealer] WITH (NOLOCK)
			Where tmd_clinea =  @cue_cLinea 
				And tmd_diasemana = @dow
				And tmd_estado = 1
				And @mytime Between tmd_horadesde And tmd_horahasta

		if @_idOrganizacion Is NUll
			Set @_idOrganizacion = 0

		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Busca si hay una organizacion activa para el dealer-- | @_idOrganizacion = '+Cast(@_idOrganizacion As VarChar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Busca AutoAsignacionVC-- | Execute [SGSP_VerificaAutoAsignaEventoAVC] '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		
		Declare @iTagged Int = 0
		Execute [SGSP_VerificaAutoAsignaEventoAVC] @cCodAlarma=@cCodAlarma, @iRecId=@idRec, @idCuenta=@idCuenta, @iTagged=@iTagged OUTPUT

		If @iTagged=1 And @nCheck = 1
		Begin
			IF @cDebug = 'Si'
			Begin
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Marco en EventosPendientes-- | el Id Rec => '+ Rtrim(Cast(@idRec As Varchar(10)))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End
		End
		
		If NOT Exists ( Select [rec_iid] From [dbo].[EventosPendientes] WITH (NOLOCK) Where [rec_iid]=@idRec )
			Begin
				--Analizar si es un evento para OperadorVirtual--
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Analizar si es un evento para OperadorVirtual--'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

				Declare @ovc_idKey Int = NULL,
						@ovc_cEventType VarChar(100) = ''

				Declare @nProceso Int = 0,
						@insertET Int = 0 --No

				Declare @ovc_cDescripcion VarChar(100) = ''

				Select Top (1) @ovc_idKey=c.ovc_idKey, @ovc_cDescripcion=ovc_cDescripcion, @ovc_cEventType=ovc_cEventType
					From [_Datos].[dbo].[OperadorVirtualConfig] c
				Where c.ovc_iStatus = 1
					And EXISTS ( Select 1
								From  [_Datos].[dbo].[OperadorVirtualConfigDealers] d
								Where d.ovd_iOperadorVirtualConfigId = c.ovc_idKey And d.ovd_cDealer = @cue_cLinea )
					And EXISTS ( Select 1
								From  [_Datos].[dbo].[OperadorVirtualConfigEventos] e
								Where e.ove_iOperadorVirtualConfigId = c.ovc_idKey AND e.ove_cEvento = @cCodAlarma )
				Order By c.ovc_idKey; 

				If @ovc_idKey Is Not NULL And @ovc_idKey > 0
				Begin
					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Tiene configurado OperadorVirtual-- | IdKey => '+ Rtrim(Cast(@ovc_idKey As Varchar(10))) + ' - ' + @ovc_cDescripcion
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					Set @rec_nEstado=2	--Evento en Espera
					Set @rec_iMinutosEspera = 999  --Espera ilimitada

					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Se pasa evento a espera y se inserta registro en [SofIA_VoiceCallEvents]--'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					INSERT INTO [_Datos].[dbo].[SofIA_VoiceCallEvents]
					(
						sve_iRecId
						, sve_iOVConfigId
						, sve_cConfigDescripcion
						, sve_cEventType
						, sve_cDealer
						, sve_cAlarma
						, sve_tEventDate
						, sve_iStatus   
					)
					VALUES
					(
						@idRec
						, @ovc_idKey
						, @ovc_cDescripcion
						, @ovc_cEventType
						, @cue_cLinea
						, @cCodAlarma
						, @rec_tFechaHora
						, 0                 -- 0 = Pendiente | 1 = Procesado | 2 = Error
					);

					Set @insertET=1	--Si
					Set @nProceso = 61 	-- Pendiente - Operador Virtual
				End
				
				--Inserto en EventosPendiente--
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Inserto en EventosPendiente--'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

				Insert Into [dbo].[EventosPendientes]
					([rec_iid]
					,[rec_iidCuenta]
					,[rec_cAlarma]
					,[rec_cZona]
					,[rec_iUsuario]
					,[rec_cObservaciones]
					,[rec_iPrioridad]
					,[zon_cDescripcion]
					,[zon_cCodigo]
					,[usu_cNombre]
					,[tsp_cDescripcion]
					,[tsp_cPathIcon]
					,[tip_nTipo]
					,[rec_nEstado]
					,[rec_nOrigen]
					,[rec_cContenido]
					,[rec_tFechaHora]
					,[rec_tFechaRecepcion]
					,[rec_tFechaProceso]
					,[rec_iOperador]
					,[rec_cTerminal]
					,[rec_idResolucion]
					,[rec_idReceptor]
					,[rec_cCategorizacion]
					,[rec_iNYR]
					,[rec_iTE]
					,[rec_idMap]
					,[rec_idFwd]
					,[rec_iMinutosEspera]
					,[rec_iPuerto]
					,[rec_idLoc]
					,[rec_isoFechaHora]
					,[rec_isoFechaProceso]
					,[rec_isoFechaRecepcion]
					,[_Origen]
					,[_Puerto]
					,[rxl_cLog]
					,[rxl_cEvento]
					,[cLinkVideo]
					,[cvl_cLinkDSS]
					,[cRemoteHostIP]
					,[cue_cLinea]
					,[cue_nCuenta]
					,[cue_cNombre]
					,[cue_cCalle]
					,[cue_cLocalidad]
					,[cue_cProvincia]
					,[cue_cClave]
					,[cue_cPermiso]
					,[cue_nParticion]
					,[cue_ctelefono]
					,[cue_cUbicacion]
					,[madre_cLinea]
					,[madre_nCuenta]
					,[madre_cNombre]
					,[zon_cImagen]
					,[zon_cAlarmaAGenerar]
					,[zon_cCodigoRestauracion]
					,[zon_cDealer]
					,[zon_cCuenta]
					,[zon_cListaEmergencia]
					,[zon_CodigoAlarma]
					,[zon_mObservacion]
					,[zon_nAutoProcesa]
					,[zon_nMinutosRestauracion]
					,[zon_nMostrar]
					,[cod_cDescripcion]
					,[cod_nColor]
					,[cod_nColorLetra]
					,[cod_nTipo]
					,[cod_nLeeSonido]
					,[cod_cSonido]
					,[ope_cNombre]
					,[ope_cLogin]
					,[rec_cDescripcion]
					,[rec_cDll]
					,[rec_nTcpIp]
					,[rxi_cImg]
					,[rxi_cCarpeta]
					,[rxi_nEstado]
					,[rxi_cTipo]
					,[rxi_cConfig]
					,[res_cCodigo]
					,[res_cDescripcion]
					,[res_nFalsaAlarma]
					,[res_nEstado]
					,[cat_cCodigo]
					,[cat_cDescripcion]
					,[gps_rLatitud]
					,[gps_rLongitud]
					,[sta_nContadorFA]
					,[fal_nMargen]
					,[_Morosidad]
					,[_NotaTemporal]
					,[_SituacionCuenta]
					,[_EventoEnPruebaPorZona]
					,[_WorkFlowStatus]
					,[_idOrganizacion]
					,[cue_cLatLng]
					,[sp_rLatitud]
					,[sp_rLongitud]
					,[tip_nCondicion]
					,[_ZonaParticion]
					,[_Tagged]
					,[pro_nProceso]
					)
					Values
					(@idRec
					,@idCuenta
					,@cCodAlarma
					,@cZon
					,@iUsu
					,@cObs
					,@iPrioridad
					,@cDesc
					,@cZon
					,@cName
					,@tsp_cDescripcion
					,@tsp_cPathIcon
					,IsNull(@tip_nTipo,0)
					,@rec_nEstado
					,@rec_nOrigen
					,@rec_cContenido
					,@rec_tFechaHora
					,@rec_tFechaRecepcion
					,@rec_tFechaProceso
					,@rec_iOperador
					,@rec_cTerminal
					,@rec_idResolucion
					,@rec_idReceptor
					,@rec_cCategorizacion
					,@rec_iNYR
					,@rec_iTE
					,@rec_idMap
					,@rec_idFwd
					,@rec_iMinutosEspera
					,@rec_iPuerto
					,@rec_idLoc
					,@rec_isoFechaHora
					,@rec_isoFechaProceso
					,@rec_isoFechaRecepcion
					,@_Origen
					,@_Puerto
					,@rxl_cLog
					,@rxl_cEvento
					,@cSaveImageRX
					,@cLinkDSS
					,@cRemoteHostIP
					,@cue_cLinea
					,@cue_nCuenta
					,@cue_cNombre
					,@cue_cCalle
					,@cue_cLocalidad
					,@cue_cProvincia
					,@cue_cClave
					,@cue_cPermiso
					,@cue_nParticion
					,@cue_ctelefono
					,@cue_cUbicacion
					,@madre_cLinea
					,@madre_nCuenta
					,@madre_cNombre
					,@zon_cImagen
					,@zon_cAlarmaAGenerar
					,@zon_cCodigoRestauracion
					,@zon_cDealer
					,@zon_cCuenta
					,@zon_cListaEmergencia
					,@zon_CodigoAlarma
					,@zon_mObservacion
					,IsNull(@zon_nAutoProcesa,0)
					,IsNull(@zon_nMinutosRestauracion,0)
					,IsNull(@zon_nMostrar,0)
					,@cod_cDescripcion
					,@cod_nColor
					,@cod_nColorLetra
					,@cod_nTipo
					,@cod_nLeeSonido
					,@cod_cSonido
					,@ope_cNombre
					,@ope_cLogin
					,@rec_cDescripcion
					,@rec_cDll
					,@rec_nTcpIp
					,@rxi_cImg
					,@rxi_cCarpeta
					,IsNull(@rxi_nEstado,0)
					,IsNull(@rxi_cTipo,'')
					,@rxi_cConfig
					,@res_cCodigo
					,@res_cDescripcion
					,IsNull(@res_nFalsaAlarma,0)
					,IsNull(@res_nEstado,0)
					,@cat_cCodigo
					,@cat_cDescripcion
					,@gps_rLatitud
					,@gps_rLongitud
					,IsNull(@sta_nContadorFA,0)
					,IsNull(@fal_nMargen,0)
					,IsNull(@_Morosidad,0)
					,IsNull(@_NotaTemporal,0)
					,@_SituacionCuenta
					,IsNull(@_EventoEnPruebaPorZona,0)
					,@_WorkFlowStatus
					,@_idOrganizacion
					,@cue_cLatLng
					,@sp_rLatitud
					,@sp_rLongitud
					,@tip_nCondicion
					,@_ZonaParticion
					,@iTagged
					,@nProceso
					)
		
				--Inserto en EventosTimeLine--
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Inserto en EventosTimeLine--'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

				Insert Into [dbo].[EventosTimeLine]
						([etl_iRecID]
						,[etl_iCuenta]
						,[etl_tFechaHora]
						,[etl_cAccion]
						,[etl_cObservacion]
						,[etl_cOwner]
						,[etl_iOperador])
					Values
						(@idRec
						,@idCuenta
						,@rec_tFechaHora
						,'Inicio'
						,'%Evento recibido en la Central%'
						,Rtrim(@_Origen) +' '+Rtrim(@_Puerto)
						,@rec_iOperador)

				--Actualizo XtraInfo Si no es evento manual--
				If @rec_nOrigen<>3	
				Begin
					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Actualizo XtraInfo--'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					MERGE INTO [dbo].[p_RXtraInfo] AS TGT
					--USING ( Select rec_iid, Null As rec_tFechaHora From [dbo].[p_Recepcion] Where [rec_iid] = @idRec ) AS SRC 
					USING ( Select @idRec As rec_iid, Null As rec_tFechaHora) AS SRC 
					  ON TGT.[rxt_iRecId] = SRC.[rec_iid]
					WHEN MATCHED THEN
					  UPDATE SET
						  TGT.[rxt_dFechaHoraProcesaEvento] = SRC.[rec_tFechaHora]
 					WHEN NOT MATCHED THEN 
					  INSERT ([rxt_iRecId],[rxt_dFechaHoraProcesaEvento])
						VALUES (SRC.[rec_iid],SRC.[rec_tFechaHora]);
				End

				--Si es OperadorVirtual hay que grabar EventosTimeLine y p_recepcion_proceso--
				If @insertET=1	--Si
				Begin
					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Inserto en EventosTimeLine OperadorVirtual--'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					Insert Into [dbo].[EventosTimeLine]
						([etl_iRecID]
						,[etl_iCuenta]
						,[etl_tFechaHora]
						,[etl_cAccion]
						,[etl_cObservacion]
						,[etl_cOwner]
						,[etl_iOperador])
					Values
						(@idRec
						,@idCuenta
						,@rec_tFechaHora
						,'Procesamiento'
						,'%Evento enviado a SofIA OperadorVirtual% ('+Rtrim(@ovc_cDescripcion)+')'
						,Rtrim(@_Origen) +' '+Rtrim(@_Puerto)
						,@rec_iOperador)

					IF @cDebug = 'Si'
					Begin
						Set @StartDateTimeText = Convert(VarChar, GetDate(),120)
						Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] --Inserto en p_recepcion_proceso OperadorVirtual--'
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					End

					Insert Into [dbo].[p_recepcion_proceso] (pro_recid,pro_cterminal,pro_tfechahora,pro_nProceso,pro_iOperador)
					Values(@idRec,'_WW',@rec_tFechaHora,@nProceso,@rec_iOperador)
				End

			
			End
		Else
			Begin
				--Actualizo en EventosPendiente--
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Actualizo en EventosPendiente--'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

				Update [dbo].[EventosPendientes]
				SET [rec_iidCuenta] = @idCuenta
					,[rec_cAlarma] = @cCodAlarma
					,[rec_cZona] = @cZon
					,[rec_iUsuario] = @iUsu
					,[rec_nEstado] = @rec_nEstado
					,[rec_nOrigen] = @rec_nOrigen
					,[rec_cContenido] = @rec_cContenido
					,[rec_tFechaHora] = @rec_tFechaHora
					,[rec_tFechaRecepcion] = @rec_tFechaRecepcion
					,[rec_tFechaProceso] = @rec_tFechaProceso
					,[rec_iOperador] = @rec_iOperador
					,[rec_cObservaciones] = @cObs
					,[rec_cTerminal] = @rec_cTerminal
					,[rec_idResolucion] = @rec_idResolucion
					,[rec_idReceptor] = @rec_idReceptor
					,[rec_cCategorizacion] = @rec_cCategorizacion
					,[rec_iNYR] = @rec_iNYR
					,[rec_iTE] = @rec_iTE
					,[rec_idMap] = @rec_idMap
					,[rec_idFwd] = @rec_idFwd
					,[rec_iMinutosEspera] = @rec_iMinutosEspera
					,[rec_iPuerto] = @rec_iPuerto
					,[rec_idLoc] = @rec_idLoc
					,[rec_iPrioridad] = @iPrioridad
					,[rec_isoFechaHora] = @rec_isoFechaHora
					,[rec_isoFechaProceso] = @rec_isoFechaProceso
					,[rec_isoFechaRecepcion] = @rec_isoFechaRecepcion
					,[_Origen] = @_Origen
					,[_Puerto] = @_Puerto
					,[tsp_cDescripcion] = @tsp_cDescripcion
					,[tsp_cPathIcon] = @tsp_cPathIcon
					,[rxl_cLog] = @rxl_cLog
					,[rxl_cEvento] = @rxl_cEvento
					,[cLinkVideo] = @cSaveImageRX
					,[cvl_cLinkDSS] = @cLinkDSS
					,[cue_cLinea] = @cue_cLinea
					,[cue_nCuenta] = @cue_nCuenta
					,[cue_cNombre] = @cue_cNombre
					,[cue_cCalle] = @cue_cCalle
					,[cue_cLocalidad] = @cue_cLocalidad
					,[cue_cProvincia] = @cue_cProvincia
					,[cue_cClave] = @cue_cClave
					,[cue_cPermiso] = @cue_cPermiso
					,[cue_nParticion] = @cue_nParticion
					,[cue_ctelefono] = @cue_ctelefono
					,[cue_cUbicacion] = @cue_cUbicacion
					,[madre_cLinea] = @madre_cLinea
					,[madre_nCuenta] = @madre_nCuenta
					,[madre_cNombre] = @madre_cNombre
					,[cRemoteHostIP] = @cRemoteHostIP
					,[zon_cDescripcion] = @cDesc
					,[zon_cImagen] = @zon_cImagen
					,[zon_cAlarmaAGenerar] = @zon_cAlarmaAGenerar
					,[zon_cCodigo] = @cZon
					,[zon_cCodigoRestauracion] = @zon_cCodigoRestauracion
					,[zon_cDealer] = @zon_cDealer
					,[zon_cCuenta] = @zon_cCuenta
					,[zon_cListaEmergencia] = @zon_cListaEmergencia
					,[zon_CodigoAlarma] = @zon_CodigoAlarma
					,[zon_mObservacion] = @zon_mObservacion
					,[zon_nAutoProcesa] = IsNull(@zon_nAutoProcesa,0)
					,[zon_nMinutosRestauracion] = IsNull(@zon_nMinutosRestauracion,0)
					,[zon_nMostrar] = IsNull(@zon_nMostrar,0)
					,[usu_cNombre] = @cName
					,[_Morosidad] = IsNull(@_Morosidad,0)
					,[_NotaTemporal] = IsNull(@_NotaTemporal,0)
					,[_SituacionCuenta] = @_SituacionCuenta
					,[_EventoEnPruebaPorZona] = IsNull(@_EventoEnPruebaPorZona,0)
					,[_WorkFlowStatus] = @_WorkFlowStatus
					,[_idOrganizacion] = @_idOrganizacion
					,[cod_cDescripcion] = @cod_cDescripcion
					,[cod_nColor] = @cod_nColor
					,[cod_nColorLetra] = @cod_nColorLetra
					,[cod_nTipo] = @cod_nTipo
					,[cod_nLeeSonido] = @cod_nLeeSonido
					,[cod_cSonido] = @cod_cSonido
					,[ope_cNombre] = @ope_cNombre
					,[ope_cLogin] = @ope_cLogin
					,[rec_cDescripcion] = @rec_cDescripcion
					,[rec_cDll] = @rec_cDll
					,[rec_nTcpIp] = @rec_nTcpIp
					,[rxi_cImg] = @rxi_cImg
					,[rxi_cCarpeta] = @rxi_cCarpeta
					,[rxi_nEstado] = IsNull(@rxi_nEstado,0)
					,[rxi_cTipo] = IsNull(@rxi_cTipo,'')
					,[rxi_cConfig] = @rxi_cConfig
					,[res_cCodigo] = @res_cCodigo
					,[res_cDescripcion] = @res_cDescripcion
					,[res_nFalsaAlarma] = IsNull(@res_nFalsaAlarma,0)
					,[res_nEstado] = IsNull(@res_nEstado,0)
					,[cat_cCodigo] = @cat_cCodigo
					,[cat_cDescripcion] = @cat_cDescripcion
					,[gps_rLatitud] = @gps_rLatitud
					,[gps_rLongitud] = @gps_rLongitud
					,[sta_nContadorFA] = IsNull(@sta_nContadorFA,0)
					,[fal_nMargen] = IsNull(@fal_nMargen,0)
					,[tip_nTipo] = @tip_nTipo
					,[cue_cLatLng] = @cue_cLatLng
					,[sp_rLatitud] = @sp_rLatitud
					,[sp_rLongitud] = @sp_rLongitud
					,[tip_nCondicion] = @tip_nCondicion
					,[_ZonaParticion] = @_ZonaParticion
					,[_Tagged] = @iTagged
				Where [rec_iid]=@idRec
			End
	
		If @iTagged=1
		Begin
			IF @cDebug = 'Si'
			Begin
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | Es un evento Taggeado. Execute [dbo].[SGSP_AutoAsignaEventoAVC]'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End

			Execute	[dbo].[SGSP_AutoAsignaEventoAVC]
		End
	End	

	Set NoExec Off	
	IF @cDebug = 'Si'
	Begin	
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_Fill_EventosPendientes] | --Fin--'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End
END TRY

BEGIN CATCH
	--Declare @cError Varchar(MAX)
	--Set @cError = ( Select ERROR_MESSAGE() )
	----Raiserror('%s',0,1,@cError)
	--Print @cError;
	----THROW	--Solo funciona en 2012 o superior
	IF ERROR_NUMBER() = 2627
	BEGIN
		PRINT 'Handling PK violation...';
	END;
	ELSE IF ERROR_NUMBER() = 547
	BEGIN
		PRINT 'Handling CHECK/FK constraint violation...';
	END;
	ELSE IF ERROR_NUMBER() = 515
	BEGIN
		PRINT 'Handling NULL violation...';
	END;
	ELSE IF ERROR_NUMBER() = 245
	BEGIN
		PRINT 'Handling conversion error...';
	END;
	ELSE
	BEGIN
		PRINT 'Re-throwing error...';
	--THROW;
	END;

	PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
	PRINT 'Error Message : ' + ERROR_MESSAGE();
	PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
	PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
	PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
	PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
	
	Set NoExec Off		
END CATCH