CREATE OR ALTER PROCEDURE [dbo].[AgregarTimelineAsignacionSearch]
	--@calarma  VARCHAR (3),
	@estado int,
	@observacion NVARCHAR (MAX) = '',
	@rec_iid INT,
    @amh_amv_objectid INT,
	@amh_amv_objecttypeid INT
AS
BEGIN
  IF @estado != '' 
		BEGIN
			DECLARE @message NVARCHAR (MAX) = ''
			DECLARE @rec_iidcuenta INT = 0 ;
			Declare @rec_iOperador Int = 0

			select @rec_iidcuenta = rec_iidcuenta, @rec_iOperador=rec_iOperador from _datos..p_recepcion where rec_iid = @rec_iid

			--elijo el mensaje segun la alarma
		/*	IF @calarma = 'V23'
				BEGIN
					SET @message = '%MOVIL CANCELADO%'
				END
			ELSE IF @calarma = 'V24'
				BEGIN
					SET @message = '%MOVIL COMPLETO%'
				END
			ELSE IF @calarma = 'V25'
				BEGIN
					SET @message = '%MOVIL EN CAMINO%'
				END
			ELSE IF @calarma = 'V26'
				BEGIN
					SET @message = '%MOVIL ARRIBADO%'
				END*/
			IF @estado = 1
				BEGIN
					SET @message = '%MOVIL ASIGNACION%'
				END
			ELSE IF @estado = 2
				BEGIN
					SET @message = '%MOVIL CANCELADO%'
				END
			ELSE IF @estado = 3
				BEGIN
					SET @message = '%MOVIL COMPLETO%'
				END
			ELSE IF @estado = 11
				BEGIN
					SET @message = '%MOVIL EN CAMINO%'
				END
			ELSE IF @estado = 12
				BEGIN
					SET @message = '%MOVIL ARRIBADO%'
				END
			
			DECLARE @datenow DateTime = GETDATE();
		  DECLARE @finalMessage NVARCHAR(max) = '['+@message+'] '+@observacion;

		  Insert into [_datos]..[EventosTimeline] ([etl_irecid],[etl_icuenta],[etl_tfechahora],[etl_caccion],[etl_cobservacion],[etl_cowner],[etl_ioperador],[etl_iaccioncode])
										 						 values ( @rec_iid, @rec_iidcuenta, @datenow, '%AsignacionMovil%', @finalMessage, '%SISTEMA%', @rec_iOperador, 0 )

		  Insert into [_datos]..[p_asignacionMovilHistorico] (amh_fechahora,amh_observacion,amh_rec_iid,amh_cue_iid, amh_amv_objectid, amh_amv_objecttypeid)
										 						 values ( @datenow,@finalMessage,@rec_iid, @rec_iidcuenta, @amh_amv_objectid, @amh_amv_objecttypeid )
										

		END
END