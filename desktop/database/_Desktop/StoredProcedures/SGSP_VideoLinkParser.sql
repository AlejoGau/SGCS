CREATE OR ALTER PROCEDURE [dbo].[SGSP_VideoLinkParser]
@iRecID int ,
@tabla varchar(256) = 'p_recepcion',
@noRximg int = 0
As
If (Select par_ivalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo='UTILIZAVI') = 0
	Set NoExec On


Declare @idCta   Int
Declare @cAlarma Char(3)
Declare @cZona	 Char(3)
Declare @iRXimg  Int
declare @ccontenido varchar(max)
declare @cvl_czona char(3)
declare @sql_recepcion nvarchar(max)
declare @params_recepcion nvarchar(max)

if @tabla = ''
select @tabla = 'p_recepcion'

 SELECT @sql_recepcion =
	N' SELECT @idCta = rec_iidcuenta, @cAlarma = rec_calarma, @cZona = rec_czona, @ccontenido = rec_ccontenido FROM _datos..' + quotename(@tabla) +
	N' WHERE rec_iid = @iRecID'
	SELECT @params_recepcion = N'@iRecID int, ' +
                    N'@cAlarma   Char(3) OUTPUT, ' +
					N'@cZona   Char(3) OUTPUT, ' +
					N'@ccontenido   varchar(max) OUTPUT, ' +
                    N'@idCta      int      OUTPUT'

	--print '[SGSP_VideoLinkParser] sql_recepcion'	
	--print @sql_recepcion
	
	EXEC sp_executesql @sql_recepcion, @params_recepcion,@iRecID=@iRecID, @idCta = @idCta OUTPUT,@ccontenido=@ccontenido OUTPUT, @cZona=@cZona OUTPUT,@cAlarma=@cAlarma OUTPUT

--Select  @idCta = rec_iidcuenta, @cAlarma = rec_calarma, @cZona = rec_czona, @ccontenido = rec_ccontenido From _Datos.dbo.p_recepcion Where rec_iid = @iRecID

-- busco todas las imagenes de eventos pendientes de la misma cuenta.
Select @iRXimg = Count(*) From _Datos.dbo.p_RXImg i with (NOLOCK)
	inner join _datos..p_recepcion r with (NOLOCK) on r.rec_iid = i.rxi_iRecId
	Where r.rec_iid >= @iRecID and rec_iidcuenta = @idCta-- and rec_nestado in (0,1,2)

--print '[SGSP_VideoLinkParser] @iRXimg'	
--print @iRXimg

If @idCta > 0
	Begin
		Declare @cData	  NVARCHAR(MAX)
		Declare @cLink	  NVARCHAR(MAX)
		declare @cLinkDSS NVARCHAR(MAX)
		declare @iVideoID int
		Declare @bEsDG	Bit
		--Set @bEsDG = 1  /* True */
		Set @bEsDG = 0  /* False */
		Declare @nLaunch Integer
		Declare @tvi_cdescripcion varchar(10)
		Declare @tvi_cnombre varchar(200)
		Declare @tvi_iplatform int

		--print '[SGSP_VideoLinkParser] Me fijo si se configuro video para la alarma'
		Select @cData = cuv_clink,
			@cLinkDSS = cuv_cLinkDSS, 
			@nLaunch = tvi_nLaunch, 
			@tvi_cdescripcion = tvi_cdescripcion , 
			@tvi_cnombre = tvi_cnombre,
			@iVideoID = cuv_iVideoID,
			@tvi_iplatform = tvi_iplatform From _Datos.dbo.m_cuentas_video
		Inner Join _Tablas.dbo.t_VideoID with (NOLOCK)  ON cuv_iVideoID = tvi_iid
		Where (CHARINDEX(@cAlarma, cuv_meventos) > 0 OR cuv_iTodosLosEventos = 1)  And cuv_iidCuenta = @idCta

		--print '[SGSP_VideoLinkParser] Busco por Alarma-Zona'
		IF EXISTS (SELECT * FROM _Datos.dbo.m_cuentas_video_links with (NOLOCK)
			Where (cvl_calarma = @cAlarma OR cuv_iTodosLosEventos = 1) And cvl_czona = @cZona
					And cvl_iidCuenta  = @idCta)
		BEGIN
			Set @cvl_czona = @cZona -- devuelvo la zona para ponerlo en el timeline

			Select @cData = cvl_clink,
				@cLink = cvl_clink,
				@cLinkDSS = cvl_cLinkDSS, 
				@nLaunch = tvi_nLaunch,
				@iVideoID = isnull(cvl_iVideoID,@iVideoID),
				@tvi_cnombre = tvi_cnombre,
				@tvi_cdescripcion = tvi_cdescripcion,
				@tvi_iplatform = tvi_iplatform
				From _Datos.dbo.m_cuentas_video_links
				Inner Join _Tablas.dbo.t_VideoID with (NOLOCK)  ON cvl_iVideoID = tvi_iid
				Where (cvl_calarma = @cAlarma OR cuv_iTodosLosEventos = 1) And cvl_czona = @cZona
					And cvl_iidCuenta  = @idCta
		END 

		Declare @cSaveImageRX NVARCHAR(MAX)
		Set @cSaveImageRX = ''
		
		If @iRXimg > 0 and @noRximg = 0 AND CHARINDEX('VUP', @ccontenido)=-1 
		BEGIN
			--print '[SGSP_VideoLinkParser] tengo @iRXimg'
			Select i.*, @cLinkDSS As cuv_cLinkDSS, @nLaunch As tvi_nLaunch , mp4.*,@idCta as cue_iid
				From _Datos.dbo.p_RXImg i with (NOLOCK)
				inner join _datos..p_recepcion r with (NOLOCK) on r.rec_iid = i.rxi_iRecId
				LEFT JOIN _Datos.dbo.p_grabacion_mp4 mp4 with (NOLOCK) ON grm_iidRecepcion = @iRecID
				Where rec_iidcuenta = @idCta and  rec_nestado in (0,1,2)
		END
		Else
			Begin
				--print '[SGSP_VideoLinkParser] Veo si es D-Guard'
				If Upper(Left(@cLink,4))='DGR:'	
					Begin
						Set @cSaveImageRX = 'http://'+Rtrim(SubString(@cLink,5,195))
						Set @bEsDG = 1
					End
				Else 
					If Upper(Left(@cData,4))='DGR:'	
						Begin
							Set @cSaveImageRX = 'http://'+Rtrim(SubString(@cData,5,195))
							Set @bEsDG = 1
						End

				--print '[SGSP_VideoLinkParser] Si hay info y es D-Guard inserto en RXImg'
				If @cSaveImageRX <> '' And @bEsDG = 1
					Begin
						Insert Into _Datos.dbo.p_RXImg (rxi_iRecId,rxi_cImg,rxi_cCarpeta,rxi_nEstado) Values (@iRecID,Left(@cSaveImageRX,200),'[D-Guard]',1)
						Select r.*,@cLinkDSS As cvl_cLinkDSS, @nLaunch As tvi_nLaunch From _Datos.dbo.p_RXImg r Where rxi_iId = @@IDENTITY
					End	

				--print '[SGSP_VideoLinkParser] Si no es DGuard tengo que traer los IMG que no entraron en RxImg'
				If ((Upper(Left(@cData,3))='IMG' or CHARINDEX('JPG', @ccontenido)>0 ) And @bEsDG = 0 AND CHARINDEX('VUP', @ccontenido)=-1 )
					Begin
						Declare @cMiscPath NVARCHAR(100)
						Set @cMiscPath = ( Select Ltrim(par_cValor) From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='SEARCHSOFTGUARDMISCFILE' ) + '\Video\'
       
						Select Top 1 0 As rxi_iId, @iRecID As rxi_iRecId, '' As rxi_cImg, @cMiscPath+gri_ccarpeta As rxi_cCarpeta, 1 As rxi_nEstado, 'jpg' As rxi_cTipo, Null As rxi_cConfig, @cLinkDSS As cuv_cLinkDSS, @nLaunch As tvi_nLaunch ,@idCta as cue_iid
							From _Datos..p_grabacion_img with (NOLOCK) Where gri_iidrecepcion = @iRecID
					End
			End 

		--print '[SGSP_VideoLinkParser] Tengo que devolver el link de video que tiene configurado para poder usarlo en DSSVideoLauncher'
		--print '[SGSP_VideoLinkParser] @iVideoID'	
		print @iVideoID
		if @iVideoID = 32
		BEGIN
			set @cData = 'WEB:'+ @cData
		END

		--print '[SGSP_VideoLinkParser] @cData'	
		--print @cData

		If @cLink <>''	
			Set @cSaveImageRX = @cLink
		Else
			If @cData <>''
				Set @cSaveImageRX = @cData

		--print '[SGSP_VideoLinkParser] @cSaveImageRX'	
		--print @cSaveImageRX


		DECLARE @rxi_cTipo VARCHAR(50)
		Select @rxi_cTipo = rxi_cTipo From _Datos.dbo.p_RXImg with (NOLOCK) Where rxi_iRecId = @iRecID
		if @iVideoID > 0 or @iRXimg > 0 -- necesito el if para no traer siempre datos, sino mwr muestra siempre la ventana de video
		begin
		--print '[SGSP_VideoLinkParser] Ejecuto query'	
		Select --top 1 no traigo solo 1
			rxi_cTipo
			,isnull(rxi_nEstado, 0) rxi_nEstado
			,rxi_cImg
			,rxi_cCarpeta
			, @cSaveImageRX As cLinkVideo
			, @cLinkDSS as cvl_cLinkDSS
			,@cLinkDSS as cuv_cLinkDSS
			, cue_cLinea, cue_nCuenta
			, rec_cContenido
			, rec_iid
			, rec_iidcuenta as cue_iid
			, convert(varchar, rec_tfechahora, 20) rec_tfechahora
			, Case When ipc_cremotehostip <> '' Then ipc_cremotehostip Else '(nada)' End As cRemoteHostIP
			,@nLaunch As tvi_nLaunch 
			,@tvi_cdescripcion as tvi_cdescripcion
			,@tvi_cnombre as tvi_cnombre
			,mp4.*
			,@iVideoID as cuv_ivideoid
			,@cvl_czona as cvl_czona
			,@tvi_iplatform as tvi_iplatform
			From _Datos.dbo.m_cuentas with (NOLOCK)
				Inner Join _Datos.dbo.p_recepcion with (NOLOCK) On rec_iid=@iRecID
				Left Outer Join _Tablas.dbo.t_ip_con with (NOLOCK) On ipc_nport = [rec_iPuerto]		
				LEFT JOIN _Datos.dbo.p_RXImg img with (NOLOCK) ON rxi_iRecId = @iRecID
				LEFT JOIN _Datos.dbo.p_grabacion_mp4 mp4 with (NOLOCK) ON grm_iidRecepcion = @iRecID
			Where cue_iid = @idCta 
				--And Left(@cSaveImageRX,3) In ( Select Left(tvi_cdescripcion,3) FROM _Tablas.dbo.t_VideoID)-- Where tvi_nLaunch=1)
		end
		else
			begin
				print '[SGSP_VideoLinkParser] Salio por ELES => if @iVideoID > 0 or @iRXimg > 0'
			end
	End

Set NoExec Off