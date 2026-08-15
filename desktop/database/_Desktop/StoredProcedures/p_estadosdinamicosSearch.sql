CREATE OR ALTER PROCEDURE [dbo].[p_estadosdinamicosSearch]
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
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'c.[cue_iid] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_estadosdinamicos')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'SELECT 
				ped_idKey Id, 
				o.*, 
				c.*,
				ms.*, 
				eventosPendientes.*,
				cod.*,
				sit.*,
                evento.*
				 
				FROM _Datos.dbo.p_estadosdinamicos o
					INNER JOIN _datos..m_cuentas c WITH (NOLOCK) ON cue_iid = ped_iCtaId
					LEFT OUTER JOIN _Datos.dbo.m_status ms WITH (NOLOCK) ON ms.sta_iidcuenta = c.cue_iid    
				
				OUTER APPLY (
					SELECT COUNT(1) as cantidadEventosPendientes 
                    FROM _datos..EventosPendientes o WITH (NOLOCK)
					WHERE rec_iidCuenta = ped_iCtaId AND rec_nEstado IN (0,1)
				) eventosPendientes

                OUTER APPLY (
					SELECT TOP 1 * 
                    FROM _datos..EventosPendientes o WITH (NOLOCK)
					WHERE rec_iidCuenta = ped_iCtaId AND rec_nEstado IN (0,1)
                    ORDER BY rec_iid DESC
				) evento
				
				LEFT JOIN _Tablas..t_codigos_alarma cod WITH (NOLOCK) ON (cod.cod_ccodigo = ms.sta_cultimaalarma)
				LEFT JOIN _Desktop.dbo.m_estado_cuenta_cab_situacion sit WITH (NOLOCK) ON (sit.est_iidcuenta = cue_iid)
 
				WHERE 1 = 1 AND o.ped_cCodigo LIKE ''%Ind%''' + @SqlFilter +' ORDER BY '+@SqlSort

-- 08/10, Agrego el filtro de las cuentas necesarias a los OUTER APPLY, dado que sino, hace una busqueda de todas las cuentas iguales para luego filtrar. 
-- Por lo cual, hago el filtro directo ahí dentro también. Reemplazo del SqlFilter el cue_iid por rec_iidCuenta que es el utilizado en las tablas afectadas

PRINT @Sql
EXEC (@Sql)


 /*
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, 
							   ped_idKey Id, 
							   o.*, 
							   c.*,
							   ms.*, 
							   eventosPendientes.*, 
							   ultimoEvento.*, 
							   cod.*,
							   sit.* ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to
 */