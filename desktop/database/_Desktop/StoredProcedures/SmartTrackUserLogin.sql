--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.593 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SmartTrackUserLogin]
	@token NVARCHAR(128) = '',
	@user NVARCHAR(128),
	@clave NVARCHAR(128),
	@imei NVARCHAR(128),
	@userid int = 0,
	@usu_idkey INT = 0
AS 
	SET NOCOUNT ON

	--Chequeo si el usuario y pass son validos
	DECLARE @uservalid INT	
	SELECT @uservalid = COUNT(*) 
		FROM _Datos.dbo.[m_usuarios] u
		inner join _Datos.dbo.smarttrack s on (s.cuentaid = u.usu_iidcuenta) 
	WHERE [usu_cnombre] = @user 
		AND [usu_cclave] = @clave 
		AND s.Imei = @imei
			
	--Return
	declare @usu_ntipo numeric(1,0);
	IF @uservalid != 0
	BEGIN
		Select Top 1 @userid = usu_iid, @usu_ntipo = usu_ntipo, @usu_idkey = usu_idkey
			FROM _Datos.dbo.[m_usuarios] u
			inner join _Datos.dbo.smarttrack s on (s.cuentaid = u.usu_iidcuenta) 
		WHERE [usu_cnombre] = @user 
			AND [usu_cclave] = @clave 
			AND s.Imei = @imei

		-- me fijo si hay un usuario logueado y lo deslogueo.(2025-07-02 Pablo MS-1631)
		declare @vucs_idkey int;
		declare @vucs_vcid int
		declare @pushToken varchar(1024)
		
		Select @vucs_idkey = vucs_idkey,@vucs_vcid = vucs_vcid, @pushToken = st.pushToken
			From _datos..VigicontrolUserCurrentSession 
			inner join _datos..SmartTrack st on st.Id = vucs_vcid
		where vucs_usuidkey = @usu_idkey

		If (@vucs_idkey > 0)
		BEGIN
			Declare @iParametro INT = IsNull((SELECT par_ivalor	FROM _Tablas.dbo.t_parametros WITH (NOLOCK)	WHERE par_cCodigo = 'CONTROLADOBLELOGINVC'), 0)
			If @iParametro = 0
			Begin
				EXECUTE [_Desktop].[dbo].[createPushMessage] 
				   @spId = @vucs_vcid
				  ,@spToken = @pushToken
				  ,@msgType = 'LOGOUT'

				SELECT 1 AS Codigo, 'OK' AS Descripcion, @userid as userId, @usu_ntipo as usu_ntipo, @usu_idkey as usu_idkey
			End
			Else
				SELECT 3 AS Codigo, 'ERROR' AS Descripcion, null as userId
		END
		Else
			SELECT 1 AS Codigo, 'OK' AS Descripcion, @userid as userId, @usu_ntipo as usu_ntipo, @usu_idkey as usu_idkey
	END
	ELSE 
		SELECT 2 AS Codigo, 'ERROR' AS Descripcion, null as userId