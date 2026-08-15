--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.633 
-- 2025-03-31 Pablo : Para utilizar MailConnector con mas de un sender de mail
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchMailConnectorByReceptor](@rec_cdll NVARCHAR(50)='')
as
begin
set nocount on

	if (@rec_cdll != '')
	Begin
		select m.*, c.* from _tablas..t_mailConnector m
		inner join _tablas..t_ip_con c on (m.mcn_ipconid= c.ipc_idKey)
		inner join _datos..m_receptores_cab r on (c.ipc_ireceptor  = r.rec_iid )
		where r.rec_cdll COLLATE DATABASE_DEFAULT in(select *  from  _desktop..ParseArray(@rec_cdll,','))
	End
	Else
	Begin	
		Select m.*,JSON_VALUE(i.iprsc_config, '$.receptorSelected.rpm_cModelo') AS rpm_cModelo,
			JSON_VALUE(i.iprsc_config, '$.formdata.Ip') AS ipc_cremotehostip,
			r.rec_cdll,s.iprs_localip,c.ipc_nport,c.ipc_cdescripcion
		From _Tablas.dbo.t_mailConnector m
			Inner Join _Tablas.dbo.t_ip_con c on m.mcn_ipconid= c.ipc_idKey
			Inner Join _Datos.dbo.m_receptores_cab r on c.ipc_ireceptor  = r.rec_iid 
			Inner Join _Tablas.dbo.t_IPRSConn i on i.iprsc_ipcidkey = m.mcn_ipconid
			Inner Join _Sistema.dbo.s_iprservicios s on i.iprsc_iprsiid = s.iprs_idKey	
		WHERE 
			ISJSON(i.iprsc_config) = 1
			AND JSON_VALUE(i.iprsc_config, '$.receptorSelected.rpm_cModelo') IS NOT NULL
			AND JSON_VALUE(i.iprsc_config, '$.formdata.Ip') IS NOT NULL
	End
end