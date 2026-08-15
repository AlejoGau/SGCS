--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.287 
--#############################################################################
-- =============================================
-- Author:		Rodrigo Román
-- Create date: <Create Date,,>
-- Description:	Datos necesarios para redirigir un evento a diferentes plataformas
-- Update : 2024-12-17 Pablo. Los TST van directo a la depurada y no se tomaban para redirigirlos
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SearchRedirectorEvento]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort NVARCHAR(256) = '',   
	@group NVARCHAR(256) = '',            
	@filter NVARCHAR(2048) = '',        
	@_dc NVARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT,
	@rec_iid int = 0
AS
BEGIN

	SET NOCOUNT ON;
	IF EXISTS (
		SELECT 1 
		FROM _datos..p_recepcion e
		WHERE e.rec_iid = @rec_iid
	)
	BEGIN
		select top 1 e.*
		  ,DATEDIFF(s,'1970-01-01',convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (e.rec_tfechahora,DATENAME(TZoffset, SYSDATETIMEOFFSET())),0))) * convert(bigint, 1000) as rec_tfechahoraEpoch
		  ,convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (e.rec_tfechahora,DATENAME(TZoffset, SYSDATETIMEOFFSET())),0)) as rec_tfechahoraGMT
		  ,c.*,g.[gps_iid]
		  ,g.[gps_idCuenta]
		  ,g.[gps_idRec]
		  ,g.[gps_rLatitud]
		  ,g.[gps_rLongitud]
		  ,g.[gps_iRumbo]
		  ,g.[gps_tRawfechahora]
		  ,g.gps_tfechahora
		  ,g.[gps_iVelocidad]
		  ,g.[gps_iOdometro]
		  ,g.[gps_cDireccion]
		  ,g.[gps_cIMEI]
		  ,g.[gps_rAccuracy]
		  ,g.[gps_cMethod]
		  ,g.[gps_iBattery]
		  ,g.[gps_iNivelSenial]
		  ,g.[gps_iSatelites]
		  ,g.[gps_iExtBattery],x.*,a.*,
		  isnull(sp.[Id],st.id) id
		  ,isnull(sp.[Telefono],st.[Telefono]) [Telefono]
		  ,isnull(sp.[Imei],st.[Imei]) [Imei]
		  ,isnull(sp.[Modelo],st.[Modelo]) [Modelo]
		  ,isnull(sp.[Marca],st.[Marca]) [Marca]
		  ,isnull(sp.[Version],st.[Version]) [Version]
		  ,isnull(sp.[Tipo],st.[Tipo]) [Tipo]
		  ,isnull(sp.[CuentaId],st.[CuentaId]) [CuentaId]
		  ,isnull(sp.[Nombre],st.[Nombre]) [Nombre]
		  ,isnull(sp.[Config],st.[Config]) [Config]
		  ,sp.[GrupoId]
		  ,sp.[Linea]
		  ,isnull(sp.[fechaAlta],st.[fechaAlta]) [fechaAlta]
		  ,sp.[awccUserId]
		  ,cxi.cue_ccustom,usu.*, zon.*, chp.*
		  ,not_mnotaprincipal
		  ,l.lin_crazonsocial,
		  isnull(st.Telefono,'') + isnull(tsp.tel_ctelefono,'') as DEVICE_PHONE,
			-- JUAN : Agregado para devolver for_cformato por error en Handler RedirectorTcpMlr2
			-- Pedido Hernan 14/09/2018, ver con Rodri
		  f.for_cformato,
		  x.rxt_cEvento,
		  tsp.*
		  ,isnull(dm.SIM1,'') [dm_SIM1]
		  ,isnull(dm.Domain,'') [dm_Domain]
		  ,isnull(rc.rec_cdll,'') [rec_cdll]
		  ,isnull(rxl.rxl_cLog,'') [rxl_cLog]
		  ,isnull(tip.tip_cdescripcion,'') tip_cdescripcion,
		  sp.Id AS rapidsos_id
		from _datos..p_recepcion e
    		inner join _datos..m_cuentas c WITH (NOLOCK) on (c.cue_iid = e.rec_iidCuenta)
			inner join _Tablas..t_lineas l WITH (NOLOCK) on (c.cue_clinea = l.lin_ccodigo)
			inner join _Tablas..t_tipos tip WITH (NOLOCK) on (c.cue_ctipo = tip.tip_ccodigo)
			left join _datos..m_formatos f WITH (NOLOCK) on (e.rec_calarma = f.for_calarma)
    		left outer join _datos..p_posicionesgps g WITH (NOLOCK) on (g.gps_idrec = e.rec_iid)
			left join _datos..p_RXtraInfo x on (x.rxt_iRecId = e.rec_iid)
			left join _tablas..t_codigos_alarma a WITH (NOLOCK) on (a.cod_ccodigo = e.rec_calarma)
			left join _datos..SmartTrack st WITH (NOLOCK) on (st.Imei = x.rxt_cimei and x.rxt_cimei is not null and x.rxt_cimei !='')
			left join _datos..SmartPanic sp WITH (NOLOCK) on (sp.Imei = x.rxt_cimei and x.rxt_cimei is not null and x.rxt_cimei !='')
			left join _datos..m_cuentasxtrainfo cxi WITH (NOLOCK) on (e.rec_iidcuenta = cxi.cue_iidcuenta)
			left join _datos..m_notas n WITH (NOLOCK) on (e.rec_iidcuenta = n.not_iidcuenta)
			left join _datos..m_usuarios usu WITH (NOLOCK) on (e.rec_iusuario = usu.usu_icodigo and e.rec_iidcuenta = usu_iidcuenta)
			left join _datos..m_telefonos tsp WITH ( NOLOCK ) on tsp.tel_iid = usu_iid-700 AND tsp.tel_iidcuenta = c.cue_iid
			left join _datos..m_zonas zon WITH (NOLOCK) on (e.rec_czona = zon.zon_ccodigo and e.rec_iidcuenta = zon_iidcuenta)
			left join _tablas..t_checkpoints_vc chp WITH (NOLOCK)  on (chp_czona = e.rec_czona and chp_icuenta = e.rec_iidcuenta)
			left join _datos..DispositivoMovil dm WITH (NOLOCK) on (dm.OwnerId = c.cue_iid)
			left join [_Datos].[dbo].[m_receptores_cab] rc on rc.[rec_iid] = e.[rec_idReceptor]
			left Join _datos..p_RXLog rxl On rxl_iRecId=e.rec_iid
		where e.rec_iid = @rec_iid
	END
	ELSE
	BEGIN
		Declare @table nVARCHAR(20) = 'p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112)
		DECLARE @Sql nVARCHAR(MAX) = ''
		DECLARE @fields nVARCHAR(MAX) = ''
		DECLARE @Joins nVARCHAR(MAX) = ''
		
		Set @fields = 'e.* ,DATEDIFF(s,''1970-01-01'',convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (e.rec_tfechahora,DATENAME(TZoffset, SYSDATETIMEOFFSET())),0))) * convert(bigint, 1000) as rec_tfechahoraEpoch
		  ,convert(datetime,SWITCHOFFSET (TODATETIMEOFFSET (e.rec_tfechahora,DATENAME(TZoffset, SYSDATETIMEOFFSET())),0)) as rec_tfechahoraGMT
		  ,c.*,g.[gps_iid]
		  ,g.[gps_idCuenta]
		  ,g.[gps_idRec]
		  ,g.[gps_rLatitud]
		  ,g.[gps_rLongitud]
		  ,g.[gps_iRumbo]
		  ,g.[gps_tRawfechahora]
		  ,g.gps_tfechahora
		  ,g.[gps_iVelocidad]
		  ,g.[gps_iOdometro]
		  ,g.[gps_cDireccion]
		  ,g.[gps_cIMEI]
		  ,g.[gps_rAccuracy]
		  ,g.[gps_cMethod]
		  ,g.[gps_iBattery]
		  ,g.[gps_iNivelSenial]
		  ,g.[gps_iSatelites]
		  ,g.[gps_iExtBattery],x.*,a.*,
		  isnull(sp.[Id],st.id) id
		  ,isnull(sp.[Telefono],st.[Telefono]) [Telefono]
		  ,isnull(sp.[Imei],st.[Imei]) [Imei]
		  ,isnull(sp.[Modelo],st.[Modelo]) [Modelo]
		  ,isnull(sp.[Marca],st.[Marca]) [Marca]
		  ,isnull(sp.[Version],st.[Version]) [Version]
		  ,isnull(sp.[Tipo],st.[Tipo]) [Tipo]
		  ,isnull(sp.[CuentaId],st.[CuentaId]) [CuentaId]
		  ,isnull(sp.[Nombre],st.[Nombre]) [Nombre]
		  ,isnull(sp.[Config],st.[Config]) [Config]
		  ,sp.[GrupoId]
		  ,sp.[Linea]
		  ,isnull(sp.[fechaAlta],st.[fechaAlta]) [fechaAlta]
		  ,sp.[awccUserId]
		  ,cxi.cue_ccustom,usu.*, zon.*, chp.*
		  ,not_mnotaprincipal
		  ,l.lin_crazonsocial,
		  isnull(st.Telefono,'''') + isnull(tsp.tel_ctelefono,'''') as DEVICE_PHONE,
		  f.for_cformato,
		  x.rxt_cEvento,
		  tsp.*
		  ,isnull(dm.SIM1,'''') [dm_SIM1]
		  ,isnull(dm.Domain,'''') [dm_Domain]
		  ,isnull(rc.rec_cdll,'''') [rec_cdll]
		  ,isnull(rxl.rxl_cLog,'''') [rxl_cLog]
		  ,isnull(tip.tip_cdescripcion,'''') tip_cdescripcion,
		  sp.Id AS rapidsos_id'

		set @joins ='
    		inner join _datos..m_cuentas c WITH (NOLOCK) on (c.cue_iid = e.rec_iidCuenta)
			inner join _Tablas..t_lineas l WITH (NOLOCK) on (c.cue_clinea = l.lin_ccodigo)
			inner join _Tablas..t_tipos tip WITH (NOLOCK) on (c.cue_ctipo = tip.tip_ccodigo)
			left join _datos..m_formatos f WITH (NOLOCK) on (e.rec_calarma = f.for_calarma)
    		left outer join _datos..p_posicionesgps g WITH (NOLOCK) on (g.gps_idrec = e.rec_iid)
			left join _datos..p_RXtraInfo x on (x.rxt_iRecId = e.rec_iid)
			left join _tablas..t_codigos_alarma a WITH (NOLOCK) on (a.cod_ccodigo = e.rec_calarma)
			left join _datos..SmartTrack st WITH (NOLOCK) on (st.Imei = x.rxt_cimei and x.rxt_cimei is not null and x.rxt_cimei !='''')
			left join _datos..SmartPanic sp WITH (NOLOCK) on (sp.Imei = x.rxt_cimei and x.rxt_cimei is not null and x.rxt_cimei !='''')
			left join _datos..m_cuentasxtrainfo cxi WITH (NOLOCK) on (e.rec_iidcuenta = cxi.cue_iidcuenta)
			left join _datos..m_notas n WITH (NOLOCK) on (e.rec_iidcuenta = n.not_iidcuenta)
			left join _datos..m_usuarios usu WITH (NOLOCK) on (e.rec_iusuario = usu.usu_icodigo and e.rec_iidcuenta = usu_iidcuenta)
			left join _datos..m_telefonos tsp WITH ( NOLOCK ) on tsp.tel_iid = usu_iid-700 AND tsp.tel_iidcuenta = c.cue_iid
			left join _datos..m_zonas zon WITH (NOLOCK) on (e.rec_czona = zon.zon_ccodigo and e.rec_iidcuenta = zon_iidcuenta)
			left join _tablas..t_checkpoints_vc chp WITH (NOLOCK)  on (chp_czona = e.rec_czona and chp_icuenta = e.rec_iidcuenta)
			left join _datos..DispositivoMovil dm WITH (NOLOCK) on (dm.OwnerId = c.cue_iid)
			left join [_Datos].[dbo].[m_receptores_cab] rc on rc.[rec_iid] = e.[rec_idReceptor]
			left Join _datos..p_RXLog rxl On rxl_iRecId=e.rec_iid '

		Set @Sql= 'select top 1 '+@fields+' from _datos..' + Ltrim(@table) +' e ' + @Joins +' where e.rec_iid = @rec_iid';
	
		--Print @sql 

		EXEC sp_executesql @Sql, N'@rec_iid INT', @rec_iid = @rec_iid;
	
	END
END