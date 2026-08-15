CREATE OR ALTER PROCEDURE [dbo].[WebManager_ProcesamientosPorTerminal]
AS
					SET NOCOUNT ON

					SELECT  rec_cTerminal,Count(rec_iid) As nCantidad,DATEPART(hh,rec_tfechahora) As nHora
                                                FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK)
                                               Where CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112) and rec_nestado=3
                                            Group By DATEPART(hh,rec_tfechahora),rec_cTerminal