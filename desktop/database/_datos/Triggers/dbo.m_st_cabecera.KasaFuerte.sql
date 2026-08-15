CREATE OR ALTER TRIGGER [dbo].[KasaFuerte] 
   ON dbo.m_st_cabecera
   AFTER INSERT
AS 
BEGIN
	SET NOCOUNT ON;

	declare @iservicio int;
	declare @observacion varchar(max);
	declare @error varchar (1000) = ''
    
	select top 1 @iservicio = c.stc_iid, @observacion = c.stc_mobservaciones 
	from m_st_cabecera c inner join inserted i on c.stc_iid = i.stc_iid

	insert into [_SharedDB].[dbo].[SG_SAP] select stc_inumero as numatcard, t2.cue_ncuenta, t2.cue_clocalidad, t0.stc_ctipo_servicio as problemtyp, t0.stc_nestado as status,
t1.stl_tFechaHora as createdate,t2.cue_cIdExtendido as cardcode,t3.cue_cCustom as insID, t0.stc_mobservaciones as subjet, t4.tip_ntipo, @error as error, '' as observacion_cierre
from m_st_cabecera t0 
full outer join SerTecTimeLine t1 on t0.stc_iid=t1.stl_iServicio
full outer join m_cuentas t2 on t0.stc_iid_cuenta=t2.cue_iid 
full outer join m_CuentasXtraInfo t3 on t2.cue_iid=t3.cue_iidCuenta
full outer join _tablas.dbo.t_tiposervicio t4 on t0.stc_ctipo_servicio=t4.tip_ccodigo 
where tip_ntipo <> 2 and [stc_iid] = @iservicio

END