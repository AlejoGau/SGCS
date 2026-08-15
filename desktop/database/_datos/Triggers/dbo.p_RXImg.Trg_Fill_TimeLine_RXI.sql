CREATE OR ALTER TRIGGER [dbo].[Trg_Fill_TimeLine_RXI] ON [dbo].[p_RXImg] AFTER INSERT AS
BEGIN
	Declare @idRec Int
	Declare @idCuenta Int
	Declare @iOperador Int
	Declare @cTipo nVarChar(20)
	declare @file varchar(200)
	declare @folder varchar(200)
	declare @estado int
	declare @rxi_iid int

	Select @rxi_iid= rxi_iid, @idRec = [rxi_iRecId], @cTipo= [rxi_cTipo], @file = rxi_cImg, @folder=rxi_cCarpeta, @estado = rxi_nEstado From inserted
	--Veo si son webm
	If Lower(@cTipo) = 'webm'
		Update p_recepcion Set rec_cContenido=Left('[WEBM]'+Rtrim(Ltrim(rec_cContenido)),50) Where rec_iid=@idRec

	--Si no son mp4 no inserto
	If @cTipo <> 'mp4'
		Set NoExec On

	-- cuando tengo mp4 sin copiar en estado 0 lo copio usando remotecall (visto en alerti para los mp4 que graba launcher)
	if @estado = 0
	begin
		INSERT INTO _datos.[dbo].[RemoteCallQueue]
           ([rcq_estado]
           ,[rcq_tipo]
           ,[rcq_url]
		   ,rcq_config
           )
     VALUES
           (0
           ,'EXE'
           ,'xcopy' 
		   ,@file+' '+@folder +'\ /i /y'
           )

		update _datos.[dbo].[p_RXImg] set rxi_nEstado = 1 where rxi_iid =@rxi_iid
	end

	Select @idCuenta = [rec_iidcuenta], @iOperador=[rec_ioperador] From p_recepcion Where rec_iid = @idRec

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
           ,'Audio'
           ,'%Audio recibido de SmartPanics/VigiControl%'
		   ,'%SISTEMA%'
           ,@iOperador)

	Set NoExec Off		
END