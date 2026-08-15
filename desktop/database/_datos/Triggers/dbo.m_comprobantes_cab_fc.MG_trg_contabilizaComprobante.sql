CREATE OR ALTER TRIGGER [dbo].[MG_trg_contabilizaComprobante]
   ON  [dbo].[m_comprobantes_cab_fc]
   AFTER INSERT, UPDATE
AS 
BEGIN
	SET NOCOUNT ON;
	declare @cbc_icodigo_id int = 0
	DECLARE db_cursor CURSOR FOR  
	SELECT cbc_icodigo_id FROM inserted 

	OPEN db_cursor   
	FETCH NEXT FROM db_cursor INTO @cbc_icodigo_id   

	WHILE @@FETCH_STATUS = 0   
	BEGIN 
	   exec _desktop..mg_contabilizarcomprobante @cbc_icodigo_id
	   FETCH NEXT FROM db_cursor INTO @cbc_icodigo_id   
	END   

	CLOSE db_cursor   
	DEALLOCATE db_cursor

END