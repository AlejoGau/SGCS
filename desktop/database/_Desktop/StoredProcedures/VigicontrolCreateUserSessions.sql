-- =============================================
-- Author:		Rodrigo Román
-- Create date: 31/1/2018
-- Description:	Busca los eventos de login y logout de vigicontrol y los inserta en la tabla de sesiones para armar reportes
-- 2024-03-04 : Pablo.Se modifico para los casos de Login sin Logout previo
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[VigicontrolCreateUserSessions] 
	
AS
BEGIN
	SET NOCOUNT ON;
	Declare @message nVarChar(Max) = '',
		@StartDateTimeText VarChar(max)=''

	DECLARE @TraceIDStr NVARCHAR(36);
	-- Obtener como string (porque así se guardó)
	SET @TraceIDStr = CONVERT(NVARCHAR(36), SESSION_CONTEXT(N'TraceID'));

	-- Si nunca se seteó, @TraceID será NULL
	IF @TraceIDStr IS NULL
	BEGIN
		SET @TraceIDStr = CONVERT(NVARCHAR(36), NEWID());
		-- Opcional: guardarlo en el contexto para futuras llamadas en la misma sesión
		EXEC sp_set_session_context @key = N'TraceID', @value = @TraceIDStr;
	END
	
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | INICIO | '+@TraceIDStr
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;	
	
	begin try 
		-- LOGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Login | Busco el ultimo login de la tabla'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		declare @lastlogin int = 0;
		select top 1 @lastlogin = [vus_login_idrec] 
			From _datos..vigicontrolusersessions order by [vus_login_idrec] desc

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Login | @lastlogin => '+Cast(@lastlogin As VarChar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Login | Inserto los logins nuevos en [VigicontrolUserSessions]'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	
		/*
		insert into _datos..vigicontrolusersessions 
			select rec_iusuario as  [vus_iusuario]
				, rec_iidcuenta as [vus_idcuenta]
				, rec_tfechahora as [vus_dlogin]
				, null as [vus_dlogout]
				,rec_iid as [vus_login_idrec]
				,0 as [vus_logout_idrec]
			from _datos..p_recepcion where rec_calarma in ('V10','CA1') and rec_iid > @lastlogin
		*/
		DECLARE @iusuario Int = 0,
				@idcuenta Int = 0,
				@tfechahora Datetime,
				@idrec Int = 0,
				@vidkey Int = 0

		DECLARE NewLoginCursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY
		FOR	Select rec_iusuario,rec_iidcuenta,rec_tfechahora,rec_iid 
				From _Datos.dbo.p_recepcion
			Where rec_calarma IN('V10','CA1','V38') And rec_iid > @lastlogin

		OPEN NewLoginCursor

		FETCH NEXT FROM NewLoginCursor INTO @iusuario,@idcuenta,@tfechahora,@idrec
		WHILE @@FETCH_STATUS = 0
		BEGIN

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Login | Busca por cada registro si tiene algun login sin logout'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			BEGIN TRY
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
			END TRY
			BEGIN CATCH
			END CATCH;	

			Set @vidkey=0
			/*
			Select TOP (1) @vidkey=[vus_idkey]
				From [_Datos].[dbo].[VigicontrolUserSessions]
			Where [vus_idcuenta]=@idcuenta
				And [vus_iusuario]=@iusuario
				And [vus_dlogout] Is null 
			Order By [vus_dlogout] Desc
			*/
			Select TOP (1) @vidkey=[vus_idkey]
				From [_Datos].[dbo].[VigicontrolUserSessions]
			Where [vus_idcuenta]=@idcuenta
				And [vus_iusuario]=@iusuario
				And [vus_login_idrec]!=@idrec
				And [vus_dlogout] Is null 
			Order By [vus_dlogin] Desc

			If @vidkey>0
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Login | Hay Login sin Logout. Se tiene hay que actualizar el registro en [VigicontrolUserSessions] con el rec_tfechahora as [vus_dlogin] que se va a generar el nuevo login'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				BEGIN TRY
					INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
												Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
				END TRY
				BEGIN CATCH
				END CATCH;	

				UPDATE [_Datos].[dbo].[VigicontrolUserSessions]
				   SET [vus_dlogout] = @tfechahora
				 WHERE [vus_idkey]=@vidkey
			End

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Login | Por ultimo insertar en [VigicontrolUserSessions] con los datos del cursor'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			BEGIN TRY
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
			END TRY
			BEGIN CATCH
			END CATCH;	

			INSERT INTO [_Datos].[dbo].[VigicontrolUserSessions]
					   ([vus_iusuario]
					   ,[vus_idcuenta]
					   ,[vus_dlogin]
					   ,[vus_dlogout]
					   ,[vus_login_idrec]
					   ,[vus_logout_idrec])
				 VALUES
					   (@iusuario
					   ,@idcuenta
					   ,@tfechahora
					   ,null
					   ,@idrec
					   ,0)

		  FETCH NEXT FROM NewLoginCursor INTO @iusuario,@idcuenta,@tfechahora,@idrec
		END

		CLOSE NewLoginCursor
		DEALLOCATE NewLoginCursor

		
		-- LOGOUT
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Logout | Busco el ultimo logout de la tabla'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;			

		declare @lastlogout int = 0;
		select top 1 @lastlogout = [vus_logout_idrec] 
			From _datos..vigicontrolusersessions order by [vus_logout_idrec] desc

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Logout | @lastlogout => '+Cast(@lastlogout As VarChar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;			
		
		declare @rec_iid int
		declare @rec_tfechahora datetime
		declare @rec_iusuario int
		declare @rec_iidcuenta int

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Logout | Recorro los logouts nuevos'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		Declare logout_cursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
			SELECT rec_iid, rec_tfechahora, rec_iusuario, rec_iidcuenta
			FROM _datos..p_recepcion 
			where rec_calarma in ('V11','CA2','V97','V39') and rec_iid > @lastlogout  

		OPEN logout_cursor   
		FETCH NEXT FROM logout_cursor INTO @rec_iid, @rec_tfechahora, @rec_iusuario, @rec_iidcuenta

		WHILE @@FETCH_STATUS = 0   
		BEGIN   
			begin try
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Logout | Por cada logout actualizo la tabla de sesiones'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				BEGIN TRY
					INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
												Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
				END TRY
				BEGIN CATCH
				END CATCH;	

				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Logout | Busco el ultimo login vacio del usuario  => '+Cast(@rec_iusuario As VarChar(10))+' con vus_dlogin < @rec_tfechahora =>'+ Rtrim(Convert(VarChar, @rec_tfechahora,120) ) 
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				BEGIN TRY
					INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
												Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
				END TRY
				BEGIN CATCH
				END CATCH;	

				declare @vus_idkey int=0;
				declare @vus_dlogin datetime
				select top 1 @vus_dlogin = vus_dlogin,@vus_idkey = vus_idkey 
					from _datos..vigicontrolusersessions 
					where vus_idcuenta = @rec_iidcuenta 
					and vus_iusuario = @rec_iusuario
					and vus_logout_idrec = 0
					and vus_dlogout is null -- AGREGO MAURO
					and vus_dlogin < @rec_tfechahora -- me aseguro que el login sea anterior al logout
					order by vus_login_idrec desc -- traigo el ultimo login de ese usuario libre, por si hubo 2 login sin logout tomo el ultimo.

				If @vus_idkey Is Not Null And @vus_idkey > 0
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Logout | @vus_idkey => '+Cast(@vus_idkey As VarChar(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	
					BEGIN TRY
						INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
													Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
					END TRY
					BEGIN CATCH
					END CATCH;						

					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Logout | Me fijo si tiene un Login para el mismo usuario-cuenta posterior al NO logout y tomo [vus_dlogin] como @rec_tfechahora'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					BEGIN TRY
						INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
													Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
					END TRY
					BEGIN CATCH
					END CATCH;	

					declare @dlogin datetime
					declare @idkey int=0;
					Set @vus_dlogin = Null --X que al loopear le queda el valor anterior

					;With Sessions As (
						select top 2 vus_dlogin, vus_idkey 
							from _datos..vigicontrolusersessions 
							where vus_idcuenta = @rec_iidcuenta 
							and vus_iusuario = @rec_iusuario
							and [vus_login_idrec] > 0
							and vus_dlogin > @vus_dlogin -- me aseguro que el login sea despues del ultimo
							and vus_dlogout is null -- AGREGO MAURO
							and vus_dlogin < @rec_tfechahora -- me aseguro que el login sea anterior al logout
							order by vus_login_idrec desc -- traigo el ultimo login de ese usuario libre, por si hubo 2 login sin logout tomo el ultimo.
						) Select top 1 @dlogin = vus_dlogin, @idkey = vus_idkey 
						From Sessions Order By vus_idkey

					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					If @dlogin Is Not Null And @idkey != @vus_idkey
					Begin
						Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Logout | Encontre @idkey => '+Cast(@idkey As VarChar(10))+ ' Por lo tanto @rec_tfechahora toma el valor de @vus_dlogin =>'+ Rtrim(Convert(VarChar, @dlogin,120) )
						Set @rec_tfechahora = @dlogin
					End
					Else
					Begin
						Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Logout | NO Encontre. Use @rec_tfechahora del ultimo evento V11,CA2,V97 generado en pRecepcion'
					End
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					BEGIN TRY
						INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
													Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
					END TRY
					BEGIN CATCH
					END CATCH;	

					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Logout | Actualizo el registro @vus_idkey => '+Cast(@vus_idkey As VarChar(10))+' con el logout con =>'+ Rtrim(Convert(VarChar, @rec_tfechahora,120)) + ' y vus_logout_idrec => '+Cast(@rec_iid As VarChar(10))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					BEGIN TRY
						INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
													Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
					END TRY
					BEGIN CATCH
					END CATCH;						
					
					Update _datos..vigicontrolusersessions 
						set vus_logout_idrec = @rec_iid, vus_dlogout = @rec_tfechahora
						where vus_idkey = @vus_idkey

				End
				end try
			begin catch
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | Logout | Hubo un error al actualizar [VigicontrolUserSessions] @vus_idkey => '+Cast(@vus_idkey As VarChar(10))
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT		
				BEGIN TRY
					INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
												Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
				END TRY
				BEGIN CATCH
				END CATCH;	
			end catch
		
			FETCH NEXT FROM logout_cursor INTO @rec_iid, @rec_tfechahora,@rec_iusuario,@rec_iidcuenta
		END   

		CLOSE logout_cursor   
		DEALLOCATE logout_cursor

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | FIN ' + @TraceIDStr
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

	End try
	begin catch
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [VigicontrolCreateUserSessions] | FIN con Error | '+@TraceIDStr
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	
	End catch
END