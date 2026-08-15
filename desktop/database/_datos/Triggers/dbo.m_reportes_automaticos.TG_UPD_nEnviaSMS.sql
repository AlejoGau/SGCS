CREATE OR ALTER TRIGGER [dbo].[TG_UPD_nEnviaSMS] ON [dbo].[m_reportes_automaticos] AFTER UPDATE AS
BEGIN
	SET NOCOUNT ON;

	Declare @iLimiteSMS As Smallint
	Declare @nLimiteCada As Numeric(3,0)
	Declare @nCadaUnidadTiempo As Numeric(1,0)
	Select @iLimiteSMS=rep_iLimiteSMS, @nLimiteCada=rep_nLimiteCada, @nCadaUnidadTiempo=rep_nCadaUnidadTiempo From deleted
	
	Declare @iCta As Int
	Declare @iLimiteSMS_INS As Smallint
	Declare @nLimiteCada_INS As Numeric(3,0)
	Declare @nCadaUnidadTiempo_INS As Numeric(1,0)
	Select @iCta=rep_iidcuenta, @iLimiteSMS_INS=rep_iLimiteSMS, @nLimiteCada_INS=rep_nLimiteCada, @nCadaUnidadTiempo_INS=rep_nCadaUnidadTiempo From inserted

	If ( @iLimiteSMS != @iLimiteSMS_INS Or @nLimiteCada != @nLimiteCada_INS Or @iLimiteSMS != @iLimiteSMS_INS )
	Begin
		Update m_status
            Set sta_nEnviaSMS=0
         Where sta_iidcuenta = @iCta
	End
END