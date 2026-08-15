CREATE OR ALTER TRIGGER [dbo].[SerTecTecnicoVisitas_INSERT] 
   ON [dbo].[SerTecTecnicoVisitas]
   AFTER INSERT
AS 
BEGIN
	SET NOCOUNT ON;

	declare @iservicio int;
	declare @observacion varchar(max);

	/*
	select top 1 @iservicio = v.svi_iServicio, @observacion = tec_cnombre 
	from SerTecTecnicoVisitas c inner join inserted i on i.stv_idkey = c.stv_idkey
	inner join SerTecVisitas v on c.stv_iVisita = v.svi_idkey
	inner join _tablas..t_tecnicos on c.stv_iTecnico = tec_idKey
    */

	declare @ins_ccodigo char(3)
	select top 1 @iservicio = v.svi_iServicio, @observacion = ins_cnombre, @ins_ccodigo=ins_ccodigo
	from SerTecTecnicoVisitas c inner join inserted i on i.stv_idkey = c.stv_idkey
	inner join SerTecVisitas v on c.stv_iVisita = v.svi_idkey
	inner join _tablas..t_instaladores on c.stv_iTecnico = ins_idKey

	insert into _datos..SertecTimeLine (stl_iServicio,stl_tFechaHora, stl_cAccion, stl_cObservacion)
	VALUES (@iservicio,GETDATE(),'ALTA TECNICO VISITA',@observacion)

	If @ins_ccodigo != '' And @ins_ccodigo is not null
	Begin
		Update [_Datos].[dbo].[m_st_cabecera]
		Set [stc_ctecnico_1] = @ins_ccodigo
		where [stc_inumero] = @iservicio
	End
END