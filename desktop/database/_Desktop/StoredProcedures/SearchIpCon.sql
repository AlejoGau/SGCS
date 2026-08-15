--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.490 
-- [dbo].[SearchIpCon] @filter='[{ipc_nestado:2}]'
--#############################################################################



CREATE OR ALTER PROCEDURE [dbo].[SearchIpCon]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',    
 @onlyConnIP INT = 0,
 @xtra NVARCHAR(256) = '',   
 @totalrows INT = 1 OUTPUT   
    
AS 
BEGIN
  SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'ipc_cdescripcion ASC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')
 --Print '@SqlFilter : '+@SqlFilter
 --Sql
 DECLARE @Sql NVARCHAR(MAX)

 -- saque el filtro de conecciones de IRS porque no se mostraban en la asignacion de puertos y dealers y hace falta.
  --Pablo : 2019-11-07 Agregue @xtra para poder filtrar por modelo
 SET @Sql = '
			
			FROM [_tablas]..[t_ip_con] p
			LEFT JOIN [_Datos].dbo.[m_receptores_cab] o ON o.rec_iid = p.ipc_ireceptor	
			left join _tablas..t_iprsconn iprsc on iprsc_ipcidkey = p.ipc_idKey
			left join [_sistema]..[s_iprservicios] s on iprsc_iprsiid = iprs_idKey	
			
			WHERE 1 = 1 
			And ipc_nestado=2
			
			' 
	If Substring(@xtra,1,6)='Modelo'
	Begin
		--Print 'Hay Xtra : '+@xtra
		Declare @Model nVarchar(100) = Substring(@xtra,8,100)
		--Print 'Model : '+@Model
		--2024-08-26 Pablo : porque si el modelo viene con espacios no lo encuentra
		Set @Model = Replace(@Model,' ','')		
		Set @Sql += ' And Replace([iprsc_Config],'' '','''') Like ''%rpm_cModelo":"'+@Model+'%'+Char(39)
		Set @Sql += ' '
	End
	Else
	If Substring(@xtra,1,6)='Config'	--@xtra = 'Config:IP Host Remoto',
	Begin
		--Print 'Hay Xtra : '+@xtra
		Declare @Valor nVarchar(100) = Substring(@xtra,8,100)
		--Print 'Valor : '+@Valor
		Set @Valor = Replace(@Valor,' ','')		
		Set @Sql += ' And Replace([iprsc_Config],'' '','''') Like ''%'+@Valor+'%'+Char(39)
		Set @Sql += ' '
	End 

	Set @Sql += @SqlFilter
 
	IF @onlyConnIP = 1 
		SET @Sql += ' AND rec_iEsIRS!=1 '


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
							   ,o.*
							   , p.*, s.*,iprsc.*' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

 /*
 Print '-----'
 Print   @DynamicSqlReturnRows			  	 
 */

 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to

END