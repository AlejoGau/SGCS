CREATE OR ALTER PROCEDURE [dbo].[ReporteHistoricoMM]            
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
 @onlyRec_iid int = 0,	-- es para traer 1 REC e ignora todos los otros parametros				
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
 @limit INT = 5000,      
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
 @iConexion NVARCHAR(512) = '',-- 1082,
 @mostrarEventoAlarma INT = 0,  
 @export INT = 0,  -- BC 402017122 - Se agrega variable export = 0 (default) para el nuevo export de reporte historico segun columnas de parametro
 @idExtendidoDesde VARCHAR(100) = '',  -- BC 407862025: Agregado el filtro por ID Extendido
 @idExtendidoHasta VARCHAR(100) = '',
 @provincia NVARCHAR(MAX) = ''

AS            
 SET NOCOUNT ON            
 SET DATEFORMAT mdy    

 --Pablo 2022-08-30 Perfomance    
 Declare @iYaEntre Int = 0	
 --Load Security    
 DECLARE @UserId INT    
 SELECT @UserId = dbo.GetUserIdByToken(@token)    

 DECLARE @UserTipo INT
 SELECT @UserTipo = udw_tipo FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_idKey = @UserId

 --Mostrar    
 DECLARE @Top NVARCHAR(64)    
 SET @Top = ' TOP 300'

 -- pongo un top maximo
 if @Mostrar = 0
	set @Mostrar = @limit

 IF @Mostrar != 0    
 Begin
	If @cod_nMultiMonitor=1
		SET @Top = ' TOP 1000'
	Else
		SET @Top = ' TOP ' + CAST(@Mostrar AS VARCHAR)    
 End     
--2022-10-20 Pablo. Para mejorar perfomance en eventos de la cuenta al atender un evento
DECLARE @InTop NVARCHAR(20) = ''
DECLARE @InSort NVARCHAR(50) = ''
IF (@Cuentas != '' AND @Cuentas != '0' And @filter Not LIke '%rec_iid%') Or @cod_nMultiMonitor != ''	--2022-12-12 Pablo.El llamado desde SP envia rec_iid en filter en lugar de enviarlo como parametro
Begin
	--Set @InTop = ' TOP 1000'-- + CAST(@Mostrar*5 AS VARCHAR)        
	Set @InTop = @Top
	Set @InSort = 'Order by r.rec_tfechahora DESC'
End     

 --Order            
DECLARE @SqlSort AS NVARCHAR(256)   
     
IF @sort != ''              
	SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'rec_tfechahora DESC')
ELSE
	set @SqlSort = 'rec_tfechahora DESC'

--PRINT '@SqlSort= ' + CAST(@SqlSort AS VARCHAR(MAX));

--2023-03-10 Pablo. Si el @mostrar es un numero chico y hay muchos eventos en el mes actual, los select individuales de los Union pueden cortar el mes
Declare @querysintop varchar(20) = ''
-- no se ven los eventos pendientes en una consulta comun de historicos.
If(@table = 'p_recepcion' OR @table='')
BEGIN
	--set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112) +',p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
	Set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
	Set @querysintop = 'p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112)
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
        set @SqlSort = ' r.rec_tfechahora DESC '  -- si es por fecha no lleva cue_iid el reporte es multicuenta
    else
        set @SqlSort = ' r.rec_tfechahora ASC' -- si es por fecha no lleva cue_iid el reporte es multicuenta
end

if (PATINDEX('%rec_iPrioridad%',@SqlSort) > 0 AND PATINDEX('%ope_cnombre%',@SqlSort) <= 0)
begin
	-- me fijo si es DESC o ASC
	if (PATINDEX('%DESC%',@SqlSort) > 0)
		set @SqlSort = 'r.rec_iPrioridad DESC, r.rec_tfechahora ASC'
	else
		set @SqlSort = 'r.rec_iPrioridad ASC, r.rec_tfechahora ASC'
end


-- Nueva prueba para ordenar por fecha y cue_iid
-- Agregado Juan Bonforti 17/08 - BC : 362557017
-- Mejorado Juan Bonforti 20/05/2020 - BC: https://basecamp.com/2249105/projects/12939010/todos/416879616
IF (PATINDEX('%cuentayfecha%', @SqlSort) > 0 AND @export = 0)
begin
	-- me fijo si es DESC o ASC
	if (PATINDEX('%DESC%', @SqlSort) > 0)
        BEGIN
            IF (PATINDEX('%fechaEspecial%', @SqlSort) > 0 )
                BEGIN
                    if (CHARINDEX('UP', @SqlSort) > 0)
                        BEGIN 
                            --print '----------- Entre UP por DESC de cuentayfecha';
                            set @SqlSort = 'cue_iid DESC, r.rec_tfechahora ASC'
                        END
                    ELSE
                        BEGIN 
                            --print '----------- Entre DOWN por DESC de cuentayfecha';
                            set @SqlSort = 'cue_iid DESC, r.rec_tfechahora DESC'
                        END
                END
            ELSE
                BEGIN
                    --print '----------- NO reconoci fechaEspecial en cuentayfecha ASC';
                    set @SqlSort = 'cue_iid DESC, r.rec_tfechahora DESC'
                END
        END
	ELSE
        begin
            IF (PATINDEX('%fechaEspecial%', @SqlSort) > 0 )
                BEGIN
                    if (CHARINDEX('UP', @SqlSort) > 0)
                        BEGIN
                            --print '----------- Entre UP por ASC de cuentayfecha';
                            set @SqlSort = 'cue_iid ASC, r.rec_tfechahora ASC'
                        END
                    ELSE
                        BEGIN
                            --print '----------- Entre DOWN por ASC de cuentayfecha';
                            set @SqlSort = 'cue_iid ASC, r.rec_tfechahora DESC'
                        END
                END
            ELSE
                BEGIN
                    --print '----------- NO reconoci fechaEspecial en cuentayfecha DESC';
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
                            --print '----------- Entre UP por DESC de usuyfecha';
                            set @SqlSort = 'usu_cnombre DESC, r.rec_tfechahora ASC, cue_iid DESC'
                        END
                    ELSE
                        BEGIN 
                            --print '----------- Entre DOWN por DESC de usuyfecha';
                            --set @SqlSort = 'cue_iid DESC, usu_cnombre DESC, r.rec_tfechahora DESC'
							set @SqlSort = ' usu_cnombre DESC, r.rec_tfechahora DESC'
                        END
                    END
                ELSE
                    BEGIN
                        --print '----------- NO reconoci fechaEspecial en usuyfecha ASC';
                        set @SqlSort = 'usu_cnombre DESC, r.rec_tfechahora DESC, cue_iid DESC'
                    END
            END
        ELSE
            BEGIN
                IF (PATINDEX('%fechaEspecial%', @SqlSort) > 0 )
                BEGIN
                    if (CHARINDEX('UP', @SqlSort) > 0)
                        BEGIN
                            --print '----------- Entre UP fecha y por ASC de usuyfecha';
                            set @SqlSort = 'usu_cnombre ASC, r.rec_tfechahora ASC, cue_iid ASC'
                        END
                    ELSE
                        BEGIN
                            --print '----------- Entre DOWN fecha y por ASC de usuyfecha';
                            set @SqlSort = 'cue_iid ASC, usu_cnombre ASC, r.rec_tfechahora DESC'
                        END
                    END
                ELSE
                    BEGIN
                        --print '----------- NO reconoci fechaEspecial en usuyfecha DESC';
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
		set @SqlSort = 'cue_iid DESC, r.rec_tfechahora DESC'
	else
		set @SqlSort = 'cue_iid ASC, r.rec_tfechahora ASC'
end

--PRINT '@SqlSort= ' + CAST(@SqlSort AS VARCHAR(MAX));


-- si tengo un group by hago sort por el group
if @group != ''
BEGIN
	set @group = REPLACE ( @group , '_rec_nestado' , 'rec_nestado' ) 
	--SELECT @SqlSort = dbo.GetSqlSortForJson(@group, 'rec_tfechahora DESC')  
	SELECT @SqlSort = dbo.GetSqlSortForJson(@group, 'r.rec_tfechahora DESC')  
END

-- genero el reverse del sort para calcular mejor el total
declare @sortreversed varchar(max)
select @sortreversed = replace(@sqlsort, 'DESC','ASC2')
select @sortreversed = replace(@sortreversed, 'ASC','DESC')
select @sortreversed = replace(@sortreversed, 'ASC2','ASC')

declare @rec_fields NVARCHAR(MAX);
set @rec_fields ='  
	r.rec_iid Id,
        r.rec_cCategorizacion,
        r.rec_cObservaciones,
        r.rec_cContenido,
        r.rec_calarma,
        r.rec_czona,
        r.rec_idResolucion,
        r.rec_iid,
        r.rec_iidcuenta,
        r.rec_ioperador,
        r.rec_iusuario,
        r.rec_iPuerto,
        r.rec_nOrigen,
        r.rec_nestado,
        r.rec_tFechaProceso,
        r.rec_tFechaRecepcion,
        r.rec_tfechahora,
        LEFT (r.rec_iprioridad, 1) as rec_iPrioridad,
        CONVERT(VARCHAR, r.rec_tfechahora, 126) AS rec_isoFechaHora,
        CONVERT(VARCHAR, r.rec_tFechaProceso, 126) AS rec_isoFechaProceso,
        CONVERT(VARCHAR, r.rec_tFechaRecepcion, 126) AS rec_isoFechaRecepcion,
        r._origen,
        r._puerto,
        r.rec_cTerminal,
        r.rec_iMinutosEspera,
        r.rec_iNYR,
        r.rec_iTE,
        r.rec_idFwd,
        r.rec_idLoc,
        r.rec_idMap,
        r.rec_idReceptor,
        dbo.ReporteHistoricoTieneNotificaciones(r.rec_iid) AS tiene_notificaciones,
 '
 
 declare @fields NVARCHAR(MAX);
set @fields ='  
    ta.cod_cdescripcion,
        ta.cod_ncolor,
        ta.cod_ncolorletra,
        ta.cod_nWebCliente,
        ta.cod_nMultiMonitor,
        c.cue_iid,
        c.cue_clinea,
        c.cue_ncuenta,
        c.cue_cnombre,
        c.cue_ccalle,
        c.cue_cubicacion,
        c.cue_clatlng,
        c.cue_clocalidad,
        c.cue_cprovincia,
        c.cue_ctelefono,
        c.cue_cIdExtendido,
		c.cue_nparticion,
        c.cue_cclave,
        c.cue_cpermiso,
        c.cue_cobservacion,
		tip.tip_nTipo,
        o.ope_cnombre,
        pro_cdescripcion,
        g.gps_rLatitud,
        g.gps_rLongitud,
        g.gps_rAccuracy,
        g.gps_cMethod,
        rxt_nSPIP,
        rxt_nSPSMS,
        rxt_nVCIP,
        rxt_nVCSMS,
        gps_cIMEI,
        rxl_cLineCard as rxl_clinecard,
        SUBSTRING(xl.rxl_cLog, 1, 350) AS rxl_cLog,
        madre.cue_clinea as madre_clinea,
        madre.cue_ncuenta as madre_ncuenta,
        madre.cue_cnombre as madre_cnombre,
        tr.res_cdescripcion,
        tc.cat_cDescripcion ,
        convert(
            datetime,
            SWITCHOFFSET (
                TODATETIMEOFFSET (
                    r.rec_tfechahora,
                    DATENAME(TZoffset, SYSDATETIMEOFFSET())
                ),
                IsNull(gmt.ttz_nOffSet, 0) * 60
            )
        ) as _tfechahoraOffset,
        ta.cod_nprioridad,
        ta.cod_ntipo,
        ta.cod_nalerta,
        x.cue_ccustom,
        (
            SELECT TOP 1 rec_ioperador
            FROM _Datos.dbo.p_recepcion subre
            WHERE subre.rec_iidcuenta = c.cue_iid
                AND subre.rec_nestado in (1, 9)
                AND rec_ioperador != 0
        ) as operadorAtendiendoCuenta,
        z.zon_cAlarmaAGenerar,
        z.zon_ccodigorestauracion,
        z.zon_ccuenta,
        z.zon_cdealer,
        z.zon_cimagen,
        z.zon_clistaemergencia,
        z.zon_codigoalarma,
        z.zon_idKey,
        z.zon_iidcuenta,
        z.zon_mobservacion,
        z.zon_nautoprocesa,
        z.zon_nminutosrestauracion,
        z.zon_nmostrar,
		z.zon_cdescripcion,
        o.ope_clogin,
        ta.cod_nLeeSonido,
        ta.cod_cSonido,
        ta.cod_cGrupo,
        cab.rec_cdescripcion,
        cab.rec_cdll,
        cab.rec_ntcpip,
        sta.sta_ncontadorfa,
        fal.fal_nmargen,
        gmt.ttz_noffset,
        au.*,
        z.zon_ccodigo
		,CASE
			When ta.cod_nResuelve In(1,2) Then N''''
            WHEN ( RTRIM(LTRIM(r.rec_czona)) != '''' AND RTRIM(LTRIM(r.rec_czona)) != ''0'') 
				THEN N''('' + RTRIM(LTRIM(r.rec_czona)) + N'') '' + ISNULL(z.zon_cdescripcion,'''')
            WHEN ( z.zon_cdescripcion != N''''  OR z.zon_ccodigo != N'''' )
				THEN z.zon_cdescripcion
            When CAST(rxt_cRoute AS NVARCHAR(max)) != N''''
				Then rxt_cRoute
            When CAST(rxt_cGeoFenceName AS NVARCHAR(max)) != N''''
				Then rxt_cGeoFenceName
			When ta.cod_nResuelve In(0,3) And xl.rxl_cEvento != '''' 
				Then ( Select IsNull(MZ.zon_cdescripcion,'''')
						From _Datos.dbo.m_zonas MZ WITH (NOLOCK) Where xl.rxl_cEvento=MZ.zon_cCodigo And zon_iidcuenta=c.cue_iid
					 )
            else N''''
        END as _zon_cdescripcion

		,N'' (''+CONVERT(VARCHAR, r.rec_iusuario, 126)+N'') ''+ isnull(usu_cnombre,N'''') +'' '' + isnull(st.Nombre,N'''')  as usu_cnombre
		,est_nestado
 '
/*
--agregar o analizar
        --r.usu_cnombre as usuario_cnombre,
		--r.zon_cdescripcion,

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
 */

 
 -- BC 402017122 - Se agrega variable export = 0 (default) para el nuevo export de reporte historico segun columnas de parametro
 IF @export > 0
    BEGIN
        -- Si vino por export, consulto el parametro EXPORTREPORTEHISTORICOCOLUMNAS INTERNO 
        DECLARE @columns varchar(MAX) = '';
        Set @columns = ( Select Cast(par_cvalor As Varchar(MAX)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'EXPORTREPORTEHISTORICOCOLUMNAS' )
        Set @columns = Ltrim( Rtrim(@columns) )

        IF ( @columns != '' )
            SET @fields = ' '+@columns;

		--print 'export fields'
		--print @fields
    END


 DECLARE @Sql NVARCHAR(MAX) = ''
 declare @union NVARCHAR(max) = ''
 declare @whereunion NVARCHAR(max) = ' WHERE 1=1 
	AND (r.rec_nestado != 8 or r.rec_calarma=''#T#'') '

 declare @joinunion NVARCHAR(max) = '
	LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ta WITH (NOLOCK) ON ta.cod_ccodigo = r.rec_calarma	
	INNER JOIN [_Datos].[dbo].[m_cuentas] c WITH (NOLOCK) ON c.cue_iid = r.rec_iidcuenta'

 -- armo los joins
 declare @join NVARCHAR(MAX)=' 
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
		LEFT JOIN [_datos].dbo.[SmartTrack] st WITH (NOLOCK) on g.gps_cimei = st.imei and g.gps_cimei != ''''
		LEFT JOIN _Datos..p_RXLog xl WITH (NOLOCK) ON xl.rxl_iRecId = r.rec_iid
		LEFT JOIN _Tablas..t_Grupos gru WITH (NOLOCK) ON gru.gru_ccodigo = ta.cod_cGrupo
		left join _tablas..t_timezone gmt WITH (NOLOCK) on c.cue_iZonaHoraria = gmt.ttz_idkey
		left join _Datos..m_status sta WITH (NOLOCK) on c.cue_iid = sta.sta_iidcuenta
		left join _Datos..m_falsas fal WITH (NOLOCK) on c.cue_iid = fal.fal_iidcuenta
		left join _tablas..t_resoluciones tr WITH (NOLOCK) on (tr.res_ccodigo = r.rec_idResolucion) 
		left join _tablas..t_categorizacion tc WITH (NOLOCK) on (tc.cat_cCodigo = r.rec_cCategorizacion) 
		left join _Datos..p_reporte_autoridades ra WITH (NOLOCK) on r.rec_iid = ra.rep_iidrecepcion
		left join _Tablas..t_autoridades au WITH (NOLOCK) on au.aut_ccodigo  = ra.rep_cautoridad
';

-- Print 'armo todos los filtros'

declare @where NVARCHAR(max) = ' WHERE 1=1 '           
           
SET @where = @where + ' And rec_tfechahora <= DATEADD(MINUTE,1,GetDate()) '    
            
     
 IF @Cuentas != ''   AND @Cuentas != '0'   
	begin
		SET @where = @where + ' AND r.rec_iidcuenta IN (' + @Cuentas + ') ' 
		SET @whereunion = @whereunion + ' AND r.rec_iidcuenta IN (' + @Cuentas + ') ' 
	end
             
 IF @CodigosAlarmaExcluir != ''
	begin
		SET @where = @where + ' AND r.rec_calarma NOT IN (''' + replace (@CodigosAlarmaExcluir, ',', ''',''') + ''') '
		SET @whereunion = @whereunion + ' AND r.rec_calarma NOT IN (''' + replace (@CodigosAlarmaExcluir, ',', ''',''') + ''') '
	end
     
 IF @cod_cgrupo != ''
 BEGIN
    SET @where      = @where      + ' AND ta.cod_cGrupo IN (''' + REPLACE(@cod_cgrupo, ',', ''',''') + ''') '
    SET @whereunion = @whereunion + ' AND ta.cod_cGrupo IN (''' + REPLACE(@cod_cgrupo, ',', ''',''') + ''') '
 END
 
 IF @IdGrupo != 0
	SET @where = @where + ' AND gru.gru_idKey = '+CONVERT(NVARCHAR(10), @IdGrupo)
 
 IF @cod_cgrupoExcluir != ''
 BEGIN
    SET @where      = @where      + ' AND ta.cod_cGrupo NOT IN (''' + REPLACE(@cod_cgrupoExcluir, ',', ''',''') + ''') '
    SET @whereunion = @whereunion + ' AND ta.cod_cGrupo NOT IN (''' + REPLACE(@cod_cgrupoExcluir, ',', ''',''') + ''') '
 END

 IF @CodigosAlarma != ''            
	Begin
		SET @where = @where + ' AND r.rec_calarma IN (''' + replace (@CodigosAlarma, ',', ''',''') + ''') '            
		SET @whereunion = @whereunion + ' AND r.rec_calarma IN (''' + replace (@CodigosAlarma, ',', ''',''') + ''') '            
	End 

 IF @cod_nMultiMonitor != ''            
  SET @whereunion = @whereunion + ' AND ta.cod_nMultiMonitor = ''' +@cod_nMultiMonitor+''''
  
              
 IF @FechaDesde IS NOT NULL AND @FechaDesde != ''   
 begin
  SET @where = @where + ' AND r.rec_tfechahora >= '''+  @FechaDesde  +''''   
  SET @whereunion = @whereunion + ' AND r.rec_tfechahora >= '''+  @FechaDesde  +''''   
  end
            
 IF @FechaHasta IS NOT NULL AND @FechaHasta != ''               
 begin
  SET @where = @where + ' AND r.rec_tfechahora <= '''+  @FechaHasta  +''''   
  SET @whereunion = @whereunion + ' AND r.rec_tfechahora <= '''+  @FechaHasta  +''''   
  end
              
 if @Estados != ''        
 begin
  SET @where = @where + ' AND r.rec_nestado IN ( ' + @Estados + ')'   
  SET @whereunion = @whereunion + ' AND r.rec_nestado IN ( ' + @Estados + ')'   
  end
  
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
 begin
  SET @where = @where + ' AND r.rec_norigen IN ( ' + @Origenes + ')' 
  SET @whereunion = @whereunion + ' AND r.rec_norigen IN ( ' + @Origenes + ')' 
  end
   
 IF @Alertas != ''         
 begin
  SET @where = @where + ' AND ta.cod_nalerta IN ( ' + @Alertas + ')'      
  SET @whereunion = @whereunion + ' AND ta.cod_nalerta IN ( ' + @Alertas + ')'      
  end
              
 IF @Tipos != ''            
 begin
  SET @where = @where + ' AND ta.cod_ntipo IN ( ' + @Tipos + ')'     
  SET @whereunion = @whereunion + ' AND ta.cod_ntipo IN ( ' + @Tipos + ')'     
  end
      
  IF @rec_cdll != ''            
  SET @where = @where + ' AND cab.rec_cdll IN ( ' + @rec_cdll + ' ) '        
     
 IF @rec_iid_from != ''  
 begin
  SET @where = @where + ' AND (r.rec_iid >= ' + @rec_iid_from + ')'  
  SET @whereunion = @whereunion + ' AND (r.rec_iid >= ' + @rec_iid_from + ')'  
  end
      
 if @cod_nLeeSonido is not null    
 begin
	set @where=@where + ' AND ta.cod_nLeeSonido = ' + CAST(@cod_nLeeSonido AS NVARCHAR(1))   
	set @whereunion=@whereunion + ' AND ta.cod_nLeeSonido = ' + CAST(@cod_nLeeSonido AS NVARCHAR(1))  
 end
   
 IF @est_nestado != ''  
	SET @where = @where + ' AND ec.est_nestado IN ( ' + @est_nestado + ')'         
 ELSE  
	SET @where = @where + ' AND (ec.est_nestado != 2 OR r.rec_calarma = ''_SN'')'    
  
 IF @cue_clinea != '' AND @cue_clineaHasta = '' 
 begin
	SET @where = @where + ' AND c.cue_clinea = ''' + @cue_clinea + ''''     
	SET @whereunion = @whereunion + ' AND c.cue_clinea = ''' + @cue_clinea + '''' 
 end

 IF @cue_clinea != '' AND @cue_clineaHasta != '' 
 begin
	SET @where = @where + ' AND c.cue_clinea >= ''' + @cue_clinea + '''  AND c.cue_clinea <= ''' + @cue_clineaHasta + ''' '       
	SET @whereunion = @whereunion + ' AND c.cue_clinea >= ''' + @cue_clinea + '''  AND c.cue_clinea <= ''' + @cue_clineaHasta + ''' '   
 end

 IF @cue_cnombre != ''  
 begin
  SET @where = @where + ' AND c.cue_cnombre LIKE '''+'%'+ @cue_cnombre + '%'''
  SET @whereunion = @whereunion + ' AND c.cue_cnombre LIKE '''+'%'+ @cue_cnombre + '%'''
 end

 IF @cue_ncuentaDesde != ''  
 begin
  SET @where = @where + ' AND c.cue_ncuenta >= ''' + @cue_ncuentaDesde + ''''
  SET @whereunion = @whereunion + ' AND c.cue_ncuenta >= ''' + @cue_ncuentaDesde + ''''
 end

 IF @cue_ncuentaHasta != ''  
 begin
  SET @where = @where + ' AND c.cue_ncuenta <= ''' + @cue_ncuentaHasta + ''''
  SET @whereunion = @whereunion + ' AND c.cue_ncuenta <= ''' + @cue_ncuentaHasta + ''''
 end

IF @TipoCuenta != ''  
 SET @where = @where + ' AND tip.[tip_nTipo] IN (' + @TipoCuenta + ')'  

IF @TipoCuentaId != ''  
 SET @where = @where + ' AND tip.[tip_idKey] IN (' + @TipoCuentaId + ')' 

IF @CondicionCuenta != ''  
 SET @where = @where + ' AND tip.[tip_ncondicion] IN (' + @CondicionCuenta + ')'  


IF @Prioridad != ''  
begin
 SET @where = @where + ' AND LEFT( r.rec_iprioridad , 1 ) IN (' + @Prioridad + ')'  
 SET @whereunion = @whereunion + ' AND LEFT( r.rec_iprioridad , 1 ) IN (' + @Prioridad + ')'  
 end

IF @usuario != ''  
begin
 SET @where = @where + ' AND rec_iusuario = ''' + @usuario + '''' 
 SET @whereunion = @whereunion + ' AND rec_iusuario = ''' + @usuario + '''' 
 end

IF @onlyRec_iid != 0
	BEGIN
		SET @where = 'WHERE r.rec_iid = '+	CONVERT(NVARCHAR(10), @onlyRec_iid)
		SET @whereunion = 'WHERE r.rec_iid = '+	CONVERT(NVARCHAR(10), @onlyRec_iid)
	END

IF @cue_ncuenta != ''  
 SET @where = @where + ' AND LTRIM(RTRIM(c.cue_ncuenta)) = ''' + @cue_ncuenta + ''''  

IF @gps_cIMEI != ''  
 SET @where = @where + ' AND LTRIM(RTRIM(g.gps_cimei)) = ''' + @gps_cIMEI + ''''  

IF @zona != ''  
 SET @where = @where + ' AND z.zon_ccodigo = ''' + @zona + ''''  

IF @Autoridades != ''  
 SET @where = @where + ' AND aut_ccodigo = ''' + @Autoridades + '''' 

IF @UserTipo = 2
	SET @where = @where + ' AND cod_nWebCliente = 1'


-- BC 407862025: Agregado el filtro por ID Extendido y provincia
IF @idExtendidoDesde != ''  
begin
    SET @where = @where + ' AND c.cue_cIdExtendido >= ''' + @idExtendidoDesde + ''''
	SET @whereunion = @whereunion + ' AND c.cue_cIdExtendido >= ''' + @idExtendidoDesde + ''''
end
IF @idExtendidoHasta != ''  
begin
    SET @where = @where + ' AND c.cue_cIdExtendido <= ''' + @idExtendidoHasta + ''''
	SET @whereunion = @whereunion + ' AND c.cue_cIdExtendido <= ''' + @idExtendidoHasta + ''''
end
IF @provincia != ''
begin
   SET @where = @where + ' AND c.cue_cprovincia = ''' + @provincia + '''' 
   SET @whereunion = @whereunion + ' AND c.cue_cprovincia = ''' + @provincia + '''' 
end

   -- Agregado de filtro por conexiom  
 IF @iConexion != ''   AND @iConexion != '0'   
	begin
		SET @where = @where + ' AND rxi.rxt_iConexion = ' + @iConexion + ' '
	--	SET @whereunion = @whereunion + ' AND rxi.rxt_iConexion= ' + @iConexion + ' ' 
	end
            

--print '@where'+ CAST(@where AS VARCHAR(MAX))

declare @SqlFilter NVARCHAR(max);
EXEC [SqlFilterForJson] @Filter = @filter, @ObjectType = 'p_recepcion', @SqlFilter = @SqlFilter OUTPUT

--RANGOS 
--DECLARE @SqlFilterRango AS NVARCHAR(max)
--EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
--SET @SqlFilter = @SqlFilter + @SqlFilterRango
--SET @where = @where + @SqlFilter
--if @mostrarEventoAlarma=1
--	set @whereunion += ' ' + @SqlFilter

--set @whereunion = @whereunion + @SqlFilterRango

DECLARE @FilterRangos NVARCHAR(max) = N''  
DECLARE @HasData BIT = 0
DECLARE @JoinRangos NVARCHAR(MAX) = N''  

-- Crear tabla temporal
CREATE TABLE #FilteredAccounts (cue_iid INT PRIMARY KEY)

-- Ejecutar el nuevo store
EXEC [dbo].[GetSqlRangesForToken_V3] @token = @token, @HasDataOutput = @HasData OUTPUT

-- Verificar resultado
IF @HasData = 1
BEGIN
    -- Verificar si es acceso total (flag = -1)
    IF EXISTS (SELECT 1 FROM #FilteredAccounts WHERE cue_iid = -1)
    BEGIN
        -- Acceso total, no agregamos filtro
        DELETE FROM #FilteredAccounts
        SET @JoinRangos = ''
        SET @FilterRangos = ''
    END
    ELSE
    BEGIN
        -- Hay cuentas específicas, agregamos JOIN con alias 'c.'
		SET @JoinRangos = ' INNER JOIN #FilteredAccounts AS fa ON c.cue_iid = fa.cue_iid '
        SET @FilterRangos = '' -- No necesitamos nada en el WHERE
    END
END
ELSE
BEGIN
    -- Sin acceso - no agregamos JOIN pero sí filtro que bloquea todo
    SET @JoinRangos = ''
    SET @FilterRangos = ' AND 1=2 '
END


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

			--print '@item'+ CAST(@item AS VARCHAR(MAX))
			
			--Pablo 2022-08-30 Perfomance
			--if @SqlFilterRango != '' And @iYaEntre = 0
			if @FilterRangos != '' And @iYaEntre = 0
			Begin
				--	Set @joinunion += ' INNER JOIN [_Datos].[dbo].[m_cuentas] c WITH (NOLOCK) ON c.cue_iid = r.rec_iidcuenta   '

				--Set @whereunion += @SqlFilterRango
				Set @whereunion += @JoinRangos + @FilterRangos
				Set @iYaEntre = 1
			End	
			-- BC 402017122 - Se agrega variable export = 0 (default) para el nuevo export de reporte historico segun columnas de parametro
			IF @export = 0
				BEGIN
					declare @sqlparcial nvarchar(max);
					--select @sqlparcial = 'select '+@top +' '+ @rec_fields+' '''+@item+''' as tablaDatos '+' from [_Datos].[dbo].['+@item+'] r' +@joinunion+@whereunion+' order by '+@SqlSort
---------
				   set @sqlparcial = 'select '
					if @querysintop = @item
					Begin
					    --2023-05-19 Pablo. Si el @mostrar es mayor a 1000 fue x que lo selecciono desde DSS
						If @Mostrar >= 1000
							Set @sqlparcial += ' TOP ' + CAST(@Mostrar AS VARCHAR)  
						Else
						    set @sqlparcial +=' TOP 1000'
					End
					else
						set @sqlparcial += @InTop 
						
					--set @sqlparcial +=' '+@rec_fields+' '''+@item+''' as tablaDatos '+' from [_Datos].[dbo].['+@item+'] r' +@joinunion + @whereunion
					set @sqlparcial +=' '+@rec_fields+' '''+@item+''' as tablaDatos '+' from [_Datos].[dbo].['+@item+'] r' +@joinunion + @JoinRangos + @whereunion + @FilterRangos
---------

					--print '------------ SUMO SELECT AL UNION ------------'
					--print  CAST(@sqlparcial AS VARCHAR(MAX))
					--print '----------------------------------------------------'
					select @union = @union + @sqlparcial
				END
			ELSE
				BEGIN
					--select @union = @union + 'select '+@rec_fields+' from [_Datos].[dbo].['+@item+'] r' +@joinunion+@whereunion+' order by '+@SqlSort
					select @union = @union + 'select '+@rec_fields+' from [_Datos].[dbo].['+@item+'] r' +@joinunion+ @JoinRangos+@whereunion+ @FilterRangos+' order by '+@SqlSort
				END
			
			Set @union += @InSort

			Select @IndexTables = @IndexTables + 1

			SET @itemsFinalesPrueba = @itemsFinalesPrueba + @item;
			--print '@IndexTables=' + CAST(@IndexTables AS VARCHAR(MAX))
			--print '@itemsFinalesPrueba='+ CAST(@itemsFinalesPrueba AS VARCHAR(MAX))
			--print '@specialWhere'+ CAST(@specialWhere AS VARCHAR(MAX))
			

	END
	
	declare @sqlrows nvarchar(max)= ''
	select @sqlrows = @sqlrows + '  
	    ,ROW_NUMBER() OVER (ORDER BY r.rec_iid) AS RowNumber
        FROM ('+ @union +') r '

--Total Rows mejorar para usar un solo llamado
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = max(RowNumber) from ( select' + @Top+ ' r.rec_iid '+@sqlrows+') x'
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 -- SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
 -- agregue los nolock en lugar del uncommitted dedalo 5/8/2019
 -- como no hay paginacion no hace falta
 --EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT  
 

-- paginacion
set @sql = 'with CTE as ( ' +@union+')'
--set @sql += '	select r.*,' + @fields + ' from CTE r' + @join + @where + @specialWhere
set @sql += '	select r.*,' + @fields + ' from CTE r' + @join + @JoinRangos + @where + @FilterRangos + @specialWhere
	--+' ORDER BY ' +REPLACE(REPLACE(REPLACE(@SqlSort,'r.','')  ,'o.','') ,'u.','')
	+' ORDER BY ' +@SqlSort
	+' OFFSET '+convert(varchar(10),(@page - 1) * @limit)+' ROWS FETCH NEXT '+cast(@limit as NVARCHAR(6))+' ROWS ONLY'    
	
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
/*
print '-------'
--Si @SQL es muy largo (19200 chars) el print se corta, por lo cual hay que imprimirlo por lotes
DECLARE @StartIndex INT = 1
DECLARE @ChunkSize INT = 4000

WHILE @StartIndex <= LEN(@SQL)
BEGIN
    DECLARE @Chunk NVARCHAR(MAX)
    SET @Chunk = SUBSTRING(@SQL, @StartIndex, @ChunkSize)

    -- Encuentra el último espacio en blanco en el fragmento
    DECLARE @LastSpaceIndex INT = CHARINDEX(' ', REVERSE(@Chunk))

    -- Si se encuentra un espacio, ajusta el fragmento
    IF @LastSpaceIndex > 0
        SET @Chunk = SUBSTRING(@Chunk, 1, @ChunkSize - @LastSpaceIndex)

    -- Imprime el fragmento
    PRINT @Chunk

    -- Actualiza el índice de inicio para la próxima iteración
    SET @StartIndex = @StartIndex + @ChunkSize - @LastSpaceIndex
END
*/

Execute (@SQL)