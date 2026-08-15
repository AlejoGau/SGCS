-- =============================================
-- Author:		Rodrigo Román
-- Create date: 18/11/2015
-- Description:	Generación de aviso programado
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[AvisoProgramadoExec]

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

	select  @DESKTOPEXTERNALURL = par_cvalor from _tablas..t_parametros With (NOLOCK) where par_ccodigo = 'URLDESKTOP';
	select  @MAILSENDER = par_cvalor from _tablas..t_parametros With (NOLOCK) where par_ccodigo = 'MAILSENDER';
	select  @MAILSENDERNAME = par_cvalor from _tablas..t_parametros With (NOLOCK) where par_ccodigo = 'MAILSENDERNAME';
	
	-- buscar el token de un administrador
	-- busco un usuario administrador
	select top 1 @token = t.accesstoken
		from _sistema..usersdesktopweb u With (NOLOCK)
		inner join _sistema..usersDesktopWebModulos m on u.udw_idkey = m.dwm_idweb
		inner join _desktop..token t on u.udw_usuario = t.userId
		where m.dwm_idmodules = 1
	
	set @token = 'oauth_token='+@token

	set @baseurl = @DESKTOPEXTERNALURL + '/handler/AvisoProgramadoHTML?'+@token

	-- declaro las variables
	declare @Name varchar(128)
	declare @Id int
	declare @prg_from varchar(256)
	declare @prg_to varchar(1024)
	declare @prg_mensaje varchar(MAX)


	-- envío los diarios
	DECLARE aviso_cursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
		SELECT Id,Name,prg_from,prg_to,prg_mensaje
			from _Datos..m_aviso_programado s 
		where prg_mensaje != '' and prg_estado=0 And prg_prgdatetime<= getDate()
	
	OPEN aviso_cursor
	FETCH NEXT FROM aviso_cursor INTO @Id,@Name,@prg_from,@prg_to,@prg_mensaje

	WHILE @@FETCH_STATUS = 0
	BEGIN
		declare @url varchar(4096);
		declare @fechadesde varchar(128);
		declare @fechahasta varchar(128);
		declare @tipo varchar(128);

		set @url = @baseurl + '&filter=[{"property":"o.Id","value":"'+CONVERT(varchar(10), @Id) +'"}]';

		-- actualizo el programa como enviado
		update _Datos..m_aviso_programado WITH (UPDLOCK) set prg_estado=1, prg_enviodatetime = GETDATE() where Id = @Id

		-- filtro fecha hasta
		set @fechahasta = '&FechaHasta='+CONVERT(varchar(10),GETDATE(),126) 

		--print @url 

		-- inserto programa smartmail
		DECLARE @RC int
		DECLARE @FromName varchar(128) = @MAILSENDERNAME
		DECLARE @FromEmail varchar(128) = @MAILSENDER
		DECLARE @Subject varchar(256) = @Name
		DECLARE @Body varchar(4096) = @url
		DECLARE @DateStart datetime = GETDATE()
		DECLARE @Count int = 0
		DECLARE @Query varchar(max) = 'Select strval As Email From _Datos.dbo.ParseArray('''+@prg_to+''','';'')'
		DECLARE @TransportType varchar(64) = 'MAIL'
		DECLARE @Attachments varchar(2048) = ''
		DECLARE @Priority int = 700

		-- TODO: Set parameter values here.

		EXECUTE @RC = [_datos].[dbo].[SmartMail_ProgramCreate] @FromName,@FromEmail,@Subject,@Body,@DateStart,@Count,@Query,@TransportType,@Attachments,@Priority,null
		
		FETCH NEXT FROM aviso_cursor INTO @Id,@Name,@prg_from,@prg_to,@prg_mensaje 
	END
	CLOSE aviso_cursor;
	DEALLOCATE aviso_cursor;

	-- actualizo tabla de tareas con la ultima ejecución
	EXEC [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'AvisoProgramadoExec', @Repetition = 2
END