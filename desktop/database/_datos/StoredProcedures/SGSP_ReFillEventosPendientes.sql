CREATE OR ALTER PROCEDURE [dbo].[SGSP_ReFillEventosPendientes]
WITH EXECUTE AS CALLER
AS
--ReFill con los eventos pendientes que quedaron en pRecepcion
--Autor : Pablo O. Canónico
--Fecha : 02/10/2018
--2024-01-18 : Pablo. Se agrego control sobre eventospendientes sin pRecepcion
Set NoCount ON
BEGIN TRY

-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ReFillEventosPendientes', @Repetition = 10
--

Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

Declare  @iExecute Int = ( Select Count(*) From [_Datos].[dbo].[p_Recepcion] With (NOLOCK)
							Where [rec_nEstado] = 0	And [rec_iid] Not In (Select [rec_iid] From [_Datos].[dbo].[EventosPendientes] With (NOLOCK)) )
If @iExecute = 0
Begin	
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | ReFillEventosPendientes | No hay eventos'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set NoExec On
End

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --ReFill con los eventos pendientes que quedaron en pRecepcion--'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Declare TmpCursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY 
	For Select rec_iid From [_Datos].[dbo].[p_Recepcion] With (NOLOCK)
		Where [rec_nEstado] = 0
		And [rec_iid] Not In (Select [rec_iid] From [_Datos].[dbo].[EventosPendientes] With (NOLOCK)) 

Declare @idRec Int
Open TmpCursor
FETCH NEXT FROM  TmpCursor INTO @idRec
WHILE @@FETCH_STATUS = 0
Begin	
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | SGSP_Fill_EventosPendientes  '+Cast(@idRec As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Execute SGSP_Fill_EventosPendientes @idRec, 0

	FETCH NEXT FROM  TmpCursor INTO @idRec
End
Close TmpCursor
Deallocate TmpCursor

Set NoExec Off
----------------------------------

Select @iExecute=Count(*) from [_Datos].[dbo].[EventosPendientes] With (NOLOCK)
	Where [rec_nEstado] = 0
    And [rec_iid] Not In (Select [rec_iid] From [_Datos].[dbo].[p_recepcion] With (NOLOCK)) 

If @iExecute = 0
Begin	
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | ReFillEventosPendientes | EventosPendientesSinPRecepcion | No hay eventos'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set NoExec On
End

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | ReFillEventosPendientes | EventosPendientesSinPRecepcion | Elimino eventos pendientes que no quedaron en pRecepcion'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Declare TmpCursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY 
	For Select rec_iid from [_Datos].[dbo].[EventosPendientes] With (NOLOCK)
		Where [rec_nEstado] = 0
		And [rec_iid] Not In (Select [rec_iid] From [_Datos].[dbo].[p_recepcion] With (NOLOCK)) 

Set @idRec = 0
Open TmpCursor
FETCH NEXT FROM  TmpCursor INTO @idRec
WHILE @@FETCH_STATUS = 0
Begin	
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | EventosPendientes.rec_iid = '+Cast(@idRec As Varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Delete From [_Datos].[dbo].[EventosPendientes] Where rec_iid=@idRec

	FETCH NEXT FROM  TmpCursor INTO @idRec
End
Close TmpCursor
Deallocate TmpCursor



END TRY
BEGIN CATCH
	IF ERROR_NUMBER() = 2627
	BEGIN
		PRINT 'Handling PK violation...';
	END;
	ELSE IF ERROR_NUMBER() = 547
	BEGIN
		PRINT 'Handling CHECK/FK constraint violation...';
	END;
	ELSE IF ERROR_NUMBER() = 515
	BEGIN
		PRINT 'Handling NULL violation...';
	END;
	ELSE IF ERROR_NUMBER() = 245
	BEGIN
		PRINT 'Handling conversion error...';
	END;
	ELSE
	BEGIN
		PRINT 'Re-throwing error...';
	END;

	PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
	PRINT 'Error Message : ' + ERROR_MESSAGE();
	PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
	PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
	PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
	PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
END CATCH