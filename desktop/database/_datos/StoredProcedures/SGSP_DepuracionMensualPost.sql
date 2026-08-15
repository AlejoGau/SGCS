CREATE OR ALTER PROCEDURE [dbo].[SGSP_DepuracionMensualPost] AS
--Elimina registros de tablas inexistentes y crea depurados a futuro
--Autor :Pablo O. Canónico
--Fecha :20/02/2019

SET NOCOUNT ON
-- Aviso que la tarea esta funcionando	60min * 24hs *32 dias = 46080
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'DepuracionMensualPost', @Repetition = 46080
--	
DBCC TRACEON (1224)

Declare @cSQL nVarChar(Max) = '',
   		@message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max) = ''

Declare @nError Int = 0,
	   @iMax Int = 0,
	   @iLoop Int = 0,
	   @DeleteTop int = 10000,
	   @iTop Int = 30000

--Crea arhivos historicos a futuro
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | --Crea arhivos historicos a futuro--'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Execute [_Datos].[dbo].[SGSP_CreaHistoricosDepuracion]

--Elimino registros de tablas depuradas inexistentes
BEGIN TRY
	Set @iLoop = 0
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | --Elimino registros de tablas depuradas inexistentes--'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	Select @iMax = Count(*) From [_RegistrosAEliminar] 
		Where [rae_cTabla] NOT IN ( Select table_name From information_schema.columns Group By table_name )

	WHILE @iLoop < @iTop And @iMax > 0
	Begin
		Set @iLoop = @iLoop + 1
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | --Elimino registros de tablas depuradas inexistentes => '+ Cast(@iMax As varchar(10))+' | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iTop As varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Delete Top(@DeleteTop) From [_RegistrosAEliminar]
			Where [rae_cTabla] NOT IN ( Select table_name From information_schema.columns Group By table_name )

		If @@ROWCOUNT = 0 Or @@ROWCOUNT < @DeleteTop
			BREAK;
	End
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