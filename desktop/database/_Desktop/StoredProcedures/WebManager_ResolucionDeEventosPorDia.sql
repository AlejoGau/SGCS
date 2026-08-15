CREATE OR ALTER PROCEDURE [dbo].[WebManager_ResolucionDeEventosPorDia]
AS
					SET NOCOUNT ON

					Select Max(cat_cdescripcion) As cDesc, Count(*) As nCant 
                                               From [_Datos].[dbo].p_recepcion With (NOLOCK)
                                                    Inner Join _Tablas.dbo.t_categorizacion On cat_cCodigo = rec_cCategorizacion
                                              Where (rec_nestado = 3 AND rec_cCategorizacion > 0) 
                                                    And ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,GETDATE(),112)
                                                    And CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)) 
                                           Group By rec_cCategorizacion