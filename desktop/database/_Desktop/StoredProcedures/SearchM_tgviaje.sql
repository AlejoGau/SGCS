CREATE OR ALTER PROCEDURE [dbo].[SearchM_tgviaje]
 @page INT = 1,
 @start INT = 0,
 @limit INT = 50,
 @sort VARCHAR(256) = '',
 @group VARCHAR(256) = '',
 @filter VARCHAR(2048) = '',
 @token VARCHAR(128) = '',
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'tgv.[tgv_idkey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_tgviaje')
 
--RANGOS 
If @token != ''
Begin
	DECLARE @SqlFilterRango AS VARCHAR(max)
	EXEC getSqlRangesForToken @table = 'm_cuentas', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

	SET @SqlFilter = isnull(@SqlFilter,'') + isnull(@SqlFilterRango,'')
End

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_datos].[dbo].[m_tgviaje] tgv
	LEFT JOIN [_datos].[dbo].[m_usuarios] usu (NOLOCK) ON (usu.usu_icodigo = tgv.tgv_usuiid AND usu_iidcuenta = tgv.tgv_cueiid)
	LEFT JOIN _datos..m_cuentas c (NOLOCK) on c.cue_iid = tgv.tgv_cueiid
	LEFT JOIN _datos..geofense gi (NOLOCK) on gi.Id = tgv.tgv_geofenseinicio
	LEFT JOIN _datos..geofense gf (NOLOCK) on gf.Id = tgv.tgv_geofensefin
	left join _datos..organization org (NOLOCK) on org.Id = tgv.tgv_cuenta_cliente
	left join _datos..dispositivomovil v (NOLOCK) on v.Id = tgv.tgv_movil_transportista
	left join _datos..m_usuarios r (NOLOCK) on r.usu_iid = tgv.tgv_usuiid and r.usu_iidcuenta = v.OwnerId
	left join _datos..m_cuentas t (NOLOCK) on t.cue_iid = v.OwnerId
WHERE 1 = 1 ' + @SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = '
 SELECT * 
	FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, tgv_idkey Id,tgv_idkey,[tgv_nombre]
      ,[tgv_fechainicio]
      ,[tgv_fechafin]
      ,[tgv_reciid_inicio]
      ,[tgv_reciid_fin]
      ,[tgv_usuiid]
      ,[tgv_cueiid]
      ,[tgv_codigoexterno]
      ,[tgv_estado]
      ,[tgv_geofenseinicio]
      ,[tgv_geofensefin]
      ,[tgv_metadata]
      ,[tgv_fecha_prg_inicio]
      ,[tgv_fecha_prg_fin]
      ,[tgv_cuenta_cliente]
      ,[tgv_movil_transportista]
	  ,[tgv_lugar_inicio]
	  ,[tgv_lugar_fin]
	  ,usu.usu_cnombre
	  , c.cue_cnombre AS _cuentanombre
	  , c.cue_clinea
	  , c.cue_ncuenta
	  , c.cue_iid 
	  ,c.cue_cimei
	  ,gi.Name as _geo_inicio_nombre
	  ,gf.Name as _geo_fin_nombre
	  ,org.Name as _cliente_nombre
	  ,org.statetax as _cliente_numero
	  ,org.nationaltax as _cliente_documento
	  ,org.SmallComment as _cliente_contrato
	  ,t.cue_cnombre as _transportista_nombre
	  ,v.domain _transportista_matricula
	  ,v.nrochasis _transportista_chasis
	  ,v.maxspeed _transportista_maxspeed
	  ,r.usu_cnombre _transportista_responsable
	  ' + @Sql + ' ) AS T
WHERE RowNumber BETWEEN @from AND @to '

/*
print '---------'							  
print @DynamicSqlReturnRows
*/

 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to