CREATE OR ALTER PROCEDURE [dbo].[EventosPendientesContabilizaSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 1000,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '', 
 @completo VARCHAR(10) = '', 
 @token VARCHAR(128) = '',  
 @excluirOrganizacionUsuarioActual VARCHAR(10) = 'false',          
 @totalrows INT = 1 --OUTPUT   
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
		--print 'Filtro organizacion activado'
	 DECLARE @UserId INT
	 SELECT @UserId = dbo.GetUserIdByToken(@token)
	 SELECT @OrganizacionCurrentUser = udw_empresa, @TipoCurrentUser = udw_tipo FROM _Sistema..UsersDesktopWeb WHERE udw_idKey = @UserId
		--print @OrganizacionCurrentUser
	END

 
 --Sort
 DECLARE @SqlSort AS VARCHAR(max)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'count(rec_calarma) DESC ')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(max)
  SELECT @SqlFilter = dbo.GetSqlFilterForJsonWithIgnore(@filter, 'EventosPendientes','[operadorAtendiendoCuentaININT],[rec_iprioridadININT],[operadorAtendiendoCuentaNULL],[operadorAtendiendoCuentaNULLyPropio],operadorAtendiendoCuentaNULLyPropio,[pro_nProcesoNOTININT],[soloTareas]')

 --RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max)

EXEC getSqlRangesForToken @table = 'eventospendientes', @token = @token, @alias = 'cue.', @SqlFilterRango = @SqlFilterRango OUTPUT


 --FILTRO PARA ORGANIZACION
 DECLARE @SqlFilterOrganizaciones AS VARCHAR(MAX) = '';
 IF @MONITOREODEALER = 1 AND @TipoCurrentUser != 0 AND @excluirOrganizacionUsuarioActual != 'true'
	BEGIN	 
	 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion = '+CONVERT(VARCHAR(50),@OrganizacionCurrentUser)+' AND _idOrganizacion != 0 '
	END
ELSE IF @MONITOREODEALER = 1 AND @TipoCurrentUser != 0 AND @excluirOrganizacionUsuarioActual = 'true'
	BEGIN
	 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion != '+CONVERT(VARCHAR(50),@OrganizacionCurrentUser)+' AND _idOrganizacion != 0 '		
	END
ELSE IF @MONITOREODEALER = 1 AND @TipoCurrentUser = 0 AND @excluirOrganizacionUsuarioActual != 'true'
	BEGIN
	 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion = 0 '		
	END
ELSE IF @MONITOREODEALER = 1 AND @TipoCurrentUser = 0 AND @excluirOrganizacionUsuarioActual = 'true'
	BEGIN
	 SET @SqlFilterOrganizaciones = ' AND _idOrganizacion != 0 '		
	END
 



SET @SqlFilter = @SqlFilter + @SqlFilterRango + @SqlFilterOrganizaciones




IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty VARCHAR(32)
	DECLARE @FilterValue VARCHAR(64)
	Declare @hastipo int = 0
	DECLARE @Index INT
	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		--PRINT 'FilterProperty - ' + @filterproperty

		--Set Filters
		IF @FilterProperty = 'operadorAtendiendoCuentaININT'
			begin
				set @SqlFilter = @SqlFilter + ' 
				 AND (operadorAtendiendoCuenta IN ('+@FilterValue+') or operadorAtendiendoCuenta is null)
				/*AND isnull((
				SELECT TOP 1 count(rec_ioperador)
					FROM _datos..EventosPendientes subre
					WHERE subre.rec_iidcuenta = o.rec_iidcuenta 
								AND rec_ioperador != 0
								AND subre.rec_nestado in (1,9)
			) ,0 ) IN ('+@FilterValue+')*/'
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
		--Next
		SET @Index = @Index + 1
	END

	if @hastipo = 0
	BEGIN
		set @SqlFilter = @SqlFilter + ' AND cod.cod_ntipo!=7 '
	END
	
	DROP TABLE #Filters
END    

--print '@SqlFilter'
--print @SqlFilter
 
--print  @SqlSort
 --Sql
 DECLARE @Sql NVARCHAR(MAX);
 DECLARE @Joins NVARCHAR(MAX);
 SET @Joins = '';

 
	SET @Sql = 'SELECT 
				rec_calarma,
				o.cod_cdescripcion,
				count(rec_calarma) as cantidad,
				o.cod_ncolorletra, 
				o.cod_ncolor
			';

		SET @Joins = '	
			LEFT JOIN _datos..p_RXtraInfo rxi WITH (NOLOCK) ON (rxi.rxt_irecid = rec_iid) 
			LEFT JOIN _datos..m_cuentas cue WITH (NOLOCK) ON (cue.cue_iid = rec_iidcuenta) 
			LEFT JOIN _Tablas..t_codigos_alarma cod WITH (NOLOCK) ON (cod.cod_ccodigo = o.rec_cAlarma) 
			LEFT JOIN _Datos..m_estado_cuenta_cab cab WITH (NOLOCK) ON (cab.est_iidcuenta = rec_iidcuenta)
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
			
			
		';
	

 select @Sql = @Sql + '
			FROM _datos..EventosPendientes o
			
			'+ @Joins +'
				WHERE 1 = 1 
						And rec_tfechahora <= DATEADD(MINUTE,1,GetDate()) 
						AND rec_nestado != 8 
						AND (cab.est_nestado != 2 OR rec_calarma = ''_SN'')
						' + @SqlFilter +' 

						GROUP BY rec_calarma, o.cod_cdescripcion, o.cod_ncolorletra, o.cod_ncolor
					ORDER BY '+@SqlSort +'

						
						;'


 
 --SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
/*
Print '---------'
PRINT CAST(@Sql AS NTEXT)
*/ 
EXECUTE (@Sql)

END