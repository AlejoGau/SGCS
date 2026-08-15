--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.550 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[ReporteSumatoriaEventos]
	@page INT = 1,               
    @start INT = 0,               
    @limit INT = 50,               
    @sort NVARCHAR(64) = '',              
    @filter NVARCHAR(2048) = '',
    @nombreDesde NVARCHAR(255) = '',
    @nombreHasta NVARCHAR(255) = '',
    @cue_lineaDesde NVARCHAR(3) = '',
    @cue_lineaHasta  NVARCHAR(3) = '',
    @codigoDesde NVARCHAR(3) = '',
    @codigoHasta NVARCHAR(3) = '',
    @cuentaDesde NVARCHAR(4) = '',
    @cuentaHasta NVARCHAR(4) = '',
    @rec_tfechahoraDesde NVARCHAR(20) = '',
    @rec_tfechahoraHasta NVARCHAR(20) = '',
    @gru_ccodigoDesde NVARCHAR(20) = '',
    @gru_ccodigoHasta NVARCHAR(20) = '',
    @cod_ccodigo NVARCHAR(256) = '',
    @token NVARCHAR(128) = '',     
    @_dc NVARCHAR(256) = '',              
    @totalrows INT = 1 --OUTPUT 
AS
BEGIN
  
DECLARE @Sql NVARCHAR(MAX)
set @Sql = ''

--Filters
DECLARE @SqlFilter AS NVARCHAR(MAX)
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
ELSE IF @cue_lineaDesde != ''
BEGIN
	SET @Sql = @Sql + ' AND c.cue_clinea LIKE ''%'+@cue_lineaDesde+'%'''
END

IF @codigoDesde != '' AND @codigoHasta != '' 
BEGIN      
SET @Sql = @Sql + ' AND cod_ccodigo Between '''+@codigoDesde+''' And '''+@codigoHasta+''' '   
END 

IF @cuentaDesde != '' AND @cuentaHasta != '' 
BEGIN   
SET @Sql = @Sql + ' AND c.cue_ncuenta Between '''+@cuentaDesde+''' And '''+@cuentaHasta+''' '   
END 
ELSE IF @cuentaDesde != ''
BEGIN
	SET @Sql = @Sql + ' AND c.cue_ncuenta LIKE ''%'+@cuentaDesde+'%'''
END

IF @rec_tfechahoraDesde != '' AND @rec_tfechahoraHasta != '' 
BEGIN      
SET @Sql = @Sql + ' AND rec_tfechahora Between CONVERT(DATETIME,'''+@rec_tfechahoraDesde+''',120) And CONVERT(DATETIME,'''+@rec_tfechahoraHasta+''',120) '   
END 


IF @gru_ccodigoDesde != '' AND @gru_ccodigoHasta != '' 
BEGIN      
SET @Sql = @Sql + ' AND gru_ccodigo Between '''+@gru_ccodigoDesde+''' And '''+@gru_ccodigoHasta+''') '   
END 
ELSE IF @gru_ccodigoDesde != ''
BEGIN
	SET @Sql = @Sql + ' AND gru_ccodigo = '''+@gru_ccodigoDesde+''''
END

IF @cod_ccodigo != '' 
BEGIN      
	--SET @Sql = @Sql + ' AND cod_ccodigo = '''+ @cod_ccodigo+''''
	--cod_ccodigo:'#03','#04'
	SET @Sql = @Sql + ' AND cod_ccodigo IN ('+ @cod_ccodigo+')'
END 

IF @token != ''
 BEGIN
	 DECLARE @SqlFilterRango AS NVARCHAR(max)
	 EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

	 SET @SqlFilter = @SqlFilter + @SqlFilterRango
 END

/*
Declare @message nVarChar(Max) = ''
BEGIN TRY
	Set @message  = @cod_ccodigo
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )

	Set @message  = @sql
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
END TRY
BEGIN CATCH
END CATCH;		
*/
--print @Sql

set @Sql =  'select  
                cue_clinea
                ,cue_cnombre
                ,cue_ncuenta
                ,rec_czona
                ,max(zon_cdescripcion) as zon_cdescripcion
                ,count(1) as cantidaeventoszona
                ,SUM(CASE WHEN res.res_nfalsaalarma=1 THEN 1 ELSE 0 END) as falsalarmas
                ,rec_calarma
                ,cod_cdescripcion
            from _datos..p_recepcion
                Left Join _Datos..m_cuentas c on rec_iidcuenta=cue_iid 
                Left Join _Tablas.dbo.t_codigos_alarma on rec_calarma=cod_ccodigo 
                Left Join _Tablas.dbo.t_resoluciones res on rec_idResolucion=res_ccodigo
                Left Join _Datos..m_zonas on zon_iidcuenta=cue_iid AND zon_ccodigo = rec_czona
                Left Join _Tablas.dbo.t_grupos on gru_ccodigo=_Tablas.dbo.t_codigos_alarma.cod_cGrupo	    
            WHERE 1=1
            ' + @Sql + @SqlFilter +'
                GROUP BY cue_clinea,cue_ncuenta,rec_calarma,rec_czona,cue_cnombre,cod_cdescripcion
                ORDER BY cue_clinea ASC, cue_ncuenta DESC
            '

print @Sql

exec(@Sql)

END