CREATE OR ALTER PROCEDURE [dbo].[SGSP_RestoreDB]
	@DBName VarChar(100) = '',
	@RenameDBName VarChar(100) = '',
	@MoveDBPath VarChar(100) = ''
WITH EXECUTE AS CALLER
AS
--Rutina de restore
--Autor : Pablo O. Canónico
--Fecha : 25/07/2019
/*
--Restore normal
Exec [SGSP_RestoreDB] @DBName='_Datos'
--Restore con rename de la base
Exec [SGSP_RestoreDB] @DBName='_Datos', @RenameDBName='_Datos2'
--Restore con rename de la base y a otra carpeta
Exec [SGSP_RestoreDB] @DBName='_Datos', @RenameDBName='_Datos2', @MoveDBPath='C:\Temp'
*/
Set NoCount ON
BEGIN TRY
	Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

	If @DBName Not IN('_Audit','_Datos','_Desktop','_History','_LogDB','_Sistema','_Tablas')
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Restore de ['+@DBName+'] | DB no Valida'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

	Declare @BupDir VarChar(500) = (Select par_cValor From _Tablas.dbo.t_parametros Where par_cCodigo ='PATHBACKUPSDB')	--C:\Data\Bup
    
	If @RenameDBName != '' And @MoveDBPath = ''
        Set @MoveDBPath = @BupDir

	If Right(Rtrim(@MoveDBPath),1) != '\'
		Set @MoveDBPath += '\'

	If @RenameDBName = ''
	Begin
		Set @message = 'Start DateTime : %s | Restore de ['+@DBName+'] | Normal'

		Execute [SGSP_RestoreGenerator] @Database=@DBName, @WithReplace=1, @RestoreScriptOnly = 1, @WithRecovery = 1
	End
	Else
	Begin
		Set @message = 'Start DateTime : %s | Restore de ['+@DBName+'] | Rename DB'
		
		Execute [SGSP_RestoreGenerator] @Database=@DBName, @WithReplace=1, @RestoreScriptOnly = 1, @WithRecovery = 1, @WithMoveDataFiles = @MoveDBPath, @WithMoveLogFile = @MoveDBPath, @TargetDatabase = @RenameDBName
	End

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Set NoExec Off

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