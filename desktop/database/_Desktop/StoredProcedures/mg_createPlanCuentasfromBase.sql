-- =============================================
-- Author:		Rodrigo Román
-- Create date: 24/4/2019
-- Description:	Genera un plan de cuentas para un pais en base a la tabla [t_MaestroCuentasBase]
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_createPlanCuentasfromBase]
	@pais char(2) = 'AR',
	@idorganizacion int
AS
BEGIN
	SET NOCOUNT ON;

	print '[mg_createPlanCuentasfromBase] organizacion: '+convert(varchar(10), @idorganizacion)
	print '[mg_createPlanCuentasfromBase] pais:'+@pais
    
	print '[mg_createPlanCuentasfromBase] inserto las cuentas'
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
		and [mgmc_ccodigo] not in (select [mgmc_ccodigo] from _datos..[MG_MaestroCuentas] where mgmc_idorganizacion = @idorganizacion)

END