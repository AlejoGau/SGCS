-- =============================================
-- Author:		Juan Bonforti
-- Create date: 18/01/2019
-- Description:	Eliminacion de usuario Landing
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[deleteLandingUser]
	@Id INT,
	@page INT = 1,               
	@start INT = 0,
	@limit INT = 50,               
	@sort VARCHAR(256) = '',   
	@group VARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT     
AS
BEGIN
	SET NOCOUNT ON;

	-- Elimino Organizacion
	EXEC [_Desktop].[dbo].[OrganizationDel] @Id
	
	-- Elimino Usuario Desktop
	DECLARE @IdDesktop INT;
	SELECT @IdDesktop = udw_idKey FROM [_Sistema].[dbo].[UsersDesktopWeb] WHERE udw_empresa = @Id
	PRINT '@IdDesktop ' + CAST(@IdDesktop AS VARCHAR(MAX))
	EXEC [_Desktop].[dbo].[UsersDesktopWebDel] @IdDesktop

	-- Elimino Cuenta
	DECLARE @dealerCuenta VARCHAR(3);
	DECLARE @cuentaDesde VARCHAR(4);
	DECLARE @IdCuenta INT = 0;
	DECLARE @email VARCHAR(255);
	SELECT @dealerCuenta = Dealer, @cuentaDesde = CuentaDesde FROM [_Sistema].[dbo].[DealerRango] WHERE IdEntidad = @Id
	PRINT '@dealerCuenta ' + CAST(@dealerCuenta AS VARCHAR(MAX))
	PRINT '@@cuentaDesde ' + CAST(@cuentaDesde AS VARCHAR(MAX))
	
    IF (@dealerCuenta != '' AND @cuentaDesde != '')
        BEGIN
            SELECT @IdCuenta = cue_iid, @email = cue_cemail FROM [_Datos].[dbo].[m_cuentas] WHERE cue_clinea = @dealerCuenta AND cue_ncuenta = @cuentaDesde
            PRINT '@IdCuenta ' + CAST(@IdCuenta AS VARCHAR(MAX))
            PRINT '@email ' + CAST(@email AS VARCHAR(MAX))
        END

    IF ( @IdCuenta > 0 )
        BEGIN
            -- BC 393313093, al eliminar previamente debo pasar a estado 4 (pedir eliminar) a la cuenta.
            UPDATE _Datos..m_estado_cuenta_cab 
            SET est_nestado = 4
            WHERE est_iidcuenta = @IdCuenta
            
            -- Elimino la cuenta ( Con lo indicado por Pablo. )
	        DELETE FROM [_Datos].[dbo].[m_cuentas] WHERE cue_iid = @IdCuenta

            -- Elimino el registro de DealerRango asociado
            DELETE FROM [_Sistema].[dbo].[DealerRango] WHERE IdEntidad = @Id

            -- Elimino dispositivos SmartPanics de la Cuenta
            -- Elimino Contactos de la cuenta
            -- Elimino Zonas de la cuenta
            -- Elimino Notificaciones creadas de la cuenta
            -- Elimino eventos pendientes de la cuenta
            --EXEC [_Datos].[dbo].[SGSP_CuentaDelete] @iCta = @IdCuenta

            -- Elimino la cuenta de p_landingWorkflow
	        DELETE FROM _Datos..p_landingWorkFlow WHERE plw_email = @email

        END

	
	
	--DELETE FROM [_Datos].[dbo].[m_cuentas] WHERE cue_clinea = @dealerCuenta AND cue_ncuenta = @cuentaDesde
	--Pablo : Para que si puede borrar por IdCuenta	
	--DELETE FROM [_Datos].[dbo].[m_cuentas] WHERE cue_iid = @IdCuenta
	
	-- Elimino el registro de DealerRango asociado
	--DELETE FROM [_Sistema].[dbo].[DealerRango] WHERE IdEntidad = @Id


	-- -- Elimino dispositivos SmartPanics de la Cuenta
	-- DELETE FROM [_Datos].[dbo].[SmartPanic] WHERE awccUserId = @IdDesktop
	-- --Pablo : Ya lo hace [SGSP_CuentaDelete] pero asi
	-- --Delete From SmartPanic  Where CuentaId = @iCta


	-- -- Elimino la cuenta de p_landingWorkflow
	-- DELETE FROM _Datos..p_landingWorkFlow WHERE plw_email = @email
	

	-- -- Elimino Contactos de la cuenta
	-- --Pablo : Ya lo hace [SGSP_CuentaDelete]
	-- DELETE FROM [_Datos].[dbo].[m_telefonos] WHERE tel_iidcuenta = @IdCuenta
	

	-- -- Elimino Zonas de la cuenta
	-- --Pablo : Ya lo hace [SGSP_CuentaDelete]
	-- DELETE FROM [_Datos].[dbo].[m_zonas] WHERE zon_iidcuenta = @IdCuenta


	-- -- Elimino Notificaciones creadas de la cuenta
	-- --Pablo : Ya lo hace [SGSP_CuentaDelete]
	-- DELETE FROM _datos.dbo.m_sms WHERE sms_iidcuenta = @IdCuenta

	-- -- Elimino eventos pendientes de la cuenta
	-- --Pablo : Ya lo hace [SGSP_CuentaDelete]
	-- DELETE FROM _Datos..p_recepcion WHERE rec_iidcuenta = @IdCuenta
	

END