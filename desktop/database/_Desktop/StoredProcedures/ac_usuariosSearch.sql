--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.457 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[ac_usuariosSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 5000,  -- MAURO cambio el limite para probar en MA que tienen 3700 camaras en una cuenta y va a aumentar
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '', 
 @token VARCHAR(128) = '', 
 @TotalRows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 Set @sort = Replace(@sort,'DomainManipulated','Domain')

 DECLARE @SqlSort AS NVARCHAR(256)
 --SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[usu_idKey] DESC')
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'ultimoAcceso.[cac_fecha] DESC')
 
 --Print '@SqlSort'
 --Print @SqlSort
 if @SqlSort Like '%\[_cuenta\]%' ESCAPE '\'
 Begin
	if @SqlSort Like '%ASC%'
		Set @SqlSort = '[cue_clinea]  ASC,[cue_ncuenta] ASC'
	else
		Set @SqlSort = '[cue_clinea]  DESC,[cue_ncuenta] DESC'

	 --Print '@SqlSort _cuenta'
	 --Print @SqlSort
 End

 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'Usuario')

 --RANGOS 
 DECLARE @SqlFilterRango AS VARCHAR(max)
 EXEC getSqlRangesForToken @table = 'm_usuarios', @token = @token, @alias = 'cue.', @SqlFilterRango = @SqlFilterRango OUTPUT
 
 --Print '@SqlFilter'
 --Print @SqlFilter
 --If @SqlFilter Like '%[dominio]%'	<-asi no funciona 
 --2025-04-07 Pablo
 IF @SqlFilter LIKE '%\[dominio\]%' ESCAPE '\'
 Begin
	Declare @filterAux NVARCHAR(MAX) = 'And [usu_cmetadata] Like ''%"domain"%'' 
						And ISJSON(usu_cmetadata) = 1 
						And Cast(JSON_VALUE([usu_cmetadata],''$.domain'') As Varchar(10))'

	--Print '@filterAux'
	--Print @filterAux

	Set @SqlFilter = Replace(@SqlFilter,'AND [dominio]',@filterAux)
 End
 
 --Print '@SqlFilter Post'
 --Print @SqlFilter

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos..m_usuarios o
		LEFT JOIN _Datos.dbo.m_cuentas cue ON cue.cue_iid = o.usu_iidcuenta
		LEFT JOIN _Datos.dbo.vehicle c ON c.ownerid = o.usu_idkey
		
		--ultimo acceso
		outer apply(
				SELECT TOP 1 
					*
					FROM _datos..p_controlAcceso_IO ACIO WITH (NOLOCK)
					WHERE ACIO.cac_idautorizado = o.usu_idKey 
					ORDER BY cac_idKey DESC
			) as ultimoAcceso
			WHERE 1 = 1 ' + @SqlFilter + @SqlFilterRango
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @TotalRows OUTPUT   

--print '-------'
--Print @DynamicSqlTotalRows
 
 --print concat('Total rows: ',@TotalRows)

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, 
								usu_idKey Id, 
								o.*, 
								c.Brand, 
								c.Domain,
								c.Photo,
								ultimoAcceso.cac_fecha,
								ultimoAcceso.cac_tipoacceso,
								cue.*
' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
 --print cast(@DynamicSqlReturnRows as NText)							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

/*
print '-------'
Print @DynamicSqlReturnRows
*/
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to