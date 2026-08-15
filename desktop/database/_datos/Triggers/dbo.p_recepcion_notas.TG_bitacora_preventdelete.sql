-- =============================================
-- Author:		Rodrigo Román
-- Create date: 08/10/2020
-- Description:	Impide borrar bitacoras
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[TG_bitacora_preventdelete]
   ON  [dbo].[p_recepcion_notas]
   instead of delete
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @rec_idkey int;
	declare @rec_itipo int;

	select @rec_idkey=rec_idkey, @rec_itipo=rec_itipo from deleted

	if (@rec_itipo=5)
	BEGIN
		RAISERROR ('No se puede eliminar una bitacora',0,1,null)
	END
	ELSE
	BEGIN
		delete from _datos..p_recepcion_notas where rec_idKey= @rec_idkey
	END
	
    -- Insert statements for trigger here

END