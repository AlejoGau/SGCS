CREATE OR ALTER PROCEDURE [dbo].[EventosPendientesSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 1000,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(MAX) = '',        
 @_dc VARCHAR(256) = '', 
 @completo VARCHAR(10) = '', 
 @excluirOrganizacionUsuarioActual VARCHAR(10) = 'false',
 @disabledOrganization varchar(10) = 'false',
 @token VARCHAR(128) = '',      
 @filterTotal int = 0,        
 @totalrows INT = 1 OUTPUT   
AS
BEGIN
  SET NOCOUNT ON   

 --Paramentro
 DECLARE @MONITOREODEALER INT = 0;
 SELECT @MONITOREODEALER = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'MONITOREODEALER'
 --Usuario
 DECLARE @OrganizacionCurrentUser INT = 0
 DECLARE @TipoCurrentUser INT = 0;
 IF @MONITOREODEALER = 1 
	BEGIN
	 DECLARE @UserId INT
	 SELECT @UserId = dbo.GetUserIdByToken(@token)
	 SELECT @OrganizacionCurrentUser = udw_empresa, @TipoCurrentUser = udw_tipo FROM _Sistema..UsersDesktopWeb WHERE udw_idKey = @UserId
	END
  
 --Sort
 DECLARE @SqlSort AS VARCHAR(max)
 set @sort = REPLACE ( @sort , 'cue_cnombre' , 'cue.cue_cnombre' )  

 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[evp_idKey] DESC')
 select @SqlSort = REPLACE(@SqlSort,'[cod_cdescripcion]','cod.[cod_cdescripcion]')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(max)
 --Print 'GetSqlFilterForJsonWithIgnore'
 SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'EventosPendientes','[operadorAtendiendoCuentaININT],[rec_iprioridadININT],[operadorAtendiendoCuentaNULL],[operadorAtendiendoCuentaNULLyPropio],operadorAtendiendoCuentaNULLyPropio,[pro_nProcesoNOTININT],[soloTareas]')

--print '---';dan
--print @SqlFilter
--print '---';
 --RANGOS 
 DECLARE @SqlFilterRango AS VARCHAR(max)
 EXEC getSqlRangesForToken @table = 'eventospendientes', @token = @token, @alias = 'cue.', @SqlFilterRango = @SqlFilterRango OUTPUT

 /*
print '---';
print @SqlFilterRango
print '---';
*/

 --FILTRO PARA ORGANIZACION
DECLARE @SqlFilterOrganizaciones AS VARCHAR(MAX) = '';
DECLARE @isFiltroPorOrganizacion VARCHAR(10) = 'false'
IF @disabledOrganization = 'false'
	BEGIN
		 IF @MONITOREODEALER = 1 AND @TipoCurrentUser != 0 AND @excluirOrganizacionUsuarioActual != 'true'
			BEGIN	 
			 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion = '+CONVERT(VARCHAR(50),@OrganizacionCurrentUser)+' AND _idOrganizacion != 0 '
			 SET @isFiltroPorOrganizacion = 'true'
			END
		ELSE IF @MONITOREODEALER = 1 AND @TipoCurrentUser != 0 AND @excluirOrganizacionUsuarioActual = 'true'
			BEGIN
			 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion != '+CONVERT(VARCHAR(50),@OrganizacionCurrentUser)+' AND _idOrganizacion != 0 '		
			 SET @isFiltroPorOrganizacion = 'true'
			END
		ELSE IF @MONITOREODEALER = 1 AND @TipoCurrentUser = 0 AND @excluirOrganizacionUsuarioActual != 'true'
			BEGIN
			 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion = 0 '	
			 SET @isFiltroPorOrganizacion = 'true'
			END
		ELSE IF @MONITOREODEALER = 1 AND @TipoCurrentUser = 0 AND @excluirOrganizacionUsuarioActual = 'true'
			BEGIN
			 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion != 0 '	
			 SET @isFiltroPorOrganizacion = 'true'	
			END
		
		/*IF @MONITOREODEALER = 1
			SET @isFiltroPorOrganizacion = 'true'*/
 END 

SET @SqlFilter = @SqlFilter + @SqlFilterRango + @SqlFilterOrganizaciones

IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	DECLARE @FilterProperty VARCHAR(32)
	DECLARE @FilterValue VARCHAR(64)
	DECLARE @Index INT
	declare @hastipo int = 0
	SET @Index = 1

	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN	
		--Los blanqueo x que si alguna no obtiene valor se queda con el anterior
		Set @FilterProperty = ''
		Set @FilterValue = ''
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		--PRINT 'FilterProperty - ' + @filterproperty
		--PRINT 'FilterValue - ' + @FilterValue

		IF @filterproperty != '' And  @FilterValue != ''
		Begin
			--Set Filters
			IF @FilterProperty = 'operadorAtendiendoCuentaININT'
				begin
					set @SqlFilter = @SqlFilter + ' 
					 AND (operadorAtendiendoCuenta IN ('+@FilterValue+') or operadorAtendiendoCuenta is null)'
				end
			ELSE IF @FilterProperty = 'rec_iprioridadININT'
				begin
					set @SqlFilter = @SqlFilter + ' AND LEFT(rec_iprioridad, 1) IN ('+@FilterValue+') '
				end
			ELSE IF @FilterProperty ='operadorAtendiendoCuentaNULL'
				begin
					set @SqlFilter = @SqlFilter + ' AND ([operadorAtendiendoCuenta] = 0 or [operadorAtendiendoCuenta] is null)'
				end
			ELSE IF @FilterProperty ='operadorAtendiendoCuentaNULLyPropio'
				begin
					set @SqlFilter = @SqlFilter + ' AND ([operadorAtendiendoCuenta] = 0 or [operadorAtendiendoCuenta] is null or [operadorAtendiendoCuenta] = '+@FilterValue+')'
				end
			ELSE IF @FilterProperty ='operadorAtendiendoCuentaNULLyPro'
				begin
					set @SqlFilter = @SqlFilter + ' AND ([operadorAtendiendoCuenta] = 0 or [operadorAtendiendoCuenta] is null or [operadorAtendiendoCuenta] = '+@FilterValue+')'
				end
			ELSE IF @FilterProperty ='pro_nProcesoNOTININT'
				begin
					set @SqlFilter = @SqlFilter + ' AND isnull(pro_nProceso, 0) NOT IN ('+@FilterValue+') '
				end
			ELSE IF @FilterProperty ='soloTareas'
				begin
					set @SqlFilter = @SqlFilter + ' AND cod.cod_ntipo=7 '
					set @hastipo = 1
				end
		End
		--Next
		SET @Index = @Index + 1
	END

	if @hastipo = 0
	BEGIN
		set @SqlFilter = @SqlFilter + ' AND cod.cod_ntipo!=7 '
	END

	DROP TABLE #Filters
END    

 
--print  @SqlSort
 --Sql
 DECLARE @Sql NVARCHAR(MAX);
 DECLARE @Joins NVARCHAR(MAX);
 SET @Joins = '';

 IF @completo = 'false' 
	BEGIN
		SET @Sql = '
			evp_idKey Id, 
			rec_iid	rec_iid	,
			rec_iidcuenta rec_iidcuenta,
			rec_czona rec_czona,
			rec_nOrigen	rec_norigen	,
			rec_iPuerto	rec_ipuerto	,
			case 
				when clinkvideo = '''' then rec_cContenido
				ELSE ''[VIDEO]''+rec_cContenido
			end as rec_ccontenido,
			rec_cObservaciones	rec_cobservaciones	,
			LEFT(rec_iPrioridad,1)	rec_iprioridad1	,
			rec_iprioridad	,
			rec_isoFechaHora	rec_isofechahora	,
			rec_calarma rec_calarma,
			cod.cod_ncolor cod_ncolor,
			cod.cod_ncolorletra cod_ncolorletra,
			cod.cod_cdescripcion cod_cdescripcion,
			rec_nestado rec_nestado,
			cue.cue_ccalle cue_ccalle,
			o._Origen	_origen	,			
			_idOrganizacion,
			o.cue_clinea	cue_clinea	,
			o.cue_ncuenta	cue_ncuenta	,
			cue.cue_cNombre	cue_cnombre	,
			o.cue_cLatLng cue_clatlng,	
			o.cue_cclave cue_cclave,
			cue.cue_cLocalidad	cue_clocalidad	,
			o.cue_cpermiso cue_cpermiso,
			o.cue_nParticion	cue_nparticion	,
			o.cue_ctelefono cue_ctelefono,
			gps_rLatitud	gps_rlatitud	,
			gps_rLongitud	gps_rlongitud	,	
			madre_cLinea	madre_clinea	,
			madre_nCuenta	madre_ncuenta	,
			madre_cNombre	madre_cnombre	,			
			o.zon_cDescripcion	zon_cdescripcion	,
			usu_cNombre	usu_cnombre	,		
			cod.cod_nprioridad cod_nprioridad,
			op.ope_cNombre	ope_cnombre	,
			rxi.rxt_nSPIP as rxt_nSPIP,
			rxi.rxt_nSPSMS as rxt_nSPSMS,
			rec_iidCuenta cue_iid,
			o.cod_cSonido	cod_csonido	,
			rec_cDescripcion	rec_cdescripcion,
			xl.rxl_cLineCard rxl_clinecard
			,_Puerto	_puerto
			,o.pro_nProceso
			,am.amv_estado
			,am.amv_idkey
			,am.amv_objecttypeid
			,sta_dfechautimaalarma
			,sta_nestado
			,cods.cod_cDescripcion	sta_cod_cdescripcion	
			,cods.cod_nColor	sta_cod_ncolor
			,cods.cod_nColorLetra	sta_cod_ncolorletra
			,cods.cod_nTipo	sta_cod_ntipo
			,cods.cod_nLeeSonido	sta_cod_nleesonido
			,cods.cod_cSonido	sta_cod_csonido	
			,cods.cod_cCodigo	sta_cod_ccodigo
			,cod.cod_iTemplate
			,org.Name as organizacionName
		
            ,est_nestado
			,_ZonaParticion
			, rec_isoFechaRecepcion	rec_isofecharecepcion
			, '''+@isFiltroPorOrganizacion+''' as isFiltroPorOrganizacion
			-- Pedro Monesterolo - 06-02-2023 - Modificado por tarea DS-491
			--,	CASE 
			--	WHEN zon_cdescripcion != N'''' 
			--		THEN N''(''+rtrim(zon_ccodigo)+N'') ''+zon_cdescripcion
			--	when CAST(rxi.rxt_cRoute AS nvarchar(max)) != '''' and rec_calarma not in (''_DV'',''_DM'')
			--		then convert(nvarchar(200),rxi.rxt_cRoute)
			--	when CAST(rxi.rxt_cGeoFenceName AS nvarchar(max)) != N''''
			--		then convert(nvarchar(200),rxi.rxt_cGeoFenceName)
			--	else
			--		convert(nvarchar(200),N''(''+rtrim(zon_ccodigo)+N'')'')
			--END as _zon_cdescripcion
			,CASE
			When cod.cod_nResuelve In(1,2) Then N''''
            WHEN ( RTRIM(LTRIM(rec_czona)) != '''' AND RTRIM(LTRIM(rec_czona)) != ''0'') 
				THEN N''('' + RTRIM(LTRIM(rec_czona)) + N'') '' + ISNULL(zon_cdescripcion,'''')
            WHEN ( zon_cdescripcion != N''''  OR zon_ccodigo != N'''' )
				THEN zon_cdescripcion
            When CAST(rxt_cRoute AS NVARCHAR(max)) != N''''
				Then rxt_cRoute
            When CAST(rxt_cGeoFenceName AS NVARCHAR(max)) != N''''
				Then rxt_cGeoFenceName
			When cod.cod_nResuelve In(0,3) And xl.rxl_cEvento != '''' 
				Then ( Select IsNull(MZ.zon_cdescripcion,'''')
						From _Datos.dbo.m_zonas MZ WITH (NOLOCK) Where xl.rxl_cEvento=MZ.zon_cCodigo And zon_iidcuenta=cue.cue_iid
					 )
            else N''''
			END as _zon_cdescripcion
			
			-- Pedro Monesterolo - 06-02-2023 - Modificado por tarea DS-491
			-- ''(''+CONVERT(VARCHAR, rec_iusuario, 126)+'') ''+usu_cnombre as _usu_cnombre
			, CASE
				When cod.cod_nResuelve In(0,2) Then N''''
				else ''(''+CONVERT(VARCHAR, rec_iusuario, 126)+'') ''+usu_cnombre 
			end as _usu_cnombre

			, isnull(op.operadorAtendiendoCuenta,0) as operadorAtendiendoCuenta
			,convert(
				datetime,
				SWITCHOFFSET (
					TODATETIMEOFFSET (
						rec_tfechahora,
						DATENAME(TZoffset, SYSDATETIMEOFFSET())
					),
					IsNull(ttz.ttz_nOffSet, 0) * 60
				)
			) as _tfechahoraOffset
			--, cod.cod_nalerta as cod_nalerta';

		SET @Joins = '	
			LEFT JOIN _datos..p_RXtraInfo rxi WITH (NOLOCK) ON (rxi.rxt_irecid = rec_iid)
			LEFT JOIN _datos..m_cuentas cue WITH (NOLOCK) ON (cue.cue_iid = rec_iidcuenta)
			LEFT JOIN _Tablas..t_codigos_alarma cod WITH (NOLOCK) ON (cod.cod_ccodigo = o.rec_cAlarma)

--se saco el join de zona https://basecamp.com/2249105/projects/14758726/todos/340940679
	-- LEFT JOIN [_Datos].[dbo].[m_zonas] z WITH (NOLOCK) ON z.zon_iidcuenta = o.rec_iidcuenta AND z.zon_ccodigo = o.rec_czona   -- agrego por problema con arabe

			LEFT JOIN _datos..Organization org WITH (NOLOCK) ON _idOrganizacion = org.Id
			LEFT JOIN _Tablas..t_TimeZone ttz WITH (NOLOCK) ON (cue_iZonaHoraria = ttz_idKey)
			LEFT JOIN _Datos..m_estado_cuenta_cab cab WITH (NOLOCK) ON (cab.est_iidcuenta = rec_iidcuenta)
			LEFT JOIN _Datos..p_RXLog xl WITH (NOLOCK) ON xl.rxl_iRecId = rec_iid
			LEFT JOIN _Datos..m_asignacion_movil am WITH (NOLOCK) ON rec_iid = amv_rec_iid and amv_estado != 2
			LEFT JOIN _Datos..m_status sta WITH (NOLOCK) ON sta.sta_iidcuenta = cue.cue_iid 
			LEFT JOIN _Tablas..t_codigos_alarma cods WITH (NOLOCK) ON (cods.cod_ccodigo = sta.sta_cultimaalarma) 
			outer apply(
				SELECT TOP 1 
					REPLACE(rec_ioperador,'''',0) as operadorAtendiendoCuenta
					,subre.ope_cNombre
					FROM _datos..EventosPendientes subre WITH (NOLOCK)
					WHERE subre.rec_iidcuenta = o.rec_iidcuenta 
								AND subre.rec_nestado in (1,2,4,9)
								AND subre.rec_ioperador != 0
								and subre.rec_ioperador is not null
			) as op
		';
		
	END
ELSE
	BEGIN
	SET @Sql = '
			evp_idKey Id, 
			rec_iid	rec_iid	,
			rec_iidCuenta	rec_iidcuenta	,
			rec_cAlarma	rec_calarma	,
			rec_cZona	rec_czona	,
			rec_iUsuario	rec_iusuario	,
			rec_nEstado	rec_nestado	,
			rec_nOrigen	rec_norigen	,
			rec_cContenido	rec_ccontenido	,
			rec_tFechaHora	rec_tfechahora	,
			rec_tFechaRecepcion	rec_tfecharecepcion	,
			rec_tFechaProceso	rec_tfechaproceso	,
			rec_iOperador	rec_ioperador	,
			rec_cObservaciones	rec_cobservaciones	,
			rec_cTerminal	rec_cterminal	,
			rec_idResolucion	rec_idresolucion	,
			rec_idReceptor	rec_idreceptor	,
			rec_cCategorizacion	rec_ccategorizacion	,
			rec_iNYR	rec_inyr	,
			rec_iTE	rec_ite	,
			rec_idMap	rec_idmap	,
			rec_idFwd	rec_idfwd	,
			rec_iMinutosEspera	rec_iminutosespera	,
			rec_iPuerto	rec_ipuerto	,
			rec_idLoc	rec_idloc	,
			LEFT(rec_iPrioridad,1)	rec_iprioridad1	,
			rec_iprioridad	,
			rec_isoFechaHora	rec_isofechahora	,
			rec_isoFechaProceso	rec_isofechaproceso	,
			rec_isoFechaRecepcion	rec_isofecharecepcion	,
			o._Origen	_origen	,
			_Puerto	_puerto	,
			tsp_cDescripcion	tsp_cdescripcion	,
			tsp_cPathIcon	tsp_cpathicon	,
			o.rxl_cLog	rxl_clog	,
			o.rxl_cEvento	rxl_cevento	,
			cLinkVideo	clinkvideo	,
			cvl_cLinkDSS	cvl_clinkdss	,
			o.cue_clinea	cue_clinea	,
			o.cue_ncuenta	cue_ncuenta	,
			o.cue_cNombre	cue_cnombre	,
			cue.cue_cCalle	cue_ccalle	,
			cue.cue_cLocalidad	cue_clocalidad	,
			o.cue_cProvincia	cue_cprovincia	,
			o.cue_cClave	cue_cclave	,
			o.cue_cPermiso	cue_cpermiso	,
			o.cue_nParticion	cue_nparticion	,
			o.cue_ctelefono	cue_ctelefono	,
			cue.cue_cUbicacion	cue_cubicacion	,
			o.cue_cLatLng cue_clatlng,
			cue.cue_ccallecorreo cue_ccallecorreo,
			cue.cue_clocalidadcorreo cue_clocalidadcorreo,
			cue.cue_cprovinciacorreo cue_cprovinciacorreo,
			cue.cue_ccodigopostalcorreo cue_ccodigopostalcorreo,
			cue.cue_cfoto cue_cfoto,	
			cue.cue_nllaveul cue_nllaveul,
			cue.cue_nsonidoul cue_nsonidoul,
			cue.cue_nmostrar cue_nmostrar,
			cue.cue_cIMEI,
			rec_iidCuenta cue_iid,
			madre_cLinea	madre_clinea	,
			madre_nCuenta	madre_ncuenta	,
			madre_cNombre	madre_cnombre	,
			cRemoteHostIP	cremotehostip	,
			zon_cDescripcion	zon_cdescripcion	,
			zon_cImagen	zon_cimagen	,
			zon_cAlarmaAGenerar	zon_calarmaagenerar	,
			zon_cCodigo	zon_ccodigo	,
			zon_cCodigoRestauracion	zon_ccodigorestauracion	,
			zon_cDealer	zon_cdealer	,
			zon_cCuenta	zon_ccuenta	,
			zon_cListaEmergencia	zon_clistaemergencia	,
			zon_CodigoAlarma	zon_codigoalarma	,
			zon_mObservacion	zon_mobservacion	,
			zon_nAutoProcesa	zon_nautoprocesa	,
			zon_nMinutosRestauracion	zon_nminutosrestauracion	,
			zon_nMostrar	zon_nmostrar	,
			_ZonaParticion,
			-- muestra el telefono al lado del usuario pedido por dany para SP
			case
				WHEN spuser.tel_cnombre !=''''
				THEN
					o.usu_cNombre	+ '' (''+spuser.tel_ctelefono+'')''	
				ELSE
					o.usu_cNombre		
			END as usu_cnombre
			,
			u.usu_cimagen,
			_Morosidad	_morosidad	,
			_NotaTemporal	_notatemporal	,
			_SituacionCuenta	_situacioncuenta	,
			_EventoEnPruebaPorZona	_eventoenpruebaporzona	,
			_WorkFlowStatus	_workflowstatus	,
			_idOrganizacion	_idorganizacion	,
			o.cod_cDescripcion	cod_cdescripcion	,
			o.cod_nColor	cod_ncolor	,
			o.cod_nColorLetra	cod_ncolorletra	,
			o.cod_nTipo	cod_ntipo	,
			o.cod_nLeeSonido	cod_nleesonido	,
			o.cod_cSonido	cod_csonido	,
			cod.cod_nprioridad cod_nprioridad,
			cod.cod_cinstrucciones_DSS,
			op.ope_cNombre	ope_cnombre	,
			ope_cLogin	ope_clogin	,
			rec_cDescripcion	rec_cdescripcion	,
			rec_cDll	rec_cdll	,
			rec_nTcpIp	rec_ntcpip	,
			rxi_cImg	rxi_cimg	,
			rxi_cCarpeta	rxi_ccarpeta	,
			rxi_nEstado	rxi_nestado	,
			rxi_cTipo	rxi_ctipo	,
			rxi_cConfig	rxi_cconfig	,
						cxi.cue_ccustom,
			res_cCodigo	res_ccodigo	,
			res_cDescripcion	res_cdescripcion	,
			res_nFalsaAlarma	res_nfalsaalarma	,
			res_nEstado	res_nestado	,
			cat_cCodigo	cat_ccodigo	,
			cat_cDescripcion	cat_cdescripcion	,
			gps_rLatitud	gps_rlatitud	,
			gps_rLongitud	gps_rlongitud	,
			o.sta_nContadorFA	sta_ncontadorfa	,
			sta_nestado,
			est_nestado,

			org.Name as organizacionName,
			(Case When est_nEstado=1 And GetDate() BetWeen est_dfechadesde And est_dfechahasta Then ''Prueba''  
                       When est_nEstado=2 Then ''No Habilitado''  
                       When est_nEstado=3 Then ''Prueba x Zonas''
											 When est_nEstado=4 Then ''Eliminar''
                               Else ''Habilitado'' End ) As situacion_cuenta,
			fal_nMargen	fal_nmargen	,
			o.tip_ncondicion	tip_ncondicion	,
			sp_rLatitud	sp_rlatitud	,
			sp_rLongitud	sp_rlongitud
			-- Pedro Monesterolo - 06-02-2023 - Modificado por tarea DS-491
			--,	CASE 
			--	WHEN zon_cdescripcion != N'''' 
			--		THEN N''(''+rtrim(zon_ccodigo)+N'') ''+zon_cdescripcion
			--	when CAST(rxi.rxt_cRoute AS nvarchar(max)) != '''' and rec_calarma not in (''_DV'',''_DM'')
			--		then convert(nvarchar(200),rxi.rxt_cRoute)
			--	when CAST(rxi.rxt_cGeoFenceName AS nvarchar(max)) != N''''
			--		then convert(nvarchar(200),rxi.rxt_cGeoFenceName)
			--	else
			--		convert(nvarchar(200),N''(''+rtrim(zon_ccodigo)+N'')'')
			--END as _zon_cdescripcion
			,CASE
			When cod.cod_nResuelve In(1,2) Then N''''
            WHEN ( RTRIM(LTRIM(rec_czona)) != '''' AND RTRIM(LTRIM(rec_czona)) != ''0'') 
				THEN N''('' + RTRIM(LTRIM(rec_czona)) + N'') '' + ISNULL(zon_cdescripcion,'''')
            WHEN ( zon_cdescripcion != N''''  OR zon_ccodigo != N'''' )
				THEN zon_cdescripcion
            When CAST(rxt_cRoute AS NVARCHAR(max)) != N''''
				Then rxt_cRoute
            When CAST(rxt_cGeoFenceName AS NVARCHAR(max)) != N''''
				Then rxt_cGeoFenceName
			When cod.cod_nResuelve In(0,3) And xl.rxl_cEvento != '''' 
				Then ( Select IsNull(MZ.zon_cdescripcion,'''')
						From _Datos.dbo.m_zonas MZ WITH (NOLOCK) Where xl.rxl_cEvento=MZ.zon_cCodigo And zon_iidcuenta=cue.cue_iid
					 )
            else N''''
			END as _zon_cdescripcion
			
			-- Pedro Monesterolo - 06-02-2023 - Modificado por tarea DS-491
			-- ''(''+CONVERT(VARCHAR, rec_iusuario, 126)+'') ''+usu_cnombre as _usu_cnombre
			, CASE
				When cod.cod_nResuelve In(0,2) Then N''''
				else ''(''+CONVERT(VARCHAR, rec_iusuario, 126)+'') ''+ o.usu_cnombre 
			end as _usu_cnombre

			,rxi.*
			,o.tip_nTipo as tip_ntipo
			, isnull(op.operadorAtendiendoCuenta,0) as operadorAtendiendoCuenta
			--, cod.cod_nalerta as cod_nalerta 
			,sertec.stc_iid as stc_iid
			,moroso.cli_nsituacion as cli_nsituacion
			,moroso.cli_icodigo_ID as cli_icodigo_id
			,nota.*
			,cue.*
			,lin_crazonsocial
			,lin_cimagen
			,o.pro_nProceso
			,am.amv_estado
			,am.amv_idkey
			,am.amv_objecttypeid
			,sta_dfechautimaalarma
			,cods.cod_cDescripcion	sta_cod_cdescripcion	
			,cods.cod_nColor	sta_cod_ncolor
			,cods.cod_nColorLetra	sta_cod_ncolorletra
			,cods.cod_nTipo	sta_cod_ntipo
			,cods.cod_nLeeSonido	sta_cod_nleesonido
			,cods.cod_cSonido	sta_cod_csonido	
			,cods.cod_cCodigo	sta_cod_ccodigo
			,cod.cod_iTemplate
			, '''+@isFiltroPorOrganizacion+''' as isFiltroPorOrganizacion
			,ttz.*
			,nvs.nvs_nNivel
			,convert(
				datetime,
				SWITCHOFFSET (
					TODATETIMEOFFSET (
						rec_tfechahora,
						DATENAME(TZoffset, SYSDATETIMEOFFSET())
					),
					IsNull(ttz.ttz_nOffSet, 0) * 60
				)
			) as _tfechahoraOffset
			,spuser.tel_ctelefono As SPTelefono
			';
				
		SET @Joins = '	
			LEFT JOIN _datos..p_RXtraInfo rxi WITH (NOLOCK) ON (rxi.rxt_irecid = rec_iid) 
			LEFT JOIN _datos..m_cuentasxtrainfo cxi WITH (NOLOCK) ON (cxi.cue_iidcuenta = rec_iidcuenta)
			LEFT JOIN _datos..m_cuentas cue WITH (NOLOCK) ON (cue.cue_iid = rec_iidcuenta) 
			LEFT JOIN _Tablas..t_codigos_alarma cod WITH (NOLOCK) ON (cod.cod_ccodigo = o.rec_cAlarma) 
			LEFT JOIN _Datos..m_estado_cuenta_cab cab WITH (NOLOCK) ON (cab.est_iidcuenta = rec_iidcuenta)
			LEFT JOIN [_Datos].[dbo].[m_usuarios] u WITH (NOLOCK) ON u.usu_iidcuenta = o.rec_iidcuenta AND u.usu_iid = o.rec_iusuario and o.rec_iusuario>0    
--se saco el join de zona https://basecamp.com/2249105/projects/14758726/todos/340940679
--LEFT JOIN [_Datos].[dbo].[m_zonas] z WITH (NOLOCK) ON z.zon_iidcuenta = o.rec_iidcuenta AND z.zon_ccodigo = o.rec_czona   -- agrego por problema con arabe



			LEFT JOIN _datos..Organization org WITH (NOLOCK) ON _idOrganizacion = org.Id
			LEFT JOIN _Tablas..t_TimeZone ttz WITH (NOLOCK) ON (cue_iZonaHoraria = ttz_idKey)
			LEFT JOIN _Datos..m_status sta WITH (NOLOCK) ON sta.sta_iidcuenta = cue.cue_iid 
			LEFT JOIN _Tablas..t_codigos_alarma cods WITH (NOLOCK) ON (cods.cod_ccodigo = sta.sta_cultimaalarma) 
			LEFT JOIN _Datos..p_RXLog xl WITH (NOLOCK) ON xl.rxl_iRecId = rec_iid 
			left join _tablas..t_lineas lin WITH (NOLOCK) on lin_ccodigo = cue.cue_clinea
			LEFT JOIN _Datos..m_asignacion_movil am WITH (NOLOCK) ON rec_iid = amv_rec_iid
			outer apply(
				SELECT TOP 1 
					REPLACE(rec_ioperador,'''',0) as operadorAtendiendoCuenta
					,subre.ope_cNombre
					FROM _datos..EventosPendientes subre  WITH (NOLOCK)
					WHERE subre.rec_iidcuenta = o.rec_iidcuenta 
								AND subre.rec_nestado in (1,2,4,9)
								AND rec_ioperador != 0
			) as op		
			OUTER APPLY (
				SELECT TOP 1  * FROM _Datos.dbo.m_st_cabecera  st  WITH (NOLOCK)
					WHERE st.stc_iid_cuenta = o.rec_iidcuenta AND st.stc_nestado = 1
			) as sertec
			OUTER APPLY (
				Select Top 1 * FROM _Datos..m_clientes_fc WITH (NOLOCK)
				Inner Join _Datos..m_relacion_cliente_cuentas_fc WITH (NOLOCK)
				On cli_icodigo_ID = rel_icliente
				Where cli_nsituacion = 2 And 
					( ( rel_icuenta= o.rec_iidcuenta  ) Or
						( rel_icuenta=-1 ) )
			) as moroso
			OUTER APPLY (
				SELECT TOP 1 * FROM _datos..m_notas n WITH (NOLOCK)
					WHERE n.not_iidcuenta = o.rec_iidcuenta
			) as nota
			OUTER APPLY (
				SELECT TOP 1 * FROM _datos..m_telefonos t WITH (NOLOCK)
					WHERE t.tel_iidcuenta = o.rec_iidcuenta
					and t.tel_iid = rec_iusuario-700
					and (rxi.rxt_nSPIP = 1 or rxi.rxt_nSPSMS = 1)
			) as spuser

			OUTER APPLY (
				SELECT TOP 1 * FROM [_Datos]..[p_nivelsenal] nvs WHERE nvs.nvs_idCuenta = cue.cue_iid ORDER BY nvs_tfechahora DESC
			) AS nvs
			
		';
	END

 select @Sql = ' SELECT TOP '+CONVERT(varchar(10), @limit)+' '+ @Sql + '
FROM _datos..EventosPendientes o		
			'+ @Joins +'
				
				WHERE 1 = 1 
						And rec_tfechahora <= DATEADD(MINUTE,1,GetDate()) 
						AND rec_nestado != 8 
						AND (cab.est_nestado != 2 OR rec_calarma = ''_SN'')
						' + @SqlFilter +' ORDER BY '+@SqlSort +';'


DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 

if @filterTotal = 1
	BEGIN

--print '@SqlFilter'
--print @SqlFilter;
		SET @DynamicSqlTotalRows = 'select @TotalRows = count (1) FROM _datos..EventosPendientes o		
			'+ @Joins +'
				WHERE 1 = 1 
						And rec_tfechahora <= DATEADD(MINUTE,1,GetDate()) 
						AND rec_nestado != 8 
						AND (cab.est_nestado != 2 OR rec_calarma = ''_SN'') ' + @SqlFilter
	END
	else
	BEGIN
		SET @DynamicSqlTotalRows = 'select @TotalRows = count (1) FROM _datos..EventosPendientes o		
			LEFT JOIN _Datos..m_estado_cuenta_cab cab WITH (NOLOCK) ON (cab.est_iidcuenta = rec_iidcuenta)
			LEFT JOIN _datos..m_cuentas cue WITH (NOLOCK) ON (cue.cue_iid = rec_iidcuenta) 
				WHERE 1 = 1 
						And rec_tfechahora <= DATEADD(MINUTE,1,GetDate()) 
						AND rec_nestado = 0
						AND isnull(pro_nProceso, 0) != 40 --esto se invento solo para supervisores
						AND (cab.est_nestado != 2 OR rec_calarma = ''_SN'') '+@SqlFilterRango --15/12/2025 Daniel O. Medina anulación de filtro

			IF @SqlFilterOrganizaciones != ''
				BEGIN
					SET @DynamicSqlTotalRows =  @DynamicSqlTotalRows + @SqlFilterOrganizaciones
				END
	END

set @DynamicSqlTotalRows = @DynamicSqlTotalRows + ';'

SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'

--print '@DynamicSqlTotalRowsParams: '
--print @DynamicSqlTotalRowsParams

--print '@DynamicSqlTotalRows: '
--print CAST(@DynamicSqlTotalRows AS NTEXT)

EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT 

/*EXEC ()*/

--select @Sql
 --SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;


PRINT '------------------'
PRINT CAST(@Sql AS NTEXT)

EXECUTE (@Sql)

END