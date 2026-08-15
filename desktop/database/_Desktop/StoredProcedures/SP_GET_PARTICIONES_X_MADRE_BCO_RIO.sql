/*
This query text was retrieved from showplan XML, and may be truncated.
*/
CREATE OR ALTER PROCEDURE [dbo].[SP_GET_PARTICIONES_X_MADRE_BCO_RIO] 
	@cue_iid INT
AS
 SELECT 
 		ROW_NUMBER() OVER (ORDER BY c.cue_ncuenta ASC) AS RowNumber, 
		c.cue_iid,
		c.cue_clinea, 
	--	c.cue_ncuenta, 
		c.cue_cnombre,
		CASE ms.sta_nestado
			WHEN 0 THEN 'Activado'
			WHEN 1 THEN 'Desactivado'
		END AS Estado,
		ms.sta_ncuentaenfallodetst +
		ms.sta_ncuentaenfallo2dotst +
		ms.sta_ncuentaenfallo3ertst AS 'Fallo_Tst',
		CASE ISNULL(ev.rec_iidCuenta, 0)
			WHEN  0 THEN 'No'
			ELSE 'Si'
		END AS 'Eventos_Pendientes',
		ISNULL(cx.cue_iEnFalla, '') AS 'EnFalla'
		FROM _Datos.dbo.m_cuentas c
			LEFT OUTER JOIN _Desktop.dbo.m_estado_cuenta_cab_situacion st ON c.cue_iid = st.est_iidcuenta           
			LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = c.cue_iid                 
			LEFT OUTER JOIN _Tablas.dbo.t_tipos o ON tip_ccodigo = c.cue_ctipo
			LEFT JOIN _Datos..m_CuentasXtraInfo cx ON c.cue_iid=cx.cue_iidCuenta
			LEFT JOIN _datos..m_zonas Z on c.cue_clinea =  z.zon_cdealer and c.cue_ncuenta = z.zon_ccuenta  
			--OUTER APPLY (
			--	SELECT TOP 1 * FROM _Datos..m_cuentas m 
			--	WHERE m.cue_nparticion = c.cue_iid ORDER BY 1 DESC
			--) AS cue_particion

			OUTER APPLY (
				SELECT TOP 1 * FROM _Datos..EventosPendientes ev WHERE ev.rec_iidCuenta = c.cue_iid ORDER BY 1 DESC
			) AS ev
 WHERE c.cue_nparticion <> '0' AND (o.tip_nTipo NOT IN (1,2,3,5,6,9,11) or o.tip_nTipo is null)
 AND C.CUE_NPARTICION = @cue_iid
--ORDER BY ev.rec_iidCuenta DESC
order by z.zon_ccodigo