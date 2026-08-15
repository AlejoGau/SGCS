CREATE OR ALTER TRIGGER dbo.TG_INS_Contrato
ON dbo.crm_contrato
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @idCliente INT = 0;

    SELECT TOP 1 @idCliente = [cnt_idcliente]
    FROM Inserted;

    IF @idCliente > 0
    BEGIN
        INSERT INTO dbo.crm_contrato
        (
            [cnt_org_fc], [cnt_idcliente], [cnt_fechaalta], [cnt_fechavto],
            [cnt_formapago], [cnt_metadata], [cnt_estado], [cnt_tmp_id],
            [cnt_dinamico], [cnt_cantidad_auto]
        )
        SELECT
            [cnt_org_fc], [cnt_idcliente], [cnt_fechaalta], [cnt_fechavto],
            [cnt_formapago], [cnt_metadata], [cnt_estado], [cnt_tmp_id],
            [cnt_dinamico], [cnt_cantidad_auto]
        FROM Inserted;
    END
END