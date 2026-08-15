CREATE OR ALTER PROCEDURE [dbo].[WebManager_ProcesoEventosActuales]
AS
					SET NOCOUNT ON

					Select count(rec_nestado) as conta,
                                                     (Case When rec_nestado=0 Then 'Pendientes'
                                                           When rec_nestado=1 Then 'En Proceso'
                                                           When rec_nestado=2 Then 'Espera'
                                                           Else 'Habilitado' End ) As Situacion
                                                FROM [_Datos].[dbo].p_recepcion 
                                               where rec_nestado < 3  
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
                                            group by rec_nestado