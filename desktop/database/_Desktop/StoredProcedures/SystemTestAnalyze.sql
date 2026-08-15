CREATE OR ALTER PROCEDURE [dbo].[SystemTestAnalyze] AS 
--Analiza los resultados del test del sistema 
--Autor .Pablo O. Canónico 09-09-2021
SET NOCOUNT ON
-- Aviso que la tarea esta funcionando	60min * 25hs * 1 dia = 1500
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'SystemTestAnalyze', @Repetition = 1500
--	

Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

Declare @name VarChar(128) = '',
		@msg VarChar(1024)
Declare @status Int = 0,
		@idCta Int = 0

DECLARE SystemTest_Cursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select [name],[status],[Message]
		From [_Sistema].[dbo].[s_SystemTest]
	Where [Message] != 'OK'
	Order By [id]

OPEN SystemTest_Cursor
FETCH NEXT FROM SystemTest_Cursor INTO @name,@status,@msg
WHILE @@FETCH_STATUS = 0
BEGIN
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SystemTestAnalyze | Control => ' +@name +' Status => '+ Rtrim(Cast(@status As Varchar(10)))+' | Mensaje => '+ Rtrim(@msg)
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set @idCta = (Select Top 1 cue_iid From [_Datos].[dbo].[m_cuentas] With (NOLOCK) Where cue_clinea='_SG' And cue_ncuenta = 'INTE')

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SystemTestAnalyze | idCta => '+ Rtrim(Cast(@idCta As Varchar(10)))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If @idCta Is Not Null
	Begin
		Declare @cObs Varchar(max) = Upper(Rtrim(@name)) + '-' + Rtrim(@msg)
		Execute [_Desktop].[dbo].[AlarmaGenerar] @idCta=@idCta, @cAlarma='_FS', @cObservaciones=@cObs
	End	
   FETCH NEXT FROM SystemTest_Cursor INTO  @name,@status,@msg
End

CLOSE SystemTest_Cursor
DEALLOCATE SystemTest_Cursor