-- =============================================
-- Author:		Rodrigo Román
-- Create date: 01/04/2019
-- Description:	Actualiza el saldo del maestro cuando hay movimientos de cuentas
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[MG_ActualizaSaldoMaestroCuenta]
   ON  [dbo].[MG_MovimientosCuentas]
   AFTER INSERT,UPDATE
AS 
BEGIN

	SET NOCOUNT ON;

	UPDATE
		_Datos..MG_MaestroCuentas
	SET
		mgmc_saldo = i.mgm_saldo
	FROM
		_Datos..MG_MaestroCuentas m
		INNER JOIN inserted i
			ON m.mgmc_idkey = i.mgm_idcuenta


END