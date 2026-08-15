CREATE OR ALTER TRIGGER [dbo].[TG_ListaDefault]
   ON  [dbo].[m_telefonos]
   Instead Of INSERT
AS 
BEGIN
	SET NOCOUNT ON;

	Declare @cLista Char(3)=''
	Select top 1 @cLista = [tel_clista] From inserted
	
	If @cLista = ''
		set @cLista = '001'

	Insert Into [dbo].[m_telefonos]([tel_iidcuenta],[tel_iid],[tel_clista],[tel_cnombre],[tel_cobservacion],[tel_ctelefono],[tel_ndiscado],[tel_cpredigito],[tel_cpostdigito],[tel_norden],[tel_ntr],[tel_cclave],[tel_cpermiso],[tel_nsms],[tel_nsp],[tel_cinternacional],[tel_ccountrycode],[tel_iismobile])
		Select [tel_iidcuenta],[tel_iid],@cLista,[tel_cnombre],[tel_cobservacion],[tel_ctelefono],[tel_ndiscado],[tel_cpredigito],[tel_cpostdigito],[tel_norden],[tel_ntr],[tel_cclave],[tel_cpermiso],[tel_nsms],[tel_nsp],[tel_cinternacional],[tel_ccountrycode],[tel_iismobile]
		From inserted
END