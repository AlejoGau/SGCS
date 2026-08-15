CREATE OR ALTER PROCEDURE [dbo].[p_controlAcceso_IOSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '', 
 @token VARCHAR(128) = '', 
 @IngSinEg varchar(1)='N',
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
/*2024-04-17 : Pablo. El mdoulo envia los sort asi y el store da error
sort: [{"property":"o.cac_fecha","direction":"DESC"}]
sort: [{"property":"_proveedorusuario_nombre","direction":"ASC"}]
sort: [{"property":"cac_tipoacceso","direction":"DESC"}]
sort: [{"property":"cac_autorizatipo","direction":"ASC"}]
sort: [{"property":"cue_cnombre","direction":"ASC"}]
*/

 If @sort Not Like '%o.cac_fecha%'
 Begin
	If @sort Like '%cac_fecha%'
		Set @sort = Replace(@sort,'cac_fecha','o.cac_fecha')
 End

 If @sort Like '%cac_tipoacceso%'
	Set @sort = Replace(@sort,'cac_tipoacceso','o.cac_tipoacceso')

 If @sort Like '%cac_autorizatipo%'
	Set @sort = Replace(@sort,'cac_autorizatipo','o.cac_autorizatipo')

If @sort Like '%cue_cnombre%'
	Set @sort = Replace(@sort,'cue_cnombre','cueprov.cue_cnombre')

If @sort Like '%_proveedorusuario_nombre%'
	Set @sort = Replace(@sort,'_proveedorusuario_nombre','usu_cnombre')

 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[cac_idkey] DESC')
 
 --Filters

 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_controlAcceso_IO')
 --Print 'SqlFilter: '+@SqlFilter

--2025-01-10 : Pablo. Se cambio el filtrar en la solapa ingresos/egresos 
If patindex('%persona%', @SqlFilter)>0 --@SqlFilter Like '%[persona]%' --cambio la manera de detectar el substring
Begin
	Declare @OriginalValue VARCHAR(MAX) = @SqlFilter
	Declare @SearchValue VARCHAR(MAX)

	--print 'OriginalValue: '+@OriginalValue

	-- Extraer el valor dinámico de la cláusula [persona] LIKE
	Set @SearchValue = SUBSTRING(@OriginalValue, 
								 CHARINDEX('''%', @OriginalValue) + 2, 
								 CHARINDEX('%''', @OriginalValue, CHARINDEX('''%', @OriginalValue) + 2) - CHARINDEX('''%', @OriginalValue) - 2)

	-- Reemplazar dinámicamente
	Set @SqlFilter = REPLACE(@OriginalValue, 
						  'AND [persona] LIKE ''%' + @SearchValue + '%''', 
						  'AND ([usu_cnombre] LIKE ''%' + @SearchValue + '%'' OR [apr_cNombre] LIKE ''%' + @SearchValue + '%'')')

	--Print 'SqlFilter'
	--Print @SqlFilter
End

if @IngSinEg='S'
	SET @SqlFilter= @SqlFilter+' AND o.cac_idkey=lst.cac_idkey '

DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
SET @SqlFilter = @SqlFilter + @SqlFilterRango

--print ' -- Rangos -- '
--print @SqlFilterRango

/*2025-06-03 : Pablo. Cambie el Join con .m_cuentas c, porque si es autorizacion a un proveedor no hay usuario por lo tanto no hay join con m_cuentas y los rangos del token van sobre c.*/
/*2025-08-25 : Pablo. Cambie el Join con .m_cuentas c con OR por un OUTER APPLY porque en entornos con mucho trafico eso era un killer de perfomance*/
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM _datos.dbo.p_controlAcceso_IO o
LEFT JOIN _datos..m_usuarios u ON usu_idKey = o.cac_idautorizado and o.cac_autorizadotipoid<>3227
LEFT JOIN _tablas..t_controlAcceso_puerta pu ON o.cac_idpuerta = cap_iid
LEFT JOIN _datos..m_AccesosProveedores prov ON o.cac_idautorizado=prov.apr_idKey and o.cac_autorizadotipoid=3227
LEFT JOIN _datos..p_controlAcceso_Autorizacion aut ON o.cac_autorizacodigo = aut.caa_codigo and o.cac_autorizacodigo!=''''
OUTER APPLY (
    SELECT TOP 1 *
    FROM (
        SELECT * FROM _datos..m_cuentas c1 
        WHERE u.usu_iidcuenta IS NOT NULL AND u.usu_iidcuenta = c1.cue_iid
        UNION ALL
        SELECT * FROM _datos..m_cuentas c2 
        WHERE u.usu_iidcuenta IS NULL AND aut.caa_usuautoriza IS NOT NULL AND aut.caa_usuautoriza = c2.cue_iid
    ) AS c
) AS c
LEFT JOIN _datos..m_cuentas  cueprov ON	cueprov.cue_iid = aut.caa_usuautoriza and aut.caa_usuautoriza is not null 
LEFT JOIN _Sistema..UsersDesktopWeb udw ON o.cac_autorizaid=udw.udw_idKey
OUTER APPLY  (select top 1 * from _datos.dbo.p_controlAcceso_IO where cac_idautorizado=o.cac_idautorizado   ORDER by cac_fecha desc  ) lst 
 WHERE 1 = 1  ' + @SqlFilter

 --print @sql
 --print '@SqlFilter: '+@SqlFilter
 
 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) FROM ( SELECT o.cac_idkey, ROW_NUMBER() OVER (PARTITION BY o.cac_idkey ORDER BY ' + @SqlSort + ' ) AS rn_dedup '
 SET @DynamicSqlTotalRows += @Sql + ') AS DedupQuery WHERE rn_dedup = 1'
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

/*
Print '--TotalRows '
Print Cast(@DynamicSqlTotalRows As TEXT)
*/
 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 /*
 SET @DynamicSqlReturnRows = 'SELECT * FROM ( SELECT '
 SET @DynamicSqlReturnRows += ' ROW_NUMBER() OVER (PARTITION BY o.cac_idkey ORDER BY ' + @SqlSort + ' ) AS rn_dedup,'
 SET @DynamicSqlReturnRows += ' ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber,'
 SET @DynamicSqlReturnRows += 'o.cac_idkey Id, o.*, pu.*, u.*,udw.*,c.*,prov.* ,cueprov.cue_cnombre as unidad_funcional_prov ' + @Sql + ' ) AS T
							  WHERE rn_dedup = 1 And RowNumber BETWEEN @from AND @to '
--2025-09-12 : Pablo. Se agrego rn_dedup = 1 porque el UNION ALL puede traer duplicados 
*/

Declare @AuxSort AS VARCHAR(256) = Replace(@SqlSort,'o.','')
SET @AuxSort = Replace(@AuxSort,'cueprov.[cue_cnombre]','unidad_funcional_prov'); --21/11/2025 Daniel O. Medina Agrego esta línea para solucionar error en https://softguard.atlassian.net/browse/DK-755
																				  --en el ordenamiento de Unidad Funcional en la pestaña Ingresos/Egresos
																				  -- 

SET @DynamicSqlReturnRows = '
SELECT * FROM (
    SELECT ROW_NUMBER() OVER (ORDER BY ' + @AuxSort + ') AS RowNumber, *
    FROM (
        SELECT ROW_NUMBER() OVER (PARTITION BY o.cac_idkey ORDER BY ' + @SqlSort + ') AS rn_dedup,
               o.cac_idkey Id, o.*, pu.*, u.*,udw.*,c.*,prov.* ,cueprov.cue_cnombre as unidad_funcional_prov ' + @Sql + '
    ) AS DedupData
    WHERE rn_dedup = 1
) AS FinalPagination
WHERE RowNumber BETWEEN @from AND @to'

 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

/*
Print '---------'
Print Cast(@DynamicSqlReturnRows As TEXT)
*/

 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to