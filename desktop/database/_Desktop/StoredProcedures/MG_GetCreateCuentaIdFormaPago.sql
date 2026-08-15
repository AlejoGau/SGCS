-- =============================================
-- Author:		Rodrigo Román
-- Create date: 18/4/2019
-- Description:	Busca el id de la cuenta contable de una forma de pago, si no existe la crea
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MG_GetCreateCuentaIdFormaPago]
	@fpg_idkey int,
	@mgmc_idkey int OUTPUT -- id cuenta contable
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @mgmc_ccodigo varchar(50) -- codigo cuenta contable
	declare @idorg int -- id organizacion_fc de la forma de pago
	declare @org_csymbol char(3) -- codigo de la moneda
	declare @fpg_cdescripcion varchar(50)

	print '[MG_GetCreateCuentaIdFormaPago]'
	print '[MG_GetCreateCuentaIdFormaPago] @fpg_idkey'
	print @fpg_idkey

	select @mgmc_idkey=fpg_mgmcidkey, @idorg = fpg_orgidcodigoid,@org_csymbol = org_csymbol, @fpg_cdescripcion=fpg_cdescripcion from _tablas..t_formas_pago_fc 
		inner join _Tablas..t_Organizacion_fc on org_icodigo_ID = fpg_orgidcodigoid
		where fpg_idkey = @fpg_idkey 

	print '[MG_GetCreateCuentaIdFormaPago] @idorg'
	print @idorg

	if  (@mgmc_idkey is null or @mgmc_idkey=0) and @idorg>0
	BEGIN
		
		print '[MG_GetCreateCuentaIdFormaPago] creo la nueva cuenta'
		EXECUTE _desktop..[mg_maestrocuentasIns] 
		   @Name=''
		  ,@mgmc_idorganizacion=@idorg
		  ,@mgmc_ccodigo=''
		  ,@mgmc_descripcion=@fpg_cdescripcion
		  ,@mgmc_ctipo='CASH'
		  ,@mgmc_saldo=0
		  ,@mgmc_moncodigo=@org_csymbol

		select @mgmc_idkey = @@identity
		print '[MG_GetCreateCuentaIdFormaPago] @mgmc_idkey'
		print @mgmc_idkey
		update  _tablas..t_formas_pago_fc  set fpg_mgmcidkey = @mgmc_idkey where fpg_idkey = @fpg_idkey 

	END
	

END