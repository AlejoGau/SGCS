CREATE OR ALTER TRIGGER [dbo].[trg_crm_contrato_item_ValidateIdContrato]
ON [dbo].[crm_contrato_item]
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1 FROM inserted
        WHERE idcontrato = 0
    )
    BEGIN
        RAISERROR('El campo id contrato no puede ser cero.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END
END