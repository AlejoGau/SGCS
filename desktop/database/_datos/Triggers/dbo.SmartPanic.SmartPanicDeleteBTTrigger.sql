CREATE OR ALTER TRIGGER [dbo].[SmartPanicDeleteBTTrigger] 
   ON  dbo.SmartPanic
   AFTER UPDATE
AS 
BEGIN
	-- =============================================
	-- Author:	Roman Rodrigo
	-- Create date: 17/04/2020
	-- Description:	Elimina el BT relacionado al cambiar el IMEI de un SP
	-- =============================================

	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @imei varchar(128);
	declare @imeinew varchar(128);

	select @imei = imei from DELETED;
	select @imeinew  = imei from INSERTED; 

	if (@imei != @imeinew)
		BEGIN
			delete from _datos..p_SpRemoteBtn where srb_spimei = @imei
			-- limpio la base por otros botones no asignados
			delete from _datos..p_SpRemoteBtn where srb_spimei not in (select imei from _datos..SmartPanic)
		END
END