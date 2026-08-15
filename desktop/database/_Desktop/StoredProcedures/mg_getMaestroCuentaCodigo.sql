-- =============================================
-- Author:		Rodrigo Román
-- Create date: 24/04/2019
-- Description:	Genero el próximo código de cuenta para un grupo
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_getMaestroCuentaCodigo]
	-- Add the parameters for the stored procedure here
	@grupo varchar(4),
	@idorg int,
	@codigo varchar(50) out,
	@capitulo int out,
	@rubro int out,
	@subrubro int out,
	@imputacion int out
AS
BEGIN
	SET NOCOUNT ON;
	--https://www.cfecursos.com.ar/plan-de-cuentas/
	-- Activo 1000
	-- Activo corriente 1100
    -- CASH (Caja y bancos) 1110
	-- C (clientes / deudores x ventas) 1120
	-- IMPC (Creditos fiscales) 1140
	-- Pasivo 2000
	-- Pasivo Corriente 2100
	-- PROV (Deudas comerciales) 2110
	-- IMPD (Deudas fiscales) 2130
	print '[mg_getMaestroCuentaCodigo]'
	declare @mgmc_descripcion VarChar (250)
	declare @csubrubro varchar(4) 
	declare @cimputacion varchar(12)

	-- es la priemra cuenta de ese grupo genero el codigo 
	if @grupo = 'CASH'
	BEGIN
		select @capitulo = 1
		select @rubro = 1
		select @subrubro = 1
		select @imputacion = 0
		select @mgmc_descripcion = 'CAJA Y BANCOS'
	END
	else if @grupo = 'C'
	BEGIN 
		select @capitulo = 1
		select @rubro = 1
		select @subrubro = 2
		select @imputacion = 0
		select @mgmc_descripcion = 'DEUDORES X VENTAS'
	END
	else if @grupo = 'IMPC' -- creditos fiscales
	BEGIN
		select @capitulo = 1
		select @rubro = 1
		select @subrubro = 4
		select @imputacion = 0
		select @mgmc_descripcion = 'CREDITOS FISCALES'
	END
	else if @grupo = 'PROV'
	BEGIN
		select @capitulo = 2
		select @rubro = 1
		select @subrubro = 1
		select @imputacion = 0
		select @mgmc_descripcion = 'DEUDAS COMERCIALES'
	END
	else if @grupo = 'IMPD' -- Deudas fiscales
	BEGIN
		select @capitulo = 2
		select @rubro = 1
		select @subrubro = 3
		select @imputacion = 0
		select @mgmc_descripcion = 'DEUDAS FISCALES'
	END
	print '[mg_getMaestroCuentaCodigo] Calculo el código del nuevo grupo'
	declare @mgmc_moncodigo char(3)
	select @mgmc_moncodigo = org_csymbol from _tablas..t_organizacion_fc where org_icodigo_id = @idorg
	select @csubrubro = '00'+CONVERT(varchar(2),@subrubro)
	select  @cimputacion = '000000'+CONVERT(varchar(6),@imputacion)
	select @codigo = convert(char(1),@capitulo)+convert(char(1),@rubro)+SUBSTRING(@csubrubro,LEN(@csubrubro)-1,len(@csubrubro))+'.'+SUBSTRING(@cimputacion,LEN(@cimputacion)-5,len(@cimputacion))
	print @codigo

	/*
	print '[mg_getMaestroCuentaCodigo] Busco si hay datos en el plan de cuentas para el grupo'
	select top 1 @capitulo = mgmc_capitulo,@rubro = mgmc_rubro, @subrubro = mgmc_subrubro, @imputacion = mgmc_imputacion  , @codigo = mgmc_ccodigo
		from _datos..mg_maestrocuentas
		where mgmc_ctipo = 'TIT'
		and mgmc_idorganizacion = @idorg
		order by mgmc_ccodigo desc
	*/
	
	print '[mg_getMaestroCuentaCodigo] @capitulo'
	print @capitulo
	print '[mg_getMaestroCuentaCodigo] @imputacion'
	print @imputacion
	print '[mg_getMaestroCuentaCodigo] @codigo grupo'
	print @codigo
	
	--me fijo si hay valor para este grupo
	if NOT exists (select * from _datos..mg_maestrocuentas where mgmc_ccodigo = @codigo and mgmc_idorganizacion = @idorg)
	BEGIN 
		print '[mg_getMaestroCuentaCodigo] No hay cuenta para este grupo '+@grupo
		print '[mg_getMaestroCuentaCodigo] Inserto la cuenta del nuevo grupo'
		
		Insert into _datos.dbo.mg_maestrocuentas ([mgmc_idorganizacion],[mgmc_ccodigo],[mgmc_descripcion],[mgmc_ctipo],[mgmc_lastupdate],[mgmc_saldo],[mgmc_moncodigo],[mgmc_metadata],[mgmc_capitulo],[mgmc_rubro],[mgmc_subrubro],[mgmc_imputacion])
			values ( @idorg, @codigo, @mgmc_descripcion, 'TIT', getdate(), 0, @mgmc_moncodigo, '', @capitulo, @rubro, @subrubro, @imputacion)
			
	END

	select top 1 @imputacion = mgmc_imputacion  , @codigo = mgmc_ccodigo
		from _datos..mg_maestrocuentas
		where mgmc_capitulo = @capitulo
		and mgmc_idorganizacion = @idorg
		and mgmc_rubro = @rubro
		and mgmc_subrubro = @subrubro
		order by mgmc_ccodigo desc
	
	select @imputacion = @imputacion +1
	select @cimputacion = '000000'+CONVERT(varchar(6),@imputacion)
	select @codigo = convert(char(1),@capitulo)+convert(char(1),@rubro)+SUBSTRING(@csubrubro,LEN(@csubrubro)-1,len(@csubrubro))+'.'+SUBSTRING(@cimputacion,LEN(@cimputacion)-5,len(@cimputacion))
	print '[mg_getMaestroCuentaCodigo] codigo calculado: ' +@codigo
	

END