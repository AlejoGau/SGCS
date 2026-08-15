CREATE OR ALTER PROCEDURE [dbo].[WebManager_EvolucionCuentas12Meses]
AS
					SET NOCOUNT ON

					SELECT Avg(sts_icantidad) as cantidad, month(sts_tfechahora) as mes, year(sts_tfechahora) as ano 
                                                FROM [_Sistema].[dbo].s_stats 
			                                   WHERE CONVERT(CHAR,sts_tfechahora,112) > CONVERT(CHAR,DATEADD(year,-1,GETDATE()),112) 
			                                         AND CONVERT(char, sts_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
			                                         AND sts_ctipo = 'SC' 
			                                         AND sts_cdescripcion = 'Habilitado'
			                                GROUP BY month(sts_tfechahora), year(sts_tfechahora)
			                                ORDER BY year(sts_tfechahora),month(sts_tfechahora) asc