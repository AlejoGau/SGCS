CREATE OR ALTER TRIGGER [dbo].[TG_DEL_ParticionCuentaMadre] 
   ON  [dbo].[m_zonas]
   AFTER DELETE
AS 
BEGIN
	SET NOCOUNT ON;

	Declare @idCuenta int
	Declare @cDealer Char(3)
	Declare @cCuenta Char(10)
	Declare @cCodigo Char(10)

	Select @cCodigo = zon_ccodigo, @cDealer = zon_cdealer, @cCuenta = zon_ccuenta, @idCuenta = zon_iidcuenta From deleted
	If(Left(@cCodigo,3) = 'PAR')
	Begin
		UPDATE m_cuentas
		SET cue_nparticion = 0
		WHERE m_cuentas.cue_clinea = @cDealer And m_cuentas.cue_ncuenta = @cCuenta 
	End

END