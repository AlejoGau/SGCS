CREATE OR ALTER PROCEDURE [dbo].[t_parametrosGetMObservacionByCodigo]
										 @par_ccodigo varchar(128)
						  --WITH ENCRYPTION
							AS
										 Select [par_cValor]
							  			 from [_tablas]..[t_parametros]
							 			  where [par_ccodigo] = @par_ccodigo