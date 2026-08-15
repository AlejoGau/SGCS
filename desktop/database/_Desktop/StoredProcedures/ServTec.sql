CREATE OR ALTER PROCEDURE [dbo].[ServTec]
 @timelineincluded INT = 0,-- DEDALO 15/5/2023 dejo en default 0 porque timeline sino duplica en los llamados de la app
 @page INT = 1,               
 @start varchar(128) = '0',
 @end varchar(128) = '0',
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',
 @token VARCHAR(128),            
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT,
 @addContactoPhone INT = 0
AS  
 SET NOCOUNT ON   
 --Load Security
 DECLARE @UserId INT
 SELECT @UserId = dbo.GetUserIdByToken(@token)

 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')      
	
 --Sort 
 --DSS-458 En caso de ordenar por cue_clinea ordena tambien por cue_ncuenta
 if(@sort like '%cue_clinea%')
		begin
			DECLARE @sortAux VARCHAR(256) =  REPLACE(@sort, ']', '');
			SET @sort = @sortAux
			SET @sortAux = REPLACE(@sortAux, '[', '');
			SET @sortAux = REPLACE(@sortAux, 'cue_clinea', 'cue_ncuenta');
			set @sort = @sort+','+@sortAux+']'
		end

 DECLARE @SqlSort AS VARCHAR(max)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'stc_iid_cuenta ASC')

 if(@SqlSort like '%stc_mobservaciones%') --[stc_mobservaciones] ASC
 Begin
	SET @SqlSort = REPLACE(@SqlSort, '[stc_mobservaciones]', 'Cast([stc_mobservaciones] As Varchar(max))');
 End

 --Filters
 DECLARE @SqlFilter AS VARCHAR(max)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = '
			FROM _Datos.dbo.m_st_cabecera cab
				left join _sistema..UsersDesktopWeb uw ON stc_ioperador = udw_idKey
				left JOIN _Tablas.dbo.t_tiposervicio ts ON stc_ctipo_servicio= tip_ccodigo
				inner join _datos..m_cuentas c on (c.cue_iid =  stc_iid_cuenta)'
if @timelineincluded = 1  --comento timeLine para que no devuelva Ids duplicados FJalil 25/04/2023
BEGIN
	SET @Sql += 'INNER JOIN _Datos.dbo.SerTecTimeLine as ST on (ST.stl_iServicio = cab.stc_inumero)'
END

SET @Sql += '	left join _tablas..t_instaladores t1 on (t1.ins_ccodigo = cab.stc_ctecnico_1)
				left join [_Tablas]..t_provincias p on (p.pro_ccodigo = c.cue_cprovincia)
				left join _Sistema..s_operadores o on (o.ope_iid = cab.stc_ioperador)
				left join _tablas..t_lineas l on (l.lin_ccodigo = c.cue_clinea)
				--left join _tablas..t_instaladores t2 on (t2.ins_ccodigo = cab.stc_ctecnico_2)
				--left join _tablas..t_instaladores t3 on (t3.ins_ccodigo = cab.stc_ctecnico_3)
				--left join _tablas..t_instaladores t4 on (t4.ins_ccodigo = cab.stc_ctecnico_4)
				--left join _tablas..t_instaladores t5 on (t5.ins_ccodigo = cab.stc_ctecnico_5)
				--left join _tablas..t_movilesPatrulla m1 on ( m1.tmp_cnumero = cab.stc_cmovil_1)
				--left join _tablas..t_movilesPatrulla m2 on ( m2.tmp_cnumero = cab.stc_cmovil_2)
				OUTER APPLY (
					-- DEDALO 28/02/2020 Solo trae 1 panel por cuenta para la lista porque se duplican
					SELECT TOP 1 * FROM [_Datos]..[m_paneles] pan WHERE pan.pan_iidcuenta = c.cue_iid ORDER BY 1 DESC
				) AS mp
				OUTER APPLY (
					-- DEDALO 31/05/2023 agrego primer visita para cambiar la fecha del reporte, pedido por PABLO CAS
					SELECT TOP 1 svi_tsalidahaciacliente FROM [_Datos]..[sertecvisitas] WHERE svi_iservicio = cab.stc_iid ORDER BY svi_tsalidahaciacliente DESC
				) AS stv
				left join [_Tablas]..t_paneles tp on mp.pan_ccodigo = tp.pan_ccodigo
			WHERE 1 = 1 AND [stc_dfecha_creacion] <= getdate() ' + @SqlFilter	


--print @timelineincluded		
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

			SET @Sql = @Sql + ' AND  stc_ctecnico_1='''+@tecnico+''''
		end
	end
 END           	
 

DECLARE @queryContactoPhone varchar (MAX)
SET @queryContactoPhone= ', '''' as contactoPhone ';
IF @addContactoPhone = 1
	BEGIN
		SET @queryContactoPhone = ', (SELECT TOP 1 tel_ctelefono FROM _datos..m_telefonos where tel_cnombre = stc_ccontacto and tel_iidcuenta = c.cue_iid) as contactoPhone ';
	END

  --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT 

 -- Agregado Sept 20 de SELECT *, CASE y JOIN de T_PARAMETROS por JUAN BONFORTI a pedido del BASECAMP 327411742
-- Devuelve 2 columnas mas con el calculo del par_iValor y la fecha del Servicio Tecnico
-- Indica si tiene vigencia la garantia o no.
DECLARE @MESESGARANTIA varchar(2)
SELECT @MESESGARANTIA = convert(varchar(2),par_ivalor) FROM [_Tablas].[dbo].[t_parametros] where par_ccodigo = 'MESESGARANTIA'

if (@MESESGARANTIA = '' or @MESESGARANTIA is null)
	set @MESESGARANTIA='0' 

DECLARE @singarantia AS VARCHAR (1024) ='';
DECLARE @congarantia AS VARCHAR (1024)='';
EXECUTE _desktop..[LocalizationGetLocale] @Name = N'''CON GARANTIA''', @translation = @congarantia OUTPUT, @solooutput = 1;
EXECUTE _desktop..[LocalizationGetLocale] @Name = N'''SIN GARANTIA''', @translation = @singarantia OUTPUT, @solooutput = 1;

DECLARE @garantia varchar (MAX)=''
SELECT @garantia = ', (CASE 
						WHEN DATEADD(mm,'+ @MESESGARANTIA +', cue_dservicio) < GETDATE() THEN ' + @singarantia + '
					ELSE ' + @congarantia + ' END ) as garantia,
					
					FORMAT( DATEADD(mm,'+ @MESESGARANTIA +',cue_dservicio), ''d/M/yyyy h:mm:ss tt'')
					
					
					 as fechaGarantia'


 --Execute Sql (ReturnRows)

 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX) =''  
 SET @DynamicSqlReturnRows = 'SELECT *
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber									
									, cab.stc_iid as Id
									, [stc_iid]
									  ,[stc_iid_cuenta]
									  ,[stc_inumero]
									  ,[stc_ctipo_servicio]
									  ,[stc_mobservaciones]
									  --,stc_dfecha_desde_1
									  ,stv.svi_tsalidahaciacliente as [stc_dfecha_desde_1]
									  ,cab.stc_dfecha_hasta_1
									  ,[stc_dfecha_desde_2]
									  ,[stc_dfecha_hasta_2]
									  ,[stc_dfecha_desde_3]
									  ,[stc_dfecha_hasta_3]
									  ,[stc_dfecha_cierre]
									  ,[stc_ccontacto]
									  ,[stc_nestado]
									  ,[stc_ctecnico_1]
									  ,[stc_ctecnico_2]
									  ,[stc_ctecnico_3]
									  ,[stc_ctecnico_4]
									  ,[stc_ctecnico_5]
									  ,[stc_yValor]
									  ,[stc_nreclamo_1]
									  ,[stc_creclamo_1]
									  ,[stc_nreclamo_2]
									  ,[stc_creclamo_2]
									  ,[stc_nreclamo_3]
									  ,[stc_creclamo_3]
									  ,[stc_nreclamo_4]
									  ,[stc_creclamo_4]
									  ,[stc_nreclamo_5]
									  ,[stc_creclamo_5]
									  ,[stc_cmovil_1]
									  ,[stc_cmovil_2]
									  ,stc_dfecha_modificacion
									  --,FORMAT( stc_dfecha_modificacion, ''d/M/yyyy h:mm:ss tt'') stc_dfecha_modificacion
									  ,[stc_ioperador]
									  ,[stc_minsumos]
									  ,[stc_dintecnico_1]
									  ,[stc_doutecnico_1]
									  ,[stc_dintecnico_2]
									  ,[stc_doutecnico_2]
									  ,[stc_dintecnico_3]
									  ,[stc_doutecnico_3]
									  ,[stc_cdeposito]
									  ,[stf_dfecha_vto_orden]
									  ,[stc_dsalida_al_cliente_DSS]
									  ,[stc_darribo_al_cliente_DSS]
									  ,[stc_dsalida_desde_cliente_DSS]
									  ,[stc_iforma_viaje_DSS]
									  ,[stc_cconformidad_html]
									  ,[stc_idOrigenOrden]
									  ,[stc_iusuarioDss]
									  ,[stc_iPrioridad]
									  ,[stc_dfecha_creacion]
									  ,stc_ncostomanodeobra
									  ,stc_dfechapago
									  --Comento para que no devuelva Ids duplicados 25/04/2023 
									  --,ST.stl_cObservacion
									  --,ST.stl_cAccion
									  ,stc_nvalorpagotecnico
									  --,FORMAT( stc_dfecha_creacion, ''d/M/yyyy h:mm:ss tt'') stc_dfecha_creacion
									, ts.*
                                    , DATEDIFF ( day , stc_dfecha_creacion, stc_dfecha_modificacion ) as tiempoTranscurrido
									, c.*
									, t1.ins_cnombre stc_ctecnico_1_cnombre
									, t1.ins_cnombre ins_cnombre
									, t1.ins_cnombre [t1.ins_cnombre]
									--, t2.ins_cnombre stc_ctecnico_2_cnombre
									--, t3.ins_cnombre stc_ctecnico_3_cnombre
									--, t4.ins_cnombre stc_ctecnico_4_cnombre
									--, t5.ins_cnombre stc_ctecnico_5_cnombre
									, p.*
									, o.*
									, l.*
									--, m2.tmp_cnombre movil_2_nombre
									--, m1.tmp_cnombre movil_1_nombre
									, tp.*
									,uw.*
									'+ @garantia +'
									'+ @queryContactoPhone + '
									, nombreMadre = ( Select Top 1 Isnull(cue_cnombre,'''') From _datos.dbo.m_cuentas CM Where CM.cue_iid=c.cue_nparticion )
									' + @Sql + ' ) AS T

							  WHERE RowNumber BETWEEN @from AND @to '


/*
print '-------------------'
print CAST(@DynamicSqlReturnRows	 AS NTEXT)
*/
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit
  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to