CREATE OR ALTER PROCEDURE [dbo].[SP_BuscoEsperaConDemora] AS 
SET NOCOUNT ON
-- Aviso que la tarea esta funcionando	
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'BuscoEsperaConDemora', @Repetition = 10
--	   
Declare @DiaHoy DateTime
Declare @iID Int = 0,
		@iidCuenta Int = 0, 
		@iOperador Int = 0, 
		@iParametro Int = 0,
		@iProceso Int = 0,
		@iEstado Int = 0
Declare @cTerminal Char(3)

SET @DiaHoy = GetDate()

Set @iParametro = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='ESPERAILIMITADA' )
If @iParametro = 1
   Begin	
	Declare cEspera CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	   SELECT rec_iid,rec_iidCuenta,rec_iOperador,rec_cTerminal,[rxt_iProceso]
			FROM P_recepcion With (NOLOCK)
			Left Outer JOin [dbo].[p_RXtraInfo] On rec_iid=[rxt_iRecId]
		WHERE rec_nEstado=2
		  And rec_iMinutosEspera<999
		  AND DATEADD(MINUTE,rec_iMinutosEspera,rec_tfechaProceso) < @DiaHoy
   End
Else
   Begin	
	Declare cEspera CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
		SELECT rec_iid,rec_iidCuenta,rec_iOperador,rec_cTerminal,[rxt_iProceso]
			FROM P_recepcion With (NOLOCK)
			Left Outer JOin [dbo].[p_RXtraInfo] On rec_iid=[rxt_iRecId]
		WHERE rec_nEstado=2
		  AND DATEADD(MINUTE,rec_iMinutosEspera,rec_tfechaProceso) < @DiaHoy
   End

Open cEspera
Fetch Next From cEspera Into @iID,@iidCuenta,@iOperador,@cTerminal,@iProceso
While @@FETCH_STATUS = 0
Begin
	If @iProceso = 42  -- Espera - Supervisor
		Set @iProceso = 44	--Supervisor - Pendiente
	Else
		Set @iProceso = 32	--Espera - Pendiente

    UPDATE p_recepcion WITH (UPDLOCK)
		SET rec_tfechaProceso=@DiaHoy,rec_nEstado=0,rec_iOperador=0,rec_cContenido=Left(Rtrim(Ltrim(rec_cContenido))+' |ESP',50)
	WHERE rec_iid=@iID

	Insert Into p_recepcion_proceso(pro_recid,pro_cterminal,pro_tfechahora,pro_nProceso,pro_iOperador)
		Values(@iID,@cTerminal,GETDATE(),@iProceso,@iOperador)

   Fetch Next From cEspera Into @iID,@iidCuenta,@iOperador,@cTerminal,@iProceso
End
Close cEspera
Deallocate cEspera