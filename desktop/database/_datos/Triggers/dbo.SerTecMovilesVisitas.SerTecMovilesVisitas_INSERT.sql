CREATE OR ALTER TRIGGER [dbo].[SerTecMovilesVisitas_INSERT] 
   ON [dbo].[SerTecMovilesVisitas]
   AFTER INSERT
AS 
BEGIN
	SET NOCOUNT ON;

	declare @iservicio int;
	declare @observacion varchar(max);
    
	select top 1 @iservicio = v.svi_iServicio, @observacion = tmp_cnombre 
	from SerTecMovilesVisitas c inner join inserted i on i.smv_idkey = c.smv_idkey
	inner join SerTecVisitas v on c.smv_iVisita = v.svi_idkey
	inner join _tablas..t_MovilesPatrulla on c.smv_iMovil = tmp_iid
	 

	insert into _datos..SertecTimeLine (stl_iServicio,stl_tFechaHora, stl_cAccion, stl_cObservacion)
	VALUES (@iservicio,GETDATE(),'ALTA MOVIL VISITA',@observacion)
END