-- =============================================
-- Author:		Rodrigo Román
-- Create date: 26/02/2020
-- Description:	Genera los tipos forma de pago
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_createTiposFormPagofromBase]

AS
BEGIN
	
	SET NOCOUNT ON;

	print '[mg_createTiposFormPagofromBase]'

	declare @cantidad int=0
	select @cantidad = count(*) from  [_Tablas].[dbo].[t_tipos_formapago_fc]
	declare @texto nvarchar(max)

	EXECUTE [dbo].[LocalizationGetLocale] @Name = "Efectivo", @soloOutput=1, @translation = @texto OUTPUT;

	if @cantidad = 0
	BEGIN
		INSERT INTO [_Tablas].[dbo].[t_tipos_formapago_fc]
           ([tfp_ccodigo]
           ,[tfp_cdescripcion])
		VALUES
           ('001',
           @texto)

	END


END