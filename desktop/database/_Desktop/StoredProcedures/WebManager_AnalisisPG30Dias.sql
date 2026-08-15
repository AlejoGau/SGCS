CREATE OR ALTER PROCEDURE [dbo].[WebManager_AnalisisPG30Dias]
AS
					SET NOCOUNT ON

					SELECT CAST(max(rec_iPuerto) AS INT) as puerto,Count(rec_iid) As nCantidad,max(pue_cdescripcion) as descripcion
                                                FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK) 
                                                     Inner Join _Tablas.dbo.t_puertos On pue_npuerto  = rec_iPuerto
                                               Where (rec_nestado>=0 and rec_nestado<=7 ) 
                                                     And  rec_norigen = 2  
                                                     and rec_iPuerto<99 
                                                     and CONVERT(CHAR,rec_tfechahora,112)> CONVERT(CHAR,DATEADD(day,-30,GETDATE()),112)    
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
                                            Group By rec_iPuerto order by max(rec_iPuerto) asc