-- =============================================
-- Author:		Rodrigo Román
-- Create date: 17/02/20156
-- Description:	Generación de reporte de test en smartmail
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SytemTestMail]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @DESKTOPEXTERNALURL varchar(250);
	declare @MAILINFORMATIVOCRA varchar(1024);
	declare @ASUNTOMAIL varchar(250);
	declare @MAILSENDER varchar(250);
	declare @MAILSENDERNAME varchar(250);
	declare @baseurl varchar(4096);
	declare @token varchar(128);

	select  @MAILINFORMATIVOCRA = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILINFORMATIVOCRA';
	
	select  @DESKTOPEXTERNALURL = par_cvalor from _tablas..t_parametros where par_ccodigo = 'URLDESKTOP';
	select  @MAILSENDER = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDER';
	select  @MAILSENDERNAME = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDERNAME';

	-- buscar el token de un administrador
	-- busco un usuario administrador
	select top 1 @token = t.accesstoken
		from _sistema..usersdesktopweb u 
		inner join _sistema..usersDesktopWebModulos m on u.udw_idkey = m.dwm_idweb
		inner join _desktop..token t on u.udw_usuario = t.userId
		where m.dwm_idmodules = 1
	
	set @token = '?oauth_token='+@token

	set @baseurl = @DESKTOPEXTERNALURL + '/handler/SystemTestHml'+@token


	-- inserto programa smartmail
	DECLARE @RC int
	DECLARE @FromName varchar(128) = @MAILSENDERNAME
	DECLARE @FromEmail varchar(128) = @MAILSENDER
	DECLARE @Subject varchar(256) = 'SOFTGUARD system test' --@ASUNTOMAIL
	DECLARE @Body varchar(4096) = @baseurl
	DECLARE @DateStart datetime = GETDATE()
	DECLARE @Count int = 0
	DECLARE @Query varchar(max) = 'Select strval As Email From _Datos.dbo.ParseArray('''+@MAILINFORMATIVOCRA+''','';'')'
	DECLARE @TransportType varchar(64) = 'MAIL'
	DECLARE @Attachments varchar(2048) = ''
	DECLARE @Priority int = 700

	-- TODO: Set parameter values here.

	EXECUTE @RC = [_datos].[dbo].[SmartMail_ProgramCreate] 
		@FromName
		,@FromEmail
		,@Subject
		,@Body
		,@DateStart
		,@Count
		,@Query
		,@TransportType
		,@Attachments
		,@Priority
		,null

	EXEC [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'SystemTestMail', @Repetition = 1440
	
END