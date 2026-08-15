CREATE OR ALTER TRIGGER [dbo].[SerTecProductosOrden_INSERT] 
   ON [dbo].[SerTecProductosOrden]
   AFTER INSERT
AS 
BEGIN
	SET NOCOUNT ON;

	declare @iservicio int;
	declare @observacion varchar(max);
    
	select top 1 @iservicio = c.spr_iServicio, @observacion = ''
	from SerTecProductosOrden c inner join inserted i on c.spr_idkey = i.spr_idkey

	insert into _datos..SertecTimeLine (stl_iServicio,stl_tFechaHora, stl_cAccion, stl_cObservacion)
	VALUES (@iservicio,GETDATE(),'ALTA PRODUCTO',@observacion)
END