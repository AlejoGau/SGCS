--#####################################################################################################################################
-- SOFTGUARD DESKTOP
-- creator : Juan Bonforti
-- updated : 2020-03-06 14:00
-- desciption : Store Procedure con la finalidad de validar el telefono ingresado en la Landing por el usuario.
--#####################################################################################################################################
CREATE OR ALTER PROCEDURE [dbo].[DesktopUserPhoneValidateFecNacMail]
    @phone NVARCHAR(128) = '',
    @mail VARCHAR(250) = '',
	@anio int = 0,
    @mes int = 0,
	@dia int = 0
    AS 
    SET NOCOUNT ON
    DECLARE @mail_actual VARCHAR(250);
	DECLARE @anio_actual int;
	DECLARE @mes_actual int;
	DECLARE @dia_actual int;
	DECLARE @control BIT = 0;

	SELECT @mail_actual = B.cue_cemail, 
		@anio_actual = YEAR(CONVERT(DATE,C.mnf_dfechanacimiento)), 
		@mes_actual = MONTH(CONVERT(DATE,C.mnf_dfechanacimiento)),
		@dia_actual = DAY(CONVERT(DATE,C.mnf_dfechanacimiento)) 
	FROM [_Datos].[dbo].[SmartPanic] A
		INNER JOIN _Datos..m_cuentas B ON A.CuentaId = B.cue_iid
		INNER JOIN _Datos..m_medical_info C ON A.CuentaId = C.mnf_iidcuenta
	WHERE A.Telefono LIKE '%'+RIGHT(@phone,8)+'%'
		
    --Return
	IF @mail_actual IS NULL
	BEGIN
		SET @control = 1
	END
	IF @anio_actual IS NULL
	BEGIN
		SET @control = 1
	END
	IF @mes_actual IS NULL
	BEGIN
		SET @control = 1
	END
	IF @dia_actual IS NULL
	BEGIN
		SET @control = 1
	END

    IF @mail != @mail_actual
    BEGIN    
		SET @control = 1
    END
    IF @anio != @anio_actual
    BEGIN    
		SET @control = 1
    END
    IF @mes != @mes_actual
    BEGIN    
		SET @control = 1
    END
	IF @dia != @dia_actual
    BEGIN    
	SET @control = 1
    END

	IF @control = 0
	BEGIN
		SELECT 1 AS Codigo, 'TODO COINCIDE' AS Descripcion
	END
	ELSE
	BEGIN
		SELECT 2 AS Codigo, 'ERROR' AS Descripcion
	END