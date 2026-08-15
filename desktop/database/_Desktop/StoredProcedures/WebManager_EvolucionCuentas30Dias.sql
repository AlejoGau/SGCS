CREATE OR ALTER PROCEDURE [dbo].[WebManager_EvolucionCuentas30Dias]
AS
					SET NOCOUNT ON

					SELECT sts_tfechahora, sts_cdescripcion as descripcion, sts_icantidad as cantidad, CONVERT(CHAR(5),sts_tfechahora,3) As fecha_format
		                                        FROM [_Sistema].[dbo].s_stats 
		                                       WHERE CONVERT(CHAR,sts_tfechahora,112) > CONVERT(CHAR,DATEADD(day,-30,GETDATE()),112) 
		                                             AND CONVERT(char, sts_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
		                                             AND sts_ctipo = 'SC' 
		                                             AND sts_cdescripcion = 'Habilitado'
		                                    ORDER BY sts_tfechahora ASC