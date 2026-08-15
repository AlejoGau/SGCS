--#####################################################################################################################################
-- SOFTGUARD DESKTOP
-- creator : Juan Bonforti
-- updated : 2020-03-06 14:00
-- desciption : Store Procedure con la finalidad de validar el telefono ingresado en la Landing por el usuario.
--#####################################################################################################################################
CREATE OR ALTER PROCEDURE [dbo].[ActualizaLandingImei]
    @phone NVARCHAR(128) = '',
    @imei VARCHAR(50) = '' -- '' no update, 'xxx' update
    
    AS 
    SET NOCOUNT ON
    
    -- busco el imei anterior
    declare @oldimei varchar(50)
    select @oldimei = imei from [_Datos].[dbo].[SmartPanic] WHERE Telefono LIKE '%'+RIGHT(@phone,8)+'%' --AND Imei != ''

    UPDATE [_Datos].[dbo].[SmartPanic]
    SET Imei = @imei
    WHERE Telefono LIKE '%'+RIGHT(@phone,8)+'%' --AND Imei != ''

    UPDATE [_Datos]..[p_landingWorkflow] set plw_imei=@imei where plw_imei=@oldimei

    SELECT 1 AS Codigo, 'Imei Actualizado' AS Descripcion