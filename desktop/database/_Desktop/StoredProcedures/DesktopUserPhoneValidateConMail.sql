--#####################################################################################################################################
-- SOFTGUARD DESKTOP
-- creator : Juan Bonforti
-- updated : 2020-03-06 14:00
-- desciption : Store Procedure con la finalidad de validar el telefono ingresado en la Landing por el usuario.
--#####################################################################################################################################
CREATE OR ALTER PROCEDURE [dbo].[DesktopUserPhoneValidateConMail]
    @phone NVARCHAR(128) = '',
    @mail VARCHAR(255) = '' 
    
    AS 
    SET NOCOUNT ON
	DECLARE @Exists INT 
    DECLARE @mail_actual VARCHAR(250);
	DECLARE @controlCel BIT = 0;
	DECLARE @controlMail BIT = 0;
	DECLARE @control BIT = 0;

	--VALIDAR TELEFONO
	SELECT @Exists = COUNT(*) FROM [_Datos].[dbo].[SmartPanic] 
	WHERE Telefono LIKE '%'+RIGHT(@phone,8)+'%'

    IF @Exists != 0
	BEGIN 
		SET @controlCel = 1;
	END
	SET @Exists = 0;

	--VALIDAR MAIL
	SELECT @Exists = COUNT(*)
	FROM _Datos..m_cuentas A
	WHERE A.cue_cemail = @mail
			
    IF @Exists != 0
	BEGIN 
		SET @controlMail = 1;
	END
		
	IF @controlCel = 1 AND @controlMail = 1
	BEGIN
		SELECT @mail_actual = B.cue_cemail 
		FROM [_Datos].[dbo].[SmartPanic] A
		INNER JOIN _Datos..m_cuentas B ON A.CuentaId = B.cue_iid
		WHERE A.Telefono LIKE '%'+RIGHT(@phone,8)+'%'
    
		IF @mail = @mail_actual
		BEGIN    
			SET @control = 1
		END
	END
	ELSE
	BEGIN
		IF @controlCel = 0 AND @controlMail = 0
		BEGIN
			SET @control = 1;
		END
	END

	IF @control = 1
	BEGIN
		SELECT 1 AS Codigo, 'OK' AS Descripcion
	END
	ELSE
	BEGIN
		SELECT 2 AS Codigo, 'ERROR' AS Descripcion
	END