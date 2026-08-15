--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.437 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.720 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchReporteEncuestaPorOpcion]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50, 
	@filter NVARCHAR(2048) = '',
	@_dc NVARCHAR(256) = '',            
	@totalrows INT = 1 OUTPUT  
AS
BEGIN

	--Filters
	DECLARE @SqlFilter AS NVARCHAR(MAX)
	SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, '[_Datos].[dbo].[p_encuesta_pregunta]', 'Id')

	IF @filter != ''        
	BEGIN
		SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)
		DECLARE @Id VARCHAR(4)='';
		-- Obtengo las fechas inicio y fin del Filter
		SELECT TOP 1 @Id = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'Id')
		IF @Id != ''
			BEGIN
				SET @SqlFilter = @SqlFilter + ' AND epg_encidkey = '''+@Id+''''
			END
	END

	--Sql
	 DECLARE @Sql NVARCHAR(MAX)
	 SET @Sql = '
		SELECT COUNT(epr.epr_epgidkey) as Cantidad, epo_idkey, epo.epo_name as NombreOpcion, epg.epg_name as NombrePregunta, epg.epg_idkey
		FROM _Datos..p_encuesta_pregunta epg
			INNER JOIN _Datos..p_encuesta_pregunta_opcion epo ON (epo.epo_epgidkey = epg.epg_idkey)
			LEFT JOIN _Datos..p_encuesta_pregunta_respuesta epr ON (epo.epo_idkey = epr.epr_ivalue)
		WHERE 1=1 '+@SqlFilter+'
		GROUP BY epo_idkey, epo.epo_name, epg.epg_name, epg_idkey
		ORDER BY epg.epg_name ASC'
	
	print @Sql
	EXEC(@Sql);

END





/* 28/02 : JUAN ORIGINAL QUE ARME, QUIZAS SIRVA PARA OTRA COSA
SELECT COUNT(*) as Cantidad, /*epr.epr_ivalue, epr.epr_idkey, epr.epr_epgidkey, */epo.epo_name as NombreOpcion, epg.epg_name as NombrePregunta, enc.enc_idkey as IdEncuesta, enc.enc_name as NombreEncuesta
FROM _Datos..p_encuesta_pregunta_respuesta epr
	INNER JOIN _Datos..p_encuesta_pregunta_opcion epo ON (epo.epo_epgidkey = epr.epr_epgidkey)
	INNER JOIN _Datos..p_encuesta_pregunta epg ON (epg.epg_idkey = epr.epr_epgidkey)
	INNER JOIN _Datos..p_encuesta enc ON (epg.epg_encidkey = enc.enc_idkey)
WHERE epo.epo_idkey = epr.epr_ivalue AND enc_idkey = @Id
GROUP BY /*epr.epr_ivalue, epr.epr_idkey, epr.epr_epgidkey, */epo.epo_name, epg.epg_name, enc.enc_idkey, epg.epg_idkey, enc.enc_name
ORDER BY epg.epg_idkey ASC
*/