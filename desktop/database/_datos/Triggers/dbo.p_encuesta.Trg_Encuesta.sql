-- =============================================
-- Author:		Daniel O. Medina
-- Create date: 06/05/2024
-- Description:	es necesario el borrado en cadena de p_encuesta_pregunta p_encuesta_pregunta p_encuesta_pregunta_opcion
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[Trg_Encuesta]
   ON  [dbo].[p_encuesta] 
   AFTER DELETE
AS 
BEGIN
	DECLARE @enc_idkey INT = 0

	SELECT @enc_idkey=enc_idkey FROM deleted

	DELETE FROM [p_encuesta_pregunta] WHERE epg_encidkey = @enc_idkey

END