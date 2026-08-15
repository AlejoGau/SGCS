CREATE OR ALTER PROCEDURE [dbo].[m_asignacion_movilPendientesSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[amv_idkey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'm_asignacion_movil','[cue_ncuentaMovil],[cue_clineaMovil]')




IF @filter != ''          
 BEGIN        
	
	--set @filter = replace(@filter,'\\u','%u')

	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty NVARCHAR(32)
	DECLARE @FilterValue NVARCHAR(64)

	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		PRINT 'FilterProperty - ' + @filterproperty
		--Set Filters

		IF @FilterProperty = 'cue_clineaMovil'
			SET @SqlFilter = @SqlFilter + ' AND (cueSmartTrack.cue_clinea LIKE ''%'+ @FilterValue +'%'' OR cueMovil.cue_clinea LIKE ''%'+ @FilterValue +'%'')'
		ELSE IF @FilterProperty = 'cue_ncuentaMovil'
			SET @SqlFilter = @SqlFilter + ' AND (cueSmartTrack.cue_ncuenta LIKE ''%'+ @FilterValue +'%'' OR cueMovil.cue_ncuenta LIKE ''%'+ @FilterValue +'%'')'
		
 		
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END    

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_datos]..[m_asignacion_movil] o
			inner join _datos..EventosPendientes p on o.amv_rec_iid = p.rec_iid
			left join _tablas..t_codigos_alarma c on p.rec_calarma = c.cod_ccodigo
			left join _datos..m_cuentas cue on p.rec_iidcuenta = cue.cue_iid
			left join _datos..smarttrack s on o.amv_objectid = s.id AND amv_objecttypeid = 3113
			left join _Tablas..t_MovilesPatrulla dm on o.amv_objectid = dm.tmp_idkey AND amv_objecttypeid = 659
			left join _datos..m_cuentas cueSmartTrack on s.CuentaId = cueSmartTrack.cue_iid
			left join _datos..m_cuentas cueMovil on dm.tmp_icuenta = cueMovil.cue_iid
			left join _tablas..t_tipos tip on cue.cue_ctipo = tip.tip_ccodigo
outer apply (
		select CASE   
												WHEN cueMovil.cue_iid IS NOT NULL THEN ''movil'' 
												WHEN cueSmartTrack.cue_iid IS NOT NULL THEN ''smarttrack''
										 END as tipoDispositivo
	) as tipo
			WHERE 1 = 1 ' + @SqlFilter
 

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, amv_idkey Id, o.*, p.*,  
										
									CASE   
												WHEN cueMovil.cue_clinea IS NOT NULL THEN cueMovil.cue_clinea  
												WHEN cueSmartTrack.cue_clinea IS NOT NULL THEN cueSmartTrack.cue_clinea 
										 END as cue_clineaMovil,

									CASE   
												WHEN cueMovil.cue_ncuenta IS NOT NULL THEN cueMovil.cue_ncuenta  
												WHEN cueSmartTrack.cue_ncuenta IS NOT NULL THEN cueSmartTrack.cue_ncuenta 
										 END as cue_cncuentaMovil,

									CASE   
												WHEN cueMovil.cue_cnombre IS NOT NULL THEN cueMovil.cue_cnombre  
												WHEN cueSmartTrack.cue_cnombre IS NOT NULL THEN cueSmartTrack.cue_cnombre 
										 END as cue_cnombreMovil,

									
									 CASE   
											WHEN s.Nombre IS NOT NULL THEN s.Nombre 
											WHEN tmp_cnombre IS NOT NULL THEN tmp_cnombre
									 END as nombreDispositivo,

									tipo.tipoDispositivo,
									s.CuentaId,
									s.Nombre, 
									s.Imei,
									tip.tip_cdescripcion,
									s.pushToken ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
	--	select 		@DynamicSqlReturnRows			  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

print '-----'
  print @DynamicSqlReturnRows
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to