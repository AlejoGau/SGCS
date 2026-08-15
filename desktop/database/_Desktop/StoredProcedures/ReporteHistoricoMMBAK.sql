CREATE OR ALTER PROCEDURE [dbo].[ReporteHistoricoMM]            
 @CodigosAlarmaExcluir VARCHAR(512) = '',              
 @Cuentas VARCHAR(512) = '',            
 @CodigosAlarma VARCHAR(512) = '',    
 @cod_nMultiMonitor VARCHAR(1) = '',
 @FechaDesde VARCHAR(50) = NULL,            
 @FechaHasta VARCHAR(50) = NULL,            
 @Estados VARCHAR(512) = '',          
 @Origenes VARCHAR(512) = '',     
 @Alertas VARCHAR(512) = '',            
 @Tipos VARCHAR(512) = '',            
 @rec_iid_from VARCHAR(512) = '',            
 @est_nstatus int = null,  
 @Mostrar INT = 0,            
 @OrdenarFecha VARCHAR(128) = 'DESC',           
 @cod_nLeeSonido INT = null,                   
 @rec_cdll varchar(128) = null,     
 @Operador varchar(128) = '',     
 @OperadorNot varchar(128) = '',  
 @est_nestado varchar(128) = '',  
 @TipoCuenta varchar(128) = '', 
 @Prioridad varchar(128) = '', 
 @cue_cnombre varchar(256) = '',
 @cue_clinea varchar(3) = '',
 @cue_clineaHasta varchar(3) = '',
 @cue_ncuentaDesde varchar(4) = '',
 @OperadorNotEmpty varchar(4) = '',
 @cue_ncuentaHasta varchar(4) = '',
 @cue_ncuenta varchar(4) = '',
 @cod_cgrupo varchar(4) = '',
 @cod_cgrupoExcluir varchar(512) = '',
 @page INT = 1,                   
 @start INT = 0,                   
 @limit INT = 50,      
 @group VARCHAR(128) = '',                 
 @sort VARCHAR(256) = '',                
 @filter VARCHAR(2048) = '',     
 @CondicionCuenta varchar(256) = '',
 @token VARCHAR(128) = '',                
 @_dc VARCHAR(256) = '',   
 @table VARCHAR(128) = 'p_recepcion',   
 @gps_cIMEI varchar(128) = '',   
 @short int = 0,
 @extramonth varchar(5) = 'true',
 @totalrows INT = 1 OUTPUT                  
AS            
 SET NOCOUNT ON            
 SET DATEFORMAT mdy    
    
 --Load Security    
 DECLARE @UserId INT    
 SELECT @UserId = dbo.GetUserIdByToken(@token)    

 DECLARE @UserTipo INT
 SELECT @UserTipo = udw_tipo FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_idKey = @UserId
      
 --Mostrar    
 DECLARE @Top VARCHAR(64)    
 SET @Top = ''    

 -- pongo un top maximo
 if @Mostrar = 0
 set @Mostrar = 100

 IF @Mostrar != 0    
 SET @Top = ' TOP ' + CAST(@Mostrar AS VARCHAR)    
     
 --Order            
DECLARE @SqlSort AS VARCHAR(256)   
       

 IF @sort != ''              
 BEGIN              
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'rec_tfechahora DESC')    

 END
 else
 begin
	set @SqlSort = 'rec_tfechahora DESC'
 end   
 
	set @table = 'p_recepcion'+ CONVERT(VARCHAR(6), getdate(), 112) + ',eventospendientes'



/*
if(@table = 'p_recepcion' OR @table='')
BEGIN
	set @table = 'eventospendientes'
END
*/
-- me fijo si ordena por fecha para odernar por ID tambien se lleva a las patadas con mostrar ultimos 100
if (PATINDEX('%rec_tfechahora%',@SqlSort) > 0 AND PATINDEX('%ope_cnombre%',@SqlSort) <= 0)
begin
	-- me fijo si es DESC o ASC
	if (PATINDEX('%DESC%',@SqlSort) > 0)
	begin
		set @SqlSort = 'r.rec_tfechahora DESC, r.rec_iid DESC'
	end
	else
	begin
		set @SqlSort = 'r.rec_tfechahora ASC, r.rec_iid ASC'
	end
end

if (PATINDEX('%rec_iPrioridad%',@SqlSort) > 0 AND PATINDEX('%ope_cnombre%',@SqlSort) <= 0)
begin
	-- me fijo si es DESC o ASC
	if (PATINDEX('%DESC%',@SqlSort) > 0)
	begin
		set @SqlSort = 'r.rec_iPrioridad DESC, r.rec_tfechahora ASC'
	end
	else
	begin
		set @SqlSort = 'r.rec_iPrioridad ASC, r.rec_tfechahora ASC'
	end
end



-- si tengo un group by hago sort por el group
if @group != ''
BEGIN
	set @group = REPLACE ( @group , '_rec_nestado' , 'rec_nestado' ) 
	SELECT @SqlSort = dbo.GetSqlSortForJson(@group, 'rec_tfechahora DESC')  
END


--- ajusto sort cue_ccalle
select @SqlSort = REPLACE(@SqlSort,'[cue_ccalle]','c.[cue_ccalle]')
select @SqlSort = REPLACE(@SqlSort,'[cod_cdescripcion]','ta.[cod_cdescripcion]')

print @SqlSort

 declare @rec_fields VARCHAR(MAX);
set @rec_fields ='     
	r.rec_cCategorizacion
	,r.rec_cObservaciones
	,r.rec_cContenido
	,r.rec_calarma
	,r.rec_czona
	,r.rec_idResolucion
	,r.rec_iid
	,r.rec_iidcuenta
	,r.rec_ioperador
	,r.rec_iusuario
	,r.rec_iPuerto
	,r.rec_nOrigen
	,r.rec_nestado
	,r.rec_tFechaProceso
	,r.rec_tFechaRecepcion
	,r.rec_tfechahora
	,r.rec_iPrioridad
	--,rec_cObservaciones 
	,r.rec_cTerminal
	,r.rec_iMinutosEspera
	,r.rec_iNYR
	,r.rec_iTE
	,r.rec_idFwd
	,r.rec_idLoc
	,r.rec_idMap
	,r.rec_idReceptor
	,r._Origen
	,r._Puerto
	,ta.cod_ntipo
	,u.usu_cnombre
 '
 
 declare @fields VARCHAR(MAX);
set @fields ='     
	r.rec_cCategorizacion
	,tablaDatos  
	,r.rec_cObservaciones
	,r.rec_cContenido
	,r.rec_calarma
	,r.rec_czona
	,r.rec_idResolucion
	,r.rec_iid
	,r.rec_iidcuenta
	,r.rec_ioperador
	,r.rec_iusuario
	,r.rec_iPuerto
	,r.rec_nOrigen
	,r.rec_nestado
	,r.rec_tFechaProceso
	,r.rec_tFechaRecepcion
	,r.rec_tfechahora
	, LEFT ( r.rec_iprioridad , 1 ) as rec_iPrioridad
	, ta.cod_cdescripcion
	, ta.cod_ncolor
	, ta.cod_ncolorletra
	, ta.cod_nWebCliente
	, ta.cod_nMultiMonitor
	--, u.usu_cnombre as usu_cnombre
	, u.usu_cnombre as usu_cnombre_orig
	, u.usu_iCodigo as usu_icodigo
	, u.usu_iid
	, c.cue_clinea
	, c.cue_ncuenta
	, c.cue_cnombre  
	, c.cue_ccalle
	, c.cue_cubicacion
	, c.cue_clatlng
	, c.cue_clocalidad 
	, c.cue_cprovincia  
	, c.cue_ctelefono
	, CONVERT(VARCHAR, rec_tfechahora, 126) AS rec_isoFechaHora, CONVERT(VARCHAR, rec_tFechaProceso, 126) AS rec_isoFechaProceso
	, CONVERT(VARCHAR, rec_tFechaRecepcion, 126) AS rec_isoFechaRecepcion  
	,tip.tip_nTipo
	,ope_cnombre  
	,pro_cdescripcion
	,rxt_nSPIP 
	,rxt_nSPSMS 
	,rxt_nVCIP 
	,rxt_nVCSMS 
	,rxl_cLineCard rxl_clinecard
	,r._origen
	,r._puerto
	,c.cue_nparticion
	,c.cue_cclave
	,c.cue_cpermiso 
	,madre.cue_clinea as madre_clinea
	,madre.cue_ncuenta as madre_ncuenta
	,madre.cue_cnombre as madre_cnombre
	,gmt.ttz_noffset
	, convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (r.rec_tfechahora, DATENAME(TZoffset , SYSDATETIMEOFFSET())),IsNull(gmt.ttz_nOffSet,0)*60)) as _tfechahoraOffset
 '
if @short != 1
select @fields = @fields + '   
	,r.rec_cTerminal
	,r.rec_iMinutosEspera
	,r.rec_iNYR
	,r.rec_iTE
	,r.rec_idFwd
	,r.rec_idLoc
	,r.rec_idMap
	,r.rec_idReceptor
	,ta.cod_nprioridad
	,ta.cod_ntipo  
	,ta.cod_nalerta
	,dbo.ReporteHistoricoTieneNotificaciones(r.rec_iid) AS tiene_notificaciones
	,c.cue_cobservacion
	,x.cue_ccustom  
    ,/* (
		SELECT TOP 1 rec_ioperador 
			FROM _Datos.dbo.eventospendientes subre
			WHERE subre.rec_iidcuenta = c.cue_iid
				AND subre.rec_nestado in (1,9)
				AND rec_ioperador != 0

	) */ 0 as operadorAtendiendoCuenta
	,z.zon_cAlarmaAGenerar
	,z.zon_ccodigorestauracion
	,z.zon_ccuenta
	,z.zon_cdealer
	,z.zon_cimagen
	,z.zon_clistaemergencia
	,z.zon_codigoalarma
	,z.zon_idKey
	,z.zon_iidcuenta
	,z.zon_mobservacion
	,z.zon_nautoprocesa
	,z.zon_nminutosrestauracion
	,z.zon_nmostrar
	,ope_clogin  
	,ta.cod_nLeeSonido  
	,ta.cod_cSonido
	,ta.cod_cGrupo
	,cab.rec_cdescripcion
	, cab.rec_cdll
	, cab.rec_ntcpip
	--, rxi.*   
	,tr.*
	,tc.*
	,sta.sta_ncontadorfa
	--,fal.fal_nmargen
 '
            
	 if (@table = 'eventospendientes')
	 BEGIN
		set @fields = @fields +',r.zon_cdescripcion
		,z.zon_ccodigo
		,	CASE 
				WHEN (RTRIM(LTRIM(r.rec_czona)) != '''' AND RTRIM(LTRIM(r.rec_czona)) != ''0''
					THEN ''(''+RTRIM(LTRIM(r.rec_czona))+'') ''+r.zon_cdescripcion
				WHEN z.zon_cdescripcion != '''' OR z.zon_ccodigo != '''' 
					THEN z.zon_cdescripcion
				when CAST(rxt_cRoute AS varchar(max)) != ''''
					then rxt_cRoute
				when CAST(rxt_cGeoFenceName AS varchar(max)) != ''''
					then rxt_cGeoFenceName
				else
					''''
			END as _zon_cdescripcion
	
		, '' (''+CONVERT(VARCHAR, r.rec_iusuario, 126)+'') ''+ isnull(u.usu_cnombre,'''') as usu_cnombre
		'

	 END
	 ELSE
	 BEGIN
		set @fields = @fields +'
		,r.zonas_cdescripcion as zon_cdescripcion
		,r.zonas_ccodigo as zon_ccodigo
		,	CASE 
				WHEN r.zonas_ccodigo != '''' 
					THEN ''(''+RTRIM(LTRIM(r.zonas_ccodigo))+'') ''+r.zonas_cdescripcion
				WHEN r.zonas_cdescripcion != '''' 
					THEN r.zonas_cdescripcion
				when CAST(rxi.rxt_cRoute AS varchar(max)) != ''''
					then rxi.rxt_cRoute
				when CAST(rxi.rxt_cGeoFenceName AS varchar(max)) != ''''
					then rxi.rxt_cGeoFenceName
				else
					''''
			END as _zon_cdescripcion
		, '' (''+CONVERT(VARCHAR, r.rec_iusuario, 126)+'') ''+ isnull(r.usuario_cnombre,'''') as usu_cnombre
		'
		
	 END

 DECLARE @Sql VARCHAR(MAX) = ''
 declare @union varchar(max) = ''

 -- armo los joins
 declare @unionjoin VARCHAR(MAX)=' LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ta WITH (NOLOCK) ON ta.cod_ccodigo=r.rec_calarma                  
		INNER JOIN [_Datos].[dbo].[m_cuentas] c WITH (NOLOCK) ON c.cue_iid = r.rec_iidcuenta      
		LEFT JOIN [_Tablas].[dbo].[t_tipos] tip WITH (NOLOCK) ON LTRIM(RTRIM(tip.tip_ccodigo)) =  LTRIM(RTRIM(c.cue_ctipo))
		LEFT JOIN [_Datos].[dbo].[m_zonas] z WITH (NOLOCK) ON z.zon_iidcuenta = r.rec_iidcuenta AND z.zon_ccodigo = r.rec_czona          
		LEFT JOIN [_Datos].[dbo].[m_usuarios] u WITH (NOLOCK) ON u.usu_iidcuenta = r.rec_iidcuenta AND u.usu_iid = r.rec_iusuario and u.usu_icodigo!=0 
		--LEFT JOIN [_datos].[dbo].[m_estado_cuenta_cab] ec WITH (NOLOCK) ON ec.est_iidcuenta = c.cue_iid      
		LEFT JOIN [_Datos].[dbo].[m_cuentas] madre WITH (NOLOCK) ON madre.cue_iid = c.cue_nparticion
		LEFT JOIN [_tablas].[dbo].[t_provincias] pro WITH (NOLOCK) ON c.cue_cprovincia = pro.pro_ccodigo
		left join _sistema..s_operadores o WITH (NOLOCK) on (r.rec_ioperador = o.ope_iid)    
		left join _datos..m_receptores_cab cab WITH (NOLOCK) on (cab.rec_iid = r.rec_idReceptor)  
		left join _datos..p_RXtraInfo rxi WITH (NOLOCK) on (rxi.rxt_irecid = r.rec_iid)  
		left join _datos..m_cuentasXtraInfo x WITH (NOLOCK) on (x.cue_iidcuenta = r.rec_iidcuenta)  
		left join _Datos..m_status sta WITH (NOLOCK) on c.cue_iid = sta.sta_iidcuenta
		left join _tablas..t_resoluciones tr WITH (NOLOCK) on (tr.res_ccodigo = r.rec_idResolucion) 
		left join _tablas..t_categorizacion tc WITH (NOLOCK) on (tc.cat_cCodigo = r.rec_cCategorizacion) 
		LEFT JOIN _Datos..p_RXLog xl ON xl.rxl_iRecId = r.rec_iid -- pedido por Hernan para linecard 12/2/2019
		left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey';

 declare @join VARCHAR(MAX)=' LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ta WITH (NOLOCK) ON ta.cod_ccodigo=r.rec_calarma                  
		INNER JOIN [_Datos].[dbo].[m_cuentas] c WITH (NOLOCK) ON c.cue_iid = r.rec_iidcuenta      
		LEFT JOIN [_Tablas].[dbo].[t_tipos] tip WITH (NOLOCK) ON LTRIM(RTRIM(tip.tip_ccodigo)) =  LTRIM(RTRIM(c.cue_ctipo))       
		LEFT JOIN [_datos].[dbo].[m_estado_cuenta_cab] ec WITH (NOLOCK) ON ec.est_iidcuenta = c.cue_iid      
		left join _sistema..s_operadores o WITH (NOLOCK) on (r.rec_ioperador = o.ope_iid)  
		LEFT JOIN [_Datos].[dbo].[m_usuarios] u WITH (NOLOCK) ON u.usu_iidcuenta = r.rec_iidcuenta AND u.usu_iid = r.rec_iusuario and u.usu_icodigo!=0 
		left join _datos..p_RXtraInfo rxi on (rxi.rxt_irecid = r.rec_iid)  
		left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey';

-- armo todos los filtros

declare @where varchar(max) = ' WHERE 1=1 '           
                
            
SET @where = @where + ' And rec_tfechahora <= DATEADD(MINUTE,1,GetDate()) '    
            
 IF @Cuentas != '' AND @Cuentas != '0'           
  SET @where = @where + ' AND r.rec_iidcuenta IN (' + @Cuentas + ') '          
              
 IF @CodigosAlarmaExcluir != ''            
  SET @where = @where + ' AND r.rec_calarma NOT IN (''' + replace (@CodigosAlarmaExcluir, ',', ''',''') + ''') '
     
 IF @cod_cgrupo != ''
  SET @where = @where + ' AND cod_cgrupo IN (''' + replace (@cod_cgrupoExcluir, ',', ''',''') + ''') '
 
 IF @cod_cgrupoExcluir != ''
  SET @where = @where + ' AND cod_cgrupo NOT IN (''' + replace (@cod_cgrupoExcluir, ',', ''',''') + ''') '

 IF @CodigosAlarma != ''            
  SET @where = @where + ' AND r.rec_calarma IN (''' + replace (@CodigosAlarma, ',', ''',''') + ''') '            

 IF @cod_nMultiMonitor != ''            
  SET @where = @where + ' AND ta.cod_nMultiMonitor = ''' +@cod_nMultiMonitor+''''
  
              
 IF @FechaDesde IS NOT NULL AND @FechaDesde != ''          
  SET @where = @where + ' AND r.rec_tfechahora >= '''+  @FechaDesde  +''''     
            
 IF @FechaHasta IS NOT NULL AND @FechaHasta != ''               
  SET @where = @where + ' AND r.rec_tfechahora <= '''+  @FechaHasta  +''''              
              
 if @Estados != ''          
  SET @where = @where + ' AND r.rec_nestado IN ( ' + @Estados + ')'   
  
 if @Operador != ''             
  SET @where = @where + ' AND o.ope_clogin = ''' + @Operador + ''''  
    
 if @OperadorNot != ''             
  SET @where = @where + ' AND o.ope_clogin not in (''' + replace(@OperadorNot, ',', ''',''') + ''') '  
      

 if @OperadorNotEmpty != ''             
  SET @where = @where + ' AND o.ope_clogin != '''' '  
      


 SET @where = @where + ' AND r.rec_nestado != 8'    
    
 if @Origenes = 'SMARTPANICS'  
  SET @where = @where + ' AND (rxt_nspip = 1 or rxt_nspsms = 1 )'        
 else if @Origenes != ''          
  SET @where = @where + ' AND r.rec_norigen IN ( ' + @Origenes + ')'        
   
 IF @Alertas != ''            
  SET @where = @where + ' AND ta.cod_nalerta IN ( ' + @Alertas + ')'            
              
 IF @Tipos != ''            
  SET @where = @where + ' AND ta.cod_ntipo IN ( ' + @Tipos + ')'        
      
  IF @rec_cdll != ''            
  SET @where = @where + ' AND cab.rec_cdll IN ( ' + @rec_cdll + ' ) '        
     
 IF @rec_iid_from != ''            
  SET @where = @where + ' AND (r.rec_iid >= ' + @rec_iid_from + ')'         
      
 if @cod_nLeeSonido is not null    
 set @where=@where + ' AND ta.cod_nLeeSonido = ' + CAST(@cod_nLeeSonido AS VARCHAR(1))    
   
 IF @est_nestado != ''  
 SET @where = @where + ' AND ec.est_nestado IN ( ' + @est_nestado + ')'         
 ELSE  
 SET @where = @where + ' AND (ec.est_nestado != 2 OR r.rec_calarma = ''_SN'')'    
  
 IF @cue_clinea != '' AND @cue_clineaHasta = '' 
 SET @where = @where + ' AND c.cue_clinea = ''' + @cue_clinea + ''''                

 IF @cue_clinea != '' AND @cue_clineaHasta != '' 
 SET @where = @where + ' AND c.cue_clinea >= ''' + @cue_clinea + '''  AND c.cue_clinea <= ''' + @cue_clineaHasta + ''' '                

  IF @cue_cnombre != ''  
 SET @where = @where + ' AND c.cue_cnombre LIKE '''+'%'+ @cue_cnombre + '%'''


 IF @cue_ncuentaDesde != ''  
 SET @where = @where + ' AND c.cue_ncuenta >= ''' + @cue_ncuentaDesde + ''''

 IF @cue_ncuentaHasta != ''  
 SET @where = @where + ' AND c.cue_ncuenta <= ''' + @cue_ncuentaHasta + ''''

IF @TipoCuenta != ''  
 SET @where = @where + ' AND tip.[tip_nTipo] IN (' + @TipoCuenta + ')'  

IF @CondicionCuenta != ''  
 SET @where = @where + ' AND tip.[tip_ncondicion] IN (' + @CondicionCuenta + ')'  


IF @Prioridad != ''  
 SET @where = @where + ' AND LEFT( r.rec_iprioridad , 1 ) IN (' + @Prioridad + ')'  

IF @cue_ncuenta != ''  
 SET @where = @where + ' AND LTRIM(RTRIM(c.cue_ncuenta)) = ''' + @cue_ncuenta + ''''  

IF @gps_cIMEI != ''  
 SET @where = @where + ' AND LTRIM(RTRIM(g.gps_cimei)) = ''' + @gps_cIMEI + ''''  


IF @UserTipo = 2
	SET @where = @where + ' AND cod_nWebCliente = 1'

declare @SqlFilter varchar(max);
EXEC [SqlFilterForJson] @Filter = @filter, @ObjectType = 'p_recepcion', @SqlFilter = @SqlFilter OUTPUT

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max)
EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
SET @SqlFilter = @SqlFilter + @SqlFilterRango
SET @where = @where + @SqlFilter

-- recorro las tablas 
	declare @items varchar(max);
	select @items = @table;

	DECLARE  @TempTables TABLE (id int IDENTITY(1,1) PRIMARY KEY,Item NVARCHAR(max))
	insert INTO @TempTables select Item FROM dbo.SplitString(@items, ',')

	DECLARE @IndexTables INT
	SET @IndexTables = 1
	WHILE ((SELECT COUNT(*) FROM @TempTables WHERE Id = @IndexTables) != 0)
	 BEGIN
			DECLARE @item varchar(100)
			select  @item = CAST (Item AS VARCHAR)   FROM @TempTables 
				WHERE Id = @IndexTables

			if @IndexTables > 1
			BEGIN
			  select @union = @union+ CHAR(13)+CHAR(10) + ' UNION ALL '
			END

			declare @unionfields varchar(max) =  @rec_fields 

		--print @item

			if (@item='eventospendientes')
			BEGIN
			set @unionfields= @unionfields+'
				,r.zon_cdescripcion as zonas_cdescripcion
				,r.zon_ccodigo as zonas_ccodigo
				,r.usu_cnombre as usuario_cnombre'
			END
			else
			BEGIN
			set @unionfields= @unionfields+'
				,r.zonas_cdescripcion
				,r.zonas_ccodigo
				,r.usuario_cnombre'
			END

			select @union = @union + CHAR(13)+CHAR(10) + 'select '+@Top+@unionfields+', '''+@item+''' as tablaDatos '+' from [_Datos].[dbo].['+@item+'] r '+ CHAR(13)+CHAR(10) + @join + CHAR(13)+CHAR(10) + @where + ' ORDER BY ' + @SqlSort
			select @IndexTables = @IndexTables + 1
	END


	select @sql = @sql + '  FROM ('+ @union +') r ' + @unionjoin



set @sql = 'SELECT ' + @Top + @fields+@sql+'   
			ORDER BY ' +REPLACE(REPLACE(REPLACE(REPLACE(@SqlSort,'r.','') ,'c.','')  ,'o.','') ,'u.','')

print CAST(@sql AS NTEXT)

EXEC (@SQL)