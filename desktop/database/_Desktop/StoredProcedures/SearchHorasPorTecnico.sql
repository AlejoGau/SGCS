CREATE OR ALTER PROCEDURE [dbo].[SearchHorasPorTecnico]
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @sort NVARCHAR(256) = '',   
	 @group NVARCHAR(256) = '',            
	 @filter NVARCHAR(2048) = '',        
	 @_dc NVARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT, 
	 @token VARCHAR(128) = '',
	 @fechaDesde NVARCHAR(256) = '',
	 @fechaHasta NVARCHAR(256) = '',
	 @tecnico nvarchar(128) = ''

AS
SET NOCOUNT ON
/*
 * APLICANDO FILTROS y RANGOS
 */
--Filters
DECLARE @SqlFilter AS VARCHAR(4096)
SET @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[p_recepcion]')

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Datos].[dbo].[p_recepcion]', @token = @token, @alias = 'o.', @SqlFilterRango = @SqlFilterRango OUTPUT

print '---';
print @SqlFilterRango
print '---';

SET @SqlFilter = isnull(@SqlFilter,'') + isnull(@SqlFilterRango,'')
print @SqlFilter

/* APLICANDO LOS VALORES HORA */
DECLARE @SqlWhere NVARCHAR(MAX);
SET @SqlWhere = '';

IF @fechaHasta != ''
    BEGIN
        SET @SqlWhere = @SqlWhere + ' AND svi_tFechaHora <= convert(datetime,'''+@fechaHasta+''',120)'
    END
    
IF @fechaDesde != '' 
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND svi_tFechaHora >= convert(datetime,'''+@fechaDesde+''',120)';
	END

IF @tecnico != ''
    BEGIN
        SET @SqlWhere = @SqlWhere + ' AND ins_cnombre = ''' + @tecnico + ''''
    END
 
IF @token != ''
	BEGIN
		EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
		SET @SqlWhere = @SqlWhere + @SqlFilterRango
	END

--Sql
DECLARE @Sql NVARCHAR(MAX) = '';
SET @Sql = '
	SELECT 
		ins_cnombre as nombreTecnico,
		(CASE
			WHEN tip_ntipo = 0 THEN ''Preventivo''
			WHEN tip_ntipo = 1 THEN ''Correctivo''
		ELSE ''Instalacion'' END) as servicio,
		svi_iServicio as numeroServicio,
		tip_cdescripcion as descripcionServicio,
		convert(varchar,svi_tFechaHora,120) as diaVisita,
		convert(varchar,svi_tSalidaHaciaCliente,120) as salidaHacia,
		convert(varchar,svi_tArriboAlCliente,120) as arribo,
		convert(varchar,svi_tSalidaDelCliente,120) as salida,

		cast(DATEDIFF(MINUTE, svi_tArriboAlCliente, svi_tSalidaDelCliente) as bigint) as horasTrabajadas

	FROM [_Datos].[dbo].[m_st_cabecera]
		INNER JOIN [_Tablas].[dbo].[t_tiposervicio] on tip_ccodigo = stc_ctipo_servicio
		INNER JOIN [_Datos].[dbo].[SerTecVisitas] on svi_iServicio = stc_iid
		INNER JOIN [_Datos].[dbo].[SerTecTecnicoVisitas] on stv_iVisita = svi_idKey
		INNER JOIN [_Tablas].[dbo].[t_instaladores] on ins_idKey = stv_iTecnico

	WHERE 1 = 1 ' + @SqlWhere + '
		AND svi_tFechaHora < svi_tSalidaDelCliente
		AND svi_tSalidaDelCliente <> ''01/01/1900''
		AND svi_tArriboAlCliente <> ''01/01/1900''
	
	ORDER BY svi_tFechaHora ASC '
		
print @sql
exec (@sql)