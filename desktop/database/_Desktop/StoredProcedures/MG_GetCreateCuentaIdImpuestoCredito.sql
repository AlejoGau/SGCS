-- =============================================
-- Author:		Rodrigo Román
-- Create date: 18/06/2019
-- Description:	Busca el id de la cuenta contable de un impuesto de COMPRA, si no existe la crea
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MG_GetCreateCuentaIdImpuestoCredito]
	@mci_impidkey int,
	@mgmc_idkey int OUTPUT -- id cuenta contable
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @mgmc_ccodigo varchar(50) -- codigo cuenta contable
	declare @idorg int -- id organizacion_fc de la forma de pago
	declare @org_csymbol char(3) -- codigo de la moneda
	declare @imp_cdescripcion varchar(50)

	print '[MG_GetCreateCuentaIdImpuesto]'
	print '[MG_GetCreateCuentaIdImpuesto] @mci_impidkey'
	print @mci_impidkey

	-- imp_mgmcidkeyCredito

	select @mgmc_idkey = imp_mgmcidkeyCredito, @imp_cdescripcion= imp_cdescripcion , @idorg = imp_idorganizacion, @org_csymbol = org_csymbol
		from _tablas..t_impuestos_fc
		inner join _Tablas..t_Organizacion_fc on org_icodigo_ID = imp_idorganizacion
		where imp_idkey = @mci_impidkey 

	print '[MG_GetCreateCuentaIdImpuesto] @idorg'
	print @idorg

	if  (@mgmc_idkey is null or @mgmc_idkey=0) and @idorg>0
	BEGIN

		print '[MG_GetCreateCuentaIdImpuesto] creo la nueva cuenta'
		EXECUTE _desktop..[mg_maestrocuentasIns] 
		   @Name=''
		  ,@mgmc_idorganizacion=@idorg
		  ,@mgmc_ccodigo=''
		  ,@mgmc_descripcion=@imp_cdescripcion
		  ,@mgmc_ctipo='IMPC'
		  ,@mgmc_saldo=0
		  ,@mgmc_moncodigo=@org_csymbol

		select @mgmc_idkey = @@identity
		print '[MG_GetCreateCuentaIdImpuesto] actualizo el id de la cuenta en t_impuestos_fc'
		print '[MG_GetCreateCuentaIdImpuesto] @mgmc_idkey'
		print @mgmc_idkey
		update  _tablas..t_impuestos_fc  set imp_mgmcidkeyCredito = @mgmc_idkey where imp_idkey = @mci_impidkey 

	END
	

END