CREATE OR ALTER PROCEDURE [dbo].[__CargarCuentasFiltradas]
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Los filtros del usuario se cargan en una variable de tabla
    DECLARE @Ranges TABLE (dealer NVARCHAR(3), desde NVARCHAR(4), hasta NVARCHAR(4));
    INSERT INTO @Ranges (dealer, desde, hasta)
    SELECT um.dwm_dealer, um.dwm_cuenta_desde, um.dwm_cuenta_hasta
    FROM _Sistema.dbo.UsersDesktopWebModulos um
    WHERE um.dwm_idWeb = @UserId AND (dwm_dealer != '' AND dwm_cuenta_desde != '' AND dwm_cuenta_hasta != '');
      
    -- Inserta en la tabla temporal (#FilteredAccounts) que debe existir previamente
    INSERT INTO #FilteredAccounts (cue_ncuenta)
    SELECT
        c.cue_ncuenta
    FROM
        [_Datos].[dbo].[m_cuentas] AS c
        INNER JOIN @Ranges AS r ON 
            (
                -- Aquí se agrega la cláusula COLLATE para resolver el conflicto
                (c.cue_clinea COLLATE database_default = r.dealer COLLATE database_default AND c.cue_ncuenta COLLATE database_default BETWEEN r.desde COLLATE database_default AND r.hasta COLLATE database_default)
                OR
                (c.cue_cMadreLinea COLLATE database_default = r.dealer COLLATE database_default AND c.cue_cMadreCuenta COLLATE database_default BETWEEN r.desde COLLATE database_default AND r.hasta COLLATE database_default)
            )
    GROUP BY c.cue_ncuenta;
END