CREATE OR ALTER TRIGGER [dbo].[Trg_CuentaDelete] ON [dbo].[m_cuentas] FOR DELETE AS
BEGIN

	SET NOCOUNT ON;

	Declare @iCta Int = 0,
			@iEstado Int = 0
	Declare @cImei nVarChar(20) = '',
			@cCuenta nVarChar(10) = ''
	Declare @cDealer Char(3) = ''
	
	Select @iCta = cue_iid, @cImei = cue_cIMEI, @cDealer = cue_clinea, @cCuenta = cue_ncuenta , @iEstado = IsNull(est_nestado,4)
	From deleted
	Left Outer Join m_estado_cuenta_cab On est_iidcuenta=deleted.cue_iid
	
	BEGIN TRANSACTION 
	If @iCta > 0 And @iEstado = 4
		Begin
			Exec SGSP_CuentaDelete @iCta, @cImei, @cDealer, @cCuenta
			COMMIT 
		End 
	Else 
	    Begin
			Raiserror('%s',0,1,'No se puede BORRAR el registro, porque no esta en situacion Pedir Eliminar.')
		    ROLLBACK TRANSACTION 
	    End
END