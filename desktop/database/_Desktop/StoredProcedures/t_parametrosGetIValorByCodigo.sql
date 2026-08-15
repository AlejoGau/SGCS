CREATE OR ALTER PROCEDURE [dbo].[t_parametrosGetIValorByCodigo]
										 @par_ccodigo varchar(128)
						  --WITH ENCRYPTION
							AS
										 Select [par_ivalor]
							  			 from [_tablas]..[t_parametros]
							 			  where [par_ccodigo] = @par_ccodigo