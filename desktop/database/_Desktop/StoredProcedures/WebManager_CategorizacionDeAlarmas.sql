CREATE OR ALTER PROCEDURE [dbo].[WebManager_CategorizacionDeAlarmas]
AS
					SET NOCOUNT ON

					Select Max(res_cdescripcion) As cDesc, Count(*) As nCant
                                                From [_Datos].[dbo].p_recepcion With (NOLOCK)
                                                     Inner Join _Tablas.dbo.t_resoluciones On res_cCodigo = rec_idResolucion 
                                               Where (rec_nestado = 3 AND  rec_idResolucion  > 0) 
                                                     And datepart(m,rec_tfechahora) = datepart(m,GETDATE()) 
                                            Group By rec_idResolucion