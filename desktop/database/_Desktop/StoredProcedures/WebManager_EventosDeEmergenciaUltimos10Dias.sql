CREATE OR ALTER PROCEDURE [dbo].[WebManager_EventosDeEmergenciaUltimos10Dias]
AS
					SET NOCOUNT ON

					Select Max(CONVERT(char(8), rec_tfechahora,3)) As cDesc, Count(rec_iid) As nCant, CAST(Max(rec_tfechahora ) AS VARCHAR) As dia
	                                            From [_Datos].[dbo].p_recepcion   
	                                           Where  ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,DATEADD(day,-9,GETDATE()),112) 
	                                                  And CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) ) 
                                                      and ((rec_nestado>=0 and rec_nestado<=3) or (rec_nestado>=6 and rec_nestado<=7) )
	                                         Group By CONVERT(char(8), rec_tfechahora,3)
	                                         ORDER BY dia asc