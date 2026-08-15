CREATE OR ALTER PROCEDURE [dbo].[SearchHorasPorServicioTecnico]
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

/*
print '---';
print @SqlFilterRango
print '---';
*/

--2024-08-29 Pablo : El reporte se abre sin filtro y con mucha cantidad de registros puede dar error en el calculo de totalhorasservicio
If ( @SqlFilter Is Null Or  @SqlFilter='') And (@fechaDesde='' Or @fechaHasta='')
Begin
	Declare @now varchar(20) = ( Select convert(varchar,getdate(),120) )
	
	Set @fechaDesde = Left(@now,10) + ' 00:00:00'
	Set @fechaHasta = @now
End

/* APLICANDO LOS VALORES HORA */
DECLARE @SqlWhere NVARCHAR(MAX);
SET @SqlWhere = '';

IF @fechaHasta != ''
    BEGIN
        SET @SqlWhere = @SqlWhere + ' AND svi_tFechaHora <= '''+convert(varchar,@fechaHasta,120)+''
    END
    
IF @fechaDesde != '' 
	BEGIN
		SET @SqlWhere = @SqlWhere + ''' AND svi_tFechaHora >= '''+convert(varchar,@fechaDesde,120)+'''';
	END

IF @tecnico != ''
    BEGIN
        SET @SqlWhere = @SqlWhere + ' AND ins_cnombre = ''' + @tecnico + '''';
    END
 
IF @token != ''
	BEGIN
		EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
		SET @SqlWhere = @SqlWhere + @SqlFilterRango
	END

SET @SqlFilter = isnull(@SqlFilter,'') + isnull(@SqlFilterRango,'')
---print @SqlFilter

--Sql
DECLARE @Sql NVARCHAR(MAX) = '';

SET @Sql = '
	SELECT tip_cdescripcion as ''descripcionServicio'',
	COUNT(CASE
			WHEN tip_ntipo = 0 THEN ''Preventido'' 
			WHEN tip_ntipo = 1 THEN ''Correctivo''
		ELSE ''Instalacion'' END) as cantServicio,
	(CASE
		WHEN tip_ntipo = 0 THEN ''Preventivo''
		WHEN tip_ntipo = 1 THEN ''Correctivo''
	ELSE ''Instalacion'' END) as tipoServicio,
	
	cast(sum(DATEDIFF(MINUTE, svi_tArriboAlCliente, svi_tSalidaDelCliente) ) as bigint)	as totalhorasservicio

	FROM [_Datos].[dbo].[m_st_cabecera]
		INNER JOIN [_Tablas].[dbo].[t_tiposervicio] on tip_ccodigo = stc_ctipo_servicio
		INNER JOIN [_Datos].[dbo].[SerTecVisitas] on svi_iServicio = stc_iid
		INNER JOIN [_Datos].[dbo].[SerTecTecnicoVisitas] on stv_iVisita = svi_idKey
		INNER JOIN [_Tablas].[dbo].[t_instaladores] on ins_idKey = stv_iTecnico

	WHERE 1 = 1 ' + isnull(@SqlFilter,'') + @SqlWhere + '
		AND svi_tFechaHora < svi_tSalidaDelCliente
		AND svi_tSalidaDelCliente <> ''01/01/1900''
		AND svi_tArriboAlCliente <> ''01/01/1900''

	GROUP BY tip_cdescripcion, 
		(CASE
		WHEN tip_ntipo = 0 THEN ''Preventivo''
		WHEN tip_ntipo = 1 THEN ''Correctivo''
	ELSE ''Instalacion'' END) 
	
	'

/*
Print '-------'		
print @sql
*/

Execute (@sql)