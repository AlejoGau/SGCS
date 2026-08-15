CREATE OR ALTER PROCEDURE [dbo].[EventosPendientesProcesarPorLotesSearch]
           
 @filter VARCHAR(2048) = '',   
-- @rec_iidPadre int = null,
	@rec_iidPadre int = 0,
	@rec_iMinutosEspera int = null,
	@rec_cObservaciones NVARCHAR(max)='',
	@rec_idResolucion NVARCHAR(3),
	@rec_cCategorizacion NVARCHAR(3),
	@rec_iidArray NVARCHAR(max) = NULL,
	@paso INT = NULL,
  @excluirOrganizacionUsuarioActual VARCHAR(10) = 'false',
	@token NVARCHAR(256)
AS
BEGIN
  SET NOCOUNT ON   

	--Paramentro
 Declare @hastipo int = 0
 DECLARE @MONITOREODEALER INT = 0;
 SELECT @MONITOREODEALER = par_ivalor FROM _Tablas..t_parametros WHERE par_ccodigo = 'MONITOREODEALER'
 --Usuario
 DECLARE @OrganizacionCurrentUser INT = 0
 DECLARE @TipoCurrentUser INT = 0;
--print @MONITOREODEALER
 IF @MONITOREODEALER = 1 
	BEGIN
		print 'Filtro organizacion activado'
	 DECLARE @UserId INT
	 SELECT @UserId = dbo.GetUserIdByToken(@token)
	 SELECT @OrganizacionCurrentUser = udw_empresa, @TipoCurrentUser = udw_tipo FROM _Sistema..UsersDesktopWeb WHERE udw_idKey = @UserId
	END
 
 --Sort
 /*DECLARE @SqlSort AS VARCHAR(max)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[evp_idKey] DESC')*/
 
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

Print 'SqlFilter antes de parsear filtros: '+@SqlFilter
Print '***************************************************'
IF @filter != ''          
 BEGIN        
	SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
	
	DECLARE @FilterProperty VARCHAR(32)
	DECLARE @FilterValue VARCHAR(64)
	DECLARE @Index INT

	SET @Index = 1
	WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
		SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
		--PRINT 'FilterProperty - ' + @filterproperty
		print '@FilterProperty: '+@FilterProperty
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
		ELSE IF @FilterProperty ='soloTareas' --Daniel O. Medina 19/08/2025. Agrego esto porque viene un parámetro con este nombre desde Tareas VC
			begin

				set @SqlFilter = @SqlFilter + ' AND cod.cod_ntipo=7 '
				set @hastipo = 1
			end
		--Next
		SET @Index = @Index + 1
	END
	Print 'SqlFilter despus de solotareas: '+@SqlFilter

	if @hastipo = 0 --Daniel O. Medina 19/08/2025. Agrego esto porque viene un parámetro con este nombre desde Tareas VC
	BEGIN
		set @SqlFilter = @SqlFilter + ' AND cod.cod_ntipo!=7 '
	END

	DROP TABLE #Filters
END    

--print @SqlFilter
 
--print  @SqlSort
 --Sql
 DECLARE @Sql NVARCHAR(MAX);
 DECLARE @Joins NVARCHAR(MAX);
 SET @Joins = '';
	SET @Sql = '';
	SET @Joins = '	

		LEFT JOIN _datos..m_cuentas cue WITH (NOLOCK) ON (cue.cue_iid = rec_iidcuenta) 

		LEFT JOIN _Datos..m_estado_cuenta_cab cab WITH (NOLOCK) ON (cab.est_iidcuenta = rec_iidcuenta)

		LEFT JOIN _Tablas..t_codigos_alarma cod WITH (NOLOCK) ON (rec_calarma = cod.cod_ccodigo)

		outer apply(
			SELECT TOP 1 
				REPLACE(rec_ioperador,'''',0) as operadorAtendiendoCuenta
				,subre.ope_cNombre
				FROM _datos..EventosPendientes subre  WITH (NOLOCK)
				WHERE subre.rec_iidcuenta = o.rec_iidcuenta 
							AND subre.rec_nestado in (1,2,4,9)
							AND rec_ioperador != 0
		) as op	
	';
	
	--creo tabla temporal
	CREATE TABLE #Temp (rownum int primary key identity(1,1), rec_iid int)
	declare @rec_iid int = 0
	declare @rowcount int = 0
	declare @rowcurrent int = 0

 select @Sql = @Sql + '
	insert into #Temp (rec_iid)
	select o.rec_iid 
	FROM _datos..EventosPendientes o
	'+ @Joins +'
		WHERE 1 = 1 
				And rec_tfechahora <= DATEADD(MINUTE,1,GetDate()) 
				AND rec_nestado != 8 
				AND (cab.est_nestado != 2 OR rec_calarma = ''_SN'')
				' + @SqlFilter +' 
				;'

--Print '------------'
print @sql
EXECUTE (@Sql)

 select * from #Temp
		print 'se procesan todos los registros (que fueron seleccionados)'
		IF @paso = 1
		BEGIN
		if (@rec_iidArray !='')
			BEGIN 
			exec ('insert into #Temp (rec_iid) select r.rec_iid from _datos..eventospendientes r where r.rec_iid in('+@rec_iidArray+') ') --and rec_nestado IN (9) -- esto lo modifique el dia 2/1/2017 por problemas con los eventos en espera y en proceso
			END
		select @rowcount = COUNT(*) from #Temp
			while(@rowcurrent < @rowcount)
			begin
				set @rowcurrent = @rowcurrent + 1
				select @rec_iid = rec_iid from #Temp where rownum = @rowcurrent
				print 'llamo a SearchAtencionEventoProcesar'
				exec SearchAtencionEventoProcesar 
					@rec_iidPadre = @rec_iidPadre,
					@rec_iid = @rec_iid,
					@rec_cObservaciones = @rec_cobservaciones,
					@rec_idResolucion = @rec_idResolucion,
					@rec_cCategorizacion = @rec_cCategorizacion,
					@token = @token,
					@nProceso = 33 --se fuerza  para que despues muestre procesar todos
			end
		END

		-- espera
		IF @paso = 3
		BEGIN
			if (@rec_iidArray !='')
			BEGIN 
			exec ('insert into #Temp (rec_iid) select r.rec_iid from _datos..eventospendientes r where r.rec_iid in('+@rec_iidArray+') ') --and rec_nestado IN (9) -- esto lo modifique el dia 2/1/2017 por problemas con los eventos en espera y en proceso
			END
			print @paso;
			select @rowcount = COUNT(*) from #Temp

			while(@rowcurrent < @rowcount)
			begin
				set @rowcurrent = @rowcurrent + 1
				select @rec_iid = rec_iid from #Temp where rownum = @rowcurrent

				print 'espera';

				exec SearchAtencionEventoEspera @rec_iid,@rec_iMinutosEspera, @rec_cObservaciones, @rec_idResolucion, @rec_cCategorizacion, @token 
				select 0 Error, 'OK' Message
			end
		END
END