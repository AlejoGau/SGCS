-- =============================================
-- Author: Rodrigo Román
-- Create date: 06/03/2020
-- Description: Actualizo campos "madre" cuando es una cuenta particion
-- Update 2025-09-18 Pablo : Actualizo UserAccountAccess para nuevas cuentas
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[trg_m_cuentas_INSERT] 
   ON  [dbo].[m_cuentas]
   AFTER INSERT
AS 
BEGIN
    SET NOCOUNT ON;

    -- Solo procesar si hay registros insertados
    IF NOT EXISTS (SELECT 1 FROM inserted)
        RETURN;

    BEGIN TRY
        -- =========================================
        -- Actualizar campo "madre" para particiones
        -- =========================================
        DECLARE partition_cursor CURSOR FOR
			SELECT cue_iid, cue_nparticion FROM inserted 
        WHERE cue_nparticion > 0;

        DECLARE @cue_nparticion INT, @cue_iid INT;
        OPEN partition_cursor;
        FETCH NEXT FROM partition_cursor INTO @cue_iid, @cue_nparticion;
        
        WHILE @@FETCH_STATUS = 0
        BEGIN
            -- Lleno los campos "madre" si es una particion
            EXEC _desktop..m_cuentas_UpdateMadreFields @cue_iid = @cue_iid;
            FETCH NEXT FROM partition_cursor INTO @cue_iid, @cue_nparticion;
        END;
        
        CLOSE partition_cursor;
        DEALLOCATE partition_cursor;

		/*Si dan de alta muchas cuentas en el mismo momento se genera concurrencia y se rompe la logica de control de rangos
        -- ============================
        -- Actualizar UserAccountAccess
        -- ============================
        
        -- Agregar registros para cuentas que caen en rangos directos
        INSERT INTO _Sistema.dbo.UserAccountAccess (uaa_userId, uaa_cue_iid)
        SELECT DISTINCT um.dwm_idWeb,i.cue_iid
			FROM inserted i
        INNER JOIN _Sistema.dbo.UsersDesktopWebModulos um ON i.cue_clinea = um.dwm_dealer AND i.cue_ncuenta BETWEEN um.dwm_cuenta_desde AND um.dwm_cuenta_hasta
			WHERE NOT EXISTS ( SELECT 1 FROM _Sistema.dbo.UserAccountAccess ua 
								WHERE ua.uaa_userId = um.dwm_idWeb AND ua.uaa_cue_iid = i.cue_iid );

        -- Agregar registros para cuentas madre que caen en rangos
        INSERT INTO _Sistema.dbo.UserAccountAccess (uaa_userId, uaa_cue_iid)
        SELECT DISTINCT um.dwm_idWeb,i.cue_iid
			FROM inserted i
        INNER JOIN _Sistema.dbo.UsersDesktopWebModulos um ON i.cue_cMadreLinea = um.dwm_dealer AND i.cue_cMadreCuenta BETWEEN um.dwm_cuenta_desde AND um.dwm_cuenta_hasta
			WHERE NOT EXISTS ( SELECT 1 FROM _Sistema.dbo.UserAccountAccess ua 
								WHERE ua.uaa_userId = um.dwm_idWeb AND ua.uaa_cue_iid = i.cue_iid );
		*/

    END TRY
    BEGIN CATCH
		DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
		RAISERROR(@ErrorMessage, 10, 1) WITH NOWAIT
        -- No hacer ROLLBACK para no afectar el proceso original
    END CATCH
   
END;