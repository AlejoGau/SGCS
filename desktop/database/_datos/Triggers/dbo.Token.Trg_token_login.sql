CREATE OR ALTER TRIGGER [dbo].[Trg_token_login] ON [dbo].[Token] AFTER INSERT, UPDATE AS
BEGIN
	declare @objectId int;
	declare @userId nVarChar(255);
	declare @date datetime = GETDATE();
	declare @ip varchar(20) = '';

	select @userId = UserId, @ip = [UserData]   FROM INSERTED;

	--select @objectId = udw_idkey from _Sistema.dbo.[UsersDesktopWeb] where udw_usuario = @userId
	if (@userId is NOT NULL AND @userId != '')
	BEGIN
		INSERT INTO _audit..[FrameworkAudit] VALUES (1,1,0,'UsersDesktopWeb',7,@date,'<Object><Data><Ip></Ip></Data></Object>','<Object><Data><Ip>'+@ip+'</Ip></Data></Object>')
		INSERT INTO _audit..[FrameworkAuditExtend] (Id,UserNAme) VALUES (SCOPE_IDENTITY(),@userId)
	END
END