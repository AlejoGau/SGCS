-- Daniel O. Medina: trigger desarrollado para la tarea:
		-- https://softguard.atlassian.net/browse/DS-174

CREATE OR ALTER TRIGGER [dbo].[Trg_Upd_Cuenta_Estado_SIMCard] ON [dbo].[m_simcard] AFTER UPDATE As
BEGIN
    Declare @estado_updated int = 0
	Declare @cuenta_updated Int = 0
	Declare @sim_cuenta_inserted Int = 0
	Declare @sim_estado_inserted Int = 0
	Declare @sim_cuenta_deleted Int = 0
	Declare @sim_estado_deleted Int = 0
	Declare @sim_idkey Int = 0
	Declare @sim_udw_idKey int = 0
	Declare @Stl_cUserDss Varchar(255)
	
	Declare @udw_usuario Varchar(255)
	Declare @udw_nombre Varchar(255)
	Declare @udw_apellido Varchar(255)
	

  SELECT @sim_idkey = sim_idkey, @sim_cuenta_inserted=sim_cuenta
		, @sim_estado_inserted=sim_estado, @sim_udw_idKey=sim_udw_idKey
	FROM inserted    
  SELECT @sim_cuenta_deleted=sim_cuenta, @sim_estado_deleted=sim_estado 
	FROM deleted

  SELECT @udw_usuario=udw_usuario,@udw_nombre=udw_nombre
		, @udw_apellido=udw_apellido FROM _Sistema..UsersDesktopWeb where udw_idKey = @sim_udw_idKey
	  
  if @sim_cuenta_inserted<>@sim_cuenta_deleted
	begin
		SET @cuenta_updated = 1
	end
  if @sim_estado_deleted<>@sim_estado_inserted
	begin
		SET @estado_updated = 1
	end
  if @cuenta_updated = 1
	begin
		INSERT INTO _Datos.[dbo].[SimcardTimeLine]
				   (Stl_simcardidkey
				   ,Stl_tFechaHora
				   ,Stl_cAccion
				   ,Stl_cOriginal
				   ,Stl_cActualizado
				   ,Stl_cUserDss)
			 VALUES
				   (@sim_idkey
				   ,GetDate()
				   ,1 -- se modificó la cuenta 
				   ,@sim_cuenta_deleted
				   ,@sim_cuenta_inserted
				   ,concat(@udw_usuario,' | ',@udw_apellido,' | ',@udw_nombre))

	end

  if @estado_updated = 1
	begin
		INSERT INTO _Datos.[dbo].[SimcardTimeLine]
				   (Stl_simcardidkey
				   ,Stl_tFechaHora
				   ,Stl_cAccion
				   ,Stl_cOriginal
				   ,Stl_cActualizado
				   ,Stl_cUserDss)
			 VALUES
				   (@sim_idkey
				   ,GetDate()
				   ,2 -- se modificó el estado de la simcard 
				   ,@sim_estado_deleted
				   ,@sim_estado_inserted
				   ,concat(@udw_usuario,' | ',@udw_apellido,' | ',@udw_nombre))

	end

  
/*
USE [_Datos]
GO

INSERT INTO [dbo].[SimcardTimeLine]
           ([Stl_simcardidkey]
           ,[Stl_tFechaHora]
           ,[Stl_cAccion]
           ,[Stl_cOriginal]
           ,[Stl_cActualizado]
           ,[Stl_cUserDss])
     VALUES
           (<Stl_simcardidkey, int,>
           ,<Stl_tFechaHora, datetime,>
           ,<Stl_cAccion, int,>
           ,<Stl_cOriginal, varchar(max),>
           ,<Stl_cActualizado, varchar(max),>
           ,<Stl_cUserDss, varchar(100),>)
GO




*/

END