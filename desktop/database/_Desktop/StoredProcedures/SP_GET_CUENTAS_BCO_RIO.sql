/*
This query text was retrieved from showplan XML, and may be truncated.
*/
CREATE OR ALTER PROCEDURE [dbo].[SP_GET_CUENTAS_BCO_RIO] AS
SELECT DISTINCT --TOP 450  
	M.cue_iid, 
	M.cue_clinea, 
	M.cue_ncuenta, 
	M.cue_cnombre,
	CASE
		WHEN M.cue_nparticion = 0 THEN ISNULL(S.sta_nestado, 0)
		ELSE (
			SELECT MIN(H.sta_nestado)
			FROM _Datos..m_status H
				INNER JOIN _Datos..m_cuentas B 
				ON H.sta_iidcuenta=B.cue_iid 
				AND B.cue_cMadreCuenta=M.cue_ncuenta) 
		END AS Abierta_cerrada_Madre,
	CASE
		WHEN M.cue_nparticion = 0 THEN S.sta_ncuentaenfallodetst
		ELSE (
			SELECT MAX(H.sta_ncuentaenfallodetst)
			FROM _Datos..m_status H
				INNER JOIN _Datos..m_cuentas B 
				ON H.sta_iidcuenta=B.cue_iid 
				AND B.cue_cMadreCuenta=M.cue_ncuenta) 
		END AS Fallo_test,
	ISNULL(C.rec_iidCuenta, 0) AS Eventos_pendientes,
	M1.cue_nparticion
FROM _Datos..m_cuentas M
LEFT JOIN _Datos..m_status S ON M.cue_iid=S.sta_iidcuenta
LEFT JOIN _Datos..EventosPendientes C ON C.rec_iidCuenta = M.cue_iid AND C.cue_nParticion = 0
LEFT  JOIN _Datos..m_cuentas M1 ON M.cue_iid=M1.cue_nparticion
WHERE M.cue_nparticion = 0 
AND C.cue_cLinea = 'MAU'
ORDER BY M1.cue_nparticion