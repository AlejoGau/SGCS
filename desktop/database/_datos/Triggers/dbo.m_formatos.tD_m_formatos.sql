CREATE OR ALTER TRIGGER [dbo].[tD_m_formatos] ON [dbo].[m_formatos] FOR DELETE AS
BEGIN
   DECLARE @errno   int,
           @errmsg  varchar(255)
    BEGIN TRANSACTION 
    IF exists (
       SELECT  * FROM deleted,_Datos.dbo.m_receptores_item
       WHERE _datos.dbo.m_receptores_item.rec_cformato = deleted.for_ccodigo )
    BEGIN 
        SELECT @errmsg = 'No se puede BORRAR el registro, porque existe una instancia en Receptores Item.'
        Raiserror('%s',0,1,@errmsg)
        ROLLBACK TRANSACTION 
    END 
    ELSE 
       COMMIT 
END