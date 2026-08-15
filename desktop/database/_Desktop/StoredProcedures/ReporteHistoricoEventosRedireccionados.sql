/**
	Daniel O. Medina
	https://basecamp.com/2249105/projects/14758734/todos/435966074
	Este stored procedure es copia de [ReporteHistorico]
*/
CREATE OR ALTER PROCEDURE [dbo].[ReporteHistoricoEventosRedireccionados]
@redirector_id int = 0,
@CodigosAlarmaExcluir NVARCHAR(512) = '',              
 @Cuentas NVARCHAR(512) = '',            
 @CodigosAlarma NVARCHAR(512) = '',    
 @cod_nMultiMonitor NVARCHAR(1) = '',
 @FechaDesde NVARCHAR(50) = NULL,            
 @FechaHasta NVARCHAR(50) = NULL,            
 @Estados NVARCHAR(512) = '',          
 @Origenes NVARCHAR(512) = '',     
 @Alertas NVARCHAR(512) = '', 
 @zona NVARCHAR(512) = '',
 @usuario NVARCHAR(512) = '',             
 @Tipos NVARCHAR(512) = '',            
 @rec_iid_from NVARCHAR(512) = '', 
-- @onlyRec_iid es solo para traer 1 REC e ignora todos los otros parametros
 @onlyRec_iid int = 0,					
 @est_nstatus int = null,  
 @Mostrar INT = 0,            
 @OrdenarFecha NVARCHAR(128) = 'DESC',           
 @cod_nLeeSonido INT = null,                   
 @rec_cdll NVARCHAR(128) = null,     
 @Operador NVARCHAR(128) = '',     
 @OperadorNot NVARCHAR(128) = '',  
 @est_nestado NVARCHAR(128) = '',  
 @TipoCuenta NVARCHAR(128) = '', 
 @TipoCuentaId NVARCHAR(128) = '', 
 @Prioridad NVARCHAR(128) = '', 
 @cue_cnombre NVARCHAR(256) = '', 
 @cue_clinea NVARCHAR(3) = '',
 @cue_clineaHasta NVARCHAR(3) = '',
 @cue_ncuentaDesde NVARCHAR(4) = '',
 @OperadorNotEmpty NVARCHAR(4) = '',
 @cue_ncuentaHasta NVARCHAR(4) = '',
 @cue_ncuenta NVARCHAR(4) = '',
 @cod_cgrupo NVARCHAR(4) = '',
 @IdGrupo INT = 0,
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
 @extramonth NVARCHAR(5) = 'true',
 @Autoridades VARCHAR(3) = '',
 @totalrows INT = 1 OUTPUT,
 
 -- BC 385429388 - Se agrega el indicador de solo mostrar Eventos si alguno de la cuenta generó alarma.
 @mostrarEventoAlarma INT = 0,

 -- BC 402017122 - Se agrega variable export = 0 (default) para el nuevo export de reporte historico segun columnas de parametro
 @export INT = 0,

 -- BC 407862025: Agregado el filtro por ID Extendido
 @idExtendidoDesde VARCHAR(100) = '',
 @idExtendidoHasta VARCHAR(100) = '',
 @provincia NVARCHAR(MAX) = ''

AS            
 SET NOCOUNT ON            
 SET DATEFORMAT mdy    
    
 --Load Security    
 DECLARE @UserId INT    
 SELECT @UserId = dbo.GetUserIdByToken(@token)    

 DECLARE @UserTipo INT
 SELECT @UserTipo = udw_tipo FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_idKey = @UserId

 --Mostrar    
 DECLARE @Top NVARCHAR(64)    
 SET @Top = ''    

 -- pongo un top maximo
 if @Mostrar = 0
 set @Mostrar = @limit

 IF @Mostrar != 0    
 SET @Top = ' TOP ' + CAST(@Mostrar AS VARCHAR)    
     
 --Order            
DECLARE @SqlSort AS NVARCHAR(256)   
       

 IF @sort != ''              
 BEGIN
	SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'rec_tfechahora DESC')

 END
ELSE
 begin
	set @SqlSort = 'rec_tfechahora DESC'
 end   

PRINT '@SqlSort= ' + CAST(@SqlSort AS VARCHAR(MAX));

-- no se ven los eventos pendientes en una consulta comun de historicos.
if(@table = 'p_recepcion' OR @table='')
BEGIN
	set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112) +',p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
END

if(@extramonth = 'false')
BEGIN
	set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
END

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
        set @SqlSort = ' r.rec_tfechahora DESC '  -- si es por fecha no lleva cue_iid el reporte es multicuenta
    end
    else
    begin
        set @SqlSort = ' r.rec_tfechahora ASC' -- si es por fecha no lleva cue_iid el reporte es multicuenta
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



IF (PATINDEX('%cuentayfecha%', @SqlSort) > 0 AND @export = 0)
begin
	-- me fijo si es DESC o ASC
	if (PATINDEX('%DESC%', @SqlSort) > 0)
        BEGIN
            IF (PATINDEX('%fechaEspecial%', @SqlSort) > 0 )
                BEGIN
                    if (CHARINDEX('UP', @SqlSort) > 0)
                        BEGIN 
                            print '----------- Entre UP por DESC de cuentayfecha';
                            set @SqlSort = 'cue_iid DESC, r.rec_tfechahora ASC'
                        END
                    ELSE
                        BEGIN 
                            print '----------- Entre DOWN por DESC de cuentayfecha';
                            set @SqlSort = 'cue_iid DESC, r.rec_tfechahora DESC'
                        END
                END
            ELSE
                BEGIN
                    print '----------- NO reconoci fechaEspecial en cuentayfecha ASC';
                    set @SqlSort = 'cue_iid DESC, r.rec_tfechahora DESC'
                END
        END
	ELSE
        begin
            IF (PATINDEX('%fechaEspecial%', @SqlSort) > 0 )
                BEGIN
                    if (CHARINDEX('UP', @SqlSort) > 0)
                        BEGIN
                            print '----------- Entre UP por ASC de cuentayfecha';
                            set @SqlSort = 'cue_iid ASC, r.rec_tfechahora ASC'
                        END
                    ELSE
                        BEGIN
                            print '----------- Entre DOWN por ASC de cuentayfecha';
                            set @SqlSort = 'cue_iid ASC, r.rec_tfechahora DESC'
                        END
                END
            ELSE
                BEGIN
                    print '----------- NO reconoci fechaEspecial en cuentayfecha DESC';
                    set @SqlSort = 'cue_iid ASC, r.rec_tfechahora ASC'
                END
        end
end
ELSE IF (PATINDEX('%cuentayfecha%', @SqlSort) > 0 AND @export = 1)
    BEGIN
        -- me fijo si es DESC o ASC
        if (PATINDEX('%DESC%',@SqlSort) > 0)
        begin
            set @SqlSort = 'cue_clinea DESC, r.rec_tfechahora DESC'            
        end
        else
        begin
            set @SqlSort = 'cue_clinea ASC, r.rec_tfechahora DESC'
        end
    END


IF (PATINDEX('%usuyfecha%', @SqlSort) > 0 AND @export = 0)
    BEGIN
        -- me fijo si es DESC o ASC
	    if (PATINDEX('%DESC%', @SqlSort) > 0)
            BEGIN
                IF (PATINDEX('%fechaEspecial%', @SqlSort) > 0 )
                BEGIN
                    if (CHARINDEX('UP', @SqlSort) > 0)
                        BEGIN 
                            print '----------- Entre UP por DESC de usuyfecha';
                            set @SqlSort = 'usu_cnombre DESC, r.rec_tfechahora ASC, cue_iid DESC'
                        END
                    ELSE
                        BEGIN 
                            print '----------- Entre DOWN por DESC de usuyfecha';
                            set @SqlSort = 'cue_iid DESC, usu_cnombre DESC, r.rec_tfechahora DESC'
                        END
                    END
                ELSE
                    BEGIN
                        print '----------- NO reconoci fechaEspecial en usuyfecha ASC';
                        set @SqlSort = 'usu_cnombre DESC, r.rec_tfechahora DESC, cue_iid DESC'
                    END
            END
        ELSE
            BEGIN
                IF (PATINDEX('%fechaEspecial%', @SqlSort) > 0 )
                BEGIN
                    if (CHARINDEX('UP', @SqlSort) > 0)
                        BEGIN
                            print '----------- Entre UP fecha y por ASC de usuyfecha';
                            set @SqlSort = 'usu_cnombre ASC, r.rec_tfechahora ASC, cue_iid ASC'
                        END
                    ELSE
                        BEGIN
                            print '----------- Entre DOWN fecha y por ASC de usuyfecha';
                            set @SqlSort = 'cue_iid ASC, usu_cnombre ASC, r.rec_tfechahora DESC'
                        END
                    END
                ELSE
                    BEGIN
                        print '----------- NO reconoci fechaEspecial en usuyfecha DESC';
                        set @SqlSort = 'usu_cnombre ASC, r.rec_tfechahora ASC, cue_iid ASC'
                    END
            END
    END
ELSE IF (PATINDEX('%usuyfecha%', @SqlSort) > 0 AND @export = 1)
    BEGIN
        -- me fijo si es DESC o ASC
        if (PATINDEX('%DESC%',@SqlSort) > 0)
        begin
            set @SqlSort = 'cue_clinea DESC, usu_cnombre DESC, r.rec_tfechahora DESC'            
        end
        else
        begin
            set @SqlSort = 'cue_clinea ASC, usu_cnombre ASC, r.rec_tfechahora DESC'
        end
    END


-- Agregado Juan Bonforti 0709 - BC : 363909333
IF (PATINDEX('%fechaycuentacheck%', @SqlSort) > 0 )
begin
	-- me fijo si es DESC o ASC
	if (PATINDEX('%DESC%',@SqlSort) > 0)
	begin
		set @SqlSort = 'cue_iid DESC, r.rec_tfechahora DESC'
	end
	else
	begin
		set @SqlSort = 'cue_iid ASC, r.rec_tfechahora ASC'
	end
end
--print @SqlSort



-- si tengo un group by hago sort por el group
if @group != ''
BEGIN
	set @group = REPLACE ( @group , '_rec_nestado' , 'rec_nestado' ) 
	SELECT @SqlSort = dbo.GetSqlSortForJson(@group, 'rec_tfechahora DESC')  
END

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
 
 declare @fields NVARCHAR(MAX);
set @fields ='  
    rq.rdq_cRespuesta,
    r.rec_iid Id,  
	r.rec_cCategorizacion
	--,tablaDatos  
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
	/*,CASE 
		WHEN r.rec_nestado in (9,1,4)
			THEN 1
		WHEN r.rec_nestado in (3,5,6,7)
			THEN 3
		else
			r.rec_nestado
	END as _rec_nestado*/
	,r.rec_tFechaProceso
	,r.rec_tFechaRecepcion
	,r.rec_tfechahora
	, LEFT ( r.rec_iprioridad , 1 ) as rec_iPrioridad

	-- 18/10 Le antepuse el alias de la tabla por error que ocurrió este día.
	, ta.cod_cdescripcion

	, ta.cod_ncolor
	, ta.cod_ncolorletra
	, ta.cod_nWebCliente
	, ta.cod_nMultiMonitor
	, c.cue_iid
	, c.cue_clinea
	, c.cue_ncuenta
	, c.cue_cnombre  
	, c.cue_ccalle
	, c.cue_cubicacion
	, c.cue_clatlng
	, c.cue_clocalidad 
	, c.cue_cprovincia  
	, c.cue_ctelefono
    , c.cue_cIdExtendido
	, CONVERT(VARCHAR, rec_tfechahora, 126) AS rec_isoFechaHora
	, CONVERT(VARCHAR, rec_tFechaProceso, 126) AS rec_isoFechaProceso
	, CONVERT(VARCHAR, rec_tFechaRecepcion, 126) AS rec_isoFechaRecepcion  
	,tip.tip_nTipo
	,o.ope_cnombre  
	,pro_cdescripcion
	,g.gps_rLatitud
	,g.gps_rLongitud
	,g.gps_rAccuracy
	,g.gps_cMethod
	,rxt_nSPIP 
	,rxt_nSPSMS 
	,rxt_nVCIP 
	,rxt_nVCSMS 
	,gps_cIMEI
	,rxl_cLineCard as rxl_clinecard
	,SUBSTRING(xl.rxl_cLog, 1, 350) AS rxl_cLog
	,r._origen
	,r._puerto
	,c.cue_nparticion
	,c.cue_cclave
	,c.cue_cpermiso 
	,madre.cue_clinea as madre_clinea
	,madre.cue_ncuenta as madre_ncuenta
	,madre.cue_cnombre as madre_cnombre
	,tr.res_cdescripcion
	,tc.cat_cDescripcion
	--,r.rec_tfechahora as _tfechahoraOffset
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
	, (
		SELECT TOP 1 rec_ioperador 
			FROM _Datos.dbo.p_recepcion subre
			WHERE subre.rec_iidcuenta = c.cue_iid
				AND subre.rec_nestado in (1,9)
				AND rec_ioperador != 0

	) as operadorAtendiendoCuenta
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
	,o.ope_clogin  
	,ta.cod_nLeeSonido  
	,ta.cod_cSonido
	,ta.cod_cGrupo
	,cab.rec_cdescripcion
	, cab.rec_cdll
	, cab.rec_ntcpip
	--, rxi.*   
	--,tr.*
	--,tc.*
	,sta.sta_ncontadorfa
	, fal.fal_nmargen
	,gmt.ttz_noffset
	,au.*
 '

 
 -- BC 402017122 - Se agrega variable export = 0 (default) para el nuevo export de reporte historico segun columnas de parametro
 IF @export > 0
    BEGIN
        -- Si vino por export, consulto el parametro EXPORTREPORTEHISTORICOCOLUMNAS INTERNO 
        DECLARE @columns varchar(MAX) = '';
        Set @columns = ( Select Cast(par_cvalor As Varchar(MAX)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'EXPORTREPORTEHISTORICOCOLUMNAS' )
        Set @columns = Ltrim( Rtrim(@columns) )

        IF ( @columns != '' )
        BEGIN
            SET @fields = ' '+@columns;
        END

		print 'export fields'
		print @fields
    END


 DECLARE @Sql NVARCHAR(MAX) = ''
 declare @union NVARCHAR(max) = ''

 -- armo los joins
 declare @join NVARCHAR(MAX)=' 
		INNER JOIN [_Datos].[dbo].[redirectorqueue] rq ON  rq.rdq_idrec=r.rec_iid
		LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ta WITH (NOLOCK) ON ta.cod_ccodigo=r.rec_calarma                  
		INNER JOIN [_Datos].[dbo].[m_cuentas] c WITH (NOLOCK) ON c.cue_iid = r.rec_iidcuenta      
		LEFT JOIN [_Tablas].[dbo].[t_tipos] tip WITH (NOLOCK) ON LTRIM(RTRIM(tip.tip_ccodigo)) =  LTRIM(RTRIM(c.cue_ctipo))
		LEFT JOIN [_Datos].[dbo].[m_zonas] z WITH (NOLOCK) ON z.zon_iidcuenta = r.rec_iidcuenta AND LTRIM(RTRIM(z.zon_ccodigo)) = LTRIM(RTRIM(r.rec_czona))      
		LEFT JOIN [_Datos].[dbo].[m_usuarios] u WITH (NOLOCK) ON u.usu_iidcuenta = r.rec_iidcuenta AND u.usu_iid = r.rec_iusuario and r.rec_iusuario>0    
		LEFT JOIN [_datos].[dbo].[m_estado_cuenta_cab] ec WITH (NOLOCK) ON ec.est_iidcuenta = c.cue_iid      
		LEFT JOIN [_Datos].[dbo].[m_cuentas] madre WITH (NOLOCK) ON madre.cue_iid = c.cue_nparticion
		LEFT JOIN [_tablas].[dbo].[t_provincias] pro WITH (NOLOCK) ON c.cue_cprovincia = pro.pro_ccodigo
		left join _sistema..s_operadores o WITH (NOLOCK) on (r.rec_ioperador = o.ope_iid)    
		left join _datos..m_receptores_cab cab WITH (NOLOCK) on (cab.rec_iid = r.rec_idReceptor)  
		left join _datos..p_RXtraInfo rxi WITH (NOLOCK) on (rxi.rxt_irecid = r.rec_iid)  
		left join _datos..m_cuentasXtraInfo x WITH (NOLOCK) on (x.cue_iidcuenta = r.rec_iidcuenta)  
		LEFT JOIN [_Datos].[dbo].[p_PosicionesGPS] g WITH (NOLOCK) ON (g.gps_idRec = r.rec_iid and g.[gps_idCuenta] = r.rec_iidcuenta)
		-- agrego smartrack para mostrar el nombre
		LEFT JOIN [_datos].dbo.[SmartTrack] st WITH (NOLOCK) on g.gps_cimei = st.imei and g.gps_cimei != ''''
		LEFT JOIN _Datos..p_RXLog xl WITH (NOLOCK) ON xl.rxl_iRecId = r.rec_iid
		--tuvo problemas de performance volver a revisar
		--LEFT JOIN (select gps_cIMEI, gps_idrec,gps_rLatitud,gps_rLongitud  from [_Datos].[dbo].[p_PosicionesGPS] union select sp_cimei as gps_cIMEI, sp_reciid as gps_idrec,sp_rLatitud as gps_rLatitud,sp_rLongitud as gps_rLongitud from [_Datos].[dbo].[p_PosicionesSP]) g ON g.gps_idRec = r.rec_iid

		LEFT JOIN _Tablas..t_Grupos gru WITH (NOLOCK) ON gru.gru_ccodigo = ta.cod_cGrupo
		left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey
		left join _Datos..m_status sta WITH (NOLOCK) on c.cue_iid = sta.sta_iidcuenta
		left join _Datos..m_falsas fal WITH (NOLOCK) on c.cue_iid = fal.fal_iidcuenta
		left join _tablas..t_resoluciones tr WITH (NOLOCK) on (tr.res_ccodigo = r.rec_idResolucion) 
		left join _tablas..t_categorizacion tc WITH (NOLOCK) on (tc.cat_cCodigo = r.rec_cCategorizacion) 

		left join _Datos..p_reporte_autoridades ra WITH (NOLOCK) on r.rec_iid = ra.rep_iidrecepcion
		left join _Tablas..t_autoridades au WITH (NOLOCK) on au.aut_ccodigo  = ra.rep_cautoridad
';

-- armo todos los filtros

declare @where NVARCHAR(max) = ' WHERE 1=1 '           
                
            
SET @where = @where + ' And rec_tfechahora <= DATEADD(MINUTE,1,GetDate()) '    
            
     
 IF @Cuentas != ''   AND @Cuentas != '0'         
  SET @where = @where + ' AND r.rec_iidcuenta IN (' + @Cuentas + ') ' 
             
 IF @CodigosAlarmaExcluir != ''            
  SET @where = @where + ' AND r.rec_calarma NOT IN (''' + replace (@CodigosAlarmaExcluir, ',', ''',''') + ''') '
     
 IF @cod_cgrupo != ''
  SET @where = @where + ' AND cod_cgrupo IN (''' + replace (@cod_cgrupoExcluir, ',', ''',''') + ''') '
 
 IF @IdGrupo != 0
	SET @where = @where + ' AND gru.gru_idKey = '+CONVERT(NVARCHAR(10), @IdGrupo)
 
 IF @cod_cgrupoExcluir != ''
  SET @where = @where + ' AND cod_cgrupo NOT IN (''' + replace (@cod_cgrupoExcluir, ',', ''',''') + ''') '

 IF @CodigosAlarma != ''            
  SET @where = @where + ' AND r.rec_calarma IN (''' + replace (@CodigosAlarma, ',', ''',''') + ''') '            

 IF @cod_nMultiMonitor != ''            
  SET @where = @where + ' AND ta.cod_nMultiMonitor = ''' +@cod_nMultiMonitor+''''
  
 IF @redirector_id != 0
	SET @where= @where + 'AND rq.rdq_iReDirector = '+CONVERT(NVARCHAR(10),@redirector_id)
              
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
      

 SET @where = @where + ' AND (r.rec_nestado != 8 or r.rec_calarma=''#T#'')'    
    
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
 set @where=@where + ' AND ta.cod_nLeeSonido = ' + CAST(@cod_nLeeSonido AS NVARCHAR(1))    
   
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

IF @TipoCuentaId != ''  
 SET @where = @where + ' AND tip.[tip_idKey] IN (' + @TipoCuentaId + ')' 

IF @CondicionCuenta != ''  
 SET @where = @where + ' AND tip.[tip_ncondicion] IN (' + @CondicionCuenta + ')'  


IF @Prioridad != ''  
 SET @where = @where + ' AND LEFT( r.rec_iprioridad , 1 ) IN (' + @Prioridad + ')'  

IF @cue_ncuenta != ''  
 SET @where = @where + ' AND LTRIM(RTRIM(c.cue_ncuenta)) = ''' + @cue_ncuenta + ''''  

IF @gps_cIMEI != ''  
 SET @where = @where + ' AND LTRIM(RTRIM(g.gps_cimei)) = ''' + @gps_cIMEI + ''''  

IF @zona != ''  
 SET @where = @where + ' AND z.zon_ccodigo = ''' + @zona + ''''  


IF @usuario != ''  
 SET @where = @where + ' AND rec_iusuario = ''' + @usuario + '''' 

IF @Autoridades != ''  
 SET @where = @where + ' AND aut_ccodigo = ''' + @Autoridades + '''' 

IF @UserTipo = 2
	SET @where = @where + ' AND cod_nWebCliente = 1'

IF @onlyRec_iid != 0
	BEGIN
		SET @where = 'WHERE r.rec_iid = '+	CONVERT(NVARCHAR(10), @onlyRec_iid)
	END

-- BC 407862025: Agregado el filtro por ID Extendido y provincia
IF @idExtendidoDesde != ''  
    SET @where = @where + ' AND c.cue_cIdExtendido >= ''' + @idExtendidoDesde + ''''
IF @idExtendidoHasta != ''  
    SET @where = @where + ' AND c.cue_cIdExtendido <= ''' + @idExtendidoHasta + ''''
IF @provincia != ''
   SET @where = @where + ' AND c.cue_cprovincia = ''' + @provincia + '''' 

--print '@where'+ CAST(@where AS VARCHAR(MAX))

declare @SqlFilter NVARCHAR(max);
EXEC [SqlFilterForJson] @Filter = @filter, @ObjectType = 'p_recepcion', @SqlFilter = @SqlFilter OUTPUT

--RANGOS 
DECLARE @SqlFilterRango AS NVARCHAR(max)
EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
SET @SqlFilter = @SqlFilter + @SqlFilterRango
SET @where = @where + @SqlFilter

    --print @where
    -- recorro las tablas 
	declare @items NVARCHAR(max);
	select @items = @table;
	DECLARE @itemsFinalesPrueba NVARCHAR(MAX)= '';
	DECLARE @specialWhere VARCHAR(MAX) = '';

    --print @items
	DECLARE  @TempTables TABLE (id int IDENTITY(1,1) PRIMARY KEY,Item NVARCHAR(max))
	insert INTO @TempTables select Item FROM dbo.SplitString(@items, ',')

	DECLARE @IndexTables INT
	SET @IndexTables = 1
	WHILE ((SELECT COUNT(*) FROM @TempTables WHERE Id = @IndexTables) != 0)
	 BEGIN
			DECLARE @item NVARCHAR(100)
			select  @item = CAST (Item AS VARCHAR)   FROM @TempTables 
							WHERE Id = @IndexTables

			if @IndexTables > 1
			BEGIN
			  select @union = @union + ' UNION ALL '
			END

			declare @unionfields NVARCHAR(max) =  @fields 

			print '@item'+ CAST(@item AS VARCHAR(MAX))
			
			
			-- BC 402017122 - Se agrega variable export = 0 (default) para el nuevo export de reporte historico segun columnas de parametro
			IF @export = 0
				BEGIN
					IF (@item = 'eventospendientes')
						BEGIN
						set @unionfields = @unionfields +',r.zon_cdescripcion
						,z.zon_ccodigo
						,	CASE 
								WHEN (RTRIM(LTRIM(r.rec_czona)) != '''' AND RTRIM(LTRIM(r.rec_czona)) != ''0'')
									THEN N''(''+RTRIM(LTRIM(r.rec_czona))+N'') ''+r.zon_cdescripcion
								WHEN z.zon_cdescripcion != N'''' OR z.zon_ccodigo != N'''' 
									THEN z.zon_cdescripcion
								when CAST(rxt_cRoute AS NVARCHAR(max)) != N''''
									then rxt_cRoute
								when CAST(rxt_cGeoFenceName AS NVARCHAR(max)) != N''''
									then rxt_cGeoFenceName
								else
									N''''
							END as _zon_cdescripcion
	
						, N'' (''+CONVERT(VARCHAR, r.rec_iusuario, 126)+N'') ''+ isnull(r.usu_cnombre,isnull(st.Nombre,N'''')) as usu_cnombre
						,r.usu_cnombre as usuario_cnombre'

						END
					ELSE
						BEGIN
							set @unionfields = @unionfields +'
							,r.zonas_cdescripcion as zon_cdescripcion
							,r.zonas_ccodigo as zon_ccodigo
							,	CASE 
									WHEN r.zonas_ccodigo != N'''' 
										THEN N''(''+RTRIM(LTRIM(r.zonas_ccodigo))+N'') ''+r.zonas_cdescripcion
									WHEN r.zonas_cdescripcion != N'''' 
										THEN r.zonas_cdescripcion
									when CAST(rxi.rxt_cRoute AS NVARCHAR(max)) != N''''
										then rxi.rxt_cRoute
									when CAST(rxi.rxt_cGeoFenceName AS NVARCHAR(max)) != N''''
										then rxi.rxt_cGeoFenceName
									else
										N''''
								END as _zon_cdescripcion
							, N'' (''+CONVERT(VARCHAR, r.rec_iusuario, 126)+N'') ''+ isnull(r.usuario_cnombre,isnull(st.Nombre,N''''))   as usu_cnombre
							,r.usuario_cnombre'
				
							-- BC 385429388 - Se agrega el indicador de solo mostrar Eventos si alguno de la cuenta generó alarma.
							/* 
							28/05
							Se creó una nueva variable la cual aplica el filtro especifico de buscar eventos por la tabla del mes para el reporte del dealer que sea ver
							solo aquellos eventos de cuentas que generaron alerta
							Se agrega al SELECT final posterior al @where, no debe afectar a las consultas STD de este reporte solo aquellas que envían el parametro @mostrarEventoAlarma en 1
							*/
							IF @mostrarEventoAlarma != 0
							BEGIN
								SET @specialWhere = ' AND exists (
									SELECT rec_iid 
									FROM _Datos..'+@item+' prxx
										inner join _tablas..t_codigos_alarma ttxx on prxx.rec_calarma = ttxx.cod_ccodigo
									WHERE ttxx.cod_nalerta = 1
										and prxx.rec_iidcuenta = r.rec_iidcuenta
										AND prxx.rec_tfechahora >= '''+  @FechaDesde  +'''
										AND prxx.rec_tfechahora <= '''+  @FechaHasta  +'''
								)'
							END

						END
				END
			ELSE IF ( @export > 0 AND @item = 'eventospendientes' )
				BEGIN
					SET @unionfields = @unionfields + '
					,CASE 
						WHEN (RTRIM(LTRIM(r.rec_czona)) != '''' AND RTRIM(LTRIM(r.rec_czona)) != ''0'')
							THEN N''(''+RTRIM(LTRIM(r.rec_czona))+N'') ''+r.zon_cdescripcion
						WHEN z.zon_cdescripcion != N'''' OR z.zon_ccodigo != N'''' 
							THEN z.zon_cdescripcion
						when CAST(rxt_cRoute AS NVARCHAR(max)) != N''''
							then rxt_cRoute
						when CAST(rxt_cGeoFenceName AS NVARCHAR(max)) != N''''
							then rxt_cGeoFenceName
						else
							N''''
					END as _zon_cdescripcion
					,N'' (''+CONVERT(VARCHAR, r.rec_iusuario, 126)+N'') ''+ isnull(r.usu_cnombre,N'''') +'' '' + isnull(st.Nombre,N'''')  as usu_cnombre'
				END
			ELSE
				BEGIN
					SET @unionfields = @unionfields + '
					,CASE 
						WHEN r.zonas_ccodigo != N'''' 
							THEN N''(''+RTRIM(LTRIM(r.zonas_ccodigo))+N'') ''+r.zonas_cdescripcion
						WHEN r.zonas_cdescripcion != N'''' 
							THEN r.zonas_cdescripcion
						when CAST(rxi.rxt_cRoute AS NVARCHAR(max)) != N''''
							then rxi.rxt_cRoute
						when CAST(rxi.rxt_cGeoFenceName AS NVARCHAR(max)) != N''''
							then rxi.rxt_cGeoFenceName
						else
							N''''
					END as _zon_cdescripcion
					,N'' (''+CONVERT(VARCHAR, r.rec_iusuario, 126)+N'') ''+ isnull(r.usuario_cnombre,N'''') +'' '' + isnull(st.Nombre,N'''')  as usu_cnombre'
				END
			
			-- BC 402017122 - Se agrega variable export = 0 (default) para el nuevo export de reporte historico segun columnas de parametro
			IF @export = 0
				BEGIN
					select @union = @union + 'select '+@Top+@unionfields+', '''+@item+''' as tablaDatos '+' from [_Datos].[dbo].['+@item+'] r'+ @join + @where + @specialWhere + ' ORDER BY ' + @SqlSort
				END
			ELSE
				BEGIN
					select @union = @union + 'select '+@Top+@unionfields+' from [_Datos].[dbo].['+@item+'] r'+ @join + @where + @specialWhere + ' ORDER BY ' + @SqlSort
				END
			
			
			select @IndexTables = @IndexTables + 1

			SET @itemsFinalesPrueba = @itemsFinalesPrueba + @item;
			--print '@IndexTables=' + CAST(@IndexTables AS VARCHAR(MAX))
			--print '@itemsFinalesPrueba='+ CAST(@itemsFinalesPrueba AS VARCHAR(MAX))
			--print '@specialWhere'+ CAST(@specialWhere AS VARCHAR(MAX))

	END

	select @sql = @sql + '  
	    ,ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber
        FROM ('+ @union +') r '
	

	print '@Sql= ' + CAST(@sql AS VARCHAR(MAX))
	 

--Total Rows mejorar para usar un solo llamado
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = max(RowNumber) from ( select' + @Top+ ' * '+@Sql+') x'
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 -- SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
 -- agregue los nolock en lugar del uncommitted dedalo 5/8/2019
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT  
 

-- paginacion
set @sql = 'with CTE as (SELECT ' + @Top + ' * ' +@sql+')
	select * from CTE
	WHERE RowNumber BETWEEN ('+cast(@page as NVARCHAR(5))+' - 1) * '+cast(@limit as NVARCHAR(6))+' + 1 AND ('+cast(@page as NVARCHAR(5))+' * '+cast(@limit as NVARCHAR(6))+')    
	ORDER BY ' +REPLACE(REPLACE(REPLACE(@SqlSort,'r.','')  ,'o.','') ,'u.','')

--Pablo Debug
/*
Declare @message nVarChar(Max) = @sql
BEGIN TRY
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @@SPID, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
END TRY
BEGIN CATCH
END CATCH;		
*/
 print 'SQL: '+@SQL

 EXEC (@SQL)