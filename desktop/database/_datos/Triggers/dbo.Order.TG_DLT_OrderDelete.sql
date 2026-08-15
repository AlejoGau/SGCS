CREATE OR ALTER TRIGGER [dbo].[TG_DLT_OrderDelete] ON [dbo].[Order] FOR DELETE AS
BEGIN
	DECLARE @OrderId INT = 0
	
	SELECT @OrderId = Id FROM deleted

	DELETE FROM OrderItem where OrderId = @OrderId

END