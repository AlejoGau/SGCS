CREATE OR ALTER PROCEDURE [dbo].[EnviarEventoADealer]
@rec_iid INT = 0,
@dealer varchar(3) = '',
@subject varchar(255) = 'Procesamiento de evento',
@cuentaId int = 0
AS
BEGIN
 -- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @DESKTOPEXTERNALURL varchar(250);
	declare @ASUNTOREPORTEAUTOMATICO varchar(250);
	declare @MAILSENDER varchar(250);
	declare @MAILSENDERNAME varchar(250);
	declare @baseurl varchar(4096);
	declare @token varchar(128);
	declare @DDDCCCCASUNTOMAIL int;
	declare @REPAUTRESOLUCION int;
	declare @REPAUTCAT int;
	declare @REPAUTFIRMA int;


	-- me fijo si debe ejecutar o no
	declare @REPORTEAUTOMATICOSERVICE int;
	select  @REPORTEAUTOMATICOSERVICE = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPORTEAUTOMATICOSERVICE';


	if (@REPORTEAUTOMATICOSERVICE = 0)
	BEGIN
	SET NOEXEC ON
	RETURN
	END
	



	
	select  @DESKTOPEXTERNALURL = par_cvalor from _tablas..t_parametros where par_ccodigo = 'URLDESKTOP';
	select  @ASUNTOREPORTEAUTOMATICO = par_cvalor from _tablas..t_parametros where par_ccodigo = 'ASUNTOREPORTEAUTOMATICO';
	select  @MAILSENDER = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDER';
	select  @MAILSENDERNAME = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDERNAME';
	select  @DDDCCCCASUNTOMAIL = par_ivalor from _tablas..t_parametros where par_ccodigo = 'DDDCCCCASUNTOMAIL';
	select  @REPAUTRESOLUCION = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPAUTRESOLUCION';
	select  @REPAUTCAT = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPAUTCAT';
	select  @REPAUTFIRMA = par_ivalor from _tablas..t_parametros where par_ccodigo = 'REPAUTFIRMA';
	
	-- buscar el token de un administrador
	-- busco un usuario administrador
	select top 1 @token = t.accesstoken
		from _sistema..usersdesktopweb u 
		inner join _sistema..usersDesktopWebModulos m on u.udw_idkey = m.dwm_idweb
		inner join _desktop..token t on u.udw_usuario = t.userId
		where m.dwm_idmodules = 1
	
	set @token = '&oauth_token='+@token

	set @baseurl = @DESKTOPEXTERNALURL + '/handler/ReporteProcesamientoEventoHtml?eventId='+ CONVERT(varchar(10), @rec_iid)+@token
	
	DECLARE @emailDealer varchar(255);
	select @emailDealer = lin_cmail FROM _Tablas..t_lineas where lin_ccodigo = @dealer
	

	IF @emailDealer is null or @emailDealer = ''
	begin
		select 1 Error, 'El dealer no tiene email definido' Message
		return;	
	end

	DECLARE @FromName varchar(128) = @MAILSENDERNAME
	DECLARE @FromEmail varchar(128) = @MAILSENDER
	DECLARE @Body varchar(4096) = @baseurl
	DECLARE @DateStart datetime = GETDATE()
	DECLARE @Count int = 0
	DECLARE @Query varchar(max) = 'Select strval As Email From _Datos.dbo.ParseArray('''+@emailDealer+''','';'')'
	DECLARE @TransportType varchar(64) = 'MAIL'
	DECLARE @Attachments varchar(2048) = ''
	DECLARE @Priority int = 700
	DECLARE @RC INT;
	
	print @baseurl;
	


		EXECUTE @RC = [_datos].[dbo].[SmartMail_ProgramCreate] 
		   @FromName
		  ,@FromEmail
		  ,@subject
		  ,@Body
		  ,@DateStart
		  ,@Count
		  ,@Query
		  ,@TransportType
		  ,@Attachments
		  ,@Priority
		  ,@cuentaId

	-- actualizo tabla de tareas con la ultima ejecución
	EXEC [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ReporteAutomaticoExec', @Repetition = 2
	
END