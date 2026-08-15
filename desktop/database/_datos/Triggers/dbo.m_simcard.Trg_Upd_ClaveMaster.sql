CREATE OR ALTER TRIGGER [dbo].[Trg_Upd_ClaveMaster] ON [dbo].[m_simcard] AFTER UPDATE As
BEGIN
	--Hay que verificar si la clave fue modificada
	Declare @del_ClaveMaster Char(6),
			@ins_ClaveMaster Char(6)
	Declare @cDestinoSMS nVarChar(100)
	Declare @idCuenta Int = 0

	Select Top 1 @del_ClaveMaster = [sim_ClaveMaster] From deleted
	Select Top 1 @ins_ClaveMaster = [sim_ClaveMaster], @idCuenta=[sim_cuenta], @cDestinoSMS=[sim_codigo] From inserted

	--Print '@del_ClaveMaster ' + @del_ClaveMaster
	--Print '@ins_ClaveMaster ' + @ins_ClaveMaster

	If @ins_ClaveMaster != @del_ClaveMaster
		Begin
			Print 'Cambio la clave. Se genera comando CLAVEM'
			Declare @cValores Varchar(20) = @del_ClaveMaster + ' CLAVEM ' + @ins_ClaveMaster

			/*Tiene que ir a p_SMSQueue
			Declare @idReceptor Int = 0,
					@iComando Int = 0

			Select @idReceptor = rec_iid FROM [_Datos].[dbo].[m_receptores_cab] Where rec_cdll='X28GprsPacketParser' 
			Select @iComando = tcm_iid From [_Tablas].[dbo].[t_comandos] Where tcm_cinterno='GENERICO' And tcm_iReceptor=@idReceptor
			
			INSERT INTO [dbo].[p_comandos_ip]
				   ([cmd_idCuenta]
				   ,[cmd_idReceptor]
				   ,[cmd_iComando]
				   ,[cmd_cValores]
				   ,[cmd_cObservaciones]
				   )
			 VALUES
				   (@idCuenta
				   ,@idReceptor
				   ,@iComando
				   ,@cValores
				   ,'Cambio Clave Master'
				   )
			*/
			Declare @iModemSMS As Int = 0
			Select Top 1 @iModemSMS=pan_cModemSMS From [_Datos].[dbo].[m_paneles]
				Where [pan_iidCuenta]=@idCuenta

			If @iModemSMS > 0
				Execute SGSP_SaveSMSQueue @idCta=@idCuenta, @iModemSMS=@iModemSMS, @cAsunto=@cValores,@cDestinoSMS=@cDestinoSMS
			
		End
END