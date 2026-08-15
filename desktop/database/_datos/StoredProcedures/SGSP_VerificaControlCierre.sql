CREATE OR ALTER PROCEDURE [dbo].[SGSP_VerificaControlCierre]  As
--Controla Estado de la cuenta y genera alerta de ser necesario
--Autor :Pablo O. Canónico
--Fecha :23/05/2022
SET NOCOUNT ON
Declare @iControl Int
Set @iControl = (Select Count(*) From [_Tablas].[dbo].[t_lineas] Where [lin_iControlaCierreDespuesDeApertura]=1 And [lin_iMinutosControlCDDA]>0)	

Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max) = ''

If @iControl = 0
	Begin
		-- Aviso que la tarea no cumple las condiciones para funcionar
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_VerificaControlCierre] | No hay controles configurados por dealer'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'VerificaControlCierre', @Repetition = 10, @Date = null, @Status = 0
		Set NoExec On
	End	

-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'VerificaControlCierre', @Repetition = 10
--	

--Busco acumulados--
Declare @iId Int = 0,
		@idCta Int = 0,
		@iEstado Int = 0

--Primero busco si hay cuentas controladas que aun no cerraron. El Job debe ejecutar cada 5 minutos
DECLARE cStatusCta CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select [ctc_iId],[ctc_iCta]
		From [_Datos].[dbo].[p_CtrlCierre]
	Where [ctc_tFechaHora]<=Getdate()
	Order By 1,2

OPEN cStatusCta
FETCH NEXT FROM cStatusCta INTO @iId,@idCta
	WHILE @@FETCH_STATUS = 0
		Begin
			Select @iEstado=[sta_nEstado] 
				From [_Datos].[dbo].[m_status] With (NOLOCK)
			Where [sta_iidcuenta]=@idCta

			/*
			Estado en M_STATUS
			sta_nEstado = 0		Cerrado
			sta_nEstado = 1		Abierto
			*/

			If @iEstado = 1
			Begin
				Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_VerificaControlCierre] | Cuenta No hay controles configurados por dealer'
				Set @message = 'Start DateTime : %s | [SGSP_VerificaControlCierre] | Cuanta en estado Abierto | IdCuenta => '+ Rtrim(Cast(@idCta As Varchar(10))) + ' | Se genera evento de control'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			    Execute _Desktop.dbo.AlarmaGenerar @idCta=@idCta, @cAlarma='_FC', @cObservaciones='Aun no activo'
			End

			--Elimino los registros ya utilizados hayan generado evento de control, o que ya hayan cerrado
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_VerificaControlCierre] | Elimino los registros ya utilizados'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			DELETE FROM [p_CtrlCierre] Where [ctc_iId] = @iId

		FETCH NEXT FROM cStatusCta INTO @iId,@idCta
		End

CLOSE cStatusCta
DEALLOCATE cStatusCta

Set NoExec Off