--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.350 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[DesktopUsersByAdmin]              
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '', 
 @isAdminsCuenta int = 0,
 @token NVARCHAR(128),       
 @_dc NVARCHAR(256) = '',
 @perfil NVARCHAR(256) = 'false',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   

 --User By Token
 DECLARE @Username NVARCHAR(128)
 SELECT @Username = UserId FROM Token WHERE AccessToken = @token
 declare @orgid int;
  
 DECLARE @UserId INT
 SELECT @UserId = udw_idKey, @orgid = udw_empresa  FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_usuario = @Username
 
 --print @Username
 --print @UserId
 --print '---'

 --Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 --SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.udw_idKey DESC')
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.udw_usuario')
 
 --Filters
 -- https://basecamp.com/2249105/projects/12939010/todos/413600618, se crea variable udw_usuario_like especial para el filtro del combo
 SET @filter = Replace(@filter, 'udw_usuario_LIKE', 'udw_usuario:LIKE');

 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'UsersDesktopWeb','[udm_modulo],[dealer],[cuenta],[modulesAvailable]')

 --Has Administrator
 DECLARE @HasAdministratorModule INT
 SELECT @HasAdministratorModule = COUNT(*)
   FROM _Sistema.dbo.UsersDesktopWebModulos um
        INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules AND udm_key_reference = 'Administrator'
  WHERE um.dwm_idWeb = @UserId

--Has MasterWebDealer
 DECLARE @HasMasterWebDealerModule INT
 SELECT @HasMasterWebDealerModule = COUNT(*)
   FROM _Sistema.dbo.UsersDesktopWebModulos um
        INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules AND udm_key_reference = 'MasterWebDealer'
  WHERE um.dwm_idWeb = @UserId  


DECLARE @JoinModuleByModuleName NVARCHAR(max) = ''   
DECLARE @JoinModuleByModuleNameValue NVARCHAR(max) = ''
DECLARE @hayfiltromodulomodulo NVARCHAR(32) = ''
declare @modulesAvailable varchar(max)

DECLARE @dealer NVARCHAR(max) = ''
DECLARE @cuenta NVARCHAR(max) = ''

DECLARE @Sql NVARCHAR(MAX)



 IF @filter != ''        
 BEGIN
	SELECT * INTO #FilterTable FROM dbo.parseJSON(@filter)
	SELECT TOP 1 @hayfiltromodulomodulo = StringValue FROM #FilterTable WHERE StringValue = 'udm_modulo'
	SELECT TOP 1 @dealer = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'dealer')
	SELECT TOP 1 @cuenta = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'cuenta')
	SELECT TOP 1 @modulesAvailable = StringValue FROM #FilterTable WHERE NAME = 'value' AND parent_ID = (select parent_ID FROM #FilterTable WHERE NAME='property' AND StringValue = 'modulesAvailable')
	SELECT @JoinModuleByModuleNameValue = StringValue FROM #FilterTable WHERE NAME = 'value' and parent_ID = (SELECT TOP 1 parent_ID FROM #FilterTable WHERE StringValue = 'udm_modulo' ORDER BY element_id DESC)  
 END 

 --print @dealer
 --print @cuenta
 --print @JoinModuleByModuleNameValue
 --print '---'

IF @dealer != '' OR @cuenta != ''
	BEGIN
		DECLARE @subfilter NVARCHAR(max) = ''

		IF @dealer != ''
		BEGIN
			SET @subfilter = @subfilter + ' AND dwm_dealer  = '''+@dealer+''''
		END

		IF @cuenta != ''
		BEGIN
			SET @subfilter = @subfilter + ' AND dwm_cuenta_desde <= '''+@cuenta+'''  AND dwm_cuenta_hasta >= '''+@cuenta+''''
		END
			
		SET @SqlFilter = @SqlFilter + ' 
			AND  o.udw_idKey IN (
				SELECT dwm_idWeb FROM _Sistema.dbo.[UsersDesktopWebModulos] ud 
					WHERE 1=1 '+@subfilter+'
			)' 
	END

	--print @SqlFilter
	--print '---'

IF @isAdminsCuenta != 0
	BEGIN
			SET @SqlFilter = @SqlFilter + ' 
				AND  o.udw_idKey IN (
					SELECT ums_idWeb FROM _Sistema..UsersDesktopWebModulosSecurity ad 
						WHERE  ums_data LIKE ''%cuenta":true%''

				)' 
	END

	--print '@HasAdministratorModule' + CAST(@HasAdministratorModule AS VARCHAR(MAX))
	--print '@HasMasterWebDealerModule' +  + CAST(@HasMasterWebDealerModule AS VARCHAR(MAX))
	--print '---'


 --Security
 /* 10/01/2019 JUAN : Se quita dado que al aplicar un WHERE 1=2 y no se usa OR, da error cuando no es admin y no encuentra de la organizacion a los usuarios.
 IF @HasAdministratorModule = 0 AND @HasMasterWebDealerModule = 0
 BEGIN
	SET @SqlFilter = @SqlFilter + ' AND 1 = 2 '
 END
 */
 --print @SqlFilter 
 --print '---'


 IF @HasAdministratorModule = 0 AND @HasMasterWebDealerModule != 0 --AND @perfil = 'false'
 BEGIN
	print '--- no es admin'
	SET @SqlFilter = @SqlFilter + ' AND o.udw_idKey IN (SELECT DISTINCT dwm_idWeb 
				FROM _Sistema.dbo.UsersDesktopWebModulos um
				WHERE um.dwm_dealer IN (SELECT DISTINCT dwm_dealer FROM _Sistema.dbo.UsersDesktopWebModulos WHERE dwm_idWeb = ' + CAST(@UserId AS VARCHAR) + ' AND dwm_dealer != '''') 
			)
			and o.udw_empresa = '+cast(@orgid as varchar)+' 		
			AND o.udw_idKey NOT IN (SELECT DISTINCT dwm_idWeb 
			FROM _Sistema.dbo.UsersDesktopWebModulos um
			INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules AND (m.udm_key_reference = ''Administrator'' )) -- lo saco por pedido de leo OR m.udm_key_reference = ''MasterWebDealer''))

	'    
 END
 else IF @HasAdministratorModule = 0 
 BEGIN
	print '--- no es admin solo muestro las organizaciones iguales al usuario logueado'
	SET @SqlFilter = @SqlFilter + ' 
			and o.udw_empresa = '+cast(@orgid as varchar)+' 		
	'    
 END

 --print @SqlFilter 
 --print '---'
 --print @hayfiltromodulomodulo
 --print '---'


IF @hayfiltromodulomodulo != ''
BEGIN

	SET @SqlFilter = @SqlFilter + ' 
		AND o.udw_idKey IN (SELECT DISTINCT dwm_idWeb 
		FROM _Sistema.dbo.UsersDesktopWebModulos um
		INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules AND m.udm_key_reference = '''+@JoinModuleByModuleNameValue+''')
	'
END  

--print @SqlFilter 
--print '---'
IF @modulesAvailable != ''
BEGIN
	SET @SqlFilter = @SqlFilter + ' 
		AND o.udw_idKey IN (SELECT DISTINCT dwm_idWeb 
		FROM _Sistema.dbo.UsersDesktopWebModulos um
		INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules AND m.udm_key_reference in ('+@modulesAvailable+')
		)
	'
END 
 

--Sql
 SET @Sql = 'FROM _Sistema.dbo.UsersDesktopWeb    o
				left join _datos..organization g on CONVERT(INT, o.udw_empresa) = g.Id
				OUTER APPLY 
				 ( 
					 SELECT k.udw_usuario as nombrePerfil FROM _Sistema.dbo.UsersDesktopWeb k 
					 WHERE o.udw_iperfil = k.udw_idKey
				 ) p
				WHERE 1 = 1 
					AND o.udw_nombre NOT LIKE ''%@desktop.com''
					' + @SqlFilter

--select @sql

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   


 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, o.udw_idKey as Id, o.*,  g.Name as OrganizationName , p.nombrePerfil ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
			
--Print '--======='
--Print Cast(@DynamicSqlReturnRows As Varchar(max))
			
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to