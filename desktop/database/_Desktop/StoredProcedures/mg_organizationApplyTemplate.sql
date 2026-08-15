-- =============================================
-- Author:		Rodrigo Román
-- Create date: 25/04/2019
-- Description:	Crea todos los registros necesarios para poder operar con una organizacion nueva
-- 04/03/2026 Pablo. Se agrego creacion de las categorias impositivas
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_organizationApplyTemplate]
	-- Add the parameters for the stored procedure here
	@org_icodigo_id int
AS
BEGIN
	SET NOCOUNT ON;

	
	DECLARE @pais char(2) = 'AR' -- modificar a parametro de la central / pais de la organizacion cuando tengamos otros planes de cuentas
	declare @money char(3) = 'ARS'

	print '[mg_organizationApplyTemplate] busco el pais y la moneda en el maestro de cuentas segun la moneda de la organizacion.'
	select top 1 @pais=[mgmc_pais], @money=[mgmc_moncodigo] from _tablas..[t_MaestroCuentasBase] where [mgmc_moncodigo] in (select  top 1 org_csymbol from _tablas..t_organizacion_fc where org_icodigo_id = @org_icodigo_id) 

	print '[mg_organizationApplyTemplate] [mgmc_pais]: '+@pais
	print '[mg_organizationApplyTemplate] [mgmc_moncodigo]: '+@money

	-- me fijo si no esta el parametro systemcurrency y lo completo.
	declare @systemcurrency varchar(1000);
	select @systemcurrency = par_cvalor from _tablas..t_parametros where rtrim(par_ccodigo) = 'SYSTEMCURRENCY'

	if @systemcurrency = ''
	BEGIN
		print '[mg_organizationApplyTemplate] completo el parametro SYSTEMCURRENCY'
		update _tablas..t_parametros set par_cvalor = @money  where rtrim(par_ccodigo) = 'SYSTEMCURRENCY'
	END
		
	print '[mg_organizationApplyTemplate] Creo el plan de cuentas'
	EXECUTE _desktop..[mg_createPlanCuentasfromBase] @pais,@org_icodigo_id

	print '[mg_organizationApplyTemplate] Creo los comprobantes'
	EXECUTE _desktop..[mg_createComprobantesfromBase] @pais,@org_icodigo_id
	
	print '[mg_organizationApplyTemplate] Creo los impuestos'
	EXECUTE _desktop..[mg_createImpuestosfromBase] @pais,@org_icodigo_id

	print '[mg_organizationApplyTemplate] Creo tipo formas de pago'
	EXECUTE _desktop..[mg_createTiposFormPagofromBase]
	
	print '[mg_organizationApplyTemplate] Creo formas de pago' -- creo una forma por cada tipo de forma de pago, deben viajar los tipos en instalador traducidos x idioma
	EXECUTE _desktop..[mg_createFormasPagofromBase] @org_icodigo_id

	print '[mg_organizationApplyTemplate] Creo condiciones de pago' -- creo una condicion por cada tipo de forma de pago, deben viajar los tipos en instalador traducidos x idioma
	EXECUTE _desktop..[mg_createCondicionesPagofromBase] @org_icodigo_id

	print '[mg_organizationApplyTemplate] Creo una lista de precios'
	EXECUTE _desktop..mg_listaPreciosfromBase @org_icodigo_id

	print '[mg_organizationApplyTemplate] Creo las categorias impositivas'
	EXECUTE _desktop..mg_createCategoriasImpositivasfromBase @pais,@org_icodigo_id

END