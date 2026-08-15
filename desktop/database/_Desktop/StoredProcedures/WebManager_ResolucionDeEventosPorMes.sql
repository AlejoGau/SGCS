CREATE OR ALTER PROCEDURE [dbo].[WebManager_ResolucionDeEventosPorMes]
AS
					SET NOCOUNT ON

					Select Max(cat_cdescripcion) As cDesc, Count(*) As nCant 
                                               From [_Datos].[dbo].p_recepcion With (NOLOCK)
                                                    Inner Join _Tablas.dbo.t_categorizacion On cat_cCodigo = rec_cCategorizacion
                                              Where (rec_nestado = 3 AND rec_cCategorizacion > 0) 
                                                    And datepart(m,rec_tfechahora) = datepart(m,GETDATE())
                                           Group By rec_cCategorizacion