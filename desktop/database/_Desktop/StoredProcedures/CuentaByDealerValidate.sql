CREATE OR ALTER PROCEDURE [dbo].[CuentaByDealerValidate]
	@token VARCHAR(128) = '',
	@linea VARCHAR(3),
	@cuenta VARCHAR(10),
	@_dc varchar(500)='',
	@verificarCuenta int = 1
AS 
	SET NOCOUNT ON
	
	--Load Security
	DECLARE @UserId INT
	SELECT @UserId = dbo.GetUserIdByToken(@token)
	
	DECLARE @HasAdministratorModule INT 
	SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')
		   	
	--Chequeo si la cuenta existe
	DECLARE @CuentaExists INT	
	SET @CuentaExists = 0;
	IF @verificarCuenta = 1
	BEGIN
	SELECT @CuentaExists = COUNT(*) FROM _Datos.dbo.m_cuentas WHERE cue_clinea = @linea AND cue_ncuenta = @cuenta		
	END
	--MasterWebDealer chequeo la linea
	--DECLARE @LineIsValid INT
	--SET @LineIsValid = 1	
	--SELECT @LineIsValid = COUNT(*) FROM _Sistema.dbo.UsersDesktopWebModulos WHERE dwm_idWeb = @UserId AND dwm_dealer = @linea AND @cuenta BETWEEN ISNULL(dwm_cuenta_desde,0000) AND ISNULL(dwm_cuenta_hasta,9999) 
	
	--Rango chequeo la lina y el rango
	DECLARE @RangeIsValid INT
	SET @RangeIsValid = 1	
	IF @HasAdministratorModule = 0
		SELECT @RangeIsValid = COUNT(*) FROM _Sistema.dbo.UsersDesktopWebModulos 
		WHERE dwm_idWeb = @UserId 
		AND dwm_dealer = @linea 
		AND @cuenta 
		BETWEEN (CASE ISNULL(dwm_cuenta_desde,'') WHEN '' THEN '0000' ELSE dwm_cuenta_desde END) 
		AND (CASE ISNULL(dwm_cuenta_hasta,'') WHEN '' THEN 'ZZZZ' ELSE dwm_cuenta_hasta END) 
	
	--Return
	IF @CuentaExists != 0
		SELECT 1 AS Codigo, 'Este numero de cuenta esta asociado a un dealer' AS Descripcion	
	--ELSE IF @LineIsValid = 0
	--	SELECT 2 AS Codigo, 'CuentaFueraDeLinea' AS Descripcion	
	ELSE IF @RangeIsValid = 0
		SELECT 3 AS Codigo, 'CuentaFueraDeRango' AS Descripcion