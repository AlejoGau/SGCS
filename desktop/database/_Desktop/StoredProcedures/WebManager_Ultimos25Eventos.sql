CREATE OR ALTER PROCEDURE [dbo].[WebManager_Ultimos25Eventos]
AS
					SET NOCOUNT ON

					Select TOP 25 convert(char,rec_tfechahora,105) as rec_tfecha_format , convert(char,rec_tfechahora,108) as rec_thora ,cod_ccodigo,cod_cdescripcion as descripcion, cod_ncolor as color_fondo, cod_nColorLetra as color_letra, cod_nColorLetra, cue_clinea, cue_ncuenta, cue_cnombre, rec_calarma, rec_nestado  
		                                        From [_Datos].[dbo].[p_recepcion]  
		                                             inner join [_Datos].[dbo].[m_cuentas]  on cue_iid=rec_iidcuenta 
		                                             inner join [_Tablas].[dbo].[t_codigos_alarma]  on cod_ccodigo=rec_calarma 
		                                       where (rec_nestado>2 and rec_nestado<8 )
		                                             and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
		                                    order by rec_tfechahora DESC