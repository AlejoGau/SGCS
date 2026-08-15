--#####################################################################################################################################
-- SOFTGUARD DESKTOP
-- creator : Juan Bonforti
-- updated : 2020-03-06 14:00
-- desciption : Store Procedure con la finalidad de validar el telefono ingresado en la Landing por el usuario.
--#####################################################################################################################################
CREATE OR ALTER PROCEDURE [dbo].[DesktopUserPhoneValidateConDni]
    @phone NVARCHAR(128) = '',
    @dni VARCHAR(50) = '' 
    
    AS 
    SET NOCOUNT ON
	DECLARE @Exists INT 
	SELECT @Exists = COUNT(*) FROM [_Datos].[dbo].[SmartPanic] WHERE Telefono LIKE '%'+RIGHT(@phone,8)+'%'
    --Return
    IF @Exists != 0
    BEGIN    
		SELECT @Exists = COUNT(*) FROM _Datos..Organization A
		INNER JOIN _Datos..SmartPanic B ON A.Mobile=B.Telefono
		WHERE Telefono LIKE '%'+RIGHT(@phone,8)+'%' AND A.StateTax=@dni
		IF @Exists != 0
		BEGIN
			SELECT 2 AS Codigo, 'DNI Coincide' AS Descripcion
		END
		ELSE
		BEGIN
			SELECT 1 AS Codigo, 'Usuario Existe' AS Descripcion
		END
    END