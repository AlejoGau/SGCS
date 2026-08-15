CREATE OR ALTER PROCEDURE [dbo].[p_encuesta_RepetirEncuesta]
	@epr_cuser NVarChar (255) = '',
	@enc_idkey INT = 0
--WITH ENCRYPTION			 
AS
set noCount on
	
	DELETE [_datos].[dbo].[p_encuesta_pregunta_respuesta]
    FROM [_datos].[dbo].[p_encuesta] e
        LEFT JOIN [_datos].[dbo].[p_encuesta_pregunta] ep ON ( ep.epg_encidkey = e.enc_idkey)
        LEFT JOIN [_datos].[dbo].[p_encuesta_pregunta_respuesta] epr ON ( epr.epr_epgidkey = ep.epg_idkey )
    WHERE epr_cuser = @epr_cuser AND enc_idkey = @enc_idkey