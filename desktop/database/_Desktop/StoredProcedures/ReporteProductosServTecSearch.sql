CREATE OR ALTER PROCEDURE [dbo].[ReporteProductosServTecSearch]
@page INT = 1,               
 @start varchar(128) = '0',
 @end varchar(128) = '0',
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',
 @token VARCHAR(128),            
 @_dc VARCHAR(256) = ''--,              
-- @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')      
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'stc_iid_cuenta ASC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')




--select * from _tablas..t_lineas 
 --select * from _datos..m_cuentas
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = '
				SELECT 
					pro.Name,
					sum(spr_iCantidad) as cantidad

				FROM _Datos.dbo.m_st_cabecera cab
					left join _sistema..UsersDesktopWeb uw ON stc_ioperador = udw_idKey
				  left JOIN _Tablas.dbo.t_tiposervicio ts ON stc_ctipo_servicio=tip_ccodigo  
				  left join _datos..m_cuentas c on (c.cue_iid =  stc_iid_cuenta)
				  left join _tablas..t_instaladores t1 on (t1.ins_ccodigo = cab.stc_ctecnico_1)				 
				  left join [_Tablas]..t_provincias p on (p.pro_ccodigo = c.cue_cprovincia)
				  left join _Sistema..s_operadores o on (o.ope_iid = cab.stc_ioperador)
				  left join _tablas..t_lineas l on (l.lin_ccodigo = c.cue_clinea)					
					left join [_Datos]..m_paneles mp on stc_iid_cuenta = mp.pan_iidcuenta
					left join [_Tablas]..t_paneles tp on mp.pan_ccodigo = tp.pan_ccodigo

					left join [_Datos]..SerTecProductosOrden proo on stc_iid = proo.spr_iServicio
					INNER JOIN _Datos..[Product] pro  ON proo.spr_iProducto = pro.Id


			WHERE 1 = 1 ' + @SqlFilter 
			
--select * from _Datos.dbo.m_st_cabecera

IF @HasAdministratorModule = 0
 BEGIN
	--Load Ranges by User
	CREATE TABLE #Ranges (id INT IDENTITY(1,1), dealer varchar(3), desde varchar(4), hasta varchar(4))
	
	INSERT INTO #Ranges (dealer, desde, hasta)
	SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
	  FROM _Sistema.dbo.UsersDesktopWebModulos um
	       --INNER JOIN _Sistema.dbo.UsersDesktopModules m ON m.udm_idKey = um.dwm_idModules
	 WHERE um.dwm_idWeb = @UserId
	 
	 --Each
	 SET @Sql = @Sql + ' AND ( 1=2 '
	 
	 DECLARE @Pos INT
	 SET @Pos = 1
	 WHILE( (SELECT COUNT(*) FROM #Ranges WHERE id = @Pos) != 0)
	 BEGIN
		DECLARE @DealerLinea VARCHAR(3)
		DECLARE @DealerDesde VARCHAR(4)
		DECLARE @DealerHasta VARCHAR(4)
		
		SELECT @DealerLinea = dealer, @DealerDesde = ISNULL(desde, ''), @DealerHasta = ISNULL(hasta,'') FROM #Ranges WHERE id = @Pos		
			
		IF @DealerDesde = '' OR @DealerHasta = ''	
			SET @Sql = @Sql + ' OR (c.cue_clinea = ''' + @DealerLinea + ''' ) '		
		ELSE
			SET @Sql = @Sql + ' OR (c.cue_clinea = ''' + @DealerLinea + ''' AND c.cue_ncuenta BETWEEN ''' + @DealerDesde + ''' AND ''' + @DealerHasta + ''') '		
		
		SET @Pos = @Pos + 1
	 END
	 
	 SET @Sql = @Sql + ' )'


	 -- filtro por el tecnico
	declare @udw_usuario varchar(128)
	select @udw_usuario = userid from _desktop..Token where AccessToken = @token
	if(@udw_usuario is null or @udw_usuario = '')
	begin
		select 2 Error, 'No se puede obtener el usuario del token' Message
		return;	
	end

	declare @ums_idWeb int = 0
	select @ums_idWeb = udw_idKey from _sistema..UsersDesktopWeb where udw_usuario = @udw_usuario
	if(@ums_idWeb is null or @ums_idWeb = 0)
	begin
		select 3 Error, 'No se puede obtener el id del usuario' Message
		return;	
	end

	declare @ums_data varchar(max)
	select @ums_data = ums_data from _sistema..UsersDesktopWebModulosSecurity s
		where ums_idModules = 3 --multimonitorweb
		and s.ums_idWeb = @ums_idWeb
	if(@ums_data is not null or @ums_data != '')
	begin
		declare @tecnico char(3)
		SELECT top 1 @tecnico= StringValue FROM _desktop.dbo.parseJSON(@ums_data) WHERE NAME IN ('Instalador')	

		declare @superisor char(5)
		SELECT top 1 @superisor= StringValue FROM _desktop.dbo.parseJSON(@ums_data) WHERE NAME IN ('Supervisor')	

		if((@tecnico is not null AND @tecnico != '') AND @superisor != 'true')
		begin

			SET @Sql = @Sql + ' AND  stc_ctecnico_1='+@tecnico
		end
	end
	
 END       


SET @Sql = @Sql+ '
				GROUP BY pro.Name
				ORDER BY pro.Name ASC
			'	    	
 print @Sql;


exec(@Sql)