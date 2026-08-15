CREATE OR ALTER PROCEDURE [dbo].[CambioClavesNanoComm] AS
-- =============================================
-- Author:		Pablo Canonico
-- Create date: 15/02/2012
-- Description:	Actualiza la tabla de comandos con el cambio de clave para cuentas con NanoComm
-- =============================================

SET NOCOUNT ON

Declare @iParametro Int
Declare @idCta      Int
Declare @iReceptor  Int
Declare @cIMEI      nVarChar(20)
Declare @iCmd		Int
Declare @iPin		Int
Declare @cKey		As Char(8)

Set @iParametro = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='CLAVESNANOCOMM' )
If @iParametro = 1
	Begin	
		-- Aviso que la tarea esta funcionando	60min * 25hs = 1500
		Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'CambioClavesNanoComm', @Repetition = 1500
		--	
	
		Set @iCmd = (Select tcm_iid From _Tablas.dbo.t_comandos Where tcm_cinterno='CAMCLAnc')

		DECLARE ChangeKey_Cursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
		Select MC.cue_iid,MC.cue_cIMEI,RC.rec_iid From m_cuentas MC With (NOLOCK)
			Inner Join  _Tablas.Dbo.t_port_alias On MC.cue_clinea=tpa_cdealer
			Inner Join  _Tablas.Dbo.t_ip_con On ipc_icodigo=tpa_iportip
			Inner Join _Datos.dbo.m_receptores_cab RC ON ipc_ireceptor= rec_iid 
					And rec_ntcpip = 1 
					And rec_cdll = 'NANOCOMM'
			Where MC.cue_cIMEI > '' And MC.cue_cIMEI <> MC.cue_nCuenta 
			And Not MC.cue_ncuenta IN('0000','XXXX') And MC.cue_clinea Not In('_SG') 
				Order By MC.cue_iid

		OPEN ChangeKey_Cursor
		FETCH NEXT FROM ChangeKey_Cursor INTO @idCta, @cIMEI, @iReceptor
		WHILE @@FETCH_STATUS = 0
		BEGIN
			Set @iPin = ABS(CAST(NEWID() as binary(6)) % 10000) + 1
			Set @cKey = Right(Rtrim('111'+Cast(@iPin As Char(4))),4)
			--Si son iguales, regenero
			If Left(@cIMEI,4)=@cKey
				Begin
					Set @iPin = ABS(CAST(NEWID() as binary(6)) % 10000) + 1
					Set @cKey = Right(Rtrim('111'+Cast(@iPin As Char(4))),4)
		
				End 

			Insert Into p_comandos_ip (cmd_idCuenta,cmd_idReceptor,cmd_iComando,cmd_cValores,cmd_nEstado)
				Values (@idCta,@iReceptor,@iCmd,Left(@cIMEI,4)+'|'+@cKey,1)

		   FETCH NEXT FROM ChangeKey_Cursor INTO @idCta, @cIMEI, @iReceptor
		End

		CLOSE ChangeKey_Cursor
		DEALLOCATE ChangeKey_Cursor

   End
Else	-- Aviso que la tarea no cumple las condiciones para funcionar
	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'CambioClavesNanoComm', @Repetition = 1500, @Date = null, @Status = 0