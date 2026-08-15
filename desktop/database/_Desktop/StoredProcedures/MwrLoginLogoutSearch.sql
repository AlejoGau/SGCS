CREATE OR ALTER PROCEDURE [dbo].[MwrLoginLogoutSearch]
@userId VARCHAR(255) = '',
@login INT = 0,
@logout INT = 0
AS
BEGIN

	IF @login != 0
	BEGIN
		INSERT INTO _audit..[FrameworkAudit] VALUES (1,1,0,'WebRemoto',7,GETDATE(),null,null)
		INSERT INTO _audit..[FrameworkAuditExtend] (Id,UserNAme) VALUES (SCOPE_IDENTITY(),@userId)
	END
	ELSE IF @logout != 0
	BEGIN
		INSERT INTO _audit..[FrameworkAudit] VALUES (1,1,0,'WebRemoto',8,GETDATE(),null,null)
		INSERT INTO _audit..[FrameworkAuditExtend] (Id,UserNAme) VALUES (SCOPE_IDENTITY(),@userId)
	END
END