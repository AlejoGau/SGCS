CREATE OR ALTER PROCEDURE [dbo].[SGSP_TextMerge]
	@idCta [int] = 0,
	@cZona [nvarchar](10) = '',
	@cAlarma [char](3) = '',
	@cCodPlantilla [char](3) = '',
	@cFecha [varchar](10) = '',
	@cHora [varchar](8) = '',
	@idRec [int] = 0,
	@cTextMerge [nvarchar](max) = '' OUTPUT,
	@cImagenes [nvarchar](max) = '' OUTPUT
WITH EXECUTE AS CALLER
AS
BEGIN
	--TextMerge de Plantilla de Mail/SMS 
	--Autor :Pablo O. Canónico
	--Fecha :05/03/2013
	--29-08-2017 Se agrego parseo de Tags para DispositivosMoviles y GPSs
	--24-11-2017 Se agrego procesamiento de '[[EVENTOIMAGEN]]'
	--26-09-2018 Se agrego procesamiento de '[[EVENTONOVEDAD]]'
	--26-02-2019 Si la cuenta tiene configurado Default Time Offset, NO se hace el cambio de horario
	--14-06-2019 Se controla que la plantilla tenga <<EVENTOPOSICION>> para evitar buscar en pPosicionesGPS
	--02-09-2020 Se agrego procesamiento de '<<TAREAPROGRAMADA>>'
	--22-12-2020 Se agrego procesamiento de '<<TAGVIAJES>>'
	--21-01-2022 Se agrego procesamiento de tags de Servicio Tecnico
	--02-03-2023 Se agrego procesamiento de '[[EVENTOOBSERVACION]]'
	--17-07-2025 Se agrego procesamiento de '[[EVENTOSMSOBS]]'
	SET NOCOUNT ON
	BEGIN TRY
	Declare @json As nVarChar(max)
	Declare @message nVarChar(Max) = '',
			@StartDateTimeText nVarChar(Max) = ''

	--Set @cFecha = Replace(@cFecha,'/','-')
	--Cuenta/Nombre/Dealer/Zona
	/*
	Select @json = '[' + STUFF(( Select Top 1
				',{"<<CTACODIGO>>":"' + Rtrim(MC.cue_ncuenta) + '"'			
				+ ',"<<CTANOMBRE>>":"' + REPLACE(Rtrim(Cast(MC.cue_cnombre As nVarChar)),'"','\"') + '"'	
				+ ',"<<CTADIR>>":"' + REPLACE(Rtrim(Cast(MC.cue_ccalle As nvarchar)),'"','\"') + '"'	
				+ ',"<<CTALOC>>":"' + REPLACE(Rtrim(Cast(MC.cue_clocalidad As nvarchar)),'"','\"') + '"'	
				+ ',"<<CTACPOSTAL>>":"' + REPLACE(Rtrim(Cast(MC.cue_ccodigopostal As nvarchar)),'"','\"') + '"'	
				+ ',"<<DEALERNOMBRE>>":"' + REPLACE(Rtrim(Cast(MD.lin_crazonsocial As nvarchar)),'"','\"') + '"'
				+ ',"<<DEALERTELEFONO>>":"' + Rtrim(Cast(MD.lin_ctelfono As nvarchar)) + '"'
				+ ',"<<EVENTOCODZONA>>":"' + Rtrim(Cast(@cZona As nvarchar)) + '"'
				+ ',"<<EVENTODESZONA>>":"' + REPLACE(Rtrim(Cast(Isnull(MZ.zon_cdescripcion,'') As nvarchar)),'"','\"') + '"'
				+'}'
				*/
	Select @json = '[' + STUFF(( Select Top 1
				',{"<<CTACODIGO>>":"' + Rtrim(MC.cue_ncuenta) + '"'			
				+ ',"<<CTADEALER>>":"' + REPLACE(Rtrim(MC.cue_clinea),'"','\"') + '"'
				+ ',"<<CTANOMBRE>>":"' + REPLACE(Rtrim(MC.cue_cnombre),'"','\"') + '"'	
				+ ',"<<CTADIR>>":"' + REPLACE(Rtrim(MC.cue_ccalle),'"','\"') + '"'	
				+ ',"<<CTALOC>>":"' + REPLACE(Rtrim(MC.cue_clocalidad),'"','\"') + '"'	
				+ ',"<<CTACPOSTAL>>":"' + REPLACE(Rtrim(MC.cue_ccodigopostal),'"','\"') + '"'	
				+ ',"<<DEALERNOMBRE>>":"' + REPLACE(Rtrim(MD.lin_crazonsocial),'"','\"') + '"'
				+ ',"<<DEALERTELEFONO>>":"' + Rtrim(MD.lin_ctelfono) + '"'
				+ ',"<<EVENTOCODZONA>>":"' + Rtrim(@cZona) + '"'
				+ ',"<<EVENTODESZONA>>":"' + REPLACE(Rtrim(Isnull(MZ.zon_cdescripcion,'')),'"','\"') + '"'
				+'}'
			From _Datos.dbo.m_cuentas MC
				Inner Join _Tablas.dbo.t_lineas MD On MD.lin_ccodigo=MC.cue_clinea
				Left Outer Join _Datos.dbo.m_zonas MZ On MZ.zon_iidcuenta=MC.cue_iid And MZ.zon_ccodigo=@cZona
			Where MC.cue_iid=@IdCta
			For xml path(''), type
		).value('.', 'nVarChar(max)'), 1, 1, '') + ']'

	If @jSon Is Null
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Cuenta/Nombre/Dealer/Zona-- | jSon es null!!!'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

			Set NoExec On
		End
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Cuenta/Nombre/Dealer/Zona-- | jSon : '+@json
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

	--Ver si es de Opn/Clo
	Declare @nTipo Numeric(1,0) = 0
	Declare @EVENTODESC nVarChar(max) = ''
	Declare @cPlantilla nVarChar(max) = ''
	Declare @name As nVarChar(max) = ''
	Declare @stringValue As nVarChar(max) = ''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | @cCodPlantilla => '+@cCodPlantilla
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

	Select @nTipo = cod_nTipo, @EVENTODESC = cod_cdescripcion From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cAlarma
	If @nTipo IN(1,2)	--Opn/Clo
		Set @cPlantilla = ( Select [pls_mplantillaOpnClo] From _Tablas.dbo.t_plantillas_sms WHere pls_ccodigo=@cCodPlantilla)
	Else 
		Set @cPlantilla = ( Select [pls_mplantilla] From _Tablas.dbo.t_plantillas_sms WHere pls_ccodigo=@cCodPlantilla)

	If @cPlantilla Is Null
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | No existe Plantilla => '+@cCodPlantilla
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

			Set NoExec On
		End
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Ver si es de Opn/Clo-- | @cPlantilla : '+@cPlantilla
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

	Declare TmpCursor Cursor STATIC LOCAL READ_ONLY FORWARD_ONLY 
		For Select * from _Datos.dbo.parseJSON(@json) 

		Declare @elementiID As Int
		Declare @parentID As Int 
		Declare @objectID As Int 
		Declare @type As nVarChar(max)

		Open TmpCursor
		FETCH NEXT FROM  TmpCursor INTO @elementiID,@parentID,@objectID,@name,@stringValue,@type

		WHILE @@FETCH_STATUS = 0
		Begin
			if Left(@name,2)='<<'
				Begin
					Set @cTextMerge = ( Select REPLACE(@cPlantilla,@name,@stringValue) )
					Set @cPlantilla = @cTextMerge
				End 

			FETCH NEXT FROM  TmpCursor INTO @elementiID,@parentID,@objectID,@name,@stringValue,@type
		End
	
	Close TmpCursor
	DEALLOCATE TmpCursor

	--Provincia/Estado
	Declare @CTAPROVEST nVarChar(Max) = ''
	Select  @CTAPROVEST= IsNull([pro_cdescripcion],'') From _Datos.dbo.m_cuentas 
		Left Outer Join [_Tablas].[dbo].[t_provincias] On [pro_ccodigo] = [cue_cprovincia]
		Where cue_iid=@IdCta
	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<CTAPROVEST>>',@CTAPROVEST) )
	Set @cPlantilla = @cTextMerge

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Provincia/Estado-- | @cPlantilla : '+@cPlantilla
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

	--Evento/Fecha/Hora
	If @EVENTODESC Is Null
		Set @EVENTODESC = @cAlarma

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<EVENTODESC>>',@EVENTODESC) )
	Set @cPlantilla = @cTextMerge

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Evento-- | @cPlantilla : '+@cPlantilla
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    

	Declare @EVENTOHORA varchar(max)
	Declare @EVENTOFECHA varchar(max)
	Declare @iAjustaHora Int
	Set @iAjustaHora = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='AJUSTAHORARIO' )		
	If @iAjustaHora = 1 And @idRec > 0
		Begin
			--Pasar Fecha/Hora a zona horaria de la cuenta

			Declare @tFechaHora Datetime
			Declare @iZonaHoraria Int = 0
			Select Top 1 @tFechaHora = rec_tfechahora,@iZonaHoraria = IsNull(cue_iZonaHoraria,0) 
				From p_Recepcion 
				Inner Join  _Datos.dbo.m_cuentas On cue_iid=rec_iidcuenta
				Where rec_iid = @idRec

			If @iZonaHoraria > 0
			Begin
				Declare @FechaOffSet DatetimeOffSet 

				set @FechaOffSet = ( Select  SWITCHOFFSET (TODATETIMEOFFSET (@tFechaHora, DATENAME ( TZoffset , SYSDATETIMEOFFSET() )),
					IsNull(TZ.ttz_nOffSet,0.00)*60 ) 
					From _Datos.dbo.m_cuentas MC
					Left Outer Join _Tablas.dbo.t_TimeZone TZ On TZ.ttz_idKey=MC.cue_iZonaHoraria
					Where MC.cue_iid = @IdCta )
	
				Set @EVENTOFECHA = (Select Convert(Char(10), @FechaOffSet,103))
				Set @EVENTOHORA = (Select Convert(Char(8), @FechaOffSet,108))
			End
			Else
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Fecha/Hora-- | Tiene TimeZone default. No se transform'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT    
				Set @EVENTOHORA = @cHora 
				Set @EVENTOFECHA = @cFecha
			End
		End
	Else
		Begin
			Set @EVENTOHORA = @cHora 
			Set @EVENTOFECHA = @cFecha
		End

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<EVENTOHORA>>',@EVENTOHORA) )
	Set @cPlantilla = @cTextMerge

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<EVENTOFECHA>>',@EVENTOFECHA) )
	Set @cPlantilla = @cTextMerge

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Fecha/Hora-- | @cPlantilla : '+@cPlantilla
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  
 
	--Empresa
	Declare @EMPRESA nVarChar(max)
	Set @EMPRESA = (Select par_cValor From _Tablas.dbo.t_parametros Where par_cCodigo ='MAILSENDERNAME')

	Declare @EMPRESATELEFONO nVarChar(max)
	Set @EMPRESATELEFONO = (Select par_cValor From _Tablas.dbo.t_parametros Where par_cCodigo ='MAILTELEFONO')

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<EMPRESA>>',@EMPRESA) )
	Set @cPlantilla = @cTextMerge

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<EMPRESATELEFONO>>',@EMPRESATELEFONO) )
	Set @cPlantilla = @cTextMerge

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Empresa-- | @cPlantilla : '+@cPlantilla
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  

	--Posicion
	Declare @EVENTOPOSICION nVarChar(max) = 'Sin Datos'
	Declare @GPSVELOCIDAD nVarChar(10) = ''
	Declare @GPSBAT nVarChar(10) = ''
	Declare @MEITRACKBATEXT nVarChar(10) = ''
	Declare @MEITRACKBATAMP nVarChar(10) = ''

	If @idRec > 0 And @cPlantilla Like '%<<EVENTOPOSICION>>%'
		Begin 
			Declare @rLatitud real
			Declare @rLongitud real
			Declare @iVelocidad Int
			Declare @iBattery Float
			Declare @iExtBattery Float

			Select Top 1 @rLatitud=gps_rLatitud, @rLongitud=gps_rLongitud, @iVelocidad=gps_iVelocidad ,@iBattery=gps_iBattery, @iExtBattery=gps_iExtBattery From p_PosicionesGPS WITH (NOLOCK) Where gps_idRec = @idRec
			If @rLatitud Is Null Or @rLongitud Is Null
				Set @EVENTOPOSICION = 'Sin Datos'
			Else
				Set @EVENTOPOSICION = 'http://maps.google.com/maps?q='+Rtrim(CAST(@rLatitud As nVarChar(10) ))+','+Rtrim(CAST(@rLongitud As nVarChar(10) ))

			If @iVelocidad Is Not Null
				Set @GPSVELOCIDAD = Rtrim(CAST(@iVelocidad As nVarChar(10)))

			If @iBattery Is Not Null
				Begin
					Set @GPSBAT = Rtrim(CAST(@iBattery As nVarChar(10)))
					Set @MEITRACKBATAMP = Rtrim(Ltrim(Str(@iBattery/100, 10, 2)))
				End

			If @iExtBattery Is Not Null
				Set @MEITRACKBATEXT = Rtrim(Ltrim(Str(@iExtBattery/100, 10, 2)))
		End

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<EVENTOPOSICION>>',@EVENTOPOSICION) )
	Set @cPlantilla = @cTextMerge
	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<GPSVELOCIDAD>>',@GPSVELOCIDAD) )
	Set @cPlantilla = @cTextMerge
	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<GPSBAT>>',@GPSBAT) )
	Set @cPlantilla = @cTextMerge
	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MEITRACKBATEXT>>',@MEITRACKBATEXT) )
	Set @cPlantilla = @cTextMerge
	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MEITRACKBATAMP>>',@MEITRACKBATAMP) )
	Set @cPlantilla = @cTextMerge

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Posicion-- | @cPlantilla : '+@cPlantilla
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  

	--Codigo Usuario y Nombre / Tarea Programada
	If @idRec > 0
		Begin
			Declare @EVENTOCODUSUARIO nVarChar(10) = ''
			Declare @EVENTONOMUSUARIO nVarChar(max) = ''
			Declare @TAREAPROGRAMADA nVarChar(Max) = ''
		
			If @cPlantilla Like '%<<TAREAPROGRAMADA>>%'
				Begin 
					Select Top 1 @EVENTOCODUSUARIO = IsNull(Cast(usu_iid As nVarChar(10)),Cast(rec_iUsuario As nVarChar(10))), @EVENTONOMUSUARIO = IsNull(usu_cnombre,''), @TAREAPROGRAMADA = IsNull(rec_cObservaciones,'') From p_recepcion
						Left Outer Join m_usuarios On usu_iidcuenta=rec_iIdCuenta And usu_iid=rec_iUsuario And usu_iCodigo<>0
					Where rec_iId = @idRec

					Set @TAREAPROGRAMADA = Replace(@TAREAPROGRAMADA,'[SISTEMA]','')
					Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<TAREAPROGRAMADA>>',@TAREAPROGRAMADA) )
					Set @cPlantilla = @cTextMerge
				End
			Else
				Begin 
					Select Top 1 @EVENTOCODUSUARIO = IsNull(Cast(usu_iid As nVarChar(10)),Cast(rec_iUsuario As nVarChar(10))), @EVENTONOMUSUARIO = IsNull(usu_cnombre,'') From p_recepcion
						Left Outer Join m_usuarios On usu_iidcuenta=rec_iIdCuenta And usu_iid=rec_iUsuario And usu_iCodigo<>0
					Where rec_iId = @idRec
				End

			Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<EVENTOCODUSUARIO>>',@EVENTOCODUSUARIO) )
			Set @cPlantilla = @cTextMerge

			Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<EVENTONOMUSUARIO>>',@EVENTONOMUSUARIO) )
			Set @cPlantilla = @cTextMerge

			
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Codigo Usuario y Nombre / Tarea Programada-- | @cPlantilla : '+@cPlantilla
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  
		End

	--DispositivoMovil
	If @idCta > 0
		Begin
			Declare @MOVMARCA nVarChar(128) = ''
			Declare @MOVMODELO nVarChar(128) = ''
			Declare @MOVCOLOR nVarChar(256) = ''
			Declare @MOVNROCHASIS nVarChar(256) = ''
			Declare @MOVNROMOTOR nVarChar(256) = ''
			Declare @MOVYEAR nVarChar(10) = ''
			Declare @MOVDOMINIO nVarChar(128) = ''
			Declare @MOVVELMAX nVarChar(10) = ''
			Declare @MOVIDCOND nVarChar(30) = ''

			Select @MOVMARCA=IsNull(VB.Name,''), @MOVMODELO=IsNull(VM.Name,''), @MOVCOLOR=IsNull([Colour],''), @MOVNROCHASIS=IsNull([NroChasis],''), @MOVNROMOTOR=IsNull([NroMotor],''), 
				@MOVYEAR=Rtrim(CAST(IsNull([Year],0) As varchar(10))), @MOVDOMINIO=IsNull([Domain],''), @MOVVELMAX=IsNull([MaxSpeed],''), @MOVIDCOND=IsNull(MU.usu_cNombre,'')
			  FROM [_Datos].[dbo].[DispositivoMovil] DM 
			  Left Outer Join [_Tablas].[dbo].[VehicleBrand] VB On VB.Id = DM.VehicleBrand
			  Left Outer Join  [_Tablas].[dbo].[VehicleModel] VM On VM.Id = DM.VehicleModel
			  Left Outer Join [_Datos].[dbo].[m_usuarios] MU On Mu.usu_iid = DM.DriverId And MU.usu_iidcuenta = DM.OwnerId
			  Where [OwnerId]=@IdCta

			Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MOVMARCA>>',@MOVMARCA) )
			Set @cPlantilla = @cTextMerge
			Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MOVMODELO>>',@MOVMODELO) )
			Set @cPlantilla = @cTextMerge
			Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MOVCOLOR>>',@MOVCOLOR) )
			Set @cPlantilla = @cTextMerge
			Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MOVNROCHASIS>>',@MOVNROCHASIS) )
			Set @cPlantilla = @cTextMerge
			Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MOVNROMOTOR>>',@MOVNROMOTOR) )
			Set @cPlantilla = @cTextMerge
			Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MOVYEAR>>',@MOVYEAR) )
			Set @cPlantilla = @cTextMerge
			Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MOVDOMINIO>>',@MOVDOMINIO) )
			Set @cPlantilla = @cTextMerge
			Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MOVVELMAX>>',@MOVVELMAX) )
			Set @cPlantilla = @cTextMerge
			Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MOVIDCOND>>',@MOVIDCOND) )
			Set @cPlantilla = @cTextMerge
	
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --DispositivoMovil-- | @cPlantilla : '+@cPlantilla
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  
		End

	--Nombre GeoCerca y Ruta Movil
	Declare @GEOCERCANOMBRE nVarChar(max)
	Declare @MOVILRUTA nVarChar(max)
	Set @GEOCERCANOMBRE = ''
	Set @MOVILRUTA = ''

	If @idRec > 0
		Select Top 1 @GEOCERCANOMBRE = IsNull(rxt_cGeoFenceName,''), @MOVILRUTA = IsNull(rxt_cRoute,'') From p_RXtraInfo Where rxt_iRecId = @idRec

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<GEOCERCANOMBRE>>',@GEOCERCANOMBRE) )
	Set @cPlantilla = @cTextMerge

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<MOVILRUTA>>',@MOVILRUTA) )
	Set @cPlantilla = @cTextMerge

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Nombre GeoCerca y Ruta Movil-- | @cPlantilla : '+@cPlantilla
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  

	--Set @cTextMerge = ( Select REPLACE(@cPlantilla,'[[EVENTOIMAGEN]]','') )
	--Set @cPlantilla = @cTextMerge

	--Set @cTextMerge = ( Select REPLACE(@cPlantilla,'[[EVENTONOVEDAD]]','') )
	--Set @cPlantilla = @cTextMerge

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'[[GEOCERCAIMAGEN]]','') )
	Set @cPlantilla = @cTextMerge

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'[[LF]]','<BR>') )
	Set @cPlantilla = @cTextMerge

	If @idRec > 0
	Begin
		--QRCode/ActivarionLink
		Select @json = IsNull(rxt_cData,'#NoData#')  From _Datos.dbo.p_RXtraInfo Where rxt_iRecId = @idRec

		If @jSon <> '#NoData#' And Left(@jSon,2) = '{"'
			Begin
				Declare TmpCursor Cursor STATIC LOCAL READ_ONLY FORWARD_ONLY 
					For Select Name,StringValue From _Datos.dbo.parseJSON(@json) 

					Open TmpCursor
					FETCH NEXT FROM TmpCursor INTO @name,@stringValue

					WHILE @@FETCH_STATUS = 0
					Begin
						If @name ='qrcodeLink'
							Set @cTextMerge = ( SELECT REPLACE(@cPlantilla,'<<QRCODE>>',@stringValue) )
						Else
							If @name ='activationLink'
								Set @cTextMerge = ( SELECT REPLACE(@cPlantilla,'<<QRLINK>>',@stringValue) )

						Set @cPlantilla = @cTextMerge						
						FETCH NEXT FROM  TmpCursor INTO @name,@stringValue
					End

				Close TmpCursor
				DEALLOCATE TmpCursor

				Set @cPlantilla = @cTextMerge

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --QRCode/ActivarionLink-- | @cPlantilla : '+@cPlantilla
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  
			End	

			--[[EVENTOIMAGEN]]
			If CHARINDEX('[[EVENTOIMAGEN]]', @cPlantilla ) > 0
			Begin
				--2018-08-02 Rodrigo pidio que se guarde tal cual esta en RXImg 
				--Select @cImagenes = IsNull(@cImagenes + ',', '') + _Datos.dbo.GetFileName([rxi_cImg])
				Select @cImagenes = IsNull(@cImagenes + ',', '') + [rxi_cImg]
				From [dbo].[p_RXImg]
				Where [rxi_iRecId] = @idRec

				Select @cImagenes = IsNull(@cImagenes,'')

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --[[EVENTOIMAGEN]]-- | @cImagenes : '+@cImagenes
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  
			End

			--[[EVENTONOVEDAD]]
			If CHARINDEX('[[EVENTONOVEDAD]]', @cPlantilla ) > 0
			Begin
				Declare @cNews As nVarChar(max)=''		
				If @jSon <> '#NoData#' And Left(@jSon,1) = '{'
					Begin
						Declare TmpCursor Cursor STATIC LOCAL READ_ONLY FORWARD_ONLY 
							For Select Id,Value From _Datos.dbo.SplitDelimited(@json,',') 

							Open TmpCursor
							FETCH NEXT FROM TmpCursor INTO @name,@stringValue

							WHILE @@FETCH_STATUS = 0
							Begin
								If Left(@stringValue,5) ='news:'
								Begin
									Set @cNews = Ltrim(SUBSTRING(@stringValue, 7, Len(@stringValue)-7))
									Break
								End
								FETCH NEXT FROM  TmpCursor INTO @name,@stringValue
							End

						Close TmpCursor
						DEALLOCATE TmpCursor

					End	

				Set @cTextMerge = ( Select REPLACE(@cPlantilla,'[[EVENTONOVEDAD]]',@cNews) )
				Set @cPlantilla = @cTextMerge

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --EVENTONOVEDAD-- | @cPlantilla : '+@cPlantilla
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  
			End

			--[[EVENTOOBSERVACION]]
			If CHARINDEX('[[EVENTOOBSERVACION]]', @cPlantilla ) > 0
			Begin
				Declare @cObs As nVarChar(max)=''		

				Select @cObs=[rec_cobservaciones] From _Datos.dbo.p_recepcion Where rec_iid=@idRec
				Declare @cValor As nVarChar(max)=''		
				Select @cValor=[Value] From _Datos.dbo.SplitDelimited(@cObs, ']') Where [Id] = 3

				Set @cTextMerge = ( Select REPLACE(@cPlantilla,'[[EVENTOOBSERVACION]]',@cValor) )
				Set @cPlantilla = @cTextMerge

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --EVENTOOBSERVACION-- | @cPlantilla : '+@cPlantilla
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  
			End

			If @cPlantilla Like '%<<TAGVIAJES>>%'
			Begin 
				Declare @idViaje As VarChar(20)=''
				Declare @identificador As VarChar(20)=''
				Declare @TAGVIAJES varchar(max)=''
				Declare @txt varchar(max)=''

				Declare @cContenido VarChar(Max) = 0
				Select Top 1 @cContenido = rec_cContenido
					From p_Recepcion 
				Where rec_iid=@idRec

				Declare TmpCursor Cursor STATIC LOCAL READ_ONLY FORWARD_ONLY 
					For Select Name,StringValue From _Datos.dbo.parseJSON(@cContenido) 

					Open TmpCursor
					FETCH NEXT FROM TmpCursor INTO @name,@stringValue

					WHILE @@FETCH_STATUS = 0
					Begin
						If @name ='idViaje'
							Set @idViaje = @stringValue
						Else
							If @name ='identificador'
								Set @identificador = @stringValue

						FETCH NEXT FROM  TmpCursor INTO @name,@stringValue
					End

				Close TmpCursor
				DEALLOCATE TmpCursor

				If @idViaje!='' And @identificador!=''
				Begin
					Set @TAGVIAJES = 'Numero de viaje : ' + @idViaje + '<BR>'

					Declare @metadata nVarchar(max),
							@fechainicio DateTime,
							@fechafin Datetime,
							@GeoInicio nVarChar(128),
							@GeoFin nVarChar(128),
							@NombreCliente nVarChar(128),
							@NombreTransportista nVarChar(100),
							@lugarInicio nVarChar(500),
							@lugarFin nVarChar(500)

					Select @metadata=tgv_metadata, @fechainicio=tgv_fechainicio, @fechafin=tgv_fechafin,
						@GeoInicio=IsNull((Select [name] From [dbo].[SmartTrackGeoFense] Where [id]=tgv_geofenseinicio),''), 
						@GeoFin=IsNull((Select [name] From [dbo].[SmartTrackGeoFense] Where [id]=tgv_geofensefin),''),
						@NombreCliente=IsNull((Select [Name] From [dbo].[Organization] Where [Id]=tgv_cuenta_cliente),''), 
						@NombreTransportista=IsNull([cue_cNombre],''), @lugarInicio=tgv_lugar_inicio, @lugarFin=tgv_lugar_fin 
						From [dbo].[m_tgviaje] 
						Left Outer Join [dbo].[DispositivoMovil] DM On [Id]=tgv_movil_transportista
						Left Outer Join [dbo].[m_cuentas] On [cue_iid]=DM.[OwnerId] 
						Where tgv_codigoexterno=@idViaje And tgv_nombre=@identificador

					Declare TmpCursor Cursor STATIC LOCAL READ_ONLY FORWARD_ONLY 
						For Select Name,StringValue From _Datos.dbo.parseJSON(@metadata) 

						Open TmpCursor
						FETCH NEXT FROM TmpCursor INTO @name,@stringValue

						WHILE @@FETCH_STATUS = 0
						Begin
							If @name != '-'
							Begin
								If @stringValue Like '/Date(%'
								Begin
									Declare @datejson varchar(100) = @stringValue
									Set @stringValue = Convert(VarChar(MAX), ( Select DATEADD(minute, DATEDIFF(minute, getutcdate(), getdate()), DATEADD(s, convert(bigint,substring(replace(replace(@datejson,'/Date(',''),')/',''),0,charindex('-',replace(replace(@datejson,'/Date(',''),')/',''))))/1000, '19700101 00:00:00:000')) ) , 20)
								End

								If @name = 'Empresaid'
									Set @name = 'ID Empresa'
								Else If @name = 'Traduan'
									Set @name = 'Codigo de Aduana'
								Else If @name = 'Trano'
									Set @name = 'Año del DUA'
								Else If @name = 'Trcorre'
									Set @name = 'Numero Correlativo'
								Else If @name = 'Tpoid'
									Set @name = 'Tipo ID'

								--Print @name + ' : ' + @stringValue
								Set @TAGVIAJES +=  @name + ' : ' + @stringValue + '<BR>' 
							End
							FETCH NEXT FROM  TmpCursor INTO @name,@stringValue
						End

					Close TmpCursor
					DEALLOCATE TmpCursor
					Set @txt = 'Fecha Inicio : '+ Convert(VarChar(MAX), @fechainicio, 20)
					--Print @txt
					Set @TAGVIAJES += @txt + '<BR>' 

					Set @txt = 'Fecha Fin : '+ Case When Year(@fechafin)=1900 Then '' Else Convert(VarChar(MAX), @fechafin, 20) End
					--Print @txt
					Set @TAGVIAJES += @txt + '<BR>' 

					Set @txt = 'Geocerca Inicio : '+ @GeoInicio
					--Print @txt
					Set @TAGVIAJES += @txt + '<BR>' 

					Set @txt = 'Geocerca Fin : '+ @GeoFin
					--Print @txt
					Set @TAGVIAJES += @txt + '<BR>' 
					
					Set @txt = 'Nombre Cliente : '+ @NombreCliente
					--Print @txt
					Set @TAGVIAJES += @txt + '<BR>' 
					
					Set @txt = 'Nombre Transportista : '+ @NombreTransportista
					--Print @txt
					Set @TAGVIAJES += @txt + '<BR>' 
					
					Set @txt = 'Lugar Inicio  : '+ @lugarInicio
					--Print @txt
					Set @TAGVIAJES += @txt + '<BR>' 
					
					Set @txt = 'Lugar Fin  : '+ @lugarFin
					--Print @txt
					Set @TAGVIAJES += @txt + '<BR>' 

					Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<TAGVIAJES>>',@TAGVIAJES) )
					Set @cPlantilla = @cTextMerge

					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --TAGVIAJES-- | @cPlantilla : '+@cPlantilla
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  
				End
			End

			--[[EVENTOSMSOBS]]
			If CHARINDEX('[[EVENTOSMSOBS]]', @cPlantilla ) > 0
			Begin
				Declare @resultado NVarchar(MAX) = '';

				Select @resultado = 
					'Fecha-Hora: ' + FORMAT(eie_tFechaHora, 'dd/MM/yyyy HH:mm:ss') + CHAR(13) + CHAR(10) +
					'Matricula: ' + ISNULL(eie_cMatricula, '') + CHAR(13) + CHAR(10) +
					'Vecino: ' + ISNULL(eie_cUnidadFuncional, '') + ' - ' + ISNULL(cue_cnombre, '') + CHAR(13) + CHAR(10) +
					'Visita: ' + 
						ISNULL(
							LTRIM(RTRIM(
								SUBSTRING(
									CAST(rec_cObservaciones AS NVARCHAR(MAX)), 
									CHARINDEX('Tipo de Visita:', CAST(rec_cObservaciones AS NVARCHAR(MAX))) + 15,
									CHARINDEX('<br>', CAST(rec_cObservaciones AS NVARCHAR(MAX)), CHARINDEX('Tipo de Visita:', CAST(rec_cObservaciones AS NVARCHAR(MAX))) + 15) - 
									CHARINDEX('Tipo de Visita:', CAST(rec_cObservaciones AS NVARCHAR(MAX))) - 15
								)
							)), ''
						) + CHAR(13) + CHAR(10) +
					'Nombre: ' + ISNULL(eie_cVecino, '')
				From [_Datos].[dbo].[EventosIngresosEgresos]
					Inner Join [_Datos].[dbo].[m_cuentas] On [eie_iCuentaId] = [cue_iid]
					Inner Join [_Datos].[dbo].[p_recepcion] On [eie_iRecId] = [rec_iid]
				WHERE [eie_iRecId] = @idRec
				AND CHARINDEX('Tipo de Visita:', CAST(rec_cObservaciones AS NVARCHAR(MAX))) > 0

				Set @cTextMerge = ( Select REPLACE(@cPlantilla,'[[EVENTOSMSOBS]]',@resultado) )
				Set @cPlantilla = @cTextMerge

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --EVENTOSMSOBS-- | @cPlantilla : '+@cPlantilla
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  
			End
	End

	--Telefomo para eventos de SP o VC
	If @idRec > 0 And @cPlantilla Like '%<<TELEFONOAPP>>%'
	Begin 
		Declare @TELEFONOAPP VarChar(128) = ''
		Select Top 1 @TELEFONOAPP = Case When [rxt_nSPIP]=1 Then IsNull(SP.[Telefono],'') Else (Case When [rxt_nVCIP]=1 Then IsNull(VC.[Telefono],'') Else '' End) End
			From [dbo].[p_RXtraInfo]
		Left Outer Join  [_Datos].[dbo].[SmartPanic] SP On SP.[Imei]=[rxt_cimei]
		Left Outer Join  [_Datos].[dbo].[SmartTrack] VC ON VC.[Imei]=[rxt_cimei]
			Where rxt_iRecId = @idRec

		Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<TELEFONOAPP>>',@TELEFONOAPP) )
		Set @cPlantilla = @cTextMerge

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Telefomo para eventos de SP o VC-- | @cPlantilla : '+@cPlantilla
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  
	End

	--Servicio Tecnico
	Declare @STORDEN VarChar(10) = '-Sin Datos-'
	Declare @STINICIOVISITA VarChar(20) = ''
	Declare @STFINVISITA VarChar(20) = ''
	Declare @STTECNICO nVarChar(100) = ''
	Declare @STTIPOSERVICIO nVarChar(50) = ''
	Declare @STSERVICIO nVarChar(100) = ''

	If @idRec > 0 And @cAlarma IN ('_ST','_NS') And @cPlantilla Like '%<<ST%'
		Begin 
			Declare @iOrden [int] = 0 

			Execute [_Datos].[dbo].[SGSP_SearchNroOrdenServicio] @idRec=@idRec,@iValor=@iOrden Output

			If @iOrden>0
			Begin
				If @cAlarma = '_ST'
				Begin
					Select @STTECNICO = COALESCE(@STTECNICO + ' - ', '') + ins_cnombre
 						From [_Datos].[dbo].[SerTecVisitas] 
							Inner Join [_Datos].[dbo].[SerTecTecnicoVisitas] On stv_iVisita = svi_idKey
							Inner Join [_Tablas].[dbo].[t_instaladores] On ins_idKey = stv_iTecnico
						Where svi_iServicio = @iOrden

					Select Top 1 @STINICIOVISITA=Convert(VarChar(20), svi_tArriboAlCliente, 20),
								 @STFINVISITA=Convert(VarChar(20), svi_tSalidaDelCliente, 20),
								 @STTIPOSERVICIO=(Case When tip_ntipo = 0 Then 'Preventivo'
											  When tip_ntipo = 1 Then 'Correctivo'
											  Else 'Instalacion' End),
								 @STSERVICIO=tip_cdescripcion
 						From [_Datos].[dbo].[m_st_cabecera]
							Inner Join [_Tablas].[dbo].[t_tiposervicio] On tip_ccodigo = stc_ctipo_servicio
							Inner Join [_Datos].[dbo].[SerTecVisitas] On svi_iServicio = stc_iid
						Where stc_inumero = @iOrden
				End
				Else
				Begin
					Select Top 1 @STTIPOSERVICIO=(Case When tip_ntipo = 0 Then 'Preventivo'
											  When tip_ntipo = 1 Then 'Correctivo'
											  Else 'Instalacion' End),
								 @STSERVICIO=tip_cdescripcion
 						From [_Datos].[dbo].[m_st_cabecera]
							Inner Join [_Tablas].[dbo].[t_tiposervicio] On tip_ccodigo = stc_ctipo_servicio
						Where stc_inumero = @iOrden
				End

				Set @STORDEN = Rtrim(CAST(@iOrden As nVarChar(10)))
			End
		End

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<STORDEN>>',@STORDEN) )
	Set @cPlantilla = @cTextMerge
	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<STINICIOVISITA>>',@STINICIOVISITA) )
	Set @cPlantilla = @cTextMerge
	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<STFINVISITA>>',@STFINVISITA) )
	Set @cPlantilla = @cTextMerge
	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<STTECNICO>>',@STTECNICO) )
	Set @cPlantilla = @cTextMerge
	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<STTIPOSERVICIO>>',@STTIPOSERVICIO) )
	Set @cPlantilla = @cTextMerge
	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'<<STSERVICIO>>',@STSERVICIO) )
	Set @cPlantilla = @cTextMerge

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | --Servicio Tecnico-- | @cPlantilla : '+@cPlantilla
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  

	Set @cTextMerge = ( Select REPLACE(@cPlantilla,'[[EVENTOIMAGEN]]','') )
	Set @cPlantilla = @cTextMerge

	Set @cPlantilla = Replace(Replace(Replace(Replace(Replace(@cPlantilla COLLATE Latin1_General_BIN,'Á', 'A'),'É','E'),'Í','I'),'Ó','O'),'Ú','U')
	Set @cPlantilla = Replace(Replace(Replace(Replace(Replace(@cPlantilla COLLATE Latin1_General_BIN,'á', 'a'),'é','e'),'í','i'),'ó','o'),'ú','u')
	Set @cTextMerge = @cPlantilla

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_TextMerge] | @cTextMerge : '+@cTextMerge
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT  

	Set NoExec Off			
	END TRY
	BEGIN CATCH
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
		END;

		PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
		PRINT 'Error Message : ' + ERROR_MESSAGE();
		PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
		PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
		PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
		PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');

		IF (SELECT CURSOR_STATUS('global','TmpCursor')) >= -1
		 BEGIN
		  IF (SELECT CURSOR_STATUS('global','TmpCursor')) > -1
		   BEGIN
			CLOSE tmCursor
		   END
		 DEALLOCATE tmCursor
		END	
	END CATCH
END