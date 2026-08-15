CREATE OR ALTER TRIGGER [dbo].[Trg_Fill_TimeLine_GRI] ON [dbo].[p_grabacion_img] AFTER INSERT AS
BEGIN
	Declare @idRec Int
	Declare @idCuenta Int
	Declare @iOperador Int
	
	Select @idRec = [gri_iidrecepcion], @idCuenta = [gri_iidcuenta], @iOperador=[gri_ioperador] From inserted

	Insert Into [dbo].[EventosTimeLine]
           ([etl_iRecID]
           ,[etl_iCuenta]
           ,[etl_tFechaHora]
           ,[etl_cAccion]
           ,[etl_cObservacion]
           ,[etl_cOwner]
           ,[etl_iOperador])
     Values
           (@idRec
           ,@idCuenta
           ,GETDATE()
           ,'Imagen'
           ,'%Captura de imagen en atencion de evento%'
		   ,'%SISTEMA%'
           ,@iOperador)


END