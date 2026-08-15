CREATE OR ALTER TRIGGER [dbo].[sertecProductosOrdenDELETETimeline]
   ON [dbo].[SerTecProductosOrden]
   AFTER DELETE
AS 
BEGIN
	SET NOCOUNT ON;

	declare @iservicio int;
	declare @observacion varchar(max);
    
	select top 1 @iservicio = d.spr_iServicio, @observacion = p.Name 
	from deleted d
	inner join Product p on p.Id = d.spr_iProducto

	insert into _datos..SertecTimeLine (stl_iServicio,stl_tFechaHora, stl_cAccion, stl_cObservacion)
	VALUES (@iservicio,GETDATE(),'BAJA PRODUCTO',@observacion)
END