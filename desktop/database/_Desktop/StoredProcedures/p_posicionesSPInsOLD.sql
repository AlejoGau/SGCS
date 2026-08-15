--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2026-03-18 15:34:05.165 
--#############################################################################
/*
{
    "Name": null,
    "sp_cIMEI": "tecnico@tecguard.com",
    "sp_iBatt": 100,
    "sp_iOdometro": 0,
    "sp_iRumbo": 90,
    "sp_iSecuencia": 0,
    "sp_iVelocidad": 0,
    "sp_rAccuracy": 3.32,
    "sp_rLatitud": 33.9858055,
    "sp_rLongitud": -118.254112,
    "sp_reciid": 0,
    "sp_tfechahora": "/Date(1624924834573-0300)/"
}
*/
CREATE OR ALTER PROCEDURE [dbo].[p_posicionesSPInsOLD]
@Name NVARCHAR(128)='',
@sp_tfechahora DateTime = 0,
@sp_cIMEI NVARCHAR(128) = '',
@sp_rLatitud  Real = 0,
@sp_rLongitud  Real = 0,
@sp_rAccuracy  Real = 0,
@sp_iVelocidad Int = 0,
@sp_iRumbo Int = 0,
@sp_iOdometro Int = 0,
@sp_iBatt Int = 0,
@sp_iSecuencia Int = 0,
@sp_reciid Int = 0,
@geoTracking int = 0
AS
set noCount on

declare @geo_rec_iid int = 0

--2019-09-16 Rodrigo : me fijo si tengo qe crear el evento SPP
declare @CuentaID int
Select @CuentaID = CuentaId From _datos.[dbo].[SmartPanic] With (NOLOCK) Where [IMEI]=@sp_cIMEI

-- 2021-09-02 Mauro: Agrego para consultar tambien en VC.
if @CuentaID is null or @CuentaID = 0
	Select @CuentaID = CuentaId From _datos.[dbo].[SmartTrack] With (NOLOCK) Where [IMEI]=@sp_cIMEI 

declare @iid int;
declare @cod_nalerta int
SELECT @cod_nalerta = cod_nalerta FROM  _Tablas.dbo.t_codigos_alarma WITH (NOLOCK)	WHERE  cod_ccodigo = 'SPP';
--- si no tiene evento y SPP esta con genera evento, genero el evento de seguimiento.
If @cod_nalerta!=2 and @CuentaID>0
BEGIN 

	--print '[TG_INS_TesteoSP] busco el usuario para el evento'
	declare @idUsuario int
	SELECT @idUsuario = IsNull(u.usu_icodigo,0)
		FROM _datos..m_telefonos
	INNER JOIN _datos..smartpanic s ON (tel_iidcuenta = cuentaId)
	INNER JOIN _datos..m_usuarios u ON (u.usu_icodigo = tel_iid + 700 AND u.usu_iidcuenta = cuentaid)
	WHERE s.imei = @sp_cIMEI 
		AND right(tel_ctelefono, 8) = right(s.telefono, 8)

	-- 2021-09-02 Mauro: Agrego para buscar el usuario en Vigicontrol
	if @idUsuario is null or @idUsuario = 0
	BEGIN
		SELECT @idUsuario = IsNull(u.usu_icodigo,0)
			from _datos..VigicontrolUserCurrentSession c
		INNER JOIN _datos..[SmartTrack] V ON (c.vucs_vcid = v.Id)
		inner join _datos..m_usuarios u on u.usu_idKey = c.vucs_usuidkey
		WHERE V.imei = @sp_cIMEI
	END

	--print '[TG_INS_TesteoSP] genero evento SPP'
	declare @idrec int

	--declare @temp table (result int)
	--insert into @temp 
	EXECUTE [_Desktop].[dbo].[AlarmaGenerar] 
		@idCta = @CuentaID,
		@cAlarma = 'SPP',
		@lat = @sp_rLatitud,
		@lng  = @sp_rLongitud,
		@imei = @sp_cIMEI,
		@rumbo = @sp_iRumbo,
		@iOdometro = @sp_iOdometro,
		@rAccuracy = @sp_rAccuracy,
		@iBattery = @sp_iBatt,
		@rawFechaHora = @sp_tfechahora,
		@idUsuario = @idUsuario,
		@rec_iid =  @idRec OUTPUT

	--2018-04-25 : Pablo. Cambie por merge
	MERGE INTO [_Datos].[dbo].[p_RXtraInfo] AS TGT
	USING ( Select 1 As nSPIP, @idRec As iRecId ,@sp_cIMEI as cImei ) AS SRC 
		ON TGT.[rxt_iRecId] = SRC.[iRecId]
	WHEN MATCHED THEN
		UPDATE SET
			TGT.[rxt_nSPIP] = SRC.[nSPIP],
			TGT.[rxt_cImei] = SRC.[cImei]
 	WHEN NOT MATCHED THEN 
		INSERT ([rxt_iRecId],[rxt_nSPIP],[rxt_cImei])
		VALUES (SRC.[iRecId],SRC.[nSPIP],SRC.[cImei]);

		
	--print 'busco la posicion del evento'
	select @iid = sp_iid from [_Datos]..[p_posicionesSP] where sp_reciid = @idRec
	--print @iid

END
ELSE
BEGIN
	Insert into [_Datos]..[p_posicionesSP] ([sp_tfechahora],[sp_cIMEI],[sp_rLatitud],[sp_rLongitud],[sp_rAccuracy],[sp_iVelocidad],[sp_iRumbo],[sp_iOdometro],[sp_iBatt],[sp_iSecuencia],[sp_reciid])
		values ( @sp_tfechahora, @sp_cIMEI, @sp_rLatitud, @sp_rLongitud, @sp_rAccuracy, @sp_iVelocidad, @sp_iRumbo, @sp_iOdometro, @sp_iBatt, @sp_iSecuencia, @sp_reciid)

	select @iid = scope_identity()			
END

-- Me fijo si estoy en geotracking para modificar la respuesta
if @geoTracking = 1
BEGIN
	-- me fijo si hay un evento de geocerca pendiente para ese imei
	select @geo_rec_iid = e.rec_iid
		from _datos..p_recepcion r
	inner join _datos..EventosPendientes e on r.rec_iid = e.rec_iid
	inner join _datos..p_PosicionesGPS gps on gps.gps_idRec = e.rec_iid
	where e.rec_calarma in ('_IG','_ER','_EG')
		and gps.gps_cIMEI = @sp_cIMEI
END

if @geoTracking = 1 AND @geo_rec_iid = 0
	select 'true' as error, 'No hay geocerca pendiente' as message
ELSE
	exec p_posicionesSPSel @iid