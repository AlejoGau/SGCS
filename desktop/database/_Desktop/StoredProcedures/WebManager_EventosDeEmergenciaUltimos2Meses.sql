CREATE OR ALTER PROCEDURE [dbo].[WebManager_EventosDeEmergenciaUltimos2Meses]
AS
					SET NOCOUNT ON

					Select max(datepart(mm,rec_tfechahora)) as num_mes,Max(CONVERT(char(5), rec_tfechahora,3)) As cDesc, Count(rec_iid) As nCant
                                                From [_Datos].[dbo].p_recepcion   
                                               Where  ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,DATEADD(month,-2,GETDATE()),112) 
                                                     And CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) ) 
                                                     and ((rec_nestado>=0 and rec_nestado<=3) or (rec_nestado>=6 and rec_nestado<=7) ) 
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
                                            Group By CONVERT(char(8), rec_tfechahora,3)
                                            order by max(rec_tfechahora) asc