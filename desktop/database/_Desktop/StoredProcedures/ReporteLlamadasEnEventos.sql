--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.270 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[ReporteLlamadasEnEventos]                
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(128) = '',            
 @filter NVARCHAR(2048) = '',     
 --@cod_resolucion NVARCHAR(3) = '',
 @resolucion NVARCHAR(3) = '',
 @idcuenta int = 0,
 @cue_clineadesde NVARCHAR(4) = '',
 @cue_clineaHasta NVARCHAR(4) = '',
 @FechaDesde NVARCHAR(50) = NULL,            
 @FechaHasta NVARCHAR(50) = NULL, 
 @Operador NVARCHAR(128) = '', 
 --@zona NVARCHAR(4) = '',
 --@cuenta NVARCHAR(4) = '',  
 --@cuentaId INT = 0,  
 --@texto NVARCHAR(128) = '', 
 @cue_ncuentaDesde NVARCHAR(4) = '',  
 @cue_ncuentaHasta NVARCHAR(4) = '',  
 --@est_nestado INT = 0,
 --@est_nestadoin NVARCHAR(256) = '', 
 --@tip_ccodigo NVARCHAR(256) = '',
   
 @_dc NVARCHAR(256) = '',
 --@fieldlist NVARCHAR(MAX) = '', 
 --@sta_nestado NVARCHAR(256) = '',
 
 @totalrows INT = 1 OUTPUT,
 @table_hist NVARCHAR(128) = 'p_recepcion',
 @token NVARCHAR(128) 
 -- 10/01 BC 375744352
 --@UserId INT = 0         
AS                
BEGIN                
 DECLARE @fieldlist NVARCHAR(MAX) = ''
 SET NOCOUNT ON              
 set dateformat ymd
 --Load Security
 
 -- 10/01 BC 375744352
 /*IF (@UserId = 0)
	BEGIN
		SELECT @UserId = dbo.GetUserIdByToken(@token)
	END*/
 
 --RANGOS 

 if( @table_hist='')
BEGIN
	set @table_hist = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112) +',p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
END

 DECLARE @SqlFilterRango AS VARCHAR(max)
 EXEC getSqlRangesForToken @table = 'm_cuentas', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
           
 --Order          
 DECLARE @SortField NVARCHAR(128)           
 DECLARE @SortDirection NVARCHAR(4)          
 SELECT @SortField = 'rec_tFechaRecepcion', @SortDirection = 'ASC'           

 IF @sort = 'DOWN'          
 BEGIN          
	SET @SortDirection = 'DESC'           
 /*2025-06-09 Pablo . desde DSS se envia fechaSpecial con valores UP o DOWN
   SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC          
   SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC          
         
   IF @SortField = 'dealer-cuenta'      
      SET @SortField = 'cue_clinea ASC , cue_ncuenta '    
  */
 END          
 			     
 --Temp          
 DROP TABLE IF EXISTS #Temp
 CREATE TABLE #Temp (RowNumber INT, Id INT)
           
 DECLARE @Sql NVARCHAR(MAX) = ''
 Set @Sql = ' WHERE 1 = 1 AND r.rec_nestado = 8'          
  
 --Filters
 declare @JoinAlarma int;
 set @JoinAlarma = 0;
IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty NVARCHAR(32)
	DECLARE @FilterValue NVARCHAR(64)

	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		
		--Set Filters

		DECLARE @ObjectTypeId VARCHAR(64)		
		DECLARE @ObjectId VARCHAR(11)
		DECLARE @RelationObjectTypeId VARCHAR(64)			 											 										
		DECLARE @RelationObjectId VARCHAR(11)
		DECLARE @RelationMethod VARCHAR(12) = ' IN '	
		declare  @objectType VARCHAR(64) = 'Cuenta'
									
		declare @ObjectDatos bit;
		declare @RelationObjectDatos bit;
		IF PATINDEX('%:RelationParent', @FilterProperty) > 0
		BEGIN
			SET @FilterProperty = REPLACE(@FilterProperty, ':RelationParent', '')
			set @ObjectDatos = 0
			set @RelationObjectDatos = 0

			SELECT @ObjectTypeId = CAST(dbo.GetObjectId(@FilterProperty) AS VARCHAR), 
				@ObjectId = @FilterValue, 
				@RelationObjectTypeId = CAST(dbo.GetObjectId(@objectType) AS VARCHAR)			
						
			SET @Sql = @Sql + ' AND c.cue_iid ' + @RelationMethod + ' (SELECT RelationObjectId FROM _datos..RelationObject WHERE ObjectTypeId = ' + @ObjectTypeId + ' AND ObjectId = ' + @ObjectId + ' AND RelationObjectTypeId = ' + @RelationObjectTypeId + ') '     

		END
		ELSE	
		begin
			SET @Sql = @Sql + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''     
			
		end

		--Next
		SET @Index = @Index + 1
	END
	
	DROP TABLE #Filters
END    
   
set @sql = @sql + @SqlFilterRango


 

 IF @FechaDesde IS NOT NULL AND @FechaDesde != ''   
 begin
  SET @sql = @sql + ' AND r.rec_tfechahora >= '''+  @FechaDesde  +''''   
  end
            
 IF @FechaHasta IS NOT NULL AND @FechaHasta != ''               
 begin
  SET @sql = @sql + ' AND r.rec_tfechahora <= '''+  @FechaHasta  +''''   
  
  end

 IF @idcuenta > 0  
 begin
	SET @sql = @sql + ' AND c.cue_iid =  '+ convert(varchar,@idcuenta)      
	
 end

 IF @cue_clineadesde != '' AND @cue_clineaHasta != '' 
 begin
 SET @sql = @sql + ' AND c.cue_clinea >= ''' + @cue_clineadesde + '''  AND c.cue_clinea <= ''' + @cue_clineaHasta + ''' '       
 
 end

 IF @cue_ncuentaDesde != ''  
 begin
 SET @sql = @sql + ' AND c.cue_ncuenta >= ''' + @cue_ncuentaDesde + ''''
  
 end
 
 IF @cue_ncuentaHasta != ''  
 begin
 SET @sql = @sql + ' AND c.cue_ncuenta <= ''' + @cue_ncuentaHasta + ''''
 end

 if @Operador != ''             
  SET @sql = @sql + ' AND o.ope_clogin = ''' + @Operador + ''''  

 if @resolucion != ''
	begin
		SET @sql = @sql + ' AND r.rec_idResolucion = '''+@resolucion+''''
	end
      

declare @SqlFrom NVARCHAR(max)

SET @SqlFrom = 'INSERT INTO #Temp (RowNumber, Id)          
    SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, rec_iid
	FROM _Datos.dbo.m_cuentas c
			LEFT OUTER JOIN _Desktop.dbo.m_estado_cuenta_cab_situacion ON c.cue_iid = est_iidcuenta           
			LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = c.cue_iid                 
			LEFT OUTER JOIN _Tablas.dbo.t_tipos ON tip_ccodigo = c.cue_ctipo
			Left Outer Join _datos.dbo.'+@table_hist+' as r ON rec_iidCuenta=c.cue_iid			
			LEFT JOIN [_Datos].[dbo].[m_usuarios] u WITH (NOLOCK) ON u.usu_iidcuenta = 	r.rec_iidcuenta AND u.usu_icodigo = r.rec_iusuario and r.rec_iusuario>0 
			left join _tablas..t_categorizacion tr WITH (NOLOCK) on (tr.cat_ccodigo = r.rec_idResolucion) 
			left join _sistema..s_operadores o WITH (NOLOCK) on (r.rec_ioperador = o.ope_iid)
			LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ta WITH (NOLOCK) ON ta.cod_ccodigo=r.rec_calarma'


set @Sql = @SqlFrom + char(10) + @Sql
/*
 print '----UNO----'
 Print 'DROP TABLE IF EXISTS #Temp'
 Print 'CREATE TABLE #Temp (RowNumber INT, Id INT)'
 Print '-----------'
 print @Sql
 */
 EXEC(@Sql)              
               
 --Cantidad de registros              
 SELECT @totalrows = MAX(RowNumber) FROM #Temp              
               
 --Paginacion  
 set @Sql = '';

	--IF @fieldlist = '' 
	--	BEGIN
			SET @fieldlist = '
				r.rec_iid,  c.cue_clinea,c.cue_ncuenta,c.cue_cnombre,r.rec_tFechaRecepcion
				,u.usu_cnombre, c.cue_ctelefono
				,(select top 1 tel_cobservacion from _datos..m_telefonos where tel_iidcuenta = c.cue_iid order by tel_iid desc) as observacion
				,tr.cat_cdescripcion /*comentario de la llamada*/
				,r.rec_cObservaciones,o.ope_cnombre	'
	--	END


 set @Sql = @Sql + 'SELECT RowNumber, '+ @fieldlist+'
	
	FROM _Datos.dbo.m_cuentas c
			LEFT OUTER JOIN _Desktop.dbo.m_estado_cuenta_cab_situacion ON c.cue_iid = est_iidcuenta           
			LEFT OUTER JOIN _Datos.dbo.m_status ms ON ms.sta_iidcuenta = c.cue_iid                 
			LEFT OUTER JOIN _Tablas.dbo.t_tipos ON tip_ccodigo = c.cue_ctipo  
			Left Outer Join _datos.dbo.'+@table_hist+' as r ON rec_iidCuenta=c.cue_iid			
			LEFT JOIN [_Datos].[dbo].[m_usuarios] u WITH (NOLOCK) ON u.usu_iidcuenta = r.rec_iidcuenta AND u.usu_icodigo = r.rec_iusuario and r.rec_iusuario>0 
			left join _tablas..t_categorizacion tr WITH (NOLOCK) on (tr.cat_ccodigo = r.rec_idResolucion) 
			left join _sistema..s_operadores o WITH (NOLOCK) on (r.rec_ioperador = o.ope_iid)'
   
 set @Sql += ' INNER JOIN #Temp t ON t.Id = r.rec_iid '
 set @Sql += ' WHERE t.RowNumber BETWEEN (' + replace(@page, '''', '''''') + ' - 1) * ' + replace(@limit, '''', '''''') + ' + 1 AND (' + replace(@page, '''', '''''')+ ' * ' + replace(@limit, '''', '''''') + ')
 ORDER BY t.RowNumber ASC';

 /*
 print '----DOS----'
 print @Sql
 */
 exec(@Sql)
              
END