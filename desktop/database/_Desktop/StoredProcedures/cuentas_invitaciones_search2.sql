--SELECT 
--	cue_iid, 
--	TRIM(cue_clinea) + '-' + TRIM(cue_ncuenta) + '-' + TRIM(cue_cnombre), TRIM(cue_clocalidad), 
--	cue_ccalle
--FROM _Datos..m_cuentas
		



--SELECT *
--FROM _Datos..m_telefonos
CREATE OR ALTER PROCEDURE [dbo].[cuentas_invitaciones_search2]
AS
/*SELECT 
    c.cue_iid,
    TRIM(cue_clinea) + '-' + TRIM(cue_ncuenta) + '-' + TRIM(cue_cnombre), TRIM(cue_clocalidad) AS 'Cuenta', 
    c.cue_clocalidad,
    c.cue_ccalle,
    (
        SELECT 
            t.tel_iid AS id,
            t.tel_cnombre AS nombre,
            t.tel_ctelefono AS telefono,
			CASE t.tel_ntr
				WHEN 1 THEN 'Contacto Smartpanics'
				WHEN 2 THEN 'Contacto Comun'
				WHEN 3 THEN 'Contacto Ambos'
				WHEN 4 THEN 'Oculto'
				ELSE 'Seleccione'
			END AS tipoContacto
        FROM _Datos..m_telefonos t
        WHERE t.tel_iidcuenta = c.cue_iid
        FOR JSON PATH
    ) AS contactos
FROM _Datos..m_cuentas c*/
SELECT 
    c.cue_iid,
    TRIM(cue_clinea) + '-' + TRIM(cue_ncuenta) + '-' + TRIM(cue_cnombre) AS 'Cuenta', 
    c.cue_ccalle + ', ' + c.cue_clocalidad AS Direccion,
	t.tel_iid AS id,
    t.tel_cnombre AS Contacto,
    t.tel_ctelefono AS telefono,
	CASE t.tel_ntr
		WHEN 1 THEN 'Contacto Smartpanics'
		WHEN 2 THEN 'Contacto Comun'
		WHEN 3 THEN 'Contacto Ambos'
		WHEN 4 THEN 'Oculto'
		ELSE 'Seleccione'
	END AS tipoContacto
FROM _Datos..m_cuentas c
	INNER JOIN _Datos..m_telefonos t ON t.tel_iidcuenta = c.cue_iid
WHERE t.tel_cnombre <> ''
ORDER BY cue_iid