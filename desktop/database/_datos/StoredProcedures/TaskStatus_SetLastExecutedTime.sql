CREATE OR ALTER PROCEDURE [dbo].[TaskStatus_SetLastExecutedTime]
(
	@JobName nVarChar(256),
	@Repetition int = 2,
	@Date DateTime = null,
	@Status int = 1
)
As 
Begin
	if @JobName = ''
	return;
	
	Set @Date = ISNULL(@Date, getdate())
	Declare @id Int = 0
	
	BEGIN TRANSACTION
		select @id=[Id] from _sistema.dbo.taskstatus WITH (UPDLOCK) where name = @JobName
		If @id > 0
		Begin
			If @Repetition != 2
				Update _Sistema.dbo.TaskStatus 
					Set Status = @Status, LastExecutionDate = @Date, Repetition = @Repetition Where [id] = @id
			Else
				Update _Sistema.dbo.TaskStatus
					Set Status = @Status, LastExecutionDate = @Date	Where [id] = @id
		End
		Else
			Insert Into _Sistema.dbo.taskstatus(name, status, lastexecutiondate, Repetition) Values (@JobName, 1, @Date, @Repetition)

	COMMIT
End