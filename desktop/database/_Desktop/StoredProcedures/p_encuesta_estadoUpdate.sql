CREATE OR ALTER PROCEDURE [dbo].[p_encuesta_estadoUpdate]
	@epr_cuser NVarChar (255) = '',
	@enc_idkey INT = 0,
	@estado INT = 0,
	@enr_idkey INT = 0,
    --WITH ENCRYPTION	
    @cObservaciones VARCHAR(MAX) = '',
    @lat REAL = '',
    @lng REAL = '',
    @evento VARCHAR(128) = '',
    @app VARCHAR(2) = 'sp'
AS
set noCount on
	DECLARE @SqlR VARCHAR(MAX);
    DECLARE @tableApp VARCHAR(128) = '[_datos].dbo.[SmartPanic] o WITH ( NOLOCK )'
    DECLARE @dll VARCHAR(MAX) = 'SMARTPANICSHTTP'

	UPDATE [_Datos].[dbo].[p_encuesta_respondidas]
	SET enr_estado = @estado, enr_fechaModificacion = GETDATE()
	WHERE enr_encidkey = @enc_idkey AND enr_eprcuser = @epr_cuser AND enr_idkey = @enr_idkey
    
    -- Verifico tabla desde donde debo chequear IMEI en base al parametro app (vc o sp)

    IF @estado = 2 AND @evento != ''
    BEGIN
        -- TODO: Busco el ID de cuenta del dispositivo y el usuario (ACA DEBEMOS REEMPALZAR @tableApp y @dll si es que vino de app = vc) !!!!
        DECLARE @idCta INT = 0;
        DECLARE @idUsuSmartPanic INT = 0;
        DECLARE @nombreUsuSmartPanic VARCHAR(50) = '';

		IF @app = 'sp'
        BEGIN
			SELECT @idUsuSmartPanic = usu.usu_icodigo, @idCta = c.cue_iid, @nombreUsuSmartPanic = usu.usu_cnombre
				FROM [_datos].dbo.[SmartPanic] o WITH ( NOLOCK )
				LEFT JOIN _datos..m_cuentas c with (nolock) ON (o.CuentaId = c.cue_iid)
				LEFT JOIN _datos..m_telefonos t WITH ( NOLOCK ) on (RIGHT(t.tel_ctelefono, 8) = RIGHT(o.Telefono, 8)) AND tel_iidcuenta = c.cue_iid and t.tel_nsp IN (1,3)
				LEFT JOIN _datos..m_usuarios usu WITH ( NOLOCK ) on (usu_iidcuenta = c.cue_iid and usu_iid = t.tel_iid+700)
			WHERE o.Imei = @epr_cuser
            
        END
		ELSE
		BEGIN
            set @dll = 'IRS VigiControl - HTTP'
			SELECT @idUsuSmartPanic = usu.usu_icodigo, @idCta = c.cue_iid, @nombreUsuSmartPanic = usu.usu_cnombre
				FROM [_Datos].[dbo].[SmartTrack] o WITH ( NOLOCK )
				LEFT JOIN _datos..m_cuentas c with (nolock) ON (o.CuentaId = c.cue_iid)
				LEFT JOIN _datos..m_telefonos t WITH ( NOLOCK ) on (RIGHT(t.tel_ctelefono, 8) = RIGHT(o.Telefono, 8)) AND tel_iidcuenta = c.cue_iid and t.tel_nsp IN (1,3)
				LEFT JOIN _datos..m_usuarios usu WITH ( NOLOCK ) on (usu_iidcuenta = c.cue_iid and usu_iid = t.tel_iid+700)
			WHERE o.Imei = @epr_cuser
		END
            
        -- QUERY ORIGINAL
        -- SELECT @idUsuSmartPanic = usu.usu_icodigo, @idCta = c.cue_iid, @nombreUsuSmartPanic = usu.usu_cnombre
        -- FROM [_datos].dbo.[SmartPanic] o WITH ( NOLOCK )
        --     LEFT JOIN _datos..m_cuentas c with (nolock) ON (o.CuentaId = c.cue_iid)
        --     LEFT JOIN _datos..m_telefonos t WITH ( NOLOCK ) on (RIGHT(t.tel_ctelefono, 8) = RIGHT(o.Telefono, 8)) AND tel_iidcuenta = c.cue_iid and t.tel_nsp IN (1,3)
        --     LEFT JOIN _datos..m_usuarios usu WITH ( NOLOCK ) on (usu_iidcuenta = c.cue_iid and usu_iid = t.tel_iid+700)
        -- WHERE o.Imei = @epr_cuser
            
        -- Genero alarma
        EXEC AlarmaGenerar @idCta = @idCta, @cAlarma = @evento, @cObservaciones = @cObservaciones, @lat = @lat, @lng = @lng, @imei = @epr_cuser, @cDll = @dll, @cData = 'Evento generado desde Encuesta', @idUsuario = @idUsuSmartPanic, @cUser = @nombreUsuSmartPanic
    END