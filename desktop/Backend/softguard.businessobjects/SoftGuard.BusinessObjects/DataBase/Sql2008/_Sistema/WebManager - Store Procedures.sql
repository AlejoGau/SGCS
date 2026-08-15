CREATE PROCEDURE WebManager_AlertasGeoreferenciadas
AS
					SET NOCOUNT ON

					Select top 25 cue_ncuenta,cue_cNombre,cue_cCalle,cue_cLatLng,cod_cdescripcion as descripcion,cast(cod_ncolor as char) as color_fondo,cue_clinea,rec_nestado, (select pro_cdescripcion from [_Tablas].dbo.t_provincias where pro_ccodigo = cue_cprovincia) as cue_cprovincia, cue_clocalidad, (select par_mobservacion from [_tablas].dbo.t_parametros where par_ccodigo = 'NOMBREPAIS') pais, cue_ccodigopostal
	                                           From [_Datos].[dbo].[p_recepcion]  
	                                                inner join [_Datos].[dbo].[m_cuentas]  on cue_iid=rec_iidcuenta 
	                                                inner join [_Tablas].[dbo].[t_codigos_alarma]  on cod_ccodigo=rec_calarma 
	                                          where rec_nestado<3 
                                                    And cue_cLatLng Not In('','0.0,0.0') 
                                                    and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
                                           order by rec_tfechahora desc
GO

CREATE PROCEDURE WebManager_AnalisisIPR30Dias
AS
					SET NOCOUNT ON

					SELECT CAST(max(rec_iPuerto) AS INT) as puerto,Count(rec_iid) As nCantidad, max(ipc_cdescripcion ) as descripcion
                                                FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK) 
                                                     Inner Join _Tablas.dbo.t_ip_con On ipc_nport  = rec_iPuerto 
                                               Where (rec_nestado>=0 and rec_nestado<=7 ) 
                                                     And  rec_norigen = 2 
                                                     and rec_iPuerto > 99 
                                                     and CONVERT(CHAR,rec_tfechahora,112)> CONVERT(CHAR,DATEADD(day,-30,GETDATE()),112) 
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
                                            Group By rec_iPuerto order by max(rec_iPuerto) asc
GO


CREATE PROCEDURE WebManager_AnalisisIPRHoy
AS
					SET NOCOUNT ON

					SELECT CAST(max(rec_iPuerto) AS INT) as puerto,Count(rec_iid) As nCantidad, max(ipc_cdescripcion ) as descripcion
                                                FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK) 
                                                     Inner Join _Tablas.dbo.t_ip_con On ipc_nport  = rec_iPuerto 
                                               Where (rec_nestado>=0 and rec_nestado<=7 ) 
                                                     And  rec_norigen = 2  
                                                     and rec_iPuerto > 99 
                                                     and CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112) 
                                            Group By rec_iPuerto order by max(rec_iPuerto) asc
GO

CREATE PROCEDURE WebManager_AnalisisPG30Dias
AS
					SET NOCOUNT ON

					SELECT CAST(max(rec_iPuerto) AS INT) as puerto,Count(rec_iid) As nCantidad,max(pue_cdescripcion) as descripcion
                                                FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK) 
                                                     Inner Join _Tablas.dbo.t_puertos On pue_npuerto  = rec_iPuerto
                                               Where (rec_nestado>=0 and rec_nestado<=7 ) 
                                                     And  rec_norigen = 2  
                                                     and rec_iPuerto<99 
                                                     and CONVERT(CHAR,rec_tfechahora,112)> CONVERT(CHAR,DATEADD(day,-30,GETDATE()),112)    
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
                                            Group By rec_iPuerto order by max(rec_iPuerto) asc
GO

CREATE PROCEDURE WebManager_AnalisisPGHoy
AS
					SET NOCOUNT ON

					SELECT CAST(max(rec_iPuerto) AS INT) as puerto,Count(rec_iid) As nCantidad,max(pue_cdescripcion) as descripcion
                                                FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK) Inner Join _Tablas.dbo.t_puertos On pue_npuerto  = rec_iPuerto
                                               Where (rec_nestado>=0 and rec_nestado<=7 ) 
                                                     And  rec_norigen = 2  
                                                     and rec_iPuerto<99 
                                                     and CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112) 
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
                                            Group By rec_iPuerto 
                                            order by max(rec_iPuerto) asc
GO

CREATE PROCEDURE WebManager_CategorizacionDeAlarmas
AS
					SET NOCOUNT ON

					Select Max(res_cdescripcion) As cDesc, Count(*) As nCant
                                                From [_Datos].[dbo].p_recepcion With (NOLOCK)
                                                     Inner Join _Tablas.dbo.t_resoluciones On res_cCodigo = rec_idResolucion 
                                               Where (rec_nestado = 3 AND  rec_idResolucion  > 0) 
                                                     And datepart(m,rec_tfechahora) = datepart(m,GETDATE()) 
                                            Group By rec_idResolucion
GO

CREATE PROCEDURE WebManager_CategorizacionDeEventos
AS
					SET NOCOUNT ON

					Select Max(res_cdescripcion) As cDesc, Count(*) As nCant
                                                From [_Datos].[dbo].p_recepcion With (NOLOCK)
                                                     Inner Join _Tablas.dbo.t_resoluciones On res_cCodigo = rec_idResolucion 
                                               Where (rec_nestado = 3 AND  rec_idResolucion  > 0) 
                                                     And ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,GETDATE(),112) 
                                                     And CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) ) 
                                            Group By rec_idResolucion
GO

CREATE PROCEDURE WebManager_EstadoDeCuenta
AS
					SET NOCOUNT ON

					select count(est_nestado) as conta,
                                                     (Case When est_nEstado=1 Then 'Prueba'
                                                           When est_nEstado=2 Then 'No Habilitado'
                                                           When est_nEstado=3 Then 'Prueba x Zonas '
                                                           Else 'Habilitado' End ) As Situacion
                                                FROM [_Datos].[dbo].m_cuentas 
                                                     left outer join [_Datos].[dbo].m_estado_cuenta_cab on cue_iid = est_iidcuenta
                                            group by est_nestado
GO

CREATE PROCEDURE WebManager_EventosAutoprocesados
AS
					SET NOCOUNT ON

					Select count(rec_nestado) as conta,
                                                     (Case When rec_nEstado=5 Then 'No emergencia '
                                                           When rec_nEstado=6 Then 'Modo Prueba'
                                                           When rec_nEstado=7 Then 'Cuenta Inhabilitada '
                                                       End ) As Situacion
                                                FROM [_Datos].[dbo].p_recepcion 
                                               Where CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112) 
                                                     And DATEPART(hh,CONVERT(CHAR,rec_tfechahora,14))<= DATEPART(hh,CONVERT(CHAR,GETDATE(),14)) 
                                                     and (rec_nEstado>4 and rec_nEstado<8) 
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
                                            group by rec_nestado
GO

CREATE PROCEDURE WebManager_EventosPorDiaPorOperador
AS
					SET NOCOUNT ON

					Select Max(ope_cnombre) As cDesc, Count(*) As nCant
	                                            From [_Datos].[dbo].p_recepcion With (NOLOCK)
	                                                 Inner Join _Sistema.dbo.s_operadores On ope_iid = rec_ioperador 
	                                           Where rec_ioperador>0 
                                                     and ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,GETDATE(),112) 
	                                                 And CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) )
	                                        Group By rec_ioperador
GO

CREATE PROCEDURE WebManager_EventosDeEmergenciaUltimos10Dias
AS
					SET NOCOUNT ON

					Select Max(CONVERT(char(8), rec_tfechahora,3)) As cDesc, Count(rec_iid) As nCant, CAST(Max(rec_tfechahora ) AS VARCHAR) As dia
	                                            From [_Datos].[dbo].p_recepcion   
	                                           Where  ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,DATEADD(day,-9,GETDATE()),112) 
	                                                  And CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) ) 
                                                      and ((rec_nestado>=0 and rec_nestado<=3) or (rec_nestado>=6 and rec_nestado<=7) )
	                                         Group By CONVERT(char(8), rec_tfechahora,3)
	                                         ORDER BY dia asc
GO

CREATE PROCEDURE WebManager_EventosDeEmergenciaUltimos2Meses
AS
					SET NOCOUNT ON

					Select max(datepart(mm,rec_tfechahora)) as num_mes,Max(CONVERT(char(5), rec_tfechahora,3)) As cDesc, Count(rec_iid) As nCant
                                                From [_Datos].[dbo].p_recepcion   
                                               Where  ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,DATEADD(month,-2,GETDATE()),112) 
                                                     And CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) ) 
                                                     and ((rec_nestado>=0 and rec_nestado<=3) or (rec_nestado>=6 and rec_nestado<=7) ) 
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
                                            Group By CONVERT(char(8), rec_tfechahora,3)
                                            order by max(rec_tfechahora) asc
GO

CREATE PROCEDURE WebManager_EventosEnEsperaPorPrioridad
AS
					SET NOCOUNT ON

					Select  rec_tfechahora, cast(cod_nprioridad as int) As nPrioridad
                                                FROM [_Datos].[dbo].p_recepcion With (NOLOCK) Left Outer Join _Datos.dbo.m_cuentas ON rec_iidCuenta=cue_iid
                                                     Left Outer Join _tablas.dbo.t_codigos_alarma ON rec_cAlarma=cod_cCodigo
                                                     Left Outer Join _sistema.dbo.s_operadores ON rec_ioperador= ope_iid
                                                     Left Outer Join _Datos.dbo.m_usuarios On rec_iidcuenta = usu_iidcuenta AND rec_iusuario= usu_icodigo And usu_iCodigo<>0
                                               WHERE rec_nestado = 2 or rec_nestado=4
                                            ORDER BY rec_tfechaHora DESC
GO

CREATE PROCEDURE WebManager_EventosPendientesPorPrioridad
AS
					SET NOCOUNT ON

					Select top 1000  rec_tfechahora, cast(cod_nprioridad as int) As nPrioridad
	                                            FROM _Datos.dbo.p_recepcion With (NOLOCK)
	                                                 Left Outer Join _Datos.dbo.m_cuentas ON rec_iidCuenta=cue_iid
	                                                 Left Outer Join _tablas.dbo.t_codigos_alarma ON rec_cAlarma= cod_cCodigo
	                                                 Left Outer Join _sistema.dbo.s_operadores ON rec_ioperador= ope_iid
	                                                 Left Outer Join _Datos.dbo.m_usuarios On rec_iidcuenta = usu_iidcuenta AND rec_iusuario= usu_icodigo And usu_iCodigo<>0
	                                           WHERE (rec_nestado = 0 or rec_nestado=1)
	                                                 and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
	                                        ORDER BY rec_tfechaHora DESC 
GO

CREATE PROCEDURE WebManager_EventosRecibidos
AS
					SET NOCOUNT ON

					SELECT CAST(max(rec_iPuerto) AS INT) as puerto, Max(rec_norigen) As nOrigen,Count(rec_iid) As nCantidad,DATEPART(hh,rec_tfechahora) As nHora
                                                FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK)
                                               Where (rec_nestado>=0 and rec_nestado<=7 )  
                                                     and CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112) 
                                                     And rec_norigen in (1,2,3,4,5,6,7,8) 
                                                     and DATEPART(hh,CONVERT(CHAR,rec_tfechahora,14))<= DATEPART(hh,CONVERT(CHAR,GETDATE(),14))
                                            Group By DATEPART(hh,rec_tfechahora),rec_norigen, rec_iPuerto
GO


CREATE PROCEDURE WebManager_EventosRecibidos30Dias
AS
					SET NOCOUNT ON

					SELECT CAST(max(rec_iPuerto) AS INT) as puerto, CAST(Max(rec_norigen) AS VARCHAR) As nOrigen,Count(rec_iid) As nCantidad, CONVERT(CHAR(5),rec_tfechahora,3) As nfecha
                                               FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK)
                                              Where (rec_nestado>=0 and rec_nestado<=7 ) 
                                                    And  rec_norigen >= 1 
                                                    and rec_norigen <=8 
                                                    and CONVERT(CHAR,rec_tfechahora,112)> CONVERT(CHAR,DATEADD(day,-30,GETDATE()),112) 
                                                    and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
                                                    and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
                                           Group By CONVERT(CHAR(5),rec_tfechahora,3),rec_norigen,rec_iPuerto order by max(rec_tfechahora) asc
GO

CREATE PROCEDURE WebManager_EventosPorTipoDelDia
AS
					SET NOCOUNT ON

					SELECT count(rec_calarma) as cant ,rec_calarma as tipo
	                                            FROM [_Datos].[dbo].p_recepcion 
                                               where CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112)
	                                        group by rec_calarma
GO

CREATE PROCEDURE WebManager_ProcesamientosPorTerminal
AS
					SET NOCOUNT ON

					SELECT  rec_cTerminal,Count(rec_iid) As nCantidad,DATEPART(hh,rec_tfechahora) As nHora
                                                FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK)
                                               Where CONVERT(char(8), rec_tfechahora,112) = CONVERT(CHAR,GETDATE(),112) and rec_nestado=3
                                            Group By DATEPART(hh,rec_tfechahora),rec_cTerminal
GO

CREATE PROCEDURE WebManager_ProcesoEventosActuales
AS
					SET NOCOUNT ON

					Select count(rec_nestado) as conta,
                                                     (Case When rec_nestado=0 Then 'Pendientes'
                                                           When rec_nestado=1 Then 'En Proceso'
                                                           When rec_nestado=2 Then 'Espera'
                                                           Else 'Habilitado' End ) As Situacion
                                                FROM [_Datos].[dbo].p_recepcion 
                                               where rec_nestado < 3  
                                                     and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
                                            group by rec_nestado
GO

CREATE PROCEDURE WebManager_ResolucionDeEventosPorDia
AS
					SET NOCOUNT ON

					Select Max(cat_cdescripcion) As cDesc, Count(*) As nCant 
                                               From [_Datos].[dbo].p_recepcion With (NOLOCK)
                                                    Inner Join _Tablas.dbo.t_categorizacion On cat_cCodigo = rec_cCategorizacion
                                              Where (rec_nestado = 3 AND rec_cCategorizacion > 0) 
                                                    And ( CONVERT(char(8), rec_tfechahora,112) >= CONVERT(CHAR,GETDATE(),112)
                                                    And CONVERT(char(8), rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)) 
                                           Group By rec_cCategorizacion
GO

CREATE PROCEDURE WebManager_ResolucionDeEventosPorMes
AS
					SET NOCOUNT ON

					Select Max(cat_cdescripcion) As cDesc, Count(*) As nCant 
                                               From [_Datos].[dbo].p_recepcion With (NOLOCK)
                                                    Inner Join _Tablas.dbo.t_categorizacion On cat_cCodigo = rec_cCategorizacion
                                              Where (rec_nestado = 3 AND rec_cCategorizacion > 0) 
                                                    And datepart(m,rec_tfechahora) = datepart(m,GETDATE())
                                           Group By rec_cCategorizacion
GO

CREATE PROCEDURE WebManager_Ultimos25Eventos
AS
					SET NOCOUNT ON

					Select TOP 25 convert(char,rec_tfechahora,105) as rec_tfecha_format , convert(char,rec_tfechahora,108) as rec_thora ,cod_ccodigo,cod_cdescripcion as descripcion, cod_ncolor as color_fondo, cod_nColorLetra as color_letra, cod_nColorLetra, cue_clinea, cue_ncuenta, cue_cnombre, rec_calarma, rec_nestado  
		                                        From [_Datos].[dbo].[p_recepcion]  
		                                             inner join [_Datos].[dbo].[m_cuentas]  on cue_iid=rec_iidcuenta 
		                                             inner join [_Tablas].[dbo].[t_codigos_alarma]  on cod_ccodigo=rec_calarma 
		                                       where (rec_nestado>2 and rec_nestado<8 )
		                                             and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
		                                    order by rec_tfechahora DESC
GO

CREATE PROCEDURE WebManager_Ultimos25EventosAlertas
AS
					SET NOCOUNT ON

					Select top 25 convert(char,rec_tfechahora,105) as rec_tfechahora_format , convert(char,rec_tfechahora,108) as rec_thora ,cod_ccodigo,cod_cdescripcion as descripcion, cod_ncolor as color_fondo, cod_nColorLetra as color_letra,cod_nColorLetra,cue_clinea,cue_ncuenta,cue_cnombre,rec_calarma,rec_nestado  
		                                        From [_Datos].[dbo].[p_recepcion]  
		                                             inner join [_Datos].[dbo].[m_cuentas]  on cue_iid=rec_iidcuenta 
		                                             inner join [_Tablas].[dbo].[t_codigos_alarma]  on cod_ccodigo=rec_calarma 
		                                       where (rec_nestado>=0 and rec_nestado<=3 or (rec_nestado=6 or rec_nestado=7)) 
		                                             and CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112) 
		                                    order by rec_tfechahora desc
GO

CREATE PROCEDURE WebManager_CuentasGeoreferenciadas
AS
					SET NOCOUNT ON

					Select cue_clinea,cue_ncuenta,cue_cNombre,cue_cCalle,cue_cLatLng, (select pro_cdescripcion from [_Tablas].dbo.t_provincias where pro_ccodigo = cue_cprovincia) as cue_cprovincia, cue_clocalidad, (select par_mobservacion from [_tablas].dbo.t_parametros where par_ccodigo = 'NOMBREPAIS') pais, cue_ccodigopostal
                                                From [_Datos].[dbo].m_cuentas
                                               Where cue_ncuenta Not In ('0000','XXXX') And cue_clinea Not In('_SG','_MP')
                                                     And cue_cLatLng Not In('','0.0,0.0')
                                                     And cue_iid Not In ( Select est_iidcuenta 
                                                                            From m_estado_cuenta_Cab
                                                                           Where est_iidcuenta=cue_iid AND est_nEstado=2 )
GO

CREATE PROCEDURE WebManager_EvolucionCuentas30Dias
AS
					SET NOCOUNT ON

					SELECT sts_tfechahora, sts_cdescripcion as descripcion, sts_icantidad as cantidad, CONVERT(CHAR(5),sts_tfechahora,3) As fecha_format
		                                        FROM [_Sistema].[dbo].s_stats 
		                                       WHERE CONVERT(CHAR,sts_tfechahora,112) > CONVERT(CHAR,DATEADD(day,-30,GETDATE()),112) 
		                                             AND CONVERT(char, sts_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
		                                             AND sts_ctipo = 'SC' 
		                                             AND sts_cdescripcion = 'Habilitado'
		                                    ORDER BY sts_tfechahora ASC
GO

CREATE PROCEDURE WebManager_EvolucionCuentas60Dias
AS
					SET NOCOUNT ON

					SELECT sts_tfechahora, sts_cdescripcion as descripcion, sts_icantidad as cantidad, CONVERT(CHAR(5),sts_tfechahora,3) As fecha_format
		                                        FROM [_Sistema].[dbo].s_stats 
		                                       WHERE CONVERT(CHAR,sts_tfechahora,112) > CONVERT(CHAR,DATEADD(day,-60,GETDATE()),112) 
		                                             AND CONVERT(char, sts_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
		                                             AND sts_ctipo = 'SC' 
		                                             AND sts_cdescripcion = 'Habilitado'
		                                    ORDER BY sts_tfechahora ASC
GO

CREATE PROCEDURE WebManager_EvolucionCuentas12Meses
AS
					SET NOCOUNT ON

					SELECT Avg(sts_icantidad) as cantidad, month(sts_tfechahora) as mes, year(sts_tfechahora) as ano 
                                                FROM [_Sistema].[dbo].s_stats 
			                                   WHERE CONVERT(CHAR,sts_tfechahora,112) > CONVERT(CHAR,DATEADD(year,-1,GETDATE()),112) 
			                                         AND CONVERT(char, sts_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
			                                         AND sts_ctipo = 'SC' 
			                                         AND sts_cdescripcion = 'Habilitado'
			                                GROUP BY month(sts_tfechahora), year(sts_tfechahora)
			                                ORDER BY year(sts_tfechahora),month(sts_tfechahora) asc
GO