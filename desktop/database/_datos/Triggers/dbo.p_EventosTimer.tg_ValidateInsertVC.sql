CREATE OR ALTER TRIGGER [tg_ValidateInsertVC] ON [dbo].[p_EventosTimer]
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO [dbo].[p_EventosTimer] 
    (
        [pet_cTipo],
        [pet_idCuenta],
        [pet_iRecId],
        [pet_tFechaHora],
        [pet_cAlarma],
        [pet_cZona],
        [pet_iUsuario],
        [pet_iRecId_NR],
        [pet_tLimite_NR],
        [pet_cEvento_NR],
        [pet_iMinutos_NR],
        [pet_cAlarmaAGenerar_NR],
        [pet_cZona_NR],
        [pet_iStatus],
        [pet_tStatusExec]
    )
    SELECT 
        i.[pet_cTipo],
        i.[pet_idCuenta],
        i.[pet_iRecId],
        i.[pet_tFechaHora],
        i.[pet_cAlarma],
        i.[pet_cZona],
        i.[pet_iUsuario],
        i.[pet_iRecId_NR],
        i.[pet_tLimite_NR],
        i.[pet_cEvento_NR],
        i.[pet_iMinutos_NR],
        i.[pet_cAlarmaAGenerar_NR],
        i.[pet_cZona_NR],
        i.[pet_iStatus],
        i.[pet_tStatusExec]
    FROM inserted i
        WHERE NOT EXISTS (SELECT 1 FROM [dbo].[v_CuentasVC] v WHERE i.[pet_idCuenta] = v.[cue_iid]);
END