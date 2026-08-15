-- =============================================
-- Author:		Rodrigo Román
-- Create date: 17/04/2019
-- Description:	Genero el próximo código de cuenta para un grupo
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[getMaestroCuentaCodigo]
	-- Add the parameters for the stored procedure here
	@grupo char(4),
	@idorg int,
	@codigo varchar(50) out
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
	-- busco la ultima cuenta del tipo y le sumo 1
	declare @ultCcodigo varchar(50)
	select top 1  @ultCcodigo = LTRIM(RTRIM(mgmc_ccodigo)) from _datos.dbo.mg_maestrocuentas where mgmc_ctipo=@grupo and mgmc_idorganizacion = @idorg  order by mgmc_ccodigo desc
	print '@ultCcodigo'
	print @ultCcodigo

	--me fijo si hay valor para este grupo
	if @ultCcodigo is null or @ultCcodigo = ''
	BEGIN 
		print 'No hay cuenta para este grupo'
		-- es la priemra cuenta de ese grupo genero el codigo 1
		if @grupo = 'CASH'
			select @ultCcodigo = '1110-000000001'
		else if @grupo = 'C'
			select @ultCcodigo = '1120-000000001'
		else if @grupo = 'IMPC' -- creditos fiscales
			select @ultCcodigo = '1140-000000001'
		else if @grupo = 'PROV'
			select @ultCcodigo = '2110-000000001'
		else if @grupo = 'IMPD' -- Deudas fiscales
			select @ultCcodigo = '2130-000000001'
	END
	else
	BEGIN

		-- tomo el numero final
		declare @ultnumero int
		SELECT @ultnumero = convert(int,SUBSTRING(@ultCcodigo,5+1,LEN(@ultCcodigo)))

		print '@utlnumero'
		print @ultnumero
		-- tomo el grupo de la cuenta
		declare @ultgrupo varchar(5)
		SELECT @ultgrupo = SUBSTRING(@ultCcodigo,0,5)
		print '@ultgrupo'
		print @ultgrupo
		-- sumo uno y armo el leftpad
		select @ultnumero = @ultnumero +1
		declare @suma varchar(50) = '000000000'+CONVERT(varchar(9),@ultnumero)

		select @ultCcodigo = @ultgrupo+'-'+SUBSTRING(@suma,LEN(@suma)-8,len(@suma))
	END
	select @codigo = @ultCcodigo
END