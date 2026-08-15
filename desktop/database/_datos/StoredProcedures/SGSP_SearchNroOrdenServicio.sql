CREATE OR ALTER PROCEDURE [dbo].[SGSP_SearchNroOrdenServicio]
	@idRec [int] = 0 ,
	@iValor [int] = 0 OUTPUT
AS
--Es el store que ejecuta Textmerge para buscar el numero de orden de servicio de un evento de finalizacion
--Autor :Pablo O. Canónico
--Fecha :20/01/2022
--2023-09-19 : Se agrego '_NS'
--2025-01-10 : La ordenes finalizadas desde TecGuard graban observaciones con chars HTML

Set NoCount On
BEGIN TRY
	Declare @message VarChar(Max) = '',
		    @StartDateTimeText VarChar(Max) = ''

	Declare @iID Int = 0
	Declare @stringValue VarChar(max)
	Declare @cObs varchar(max) = (Select Cast(rec_cObservaciones As Varchar(max)) From [dbo].[p_recepcion] Where rec_calarma IN ('_ST','_NS') And rec_iid=@idRec)

	If @cObs Like '%<div>%'
		Set @cObs = Replace(@cObs,'</dt><dd>',':')

	Declare TmpSearch Cursor Scroll	For
		Select Id,Value From [dbo].[SplitDelimited](@cObs,':') 

		Open TmpSearch
		FETCH NEXT FROM TmpSearch INTO @iID, @stringValue

		WHILE @@FETCH_STATUS = 0
		Begin
			/*
			Print '-----'
			Print '@iID : '+Cast(@iID As VarChar(10))
			Print '@stringValue : '+@stringValue
			*/
			If @iID=3
				Break

			FETCH NEXT FROM  TmpSearch INTO @iID, @stringValue
		End
	Close TmpSearch
	DEALLOCATE TmpSearch

	If @iID<1
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_SearchNroOrdenServicio] | No hay Nro de Orden de ST para idRec = '+Cast(@idRec As VarChar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
		Set NoExec On
	End
	
	Declare @cValue NVarchar(100) = ''
	Select Top (1) @cValue=Value From [dbo].[SplitDelimited](@stringValue,']') 

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_SearchNroOrdenServicio] | Nro de Orden de ST = '+@cValue
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--En las ordenes _NS el stringValue viene con chars invisibles que no permiten castear a int
	If ISNUMERIC(@cValue) = 1
		Set @iValor = CONVERT(INT,Rtrim(Ltrim(@cValue)))
	Else
	Begin
		WHILE PATINDEX('%[^0-9]%', @cValue) > 0
		BEGIN
			SET @cValue = STUFF(@cValue, PATINDEX('%[^0-9]%', @cValue), 1, '')
		END
		Set @iValor = TRY_CONVERT(INT,Rtrim(Ltrim(@cValue)))
	End
	
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
	IF @@TRANCOUNT>0
		ROLLBACK TRAN

END CATCH