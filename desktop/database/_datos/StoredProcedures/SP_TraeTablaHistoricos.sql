CREATE OR ALTER PROCEDURE [dbo].[SP_TraeTablaHistoricos] @i_idreporte Int AS
SET NOCOUNT ON
SELECT RTRIM( table_name ) AS table_name, CASE WHEN n_usado = null THEN 0 ELSE n_usado END AS l_usado, 
       @i_idreporte AS i_idreporte, CASE WHEN c_periodo = null  THEN 1 ELSE 0 END AS l_nuevo
	FROM ( SELECT table_name 
              FROM information_schema.columns 
              WHERE  table_name Like 'p_recepcion%' And table_name Not In ('p_recepcion','p_recepcion_notas','p_recepcion_proceso','p_recepcion_D')
			  	 And table_name Not Like 'p_recepcion_proceso%'
              GROUP BY table_name ) AS c_historicos 
	LEFT OUTER JOIN ( SELECT iid_reporte, c_periodo, n_usado
                           FROM _Sistema..s_tablahistoricos
                             WHERE iid_reporte = @i_idreporte ) AS c_tablahistoricos ON c_historicos.table_name = c_tablahistoricos.c_periodo
ORDER BY table_name DESC