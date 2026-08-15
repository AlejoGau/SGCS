CREATE OR ALTER PROCEDURE [dbo].[SP_BuscoEstadoCuentaIG] @iCuenta Int AS
--Consulta el estado de la cuenta de los clientes en IGGlobal
SET NOCOUNT ON
Select Saldo From SGIGIntercambio.dbo.NT_SaldosClientes
	Where CoSucursal = @iCuenta And Saldo > 0