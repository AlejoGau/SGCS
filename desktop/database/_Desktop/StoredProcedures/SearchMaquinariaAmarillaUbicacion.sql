-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SearchMaquinariaAmarillaUbicacion]
	-- Add the parameters for the stored procedure here
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort VARCHAR(256) = '',   
	@group VARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT,
	@gps_idrec int = 0,
	@gps_iid int = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    IF (@gps_idrec != 0)
	BEGIN
	select gps_iid as id_trama
        ,LTRIM(RTRIM('TLGD000000000000' + '0275' /*c.cue_ncuenta*/)) as id_dispositivo
    	,'CL' as transmision
    	,g.gps_rLatitud as latitud
    	,g.gps_rLongitud as longitud
    	,g.gps_ivelocidad as velocidad
    	,'' as direccion
    	,g.gps_tfechahora as fecha
    	,9 as evento --e.rec_calarma as evento
    	,0 as ignicion
    	,1 as status
    	,0 as odometro
		,'146.148.73.61' as ip
		,'3508' as puerto
    from _datos..p_posicionesgps g
    	inner join _datos..m_cuentas c on (c.cue_iid = g.gps_idCuenta)
    	left outer join _datos..p_recepcion e on (g.gps_idrec = e.rec_iid)
    where gps_idrec = @gps_idrec
	END
	ELSE
	BEGIN
	select gps_iid as id_trama
        ,LTRIM(RTRIM('TLGD000000000000' + c.cue_ncuenta)) as id_dispositivo
    	,'CL' as transmision
    	,g.gps_rLatitud as latitud
    	,g.gps_rLongitud as longitud
    	,g.gps_ivelocidad as velocidad
    	,'' as direccion
    	,g.gps_tfechahora as fecha
    	,9 as evento --e.rec_calarma as evento
    	,0 as ignicion
    	,1 as status
    	,0 as odometro
		,'146.148.73.61' as ip
		,'3508' as puerto
    from _datos..p_posicionesgps g
    	inner join _datos..m_cuentas c on (c.cue_iid = g.gps_idCuenta)
    	left outer join _datos..p_recepcion e on (g.gps_idrec = e.rec_iid)
    where gps_iid = @gps_iid
	END
END