CREATE OR ALTER TRIGGER [dbo].[TG_ControlLimiteSMS]
	ON dbo.p_SMSqueue
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Insertar con control de límites SOLO para tgm_ntipo = 12
    INSERT INTO p_SMSqueue (
        que_idCuenta, 
        que_tfechahora, 
        que_iModemSMS, 
        que_cAsunto, 
        que_cDestino, 
        que_nEstado,
        que_idCmd,
        que_nRechazo
    )
    SELECT 
        i.que_idCuenta,
        i.que_tfechahora,
        i.que_iModemSMS,
        Case When CHARINDEX('  ', i.que_cAsunto) > 0 Then dbo.LimpiarEspaciosMultiples(i.que_cAsunto) Else i.que_cAsunto End,
        i.que_cDestino,
        -- Calcular estado según límite Solamente si es gateway tipo 12:WAD Rest API Gateway
        CASE 
            WHEN g.tgm_ntipo = 12
                AND l.TieneControles = 1 
                AND (
                    SELECT COUNT(*)
                    FROM p_SMSqueue q2
                    WHERE q2.que_idCuenta = i.que_idCuenta
                    AND q2.que_tfechahora >= 
                        CASE l.Control_UnidadDeTiempo
                            WHEN 0 THEN CAST(CAST(i.que_tfechahora AS DATE) AS DATETIME)
                            WHEN 1 THEN DATEADD(MONTH, DATEDIFF(MONTH, 0, i.que_tfechahora), 0)
                            WHEN 2 THEN DATEADD(YEAR, DATEDIFF(YEAR, 0, i.que_tfechahora), 0)
                        END
                    AND q2.que_tfechahora <= i.que_tfechahora
                ) >= l.Control_TotalXCuenta
            THEN 5  -- Límite superado
            ELSE ISNULL(i.que_nEstado, 0)  -- Estado original
        END as que_nEstado,
        i.que_idCmd,
        i.que_nRechazo
    FROM inserted i
    LEFT JOIN _Tablas..t_modems_sms t ON i.que_iModemSMS = t.sms_icodigo
    LEFT JOIN _Tablas..t_gatewaysmsg g ON t.sms_igateway = g.tgm_idkey
    LEFT JOIN m_cuentas c ON i.que_idCuenta = c.cue_iid
    LEFT JOIN _Tablas..t_lineas l ON c.cue_clinea = l.lin_ccodigo;
END