CREATE OR ALTER PROCEDURE [dbo].[ReportePanelAlarmaSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 1000,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '', 
 @completo VARCHAR(10) = '', 
 @token VARCHAR(128) = '',
 
 @panel VARCHAR(2048) = '',
 @panelgprs VARCHAR(2048) = '',
 @panelcelular VARCHAR(2048) = '',
               
 @totalrows INT = 1 --OUTPUT  
AS
BEGIN
  
--Sort
DECLARE @SqlSort AS VARCHAR(256)
SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, '[_Datos].[dbo].[m_cuentas]')
 
--Filters
DECLARE @SqlFilter AS VARCHAR(4096)
SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[m_paneles]')

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max)
EXEC getSqlRangesForToken @table = '[_Datos]..[m_cuentas]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

-- TOMO LOS CAMPOS DE LOS COMBO DEL REPORTE Y ARMO EL WHERE
DECLARE @SqlWhere NVARCHAR(MAX);
SET @SqlWhere = '' + @SqlFilterRango;

IF (@panel = '1')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND (t.pan_nEsGprs = ' + @panel + ' OR gps.pan_nEsGprs = '+@panel+')';
	END
IF (@panel = '0')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND t.pan_nEsGprs = ' + @panel +'';
	END

IF (@panelgprs != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND o.pan_ccodigo = ''' + @panelgprs + '''';
	END

IF (@panelcelular != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND gps.pan_ccodigo = ''' + @panelcelular + '''';
	END


DECLARE @sql AS VARCHAR(MAX)
SET @sql = 'SELECT 
				c.cue_iid,
				c.cue_clinea,
				c.cue_ncuenta,
				c.cue_cnombre,
				o.pan_ccodigo as telef_id,
				t.pan_cdescripcion as telef_desc,
				t.pan_nEsGPRS,
				t.pan_mobservacion,
				o.pan_cCompania1 as telf_compania1,
				o.pan_cNroSim1 as telf_sim1,
				o.pan_cNroSim2 as telf_sim2,
				o.pan_cCompania2 as telf_compania2,
				o.pan_cGPRS as celu_id,
				gps.pan_cdescripcion as celu_desc

			FROM [_Datos]..[m_cuentas] c
                left join [_Datos]..[m_paneles] o ON o.pan_iidcuenta = c.cue_iid
                left join _Tablas..t_paneles t ON o.pan_ccodigo = t.pan_ccodigo
                left join _Tablas..t_paneles gps ON o.pan_cGPRS = gps.pan_ccodigo 
				
			WHERE 1=1 ' + @SqlWhere 

EXECUTE (@Sql)
print @Sql

END