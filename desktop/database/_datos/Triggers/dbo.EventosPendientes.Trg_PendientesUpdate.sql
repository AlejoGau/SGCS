CREATE OR ALTER TRIGGER [dbo].[Trg_PendientesUpdate] ON dbo.EventosPendientes AFTER UPDATE AS
BEGIN
	SET NOCOUNT ON;
	Update [dbo].[EventosPendientes]
	Set _Update = GETDATE()
	From Inserted
	Where [dbo].[EventosPendientes].[evp_idKey] = Inserted.evp_idKey

END