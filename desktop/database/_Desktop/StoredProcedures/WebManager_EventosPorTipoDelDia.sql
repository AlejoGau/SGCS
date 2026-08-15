CREATE OR ALTER PROCEDURE [dbo].[WebManager_EventosPorTipoDelDia]
AS
					SET NOCOUNT ON

					SELECT count(rec_calarma) as cant ,rec_calarma as tipo
	                                            FROM [_Datos].[dbo].p_recepcion 
                                               where CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112)
	                                        group by rec_calarma