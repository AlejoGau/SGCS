CREATE OR ALTER PROCEDURE [dbo].[MapGuard_CuentasEnAlarma]  
 @page INT = 1,                 
 @start INT = 0,                 
 @limit INT = 50,                 
 @sort VARCHAR(256) = '',     
 @group VARCHAR(256) = '',              
 @filter VARCHAR(2048) = '',          
 @_dc VARCHAR(256) = '',   
 @token VARCHAR(128),              
 @totalrows INT = 1 OUTPUT       
AS    
 SET NOCOUNT ON     
   
 --Sort  
 DECLARE @SqlSort AS VARCHAR(256)  
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.cue_iid ASC')  
   
 --Filters  
 DECLARE @SqlFilter AS VARCHAR(4096)  
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Cuenta')  
   
 --Sql  
 DECLARE @Sql NVARCHAR(MAX)  
 SET @Sql = 'FROM _Datos.dbo.m_cuentas o 
				  INNER JOIN _Datos.dbo.m_status s ON o.cue_iid = s.sta_iidcuenta
				  LEFT JOIN _tablas..t_codigos_alarma ca on ca.cod_ccodigo = s.sta_cultimaalarma
   WHERE o.cue_iid IN (SELECT TOP 100 rec_iidCuenta  
          FROM _Datos.dbo.p_recepcion WITH (NOLOCK)          
         WHERE rec_nestado IN(0,1,2,4)        
			and o.cue_clinea != ''_MP''      
            AND rec_tfechahora <= DATEADD(MINUTE,1,GetDate())  
         GROUP BY rec_iidCuenta)  
   ' + @SqlFilter  
   
--Filter for user
DECLARE @UserId INT
SELECT @UserId = dbo.GetUserIdByToken(@token)

DECLARE @HasAdministratorModule INT 
SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator') 

IF @HasAdministratorModule = 0
 BEGIN
	--Load Ranges by User
	CREATE TABLE #Ranges (id INT IDENTITY(1,1), dealer varchar(3), desde varchar(4), hasta varchar(4))
	
	INSERT INTO #Ranges (dealer, desde, hasta)
	SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
	  FROM _Sistema.dbo.UsersDesktopWebModulos um
	       --INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules
	 WHERE um.dwm_idWeb = @UserId
	 
	 --Each
	 SET @Sql = @Sql + ' AND ( 1=2 '
	 
	 DECLARE @Pos INT
	 SET @Pos = 1
	 WHILE( (SELECT COUNT(*) FROM #Ranges WHERE id = @Pos) != 0)
	 BEGIN
		DECLARE @DealerLinea VARCHAR(3)
		DECLARE @DealerDesde VARCHAR(4)
		DECLARE @DealerHasta VARCHAR(4)
		
		SELECT @DealerLinea = dealer, @DealerDesde = ISNULL(desde, ''), @DealerHasta = ISNULL(hasta,'') FROM #Ranges WHERE id = @Pos		
			
		IF @DealerDesde = '' OR @DealerHasta = ''	
			SET @Sql = @Sql + ' OR (cue_clinea = ''' + @DealerLinea + ''' ) '		
		ELSE
			SET @Sql = @Sql + ' OR (cue_clinea = ''' + @DealerLinea + ''' AND cue_ncuenta BETWEEN ''' + @DealerDesde + ''' AND ''' + @DealerHasta + ''') '		
		
		SET @Pos = @Pos + 1
	 END
	 
	 SET @Sql = @Sql + ' )'
	
 END       
   
 --Total Rows  
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX)   
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX)   
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql  
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'  
      
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT     
  
 --Execute Sql (ReturnRows)  
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)     
 SET @DynamicSqlReturnRows = 'SELECT *, (  
 SELECT TOP 1 cod_cdescripcion  
          FROM _Datos.dbo.p_recepcion r WITH (NOLOCK)          
          left join _tablas..t_codigos_alarma ca on (ca.cod_ccodigo = r.rec_calarma)  
         WHERE rec_nestado IN(0,1,2,4)              
            AND rec_tfechahora <= DATEADD(MINUTE,1,GetDate())) cod_cdescripcion  
          FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.*, s.*, ca.*' + @Sql + ' ) AS T  
         WHERE RowNumber BETWEEN @from AND @to '  
           
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)                     
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'                  
         
 DECLARE @from INT  
 DECLARE @to INT  
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit  
           
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to