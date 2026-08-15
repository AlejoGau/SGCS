CREATE OR ALTER PROCEDURE [dbo].[WebManager_CuentasGeoreferenciadas]
AS
					SET NOCOUNT ON

					Select cue_clinea,cue_ncuenta,cue_cNombre,cue_cCalle,cue_cLatLng, (select pro_cdescripcion from [_Tablas].dbo.t_provincias where pro_ccodigo = cue_cprovincia) as cue_cprovincia, cue_clocalidad, (select par_mobservacion from [_tablas].dbo.t_parametros where par_ccodigo = 'NOMBREPAIS') pais, cue_ccodigopostal
                                                From [_Datos].[dbo].m_cuentas
                                               Where cue_ncuenta Not In ('0000','XXXX') And cue_clinea Not In('_SG','_MP')
                                                     And cue_cLatLng Not In('','0.0,0.0')
                                                     And cue_iid Not In ( Select est_iidcuenta 
                                                                            From [_Datos].[dbo].m_estado_cuenta_Cab
                                                                           Where est_iidcuenta=cue_iid AND est_nEstado=2 )