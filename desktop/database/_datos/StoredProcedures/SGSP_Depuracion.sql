CREATE OR ALTER PROCEDURE [dbo].[SGSP_Depuracion] 
	@cTipo Char(4) = 'xDia', --'xMes'
	@iTimeout Int=180,
	@iTop Int=10000,
	@IsDebug Bit = 0
As
Begin
	SET NOCOUNT ON

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	Declare @iMeses Int = 0,
			@nError Int = 0,
			@iRep Int = 0

	Set @iMeses = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='MESESDEPURACION' )
	If @iMeses < 1
		Set @iMeses=1

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Depuracion] | @cTipo : '+ @cTipo + ' | @iMeses : ' + Cast(@iMeses As VarChar(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Declare @Dia Datetime,
			@UltimoDia Datetime
    Declare @cCierre Char(6),
			@cFechaDesde VarChar(17),
			@cFechaHasta VarChar(17),
			@TablaDep Varchar(17),
			@cHoraActual Char(8),	
			@cHorarioDesde Char(9),
			@cHorarioHasta Char(9),
			@JobName nVarChar(30)
	
	Set @Dia = DateAdd(Month,-@iMeses,GetDate())
	Set @cHoraActual = CONVERT(CHARACTER, @dia, 114)

	Set @cHorarioDesde = ' 00:00:00'

    If @cTipo = 'xDia'
    Begin
		Set @cFechaDesde = CONVERT(CHAR(8), @Dia, 112)
		Set @cHorarioHasta = CASE
			WHEN @cHoraActual <= '06:00:00' THEN ' 06:00:00'
			WHEN @cHoraActual <= '12:00:00' THEN ' 12:00:00'
			WHEN @cHoraActual <= '18:00:00' THEN ' 18:00:00'
			ELSE ' 23:59:59'
		END

		Set @cFechaDesde = Left(@cFechaDesde, 8) + @cHorarioDesde
		Set @cFechaHasta = Left(@cFechaDesde, 8) + @cHorarioHasta
    End
	Else
    Begin
		Set @cFechaDesde = Convert(CHARACTER, DATEFROMPARTS (year(@Dia), month(@Dia), 01 ), 112)
		Set @UltimoDia = EOMONTH(@Dia)                                   
		Set @cFechaHasta = CONVERT(CHAR(8), @UltimoDia, 112)
		Set @cHorarioHasta = ' 23:59:59'

		Set @cFechaDesde = Left(@cFechaDesde, 8) + @cHorarioDesde
		Set @cFechaHasta = Left(@cFechaHasta, 8) + @cHorarioHasta	--Tiene que ir en el else porque el calculo es diferente
    End

	Set @cCierre = Left(@cFechaDesde,6)

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Depuracion] | @cFechaDesde : '+ @cFechaDesde + ' | @cFechaHasta : ' + @cFechaHasta + ' | @cCierre : ' + @cCierre
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--Aviso que la tarea esta funcionando
	If @cTipo = 'xDia'
	Begin
		Set	@JobName=N'DepuracionHistorico'
		If @cHorarioHasta = ' 23:59:59'
			Set @iRep = 600		--60min * 10hs = 600	Porque de 20:45 que es la ultima ejecucion del dia va a las 2.45 y no se ejecuto todavia
		Else	
			Set @iRep = 360		--60min * 6hs = 360
	End
	Else
	Begin
		Set	@JobName=N'DepuracionHistoricoMensual'
		Set @iRep = 46080		--60min * 24hs * 32dias = 46080
	End

	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = @JobName, @Repetition = @iRep

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Depuracion] | Aviso que la tarea esta funcionando ('+@JobName+')'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
    --

    Set @TablaDep = Concat('p_recepcion',@cCierre)
    --Creo los Historicos Necesarios
	IF OBJECT_ID(@TablaDep) Is Null
		Execute @nError = [SGSP_CreoPRDepurado] @cCierre

	--Actualizo la tabla [s_tablahistoricos]
	If Not Exists ( Select Top 1 [c_periodo] From [_Sistema].[dbo].[s_tablahistoricos] Where [c_periodo] = @TablaDep)
	Begin
		Insert Into [_Sistema].[dbo].[s_tablahistoricos] ([iid_reporte],[c_periodo],[n_usado]) 
			 Values (0,@TablaDep,0)
	End

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_Depuracion] | Exec [dbo].[SGSP_DepuracionDiaria]'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	Exec [dbo].[SGSP_DepuracionDiaria] @cCierreDesde=@cFechaDesde, @cCierreHasta=@cFechaHasta, @Tabla=@TablaDep, @Timeout=@iTimeout,@Top=@iTop,@IsDebug=@IsDebug
End