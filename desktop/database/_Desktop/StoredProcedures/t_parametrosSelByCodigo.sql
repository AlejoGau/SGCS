--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:37.713 
--#############################################################################

							CREATE OR ALTER PROCEDURE [dbo].[t_parametrosSelByCodigo]
										 @par_ccodigo NVARCHAR(128)
						  --WITH ENCRYPTION
							AS
										 Select [par_idKey] Id, '' Name
										 , [par_ccodigo], [par_cdescripcion], [par_ivalor], [par_mobservacion], [par_cconfig], null as [par_ccomentario], [par_cvalor]
							  			 from [_tablas]..[t_parametros]
							 			  where [par_ccodigo] = @par_ccodigo