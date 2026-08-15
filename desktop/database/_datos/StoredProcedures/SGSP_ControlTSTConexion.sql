CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlTSTConexion]
AS
--Control de test por conexion
--Autor : Pablo O. Canónico
--Fecha : 12/11/2019

Set NoCount ON
BEGIN TRY
	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	Declare @DiaHoy DateTime=GetDate()
	Declare @iProceso Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='PROCESATSTCONN' )
	--Indica si se realiza el control de Testeo. 0:No / 1:Si / 2:Si, en cuentas que no esten en FallaTST

	If @iProceso > 0
		Begin	
			-- Aviso que la tarea esta funcionando
			Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlTSTConexion', @Repetition = 10
			--	
	
			Declare TSTConexion CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
			With ControlOrigen As (
			Select [txc_idKey],[txc_idCuenta],[txc_cAlarmaAGenerar],[txc_cAlarmaAutoprocesa] ,[txc_tFechaUltimaRX],
				tLimite=DATEADD( MINUTE,[txc_iMinutos],[txc_tFechaUltimaRX] ) ,
				( Select est_iidcuenta From m_estado_cuenta_Cab A With (NOLOCK) 
					 Where est_iidCuenta=[txc_idCuenta] 
					 And ( est_nEstado=2 OR ( est_nEstado=1 And @DiaHoy BetWeen est_dfechadesde And est_dfechahasta ) )
				) As iDesactivada
			From [m_TSTConexion] With (NOLOCK)
			Left Outer Join m_status On sta_iidCuenta=[txc_idCuenta]
			Where [txc_iMinutos]>0 And [txc_cAlarmaAGenerar] != ''
				And (CASE WHEN @iProceso = 2 Then [txc_tEnFalloDeDesde] Else Null END) Is Null
									)
			Select txc_idKey,txc_idCuenta,txc_cAlarmaAGenerar,txc_cAlarmaAutoprocesa--,tLimite,iDesactivada
				From ControlOrigen
				Where tLimite <= @DiaHoy
				And iDesactivada Is Null
			Order By tLimite

			Declare @idKey Int = 0,
					@idCuenta Int = 0,
					@iValor Int=0	

			Declare @cAlarmaAGenerar Char(3) = '',
					@cAlarmaAutoprocesa VarChar(200) = ''

			Declare @FechaUltimaRX DateTime
		
			OPEN TSTConexion
			FETCH NEXT FROM TSTConexion INTO @idKey,@idCuenta,@cAlarmaAGenerar,@cAlarmaAutoprocesa
			WHILE @@FETCH_STATUS = 0
			BEGIN
				Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_ControlTSTConexion] | IdCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10)))+' | Alarma a Generar => '+ @cAlarmaAGenerar+' | AutoProcesa => '+ @cAlarmaAutoprocesa
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Execute [dbo].[SGSP_AlarmaGenerar] @idCta=@idCuenta, @cAlarma=@cAlarmaAGenerar, @cQuien ='SoftGuard', @iValor=@iValor OUTPUT

				Set @FechaUltimaRX = GetDate()

				UPDATE [m_TSTConexion] Set [txc_tFechaUltimaRX] = @FechaUltimaRX Where [txc_idKey]=@idKey

				--Tengo q actualizar desde cuando esta en Fallo pero solo si la fecha esta null
				UPDATE [m_TSTConexion] Set [txc_tEnFalloDeDesde] = @FechaUltimaRX Where [txc_idKey]=@idKey And [txc_tEnFalloDeDesde] Is Null

				--Si se configuro @cAlarmaAutoprocesa entonces hay que insertar en [EventosEnFalloTesteo]
				If @cAlarmaAutoprocesa <> ''
				Begin
					Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_ControlTSTConexion] | Grabacion de EventosEnFalloTesteo'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					Set @cAlarmaAutoprocesa = 'C|,'+@cAlarmaAutoprocesa
					Execute [dbo].[SGSP_Fill_EventosEnFalloTesteo]	@idRecNoRes=@iValor, @idCuenta=@idCuenta, @tEventoFechaHora=@DiaHoy, @cAlarmaAutoprocesa=@cAlarmaAutoprocesa
				End

				FETCH NEXT FROM TSTConexion INTO @idKey,@idCuenta,@cAlarmaAGenerar,@cAlarmaAutoprocesa
			End

			CLOSE TSTConexion
			DEALLOCATE TSTConexion
		End
	Else	-- Aviso que la tarea no cumple las condiciones para funcionar
		Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'ControlTSTConexion', @Repetition = 10, @Date = null, @Status = 0	

Set NoExec Off
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