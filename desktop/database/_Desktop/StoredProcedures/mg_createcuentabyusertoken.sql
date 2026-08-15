-- =============================================
-- Author:		Rodrigo Román
-- Create date: 15/04/2019
-- Description:	Crea una cuenta en el plan de cuentas para la organizacion del usuario logueado
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_createcuentabyusertoken]
	-- Add the parameters for the stored procedure here
	@token varchar(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- busco la organizacion del usuario logueado
	DECLARE @UserId INT    
	SELECT @UserId = dbo.GetUserIdByToken(@token)    

	DECLARE @udw_empresa INT
	SELECT @udw_empresa = udw_empresa FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_idKey = @UserId
	-- busco la primer org facturadora de la organizacion
	declare @org_icodigo_ID int
	declare @org_csymbol char(3)
	select @org_icodigo_ID = org_icodigo_ID,@org_csymbol = org_csymbol  from _Tablas..t_Organizacion_fc where org_organizacionId = @udw_empresa

	-- inserto la cuenta contable usando el id

	INSERT INTO _Datos..[MG_MaestroCuentas]
        ([mgmc_idorganizacion]
		,mgmc_ccodigo
		,mgmc_descripcion
		,mgmc_ctipo
		,mgmc_saldo
        ,[mgmc_moncodigo]
	)
    VALUES
        (@org_icodigo_ID
		,''
		,''
		,'CASH'
		,0
        ,@org_csymbol)

	-- devuelvo el id de la nueva cuenta creada
	select SCOPE_IDENTITY()
END