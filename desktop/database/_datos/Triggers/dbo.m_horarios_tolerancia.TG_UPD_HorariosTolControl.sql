CREATE OR ALTER TRIGGER [dbo].[TG_UPD_HorariosTolControl] ON [dbo].[m_horarios_tolerancia] AFTER INSERT, UPDATE AS
BEGIN
	SET NOCOUNT ON;
	SET DATEFIRST 7

	/*
	BEGIN TRY
	-- Insert Logging into Table 
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), '[TG_UPD_HorariosTolControl]', '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;	
	*/

	Print 'Ejecuto TG_UPD_HorariosTolControl'
	Declare @idCuenta Int = 0,
			@iDayOfWeek Int = DatePart(dw,GetDate())

	Select @idCuenta = [tol_iidcuenta] From inserted
	
	Print '[TG_UPD_HorariosTolControl] idCuenta     : ' + Cast(@idCuenta As VarChar(10))
	Print '[TG_UPD_HorariosTolControl] iDayOfWeek   : ' + Cast(@iDayOfWeek As VarChar(10))

	/*
	Declare @msg varchar(100) = '[TG_UPD_HorariosTolControl] idCuenta     : ' + Cast(@idCuenta As VarChar(10))
	BEGIN TRY
	-- Insert Logging into Table 
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;	
	
	Set @msg = '[TG_UPD_HorariosTolControl] iDayOfWeek   : ' + Cast(@iDayOfWeek As VarChar(10))
	BEGIN TRY
	-- Insert Logging into Table 
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;	
	*/

	If @idCuenta > 0 
	Begin
		/*
		Set @msg = 'Execute [_Datos].[dbo].[SGSP_TimerGeneraHorariosControl] @iDOW = @iDayOfWeek ,@iCta = @idCuenta'
		BEGIN TRY
		-- Insert Logging into Table 
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	
		*/
		Execute [_Datos].[dbo].[SGSP_TimerGeneraHorariosControl] @iDOW = @iDayOfWeek ,@iCta = @idCuenta
		/*
		Set @msg = 'Vuelvo del  Execute [_Datos].[dbo].[SGSP_TimerGeneraHorariosControl]'
		BEGIN TRY
		-- Insert Logging into Table 
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @msg, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;			
		*/
	End 

END