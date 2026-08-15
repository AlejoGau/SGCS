--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.627 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[Searchm_receptores_cab]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, ' [rec_cdescripcion] ASC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 
 --select @filter = REPLACE(@filter,'_nombreCompleto','rpm_cMarca:LIKE')
 --2023-06-14 Pablo. Para contener marca y modelo en el mismo filter que llega asi @filter = N'{"property":"_nombreCompleto:LIKE","value":"ajax"}]'
 If @filter Like '%_nombreCompleto%'
 Begin
	 /*
 	 Set @filter = REPLACE(@filter,'_nombreCompleto','rtrim(rpm_cModelo)+^ ^+rtrim(rpm_cMarca):LIKE')
	 Set @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_receptores_cab')
     Set @SqlFilter = Replace(@SqlFilter,'AND [','AND ')
	 Set @SqlFilter = Replace(@SqlFilter,'] LIKE',' LIKE')
	 Set @SqlFilter = Replace(@SqlFilter,'^',+'''')
	 */
	 Set @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_receptores_cab')
 	 Set @SqlFilter = REPLACE(@SqlFilter,'[_nombreCompleto]','isnull(rtrim(rpm_cModelo)+'' ''+rtrim(rpm_cMarca),rec_cdescripcion)')
 End 
 Else
     Set @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_receptores_cab')

--print @SqlFilter
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 /*SET @Sql = 'FROM [_Datos]..[m_receptores_cab] o
			WHERE 1 = 1 ' + @SqlFilter + ' 
			union all
			select ROW_NUMBER() OVER (ORDER BY r.[rec_iid] DESC) AS RowNumber,
				r.rec_cConfig
				, rm.rpm_cMarca+'' ''+rm.rpm_cModelo as rec_cdescripcion	
				, r.rec_cdll
				, r.rec_iEsIRS
				, r.rec_iid
				, r.rec_ntcpip
				, rm.rpm_idKey as idModel
				from _datos..m_receptores_cab r
				inner join _tablas..T_ReceptorProtocolModel rm on r.rec_iid = rpm_iReceptor
				WHERE 1 = 1 ' + @SqlFilter + ' 
			'
*/


SET @Sql = 'FROM [_Datos]..[m_receptores_cab] o
				left join _tablas..T_ReceptorProtocolModel rm on o.rec_iid = rpm_iReceptor
				WHERE 1 = 1 ' + @SqlFilter + ' 
			'




 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 /*
 SET @DynamicSqlReturnRows = '
	SELECT * 
	FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, 
		o.* , rm.*	 ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to ORDER BY ' + @SqlSort  
*/
 
 SET @DynamicSqlReturnRows = '
	SELECT * 
	FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, 
	   o.rec_iid,o.rec_cdll,o.rec_cConfig,o.rec_ntcpip,o.rec_iEsIRS,o.rec_iEsGPS,
	   Isnull(rm.rpm_cMarca,rec_cdescripcion) As rec_cdescripcion , rm.* ' + @Sql + ' ) AS T
			  WHERE RowNumber BETWEEN @from AND @to ORDER BY ' + @SqlSort  


 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

--Print '******************************************************************'
--Print CAST(@DynamicSqlReturnRows AS NTEXT)

 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to