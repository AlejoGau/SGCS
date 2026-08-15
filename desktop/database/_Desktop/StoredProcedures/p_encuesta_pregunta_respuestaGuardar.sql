CREATE OR ALTER PROCEDURE [dbo].[p_encuesta_pregunta_respuestaGuardar]
	@epr_epgidkey Int = 0,
	@epr_cvalue NVarChar (MAX) = '',
	@epr_ivalue Int = 0,
	@epr_cuser NVarChar (255) = '',
	@epr_itipousuario NVarChar (255) = '',
	@epr_cnombreusuario NVarChar (255) = '',
	@epr_cnombrecuenta NVarChar (255) = '',
	@epr_icuenta Int = 0,
	@epr_ctelefono VarChar (25) = '',
    @epr_enridkey INT = 0
--WITH ENCRYPTION			 
AS
set noCount on
	
	-- Obtengo datos del SP que lleno la encuesta
	DECLARE @Telefono NVARCHAR(128);
	DECLARE @CuentaId INT;
	DECLARE @NombreSP NVARCHAR(256);
	DECLARE @NombreCuenta NVARCHAR(256);
	DECLARE @Imei NVARCHAR(255);

	-- @epr_cuser, corresponde al IMEI. A la encuesta le llega por parametro.
	-- @epr_itipousuario, corresponde al Id de Object de SmartPanic

	SELECT @Telefono = Telefono, @CuentaId = CuentaId, @NombreSP = Nombre, @NombreCuenta = c.cue_cnombre 
	FROM [_Datos].[dbo].[SmartPanic] sp
		INNER JOIN [_Datos].[dbo].[m_cuentas] c ON (c.cue_iid = sp.CuentaId)
	WHERE sp.Imei = @epr_cuser

	Insert into _datos.dbo.p_encuesta_pregunta_respuesta ([epr_epgidkey],[epr_cvalue],[epr_ivalue],[epr_cuser],[epr_itipousuario],[epr_cnombreusuario],[epr_cnombrecuenta],[epr_icuenta],[epr_ctelefono],[epr_enridkey])
	values ( @epr_epgidkey, @epr_cvalue, @epr_ivalue, @epr_cuser, '3067', @NombreSP, @NombreCuenta, @CuentaId, @Telefono, @epr_enridkey)
										
	exec p_encuesta_pregunta_respuestaSel @@Identity