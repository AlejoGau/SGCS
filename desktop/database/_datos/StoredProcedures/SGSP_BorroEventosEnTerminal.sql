CREATE OR ALTER PROCEDURE [dbo].[SGSP_BorroEventosEnTerminal] AS 
SET NOCOUNT ON
Declare @DiaHoy  DateTime
Set @DiaHoy = GetDate()
Declare @tEspera int
Set @tEspera =(Select (Case When par_ivalor <2 Then 2 Else par_ivalor End ) As  Valor FROM _Tablas.dbo.t_parametros With (NOLOCK) WHERE par_cCodigo='TIEMPOEVENTOENTERMINAL') 

Declare @iMax Int = 10000,
		@iLoop Int = 0	
WHILE @iLoop <= @iMax
Begin
	Set @iLoop = @iLoop + 1

	Delete Top (100) From [_Datos].[dbo].[p_eventos]
	Where DATEADD(MINUTE,@tEspera,eve_tFechaHora) < @DiaHoy
    
	IF @@ROWCOUNT = 0 BREAK;

END;

-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'BorroEventosEnTerminal', @Repetition = 2
--