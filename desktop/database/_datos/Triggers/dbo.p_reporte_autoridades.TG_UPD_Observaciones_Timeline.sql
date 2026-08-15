CREATE OR ALTER TRIGGER [dbo].[TG_UPD_Observaciones_Timeline] ON [dbo].[p_reporte_autoridades] AFTER INSERT AS
BEGIN
	SET NOCOUNT ON;
	Declare @rec_iid int = 0,
			@rec_cObservaciones varchar(max) = '',
			@rep_iidcuenta int = 0

	SELECT @rec_iid = ra.rep_iidrecepcion, @rec_cObservaciones = ra.rep_mcomentario ,@rep_iidcuenta =ra.rep_iidcuenta
	FROM inserted i 
		INNER JOIN dbo.[p_reporte_autoridades] ra ON (i.rep_iidrecepcion = ra.rep_iidrecepcion)

	declare @FechaHoraProceso datetime = getdate()

declare @Obs varchar(max)
declare @idresolucion varchar(3)
declare @idcategorizacion varchar(3)

select @Obs = rec_cobservaciones, 
			 @idresolucion = rec_cCategorizacion,
			 @idcategorizacion = rec_cCategorizacion
from _datos..p_recepcion where rec_iid = @rec_iid

If (@rec_cObservaciones is not null and @rec_cObservaciones != '')
	begin
		set @Obs = @Obs 
		+ Char(13) 
		+ '['+convert(varchar, @FechaHoraProceso, 103)+' ' +substring(convert(varchar, getdate(), 114), 1, 5)+  '] [SISTEMA] '
		+ @rec_cObservaciones
	end


	update _datos..p_recepcion
	set rec_cObservaciones = @Obs
	where rec_iid = @rec_iid


-- guardo en timeline
INSERT INTO _Datos..EventosTimeline (
			etl_iRecID,
			etl_iCuenta,
			etl_tFechaHora,
			etl_cAccion,
			etl_cObservacion,
			etl_cOwner,
			etl_iOperador,
			etl_iAccionCode
		) VALUES (
			@rec_iid,
			@rep_iidcuenta,
			@FechaHoraProceso,
			'Autoridad',
			@rec_cObservaciones,
			'%Sistema%',
			0,
			201
		)

END