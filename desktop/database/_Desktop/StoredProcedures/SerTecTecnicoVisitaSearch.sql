CREATE OR ALTER PROCEDURE [dbo].[SerTecTecnicoVisitaSearch]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',  
 @token VARCHAR(128) = '',              
 @totalrows INT = 1 OUTPUT    
AS
SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[stv_idKey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'SerTecTecnicoVisitas')

 --RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max)
EXEC getSqlRangesForToken @table = 'SerTecTecnicoVisitas', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
print @token
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos.dbo.SerTecTecnicoVisitas o
LEFT JOIN _Tablas..t_instaladores t ON ins_idKey = stv_iTecnico
LEFT JOIN  [_Datos].dbo.[Organization] org on t.ins_iOrganizacion=org.Id
LEFT JOIN _Datos..SerTecVisitas v ON svi_idKey = stv_iVisita
LEFT JOIN _Tablas..SerTecFormaViajeVisitas fv ON sfv_idKey = stv_iFormaDeViaje
LEFT JOIN _Datos.dbo.m_st_cabecera cab ON svi_iServicio = stc_iid
left join _datos..m_cuentas c on (c.cue_iid =  stc_iid_cuenta)
left JOIN _Tablas.dbo.t_tiposervicio ts ON stc_ctipo_servicio=tip_ccodigo 

			WHERE 1 = 1 ' + @SqlFilter + @SqlFilterRango


print @Sql 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'

set dateformat ymd -- en algunas instalaciones de SQL falla la conversion de fecha
 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, stv_idKey Id, o.*, t.*,v.*,fv.*, cab.*, c.*, ts.*,org.Name ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to