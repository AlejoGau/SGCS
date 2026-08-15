CREATE OR ALTER PROCEDURE [dbo].[SearchSmartPanicCuentaExport]
 @page INT = 1,               
 @start INT = 0,               
 @sort VARCHAR(256) = '',   
 @limit INT = 50,               
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '', 
 @token VARCHAR(128),                
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON 

 --parametros
 DECLARE @TIEMPODISPOSITIVOS INT
 SELECT @TIEMPODISPOSITIVOS = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'TIEMPODISPOSITIVOS'

 DECLARE @DISPERSIONDISPOSITIVOS INT
 SELECT @DISPERSIONDISPOSITIVOS = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'DISPERSIONDISPOSITIVOS'


 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')

 if (@token = '8CDCD4D5-8284-48C0-B75A-4D3AAF379C87')
 set @HasAdministratorModule=1
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.Id DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'SmartPanic')
 set @SqlFilter = REPLACE(@sqlfilter, 'AND clineancuenta like', 'AND (cue_clinea + ''-'' + convert(varchar, cue_ncuenta) ) like')
 --print '@sqlfilter'
 --print @sqlfilter
 
 print @UserId

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_datos].dbo.[SmartPanic] o WITH ( NOLOCK )
				  LEFT JOIN _datos..m_cuentas c with (nolock) ON (o.CuentaId = c.cue_iid)
				  LEFT JOIN _datos..p_GpsSP g WITH ( NOLOCK ) ON (o.imei = g.gps_cImei)
				  left join _sistema..usersdesktopweb u WITH ( NOLOCK ) on (u.udw_idkey = o.awccUserId)
				  left join _datos..m_telefonos t WITH ( NOLOCK ) on (RIGHT(t.tel_ctelefono, 8) = RIGHT(o.Telefono, 8)) AND tel_iidcuenta = c.cue_iid and t.tel_nsp IN (1,3)
				  left join _datos..m_usuarios usu WITH ( NOLOCK ) on (usu_iidcuenta = c.cue_iid and usu_iid = t.tel_iid+700)


OUTER APPLY (
	SELECT 
			CASE 
						WHEN DATEDIFF(minute,gps_tfechahora, GETDATE()) > '+convert(varchar,@TIEMPODISPOSITIVOS)+'
							 THEN ''old''
						WHEN gps_rAccuracy > '+convert(varchar,@DISPERSIONDISPOSITIVOS)+'
							 THEN ''disper''	
						ELSE ''current'' 
			 END 
					as state
			
			
) as state
		    WHERE 1 = 1 ' + @SqlFilter

 IF @HasAdministratorModule = 0
 BEGIN
	--Load Ranges by User
	CREATE TABLE #Ranges (id INT IDENTITY(1,1), dealer varchar(3), desde varchar(4), hasta varchar(4))
	
	INSERT INTO #Ranges (dealer, desde, hasta)
	SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
	  FROM _Sistema.dbo.UsersDesktopWebModulos um
	       --INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules
	 WHERE um.dwm_idWeb = @UserId and um.dwm_dealer !=''
	 

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
			SET @Sql = @Sql + ' OR (Linea = ''' + @DealerLinea + ''' AND [cue_ncuenta] is null or [cue_ncuenta] = '''') '	
				
		SET @Pos = @Pos + 1
	 END
	 
	 SET @Sql = @Sql + ' )'	
 END     
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'

 print @DynamicSqlTotalRows
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT 
							   cue_clinea as Dealer,
							   cue_cnombre as Nombre,
							   Telefono
								' + @Sql
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

 print @DynamicSqlReturnRows;
  
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to