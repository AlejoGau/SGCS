CREATE OR ALTER TRIGGER [dbo].[Trg_Fill_TimeLine_PRO] ON [dbo].[p_recepcion_proceso] AFTER INSERT AS
BEGIN
	Declare @idRec Int = 0,
			@idCuenta Int = 0,
			@iOperador Int = 0
	Declare @cObservacion nVarChar(MAX) = ''		
	Declare @nProceso numeric(2,0) = 0

	Print '--[Trg_Fill_TimeLine_PRO] | Inicio-- '+ Convert(VarChar, GetDate(),120)  
	
	Select @idRec = [pro_recid], @iOperador = [pro_iOperador], @nProceso = [pro_nProceso] From inserted

	If @idRec > 0
	Begin
		Select @idCuenta = [rec_iidcuenta],	@cObservacion = IsNull([tsp_cDescripcion],'')
		From [p_recepcion] 
		Inner Join [_Tablas].[dbo].[t_StatusProceso] On [tsp_iid]=@nProceso
		Where [rec_iid] = @idRec

		--2019-12-19 : Pablo. Porque no esta mas en [SearchAtencionEventoEspera]
		/*
		tsp_iid     tsp_cDescripcion
		----------- -------------------------
		13          Procesando - Espera
		15          Pendiente - Espera Todo
		23          Espera - Espera
		25          Espera - Espera Todo
		41          Supervisor - Espera
		*/

		If @nProceso IN(13,15,23,25,41)
		Begin
			Declare @iMinutosEspera Int = 0
			Select @iMinutosEspera = IsNull(rec_iMinutosEspera,0)
				From [_Datos].[dbo].[p_recepcion]
			Where rec_iid = @idRec

			If @iMinutosEspera > 0
				Set @cObservacion += '% por% '+Convert(VarChar(10), @iMinutosEspera)+' %Minutos%'
		End			
	End

	Print '--[Trg_Fill_TimeLine_PRO] | Insert Into [dbo].[EventosTimeLine]-- '+ Convert(VarChar, GetDate(),120) + '| @idRec ('+Cast(@idRec As Varchar(10))+')'+ '| @nProceso ('+Cast(@nProceso As Varchar(10))+') | @cObservacion : '+@cObservacion
	Insert Into [dbo].[EventosTimeLine]
           ([etl_iRecID]
           ,[etl_iCuenta]
           ,[etl_tFechaHora]
           ,[etl_cAccion]
           ,[etl_cObservacion]
           ,[etl_cOwner]
           ,[etl_iOperador]
		   ,[etl_iAccionCode])
     Values
           (@idRec
           ,@idCuenta
           ,GETDATE()
           ,'Procesamiento'
           ,@cObservacion
		   ,'%SISTEMA%'
           ,@iOperador
		   ,100+@nProceso)

	Print '--[Trg_Fill_TimeLine_PRO] | Update [dbo].[EventosPendientes] -- '+ Convert(VarChar, GetDate(),120) + '| @nProceso ('+Cast(@nProceso As Varchar(10))+')' 
	Update [dbo].[EventosPendientes] 
		Set [pro_nProceso] = @nProceso
	Where [rec_iid] = @idRec
	
	/*Lo pase a [Trg_Update_XTraInfo_FHPE] ON [dbo].[EventosTimeLine]
	--XtraInfo--
	Print '--[Trg_Fill_TimeLine_PRO] | MERGE INTO [dbo].[p_RXtraInfo] -- '+ Convert(VarChar, GetDate(),120) 
	MERGE INTO [dbo].[p_RXtraInfo] AS TGT
		USING ( Select @idRec As iRecId, @nProceso As iProceso ) AS SRC 
			ON TGT.[rxt_iRecId] = SRC.[iRecId]
		WHEN MATCHED THEN
			UPDATE SET
				TGT.[rxt_iProceso] = SRC.[iProceso]
 		WHEN NOT MATCHED THEN 
			INSERT ([rxt_iRecId],[rxt_iProceso])
			VALUES (SRC.[iRecId],SRC.[iProceso]);
	*/
	--WorkFlow--
	Print '--[Trg_Fill_TimeLine_PRO] | [WorkflowExecute] -- '+ Convert(VarChar, GetDate(),120) 
	--Execute [_Desktop].[dbo].[WorkflowExecute] @rec_iid = @idRec
END