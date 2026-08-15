CREATE OR ALTER TRIGGER [dbo].[trg_Vigicontrol_AssignPush]
ON [dbo].[m_asignacion_movil]
AFTER INSERT, UPDATE
AS

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- me fijo si la asignacion es de un smarrttrack
	declare @objecttypeid int
	declare @objectid int
	declare @status int
	declare @idassign int
	declare @rec_iid int

	select top 1 @objecttypeid = amv_objecttypeid 
		, @objectid = amv_objectid
		,@status = amv_estado 
		,@idassign = amv_idkey 
		,@rec_iid = amv_rec_iid from inserted

	declare @message NVARCHAR(256) = '';
	select @message = Nombre from _datos..SmartTrack s where Id = @objectid

	if @objecttypeid = 3113
	BEGIN
		-- en VC inserto el push de alta
		declare @token varchar(1024)
		select @token = pushtoken from _datos..smarttrack where id = @objectid

		if @status = 1
		BEGIN
			EXEC _desktop..[createPushMessage]
				@vcId = @objectid,
				@spToken = @token,
				@msgType = 'NEW_ASSIGN',
				@badge = '0'
		END
		ELSE if @status = 2
		BEGIN
			EXEC _desktop..[createPushMessage]
				@vcId = @objectid,
				@idassign = @idassign,
				@spToken = @token,
				@msgType = 'CANCEL_ASSIGN',
				@badge = '0'
		END


	END



EXEC _desktop..AgregarTimelineAsignacionSearch
	@estado = @status ,
	@observacion = @message,
	@rec_iid = @rec_iid ,
	@amh_amv_objectid  = @objectid,
	@amh_amv_objecttypeid = @objecttypeid 
END