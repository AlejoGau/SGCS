CREATE OR ALTER PROCEDURE [dbo].[p_encuesta_respuestasPorDispositivo]
	@epr_cuser NVarChar (255) = '',
	@enc_idkey INT = 0,
    @epr_enridkey VARCHAR(128) = '',
    @page INT = 0,
    @start INT = 0,
    @limit INT = 0
--WITH ENCRYPTION			 
AS
set noCount on
	
	SELECT 
        epr_cuser
        ,enc_idkey
        ,enc_name
        ,epg_name
        ,epg_descripcion
        ,CASE 
            WHEN epr_cvalue = '' THEN epo.epo_name 
            ELSE epr_cvalue 
        END
        ,CONCAT('<strong>',epg_name,'</strong>: ',epg_descripcion,' Respuesta: ', CASE WHEN epr_cvalue = '' THEN epo.epo_name ELSE epr_cvalue END,'<br>') as Resultado
		,ROW_NUMBER() OVER (
            PARTITION BY enc_idkey,epr_cuser,epr_epgidkey
            ORDER BY enc_idkey) rownum
    FROM [_datos].[dbo].[p_encuesta] e
        LEFT JOIN [_datos].[dbo].[p_encuesta_pregunta] ep ON ( ep.epg_encidkey = e.enc_idkey)
        LEFT JOIN [_datos].[dbo].[p_encuesta_respondidas] er ON ( er.enr_encidkey = @epr_enridkey )
        LEFT JOIN [_datos].[dbo].[p_encuesta_pregunta_respuesta] epr ON ( epr.epr_epgidkey = ep.epg_idkey )
        LEFT JOIN [_datos].[dbo].[p_encuesta_pregunta_opcion] epo ON ( epo.epo_idkey = epr.epr_ivalue )
    WHERE enc_idkey = @enc_idkey AND epr.epr_cuser = @epr_cuser AND epr.epr_enridkey = @epr_enridkey
    ORDER BY rownum, epg_idkey