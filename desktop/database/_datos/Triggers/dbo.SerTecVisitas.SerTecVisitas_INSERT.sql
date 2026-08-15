CREATE OR ALTER TRIGGER [dbo].[SerTecVisitas_INSERT] 
   ON dbo.SerTecVisitas
   AFTER INSERT
AS 
BEGIN
	SET NOCOUNT ON;

	declare @iservicio int;
	declare @observacion varchar(max);
    
	select top 1 @iservicio = c.svi_iServicio, @observacion = c.svi_cObservacion
	from SerTecVisitas c inner join inserted i on c.svi_idkey = i.svi_idkey

	insert into _datos..SertecTimeLine (stl_iServicio,stl_tFechaHora, stl_cAccion, stl_cObservacion)
	VALUES (@iservicio,GETDATE(),'ALTA VISITA',@observacion)
END