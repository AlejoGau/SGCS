CREATE OR ALTER TRIGGER [dbo].[Trg_Update_XTraInfo_FHPE] ON [dbo].[EventosTimeLine] AFTER INSERT AS
BEGIN
	Declare @iRecID Int = 0,
			@iAccionCode Int = 0
	Declare @tFechaHora DateTime = Null
	Declare @iCta Int = 0	
	
	Declare @cDebug Char(2) = 'No'	--'Si' 
	
	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	IF @cDebug = 'Si'
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [Trg_Update_XTraInfo_FHPE] | Inicio'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Select @iRecID = [etl_iRecID], @tFechaHora = [etl_tFechaHora], @iAccionCode = [etl_iAccionCode], @iCta = [etl_iCuenta] From inserted
	If @iRecID Is Not Null
	Begin
		If 	@iAccionCode IN(112,113,114,115,200,201,202)
			Begin
				IF @cDebug = 'Si'
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [Trg_Update_XTraInfo_FHPE] | @iAccionCode ('+Cast(@iAccionCode As Varchar(10))+')' 
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End

				Declare @dFechaHoraProcesaEvento DateTime
				Select Top 1 @dFechaHoraProcesaEvento = [rxt_dFechaHoraProcesaEvento] From [p_RXtraInfo] Where rxt_iRecId = @iRecID
				/*
				If @dFechaHoraProcesaEvento Is Null
				Begin
					Print '--[Trg_Update_XTraInfo_FHPE] | Update [dbo].[p_RXtraInfo]-- '+ Convert(VarChar, GetDate(),120) 
					Update [dbo].[p_RXtraInfo] 	Set [rxt_dFechaHoraProcesaEvento] = @tFechaHora Where [rxt_iRecId]=@iRecID
				End
				*/
				If @dFechaHoraProcesaEvento Is Not Null
					Set @tFechaHora = Null
			End
								
		--XtraInfo--
		IF @cDebug = 'Si'
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [Trg_Update_XTraInfo_FHPE] MERGE en [_Datos].[dbo].[p_RXtraInfo]'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	
		End

		MERGE INTO [dbo].[p_RXtraInfo] AS TGT
			-- USING ( Select @iRecID As iRecId, @iAccionCode-100 As iProceso, @tFechaHora As tFechaHora ) AS SRC 
			USING ( Select @iRecID As iRecId, CASE WHEN @iAccionCode BETWEEN 40 AND 49 THEN 40 ELSE @iAccionCode-100 END As iProceso, @tFechaHora As tFechaHora ) AS SRC 
				ON TGT.[rxt_iRecId] = SRC.[iRecId]
			WHEN MATCHED THEN
				UPDATE SET
					TGT.[rxt_iProceso] = SRC.[iProceso],
					TGT.[rxt_dFechaHoraProcesaEvento] = SRC.[tFechaHora]
 			WHEN NOT MATCHED THEN 
				INSERT ([rxt_iRecId],[rxt_iProceso],[rxt_nSPIP],[rxt_nSPSMS],[rxt_cEvento],[rxt_nVCSMS])
				VALUES (SRC.[iRecId],SRC.[iProceso],0,0,'',0);
	End
	
	IF @cDebug = 'Si'
	Begin	
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [Trg_Update_XTraInfo_FHPE] | Fin'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End
END