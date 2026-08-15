CREATE OR ALTER PROCEDURE [dbo].[SGSP_SofIAVoiceCallEventsPending]
    @MaxEvents INT = 50,
    @DefaultAttempts INT = 2,
    @DefaultRingTimeoutSec INT = 25,
    @MaxEventAgeMinutes INT = 60
WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta SofIAVoiceCallEventService para obetener los eventos pendientes de enviar al EndPoint
--Autor :Pablo O. Canónico
--Fecha :11/12/2025
Set NoCount On
BEGIN TRY
	DECLARE @tFechaHoraInicio DATETIME;
	    
    IF (@MaxEventAgeMinutes IS NULL OR @MaxEventAgeMinutes <= 0)
        SET @tFechaHoraInicio = '19000101';
    ELSE
        SET @tFechaHoraInicio = DATEADD(MINUTE, -@MaxEventAgeMinutes, GETDATE());

	;WITH Pending AS
	(
		SELECT TOP (@MaxEvents)
			   s.sve_idKey,
			   s.sve_iRecId,
			   s.sve_tEventDate,
			   s.sve_cAlarma,
			   s.sve_cDealer,
			   s.sve_cEventType
		FROM dbo.SofIA_VoiceCallEvents AS s
		WHERE s.sve_iStatus = 0
			AND s.sve_tCreatedDate >= @tFechaHoraInicio 
		ORDER BY s.sve_tCreatedDate
	)
	SELECT
		p.sve_idKey AS Id,
		PayloadJson =
			STUFF(
				root.RootJson,
				LEN(root.RootJson),        -- posición del último carácter (el '}')
				0,
				',"call_plan":[' + ISNULL(cp.CallPlanItems, '') + ']'
			)
	FROM Pending                     AS p
	INNER JOIN _Datos.dbo.p_recepcion      AS r  ON r.rec_iid      = p.sve_iRecId
	INNER JOIN _Tablas.dbo.t_codigos_alarma AS ca ON ca.cod_ccodigo = p.sve_cAlarma
	INNER JOIN _Datos.dbo.m_cuentas        AS c  ON c.cue_iid      = r.rec_iidcuenta
	-- metadata:
	CROSS APPLY
	(
		SELECT MetadataJson =
			JSON_QUERY(
				(
					SELECT r.rec_czona AS zone
					FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
				)
			)
	) AS meta
	-- call_context:
	CROSS APPLY
	(
		SELECT CallContextJson =
			JSON_QUERY(
				(
					SELECT
						c.cue_cnombre AS nombre_cuenta,
						CONVERT(VARCHAR(5), p.sve_tEventDate, 108) AS hora_evento, -- HH:MM
						ca.cod_cdescripcion AS tipo_evento_descripcion,
						CONVERT(VARCHAR(20), p.sve_iRecId) AS id_evento_softguard--,
						--c.cue_cclave AS palabra_clave_esperada
					FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
				)
			)
	) AS ctx
	-- call_plan:
	CROSS APPLY
	(
		SELECT CallPlanItems =
			STUFF(
				(
					SELECT
						',' +
						'{' +
							'"' + REPLACE(LTRIM(RTRIM(t.tel_cnombre)), '"', '\"') + '":"' +
								   REPLACE(LTRIM(RTRIM(t.tel_cinternacional)), '"', '\"') + '",' +
							'"priority":'          + CAST(ISNULL(t.tel_norden, 0) AS VARCHAR(10)) + ',' +
							'"attemps":'           + CAST(@DefaultAttempts AS VARCHAR(10)) + ',' +
							'"ring_timeout_sec":'  + CAST(@DefaultRingTimeoutSec AS VARCHAR(10)) + ',' +
							'"palabra_clave_contacto":"' +
								 REPLACE(
									 COALESCE(
										 NULLIF(LTRIM(RTRIM(t.tel_cclave)), ''),  -- 1º prioridad: clave del teléfono
										 NULLIF(LTRIM(RTRIM(c.cue_cclave)), ''),  -- 2º prioridad: clave de la cuenta
										 ''                                       -- fallback vacío
									 ),
									 '"', '\"'
								 ) +
							'"' +
						'}'
					FROM _Datos.dbo.m_telefonos AS t
					WHERE t.tel_iidcuenta      = c.cue_iid
					  AND t.tel_ntr            = 1
					  AND t.tel_cinternacional <> ''
					ORDER BY t.tel_norden, t.tel_iid
					FOR XML PATH(''), TYPE
				).value('.', 'nvarchar(max)'),
				1, 1, ''
			)
	) AS cp

	CROSS APPLY
	(
		SELECT RootJson =
			(
				SELECT
					p.sve_cEventType AS event_type,
					CONVERT(VARCHAR(23), p.sve_tEventDate, 126) + 'Z' AS occurred_at,
					ca.cod_cdescripcion AS description,
					meta.MetadataJson   AS metadata,
					ctx.CallContextJson AS call_context
				FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
			)
	) AS root;

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