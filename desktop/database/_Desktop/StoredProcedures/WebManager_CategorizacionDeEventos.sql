CREATE OR ALTER PROCEDURE [dbo].[WebManager_CategorizacionDeEventos]
AS
					SET NOCOUNT ON

					Select Max(res_cdescripcion) As cDesc, Count(*) As nCant
                                                From [_Datos].[dbo].p_recepcion With (NOLOCK)
                                                     Inner Join _Tablas.dbo.t_resoluciones On res_cCodigo = rec_idResolucion 
                                               Where (rec_nestado = 3 AND  rec_idResolucion  > 0) 
                                                     And ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,GETDATE(),112) 
                                                     And CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) ) 
                                            Group By rec_idResolucion