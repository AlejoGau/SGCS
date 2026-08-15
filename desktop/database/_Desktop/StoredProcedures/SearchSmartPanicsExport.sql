-- =============================================
-- Author:		Rodrigo Román
-- Create date: 2020/03/26
-- Description:	Exportación de smartpanics con eventos
-- =============================================
CREATE OR ALTER PROCEDURE SearchSmartPanicsExport
	-- Add the parameters for the stored procedure here
	@dealer char(3)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    /****** Script for SelectTopNRows command from SSMS  ******/
select cue_clinea as Dealer, 
	cue_cnombre as Nombre_de_cuenta
	, usu.usu_cnombre as Nombre_de_usuario
	, o.Telefono 
	, o.Imei
	, g.gps_tRawfechahora as Fecha_ultima_posicion
	, g.gps_rLatitud as Latitud
	, g.gps_rLongitud as Longitud
	, r.rec_tfechahora as FEcha_ultimo_evento
	, r.cod_cdescripcion as Evento_descripcion
	, r.gps_rLatitud as Evento_latitud
	, r.gps_rLongitud as Evento_longitud
	FROM [_datos].dbo.[SmartPanic] o WITH ( NOLOCK )
	LEFT JOIN _datos..m_cuentas c with (nolock) ON (o.CuentaId = c.cue_iid)
	LEFT JOIN _datos..p_GpsSP g WITH ( NOLOCK ) ON (o.imei = g.gps_cImei)
	left join _datos..m_telefonos t WITH ( NOLOCK ) on (RIGHT(t.tel_ctelefono, 8) = RIGHT(o.Telefono, 8)) AND tel_iidcuenta = c.cue_iid and t.tel_nsp IN (1,3)
	left join _datos..m_usuarios usu WITH ( NOLOCK ) on (usu_iidcuenta = c.cue_iid and usu_iid = t.tel_iid+700)
	OUTER APPLY (
		SELECT TOP 1 * FROM [_Datos]..p_recepcion r WITH ( NOLOCK )
		inner join _tablas..t_codigos_alarma on cod_ccodigo = r.rec_calarma
		inner join _datos..p_GpsSP gr on r.rec_iid = gr.gps_idRec
			WHERE r.rec_iidcuenta = c.cue_iid and r.rec_iid = g.gps_idRec  
			ORDER BY r.rec_tfechahora DESC
	) AS r
	where cue_clinea = @dealer
END