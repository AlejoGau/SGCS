CREATE OR ALTER PROCEDURE [dbo].[CheckControlAcceso]
	@cue_iid Int = 0
AS
BEGIN

;WITH CrtlAcceso AS (
	SELECT [cue_iid] FROM [_Datos].[dbo].[m_cuentas] C
	INNER JOIN [_Tablas].[dbo].[t_tipos] T ON [C].[cue_ctipo] = [T].[tip_ccodigo]
	WHERE [T].[tip_nTipo]=8	AND [C].[cue_iid] = @cue_iid 
)
SELECT CASE
	WHEN EXISTS (
		SELECT mp.pan_iidcuenta as cue_iid
		FROM [_Datos].[dbo].[m_paneles] MP
		INNER JOIN [_Tablas].[dbo].[t_paneles] TP ON TP.[pan_ccodigo]=MP.[pan_ccodigo]
		INNER JOIN [_Tablas].[dbo].[T_PanelesModelos] PM ON PM.[pam_idKey]=TP.[pan_iModelo]
		WHERE [pan_iidcuenta]=CrtlAcceso.[cue_iid] AND [pam_idKey]=11
	) THEN 2
	WHEN EXISTS (
		SELECT mp.pan_iidcuenta as cue_iid
		FROM [_Datos].[dbo].[m_paneles] MP
		INNER JOIN [_Tablas].[dbo].[t_paneles] TP ON TP.[pan_ccodigo]=MP.[pan_ccodigo]
		INNER JOIN [_Tablas].[dbo].[T_PanelesModelos] PM ON PM.[pam_idKey]=TP.[pan_iModelo]
		WHERE [pan_iidcuenta]=CrtlAcceso.[cue_iid] AND [pam_idKey]=8
	) THEN 1
	WHEN EXISTS (
		SELECT mp.pan_iidcuenta as cue_iid
		FROM [_Datos].[dbo].[m_paneles] MP
		INNER JOIN [_Tablas].[dbo].[t_paneles] TP ON TP.[pan_ccodigo]=MP.[pan_ccodigo]
		INNER JOIN [_Tablas].[dbo].[T_PanelesModelos] PM ON PM.[pam_idKey]=TP.[pan_iModelo]
		WHERE [pan_iidcuenta]=CrtlAcceso.[cue_iid] AND [pam_idKey]=12
	) THEN 3
	ELSE 0
END AS Existe
FROM CrtlAcceso

END