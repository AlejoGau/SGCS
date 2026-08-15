-- =============================================
-- Author:		Rodrigo Román
-- Create date: 21/01/2021
-- Description:	Genera un chat entre operador y smartpanics, con evento asociado.
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[chatEventoCreate]
	-- Add the parameters for the stored procedure here
	@rec_iid int,
	@oper_idusuario int,
	@sp_idkey int
AS
BEGIN
	SET NOCOUNT ON;

	declare @create datetime;
	select @create = getdate()

	declare @name nvarchar(255)
	declare @chs_idkey int
	declare @awccuser int;
	select @name = cod_cdescripcion from _datos..EventosPendientes where rec_iid = @rec_iid 
	select @awccuser = awccuserid from _datos..SmartPanic where id = @sp_idkey

	if @awccuser>0
	begin
		print '[chatEventoCreate] cierro los canales de chat del mismo evento'
		update  [_Datos]..[p_ChatSession] set [chs_status]=2,[chs_lastModification]=getdate() where [chs_reciid] = @rec_iid

		print '[chatEventoCreate] inserto el channel de chat'
		INSERT INTO [_Datos]..[p_ChatSession]
			   ([chs_createDate]
			   ,[chs_lastModification]
			   ,[chs_reciid]
			   ,[chs_name]
			   ,[chs_status])
		 VALUES
			   (@create
			   ,@create
			   ,@rec_iid
			   ,@name
			   ,1)
		select @chs_idkey = SCOPE_IDENTITY()

		print '[chatEventoCreate] Agrego el operador al canal'
		INSERT INTO [_Datos].[dbo].[p_ChatMembers]
			   ([chm_objectType]
			   ,[chm_objectId]
			   ,[chm_status]
			   ,[chm_isAdmin]
			   ,chm_chatid)
		 VALUES
			   (3050
			   ,@oper_idusuario
			   ,1
			   ,1
			   ,@chs_idkey)

		print '[chatEventoCreate] Agrego el smartpanics al canal'
		INSERT INTO [_Datos].[dbo].[p_ChatMembers]
			   ([chm_objectType]
			   ,[chm_objectId]
			   ,[chm_status]
			   ,[chm_isAdmin]
			   ,chm_chatid)
		 VALUES
			   (3067
			   ,@sp_idkey
			   ,1
			   ,0
			   ,@chs_idkey)

		print '[chatEventoCreate] Envío un push al sp'
		DECLARE @RC int

		EXECUTE @RC = [_Desktop].[dbo].[createPushMessage] 
		   @sp_idkey --spid
		  ,null		--vcod
		  ,''		--token
		  ,'START_CHAT'		--msgType
		  ,@name	--data
		  ,null
		  ,'Nuevo chat' -- title
		  ,0		--idassign
		  ,0		--idSurvey



		select * from _Datos..p_ChatSession where chs_idKey = @chs_idkey
	END
	ELSE
	BEGIN
		select 1 as error, 'No hay usuario asociado final asociado al smartpanics' as message
	END
END