CREATE OR ALTER PROCEDURE [dbo].[UpdateEventContenidoSearch]
	@rec_iid INT = 0,
	@rec_cContenido VARCHAR(MAX) = ''
AS
BEGIN
		
	UPDATE _Datos..p_recepcion 
		SET rec_cContenido = @rec_cContenido
	WHERE rec_iid = @rec_iid

END