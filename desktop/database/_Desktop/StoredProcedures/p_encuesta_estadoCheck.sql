CREATE OR ALTER PROCEDURE [dbo].[p_encuesta_estadoCheck]
	@epr_cuser NVarChar (255) = '',
	@enc_idkey INT = 0
--WITH ENCRYPTION			 
AS
set noCount on
	
	SELECT enr_estado as estado, enr_idkey
	FROM [_Datos].[dbo].[p_encuesta_respondidas]
	WHERE enr_encidkey = @enc_idkey AND enr_eprcuser = @epr_cuser 
	ORDER BY enr_idkey DESC

	/*
	SELECT COUNT(*) as Cantidad
		FROM _Datos..p_encuesta_pregunta_respuesta epr
		INNER JOIN _Datos..p_encuesta_pregunta epg ON (epr.epr_epgidkey = epg.epg_idkey)
		INNER JOIN _Datos..p_encuesta enc ON (enc.enc_idkey = epg.epg_encidkey)
	WHERE epr.epr_cuser = @epr_cuser and enc_idkey = @enc_idkey
	*/