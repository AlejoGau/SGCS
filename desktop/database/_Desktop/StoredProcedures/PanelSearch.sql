CREATE OR ALTER PROCEDURE [dbo].[PanelSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 't.[pan_cdescripcion] ASC')
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Panel')
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_Datos]..[m_paneles] o
				left join _Tablas..t_paneles t ON o.pan_ccodigo = t.pan_ccodigo
				left join _Tablas..t_paneles gps ON o.pan_cGPRS = gps.pan_ccodigo
				left join _datos..m_receptores_cab r on o.pan_ireceptor = r.rec_iid
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
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber
							   , o.pan_idkey Id
							   , [pan_iidcuenta]
      ,o.[pan_ccodigo]
	  ,t.[pan_cImagen]
      ,o.[pan_mubicacion]
      ,o.[pan_ccallerid1]
      ,o.[pan_ccallerid2]
      ,o.[pan_ccallerid3]
      ,o.[pan_ccallerid4]
      ,o.[pan_ccallerid5]
      ,o.[pan_nmostrar]
      ,o.[pan_csender]
      ,o.[pan_idKey]
      ,o.[pan_cnrosim1]
      ,o.[pan_ccompania1]
      ,o.[pan_cnrosim2]
      ,o.[pan_ccompania2]
      ,o.[pan_cgprs]
      ,o.[pan_cRemoteIP]
      ,o.[pan_iRemotePort]
      ,o.[pan_iReceptor]
      ,o.[pan_cconfig]
      ,o.[pan_rpmidkey]
      ,o.[pan_iTipoCom]
	  ,o.[pan_cModemSMS]
	  ,o.[pan_cClavePanel]
	  ,IsNull(t.[pan_cdescripcion],'''') As pan_cdescripcion
	  ,IsNull(gps.[pan_cdescripcion],'''') As gps_cdescripcion
	  ,IsNull(t.[pan_iModelo],0) As pan_iModelo
	  ,IsNull(gps.[pan_iModelo],0) As gps_iModelo
	  ,IsNull(r.[rec_cdescripcion],'''') As rec_cdescripcion ' + @Sql + ' ) AS T
	  WHERE RowNumber BETWEEN @from AND @to '
							 
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							 
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	
			  	
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
			  	
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to

 /*
 Print '-----'
 Print Cast(@DynamicSqlReturnRows As varchar(max))
 */