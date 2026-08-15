CREATE OR ALTER PROCEDURE [dbo].[GetCuentaLanding]
	@cue_ncuenta char(10),
	@cue_ctelefono varchar(30) = '',
	@cue_clinea char(3),
	@oauth_token varchar(max) = '',
	@cue_cclave varchar(255) = ''
	--WITH ENCRYPTION
	AS
	IF(@cue_ctelefono != '')
	BEGIN
		SELECT cue_iid FROM _Datos..m_cuentas
		WHERE cue_ncuenta=@cue_ncuenta AND cue_ctelefono=@cue_ctelefono AND cue_clinea=@cue_clinea
	END
	IF(@cue_cclave != '')
	BEGIN
		SELECT cue_iid FROM _Datos..m_cuentas
		WHERE cue_ncuenta=@cue_ncuenta AND cue_cclave=@cue_cclave AND cue_clinea=@cue_clinea
	END