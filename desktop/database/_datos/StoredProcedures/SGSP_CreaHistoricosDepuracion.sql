CREATE OR ALTER PROCEDURE [dbo].[SGSP_CreaHistoricosDepuracion] AS
BEGIN
	--Crea arhivos historicos a futuro
	--Autor :Pablo O. Canónico
	--Fecha :22/07/2025
	BEGIN TRY
		SET NOCOUNT ON

		Declare @cSQL nVarChar(Max) = '',
   			@message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

		Declare @nError Int = 0,
				@LoopCount Int=1  
		Declare @cCierre Char(6)
		Declare @dFecha Datetime =  DateAdd(Month,-1,Getdate())
		Declare @SynName SYSNAME = ''

		WHILE @LoopCount <= 12
		BEGIN
			Set @cCierre = CONVERT(CHAR(6), DateAdd(Month,@LoopCount,@dFecha), 112)

			If @LoopCount > 1
			Begin
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | --Genero archivos de depuracion a futuro--'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End

			Set @SynName = 'p_recepcion' + @cCierre;
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --Genero archivos de depuracion a futuro-- | OBJECT_ID => '+ @SynName +' | Loop => '+ Cast(@LoopCount As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			IF OBJECT_ID(@SynName, 'SN') Is NULL And OBJECT_ID(@SynName, 'U') Is NULL 
				Execute @nError = [SGSP_CreoPRDepurado] @cCierre

			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --Genero archivos de depuracion a futuro-- | OBJECT_ID => '+ 'EventosTimeLine'+@cCierre+' | Loop => '+ Cast(@LoopCount As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			IF OBJECT_ID('EventosTimeLine'+@cCierre) Is Null
				Execute @nError = [SGSP_CreoETDepurado] @cCierre

			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --Genero archivos de depuracion a futuro-- | OBJECT_ID => '+ 'p_recepcion_proceso'+@cCierre+' | Loop => '+ Cast(@LoopCount As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			IF OBJECT_ID('p_recepcion_proceso'+@cCierre) Is Null
				Execute @nError = [SGSP_CreoPRPDepurado] @cCierre

			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --Genero archivos de depuracion a futuro-- | OBJECT_ID => '+ 'p_RXtraInfo'+@cCierre+' | Loop => '+ Cast(@LoopCount As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			IF OBJECT_ID('p_RXtraInfo'+@cCierre) Is Null
				Execute @nError = [_Datos].[dbo].[SGSP_CreoRXTIDepurado] @cCierre

			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --Genero archivos de depuracion a futuro-- | OBJECT_ID => '+ 'p_grabacion_audio'+@cCierre+' | Loop => '+ Cast(@LoopCount As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			IF OBJECT_ID('[_History].[dbo].p_grabacion_audio'+@cCierre) Is Null
				Execute @nError = [_History].[dbo].[SGSP_CreoGRADepurado] @cCierre=@cCierre , @cDebug = 'N', @nError = 0
		
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | --Genero archivos de depuracion a futuro-- | OBJECT_ID => '+ 'p_Posiciones'+@cCierre+' | Loop => '+ Cast(@LoopCount As varchar(10))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			IF OBJECT_ID('[_History].[dbo].p_Posiciones'+@cCierre) Is Null
				Execute @nError = [_History].[dbo].[SGSP_CreoPOSDepurado] @cCierre=@cCierre , @cDebug = 'N', @nError = 0

		
			Set @LoopCount += 1
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
END