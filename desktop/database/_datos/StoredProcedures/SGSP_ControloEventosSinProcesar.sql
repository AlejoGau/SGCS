CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControloEventosSinProcesar] As
--Busca eventos en estado 1 - Procesando, que hayan estado mucho tiempo sin terminar de procesarse 
--Autor :Pablo O. Canónico
--Fecha :15/09/2016
--2018-09-26 : Se saco el control de [rec_cTerminal]
--2021-03-22 : Se procesa los eventos en estado 9
SET NOCOUNT ON
-- Aviso que la tarea esta funcionando	
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControloEventosSinProcesar', @Repetition = 10
--	   
Declare @DiaHoy DateTime = GetDate()
Declare @iID Int = 0,
		@iMinutos Int = 0,
		@iidCuenta Int = 0,
	    @iOperador Int = 0
Declare @cTerminal Char(3) = ''
Declare @nEstado Numeric(1,0) = 0

Set @iMinutos = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='TIEMPOSINPROCESAREVENTO' )
If @iMinutos Is Null
	Set @iMinutos = 60
Begin	
	Declare cLimbo CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	   Select [rec_iid],[rec_iidCuenta],[rec_iOperador],[rec_cTerminal],[rec_nEstado]
		From P_recepcion With (NOLOCK)
		Where [rec_nEstado] IN(1,9) --And [rec_cTerminal] <> '_WW'
		  AND DATEADD(MINUTE,@iMinutos,[rec_tfechaProceso]) <= @DiaHoy
End

Open cLimbo
Fetch Next From cLimbo Into @iID,@iidCuenta,@iOperador,@cTerminal,@nEstado
While @@FETCH_STATUS = 0
Begin
	If @nEstado=9
		Set @nEstado=3
	Else
		Set @nEstado=0

   Update p_recepcion
	Set rec_tfechaProceso=@DiaHoy,rec_nEstado=@nEstado,rec_iOperador=0,rec_cContenido=Left(Rtrim(Ltrim(rec_cContenido))+' |TSP',50)
	Where rec_iid=@iID

	Insert Into p_recepcion_proceso([pro_recid],[pro_cterminal],[pro_tfechahora],[pro_nProceso],[pro_iOperador])
		Values(@iID,@cTerminal,GetDate(),31,@iOperador)

	Insert Into [dbo].[EventosTimeLine]
			([etl_iRecID]
			,[etl_iCuenta]
			,[etl_tFechaHora]
			,[etl_cAccion]
			,[etl_cObservacion]
			,[etl_cOwner]
			,[etl_iOperador])
		Values
			(@iID
			,@iidCuenta
			,GETDATE()
			,'ControloEventosSinProcesar'
			,'%Supero Tiempo Sin Procesar Evento%'
			,'%SISTEMA%'
			,@iOperador)

   Fetch Next From cLimbo Into @iID,@iidCuenta,@iOperador,@cTerminal,@nEstado
End
Close cLimbo
Deallocate cLimbo