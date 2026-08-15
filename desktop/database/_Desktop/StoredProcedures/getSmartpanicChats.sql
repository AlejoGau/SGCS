-- =============================================
-- Author:		Rodrigo Román
-- Create date: 2021/01/28
-- Description:	Obtiene los chats de un usuario (token)
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[getSmartpanicChats]
	-- Add the parameters for the stored procedure here
	@spid int,
	@status int = 0,
	@token varchar(1024)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [chs_idKey]
      ,[chs_createDate]
      ,[chs_lastModification]
      ,[chs_reciid]
      ,[chs_name]
      ,[chs_status]
	  ,u.udw_nombre+' '+u.udw_apellido as username
	FROM [_Datos].[dbo].[p_ChatSession] 
	inner join [_Datos].[dbo].p_ChatMembers cm on chs_idKey = cm.chm_chatid
	left join [_Datos].[dbo].p_ChatMembers cmo on chs_idKey = cmo.chm_chatid and cmo.chm_objectType = 3050
	left join _sistema..UsersDesktopWeb u on cmo.chm_objectId = udw_idKey
	where cm.chm_objectType = 3067
		and cm.chm_objectId = @spid
		and (@status = 0 OR chs_status = @status)
    order by chs_idKey DESC

END