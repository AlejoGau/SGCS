-- =============================================
-- Author:		Roman Rodrigo
-- Create date: 26/10/2021
-- Description:	Duplico evento y su multimedia en otra cuenta
-- 2022/09/01 : Pablo. Agregue insert en p_RXImg ( https://softguard.atlassian.net/browse/DS-217)
-- 2022/09/14 : Pablo. Agregue insert en p_RXLog ( https://softguard.atlassian.net/browse/DS-217)
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[EventoDuplicar]
	-- Add the parameters for the stored procedure here
	@rec_iid int --evento de origen
	,@idCuentaDestino int -- cuenta de destino del evento
AS
BEGIN
	SET NOCOUNT ON;
	declare @recCopiado int

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max)=''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [EventoDuplicar] Copio el evento mm en la cuenta destino | @idCuentaDestino : ' + CAST(@idCuentaDestino AS VARCHAR(10))+' | @rec_iid : ' + CAST(@rec_iid AS VARCHAR(10))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	insert into _datos..p_recepcion (
			[rec_iidcuenta]
			,[rec_calarma]
			,[rec_czona]
			,[rec_iusuario]
			,[rec_tfechahora]
			,[rec_nestado]
			,[rec_cContenido]
			,[rec_tFechaProceso]
			,[rec_ioperador]
			,[rec_cObservaciones]
			,[rec_cTerminal]
			,[rec_idResolucion]
			,[rec_idReceptor]
			,[rec_cCategorizacion]
			,[rec_iNYR]
			,[rec_iTE]
			,[rec_tFechaRecepcion]
			,[rec_nOrigen]
			,[rec_idMap]
			,[rec_idFwd]
			,[rec_iMinutosEspera]
			,[rec_iPuerto]
			,[rec_idLoc]
			,[rec_iPrioridad]
		)
		select @idCuentaDestino
			,[rec_calarma]
			,[rec_czona]
			,[rec_iusuario]
			,[rec_tfechahora]
			,5
			,[rec_cContenido]
			,[rec_tFechaProceso]
			,[rec_ioperador]
			,[rec_cObservaciones]
			,[rec_cTerminal]
			,[rec_idResolucion]
			,[rec_idReceptor]
			,[rec_cCategorizacion]
			,[rec_iNYR]
			,[rec_iTE]
			,[rec_tFechaRecepcion]
			,[rec_nOrigen]
			,[rec_idMap]
			,[rec_idFwd]
			,[rec_iMinutosEspera]
			,[rec_iPuerto]
			,[rec_idLoc]
			,[rec_iPrioridad]
		from _datos..p_recepcion where rec_iid = @rec_iid

		-- tomo el id del evento generado
		select @recCopiado = SCOPE_IDENTITY()
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [EventoDuplicar] tomo el id del evento generado | @recCopiado : ' + CAST(@recCopiado AS VARCHAR(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		-- copio la multimedia asociandola al evento generado
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [EventoDuplicar] Inserto en p_grabacion_mp4'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

        INSERT INTO [_Datos].[dbo].[p_grabacion_mp4]
            ([grm_iidCuenta]
            ,[grm_iidRecepcion]
            ,[grm_dFechaHora]
            ,[grm_cCarpeta]
            ,[grm_cArchivo]
            ,[grm_cTipo])
        select
            @idCuentaDestino
            ,@recCopiado
            ,[grm_dFechaHora]
            ,[grm_cCarpeta]
            ,[grm_cArchivo]
            ,[grm_cTipo]
		from [_Datos].[dbo].[p_grabacion_mp4] where [grm_iidRecepcion] = @rec_iid

		
		declare @ext varchar(10)
		select @ext = [grm_cTipo] from [_Datos].[dbo].[p_grabacion_mp4] where [grm_iidRecepcion] = @recCopiado
		if (@ext = 'JPG' or @ext = 'JPEG')
        BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [EventoDuplicar] Inserto en p_grabacion_img'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

            INSERT INTO [_Datos].[dbo].[p_grabacion_img]
                ([gri_iidcuenta]
                ,[gri_iidrecepcion]
                ,[gri_dfechahora]
                ,[gri_ccarpeta]
                ,[gri_carchivo])
            select
				@idCuentaDestino
                ,@recCopiado
                ,getdate()
                ,[gri_ccarpeta]
                ,[gri_carchivo]
			from [_Datos].[dbo].[p_grabacion_img] where [gri_iidrecepcion] = @rec_iid
        END
        
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [EventoDuplicar] Inserto en p_RXImg'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		INSERT INTO [_Datos].[dbo].[p_RXImg]
				   ([rxi_iRecId]
				   ,[rxi_cImg]
				   ,[rxi_cCarpeta]
				   ,[rxi_nEstado]
				   ,[rxi_cTipo]
				   )
			 Select
		           @recCopiado
	              ,[rxi_cImg]
		          ,[rxi_cCarpeta]
				  ,[rxi_nEstado]
				  ,[rxi_cTipo]
			From [_Datos].[dbo].[p_RXImg] where [rxi_iRecId] = @rec_iid

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [EventoDuplicar] Inserto en p_RXLog'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		INSERT INTO [_Datos].[dbo].[p_RXLog]
				   ([rxl_iRecId],[rxl_cLog],[rxl_cDll],[rxl_cEvento],[rxl_cLineCard])
			Select @recCopiado,[rxl_cLog],[rxl_cDll],[rxl_cEvento],[rxl_cLineCard]
				From [_Datos].[dbo].[p_RXLog] where [rxl_iRecId] = @rec_iid

END