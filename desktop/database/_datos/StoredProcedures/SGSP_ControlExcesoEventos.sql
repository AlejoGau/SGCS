CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlExcesoEventos]  As
--Controla Exceso en Eventos Recibidos y genera alerta
--Autor :Pablo O. Canónico
--Fecha :05/11/2014
--2021-08-27 : Se cambia la configuracion de parametro a por cuenta
SET NOCOUNT ON
Declare @iControl Int
Set @iControl = (Select Count(*) From [dbo].[m_CuentasXtraInfo] Where [cue_iExcesoLimiteDia]>0 Or [cue_iExcesoLimiteHora]>0)	

If @iControl = 0
	Begin
		-- Aviso que la tarea no cumple las condiciones para funcionar
		Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlExcesoEventos', @Repetition = 2, @Date = null, @Status = 0
		Set NoExec On
	End	

-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlExcesoEventos', @Repetition = 2
--	

--Busco acumulados--
Declare @idCuenta Int
Declare @cFecha Varchar(10),
		@cHora Char(2)
Declare @iCant Int = 0,
		@iExcesoLimiteDia Int = 0,
		@iExcesoLimiteHora Int = 0


--Primero busco por hora. El Job debe ejecutar cada 1 minuto
DECLARE cExcesos CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select rxa_idCuenta,CONVERT(date,rxa_tFechaHora) as Fecha , DATEPART(HOUR, rxa_tFechaHora) as Hora
		,Count(*) As nCant, cue_iExcesoLimiteDia, cue_iExcesoLimiteHora
	From [_Datos].[dbo].[p_RXAcumulado]
	Inner Join  [_Datos].[dbo].[m_CuentasXtraInfo] On rxa_idCuenta=cue_iidCuenta
	Where ( cue_iExcesoLimiteDia>0 Or cue_iExcesoLimiteHora>0 )
			And CONVERT(date,rxa_tFechaHora) = CONVERT(date,getdate()) 
			And DATEPART(HOUR, rxa_tFechaHora) = DATEPART(HOUR, getdate())
			And rxa_iExcHora=0
	Group By CONVERT(date,rxa_tFechaHora),DATEPART(HOUR, rxa_tFechaHora), rxa_idCuenta,cue_iExcesoLimiteDia, cue_iExcesoLimiteHora
	Order By 1,2,3

OPEN cExcesos
FETCH NEXT FROM cExcesos INTO @idCuenta,@cFecha,@cHora,@iCant,@iExcesoLimiteDia,@iExcesoLimiteHora
	WHILE @@FETCH_STATUS = 0
		Begin
		If @iCant >= @iExcesoLimiteHora And @iExcesoLimiteHora > 0
		Begin
		   Execute _Desktop.dbo.AlarmaGenerar @idCta=@idCuenta, @cAlarma='_XC', @cObservaciones='Supero limite de eventos por hora'

		   --Marcar los registros del acumulado que ya se usaron para generar evento de exceso
		   Update [_Datos].[dbo].[p_RXAcumulado]
		   Set [rxa_iExcHora] = 1
		   Where [rxa_idCuenta]=@idCuenta 
				And CONVERT(date,rxa_tFechaHora) = CONVERT(date,getdate()) 
				And DATEPART(HOUR, rxa_tFechaHora) = DATEPART(HOUR, getdate())
		End

		FETCH NEXT FROM cExcesos INTO @idCuenta,@cFecha,@cHora,@iCant,@iExcesoLimiteDia,@iExcesoLimiteHora
		End

CLOSE cExcesos
DEALLOCATE cExcesos


--Segundo busco por dia
DECLARE cExcesos CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select rxa_idCuenta,CONVERT(date,rxa_tFechaHora) as Fecha , DATEPART(DAY, rxa_tFechaHora) as Hora
		,Count(*) As nCant, cue_iExcesoLimiteDia, cue_iExcesoLimiteHora
	From [_Datos].[dbo].[p_RXAcumulado]
	Inner Join  [_Datos].[dbo].[m_CuentasXtraInfo] On rxa_idCuenta=cue_iidCuenta
	Where ( cue_iExcesoLimiteDia>0 Or cue_iExcesoLimiteHora>0 )
			And CONVERT(date,rxa_tFechaHora) = CONVERT(date,getdate()) 
			And rxa_iExcDia=0
	Group By CONVERT(date,rxa_tFechaHora),DATEPART(DAY, rxa_tFechaHora), rxa_idCuenta,cue_iExcesoLimiteDia, cue_iExcesoLimiteHora
	Order By 1,2,3

OPEN cExcesos
FETCH NEXT FROM cExcesos INTO @idCuenta,@cFecha,@cHora,@iCant,@iExcesoLimiteDia,@iExcesoLimiteHora
	WHILE @@FETCH_STATUS = 0
		Begin
		If @iCant >= @iExcesoLimiteDia And @iExcesoLimiteDia > 0
		Begin
		   Execute _Desktop.dbo.AlarmaGenerar @idCta=@idCuenta, @cAlarma='_XC', @cObservaciones='Supero limite de eventos por dia'

		   --Marcar los registros del acumulado que ya se usaron para generar evento de exceso
		   Update [_Datos].[dbo].[p_RXAcumulado]
		   Set [rxa_iExcDia] = 1
		   Where [rxa_idCuenta]=@idCuenta 
				And CONVERT(date,rxa_tFechaHora) = CONVERT(date,getdate()) 

		End

		FETCH NEXT FROM cExcesos INTO @idCuenta,@cFecha,@cHora,@iCant,@iExcesoLimiteDia,@iExcesoLimiteHora
		End

CLOSE cExcesos
DEALLOCATE cExcesos

--Elimino los registros de dias anteriores solamente si se ejecuta de 00:00 a 00:30
If ( DATEPART(HOUR, CURRENT_TIMESTAMP) = 0 And DATEPART(MINUTE, CURRENT_TIMESTAMP) <= 30 )
	DELETE FROM p_RXAcumulado Where rxa_tFechaHora <= DateADD(Minute, 0, DateADD(HOUR, 0, DateDIFF(day, 0, GetDate())))

Set NoExec Off