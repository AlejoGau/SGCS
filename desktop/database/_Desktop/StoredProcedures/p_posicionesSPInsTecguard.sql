/*
Basado en p_posicionesSPIns, pero aceptando tipos de valores no INT
{
  "Name": null,
  "sp_cIMEI": "tecnicoadmin@aholgado.com",
  "sp_iBatt": 100,
  "sp_iOdometro": 30000.500,
  "sp_iRumbo": 15.123,
  "sp_iSecuencia": 0,
  "sp_iVelocidad": 8.33,
  "sp_rAccuracy": 12.31,
  "sp_rLatitud": "-34.6092567",
  "sp_rLongitud": "-58.4372305",
  "sp_reciid": 0,
  "sp_tfechahora": "2026-03-19T19:21:00.999Z-0300"
}
*/
CREATE OR ALTER PROCEDURE [dbo].[p_posicionesSPInsTecguard]
@Name NVARCHAR(128)='',
@sp_tfechahora NVARCHAR(80) = N'',
@sp_cIMEI NVARCHAR(128) = '',
@sp_rLatitud NVARCHAR(50) = N'0',
@sp_rLongitud NVARCHAR(50) = N'0',
@sp_rAccuracy NVARCHAR(50) = N'0',
@sp_iVelocidad NVARCHAR(50) = N'0',
@sp_iRumbo NVARCHAR(50) = N'0',
@sp_iOdometro NVARCHAR(50) = N'0',
@sp_iBatt NVARCHAR(50) = N'0',
@sp_iSecuencia Int = 0,
@sp_reciid Int = 0,
@geoTracking int = 0,
@token VARCHAR(128) = '',
@mock NVARCHAR(MAX) = N''

AS
Set NoCount on

if (@token is null OR @token = '')
BEGIN
    RAISERROR('Token Invalido: %s', 16, 1, @token);
    RETURN;
END

declare @geo_rec_iid int = 0

--2019-09-16 Rodrigo : me fijo si tengo qe crear el evento SPP
declare @CuentaID int
Select @CuentaID = CuentaId From _datos.[dbo].[SmartPanic] With (NOLOCK) Where [IMEI]=@sp_cIMEI

-- 2021-09-02 Mauro: Agrego para consultar tambien en VC.
if @CuentaID is null or @CuentaID = 0
	Select @CuentaID = CuentaId From _datos.[dbo].[SmartTrack] With (NOLOCK) Where [IMEI]=@sp_cIMEI 

-- Normalizo coma/punto y espacios
DECLARE @lat_s NVARCHAR(50) = REPLACE(LTRIM(RTRIM(@sp_rLatitud)),  N',', N'.');
DECLARE @lon_s NVARCHAR(50) = REPLACE(LTRIM(RTRIM(@sp_rLongitud)), N',', N'.');
DECLARE @vel_s NVARCHAR(50) = REPLACE(LTRIM(RTRIM(@sp_iVelocidad)),N',', N'.');
DECLARE @rum_s NVARCHAR(50) = REPLACE(LTRIM(RTRIM(COALESCE(@sp_iRumbo, N'0'))), N',', N'.');
DECLARE @odo_s NVARCHAR(50) = REPLACE(LTRIM(RTRIM(@sp_iOdometro)), N',', N'.');
DECLARE @batt_s NVARCHAR(50) = REPLACE(LTRIM(RTRIM(COALESCE(@sp_iBatt, N'0'))), N',', N'.');

-- Normalizo fecha
SET @sp_tfechahora = COALESCE(NULLIF(LTRIM(RTRIM(@sp_tfechahora)), N''), N'');

DECLARE @dtOff DATETIMEOFFSET(7) = NULL;

--------------------------------------------------------------------
-- 1) ISO válido con offset tipo -03:00
--------------------------------------------------------------------
SET @dtOff = TRY_CONVERT(DATETIMEOFFSET(7), @sp_tfechahora);

--------------------------------------------------------------------
-- 2) ISO con offset sin ":"  (ej: ...-0300)
--------------------------------------------------------------------
IF @dtOff IS NULL
   AND LEN(@sp_tfechahora) >= 5
   AND RIGHT(@sp_tfechahora,5) LIKE N'[+-][0-9][0-9][0-9][0-9]'
BEGIN
    DECLARE @s2 NVARCHAR(80) = STUFF(@sp_tfechahora, LEN(@sp_tfechahora)-1, 0, N':'); -- -0300 -> -03:00
    SET @dtOff = TRY_CONVERT(DATETIMEOFFSET(7), @s2);
END

--------------------------------------------------------------------
-- 3) Formato inválido "....Z-0300" (UTC + zona al final)
--    Ej: 2026-03-19T19:21:00.999Z-0300
--    Lo interpreto como:
--      - base UTC: 2026-03-19T19:21:00.999Z
--      - zona destino: -03:00  => local 16:21
--------------------------------------------------------------------
IF @dtOff IS NULL
   AND LEN(@sp_tfechahora) >= 6
   AND RIGHT(@sp_tfechahora,6) LIKE N'Z[+-][0-9][0-9][0-9][0-9]'
BEGIN
    DECLARE @off NVARCHAR(5) = RIGHT(@sp_tfechahora,5);              -- -0300
    DECLARE @base NVARCHAR(80) = LEFT(@sp_tfechahora, LEN(@sp_tfechahora)-5); -- ...Z

    -- convierto ...Z a ...+00:00 para que SQL lo parsee seguro
    DECLARE @baseUtc NVARCHAR(80) =
        CASE WHEN RIGHT(@base,1) = N'Z'
             THEN LEFT(@base, LEN(@base)-1) + N'+00:00'
             ELSE @base
        END;

    DECLARE @utcOff DATETIMEOFFSET(7) = TRY_CONVERT(DATETIMEOFFSET(7), @baseUtc);

    IF @utcOff IS NOT NULL
    BEGIN
        DECLARE @offColon NVARCHAR(6) = STUFF(@off, 4, 0, N':');  -- -0300 -> -03:00
        SET @dtOff = SWITCHOFFSET(@utcOff, @offColon);
    END
END

--------------------------------------------------------------------
-- 4) Fallback formato local (ej: 18/3/2026 15:33:00)
--------------------------------------------------------------------
IF @dtOff IS NULL
BEGIN
    DECLARE @dtLocal DATETIME2(0) = TRY_PARSE(@sp_tfechahora AS DATETIME2(0) USING 'es-AR');
    IF @dtLocal IS NOT NULL
        SET @dtOff = TODATETIMEOFFSET(@dtLocal, -180); -- -03:00 en minutos
END

IF @dtOff IS NULL
BEGIN
    RAISERROR('sp_tfechahora inválida: %s', 16, 1, @sp_tfechahora);
    RETURN;
END

-- Guardar como DATETIME (hora local)
DECLARE @sp_tfechahora_dt DATETIME = CONVERT(DATETIME, @dtOff);

-- Parse seguro
DECLARE @lat REAL = TRY_CONVERT(REAL, @lat_s);
DECLARE @lng REAL = TRY_CONVERT(REAL, @lon_s);

-- Detecto "entero puro" = no tiene punto y convierte a INT
DECLARE @vel_int INT = TRY_CONVERT(INT, @vel_s);
DECLARE @rum_int INT = TRY_CONVERT(INT, @rum_s);
DECLARE @odo_int INT = TRY_CONVERT(INT, @odo_s);

DECLARE @vel_es_entero BIT = CASE WHEN @vel_int IS NOT NULL AND CHARINDEX(N'.', @vel_s) = 0 THEN 1 ELSE 0 END;
DECLARE @rum_es_entero BIT = CASE WHEN @rum_int IS NOT NULL AND CHARINDEX(N'.', @rum_s) = 0 THEN 1 ELSE 0 END;
DECLARE @odo_es_entero BIT = CASE WHEN @odo_int IS NOT NULL AND CHARINDEX(N'.', @odo_s) = 0 THEN 1 ELSE 0 END;

-- Parse decimal (sirve tanto para enteros como decimales)
DECLARE @vel_dec DECIMAL(18,6) = TRY_CONVERT(DECIMAL(18,6), @vel_s);
DECLARE @rum_dec DECIMAL(18,6) = TRY_CONVERT(DECIMAL(18,6), @rum_s);
DECLARE @odo_dec DECIMAL(18,3) = TRY_CONVERT(DECIMAL(18,3), @odo_s);

IF @vel_dec IS NULL OR @rum_dec IS NULL OR @odo_dec IS NULL
BEGIN
	RAISERROR('Parametros inválidos: vel=%s rum=%s odo=%s', 16, 1, @sp_iVelocidad, @sp_iRumbo, @sp_iOdometro);
	RETURN;
END

-- RESULTADOS finales (INT) con conversión condicional
DECLARE @VelocidadFinal INT;
DECLARE @RumboFinal     INT;
DECLARE @OdometroFinal  INT;

-- Velocidad:
-- - si viene entero => ya es km/h
-- - si viene decimal => viene en m/s y se convierte a km/h
SET @VelocidadFinal =
	CASE WHEN @vel_es_entero = 1
			THEN @vel_int
			ELSE CONVERT(INT, ROUND(@vel_dec * 3.6, 0))
	END;

-- Rumbo:
-- - entero => queda igual
-- - decimal => redondeo a grados enteros
SET @RumboFinal =
	CASE WHEN @rum_es_entero = 1
			THEN @rum_int
			ELSE CONVERT(INT, ROUND(ISNULL(@rum_dec, 0), 0))
	END;

SET @RumboFinal =
    CASE
        WHEN @RumboFinal < 0 THEN 0
        WHEN @RumboFinal >= 360 THEN @RumboFinal % 360
        ELSE @RumboFinal
    END;

-- Odómetro:
-- - entero => ya es km
-- - decimal => viene en metros y se convierte a km
SET @OdometroFinal =
	CASE WHEN @odo_es_entero = 1
			THEN @odo_int
			ELSE CONVERT(INT, ROUND(@odo_dec / 1000.0, 0))
	END;

-- Normalizo accuracy
SET @sp_rAccuracy = COALESCE(NULLIF(LTRIM(RTRIM(@sp_rAccuracy)), N''), N'0');
IF LOWER(@sp_rAccuracy) = N'null' SET @sp_rAccuracy = N'0';

DECLARE @AccuracyFinal REAL = TRY_CONVERT(REAL, REPLACE(@sp_rAccuracy, N',', N'.'));
IF @AccuracyFinal IS NULL
BEGIN
    RAISERROR('Accuracy inválida: %s', 16, 1, @sp_rAccuracy);
    RETURN;
END


-- Battery puede llegar asi "sp_iBatt":0.44
IF @batt_s = N'' OR LOWER(@batt_s) = N'null'
    SET @batt_s = N'0';

DECLARE @batt_dec DECIMAL(18,6) = TRY_CONVERT(DECIMAL(18,6), @batt_s);
IF @batt_dec IS NULL
    SET @batt_dec = 0;

-- Si viene en fracción (0..1) y trae decimal => interpretarlo como porcentaje
DECLARE @BattFinal INT = CONVERT(INT, CEILING(@batt_dec * 100.0));

-- Clamp opcional (si tu modelo es 0..100)
IF @BattFinal < 0   SET @BattFinal = 0;
IF @BattFinal > 100 SET @BattFinal = 100;

-- Desde acá usás @VelocidadFinal, @RumboFinal, @OdometroFinal, @BattFinal
/*
Print '-----'
Print @VelocidadFinal
Print @RumboFinal
Print @OdometroFinal
Print @BattFinal
Print '-----'
*/

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
		@lat = @Lat,
		@lng  = @Lng,
		@imei = @sp_cIMEI,
		@rumbo = @RumboFinal,
		@iOdometro = @OdometroFinal,
		@rAccuracy = @AccuracyFinal,
		@iBattery = @BattFinal,
		@rawFechaHora = @sp_tfechahora_dt,
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
		values ( @sp_tfechahora_dt, @sp_cIMEI, @Lat, @Lng, @AccuracyFinal, @VelocidadFinal, @RumboFinal, @OdometroFinal, @BattFinal, @sp_iSecuencia, @sp_reciid)

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