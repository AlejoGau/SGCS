CREATE OR ALTER TRIGGER [dbo].[TG_UPD_ParticionCuentaMadre] ON [dbo].[m_zonas] AFTER INSERT, UPDATE AS
BEGIN
	SET NOCOUNT ON;
	--Tiene tambien el Insert para LNK de usuarios

	Declare @idCuenta int
	Declare @cDealer Char(3)
	Declare @cCuenta Char(10)
	Declare @cCodigo Char(10)
	Declare @cDescripcion nVarChar(30)
	Declare @iUsuario int
	Declare @iLnk int

	Select @cCodigo = zon_ccodigo, @cDealer = zon_cdealer, @cCuenta = zon_ccuenta, @idCuenta = zon_iidcuenta, @cDescripcion = zon_cdescripcion From inserted
	If(Left(@cCodigo,3) = 'PAR')
	Begin
		UPDATE m_cuentas
		SET cue_nparticion = @idCuenta
		WHERE m_cuentas.cue_clinea = @cDealer And m_cuentas.cue_ncuenta = @cCuenta 
	End

	If(Left(@cCodigo,3) = 'LNK')
	Begin
		Select @iLnk = Cast(SUBSTRING(@cCodigo,4,4) As int ) 
		Select @idCuenta = cue_iid From m_cuentas WHERE m_cuentas.cue_clinea = @cDealer And m_cuentas.cue_ncuenta = @cCuenta 
		if not exists(select usu_idKey from m_usuarios where usu_icodigo = 10000+@iLnk and usu_iidcuenta = @idCuenta)
		Begin
			Declare @code int
			Select @code = 10000+@iLnk
			insert into m_usuarios(usu_iidcuenta, usu_icodigo, usu_cnombre, usu_iid, usu_ntipo)
			values(@idCuenta, @code, @cDescripcion, @code,2)
		End
	End
END