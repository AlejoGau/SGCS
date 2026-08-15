--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.437 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.720 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchReporteEncuestaTextosLibres]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50, 
	@filter NVARCHAR(2048) = '',
	@sort NVARCHAR(256) = '',
	@_dc NVARCHAR(256) = '',            
	@totalrows INT = 1 OUTPUT  
AS
BEGIN
	
	--Sort
	DECLARE @SqlSort AS NVARCHAR(256)
	SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'epg.epg_name ASC')

	--Filters
	DECLARE @SqlFilter AS NVARCHAR(MAX)
	SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, '[_Datos].[dbo].[p_encuesta_pregunta]', '')

	--Sql
	 DECLARE @Sql NVARCHAR(MAX)
	 SET @Sql = '
		SELECT epg.epg_name as NombrePregunta, epo.epo_name as NombreOpcion, epr_cuser, epr_cvalue
		FROM _Datos..p_encuesta_pregunta epg
			INNER JOIN _Datos..p_encuesta_pregunta_opcion epo ON (epo.epo_epgidkey = epg.epg_idkey)
			LEFT JOIN _Datos..p_encuesta_pregunta_respuesta epr ON (epo.epo_idkey = epr.epr_ivalue)
		WHERE epo.epo_idkey = epr.epr_ivalue AND epo.epo_tipo = 1 AND epr_cvalue != '''' '+@SqlFilter+'
		GROUP BY epo.epo_name, epg.epg_name, epr_cuser, epr_cvalue
		ORDER BY ' + @SqlSort
	
	print @Sql
	EXEC(@Sql);

END