CREATE OR ALTER TRIGGER [dbo].[TG_UPD_Estado_Alarma_m_estado_cuenta_cab] ON [dbo].[m_estado_cuenta_cab]  AFTER UPDATE AS
BEGIN
	SET NOCOUNT ON;
	----est_nestado se setea en valor 4 , se genera un evento _EC (Solicitud de Eliminacion de Cuenta) en p_recepcion.
	Declare @before_est_nestado int
	Select @before_est_nestado = est_nestado From deleted
	
	Declare @est_nestado int
	Declare @est_iidcuenta int
	Select @est_nestado = est_nestado, @est_iidcuenta = est_iidcuenta From inserted
	--If(@est_nestado != @before_est_nestado and @est_nestado = 4)
	--Begin
	--	Declare @iValor Int
	--  EXEC _Datos.dbo.SGSP_AlarmaGenerar @idCta=@est_iidcuenta, @cAlarma='_EC', @cQuien='SoftGuard' , @cObs='', @cContenido='', @iValor=@iValor OUTPUT
	--End

	Declare @msg varchar(100) = '[TG_UPD_Estado_Alarma_m_estado_cuenta_cab] @est_nestado : ' + Cast(@est_nestado As VarChar(10)) +  ' | @before_est_nestado : ' + Cast(@before_est_nestado As VarChar(10))
	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;	

	If(@est_nestado != @before_est_nestado and @est_nestado = 2)
	Begin
		Declare @errmsg  Varchar(255),
				@iOK int = 0

		--Tengo que autoprocesar todos los pendientes
		IF exists (Select Top 1 rec_iid From p_recepcion Where rec_nestado In(0,2) And	rec_iidcuenta = @est_iidcuenta )
		Begin
			Set @msg = '[TG_UPD_Estado_Alarma_m_estado_cuenta_cab] Autoprocesar todos los pendientes. @est_iidcuenta' + Cast(@est_iidcuenta As VarChar(10))
			BEGIN TRY
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
			END TRY
			BEGIN CATCH
			END CATCH;	

			Update p_recepcion Set rec_nEstado = 7, rec_tFechaProceso = GetDate() Where rec_nestado In(0,2) And	rec_iidcuenta = @est_iidcuenta 
		End

		--Si hay Ordenes de ST pendientes tengo que cancelarlas. Tiene que estar en dos If x que si no existe la tabla da error el trigger
		If Not OBJECT_ID('m_st_cabecera') IS NULL 
		Begin
			If Exists ( Select Top 1 stc_iid From [m_st_cabecera] Where stc_nestado IN(1,2,5) And stc_iid_cuenta = @est_iidcuenta )
			Begin

				Set @msg = '[TG_UPD_Estado_Alarma_m_estado_cuenta_cab] Si hay Ordenes de ST pendientes tengo que cancelarlas. @est_iidcuenta' + Cast(@est_iidcuenta As VarChar(10))
				BEGIN TRY
					INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
												Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
				END TRY
				BEGIN CATCH
				END CATCH;	

				UPDATE [m_st_cabecera] Set [stc_nestado] = 3 Where stc_nestado IN(1,2,5) And stc_iid_cuenta = @est_iidcuenta
			End
		End

		--Saco la cuenta de automonitoreo
		Set @msg = '[TG_UPD_Estado_Alarma_m_estado_cuenta_cab] Saco la cuenta de automonitoreo. @est_iidcuenta' + Cast(@est_iidcuenta As VarChar(10))
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;

		Update _Datos.dbo.m_cuentas set cue_nautomonitoreo = 2 where cue_iid = @est_iidcuenta
	End

	IF (@before_est_nestado = 3	and @est_nestado != 3 ) 	--Estaba en Prueba x Zonas y NO se lo pasa a Prueba x Zonas
	Begin
		Set @msg = '[TG_UPD_Estado_Alarma_m_estado_cuenta_cab] Delete m_estado_cuenta_item Si estaba en Prueba x Zonas y NO se lo pasa a Prueba x Zonas. @est_iidcuenta' + Cast(@est_iidcuenta As VarChar(10))
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;

	    Delete From _Datos.dbo.m_estado_cuenta_item Where est_iidCuenta = @est_iidcuenta
	End

END