CREATE OR ALTER PROCEDURE [dbo].[IPRS_GetCue_iid]
	@ccuenta [varchar](10)= '',
	@imei [varchar](200) = '',
	@iPuerto [int] = 0,
	@cIdCtaExtendido [varchar](100) = '',
	@iConexion [int] = 0,
	@cDll [varchar](50) = '',
	@ProtocolModel [varchar](150) = '',
	@cue_iid [int] = 0 OUTPUT,
	@cue_clinea [char](3) = '' OUTPUT,
	@cue_cProvincia [char](3) = '' OUTPUT,
	@cDebug Char(2) = 'No'	--'Si' 
WITH EXECUTE AS CALLER
AS
--2023-12-06 : Se agrego pre busqueda por conexion
SET NOCOUNT ON;

DECLARE @iParametro INT = IsNull((SELECT par_ivalor	FROM _Tablas.dbo.t_parametros WITH (NOLOCK)	WHERE par_cCodigo = 'IDEXTENDIDO'), 0)
DECLARE @iPar INT = IsNull((SELECT par_ivalor	FROM _Tablas.dbo.t_parametros WITH (NOLOCK)	WHERE par_cCodigo = 'SINCNXRESEXT'), 0)

Declare @message nVarChar(Max) = '',
	@StartDateTimeText nVarChar(max)=''

Declare @idINTE Int = 0
Select TOP 1 @idINTE = cue_iid, @cue_clinea = '_SG', @cue_cProvincia = cue_cProvincia
	From _Datos.dbo.m_cuentas
Where cue_clinea='_SG' And cue_ncuenta = 'INTE' 

Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] IDEXTENDIDO en : '+Cast(@iParametro As Char(2))
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Declare @bTieneConexionAsociada Int = 0	
If @iPuerto > 1000 And @iConexion > 0
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Busco por Conexion : ' + CONVERT(VARCHAR(10), @iConexion)
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Select TOP 1 @bTieneConexionAsociada = [cco_iidCuenta]
		From  [_Datos].[dbo].[m_CuentasConn] 
		Where [cco_iConexion] = @iConexion
End

If (@bTieneConexionAsociada > 0)
Begin
	--Entra por aca x que hay cuentas que tienen asignada la conexion
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Encontro la Conexion Asociada a alguna/s cuenta/s'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF @iParametro IN(1,2) AND @cIdCtaExtendido <> ''
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] IDEXTENDIDO en Si. Busco por IdCtaExtendido'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Select Top 1 @cue_iid = cue_iid,
			@cue_clinea = cue_clinea,
			@cue_cProvincia = cue_cProvincia
		FROM _Datos.dbo.m_cuentas
			Inner Join [_Datos].[dbo].[m_CuentasConn] On [cco_iidCuenta]=[cue_iid]
		Where [cco_iConexion] = @iConexion And
			  cue_cIdExtendido LIKE '%' + Ltrim(Rtrim(@cIdCtaExtendido)) + '%'

		IF (@cue_iid IS NULL OR @cue_iid = 0)
		Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] NO encontro IdCtaExtendido ('+@cIdCtaExtendido+'). Busco sin conexion'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			SELECT TOP 1 @cue_iid = cue_iid,
				@cue_clinea = cue_clinea,
				@cue_cProvincia = cue_cProvincia
			FROM _Datos.dbo.m_cuentas
			WHERE cue_cIdExtendido LIKE '%' + Ltrim(Rtrim(@cIdCtaExtendido)) + '%'
		End

		IF (@cue_iid IS NULL OR @cue_iid = 0)
		Begin
			If @iParametro = 2  --Si Unicamente		
				Begin
					--2023-01-25 : DS-489. Si no pudo resolver por IDExtendido no busca por otra via y lo manda a la _SG-INTE
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid]. IDEXTENDIDO en Si Unicamente no sigue buscando y lo manda a la _SG-INTE'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
									
					Set @cue_iid = @idINTE
					Set @cue_clinea = '_SG'
					Set @ccuenta = 'INTE'
				End
			Else
			Begin
				IF @cDebug = 'Si'
				Begin
					Print ' Execute [SGSP_IRSBuscoIdCuentaIP]'
					Print ' @iPuerto   : ' + CONVERT(VARCHAR(10), @iPuerto)
					Print ' @ccuenta   : ' + @ccuenta
					Print ' @iConexion : ' + CONVERT(VARCHAR(10), @iConexion)
				End

				EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoIdCuentaIP]
					@iPuerto = @iPuerto,
					@cCuenta = @cCuenta,
					@iConexion = @iConexion,
					@iIdCta = @cue_iid OUTPUT,
					@cLinea = @cue_clinea OUTPUT,
					@cue_cProvincia = @cue_cProvincia OUTPUT
			End
		End
	END
	ELSE
	BEGIN
		IF (@ccuenta IS NULL OR @ccuenta = '')
		BEGIN
			IF @imei <> ''
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  				
				IF (@cDll = 'SmartPanicsPacketParser' OR @cDll = 'SMARTPANIC')
				BEGIN
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Busco SmartPanic'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @cue_iid = MC.cue_iid, @ccuenta = MC.cue_ncuenta, @cue_clinea = MC.cue_clinea, @cue_cProvincia = MC.cue_cProvincia
						FROM _Datos.dbo.m_cuentas MC
					INNER JOIN _Datos.dbo.SmartPanic SP ON SP.CuentaId = MC.cue_iid
					Inner Join [_Datos].[dbo].[m_CuentasConn] On [cco_iidCuenta]=[cue_iid]
						Where [cco_iConexion] = @iConexion And SP.Imei = @imei
				END
				ELSE IF (@cDll = 'VigiControlPacketParser' OR @cDll = 'VIGICONTROL')
				BEGIN
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Busco VigiControl'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @cue_iid = MC.cue_iid, @ccuenta = MC.cue_ncuenta, @cue_clinea = MC.cue_clinea, @cue_cProvincia = MC.cue_cProvincia
						FROM _Datos.dbo.m_cuentas MC
					INNER JOIN _Datos..SmartTrack st ON st.CuentaId = MC.cue_iid
					Inner Join [_Datos].[dbo].[m_CuentasConn] On [cco_iidCuenta]=[cue_iid]
						Where [cco_iConexion] = @iConexion And st.Imei = @imei
				END
				ELSE IF (@cDll = 'EBSPacketParser')
				BEGIN
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Busco EBS'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @cue_iid = MC.cue_iid, @ccuenta = MC.cue_ncuenta, @cue_clinea = MC.cue_clinea, @cue_cProvincia = MC.cue_cProvincia
						FROM _Datos.dbo.m_cuentas MC
					INNER JOIN _Datos..SmartTrack st ON st.CuentaId = MC.cue_iid
					Inner Join [_Datos].[dbo].[m_CuentasConn] On [cco_iidCuenta]=[cue_iid]
						Where [cco_iConexion] = @iConexion And st.Imei = @imei
				END
				ELSE IF (@ProtocolModel = 'SmartPanicsPC')
				BEGIN
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Busco SmartPanicsPC'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @cue_iid = MC.cue_iid, @ccuenta = MC.cue_ncuenta, @cue_clinea = MC.cue_clinea, @cue_cProvincia = MC.cue_cProvincia
						FROM _Datos.dbo.m_cuentas MC WITH (NOLOCK)
					INNER JOIN _tablas..t_tipos WITH (NOLOCK) ON mc.cue_ctipo = tip_ccodigo
					Inner Join [_Datos].[dbo].[m_CuentasConn] On [cco_iidCuenta]=[cue_iid]
						Where [cco_iConexion] = @iConexion And mc.cue_cIMEI = @imei and tip_nTipo = 10
				END
				ELSE IF (@cDll = 'VivecarPacketParser')
				BEGIN
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Busco Vivecar'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @cue_iid = MC.cue_iid, @ccuenta = MC.cue_ncuenta, @cue_clinea = MC.cue_clinea, @cue_cProvincia = MC.cue_cProvincia
						FROM _Datos.dbo.m_cuentas MC
					INNER JOIN _Datos.dbo.SmartPanic SP ON SP.CuentaId = MC.cue_iid
					Inner Join [_Datos].[dbo].[m_CuentasConn] On [cco_iidCuenta]=[cue_iid]
						Where [cco_iConexion] = @iConexion And Right(SP.Telefono, 8) = Right(@imei, 8)
				END
				ELSE IF (@cDll = 'X28GprsPacketParser' And @ProtocolModel = 'Movilgate Webhook')
				Begin
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Es Movilgate Webhook, busco idCta en m_simcard'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
					SELECT TOP 1 @cue_iid = [sim_cuenta], @ccuenta = cue_ncuenta, @cue_clinea = cue_clinea,	@cue_cProvincia = cue_cProvincia
						FROM [_Datos].[dbo].[m_simcard]
					Inner Join [_Datos].[dbo].[m_cuentas] On [cue_iid]=[sim_cuenta]
						WHERE [sim_codigo] LIKE '%' + Ltrim(Rtrim(@cIdCtaExtendido)) + '%'
				End				

				IF (@cue_iid IS NULL OR @cue_iid = 0)
				BEGIN
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] No encontro idCta busco por IMEI de la cuenta'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @ccuenta = cue_ncuenta, @cue_iid = cue_iid, @cue_clinea = cue_clinea, @cue_cProvincia = cue_cProvincia
						FROM _Datos.dbo.m_cuentas
					Inner Join [_Datos].[dbo].[m_CuentasConn] On [cco_iidCuenta]=[cue_iid]
						Where [cco_iConexion] = @iConexion And PATINDEX('%'+convert(varchar(50),@imei)+'%' ,cue_cIMEI)>0 -- modificado para soportar N imei
				END
			END

			IF (@cue_iid IS NULL OR @cue_iid = 0)
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] No encontro idCta ejecuta [SGSP_IRSBuscoIdCuentaIP] para que busque con el valor del puerto y cuenta recibidos a que ID de Cuenta de SG pertenece el paquete'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
				IF @cDebug = 'Si'
				Begin
					Print ' Execute [SGSP_IRSBuscoIdCuentaIP]'
					Print ' @iPuerto   : ' + CONVERT(VARCHAR(10), @iPuerto)
					Print ' @ccuenta   : ' + @ccuenta
					Print ' @iConexion : ' + CONVERT(VARCHAR(10), @iConexion)
				End

				EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoIdCuentaIP]
					@iPuerto = @iPuerto,
					@cCuenta = @cCuenta,
					@iConexion = @iConexion,
					@iIdCta = @cue_iid OUTPUT,
					@cLinea = @cue_clinea OUTPUT,
					@cue_cProvincia = @cue_cProvincia OUTPUT
			END
		END
		Else If @imei != ''	--Pablo 02-05-2019 : Lo agregue x que si llega Cuenta y tambien IMEI, solo intentaba por cuenta
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] No encontro idCta busco por IMEI de la cuenta + conexion'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			SELECT TOP 1 @ccuenta = cue_ncuenta, @cue_iid = cue_iid, @cue_clinea = cue_clinea, @cue_cProvincia = cue_cProvincia
				FROM _Datos.dbo.m_cuentas
			Inner Join [_Datos].[dbo].[m_CuentasConn] On [cco_iidCuenta]=[cue_iid]
				Where [cco_iConexion] = @iConexion And PATINDEX('%'+convert(varchar(50),@imei)+'%' ,cue_cIMEI)>0 -- modificado para soportar N imei

			IF (@cue_iid IS NULL OR @cue_iid = 0)  	--Pablo 22-07-2025 : Si tiene IMEI pero no conexion no buscaba por IMEI solamente
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] No encontro idCta. busco por IMEI de la cuenta sin conexion'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
				SELECT TOP 1 @ccuenta = cue_ncuenta, @cue_iid = cue_iid, @cue_clinea = cue_clinea, @cue_cProvincia = cue_cProvincia
					FROM _Datos.dbo.m_cuentas
				Where PATINDEX('%'+convert(varchar(50),@imei)+'%' ,cue_cIMEI)>0
			End
		END
		Else If @cCuenta = '_SGINTE'
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Llego _SGINTE devuelvo cuenta interna'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @cue_iid = @idINTE
			Set @cue_clinea = '_SG'
			Set @ccuenta = 'INTE'
		END

		IF (@cue_iid IS NULL OR @cue_iid = 0)
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] No encontro idCta. Para aquellas conexiones que no usan IMEI se busca con el valor del puerto y cuenta recibidos a que ID de Cuenta de SG pertenece el paquete'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @cDebug = 'Si'
			Begin
				Print ' Execute [SGSP_IRSBuscoIdCuentaIP]'
				Print ' @iPuerto   : ' + CONVERT(VARCHAR(10), @iPuerto)
				Print ' @ccuenta   : ' + @ccuenta
				Print ' @iConexion : ' + CONVERT(VARCHAR(10), @iConexion)
			End

			EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoIdCuentaIP] 
				@iPuerto = @iPuerto,
				@cCuenta = @cCuenta,
				@iConexion = @iConexion,
				@iIdCta = @cue_iid OUTPUT,
				@cLinea = @cue_clinea OUTPUT,
				@cue_cProvincia = @cue_cProvincia OUTPUT
		END

	END
	--
End
Else
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] No existe Conexion Asociada a alguna cuenta'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If @iPar = 1  --Si no tiene en resolucion extendida la conexion por la que ingreso el evento se tiene que enviar a la INTE
	Begin
		--2026-01-22 : DK-1394
		Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] SINCNXRESEXT en Si no sigue buscando y lo manda a la _SG-INTE'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
		Set @cue_iid = @idINTE
		Set @cue_clinea = '_SG'
		Set @ccuenta = 'INTE'
	End
End

IF (@cue_iid IS NULL OR @cue_iid = 0)
Begin
	IF @iParametro IN(1,2) AND @cIdCtaExtendido <> ''
	BEGIN
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] IDEXTENDIDO en Si. Busco por IdCtaExtendido'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		IF (@cDll = 'X28GprsPacketParser' And @ProtocolModel = 'Movilgate Webhook')
			Begin
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Es Movilgate Webhook, busco idCta en m_simcard'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			SELECT TOP 1 @cue_iid = [sim_cuenta],
				@cue_clinea = cue_clinea,
				@cue_cProvincia = cue_cProvincia
			FROM [_Datos].[dbo].[m_simcard]
			Inner Join [_Datos].[dbo].[m_cuentas] On [cue_iid]=[sim_cuenta]
			WHERE [sim_codigo] LIKE '%' + Ltrim(Rtrim(@cIdCtaExtendido)) + '%'
		End
		Else
		Begin
			SELECT TOP 1 @cue_iid = cue_iid,
				@cue_clinea = cue_clinea,
				@cue_cProvincia = cue_cProvincia
			FROM _Datos.dbo.m_cuentas
			WHERE cue_cIdExtendido LIKE '%' + Ltrim(Rtrim(@cIdCtaExtendido)) + '%'
		End

		IF (@cue_iid IS NULL OR @cue_iid = 0)
		Begin
			If @iParametro = 2  --Si Unicamente		
				Begin
					--2023-01-25 : DS-489. Si no pudo resolver por IDExtendido no busca por otra via y lo manda a la _SG-INTE
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid]. IDEXTENDIDO en Si Unicamente no sigue buscando y lo manda a la _SG-INTE'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
									
					Set @cue_iid = @idINTE
					Set @cue_clinea = '_SG'
					Set @ccuenta = 'INTE'
				End
			Else
			Begin
				IF @cDebug = 'Si'
				Begin
					Print ' Execute [SGSP_IRSBuscoIdCuentaIP]'
					Print ' @iPuerto   : ' + CONVERT(VARCHAR(10), @iPuerto)
					Print ' @ccuenta   : ' + @ccuenta
					Print ' @iConexion : ' + CONVERT(VARCHAR(10), @iConexion)
				End

				EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoIdCuentaIP]
					@iPuerto = @iPuerto,
					@cCuenta = @cCuenta,
					@iConexion = @iConexion,
					@iIdCta = @cue_iid OUTPUT,
					@cLinea = @cue_clinea OUTPUT,
					@cue_cProvincia = @cue_cProvincia OUTPUT
			End
		End
	END
	ELSE
	BEGIN
		IF (@ccuenta IS NULL OR @ccuenta = '')
		BEGIN
			IF @imei <> ''
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  				
				IF (@cDll = 'SmartPanicsPacketParser' OR @cDll = 'SMARTPANIC')
				BEGIN
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Busco SmartPanic'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @cue_iid = MC.cue_iid, @ccuenta = MC.cue_ncuenta, @cue_clinea = MC.cue_clinea, @cue_cProvincia = MC.cue_cProvincia
						FROM _Datos.dbo.m_cuentas MC
					INNER JOIN _Datos.dbo.SmartPanic SP ON SP.CuentaId = MC.cue_iid
						WHERE SP.Imei = @imei
				END
				ELSE IF (@cDll = 'VigiControlPacketParser' OR @cDll = 'VIGICONTROL')
				BEGIN
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Busco VigiControl'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @cue_iid = MC.cue_iid, @ccuenta = MC.cue_ncuenta, @cue_clinea = MC.cue_clinea, @cue_cProvincia = MC.cue_cProvincia
						FROM _Datos.dbo.m_cuentas MC
					INNER JOIN _Datos..SmartTrack st ON st.CuentaId = MC.cue_iid
						WHERE st.Imei = @imei
				END
				ELSE IF (@cDll = 'EBSPacketParser')
				BEGIN
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Busco EBS'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @cue_iid = MC.cue_iid, @ccuenta = MC.cue_ncuenta, @cue_clinea = MC.cue_clinea, @cue_cProvincia = MC.cue_cProvincia
						FROM _Datos.dbo.m_cuentas MC
					INNER JOIN _Datos..SmartTrack st ON st.CuentaId = MC.cue_iid
						WHERE st.Imei = @imei
				END
				ELSE IF (@ProtocolModel = 'SmartPanicsPC')
				BEGIN
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Busco SmartPanicsPC'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @cue_iid = MC.cue_iid, @ccuenta = MC.cue_ncuenta, @cue_clinea = MC.cue_clinea, @cue_cProvincia = MC.cue_cProvincia
						FROM _Datos.dbo.m_cuentas MC WITH (NOLOCK)
					INNER JOIN _tablas..t_tipos WITH (NOLOCK) ON mc.cue_ctipo = tip_ccodigo
						WHERE mc.cue_cIMEI = @imei and tip_nTipo = 10
				END
				ELSE IF (@cDll = 'VivecarPacketParser')
				BEGIN
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Busco Vivecar'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @cue_iid = MC.cue_iid, @ccuenta = MC.cue_ncuenta, @cue_clinea = MC.cue_clinea, @cue_cProvincia = MC.cue_cProvincia
						FROM _Datos.dbo.m_cuentas MC
					INNER JOIN _Datos.dbo.SmartPanic SP ON SP.CuentaId = MC.cue_iid
						WHERE Right(SP.Telefono, 8) = Right(@imei, 8)
				END
				
				IF (@cue_iid IS NULL OR @cue_iid = 0)
				BEGIN
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] No encontro idCta busco por IMEI de la cuenta'
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					SELECT TOP 1 @ccuenta = cue_ncuenta, @cue_iid = cue_iid, @cue_clinea = cue_clinea, @cue_cProvincia = cue_cProvincia
						FROM _Datos.dbo.m_cuentas
					WHERE PATINDEX('%'+convert(varchar(50),@imei)+'%' ,cue_cIMEI)>0 -- modificado para soportar N imei
				END
			END
			ELSE IF (@cDll = 'X28GprsPacketParser' And @ProtocolModel = 'Movilgate Webhook')
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  		
				Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Es Movilgate Webhook, busco idCta en m_simcard'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
				SELECT TOP 1 @cue_iid = [sim_cuenta], @ccuenta = cue_ncuenta, @cue_clinea = cue_clinea,	@cue_cProvincia = cue_cProvincia
					FROM [_Datos].[dbo].[m_simcard]
				Inner Join [_Datos].[dbo].[m_cuentas] On [cue_iid]=[sim_cuenta]
					WHERE [sim_codigo] LIKE '%' + Ltrim(Rtrim(@cIdCtaExtendido)) + '%'
			End

			/*Pablo : Saque esto y puse lo de abajo x que si no resuelve por IMEI tiene que intentar resolver por asignacion de puertos
			IF (@cue_iid IS NULL OR @cue_iid = 0)
			BEGIN
				IF (@cue_iid IS NULL OR @cue_iid = 0)
					BEGIN
						PRINT '--Si no encontro idCta ejecuta [[SGSP_IRSBuscoIdCuentaIP]] para que intente traer la cuenta colectora de invalidas--'
						SET @cCuenta = '####'

						EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoIdCuentaIP] @iPuerto = @iPuerto,
							@cCuenta = @cCuenta,
							@iConexion = @iConexion,
							@iIdCta = @cue_iid OUTPUT,
							@cLinea = @cue_clinea OUTPUT,
							@cue_cProvincia = @cue_cProvincia OUTPUT
					END
			END
			*/

			IF (@cue_iid IS NULL OR @cue_iid = 0)
			BEGIN
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] No encontro idCta ejecuta [SGSP_IRSBuscoIdCuentaIP] para que busque con el valor del puerto y cuenta recibidos a que ID de Cuenta de SG pertenece el paquete'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
				IF @cDebug = 'Si'
				Begin
					Print ' Execute [SGSP_IRSBuscoIdCuentaIP]'
					Print ' @iPuerto   : ' + CONVERT(VARCHAR(10), @iPuerto)
					Print ' @ccuenta   : ' + @ccuenta
					Print ' @iConexion : ' + CONVERT(VARCHAR(10), @iConexion)
				End

				EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoIdCuentaIP]
					@iPuerto = @iPuerto,
					@cCuenta = @cCuenta,
					@iConexion = @iConexion,
					@iIdCta = @cue_iid OUTPUT,
					@cLinea = @cue_clinea OUTPUT,
					@cue_cProvincia = @cue_cProvincia OUTPUT
			END
		END
		Else If @imei != ''	--Pablo 02-05-2019 : Lo agregue x que si llega Cuenta y tambien IMEI, solo intentaba por cuenta
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] No encontro idCta busco por IMEI de la cuenta'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			SELECT TOP 1 @ccuenta = cue_ncuenta, @cue_iid = cue_iid, @cue_clinea = cue_clinea, @cue_cProvincia = cue_cProvincia
				FROM _Datos.dbo.m_cuentas
			WHERE PATINDEX('%'+convert(varchar(50),@imei)+'%' ,cue_cIMEI)>0 -- modificado para soportar N imei
		END
		Else If @cCuenta = '_SGINTE'
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] Llego _SGINTE devuelvo cuenta interna'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			Set @cue_iid = @idINTE
			Set @cue_clinea = '_SG'
			Set @ccuenta = 'INTE'
		END

		IF (@cue_iid IS NULL OR @cue_iid = 0)
		BEGIN
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] No encontro idCta. Para aquellas conexiones que no usan IMEI se busca con el valor del puerto y cuenta recibidos a que ID de Cuenta de SG pertenece el paquete'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			IF @cDebug = 'Si'
			Begin
				Print ' Execute [SGSP_IRSBuscoIdCuentaIP]'
				Print ' @iPuerto   : ' + CONVERT(VARCHAR(10), @iPuerto)
				Print ' @ccuenta   : ' + @ccuenta
				Print ' @iConexion : ' + CONVERT(VARCHAR(10), @iConexion)
			End

			EXECUTE [_Datos].[dbo].[SGSP_IRSBuscoIdCuentaIP] 
				@iPuerto = @iPuerto,
				@cCuenta = @cCuenta,
				@iConexion = @iConexion,
				@iIdCta = @cue_iid OUTPUT,
				@cLinea = @cue_clinea OUTPUT,
				@cue_cProvincia = @cue_cProvincia OUTPUT
		END

	END
End

If @iPar = 1 And @cue_iid!=@idINTE  
Begin
	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] SINCNXRESEXT en Si y @cue_iid NO es la _SG-INTE'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If Not Exists ( Select Top 1 [cco_idkey] From  [_Datos].[dbo].[m_CuentasConn] Where [cco_iConexion] = @iConexion And [cco_iidCuenta]=@cue_iid )
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] NO exsite conexion asociado lo manda a la _SG-INTE'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set @cue_iid=@idINTE  
		Set @cue_clinea = '_SG'
		Set @ccuenta = 'INTE'
	End 
End
Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [IPRS_GetCue_iid] @cue_iid : '+CONVERT(VARCHAR(10), @cue_iid)
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT