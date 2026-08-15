--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.240 
--#############################################################################


CREATE OR ALTER PROCEDURE [dbo].[AlarmaSMS]
@idCta Int=0, @cCodigoAlarma Char(3)='', @idRec int = 0 As
SET NOCOUNT ON

--Mail x Evento
Declare @Query NVARCHAR(255)
Declare @cFrom NVARCHAR(150)
Declare @cFromName NVARCHAR(100)
Declare @cTo NVARCHAR(150)
Declare @cSubject NVARCHAR(100)
Declare @cMessageMerge NVARCHAR(4000)
Declare @cMail As NVARCHAR(160)
Declare @nFin As int
Declare @cFecha Char(10)
Declare @cHora Char(10)
Declare @iEnviaMail Int
Declare @dDiaHoy DateTime
Set @dDiaHoy = GetDate()
Set @cFecha=(Select Convert(Char(10), @dDiaHoy,103))
Set @cHora=(Select Convert(Char(10), @dDiaHoy,108))

Select @iEnviaMail = par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MAILSERVICE'

If @iEnviaMail = 2 --Utiliza SM y Plantillas
Begin
	set @cFrom = ( Select Cast(par_cvalor As NVARCHAR(150)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER')
	set @cFrom = Ltrim(Rtrim(@cFrom))

	Set @cFromName = ( Select Cast(par_cvalor As NVARCHAR(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
	Set @cFromName = Ltrim(Rtrim(@cFromName))

	Declare @cDestino NVARCHAR(150)
	Declare @cPlantilla Char(3)
	Declare cMailxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	  	Select sms_cmailparaeventos,sms_cplantillamail,pls_cdescripcion From _Datos.dbo.m_sms
			Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cplantillamail
 		  Where ( CHARINDEX(@cCodigoAlarma, sms_meventos) > 0  Or
				 ( sms_iNotificarAlertas=1 And @cCodigoAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And cod_nalerta=1)))
					  And sms_cmailparaeventos<> ''  And sms_cplantillamail<>'' And sms_iidCuenta=@idCta 
	
	Open cMailxEvento
	Fetch Next From cMailxEvento Into @cDestino,@cPlantilla,@cSubject
	While @@FETCH_STATUS = 0
	Begin
		Set @cMail = @cDestino +';'
		WHILE CHARINDEX(';',@cMail) > 0
		Begin
			Set @nFin = CHARINDEX(';',@cMail)	
			
			Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
		
			Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'

			EXEC _Datos.dbo.SGSP_TextMerge	@idCta,'',@cCodigoAlarma,@cPlantilla,@cFecha,@cHora,@idRec, @cMessageMerge OUTPUT
			If @cMessageMerge Is Null
				Set @cMessageMerge = @cSubject

			EXEC _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @dDiaHoy, 1, @Query, 'MAIL', null,900,@idCta

			Set @cMail = SUBSTRING( @cMail, @nFin+1, 100-@nFin );
		End
	
	   Fetch Next From cMailxEvento Into @cDestino,@cPlantilla,@cSubject
	End
	Close cMailxEvento
	Deallocate cMailxEvento
End	
--

--SMS x Evento
Declare @cDestinoSMS NVARCHAR(150)
Declare @cToSMS NVARCHAR(160)
Declare @iModemSMS As int

Declare cSMSxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	Select sms_csmsparaeventos,sms_cplantillasms,pls_cdescripcion,sms_imodemsms From _Datos.dbo.m_sms
		Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cplantillasms
		  Where ( CHARINDEX(@cCodigoAlarma, sms_meventos) > 0  Or
				 ( sms_iNotificarAlertas=1 And @cCodigoAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And cod_nalerta=1)))
					  And sms_csmsparaeventos<>'' And sms_cplantillasms<>'' And sms_imodemsms>0 And sms_iidCuenta=@idCta 
	
Open cSMSxEvento
Fetch Next From cSMSxEvento Into @cDestino,@cPlantilla,@cSubject,@iModemSMS
While @@FETCH_STATUS = 0
Begin

	Set @cToSMS = Ltrim(Rtrim(@cDestino))+';'
	WHILE CHARINDEX(';',@cToSMS) > 0 
	BEGIN
		Set @nFin = CHARINDEX(';',@cToSMS)	
		Set @cDestinoSMS = SUBSTRING( @cToSMS, 1, @nFin-1 )

		EXEC _Datos.dbo.SGSP_TextMerge	@idCta,'',@cCodigoAlarma,@cPlantilla,@cFecha,@cHora,@idRec, @cMessageMerge OUTPUT
		If @cMessageMerge Is Null
			Set @cMessageMerge = @cSubject

		EXEC _Datos.dbo.SGSP_SaveSMSQueue @idCta,@iModemSMS,@cMessageMerge,@cDestinoSMS

		Set @cToSMS = SUBSTRING( @cToSMS, @nFin+1, 150-@nFin )
	END

	Fetch Next From cSMSxEvento Into @cDestino,@cPlantilla,@cSubject,@iModemSMS
End
Close cSMSxEvento
Deallocate cSMSxEvento

----Basado _Desktop.dbo.AlarmaSMS
----Autor :Pablo O. Canónico
----Fecha :09/03/2013
--SET NOCOUNT ON

----Mail x Evento
--Declare @Query NVARCHAR(255)
--Declare @cFrom NVARCHAR(150)
--Declare @cFromName NVARCHAR(100)
--Declare @cTo NVARCHAR(150)
--Declare @cSubject NVARCHAR(100)
--Declare @cMessageMerge NVARCHAR(4000)
--Declare @cMail As NVARCHAR(160)
--Declare @nFin As int
--Declare @cFecha Char(10)
--Declare @cHora Char(10)
--Declare @iEnviaMail Int
--Declare @dDiaHoy DateTime
--Set @dDiaHoy = GetDate()
--Set @cFecha=(Select Convert(Char(10), @dDiaHoy,103))
--Set @cHora=(Select Convert(Char(10), @dDiaHoy,108))

--Select @iEnviaMail = par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MAILSERVICE'

--If @iEnviaMail = 2 --Utiliza SM y Plantillas
--Begin
--	set @cFrom = ( Select Cast(par_cvalor As NVARCHAR(150)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER')
--	set @cFrom = Ltrim(Rtrim(@cFrom))

--	Set @cFromName = ( Select Cast(par_cvalor As NVARCHAR(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
--	Set @cFromName = Ltrim(Rtrim(@cFromName))

--	Declare @cDestino NVARCHAR(150)
--	Declare @cPlantilla Char(3)
--	Declare cMailxEvento CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
-- 		Select sms_cmailparaeventos,sms_cplantillamail,pls_cdescripcion From _datos..m_sms
--			Inner Join _Tablas.dbo.t_plantillas_sms On pls_ccodigo=sms_cplantillamail
-- 			Where ( CHARINDEX(@cCodigoAlarma, sms_meventos) > 0  Or
--			( sms_iNotificarAlertas=1 And @cCodigoAlarma IN (Select cod_ccodigo From _Tablas.dbo.t_codigos_alarma Where cod_ccodigo=@cCodigoAlarma And cod_nalerta=1)))
--				And sms_cmailparaeventos<> ''  And sms_cplantillamail<>'' And sms_iidCuenta=@idCta 
	
--	Open cMailxEvento
--	Fetch Next From cMailxEvento Into @cDestino,@cPlantilla,@cSubject
--	While @@FETCH_STATUS = 0
--	Begin
--		Set @cMail = @cDestino +';'
--		WHILE CHARINDEX(';',@cMail) > 0
--		Begin
--			Set @nFin = CHARINDEX(';',@cMail)
--			Set @cTo=SUBSTRING( @cMail, 1, @nFin-1 )
--			Set @Query = 'Select '+CHAR(39)+@cTo+CHAR(39)+' As Email'

--			EXEC _Datos.dbo.SGSP_TextMerge @idCta,'',@cCodigoAlarma,@cPlantilla,@cFecha,@cHora,@idRec, @cMessageMerge OUTPUT
--			If @cMessageMerge Is Null
--				Set @cMessageMerge = @cSubject

--			EXEC _Datos.dbo.SmartMail_ProgramCreate @cFromName, @cFrom, @cSubject, @cMessageMerge, @dDiaHoy, 1, @Query, 'MAIL', null,900,@idCta

--			Set @cMail = SUBSTRING( @cMail, @nFin+1, 100-@nFin );
--		End
--	Fetch Next From cMailxEvento Into @cDestino,@cPlantilla,@cSubject
--	End

--Close cMailxEvento
--Deallocate cMailxEvento

--End