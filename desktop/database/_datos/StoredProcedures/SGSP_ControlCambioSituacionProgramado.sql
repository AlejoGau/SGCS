CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlCambioSituacionProgramado] AS 
--Detecta Cuentas en cambio de situacion a no habilitada programado
--Autor .Pablo O. Canónico 09-08-2022

SET NOCOUNT ON
-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlCambioSituacionProgramado', @Repetition = 10
--	
Declare @dDiaHoy DateTime = GETDATE()
Declare @iID Int = 0

DECLARE CuentasCambioSituacion CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select [est_iidCuenta] From m_estado_cuenta_Cab With (NOLOCK) 
		Where [est_nEstado]=0 And [est_ntipo]=-1 And [est_dfechadesde] < @dDiaHoy
	Order By [est_iidCuenta]

OPEN CuentasCambioSituacion
FETCH NEXT FROM CuentasCambioSituacion INTO @iID
WHILE @@FETCH_STATUS = 0
Begin
	UPDATE m_estado_cuenta_cab
	SET est_nestado = 2 ,est_ntipo=0, est_dfechadesde=CONVERT(Char(8),@dDiaHoy,112) ,est_nduracion=0,est_dfechahasta=CONVERT(Char(8), @dDiaHoy,112), est_mnota=''
	WHERE est_iidcuenta = @iID

   FETCH NEXT FROM CuentasCambioSituacion INTO @iID
End

CLOSE CuentasCambioSituacion
DEALLOCATE CuentasCambioSituacion