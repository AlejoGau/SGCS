CREATE OR ALTER PROCEDURE [dbo].[DevolverEventosAPendienteSearch]

	@rec_nestado INT = 0,
	@rec_ioperador INT = 0

AS
BEGIN
  
	IF @rec_nestado != 0 
		BEGIN
					UPDATE _Datos..p_recepcion SET
						rec_nestado = 0 --pendientes
						WHERE rec_nestado = @rec_nestado 
							AND rec_ioperador = @rec_ioperador
		END
	ELSE
		BEGIN
			SELECT 'FALTA estado origen'
		END
END