CREATE OR ALTER PROCEDURE [dbo].[SP_BorraTimerSinProcesar] As
SET NOCOUNT ON
-- Aviso que la tarea esta funcionando	60min * 24hs *32 dias = 46080
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'BorraTimerSinProcesar', @Repetition = 46080
--	

Declare	@message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max) = ''

Declare @FechaLimite VarChar(8) = ( Select Left(CONVERT(CHARACTER, DATEADD(DAY,-7,GetDate()), 112),8) )

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | SP_BorraTimerSinProcesar | FechaLimite = '+CONVERT(varchar, @FechaLimite,120)  
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | SP_BorraTimerSinProcesar | DELETE FROM [_Datos].[dbo].[p_timer] '
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

DELETE FROM [_Datos].[dbo].[p_timer]
    WHERE tim_tfechahora <  @FechaLimite

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | SP_BorraTimerSinProcesar | DELETE FROM [_Datos].[dbo].[p_EventosTimer] '
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

DELETE FROM [_Datos].[dbo].[p_EventosTimer]
    WHERE [pet_tFechaHora] < @FechaLimite --And [pet_iStatus]=0

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | SP_BorraTimerSinProcesar | DELETE FROM [_Datos].[dbo].[SmartPanicsControlTiempo] '
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

DELETE FROM [_Datos].[dbo].[SmartPanicsControlTiempo]
    WHERE [sct_tFechaHoraLimite] < @FechaLimite

Declare  @iExecute Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='TIMEREXECUTE' )
If @iExecute = 1
Begin	
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SP_BorraTimerSinProcesar | DELETE FROM [_Datos].[dbo].[TimerHorarios] '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	DELETE FROM [_Datos].[dbo].[TimerHorarios]
		WHERE [HoraDespues] < @FechaLimite

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SP_BorraTimerSinProcesar | DELETE FROM [_Datos].[dbo].[TimerLimites]'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	DELETE FROM [_Datos].[dbo].[TimerLimites]
		WHERE [HoraLimite] < @FechaLimite --And [iStatus]=1
End

Declare @MenosQuince VarChar(8) = ( Select Left(CONVERT(CHARACTER, DATEADD(DAY,-15,GetDate()), 112),8) )

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | SP_BorraTimerSinProcesar | MenosQuince = '+CONVERT(varchar, @MenosQuince,120)  
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | SP_BorraTimerSinProcesar | DELETE FROM [_Datos].[RedirectorQueue]'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

DELETE FROM [_Datos].[dbo].[RedirectorQueue]
		WHERE [rdq_tFechaHora]  < @MenosQuince