-- =============================================
-- Author:		Rodrigo Román
-- Create date: 2021/01/28
-- Description:	Obtiene los mensajes de un chat
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[getChatMessages]
	-- Add the parameters for the stored procedure here
	@chatid int,
	@token varchar(1024)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [cms_idKey]
      ,[cms_message]
      ,[cms_status]
      ,[cms_dateCreated]
      ,[cms_fromObjectType]
      ,[cms_fromObjectId]
	  ,[chs_idKey]
      ,[chs_createDate]
      ,[chs_lastModification]
      ,[chs_reciid]
      ,[chs_name]
      ,[chs_status]
	  ,isnull(sp.Nombre, udw_nombre +' '+ udw_apellido) as username
	FROM [_Datos].[dbo].p_chatMessages
		left join [_Datos].[dbo].[p_ChatSession] with (nolock) on cms_chatid = chs_idkey -- securizar con inner
		left join [_Datos].[dbo].p_ChatMembers with (nolock) on cms_chatid = chm_chatid and cms_fromObjectType = chm_objectType and cms_fromObjectId = chm_objectId -- securizar con inner
		left join _Datos..SmartPanic sp with (nolock) on (id = chm_objectId and chm_objectType = 3067)
		left join _Sistema..UsersDesktopWeb with (nolock) on (chm_objectId = udw_idKey  and chm_objectType = 3050)
	where chs_idKey=@chatid
END