CREATE OR ALTER PROCEDURE [dbo].[IPRS_parking_speed_checking]
	@cCuenta [varchar](10) = ''
--WITH EXECUTE AS CALLER
AS
BEGIN

	 select r.*,tgc.* from _datos..p_recepcion r
	inner join _datos..m_cuentas c on r.rec_iidcuenta=c.cue_iid
	left join _datos..m_dealer_tgconfig tgc on c.cue_clinea=tgc.dtg_cdealer
	and (r.rec_calarma like '%'+tgc.dtg_parking_eventos_hide+'%')
	left join  _datos..p_posicionesgps  pgps  on pgps.gps_idRec = r.rec_iid
	and tgc.dtg_parking_velocidad<pgps.gps_iVelocidad
	where c.cue_clinea=@cCuenta and tgc.dtg_cdealer is not null or pgps.gps_idRec is not null
END