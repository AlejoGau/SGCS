CREATE OR ALTER PROCEDURE [dbo].[SGSP_TestUsoCuenta]
As
--Busca Cuentas sin uso del panel que NO esten en situacion NoHabilitada y se haya configurado el control
--Autor : Pablo O. Canónico
--Fecha : 11/06/2019
--09/03/2022 : Se agrego Notificacion Encuesta
Set NoCount ON
-- Aviso que la tarea esta funcionando	
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlTesteoUsoCuenta', @Repetition = 360

BEGIN TRY
	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	Declare @DiaHoy DateTime = GetDate()

	Declare @idCuenta Int = 0,
			@iValor Int = 0,
			@iCtrlExec Int = 0
	Declare @AlarmaGenerar Char(3) = ''
	Declare @tHoraLimite Datetime

	Declare TestCuenta CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	WITH ControlEstado AS (
	SELECT [cue_iid]
		  --,[cue_clinea],[cue_ncuenta],[cue_cnombre]
		  --,Case When [sta_nestado]= 1 Then 'Abierto' Else 'Cerrado' End As EstadoPanel
		  ,[sta_dFechaUltimoOC],[sta_dfechaOPNdesde],[cue_dFechaOPN],[cue_dFechaCLO]
		  ,Case When [sta_nestado]= 1 Then DATEADD(DAY, [tst_iTiempoCtrl], [cue_dFechaOPN] ) Else DATEADD(DAY, [tst_iTiempoCtrl], [cue_dFechaCLO] ) End As HoraLimite
		  --,DATEADD(DAY, 2, [cue_dFechaOPN] ) As HoraLimiteOPN,DATEADD(DAY, 2, [cue_dFechaCLO] ) As HoraLimiteCLO
		  ,[tst_cAlarmaCtrlGenerar],[tst_iCtrlExec]
	FROM [dbo].[m_cuentas]
		Inner Join [dbo].[m_status] On [cue_iid]=[sta_iidcuenta]
		Left Outer Join [dbo].[m_CuentasXtraInfo] On [cue_iidCuenta]=[cue_iid]
		Left Outer Join [dbo].[m_estado_cuenta_cab] On [cue_iid] = [est_iidcuenta]
		Left Outer Join [dbo].[m_tst_prueba] On [tst_iidcuenta] = [cue_iid]
	Where [cue_clinea] Not IN('_MP','_SG') And [est_nEstado]!=2 And [tst_iTiempoCtrl]>0 And [tst_iCtrlExec]=0
	)
	Select [cue_iid],[HoraLimite],[tst_cAlarmaCtrlGenerar],[tst_iCtrlExec]
		From ControlEstado
	Where HoraLimite<=@DiaHoy	

	OPEN TestCuenta
	FETCH NEXT FROM TestCuenta INTO @idCuenta,@tHoraLimite,@AlarmaGenerar,@iCtrlExec
	WHILE @@FETCH_STATUS = 0
	BEGIN

		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | SGSP_TestUsoCuenta | IdCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10)))+' | FechaHora Limite => '+ Rtrim(Convert(VarChar, @tHoraLimite,120) )+' | Alarma a Generar => '+ @AlarmaGenerar
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Execute [dbo].[SGSP_TimerGeneroEVT] @idCuenta = @idCuenta, 	@AlarmaGenerar = @AlarmaGenerar, @iValor = @iValor OUTPUT

		If @iValor > 0
			Begin
				--Actualizo ejecucion de control
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | SGSP_TestUsoCuenta | --Actualizo ejecucion de control-- '
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Update [_Datos].[dbo].[m_tst_prueba] 
					Set [tst_iCtrlExec]=1
				Where [tst_iidcuenta]=@idCuenta

				--Envio Encuesta
				Execute SGSP_NotificacionEncuesta @cCodAlarma = @AlarmaGenerar, @idRec = @iValor, @idCuenta = @idCuenta
			End

	FETCH NEXT FROM TestCuenta INTO @idCuenta,@tHoraLimite,@AlarmaGenerar,@iCtrlExec
	End

	CLOSE TestCuenta
	DEALLOCATE TestCuenta;

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