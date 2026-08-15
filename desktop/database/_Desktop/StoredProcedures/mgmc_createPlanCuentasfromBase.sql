-- =============================================
-- Author:		Rodrigo Román
-- Create date: 24/4/2019
-- Description:	Genera un plan de cuentas para un pais en base a la tabla [t_MaestroCuentasBase]
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mgmc_createPlanCuentasfromBase]
	@pais char(2) = 'AR',
	@idorganizacion int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	INSERT INTO _datos..[MG_MaestroCuentas]
        ([mgmc_idorganizacion]
        ,[mgmc_ccodigo]
        ,[mgmc_descripcion]
        ,[mgmc_ctipo]
        ,[mgmc_lastupdate]
        ,[mgmc_saldo]
        ,[mgmc_moncodigo]
        ,[mgmc_metadata]
        ,[mgmc_capitulo]
        ,[mgmc_rubro]
        ,[mgmc_subrubro]
        ,[mgmc_imputacion])
    select 
        @idorganizacion
        ,[mgmc_ccodigo]
        ,[mgmc_descripcion]
        ,[mgmc_ctipo]
        ,getdate()
        ,0
        ,[mgmc_moncodigo]
        ,''
        ,[mgmc_capitulo]
        ,[mgmc_rubro]
        ,[mgmc_subrubro]
        ,0
		from _tablas..t_maestrocuentasbase
		where [mgmc_pais] = @pais
		and [mgmc_ccodigo] not in (select [mgmc_ccodigo] from _datos..[MG_MaestroCuentas])

END