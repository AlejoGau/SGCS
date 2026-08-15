-- =============================================
-- Author:		Rodrigo Román
-- Create date: 17/04/2019
-- Description:	Crea una forma de pago en la organizacion del usuario logueado
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[t_formas_pagoCreateByToken]

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

	-- inserto la forma de pago para esa organizacion facturadora
	declare @fpg_ccodigo char(3)
	select @fpg_ccodigo = right('000'+ convert(varchar,  ISNULL(MAX(convert(int,fpg_ccodigo)),0) + 1), 3) from _tablas..t_formas_pago_fc

	INSERT INTO _tablas..[t_formas_pago_fc]
           ([fpg_ccodigo]
           ,[fpg_cdescripcion]
           ,[fpg_cdescripcionreducida]
           ,[fpg_npidenumero]
           ,[fpg_npidevencimiento]
           ,[fpg_npidebanco]
           ,[fpg_ctipo]
           ,[fpg_orgidcodigoid])
     VALUES
           (@fpg_ccodigo
           ,''
           ,''
           ,0
           ,0
           ,0
           ,''
           ,@org_icodigo_ID)


	-- devuelvo el id de la nueva cuenta creada
	select SCOPE_IDENTITY() as fpg_idkey
END