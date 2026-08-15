CREATE OR ALTER TRIGGER [dbo].[Trg_token_logout] ON [dbo].[Token] instead of DELETE AS
BEGIN
	declare @objectId int;
	declare @userId varchar(255);
	declare @date datetime = GETDATE();
	declare @token varchar(500);
	print '[Trg_token_logout] inicio'
	select @userId = UserId, @token = AccessToken  FROM DELETED;

	print '[Trg_token_logout] llamo a [SearchAtencionEventoDevolverTodosMonitoreo]'
	DECLARE @tmpNewValue TABLE (Error int, Message varchar(50))
	insert into @tmpNewValue EXEC _desktop..[SearchAtencionEventoDevolverTodosMonitoreo]
		@token = @token,
		@method = N'POST'
	print '[Trg_token_logout] fin [SearchAtencionEventoDevolverTodosMonitoreo]'
	--select @objectId = udw_idkey from _Sistema.dbo.[UsersDesktopWeb] where udw_usuario = @userId
	if (@userId is NOT NULL AND @userId != '')
	BEGIN
		print '[Trg_token_logout] inserto en [FrameworkAudit] y extend'
		INSERT INTO _audit..[FrameworkAudit] VALUES (1,1,0,'UsersDesktopWeb',8,@date,null,null)
		INSERT INTO _audit..[FrameworkAuditExtend] (Id,UserNAme) VALUES (SCOPE_IDENTITY(),@userId)
	END
	print '[Trg_token_logout] borro el registro de _datos..token'
	delete from _datos..token where AccessToken = @token
	print '[Trg_token_logout] fin'
END