CREATE OR ALTER PROCEDURE [dbo].[ReporteEstadisiticaEventos]
    @page INT = 1,               
    @start INT = 0,               
    @limit INT = 50,               
    @sort VARCHAR(64) = '',            
    @filter VARCHAR(2048) = '',
    @nombreDesde VARCHAR(255) = '',
    @nombreHasta VARCHAR(255) = '',
    @cue_lineaDesde VARCHAR(3) = '',
    @cue_lineaHasta  VARCHAR(3) = '',
    @codigoDesde VARCHAR(3) = '',
    @codigoHasta VARCHAR(3) = '',
    @cuentaDesde VARCHAR(4) = '',
    @cuentaHasta VARCHAR(4) = '',
    @rec_tfechahoraDesde VARCHAR(20) = '',
    @rec_tfechahoraHasta VARCHAR(20) = '',
    @gru_ccodigoDesde VARCHAR(20) = '',
    @gru_ccodigoHasta VARCHAR(20) = '',
    @cod_ccodigo VARCHAR(4) = '',
    @token VARCHAR(128) = '',     
    @_dc VARCHAR(256) = '',
    @table VARCHAR(20) = 'p_recepcion',     
    @totalrows INT = 1 OUTPUT 
AS
BEGIN
  
DECLARE @Sql VARCHAR(MAX)
set @Sql = ''

 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_recepcion')

IF @nombreDesde != '' AND @nombreHasta != '' 
BEGIN      
SET @Sql = @Sql + ' AND c.cue_cnombre Between '''+@nombreDesde+''' And '''+@nombreHasta+''' '   
END 
ELSE IF @nombreDesde != ''
BEGIN
	SET @Sql = @Sql + ' AND c.cue_cnombre LIKE ''%'+@nombreDesde+'%'''
END

IF @cue_lineaDesde != '' AND @cue_lineaHasta != '' 
BEGIN      
SET @Sql = @Sql + ' AND c.cue_clinea Between '''+@cue_lineaDesde+''' And '''+@cue_lineaHasta+''' '   
END 

IF @codigoDesde != '' AND @codigoHasta != '' 
BEGIN      
SET @Sql = @Sql + ' AND cod_ccodigo Between '''+@codigoDesde+''' And '''+@codigoHasta+''' '   
END 

IF @cuentaDesde != '' AND @cuentaHasta != '' 
BEGIN   
SET @Sql = @Sql + ' AND c.cue_ncuenta Between '''+@cuentaDesde+''' And '''+@cuentaHasta+''' '   
END 

IF @rec_tfechahoraDesde != '' AND @rec_tfechahoraHasta != '' 
BEGIN      
SET @Sql = @Sql + ' AND rec_tfechahora Between CONVERT(DATETIME,'''+@rec_tfechahoraDesde+''',120) And CONVERT(DATETIME,'''+@rec_tfechahoraHasta+''',120) '   
END 

IF @gru_ccodigoDesde != '' AND @gru_ccodigoHasta != '' 
BEGIN      
SET @Sql = @Sql + ' AND gru_ccodigo Between '''+@gru_ccodigoDesde+''' And '''+@gru_ccodigoHasta+''') '   
END 

IF @cod_ccodigo != '' 
BEGIN      
SET @Sql = @Sql + ' AND cod_ccodigo = '''+ @cod_ccodigo+''''
END 


IF @token != ''
BEGIN
	DECLARE @SqlFilterRango AS VARCHAR(max)
	EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

	SET @SqlFilter = @SqlFilter + @SqlFilterRango
END


-- Traduccion
DECLARE @g AS VARCHAR(30) = 'General'
DECLARE @gt AS VARCHAR(30) 
EXECUTE [dbo].[LocalizationGetLocale] @Name = @g, @soloOutput=1, @translation = @gt OUTPUT;
DECLARE @d AS VARCHAR(30) = 'Desactivación'
DECLARE @dt AS VARCHAR(30) 
EXECUTE [dbo].[LocalizationGetLocale] @Name = @d, @soloOutput=1, @translation = @dt OUTPUT;
DECLARE @a AS VARCHAR(30) = 'Activación'
DECLARE @at AS VARCHAR(30) 
EXECUTE [dbo].[LocalizationGetLocale] @Name = @a, @soloOutput=1, @translation = @at OUTPUT;
DECLARE @e AS VARCHAR(30) = 'Estado'
DECLARE @et AS VARCHAR(30) 
EXECUTE [dbo].[LocalizationGetLocale] @Name = @e, @soloOutput=1, @translation = @et OUTPUT;
DECLARE @r AS VARCHAR(30) = 'Restauracion'
DECLARE @rt AS VARCHAR(30) 
EXECUTE [dbo].[LocalizationGetLocale] @Name = @r, @soloOutput=1, @translation = @rt OUTPUT;



set @Sql =  'select top '+CAST(@limit AS VARCHAR(5))+'
    cue_clinea
    ,cue_cnombre
    ,cue_ncuenta
    ,rec_calarma
    ,count(rec_calarma) as count
    ,CAST(MONTH(rec_tfechahora) AS VARCHAR(2)) as month
    ,CAST(YEAR(rec_tfechahora) AS VARCHAR(4)) as year
    ,cod_cdescripcion
    ,
    CASE cod_ntipo
            WHEN 0 THEN '''+@gt+'''
            WHEN 1 THEN '''+@dt+'''
            WHEN 2 THEN '''+@at+'''
            WHEN 3 THEN '''+@et+'''
            WHEN 4 THEN '''+@rt+'''
            ELSE ''''
        END as cod_tipo
    ,rec_cContenido
    ,gru_cdescripcion
    from _datos..'+@table+' With (NOLOCK)  
    Left Join _Datos..m_cuentas c on rec_iidcuenta=cue_iid 
    Left Join _Tablas.dbo.v_lineas on cue_clinea=lin_ccodigo 
    Left Outer Join _Tablas.dbo.t_provincias on lin_cprovincia=pro_ccodigo 
    Left Join _Tablas.dbo.t_codigos_alarma on rec_calarma=cod_ccodigo 
    Left Join _Tablas.dbo.t_grupos on gru_ccodigo=_Tablas.dbo.t_codigos_alarma.cod_cGrupo	    
    WHERE (rec_nestado<>0 and rec_nestado<>2)  
    ' + @Sql + @SqlFilter +'
        GROUP BY gru_cdescripcion,
    rec_cContenido,cod_ntipo,cue_clinea,cue_cnombre,cue_ncuenta , CAST(YEAR(rec_tfechahora) AS VARCHAR(4)), CAST(MONTH(rec_tfechahora) AS VARCHAR(2)), rec_calarma, cod_cdescripcion
    ORDER BY cue_clinea , cue_ncuenta
'

/*
Print '----------'
Print Cast(@Sql As nText)
*/
exec(@Sql)

END