CREATE OR ALTER TRIGGER [dbo].[TG_UPD_EnviadosSMSDesde] ON [dbo].[m_status]  AFTER UPDATE AS
BEGIN
	SET NOCOUNT ON;

	Declare @iEnviadosSMS smallint
	Declare @idCuenta int
	Select @iEnviadosSMS = sta_iEnviadosSMS, @idCuenta = sta_iidcuenta From inserted
	If(@iEnviadosSMS= 1)
	Begin
		UPDATE m_status
		SET sta_tEnviadosSMSDesde = GETDATE()
		WHERE sta_iidcuenta = @idCuenta
	End
END