CREATE OR ALTER PROCEDURE [dbo].[WebManager_EventosRecibidos30Dias]
AS
					SET NOCOUNT ON

					SELECT CAST(max(rec_iPuerto) AS INT) as puerto, CAST(Max(rec_norigen) AS VARCHAR) As nOrigen,Count(rec_iid) As nCantidad, CONVERT(CHAR(5),rec_tfechahora,3) As nFecha
                                               FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK)
                                              Where (rec_nestado>=0 and rec_nestado<=7 ) 
                                                    And  rec_norigen >= 1 
                                                    and rec_norigen <=8 
                                                    and CONVERT(CHAR,rec_tfechahora,112)> CONVERT(CHAR,DATEADD(day,-30,GETDATE()),112) 
                                                    and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
                                                    and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
                                           Group By CONVERT(CHAR(5),rec_tfechahora,3),rec_norigen,rec_iPuerto order by max(rec_tfechahora) asc