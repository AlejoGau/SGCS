-- =============================================
-- Author:		Martin Velez
-- Create date: 16/09/2022
-- Description:	Workflow alternativo, landing Pilar
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[temporaryLandingUserPilar]
	@Niv1 VARCHAR(MAX) = '',
    @Niv2 VARCHAR(MAX) = '',
    @Niv3 VARCHAR(MAX) = '',
    @Imei VARCHAR(MAX) = '',
	@Tel VARCHAR(MAX) = '',
	@DNI VARCHAR(MAX) = ''
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @Cue_iid INT;
	DECLARE @Telefono VARCHAR(MAX) = '';

	SELECT @Cue_iid = CuentaId, @Telefono = Telefono
	FROM _Datos..SmartPanic
	WHERE Telefono LIKE '%'+RIGHT(@Tel,8)+'%';

	--UPDATE  _Datos..m_cuentas 
	--SET cue_clocalidad = @Niv1,
	--	cue_ccodigopostal = @Niv2
	--WHERE cue_iid=@Cue_iid

	UPDATE  _Datos..m_cuentas 
	SET cue_clocalidad = @Niv2
	WHERE cue_iid=@Cue_iid

	--UPDATE  _Datos..m_CuentasXtraInfo 
	--SET cue_cCustom = @Niv3
	--WHERE cue_iidCuenta=@Cue_iid	
	
	UPDATE  _Datos..m_CuentasXtraInfo 
	SET cue_cCustom = @Niv3
	WHERE cue_iidCuenta=@Cue_iid	

	--UPDATE  _Datos..Organization
	--SET City = @Niv1,
	--	Zip = @Niv2,
	--	SmallComment = @Niv3
	--WHERE StateTax=@DNI

	UPDATE  _Datos..Organization
	SET City = @Niv2,
		SmallComment = @Niv3
	WHERE StateTax=@DNI
END