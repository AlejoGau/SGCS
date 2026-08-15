CREATE OR ALTER PROCEDURE [dbo].[WebManager_AlertasGeoreferenciadas]
AS
					SET NOCOUNT ON

					Select top 25 cue_ncuenta,cue_cNombre,cue_cCalle,cue_cLatLng,cod_cdescripcion as descripcion,cast(cod_ncolor as char) as color_fondo,cue_clinea,rec_nestado, (select pro_cdescripcion from [_Tablas].dbo.t_provincias where pro_ccodigo = cue_cprovincia) as cue_cprovincia, cue_clocalidad, (select par_mobservacion from [_tablas].dbo.t_parametros where par_ccodigo = 'NOMBREPAIS') pais, cue_ccodigopostal
	                                           From [_Datos].[dbo].[p_recepcion]  
	                                                inner join [_Datos].[dbo].[m_cuentas]  on cue_iid=rec_iidcuenta 
	                                                inner join [_Tablas].[dbo].[t_codigos_alarma]  on cod_ccodigo=rec_calarma 
	                                          where rec_nestado<3 
                                                    And cue_cLatLng Not In('','0.0,0.0') 
                                                    and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
                                           order by rec_tfechahora desc