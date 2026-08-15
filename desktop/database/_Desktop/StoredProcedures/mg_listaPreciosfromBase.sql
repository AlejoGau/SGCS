-- =============================================
-- Author:		Rodrigo Román
-- Create date: 13/05/2019
-- Description:	Genera una lista de precios global para la organizacion usando la misma mondeda.
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_listaPreciosfromBase]
	@idorganizacion int
AS
BEGIN
	SET NOCOUNT ON;

	declare @currency varchar(3)

	declare @mglp_idorganizacion int = 0

	select @currency = org_csymbol, @mglp_idorganizacion =  org_organizacionId from _tablas..t_organizacion_fc where org_icodigo_id = @idorganizacion
	DECLARE @lista AS VARCHAR(250) 
	EXECUTE [dbo].[LocalizationGetLocale] @Name = 'Lista de Precios Base', @soloOutput=1, @translation = @lista OUTPUT;

	select * from [_Datos].[dbo].[MG_listas_precios] where [mglp_idorganizacion] = @mglp_idorganizacion

	if  @@ROWCOUNT = 0 and @mglp_idorganizacion > 0
	BEGIN
		INSERT INTO [_Datos].[dbo].[MG_listas_precios]
			([mglp_nombre]
			,[mglp_tipo]
			,[mglp_multiplicador]
			,[mglp_idorganizacion]
			,[mglp_currency])
		 VALUES
			(@lista
			,0
			,1
			,@mglp_idorganizacion
			,@currency
			)
	 END

END