CREATE OR ALTER PROCEDURE [dbo].[WebManager_EstadoDeCuenta]
AS
					SET NOCOUNT ON

					select count(est_nestado) as conta,
                                                     (Case When est_nEstado=1 Then 'Prueba'
                                                           When est_nEstado=2 Then 'No Habilitado'
                                                           When est_nEstado=3 Then 'Prueba x Zonas '
                                                           Else 'Habilitado' End ) As Situacion
                                                FROM [_Datos].[dbo].m_cuentas 
                                                     left outer join [_Datos].[dbo].m_estado_cuenta_cab on cue_iid = est_iidcuenta
                                            group by est_nestado