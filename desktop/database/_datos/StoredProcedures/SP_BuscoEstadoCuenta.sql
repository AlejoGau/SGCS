CREATE OR ALTER PROCEDURE [dbo].[SP_BuscoEstadoCuenta] @iCuenta Int, @cDealer Character(3) AS
--Consulta el estado de la cuenta de los clientes de MoneyGuard
SET NOCOUNT ON
Select Top 1 cli_nsituacion FROM m_clientes_fc
	Inner Join m_relacion_cliente_cuentas_fc
	On cli_icodigo_ID = rel_icliente
	Where cli_nsituacion = 2 And 
		( ( rel_icuenta= @iCuenta And rel_cdealer=@cDealer ) Or
		  ( rel_icuenta=-1 And rel_cdealer=@cDealer ) )