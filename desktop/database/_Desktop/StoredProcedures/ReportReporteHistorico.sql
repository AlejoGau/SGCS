--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.330 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[ReportReporteHistorico]
 @CodigosAlarmaExcluir NVARCHAR(512) = '',              
 @Cuentas NVARCHAR(512) = '',            
 @CodigosAlarma NVARCHAR(512) = '',    
 @cod_nMultiMonitor NVARCHAR(1) = '',
 @FechaDesde NVARCHAR(50) = NULL,            
 @FechaHasta NVARCHAR(50) = NULL,            
 @Estados NVARCHAR(512) = '',          
 @Origenes NVARCHAR(512) = '',     
 @Alertas NVARCHAR(512) = '',            
 @Tipos NVARCHAR(512) = '',            
 @rec_iid_from NVARCHAR(512) = '',            
 @est_nstatus int = null,  
 @Mostrar INT = 0,            
 @OrdenarFecha NVARCHAR(128) = 'DESC',           
 @cod_nLeeSonido INT = null,                   
 @rec_cdll NVARCHAR(128) = null,     
 @Operador NVARCHAR(128) = '',     
 @OperadorNot NVARCHAR(128) = '',  
 @est_nestado NVARCHAR(128) = '',  
 @TipoCuenta NVARCHAR(128) = '', 
 @Prioridad NVARCHAR(128) = '', 
 @cue_cnombre NVARCHAR(256) = '', 
 @cue_clinea NVARCHAR(3) = '',
 @cue_clineaHasta NVARCHAR(3) = '',
 @cue_ncuentaDesde NVARCHAR(4) = '',
 @OperadorNotEmpty NVARCHAR(4) = '',
 @cue_ncuentaHasta NVARCHAR(4) = '',
 @cue_ncuenta NVARCHAR(4) = '',
 @cod_cgrupo NVARCHAR(4) = '',
 @cod_cgrupoExcluir NVARCHAR(512) = '',
 @page INT = 1,                   
 @start INT = 0,                   
 @limit INT = 50,      
 @group NVARCHAR(128) = '',                 
 @sort NVARCHAR(256) = '',                
 @filter NVARCHAR(2048) = '',     
 @CondicionCuenta NVARCHAR(256) = '',
 @token NVARCHAR(128) = '',                
 @_dc NVARCHAR(256) = '',   
 @table NVARCHAR(128) = 'p_recepcion',
 @gps_cIMEI NVARCHAR(128) = '',   
 @short int = 0,
 @conHijos int = 0,
 @timelineFechaVieja int = 1,
 @totalrows INT = 1 OUTPUT,
 
 -- 11/02 JUAN : agregado recibir parametro Categorizaciones
 @Categorizaciones VARCHAR(50) = ''
            
AS            
 SET NOCOUNT ON            
 SET DATEFORMAT mdy    
 -- no se puede usar NOLOCK da errores de data movement.
 --SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED 
    
 --Load Security    
 DECLARE @UserId INT    
 SELECT @UserId = dbo.GetUserIdByToken(@token)    

 DECLARE @UserTipo INT
 SELECT @UserTipo = udw_tipo FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_idKey = @UserId
  
 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')  
 
 DECLARE @HasWebRemotoModule INT 
 SELECT @HasWebRemotoModule = dbo.UserDesktopWebHasModule(@UserId, 'WebRemoto') 
 
 DECLARE @HasDealerModule INT 
 SELECT @HasDealerModule = dbo.UserDesktopWebHasModule(@UserId, 'WebDealer')

 DECLARE @HasMasterDealerModule INT 
 SELECT @HasMasterDealerModule = dbo.UserDesktopWebHasModule(@UserId, 'MasterWebDealer')
 
 DECLARE @HasTrackguardModule INT 
 SELECT @HasTrackguardModule = dbo.UserDesktopWebHasModule(@UserId, 'TrackGuard')    

 DECLARE @HasSmarttrackModule INT 
 SELECT @HasSmarttrackModule = dbo.UserDesktopWebHasModule(@UserId, 'SmartTrack')  

 DECLARE @HasSmartpanicsModule INT 
 SELECT @HasSmartpanicsModule = dbo.UserDesktopWebHasModule(@UserId, 'SmartPanics')

 DECLARE @HasTrackGuardMonitoreoModule INT 
 SELECT @HasTrackGuardMonitoreoModule = dbo.UserDesktopWebHasModule(@UserId, 'TrackGuardMonitoreo')  

 DECLARE @HasSerTecModule INT 
 SELECT @HasSerTecModule = dbo.UserDesktopWebHasModule(@UserId, 'SerTec') 
	
 DECLARE @HasAwccModule INT 
 SELECT @HasAwccModule = dbo.UserDesktopWebHasModule(@UserId, 'AWCC') 

 DECLARE @HasWebmonRanges INT 
 DECLARE @webmonsecurity NVARCHAR(MAX)

 SELECT @webmonsecurity = ums_data FROM _Sistema.dbo.UsersDesktopWebModulosSecurity WHERE ums_idWeb = @UserId AND ums_idModules = 2


 SET @HasWebmonRanges = 0;
 if PATINDEX('%porrango%',@webmonsecurity) > 0
 begin
	SET @HasWebmonRanges = 1;
 end
 
      
 --Mostrar    
 DECLARE @Top NVARCHAR(64)    
 SET @Top = ''    

 -- pongo un top maximo
 if @Mostrar = 0
 set @Mostrar = 10000

 IF @Mostrar != 0    
 SET @Top = ' TOP ' + CAST(@Mostrar AS VARCHAR)    
     
 --Order            
DECLARE @SqlSort AS NVARCHAR(256)   
       

 IF @sort != ''              
 BEGIN              
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'rec_tfechahora DESC')    

 END
 else
 begin
	set @SqlSort = 'rec_tfechahora DESC'
 end   
 
-- Se agrega la posibilidad de consultar las tablas por mes de _Datos..p_recepcion_proceso y XtraInfo
declare @tablaProceso varchar(128) = 'p_recepcion_proceso'
declare @tablaXtraInfo varchar(128) = 'p_RXtraInfo'
declare @tablaTimeline varchar(128) = 'EventosTimeLine'

-- no se ven los eventos pendientes en una consulta comun de historicos.
IF (@table = 'p_recepcion' OR @table='')
    BEGIN
        --set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112) +',p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
		-- Convertir a DATETIME
		DECLARE @Desde DATETIME = TRY_CAST(@FechaDesde AS DATETIME);
		DECLARE @Hasta DATETIME = TRY_CAST(@FechaHasta AS DATETIME);

		-- Calcular rangos de fechas
		DECLARE @InicioMesActual DATE = DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1);
		DECLARE @InicioMesAnterior DATE = DATEADD(MONTH, -1, @InicioMesActual);
		DECLARE @FinMesAnterior DATE = DATEADD(DAY, -1, @InicioMesActual);
		DECLARE @FinMesActual DATE = EOMONTH(GETDATE());

		-- Evaluación con IF
		IF @Desde >= @InicioMesActual AND @Hasta <= @FinMesActual
		BEGIN
			--PRINT 'Ambas fechas están dentro del mes actual';
			set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
		END
		ELSE IF @Desde >= @InicioMesAnterior AND @Desde <= @FinMesAnterior AND @Hasta >= @InicioMesActual AND @Hasta <= @FinMesActual
		BEGIN
			--PRINT 'Empieza en mes anterior y termina en el actual';
			set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112) +',p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
		END
		ELSE IF @Desde >= @InicioMesAnterior AND @Hasta <= @FinMesAnterior
		BEGIN
			--PRINT 'Ambas fechas están en el mes anterior';
			set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112)  + ',eventospendientes'
		END
		ELSE
		BEGIN
			PRINT 'Fechas fuera de los rangos analizados';
			set @table = 'eventospendientes'
		END
	END
ELSE
    BEGIN
        -- Asigno el mes en caso de venir con combo de historico del reporte.
        select @tablaProceso = @tablaProceso+RIGHT(@table,6)
        select @tablaXtraInfo = @tablaXtraInfo+RIGHT(@table,6)
        select @tablaTimeline = @tablaTimeline+RIGHT(@table,6)

		--PRINT '@tablaTimeline' + @tablaTimeline
		--PRINT '@tablaXtraInfo' + @tablaXtraInfo

		-- En caso de no existir la tabla de p_recepcion_procesoYYYYMM busco en p_recepcion_proceso
		IF NOT EXISTS (SELECT * FROM _Datos.INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @tablaProceso AND TABLE_TYPE != 'VIEW' )
			BEGIN
				--PRINT 'Table NOT Exists'
				SET @tablaProceso = 'p_recepcion_proceso';
                
				--print @tablaProceso
			END
		ELSE
			--BEGIN
			--	PRINT 'Table Exists'
			--	print @tablaProceso
			--	print @table
			--END
        -- En caso de no existir la tabla de p_RXtraInfoYYYYMM busco en RXtraInfo
		IF NOT EXISTS (SELECT * FROM _Datos.INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @tablaXtraInfo AND TABLE_TYPE != 'VIEW' )
			BEGIN
				--PRINT 'Table NOT Exists'
				SET @tablaXtraInfo = 'p_RXtraInfo';
                
                --print @tablaXtraInfo
			END
		--ELSE
			--BEGIN
			--	PRINT 'Table Exists'
			--	print @tablaXtraInfo
			--END
        
        -- JUAN 05/10 Agregado por BC 367151001
        -- En caso de no existir la tabla de EventosTimelineYYYYMM busco en EventosTimeline
		IF NOT EXISTS (SELECT * FROM _Datos.INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @tablaTimeline AND TABLE_TYPE != 'VIEW' )
			BEGIN
				--PRINT 'Table NOT Exists'
				SET @tablaTimeline = 'EventosTimeLine';
                
                --print @tablaTimeline
			END
		--ELSE
			--BEGIN
			--	PRINT 'Table Exists'
			--	print @tablaTimeline
			--END
    END


-- me fijo si ordena por fecha para odernar por ID tambien se lleva a las patadas con mostrar ultimos 100
if (PATINDEX('%rec_tfechahora%',@SqlSort) > 0 AND PATINDEX('%ope_cnombre%',@SqlSort) <= 0)
begin
	-- me fijo si es DESC o ASC
	if (PATINDEX('%DESC%',@SqlSort) > 0)
	begin
		set @SqlSort = 'r.rec_tfechahora DESC'
	end
	else
	begin
		set @SqlSort = 'r.rec_tfechahora ASC'
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
	SELECT @SqlSort = dbo.GetSqlSortForJson(@group, 'rec_tfechahora DESC')  
END


--select @SqlSort

declare @rec_fields NVARCHAR(MAX);
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
	,o.[ope_cnombre]
 '
 
declare @fields NVARCHAR(MAX);
set @fields ='     
	r.rec_cCategorizacion
	, r.rec_cObservaciones
	, r.rec_cContenido
	, r.rec_calarma
	, r.rec_czona
	, r.rec_idResolucion
	, r.rec_iid
	, r.rec_iidcuenta
	, r.rec_ioperador
	, r.rec_iusuario
	, r.rec_iPuerto
	, r.rec_nOrigen
	, r.rec_nestado
	, r.rec_tFechaProceso
	, r.rec_tFechaRecepcion
	, r.rec_tfechahora
	, LEFT ( r.rec_iprioridad , 1 ) as rec_iPrioridad
	, ta.cod_cdescripcion
	, ta.cod_ncolor
	, ta.cod_ncolorletra
	, ta.cod_nWebCliente
	, ta.cod_nMultiMonitor
	, u.usu_cnombre as usu_cnombre_orig
	, u.usu_iCodigo as usu_icodigo
	, c.cue_clinea
	, c.cue_ncuenta
	, c.cue_cnombre  
	, c.cue_ccalle
	, c.cue_cubicacion
	, c.cue_clatlng
	, c.cue_clocalidad 
	, c.cue_cprovincia  
	, c.cue_ctelefono
	, CONVERT(VARCHAR, r.rec_tfechahora, 126) AS rec_isoFechaHora, CONVERT(VARCHAR, r.rec_tFechaProceso, 126) AS rec_isoFechaProceso
	, CONVERT(VARCHAR, r.rec_tFechaRecepcion, 126) AS rec_isoFechaRecepcion  
	, tip.tip_nTipo
	, o.ope_cnombre  
	, r._origen
	, r._puerto
	, c.cue_cclave
	, c.cue_cpermiso 
	, isnull(recpro.pro_iRecIdPadre,0) as pro_iRecIdPadre
 '
SET @fields += ',convert(varchar(100),isnull(DATEDIFF(second, r.rec_tfechahora, etl.etl_tFechaHora),0)) as diferencia ' 
SET @fields += ', convert(varchar(100),isnull(DATEDIFF(second, r.rec_tfechahora, rxi.rxt_dFechaHoraProcesaEvento),0)) as diferencia2'

if @short != 1
select @fields +=  '     
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
	,c.cue_nparticion
	,x.cue_ccustom  
	, (
		SELECT TOP 1 rec_ioperador 
			FROM _Datos.dbo.p_recepcion subre
			WHERE subre.rec_iidcuenta = c.cue_iid
				AND subre.rec_nestado in (1,9)
				AND rec_ioperador != 0

	) as operadorAtendiendoCuenta
	,o.ope_clogin  
	,ta.cod_nLeeSonido  
	,ta.cod_cSonido
	,ta.cod_cGrupo
	,cab.rec_cdescripcion
	,cab.rec_cdll
	,cab.rec_ntcpip
	,rxi.*
    ,tr.*
	,madre.cue_clinea as madre_clinea
	,madre.cue_ncuenta as madre_ncuenta
	,madre.cue_cnombre as madre_cnombre
	,tc.*
	,sta.sta_ncontadorfa
	,IsNull(z.zon_cdescripcion,'''') As zon_cdescripcion
	'

 DECLARE @Sql NVARCHAR(MAX) = ''
 declare @union NVARCHAR(max) = ''

 -- armo los joins
 declare @join NVARCHAR(MAX)=' LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ta ON ta.cod_ccodigo=r.rec_calarma                  
		INNER JOIN [_Datos].[dbo].[m_cuentas] c ON c.cue_iid = r.rec_iidcuenta      
		LEFT JOIN [_Tablas].[dbo].[t_tipos] tip ON LTRIM(RTRIM(tip.tip_ccodigo)) =  LTRIM(RTRIM(c.cue_ctipo))    
		LEFT JOIN [_Datos].[dbo].[m_usuarios] u ON u.usu_iidcuenta = r.rec_iidcuenta AND u.usu_iid = r.rec_iusuario     
		LEFT JOIN [_datos].[dbo].[m_estado_cuenta_cab] ec ON ec.est_iidcuenta = c.cue_iid      
		LEFT JOIN [_Datos].[dbo].[m_cuentas] madre ON madre.cue_iid = c.cue_nparticion
		LEFT JOIN [_Sistema].[dbo].[s_operadores] o on (r.rec_ioperador = o.ope_iid)    
		LEFT JOIN [_datos].[dbo].[m_receptores_cab] cab on (cab.rec_iid = r.rec_idReceptor)
		LEFT JOIN [_datos].[dbo].['+@tablaXtraInfo+'] rxi on (rxi.rxt_irecid = r.rec_iid)  
		LEFT JOIN [_datos].[dbo].[m_cuentasXtraInfo] x on (x.cue_iidcuenta = r.rec_iidcuenta)  
		LEFT JOIN [_Datos].[dbo].[m_status] sta on c.cue_iid = sta.sta_iidcuenta
		LEFT JOIN [_tablas].[dbo].[t_resoluciones] tr on (tr.res_ccodigo = r.rec_idResolucion) 
		LEFT JOIN [_tablas].[dbo].[t_categorizacion] tc on (tc.cat_cCodigo = r.rec_cCategorizacion)
		LEFT JOIN [_Datos].[dbo].[m_zonas] z ON z.zon_iidcuenta = r.rec_iidcuenta AND z.zon_ccodigo = r.rec_czona 
		OUTER APPLY (SELECT TOP 1 * FROM _Datos..'+@tablaProceso+' WHERE pro_recid = r.rec_iid ORDER BY pro_iid DESC) recpro
		OUTER APPLY (SELECT TOP 1 * FROM _Datos..'+@tablaTimeline+' WHERE r.rec_iid= etl_iRecID AND r.rec_tfechahora != etl_tFechaHora ORDER BY etl_tFechaHora ASC) etl 
		';
	-- armo todos los filtros

declare @where NVARCHAR(max) = ' WHERE 1=1 '           
SET @where = @where + ' And rec_tfechahora <= DATEADD(MINUTE,1,GetDate()) '    
            
 if @Operador != ''             
  SET @where +=  ' AND o.ope_clogin = ''' + @Operador + ''''  
    
 if @OperadorNot != ''             
  SET @where += ' AND o.ope_clogin not in (''' + replace(@OperadorNot, ',', ''',''') + ''') '  
      
 if @OperadorNotEmpty != ''             
  SET @where += ' AND o.ope_clogin != '''' '  

 IF @Cuentas != '' AND @Cuentas != '0'           
  SET @where = @where + ' AND r.rec_iidcuenta IN (' + @Cuentas + ') '          
              
 IF @CodigosAlarmaExcluir != ''            
  SET @where = @where + ' AND r.rec_calarma NOT IN (''' + replace (@CodigosAlarmaExcluir, ',', ''',''') + ''') '
     
 IF @CodigosAlarma != ''            
  SET @where = @where + ' AND r.rec_calarma IN (''' + replace (@CodigosAlarma, ',', ''',''') + ''') '            

 IF @FechaDesde IS NOT NULL AND @FechaDesde != ''          
  SET @where = @where + ' AND r.rec_tfechahora >= '''+  @FechaDesde  +''''     
            
 IF @FechaHasta IS NOT NULL AND @FechaHasta != ''               
  SET @where = @where + ' AND r.rec_tfechahora <= '''+  @FechaHasta  +''''              
              
 if @Estados != ''          
  SET @where = @where + ' AND r.rec_nestado IN ( ' + @Estados + ')'   
  
 SET @where = @where + ' AND r.rec_nestado != 8'    
    
 if @Origenes != ''          
  SET @where = @where + ' AND r.rec_norigen IN ( ' + @Origenes + ')'        
   
  IF @rec_iid_from != ''            
  SET @where = @where + ' AND (r.rec_iid >= ' + @rec_iid_from + ')'         
      
  
 IF @est_nestado != ''  
 SET @where = @where + ' AND ec.est_nestado IN ( ' + @est_nestado + ')'         
 ELSE  
 SET @where = @where + ' AND (ec.est_nestado != 2 OR r.rec_calarma = ''_SN'')'    
 
IF @Prioridad != ''  
 SET @where = @where + ' AND LEFT( r.rec_iprioridad , 1 ) IN (' + @Prioridad + ')'  

-- 10/02 JUAN Agregado para filtrar por Categorizaciones. 
-- 2022/09/21 Pablo. El filtro de categorizacion sale de la tabla de resoluciones
IF @Categorizaciones != ''
	SET @where = @where + ' AND r.rec_idResolucion = ''' +@Categorizaciones+''''

declare @SqlFilter NVARCHAR(max);
EXEC [SqlFilterForJson] @Filter = @filter, @ObjectType = @tablaProceso, @SqlFilter = @SqlFilter OUTPUT

--RANGOS 
DECLARE @SqlFilterRango AS NVARCHAR(max)
EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
SET @SqlFilter = @SqlFilter + @SqlFilterRango
--Print '@SqlFilter'
--Print @SqlFilter

--SET @where = @where + @SqlFilter

/*
Print '-----'
print @fields;
print @SqlSort;
print @join;
print @where;
print @table; 
Print '-----'
*/

-- recorro las tablas 
DECLARE 
  @baseRec       NVARCHAR(MAX) = N'',      -- contendrá los SELECTs de BaseRec
  @tablesList    NVARCHAR(MAX) = N'',      -- lista de tablas recorridas
  @sep           NVARCHAR(10)   = N'';     -- para gestionar los UNION ALL

Set @SqlSort = Replace(@SqlSort,'r.','')

DECLARE @items NVARCHAR(max);
DECLARE @itemsFinalesPrueba NVARCHAR(MAX)= '';

SELECT @items = @table;
SELECT * INTO #TempTables FROM dbo.SplitString(@items, ',')

DECLARE @IndexTables INT = 1
WHILE EXISTS (SELECT 1 FROM #TempTables WHERE Id = @IndexTables)
	BEGIN
		DECLARE @item NVARCHAR(100) = (SELECT Item FROM #TempTables WHERE Id = @IndexTables );
		
		--Preparamos el UNION ALL salvo en la primera pasada
		SET @baseRec += @sep;
		SET @sep      = N' UNION ALL ';

	  -- Agregamos a la lista de tablas para el JOIN final
		SET @tablesList += CASE WHEN @tablesList = '' THEN @item ELSE ','+@item END;

		
  -- Concatenamos el SELECT mínimo para BaseRec
  SET @baseRec += N'
    SELECT Top 5000 ' + @rec_fields + '
      ,LEFT(r.rec_iprioridad,1) AS rec_iPrioridad
    FROM [_Datos].dbo.['+@item+'] r
    LEFT JOIN [_Datos].dbo.m_estado_cuenta_cab ec ON ec.est_iidcuenta = r.rec_iidcuenta
	LEFT JOIN [_Sistema].[dbo].[s_operadores] o on (r.rec_ioperador = o.ope_iid)    
  ' + @where;

  SET @IndexTables += 1;
END

-- Construyo los JOIN sobre cada partición (sólo p_recepcion… y eventospendientes, etc.)
--2023-03-10 Pablo. Si el @mostrar es un numero chico y hay muchos eventos en el mes actual, los select individuales de los Union pueden cortar el mes
Declare @querysintop varchar(20) = ''

DECLARE @joinList NVARCHAR(MAX) = N'';
SELECT  @joinList +=  N' LEFT JOIN [_Datos].dbo.['+ LTRIM(RTRIM(value)) + N'] AS r_' + LTRIM(RTRIM(value))+ N' ON r_' + LTRIM(RTRIM(value)) + N'.rec_iid = t.rec_iid' FROM STRING_SPLIT(@tablesList, ',');

-- 2) Y ahora tu SQL dinámico queda así:
Set @sql = N'
WITH BaseRec AS (
  ' + @baseRec + N'
),
TopRec AS (
  SELECT TOP(' + CAST(@mostrar AS NVARCHAR(10)) + N') rec_iid
  FROM BaseRec
  ORDER BY [ope_cnombre] DESC, [rec_iPrioridad] ASC, [rec_iid] DESC, [rec_tfechahora] DESC
)
SELECT ' + @fields + N'
FROM TopRec t
JOIN BaseRec AS r ON r.rec_iid = t.rec_iid
' + @joinList + ' ' + @join 

/*2025-05-21 Pablo : Le saque el  ORDER BY ' + @SqlSort porque desde el rest le harcodea el SORT y lo uso en el query final
Set @sql = N'
WITH BaseRec AS (
  ' + @baseRec + N'
),
TopRec AS (
  SELECT TOP(' + CAST(@mostrar AS NVARCHAR(10)) + N') rec_iid
  FROM BaseRec
  ORDER BY ' + @SqlSort + '
)
SELECT ' + @fields + N'
FROM TopRec t
JOIN BaseRec AS r ON r.rec_iid = t.rec_iid
' + @joinList + ' ' + @join 
*/
declare @whereFin NVARCHAR(max) = ' WHERE 1=1 '           
	IF @conHijos != 0
		BEGIN
			SET @whereFin = @whereFin + ' AND recpro.pro_nProceso in (12,11) OR recpro.pro_iRecIdPadre != '''' '
			SET @SqlSort = @SqlSort + ' AND recpro.pro_iRecIdPadre DESC '
		END
   
	 IF @cod_cgrupo != ''
	  SET @whereFin = @whereFin + ' AND cod_cgrupo IN (''' + replace (@cod_cgrupoExcluir, ',', ''',''') + ''') '
 
	 IF @cod_cgrupoExcluir != ''
	  SET @whereFin = @whereFin + ' AND cod_cgrupo NOT IN (''' + replace (@cod_cgrupoExcluir, ',', ''',''') + ''') '

	  IF @cod_nMultiMonitor != ''            
	  SET @whereFin = @whereFin + ' AND ta.cod_nMultiMonitor = ''' +@cod_nMultiMonitor+''''
  
	 if @Origenes = 'SMARTPANICS'  
	  SET @whereFin = @whereFin + ' AND (rxt_nspip = 1 or rxt_nspsms = 1 )'        
   
	 IF @Alertas != ''            
	  SET @whereFin = @whereFin + ' AND ta.cod_nalerta IN ( ' + @Alertas + ')'            
              
	 IF @Tipos != ''            
	  SET @whereFin = @whereFin + ' AND ta.cod_ntipo IN ( ' + @Tipos + ')'        
      
	  IF @rec_cdll != ''            
	  SET @whereFin = @whereFin + ' AND cab.rec_cdll IN ( ' + @rec_cdll + ' ) '        
     
      
	 if @cod_nLeeSonido is not null    
	 set @whereFin=@whereFin + ' AND ta.cod_nLeeSonido = ' + CAST(@cod_nLeeSonido AS NVARCHAR(1))    
   
	  IF @cue_clinea != '' AND @cue_clineaHasta = '' 
	 SET @whereFin = @whereFin + ' AND c.cue_clinea = ''' + @cue_clinea + ''''                

	 IF @cue_clinea != '' AND @cue_clineaHasta != '' 
	 SET @whereFin = @whereFin + ' AND c.cue_clinea >= ''' + @cue_clinea + '''  AND c.cue_clinea <= ''' + @cue_clineaHasta + ''' '                

	  IF @cue_cnombre != ''  
	 SET @whereFin = @whereFin + ' AND c.cue_cnombre LIKE '''+'%'+ @cue_cnombre + '%'''

	 IF @cue_ncuentaDesde != ''  
	 SET @whereFin = @whereFin + ' AND c.cue_ncuenta >= ''' + @cue_ncuentaDesde + ''''

	 IF @cue_ncuentaHasta != ''  
	 SET @whereFin = @whereFin + ' AND c.cue_ncuenta <= ''' + @cue_ncuentaHasta + ''''

	IF @TipoCuenta != ''  
	 SET @whereFin = @whereFin + ' AND tip.[tip_nTipo] IN (' + @TipoCuenta + ')'  

	IF @CondicionCuenta != ''  
	 SET @whereFin = @whereFin + ' AND tip.[tip_ncondicion] IN (' + @CondicionCuenta + ')'  

	IF @cue_ncuenta != ''  
	 SET @whereFin = @whereFin + ' AND LTRIM(RTRIM(c.cue_ncuenta)) = ''' + @cue_ncuenta + ''''  

	IF @gps_cIMEI != ''  
	 SET @whereFin = @whereFin + ' AND LTRIM(RTRIM(g.gps_cimei)) = ''' + @gps_cIMEI + ''''  

	IF @UserTipo = 2
		SET @whereFin = @whereFin + ' AND cod_nWebCliente = 1'


SET @whereFin = @whereFin + @SqlFilter
Set @sql += @whereFin
Set @sql += ' ORDER BY ' + @SqlSort 

/*
print '------------------'
PRINT CAST(@sql AS NTEXT);
*/

EXEC sp_executesql @sql;