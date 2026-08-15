CREATE OR ALTER PROCEDURE [dbo].[ReporteAutoridades_Search]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort VARCHAR(64) = '',            
	@filter VARCHAR(2048) = '',        
	@token VARCHAR(128) = '',     
	@_dc VARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT
AS
	SET NOCOUNT ON
	SET DATEFORMAT mdy
	print 'start'
	--Load Security
	DECLARE @UserId INT
	SELECT @UserId = dbo.GetUserIdByToken(@token)	
    print @token
	print 'after getuseridbytoken'
	DECLARE @HasReporteAutoridadesModule INT
	SELECT @HasReporteAutoridadesModule = dbo.UserDesktopWebHasModule(@UserId, 'WebReporteAut')
--SELECT @HasReporteAutoridadesModule = dbo.UserDesktopWebHasModule(@UserId, 'Web Reporte Autoridades')

	print 'after userdesktopwebhasmodule ' + convert(varchar, @UserId)
	--select dbo.UserDesktopWebHasModule(10, 'WebReporteAut')
	--select * from _Sistema..UsersDesktopWeb
	
	--Impersonate Security
	DECLARE @SecurityData VARCHAR(MAX)
	SELECT @SecurityData = ums_data FROM _Sistema.dbo.UsersDesktopWebModulosSecurity WHERE ums_idWeb = @UserId AND ums_idModules = 15
	PRINT 'SecurityData=[' + ISNULL(@SecurityData,'<<NULL>>') + ']';
	print 'after UsersDesktopWebModulosSecurity'
	print 'Mauro'
	
	print 'count ' + convert(varchar, len(@SecurityData))
	if(@SecurityData is null)
		print 'null value'
	print 'end print'
	--Filter by User
	DECLARE @AutoridadId VARCHAR(15)
	DECLARE @AutoridadDealer VARCHAR(4)
	SELECT @AutoridadId = StringValue FROM dbo.parseJSON(@SecurityData) WHERE NAME = 'Autoridad'		
	print 'after dbo.parseJSON(@SecurityData'
	SELECT @AutoridadDealer = aut_cdealer FROM _Tablas.dbo.t_autoridades WHERE aut_ccodigo = @AutoridadId
	print 'after user'
	--Order          
	DECLARE @SortField VARCHAR(64)           
	DECLARE @SortDirection VARCHAR(4)          
	SELECT @SortField = 'rep_dfechahora', @SortDirection = 'ASC'
	       
	IF @sort != ''          
	BEGIN          
		SELECT @SortField = StringValue from dbo.parseJson(@sort) WHERE NAME = 'property' ORDER BY element_ID DESC          
		SELECT @SortDirection = StringValue from dbo.parseJson(@sort) WHERE NAME = 'direction' ORDER BY element_ID DESC          
	END 

		
		--Temp          
	CREATE TABLE #Temp (RowNumber INT, Id INT PRIMARY KEY)                
	   
	DECLARE @Sql VARCHAR(MAX)          
	SET @Sql = 'INSERT INTO #Temp (RowNumber, Id)          
	SELECT ROW_NUMBER() OVER (ORDER BY ' + @SortField + ' ' + @SortDirection + ') AS RowNumber, rep_iid           
	  FROM _Datos.dbo.p_reporte_autoridades r
		   INNER JOIN _Datos.dbo.m_cuentas c ON c.cue_iid = r.rep_iidcuenta
	 WHERE 1=1 '
	 
	 print 'before filter'
		DECLARE @FechaExist INT
		SET @FechaExist = 0
	--Filters
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
			
			--Set Filters
			IF @FilterProperty = 'fechadesde'
				BEGIN
					SET @Sql = @Sql + ' AND r.rep_dfechahora >= convert(varchar, convert(datetime, ''' + @FilterValue + ''', 112), 21)'
					SET @FechaExist = 1
				END
 			ELSE IF @FilterProperty = 'fechahasta'
				SET @Sql = @Sql + ' AND r.rep_dfechahora <= convert(varchar, dateadd(d, 1, convert(datetime, ''' + @FilterValue + ''', 112)), 21)'
			ELSE IF @FilterProperty = 'estado' AND @FilterValue = 'pendientes'				
				SET @Sql = @Sql + ' AND r.rep_nestado != 1 '
			ELSE
				SET @Sql = @Sql + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''     
			
			--Next
			SET @Index = @Index + 1
		END
		

		DROP TABLE #Filters
	END   	 
	 print 'after filter'

	DECLARE @TiempoDisponible VARCHAR(3)
	
	SET @TiempoDisponible = '12'
	SELECT @TiempoDisponible = StringValue FROM dbo.parseJSON(@SecurityData) WHERE NAME = 'tiempodisponible'
	
	IF @FechaExist != 1			
		BEGIN
			DECLARE @fechadesde VARCHAR(30) = CAST(DATEADD(MONTH, CAST(@TiempoDisponible AS INT)*-1, GETDATE()) AS VARCHAR)
			DECLARE @fechahasta VARCHAR(30) = CAST(DATEADD(HOUR, 1,GETDATE()) AS VARCHAR)
			SET @Sql = @Sql + ' AND r.rep_dfechahora >= convert(datetime, ''' +@fechadesde + ''', 112)'	
			SET @Sql = @Sql + ' AND r.rep_dfechahora <= convert(datetime, ''' +@fechahasta + ''', 112)'
		END

	print @Sql
print @AutoridadId
	 --Filters By User	 
	SET @Sql = @Sql + ' AND r.rep_cautoridad = ''' + @AutoridadId + ''''

	--SET @Sql = @Sql + ' AND c.cue_clinea = ''' + @AutoridadDealer + ''''

	print 'before select ---'
	print @Sql
	EXEC(@Sql)
	print 'after select'
	
	--Cantidad de registros              
	SELECT @totalrows = MAX(RowNumber) FROM #Temp 	 
	
	--Return Data
	DECLARE @Now DATETIME
	SET @Now = GETDATE() 
	
	SELECT 
	c.cue_iid
	, recepcion.rec_iid
	, LEFT(recepcion.rec_iprioridad,1)	rec_iprioridad
	,r.rep_iidrecepcion
	,r.rep_iid, r.rep_calarma, r.rep_cautoridad, r.rep_czona
	, r.rep_dfechahora, r.rep_dresolfechahora, r.rep_iidcuenta
	, rep_nestado
	,rep_icategorizacion
	,rep_iresolucion
	, c.cue_clinea, cue_ncuenta, c.cue_cnombre
	, c.cue_ccalle, c.cue_clocalidad, c.cue_cprovincia, c.cue_ctelefono
	, c.cue_cubicacion, c.cue_cobservacion, a.cod_cdescripcion
	, DATEDIFF(MI, r.rep_dfechahora, ISNULL(REPLACE(r.rep_dresolfechahora,'1/1/1900', null), @Now)) AS demora
	, d.lin_crazonsocial, d.lin_ctelfono, p.pro_cdescripcion
	, a.cod_cSonido
	, a.cod_nColorLetra
	, a.cod_ncolor, 
		   rep_denviofechahora,
			recepcion.rec_iusuario, usuario.usu_cnombre,
			xtra.rxt_nSPIP, xtra.rxt_nSPSMS,
		   REPLACE(CONVERT(VARCHAR, r.rep_dfechahora, 126),'1900-01-01T00:00:00', '') AS rep_isofechahora,
		   REPLACE(CONVERT(VARCHAR, r.rep_dresolfechahora, 126),'1900-01-01T00:00:00', '') AS rep_isoresolfechahora,
		   REPLACE(CONVERT(VARCHAR, r.rep_dEnvioFechaHora, 126),'1900-01-01T00:00:00', '') AS rep_isoenviofechahora,
		   DATEDIFF(MI, r.rep_dEnvioFechaHora, ISNULL(REPLACE(r.rep_dresolfechahora,'1/1/1900', null), @Now)) AS demoraenvio,
		   c.cue_cLatLng,
		   c.cue_ctipo,
		   tipo.tip_cdescripcion,
		   tr.res_cdescripcion,
		   tc.cat_cdescripcion
	  FROM _Datos.dbo.p_reporte_autoridades r
		   INNER JOIN _Datos.dbo.m_cuentas c ON c.cue_iid = r.rep_iidcuenta
		   INNER JOIN _Tablas.dbo.t_codigos_alarma a ON a.cod_ccodigo = r.rep_calarma
		   LEFT JOIN _Tablas.dbo.t_lineas d ON d.lin_ccodigo = cue_clinea
		   LEFT JOIN _Tablas.dbo.t_provincias p ON p.pro_ccodigo = c.cue_cprovincia
		   left join _Tablas.dbo.t_tipos tipo on (tipo.tip_ccodigo = c.cue_ctipo)
		   left join _tablas..t_resoluciones tr WITH (NOLOCK) on (tr.res_idkey = r.rep_iresolucion) 
		   left join _tablas..t_categorizacion tc WITH (NOLOCK) on (tc.cat_idkey = r.rep_icategorizacion) 
		   INNER JOIN #Temp t ON t.Id = r.rep_iid
			 LEFT JOIN _Datos.dbo.p_recepcion recepcion ON recepcion.rec_iid = r.rep_iidrecepcion
			 LEFT JOIN _Datos.dbo.m_usuarios usuario ON (usuario.usu_iid = recepcion.rec_iusuario and usu_iidcuenta = r.rep_iidcuenta)
			 LEFT JOIN _Datos.dbo.p_RXtraInfo xtra ON xtra.rxt_iRecId = recepcion.rec_iid
 WHERE t.RowNumber BETWEEN (@page - 1) * @limit + 1 AND (@page * @limit)                     
ORDER BY t.RowNumber ASC      		     	 
print 'end'