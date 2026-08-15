-- =============================================
-- Author:		Daniel O. Medina
-- Create date: 06/05/2024
-- Description:	es necesario el borrado en cadena de p_encuesta_pregunta p_encuesta_pregunta p_encuesta_pregunta_opcion
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[Trg_Encuenta_Pregunta]
   ON  [dbo].[p_encuesta_pregunta] 
   AFTER DELETE
AS 
BEGIN
	DECLARE @epg_idkey INT = 0

	SELECT @epg_idkey=epg_idkey FROM deleted

	DELETE FROM [p_encuesta_pregunta_opcion] WHERE epo_epgidkey = @epg_idkey

END