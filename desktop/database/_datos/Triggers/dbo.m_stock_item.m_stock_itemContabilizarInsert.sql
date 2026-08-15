CREATE OR ALTER TRIGGER [dbo].[m_stock_itemContabilizarInsert]
ON [dbo].[m_stock_item]
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;
	Declare @idItem Int

	Select @idItem = sti_idkey From inserted
		
	Execute _Desktop..ContabilizarItemStock @idItem 

END