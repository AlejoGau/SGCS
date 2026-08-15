CREATE OR ALTER PROCEDURE [dbo].[m_asignacion_movilSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 DECLARE @SqlSort AS VARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'o.[amv_idkey] DESC')
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'm_asignacion_movil')
 
 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = 'FROM [_datos]..[m_asignacion_movil] o
			left join _datos..p_recepcion p WITH (NOLOCK) on o.amv_rec_iid = p.rec_iid
			left join _tablas..t_codigos_alarma c WITH (NOLOCK) on p.rec_calarma = c.cod_ccodigo
			left join _datos..m_cuentas cue WITH (NOLOCK) on p.rec_iidcuenta = cue.cue_iid
			LEFT JOIN [_Datos].[dbo].[m_zonas] z WITH (NOLOCK) ON z.zon_iidcuenta = p.rec_iidcuenta AND LTRIM(RTRIM(z.zon_ccodigo)) = LTRIM(RTRIM(p.rec_czona))   
			left join _datos..smarttrack s WITH (NOLOCK) on o.amv_objectid = s.id
			left join _tablas..t_tipos tip WITH (NOLOCK) on cue.cue_ctipo = tip.tip_ccodigo
			left join _datos..p_posicionesgps gps with (nolock) on p.rec_iid = gps.gps_idrec
			left join _datos..m_usuarios u WITH (NOLOCK) ON u.usu_iidcuenta = cue.cue_iid and p.rec_iusuario = u.usu_icodigo
			left join _datos..DispositivoMovil dis WITH (NOLOCK) on dis.OwnerID = cue.cue_iid  
            left join _sistema..s_operadores ope WITH (NOLOCK) on p.rec_ioperador = ope.ope_iid
			WHERE 1 = 1 ' + @SqlFilter
 

 --Total Rows
 DECLARE @DynamicSqlTotalRows NVARCHAR(MAX) 
 DECLARE @DynamicSqlTotalRowsParams NVARCHAR(MAX) 
 SET @DynamicSqlTotalRows = ' SELECT @TotalRows = COUNT(*) ' + @Sql
 SET @DynamicSqlTotalRowsParams = '@TotalRows INT OUTPUT'
	 	 
 EXECUTE sp_executesql @DynamicSqlTotalRows, @DynamicSqlTotalRowsParams, @totalrows OUTPUT   

 --Execute Sql (ReturnRows)
 DECLARE @DynamicSqlReturnRows NVARCHAR(MAX)   
 SET @DynamicSqlReturnRows = 'SELECT * 
							   FROM ( SELECT ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber, amv_idkey Id, o.*, p.*,z.*,[gps_iid]
      ,[gps_tfechahora]
      ,[gps_idCuenta]
      ,[gps_idRec]
      ,[gps_rLatitud]
      ,[gps_rLongitud]
      ,[gps_iRumbo]
      ,[gps_tRawfechahora]
      ,[gps_iVelocidad]
      ,[gps_iOdometro]
      ,[gps_cDireccion]
      ,[gps_cIMEI]
      ,[gps_rAccuracy]
      ,[gps_cMethod]
      ,[gps_iBattery]
      ,[gps_iNivelSenial]
      ,[gps_iSatelites]
      ,[gps_iExtBattery],ope.ope_clogin, c.cod_cdescripcion, s.Nombre, s.Imei,cue.cue_cnombre,cue.cue_clinea,cue.cue_ncuenta,cue.cue_ccalle,cue_cubicacion,cue.cue_clocalidad,cue.cue_ctelefono,cue.cue_clatlng,cue.cue_nsonidoul,cue.cue_cfoto,u.usu_icodigo,u.usu_cnombre,u.usu_cimagen,dis.Photo,dis.domain,tip.tip_cdescripcion,s.pushToken ' + @Sql + ' ) AS T
							  WHERE RowNumber BETWEEN @from AND @to '
							  
 DECLARE @DynamicSqlReturnRowsParams NVARCHAR(MAX)          							  
 SET @DynamicSqlReturnRowsParams = '@from INT, @to INT'							  			  	 
			  	 
 DECLARE @from INT
 DECLARE @to INT
 SELECT @from = (@page - 1) * @limit + 1, @to = @page * @limit

  print @DynamicSqlReturnRows
  			  	 
 EXECUTE sp_executesql @DynamicSqlReturnRows, @DynamicSqlReturnRowsParams, @from = @from, @to = @to