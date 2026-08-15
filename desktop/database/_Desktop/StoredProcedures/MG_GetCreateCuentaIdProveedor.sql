-- =============================================
-- Author:		Rodrigo Román
-- Create date: 18/6/2018
-- Description:	Busca el id de la cuenta contable de un proveedor, si no existe la crea
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MG_GetCreateCuentaIdProveedor]
	@cli_icodigo_id int, -- id organizacion proveedor, no este an tabla de clientes, esta en tabla organizaciones.
	@mgmc_idorganizacion int, -- organizacion facturadora
	@mgmc_idkey int OUTPUT -- id cuenta contable
AS
BEGIN
	print '[MG_GetCreateCuentaIdProveedor]'
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @mgmc_ccodigo varchar(50) -- codigo cuenta contable
	declare @mgmc_cdescripcion nvarchar(250) -- descripcion cc uso nombre de la organizacion
	declare @org_csymbol char(3)

	print '[MG_GetCreateCuentaIdProveedor] Busco los datos del cliente y de la cuenta'
	print '[MG_GetCreateCuentaIdProveedor] @cli_icodigo_id'
	print @cli_icodigo_id

	/*
	select @mgmc_idkey=Account, @org_csymbol = Currency, @mgmc_cdescripcion = Name 
		from _datos..Organization
		where id = @cli_icodigo_id
	*/

	select @mgmc_idkey=cli_mgmcidkey, @mgmc_idorganizacion = cli_iorganizacion,@org_csymbol = org_csymbol, @mgmc_cdescripcion = cli_cnombre 
		from _Tablas..t_Organizacion_fc 
		inner join  _datos..m_clientes_fc  on org_icodigo_ID = cli_iOrganizacion
		where cli_icodigo_id =@cli_icodigo_id
		

	print '[MG_GetCreateCuentaIdProveedor] @mgmc_idkey'
	print @mgmc_idkey
	print '[MG_GetCreateCuentaIdProveedor] @mgmc_idorganizacion'
	print @mgmc_idorganizacion
	print '[MG_GetCreateCuentaIdProveedor] @mgmc_cdescripcion'
	print @mgmc_cdescripcion

	if (@mgmc_idkey is null or @mgmc_idkey=0)  and @mgmc_idorganizacion>0
	BEGIN
		print '[MG_GetCreateCuentaIdProveedor] creo la cuenta corriente'

		EXECUTE _desktop..[mg_maestrocuentasIns] 
		   @Name=''
		  ,@mgmc_idorganizacion=@mgmc_idorganizacion
		  ,@mgmc_ccodigo=''
		  ,@mgmc_descripcion=@mgmc_cdescripcion
		  ,@mgmc_ctipo='PROV'
		  ,@mgmc_saldo=0
		  ,@mgmc_moncodigo=@org_csymbol

		select @mgmc_idkey = @@identity
		print '[MG_GetCreateCuentaIdProveedor] @mgmc_idkey'
		print @mgmc_idkey

		print '[MG_GetCreateCuentaIdProveedor] actualizo m_clientes_fc con el valor de la cuenta'

		update _datos..m_clientes_fc  set cli_mgmcidkey=@mgmc_idkey where @cli_icodigo_id = cli_icodigo_id 

	END
END