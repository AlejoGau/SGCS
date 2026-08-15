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

	If Not Exists(select * from _sistema.dbo.taskstatus where name = @JobName)
		Insert Into _Sistema.dbo.taskstatus(name, status, lastexecutiondate, Repetition) Values (@JobName, 1, @Date, @Repetition)
	Else 
		If @Repetition != 2
			Update _Sistema.dbo.TaskStatus 
				Set Status = @Status, LastExecutionDate = @Date, Repetition = @Repetition Where Name = @JobName
		Else
			Update _Sistema.dbo.TaskStatus
				Set Status = @Status, LastExecutionDate = @Date	Where Name = @JobName
End