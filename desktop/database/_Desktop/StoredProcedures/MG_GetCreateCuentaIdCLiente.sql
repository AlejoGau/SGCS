-- =============================================
-- Author:		Rodrigo Román
-- Create date: 2/6/2018
-- Description:	Busca el id de la cuenta contable de un cliente, si no existe la crea
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[MG_GetCreateCuentaIdCLiente]
	@cli_icodigo_id int,
	@mgmc_idkey int OUTPUT -- id cuenta contable
AS
BEGIN
	print '[MG_GetCreateCuentaIdCLiente]'
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @mgmc_ccodigo varchar(50) -- codigo cuenta contable
	declare @mgmc_idorganizacion int -- organizacion facturadora
	declare @mgmc_cdescripcion nvarchar(250) -- descripcion cc uso nombre de la organizacion
	declare @org_csymbol char(3)

	print '[MG_GetCreateCuentaIdCLiente] Busco los datos del cliente y de la cuenta'

	select @mgmc_idkey=cli_mgmcidkey, @mgmc_idorganizacion = cli_iorganizacion,@org_csymbol = org_csymbol, @mgmc_cdescripcion = cli_cnombre 
		from _Tablas..t_Organizacion_fc 
		inner join  _datos..m_clientes_fc  on org_icodigo_ID = cli_iOrganizacion
		where cli_icodigo_id =@cli_icodigo_id

	print '[MG_GetCreateCuentaIdCLiente] @mgmc_idkey'
	print @mgmc_idkey
	print '[MG_GetCreateCuentaIdCLiente] @mgmc_idorganizacion'
	print @mgmc_idorganizacion

	print '[MG_GetCreateCuentaIdCLiente] me fijo si la cuenta existe en el maestro'
	declare @mgmc_idkeyIsValid int = 0

	select @mgmc_idkeyIsValid = count(*) from _datos..[MG_MaestroCuentas] where mgmc_idkey = @mgmc_idkey

	if (@mgmc_idkey is null or @mgmc_idkeyIsValid= 0 or @mgmc_idkey=0)  and @mgmc_idorganizacion>0
	BEGIN
		print '[MG_GetCreateCuentaIdCLiente] creo la cuenta corriente'

		EXECUTE _desktop..[mg_maestrocuentasIns] 
		   @Name=''
		  ,@mgmc_idorganizacion=@mgmc_idorganizacion
		  ,@mgmc_ccodigo=''
		  ,@mgmc_descripcion=@mgmc_cdescripcion
		  ,@mgmc_ctipo='C'
		  ,@mgmc_saldo=0
		  ,@mgmc_moncodigo=@org_csymbol

		select @mgmc_idkey = @@identity
		print '[MG_GetCreateCuentaIdCLiente] @mgmc_idkey'
		print @mgmc_idkey

		print '[MG_GetCreateCuentaIdCLiente] actualizo m_clientes_fc con el valor de la cuenta'

		update _datos..m_clientes_fc  set cli_mgmcidkey=@mgmc_idkey where @cli_icodigo_id = cli_icodigo_id 

	END
	

END