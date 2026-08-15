CREATE OR ALTER PROCEDURE [dbo].[WebManager_EventosRecibidos]
AS
					SET NOCOUNT ON

					SELECT CAST(max(rec_iPuerto) AS INT) as puerto, Max(rec_norigen) As nOrigen,Count(rec_iid) As nCantidad,DATEPART(hh,rec_tfechahora) As hora
                                                FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK)
                                               Where (rec_nestado>=0 and rec_nestado<=7 )  
                                                     and CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112) 
                                                     And rec_norigen in (1,2,3,4,5,6,7,8) 
                                                     and DATEPART(hh,CONVERT(CHAR,rec_tfechahora,14))<= DATEPART(hh,CONVERT(CHAR,GETDATE(),14))
                                            Group By DATEPART(hh,rec_tfechahora),rec_norigen, rec_iPuerto