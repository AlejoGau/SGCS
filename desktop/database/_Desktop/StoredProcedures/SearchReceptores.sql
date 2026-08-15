--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2023/10/18 11:50:00
-- EXEC [dbo].[SearchReceptores] 
-- Notes: 
--		SP based on Receptores in SearchCantidadCuentaGroupByTipo and SearchIpCon SPs
-- 2024-05-09 : PabloC. Tipo 2 Cuentas - Tipo 3 Conexiones
--#############################################################################



CREATE OR ALTER PROCEDURE [dbo].[SearchReceptores]
AS 
BEGIN
	
	;With FirstQuery As (
			SELECT receptor.rec_cdescripcion +
				(select top 1 ' - ' + JSON_VALUE(iprsc_config, '$.receptorSelected.rpm_cModelo')
					From [_tablas]..[t_ip_con] con1
					inner Join  _datos..m_receptores_cab receptor1 On receptor1.rec_iid= con1.ipc_ireceptor
					Inner Join [_Tablas].[dbo].[t_IPRSConn] t_IPRSConn1 On con1.[ipc_idKey]= t_IPRSConn1.[iprsc_ipcidkey]
					where receptor1.rec_iid = receptor.rec_iid
				) As receptor
				,recepcion.rec_iPuerto AS puerto, 1 as tipo -- eventos
				,0 as rec_iidcuenta
			FROM _datos..p_recepcion recepcion
			inner Join  _datos..m_receptores_cab receptor On receptor.rec_iid= recepcion.rec_idReceptor
			Where recepcion.rec_tfechahora>=  DATEADD(hour,-24,GETDATE())
			And recepcion.rec_nOrigen In(2,6)
			
			union all 

			SELECT receptor.rec_cdescripcion +
				(select top 1 ' - ' + JSON_VALUE(iprsc_config, '$.receptorSelected.rpm_cModelo')
					From [_tablas]..[t_ip_con] con1
					inner Join  _datos..m_receptores_cab receptor1 On receptor1.rec_iid= con1.ipc_ireceptor
					Inner Join [_Tablas].[dbo].[t_IPRSConn] t_IPRSConn1 On con1.[ipc_idKey]= t_IPRSConn1.[iprsc_ipcidkey]
					where receptor1.rec_iid = receptor.rec_iid
				) As receptor
				,recepcion.rec_iPuerto AS puerto, 2 as tipo -- cuentas
				,recepcion.rec_iidcuenta
			FROM _datos..p_recepcion recepcion
			inner Join  _datos..m_receptores_cab receptor On receptor.rec_iid= recepcion.rec_idReceptor
			Where recepcion.rec_tfechahora>=  DATEADD(hour,-24,GETDATE())
			And recepcion.rec_nOrigen In(2,6)
			
			union all 

			select receptor.rec_cdescripcion + (case when JSON_VALUE(iprsc_config, '$.receptorSelected.rpm_cModelo') != '' then 
				' - ' + JSON_VALUE(iprsc_config, '$.receptorSelected.rpm_cModelo') else '' end) As receptor,con.ipc_nport as puerto, 3 as tipo -- conexiones
				,0 as rec_iidcuenta
			From [_tablas]..[t_ip_con] con
			inner join _datos..m_receptores_cab receptor ON receptor.rec_iid = con.ipc_ireceptor
			Inner Join [_Tablas].[dbo].[t_IPRSConn] On con.[ipc_idKey]=[iprsc_ipcidkey]
			Where ipc_nestado=2

			), ReceptoresInfo AS (
						Select receptor,puerto,tipo,COUNT(DISTINCT CASE WHEN TIPO = 2 THEN rec_iidcuenta END) As Cuentas
						, sum(case when tipo = 1 then 1 else 0 end) as Eventos
			From FirstQuery
					group by rec_iidcuenta,receptor,puerto,tipo 
					)
	Select 	receptor,puerto
			, sum(Eventos) as cantidadEventos
			, sum(Cuentas) as cantidadCuentas
			, sum(Eventos)+Sum(Cuentas)  as cantidad
	
	 From ReceptoresInfo
	group by receptor,puerto
	order by cantidad desc


/*
	SELECT Distinct movimientos.receptor,movimientos.puerto
		, sum(case when movimientos.tipo = 1 then 1 else 0 end) as cantidadEventos
		, sum(case when movimientos.tipo = 2 then 1 else 0 end) as cantidadCuentas
		, sum(case when movimientos.tipo = 3 then 1 else 0 end) as cantidad
	FROM
	(
		SELECT receptor.rec_cdescripcion +
			(select top 1 ' - ' + JSON_VALUE(iprsc_config, '$.receptorSelected.rpm_cModelo')
				From [_tablas]..[t_ip_con] con1
				inner Join  _datos..m_receptores_cab receptor1 On receptor1.rec_iid= con1.ipc_ireceptor
				Inner Join [_Tablas].[dbo].[t_IPRSConn] t_IPRSConn1 On con1.[ipc_idKey]= t_IPRSConn1.[iprsc_ipcidkey]
				where receptor1.rec_iid = receptor.rec_iid
			) As receptor
			,recepcion.rec_iPuerto AS puerto, 1 as tipo -- eventos
			,recepcion.rec_iidcuenta
		FROM _datos..p_recepcion recepcion
		inner Join  _datos..m_receptores_cab receptor On receptor.rec_iid= recepcion.rec_idReceptor
		Where recepcion.rec_tfechahora>=  DATEADD(hour,-24,GETDATE())
		And recepcion.rec_nOrigen In(2,6)
				
		union all 

		SELECT receptor.rec_cdescripcion +
			(select top 1 ' - ' + JSON_VALUE(iprsc_config, '$.receptorSelected.rpm_cModelo')
				From [_tablas]..[t_ip_con] con1
				inner Join  _datos..m_receptores_cab receptor1 On receptor1.rec_iid= con1.ipc_ireceptor
				Inner Join [_Tablas].[dbo].[t_IPRSConn] t_IPRSConn1 On con1.[ipc_idKey]= t_IPRSConn1.[iprsc_ipcidkey]
				where receptor1.rec_iid = receptor.rec_iid
			) As receptor
			,recepcion.rec_iPuerto AS puerto, 2 as tipo -- cuentas
			,recepcion.rec_iidcuenta
		FROM _datos..p_recepcion recepcion
		inner Join  _datos..m_receptores_cab receptor On receptor.rec_iid= recepcion.rec_idReceptor
		Where recepcion.rec_tfechahora>=  DATEADD(hour,-24,GETDATE())
		And recepcion.rec_nOrigen In(2,6)

		union all 

		select receptor.rec_cdescripcion + (case when JSON_VALUE(iprsc_config, '$.receptorSelected.rpm_cModelo') != '' then 
			' - ' + JSON_VALUE(iprsc_config, '$.receptorSelected.rpm_cModelo') else '' end) As receptor,con.ipc_nport as puerto, 3 as tipo -- conexiones
			,0 as rec_iidcuenta--,*
		From [_tablas]..[t_ip_con] con
		inner join _datos..m_receptores_cab receptor ON receptor.rec_iid = con.ipc_ireceptor
		Inner Join [_Tablas].[dbo].[t_IPRSConn] On con.[ipc_idKey]=[iprsc_ipcidkey]
		Where ipc_nestado=2

	) as movimientos
	group by movimientos.receptor,movimientos.puerto,movimientos.rec_iidcuenta
	order by cantidad desc
*/
END