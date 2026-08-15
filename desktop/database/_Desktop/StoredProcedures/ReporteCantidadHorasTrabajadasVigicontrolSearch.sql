CREATE OR ALTER PROCEDURE [dbo].[ReporteCantidadHorasTrabajadasVigicontrolSearch]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 1000,               
	@sort VARCHAR(256) = '',   
	@group VARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '',  
	@token VARCHAR(128) = '',

	@vigilador VARCHAR(256)= '',
	@vigiladornombre varchar(256) = '',
	@cuenta VARCHAR(256) = '',
	              
	@fechadesde NVARCHAR(256) = '',
	@fechahasta NVARCHAR(256) = '',

    @fromCleanApp VARCHAR(5) = '',

	@totalrows INT = 1 --OUTPUT  
AS
BEGIN
  
--Sort
DECLARE @SqlSort AS VARCHAR(256)
SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'u.usu_cnombre ASC, v.vus_dlogin DESC')

-- TOMO LOS CAMPOS DE LOS COMBO DEL REPORTE Y ARMO EL WHERE
DECLARE @SqlWhere NVARCHAR(MAX);
SET @SqlWhere = '';

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
SET @SqlWhere = @SqlWhere + @SqlFilterRango


--Para el cálculo de hs
DECLARE @SqlHs NVARCHAR(MAX)
SET @SqlHs = ' outer apply(
							select  
								
										(select datepart(HOUR,convert(datetime,StringValue)) * 60
										FROM [dbo].[parseJSON] (dvc_config) where name=''dt-hr-diurna-inicio''
										
										)as 
										
										hora
								from _datos.dbo.m_dealer_vcconfig where dvc_cdealer=c.cue_clinea And dvc_apptype=''VIGICONTROL''
									
						) hora_diurna_inicio
						outer apply(
							select  
								(select datepart(HOUR,convert(datetime,StringValue)) * 60
										FROM [dbo].[parseJSON] (dvc_config) where name=''dt-hr-diurna-fin'')as hora
								from _datos.dbo.m_dealer_vcconfig where dvc_cdealer=c.cue_clinea And dvc_apptype=''VIGICONTROL''
						) hora_diurna_fin
						outer apply(
							select  
								(select datepart(HOUR,convert(datetime,StringValue)) * 60
										FROM [dbo].[parseJSON] (dvc_config) where name=''dt-hr-nocturna-inicio'')as hora
								,(select 24 - datepart(HOUR,convert(datetime,StringValue)) 
										FROM [dbo].[parseJSON] (dvc_config) where name=''dt-hr-nocturna-inicio'')as Dif_0Hs_Ini_Nocturna

								from _datos.dbo.m_dealer_vcconfig where dvc_cdealer=c.cue_clinea And dvc_apptype=''VIGICONTROL''
						) hora_nocturna_inicio
						outer apply(
							select  
								(select datepart(HOUR,convert(datetime,StringValue)) * 60
										FROM [dbo].[parseJSON] (dvc_config) where name=''dt-hr-nocturna-fin'')as hora
								,(select datepart(HOUR,convert(datetime,StringValue)) /*expresado en hs*/
									FROM [dbo].[parseJSON] (dvc_config) where name=''dt-hr-nocturna-fin'')as Dif_Fin_Nocturna_0Hs/*Contabilizan como nocturnas*/

								from _datos.dbo.m_dealer_vcconfig where dvc_cdealer=c.cue_clinea And dvc_apptype=''VIGICONTROL''
						) hora_nocturna_fin'







print ' -- Rangos -- '
print @SqlFilterRango


IF (@vigilador != '')
	BEGIN
		--SET @SqlWhere = @SqlWhere + ' AND v.vus_iusuario = ''' + @vigilador + '''';
        SET @SqlWhere = @SqlWhere + ' AND u.usu_cnombre LIKE ''%' + @vigilador + '%''';
	END

/* Quito esta condicion ya que se quita el combo de vigilador y se pasa a texto
IF (@vigiladornombre != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND u.usu_cnombre LIKE ''' + @vigiladornombre + '''';
	END
*/

IF (@cuenta != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND v.vus_idcuenta = ''' + @cuenta + '''';
	END


IF (@fechadesde != '')
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND v.vus_dlogin >= ''' + convert(varchar,convert(date,@fechadesde,120),121)+ '''';
	END


IF (@fechahasta != '')
	BEGIN
		-- SUMO 1 AL DIA QUE VIENE DESDE EL REPORTE PARA OBTENER LAS 24HS DEL DIA ANTERIOR.
		SET @SqlWhere = @SqlWhere + ' AND v.vus_dlogin <= ''' + convert(varchar,DATEADD(day,1,convert(date,@fechahasta,120)),121)+ '''';
	END

IF (@fromCleanApp != '')
    BEGIN
        SET @SqlWhere = @SqlWhere + ' AND tip_ntipo = 9 ';
    END
ELSE
    BEGIN
        SET @SqlWhere = @SqlWhere + ' AND tip_ntipo != 9 ';
    END


DECLARE @sql AS VARCHAR(MAX)

IF (@group = 'yes')
	BEGIN
		SET @sql = 'SELECT 
					v.vus_idcuenta
					, COUNT (v.vus_iusuario) as vus_iusuariocant
					, v.vus_iusuario as vus_iusuario
					, u.usu_cIdExtendido as IdExtendido
					, u.usu_mobservacion as Observacion
					, u.usu_cnombre as NombreVigilador 
					, c.cue_cnombre as NombreCuentaVigicontrol
					, SUM(cast(DATEDIFF(MINUTE, v.vus_dlogin, v.vus_dlogout) as bigint)) as horasTrabajadas

					FROM [_Datos]..[VigicontrolUserSessions] v 
						LEFT JOIN [_Datos]..[m_usuarios] u on (
							u.usu_icodigo = v.vus_iusuario
							AND u.usu_iidcuenta = v.vus_idcuenta )
						LEFT JOIN [_Datos].[dbo].[m_cuentas] c on ( c.cue_iid = u.usu_iidcuenta )
                        LEFT OUTER JOIN _Tablas.dbo.t_tipos ON tip_ccodigo = c.cue_ctipo
					WHERE 1=1 '+@SqlWhere+'
						AND v.vus_dlogin IS NOT NULL
						AND v.vus_dlogout IS NOT NULL
						AND u.usu_cnombre IS NOT NULL
						AND c.cue_cnombre IS NOT NULL
					GROUP BY v.vus_iusuario, u.usu_cnombre, c.cue_cnombre, v.vus_idcuenta, v.vus_dlogin
					ORDER BY '+@SqlSort
	END
ELSE
	BEGIN
		DECLARE @campos_hs AS NVARCHAR(MAX)
		SET @campos_hs = '
					, convert(varchar,v.vus_dlogin,103) as vus_dlogin_formatted
					, convert(varchar,v.vus_dlogout,103) as vus_dlogout_formatted
					, convert(varchar,v.vus_dlogin,108) as vus_dlogin_hr_formatted
					, convert(varchar,v.vus_dlogout,108) as vus_dlogout_hr_formatted
					, cast(DATEDIFF(MINUTE, v.vus_dlogin, v.vus_dlogout) as bigint) as horasTrabajadas
					, u.usu_cIdExtendido as IdExtendido
					, u.usu_mobservacion as Observacion
					, u.usu_cnombre as NombreVigilador 
					, c.cue_cnombre as NombreCuentaVigicontrol
					,ISNULL( datediff(minute, dateadd(minute,hora_nocturna_inicio.hora, convert(datetime,convert(date,v.vus_dlogout) )  )    ,v.vus_dlogout)  ,0) as Dif_Logout_Ini_Nocturna
					,ISNULL(datediff(minute,v.vus_dlogin, dateadd(minute/*AQUI QUEDE*/,hora_nocturna_fin.hora, convert(datetime,convert(date,v.vus_dlogin)) )),0) as Dif_Login_Fin_Nocturna
					,ISNULL (datediff(minute,dateadd(minute,hora_diurna_inicio.hora,convert(datetime,convert(date,v.vus_dlogout))), v.vus_dlogout), 0) as Dif_Inicio_Diurna_Logout
					,ISNULL (datediff(minute,convert(datetime,convert(date,v.vus_dlogout)), v.vus_dlogout), 0) as Dif_0Hs_Logout
					,ISNULL (datediff(minute, v.vus_dlogin,dateadd(hour,hora_nocturna_fin.hora,convert(datetime,convert(date,v.vus_dlogin)))), 0) as Dif_Login_Fin_Nocturna
					,ISNULL (datediff(minute, v.vus_dlogin,dateadd(minute,hora_diurna_fin.hora,convert(datetime,convert(date,v.vus_dlogin)))), 0) as Dif_Login_Fin_Diurna
					,ISNULL (hora_diurna_fin.hora,0) as Dif_Login_Fin_Diurna
					,ISNULL( datediff(minute, v.vus_dlogin,dateadd(minute,59+1380,convert(datetime,convert(date,v.vus_dlogin)))),0) as Dif_Login_0Hs
					,ISNULL (hora_nocturna_inicio.Dif_0Hs_Ini_Nocturna,0) as Dif_0Hs_Ini_Nocturna
					,ISNULL( hora_nocturna_fin.Dif_Fin_Nocturna_0Hs , 0) as Dif_Fin_Nocturna_0Hs
					,ISNULL((hora_diurna_fin.hora - hora_diurna_inicio.hora),0) as Dif_Fin_Ini_Diurna 
					,hora_diurna_inicio.hora as Config_h_diurna_inicio
					,hora_diurna_fin.hora as Config_h_diurna_fin
					,hora_nocturna_inicio.hora as Config_h_noctura_inicio
					,hora_nocturna_fin.hora as Config_h_noctura_fin
				'
		SET @sql = 'SELECT v.*'+@campos_hs+
				
					', u.usu_ntipo
					,ISNULL((select eve_ccodigo from  [_Tablas].[dbo].[t_eventos_feriados] where v.vus_dlogin between eve_dfechadesdes and dateadd(MINUTE,1439,eve_dfechahasta)),0) login_feriado
					,ISNULL((select eve_ccodigo from  [_Tablas].[dbo].[t_eventos_feriados] where v.vus_dlogout between eve_dfechadesdes and dateadd(MINUTE,1439,eve_dfechahasta)),0) logout_feriado

					,ISNULL((select top 1 DATEDIFF(minute,v.vus_dlogin,v.vus_dlogout) from  [_Tablas].[dbo].[t_eventos_feriados] where v.vus_dlogin > eve_dfechadesdes and v.vus_dlogout<dateadd(MINUTE,1439,eve_dfechahasta)),0) Minutos_Feriados_EnRango

					,(select top 1 DATEDIFF(minute,v.vus_dlogin,dateadd(MINUTE,1439,eve_dfechahasta)) from  [_Tablas].[dbo].[t_eventos_feriados] where v.vus_dlogin > eve_dfechadesdes and v.vus_dlogout>dateadd(MINUTE,1439,eve_dfechahasta)) Minutos_Feriados_DesdeLoginHasta_eve_dfechahasta /*NO SE USA*/

					,(select top 1 DATEDIFF(minute,eve_dfechadesdes,v.vus_dlogout) from  [_Tablas].[dbo].[t_eventos_feriados] where v.vus_dlogin < eve_dfechadesdes and v.vus_dlogout<dateadd(MINUTE,1439,eve_dfechahasta)) Minutos_Feriados_eve_dfechadesdes_Hasta_logout/*NO SE USA*/
					
					, ISNULL(
							datediff(MINUTE, vus_dlogin,dateadd(minute,hora_diurna_inicio.hora,convert(datetime, convert(date,vus_dlogin)))) 
							,0
							)
					 as _6hs_login
					, ISNULL(
						datediff(MINUTE, vus_dlogin,dateadd(minute,   hora_diurna_fin.hora,convert(datetime, convert(date,vus_dlogin)))) 
						,0
						) as _21hs_login
					, ISNULL(
						datediff(MINUTE, vus_dlogout,dateadd(minute,  hora_nocturna_inicio.hora,convert(datetime, convert(date,vus_dlogout)))) 
						,0
						) as _6hs_logout
					, ISNULL(
						datediff(MINUTE, vus_dlogout,dateadd(minute,  hora_nocturna_fin.hora,convert(datetime, convert(date,vus_dlogout)))) 
						,0
						) as _21hs_logout
					, cast(DATEDIFF(DAY, v.vus_dlogin, v.vus_dlogout) as bigint) as DiasTrabajados
					,datediff(minute 
							,v.vus_dlogin
							,dateadd(SECOND,24*60*60 - 1,cast(cast(v.vus_dlogin as date) as datetime))
							
							) Minutos_Login_Hasta_12pm
					,datediff(minute 
							
							,cast(cast(v.vus_dlogin as date) as datetime)
							,v.vus_dlogout
							) Minutos_Desde0am_HastaLogout
					,cast(v.vus_dlogin as date) Fecha_Login /*NO SE USA*/
					,cast(v.vus_dlogout as date) Fecha_Logout /*NO SE USA*/
					
					
					
					FROM [_Datos]..[VigicontrolUserSessions] v 
						LEFT JOIN [_Datos]..[m_usuarios] u on (
							u.usu_icodigo = v.vus_iusuario
							AND u.usu_iidcuenta = v.vus_idcuenta )
						LEFT JOIN [_Datos].[dbo].[m_cuentas] c on c.cue_iid = u.usu_iidcuenta
                        LEFT OUTER JOIN _Tablas.dbo.t_tipos ON tip_ccodigo = c.cue_ctipo'+@SqlHs


					+' WHERE 1=1 ' + @SqlWhere + '
						AND v.vus_dlogin IS NOT NULL
						AND v.vus_dlogout IS NOT NULL
						AND u.usu_cnombre IS NOT NULL
						AND c.cue_cnombre IS NOT NULL
					ORDER BY ' + @SqlSort 

		
	END
END

/*
print '----'
print @Sql
*/

EXECUTE (@Sql)