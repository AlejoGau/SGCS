--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2024-04-23
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SysInfoHandler_getLastUserLoggedIn]  (
		@sUsername varchar(100) = '' OUTPUT
		,@dAuditDate Varchar(50) = NULL OUTPUT
	)
AS
BEGIN
	SET NOCOUNT ON

	SELECT TOP 1 @sUsername = UserName, @dAuditDate = CONVERT(VARCHAR(19), AuditDate, 120)
	FROM FrameworkAudit o
	LEFT JOIN FrameworkAuditExtend e on o.Id = e.Id   
	LEFT JOIN _Sistema.dbo.UsersDesktopWeb u on e.UserName=u.udw_usuario COLLATE SQL_Latin1_General_CP1_CI_AS
	INNER JOIN [Object] oj on oj.Id = o.ObjectTypeId 
	INNER JOIN [function] f on f.Id = o.FunctionId and f.id = 7
	LEFT JOIN _Datos..m_cuentas c on o.ObjectId = c.cue_iid
	WHERE 1 = 1
	ORDER BY O.id DESC
END