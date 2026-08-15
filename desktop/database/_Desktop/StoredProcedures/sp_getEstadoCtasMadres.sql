CREATE OR ALTER PROCEDURE [dbo].[sp_getEstadoCtasMadres] 
	@cue_iid INT = null
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
	ROW_NUMBER() OVER (ORDER BY c.cue_ncuenta ASC) AS RowNumber, 
	c.cue_iid,
	c.cue_clinea, 
	c.cue_ncuenta, 
	c.cue_cnombre,
	CASE ms.sta_nestado
		WHEN 0 THEN 'SI'
		WHEN 1 THEN 'NO'
	END AS activadaCuentaMadre,
	CASE 
		WHEN EstP.Estado = 0 THEN 'SI'
		WHEN EstP.Estado > 0 THEN 'NO'
		ELSE 'NULL'
	END AS 'activadaParticion',
	CASE ISNULL(ev.rec_iidCuenta, 0)
		WHEN  0 THEN 'NO'
		ELSE 'SI'
	END AS 'eventoPendienteCuentaMadre',	
	CASE
		WHEN EstP.Eventos_Pendientes = 0 THEN 'NO'
		WHEN EstP.Eventos_Pendientes > 0 THEN 'SI'
		ELSE 'NULL'
	END AS 'eventoPendienteParticion',
	CASE
		WHEN (ms.sta_ncuentaenfallodetst +
				ms.sta_ncuentaenfallo2dotst +
				ms.sta_ncuentaenfallo3ertst)=0 THEN 'NO'
		ELSE 'SI'
	END AS 'falloTestCuentaMadre',
	ccx.cue_iEnFalla AS 'CuentaEnFalla',
	CASE ISNULL(cx.EnFalla, 0)
		WHEN  0 THEN 0
		ELSE 1
	END AS 'ParticionEnFalla'

FROM _Datos.dbo.m_cuentas c
	LEFT OUTER JOIN _Desktop.dbo.m_estado_cuenta_cab_situacion st ON c.cue_iid = st.est_iidcuenta           
	LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = c.cue_iid                 
	LEFT OUTER JOIN _Tablas.dbo.t_tipos o ON tip_ccodigo = c.cue_ctipo
	LEFT JOIN Estados_Particiones EstP ON EstP.cue_nparticion=c.cue_iid
	LEFT JOIN _Datos..m_CuentasXtraInfo ccx ON c.cue_iid=ccx.cue_iidCuenta
	OUTER APPLY (
		SELECT Sum(cue_iEnfalla) As Enfalla FROM _Datos..m_CuentasXtraInfo cx WHERE cx.cue_iidCuenta IN (Select mc.cue_iid From _Datos.dbo.m_cuentas mc Where mc.cue_nparticion=c.cue_iid )
	) AS cx
	OUTER APPLY (
		SELECT TOP 1 * FROM _Datos..EventosPendientes ev WHERE ev.rec_iidCuenta = c.cue_iid ORDER BY 1 DESC
	) AS ev
 WHERE c.cue_nparticion = '0' AND (o.tip_nTipo NOT IN (1,2,3,5,6,9,11) or o.tip_nTipo is null)
	AND C.cue_cLinea = 'MAU'
	and (@cue_iid IS NULL OR c.cue_iid = @cue_iid)       
 ORDER BY c.cue_iid

END