--#####################################################################################################################################
-- SOFTGUARD DESKTOP
-- creator : Juan Bonforti
-- updated : 2020-03-06 14:00
-- desciption : Store Procedure con la finalidad de validar el telefono ingresado en la Landing por el usuario.
--#####################################################################################################################################
CREATE OR ALTER PROCEDURE [dbo].[DesktopUserPhoneValidate]
    @phone NVARCHAR(128) = '',
    @imei VARCHAR(50) = '', -- '' no update, 'xxx' update
    @dealer VARCHAR(50) = '',
    @nom VARCHAR(255) = '',
	@dir VARCHAR(255) = ''
    AS 
    SET NOCOUNT ON
    
    -- busco si hay un usuario con ese telefono
    DECLARE @Exists INT 
    SELECT @Exists = ISNULL(COUNT(*),0) FROM [_Datos].[dbo].[SmartPanic] WHERE Telefono LIKE '%'+RIGHT(@phone,8)+'%'
    --Return
    IF @Exists != 0
    BEGIN
        print 'En caso de existir un usuario y se indique que deseamos blanquear Imei hago Update'
        print 'No blanqueo por default, dado que esto se usa en la validacion de formulario y no solo al crear un usuario'
		
       
        IF @imei != ''
        BEGIN
            -- busco el imei anterior
            declare @oldimei varchar(50)
			DECLARE @idCta VARCHAR(50)
            select @oldimei = imei from [_Datos].[dbo].[SmartPanic] WHERE Telefono LIKE '%'+RIGHT(@phone,8)+'%' AND Imei != ''
            select @idCta = Cuentaid  from [_Datos].[dbo].[SmartPanic] WHERE Telefono LIKE '%'+RIGHT(@phone,8)+'%' AND Imei != ''

            UPDATE [_Datos].[dbo].[SmartPanic]
            SET Imei = @imei
            WHERE Telefono LIKE '%'+RIGHT(@phone,8)+'%' AND Imei != ''
            UPDATE [_Datos]..[p_landingWorkflow] set plw_imei=@imei where plw_imei=@oldimei
            SELECT 1 AS Codigo, 'Limpieza OK de Imei, usuario ya existia, hacer login' AS Descripcion
			IF @dealer != ''
			BEGIN
				 UPDATE _Datos..m_cuentas
				 SET cue_clinea = @dealer, cue_cnombre=UPPER(@nom), cue_ccalle=UPPER(@dir)
				 WHERE cue_iid=@idCta
			END
		END
            
        SELECT 1 AS Codigo, 'Usuario Existe' AS Descripcion
    END
	ELSE
	BEGIN
		SELECT 0 AS Codigo, 'Usuario No Existe' AS Descripcion
	END