CREATE OR ALTER PROCEDURE [dbo].[SGSP_VideoLinkParser] @iRecID int As
--Verifica si el evento tiene asociado links de video para D-Guard
--Autor :Pablo O. Canónico
--Fecha :19/02/2015
--Se modifico para devolver links de video para poder usarlo en DSSVideoLauncher 
SET NOCOUNT ON

If (Select par_ivalor FROM _Tablas.dbo.t_parametros WHERE par_cCodigo='UTILIZAVI') = 0
	Set NoExec On


Declare @idCta   Int
Declare @cAlarma Char(3)
Declare @cZona	 Char(3)
Declare @iRXimg  Int

Select  @idCta = rec_iidcuenta, @cAlarma = rec_calarma, @cZona = rec_czona From _Datos.dbo.p_recepcion
	Where rec_iid = @iRecID

Select @iRXimg = Count(*) From _Datos.dbo.p_RXImg Where rxi_iRecId = @iRecID

If @idCta > 0
	Begin
		Declare @cData	  nVarChar(200)
		Declare @cLink	  nVarChar(200)
		declare @cLinkDSS nVarChar(2000)
		Declare @bEsDG	Bit
		--Set @bEsDG = 1  /* True */
		Set @bEsDG = 0  /* False */
		Declare @nLaunch Integer

		--Me fijo si se configuro video para la alarma
		Select @cData = cuv_clink,@cLinkDSS = cuv_cLinkDSS, @nLaunch = tvi_nLaunch From _Datos.dbo.m_cuentas_video
			Inner Join _Tablas.dbo.t_VideoID  ON cuv_iVideoID = tvi_iid
			Where CHARINDEX(@cAlarma, cuv_meventos) > 0 And cuv_iidCuenta = @idCta

		--Busco por Alarma-Zona
		Select @cLink = cvl_clink From _Datos.dbo.m_cuentas_video_links
			Where cvl_calarma = @cAlarma And cvl_czona = @cZona
					And cvl_iidCuenta  = @idCta

		Declare @cSaveImageRX nVarChar(200)
		Set @cSaveImageRX = ''
		
		If @iRXimg > 0
			Select r.*, @cLinkDSS As cuv_cLinkDSS, @nLaunch As tvi_nLaunch From _Datos.dbo.p_RXImg r Where rxi_iRecId = @iRecID
		Else
			Begin
				--Veo si es D-Guard
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

				--Si hay info y es D-Guard inserto en RXImg
				If @cSaveImageRX <> '' And @bEsDG = 1
					Begin
						Insert Into _Datos.dbo.p_RXImg (rxi_iRecId,rxi_cImg,rxi_cCarpeta,rxi_nEstado) Values (@iRecID,Left(@cSaveImageRX,200),'[D-Guard]',1)
						Select r.*,@cLinkDSS As cvl_cLinkDSS, @nLaunch As tvi_nLaunch From _Datos.dbo.p_RXImg r Where rxi_iId = @@IDENTITY
					End	

				--Si no es DGuard tengo que traer los IMG que no entraron en RxImg
				If (Upper(Left(@cData,3))='IMG' And @bEsDG = 0)
					Begin
						Declare @cMiscPath nVarChar(100)
						Set @cMiscPath = ( Select Ltrim(par_cValor) From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='SEARCHSOFTGUARDMISCFILE' ) + '\Video\'
       
						Select Top 1 0 As rxi_iId, @iRecID As rxi_iRecId, '' As rxi_cImg, @cMiscPath+gri_ccarpeta As rxi_cCarpeta, 1 As rxi_nEstado, 'jpg' As rxi_cTipo, Null As rxi_cConfig, @cLinkDSS As cuv_cLinkDSS, @nLaunch As tvi_nLaunch 
							From p_grabacion_img Where gri_iidrecepcion = @iRecID
					End
			End 

		--Tengo que devolver el link de video que tiene configurado para poder usarlo en DSSVideoLauncher 
		If @cLink <>''	
			Set @cSaveImageRX = @cLink
		Else
			If @cData <>''
				Set @cSaveImageRX = @cData
		
		Select @cSaveImageRX As cLinkVideo, @cLinkDSS as cvl_cLinkDSS, @nLaunch As tvi_nLaunch, cue_cLinea, cue_nCuenta, rec_cContenido, rec_iid, Case When ipc_cremotehostip <> '' Then ipc_cremotehostip Else '(nada)' End As cRemoteHostIP
			  From _Datos.dbo.m_cuentas
			  Inner Join  _Datos.dbo.p_recepcion On rec_iid=@iRecID
			  Left Outer Join _Tablas.dbo.t_ip_con On ipc_nport = [rec_iPuerto]		
			Where cue_iid = @idCta 
			  And Left(@cSaveImageRX,3) In ( Select Left(tvi_cdescripcion,3) FROM _Tablas.dbo.t_VideoID Where tvi_nLaunch=1)

	End

Set NoExec Off