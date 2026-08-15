CREATE OR ALTER PROCEDURE [dbo].[SGSP_DepuracionRXLog] As
--Depura la tabla [p_RXLog] dejando en linea los mismos ID que hay en [p_recepcion]
--Autor :Pablo O. Canónico
--Fecha :20/03/2013
--Modificacion 08/06/2015 Se cambio a Delete Output
--Modificacion 29/01/2016 Se depura por lotes para bases de datos con mucho trafico
--Modificacion 07/05/2018 Se depura por registros inexistentes en pRecepcion
--Modificacion 07/12/2018 Se bajo a 2500 la cantidad de registros para que sean mas loops pero con menos cantidad
SET NOCOUNT ON

-- Aviso que la tarea esta funcionando	60min * 25hs  = 1500
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'DepuracionRXLog', @Repetition = 1500
--	

BEGIN TRY
	DBCC TRACEON (1224)

	Declare @nError Int = 0,
			@iMax Int = 0,
			@iTop Int = 2500,
			@iLoop Int = 0

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText nVarChar(max)=''

	Select @iMax = Count([rxl_iId])  FROM [dbo].[p_RXLog]
		Where [rxl_iRecId] Not In ( Select rec_iid From p_recepcion )

	If @iMax < @iTop
		Set @iMax = @iTop

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Total de Registros => ' + Cast(@iMax As varchar(10))+' | Loops Necesarios Reales => '+ Cast(@iMax / @iTop As varchar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Print @iMax / @iTop
	If @iMax / @iTop > 100
		Set @iMax = 100
	Else
		Set @iMax = @iMax / @iTop

	WHILE @iLoop <= @iMax
	BEGIN
	 Set @iLoop = @iLoop + 1
	 
	 Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	 Set @message = 'Start DateTime : %s | Loop => '+ Cast(@iLoop As varchar(10)) +' / '+ Cast(@iMax As varchar(10))
	 RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	 ;WITH 
	 cteDEP ([rxl_iRecId])
	 AS
	 (
		Select [rxl_iRecId] From [dbo].[p_RXLog] Where [rxl_iRecId] Not In ( Select rec_iid From p_recepcion )
	 )
	  DELETE TOP (@iTop) FROM [dbo].[p_RXLog]
		OUTPUT
		  Deleted.[rxl_iId],
		  Deleted.[rxl_iRecId], 
		  Deleted.[rxl_cLog],
		  Deleted.[rxl_cDll],
  		  Deleted.[rxl_cEvento],
		  Deleted.[rxl_cLineCard] 
		  INTO [dbo].[p_RXLogDep]
  		WHERE [rxl_iRecId] In ( Select [rxl_iRecId] From cteDEP )

	  IF @@ROWCOUNT = 0 BREAK;
	END;

	Select @nError = @@Error
    If @nError > 0	
		Raiserror('%s',16,1,'Depuracion RxLog')

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