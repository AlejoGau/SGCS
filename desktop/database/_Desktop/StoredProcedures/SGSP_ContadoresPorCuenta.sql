CREATE OR ALTER PROCEDURE [dbo].[SGSP_ContadoresPorCuenta]
	@idCta [int]=0
AS
--Obtiene cantidades de algunas tablas asociadas a una cuenta
--Autor : Pablo O. Canónico
--Fecha : 24/05/2024

Set NoCount ON
BEGIN TRY
	SELECT
		@idCta As IDCta,
		(SELECT COUNT(*) FROM [_Datos].[dbo].[m_usuarios] With (NOLOCK) WHERE [usu_iidcuenta] = @idCta) AS UsuariosCount,
		(SELECT COUNT(*) FROM [_Datos].[dbo].[m_telefonos] With (NOLOCK) WHERE [tel_iidcuenta] = @idCta) AS ContactosCount,
		(SELECT COUNT(*) FROM [_Datos].[dbo].[m_zonas] With (NOLOCK) WHERE [zon_iidcuenta] = @idCta and [zon_ccodigo] Not Like 'PAR%') AS ZonasCount,
		(SELECT COUNT(*) FROM [_Datos].[dbo].[m_cuentas] With (NOLOCK) WHERE [cue_nparticion] = @idCta) AS ParticionesCount,
		(SELECT COUNT(*) FROM [_Datos].[dbo].[m_cuentas_video] With (NOLOCK) WHERE [cuv_iidCuenta] = @idCta) AS LinksVideoCount,
		(SELECT COUNT(*) FROM [_Datos].[dbo].[m_cuentas_video_links] With (NOLOCK) WHERE [cvl_iidCuenta] = @idCta) AS LinksVideoPorZonaCount,
		(SELECT COUNT(*) FROM [_Datos].[dbo].[SmartPanic] With (NOLOCK) WHERE [CuentaId] = @idCta) AS SmartPanicsCount,
		(SELECT COUNT(*) FROM [_Datos].[dbo].[m_st_cabecera] With (NOLOCK) WHERE [stc_iid_cuenta] = @idCta And [stc_nestado]=1) AS ServiciosTecnicosCount;

END TRY
BEGIN CATCH
	IF ERROR_NUMBER() = 2627
	BEGIN
		PRINT 'Handling PK violation...';
	END;
	ELSE IF ERROR_NUMBER() = 547
	BEGIN
		PRINT 'Handling CHECK/FK constraint violation...';
	END;
	ELSE IF ERROR_NUMBER() = 515
	BEGIN
		PRINT 'Handling NULL violation...';
	END;
	ELSE IF ERROR_NUMBER() = 245
	BEGIN
		PRINT 'Handling conversion error...';
	END;
	ELSE
	BEGIN
		PRINT 'Re-throwing error...';
	END;

	PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
	PRINT 'Error Message : ' + ERROR_MESSAGE();
	PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
	PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
	PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
	PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
END CATCH