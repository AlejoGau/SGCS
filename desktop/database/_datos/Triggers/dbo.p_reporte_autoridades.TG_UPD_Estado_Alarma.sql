CREATE OR ALTER TRIGGER [dbo].[TG_UPD_Estado_Alarma] ON [dbo].[p_reporte_autoridades] AFTER UPDATE AS
BEGIN
	SET NOCOUNT ON;
	--rep_nestado se setea en valor 3 (en proceso), se genera un evento  _RA en p_recepcion.
	Declare @before_rep_nestado int
	Select @before_rep_nestado = rep_nestado From deleted
	
	Declare @rep_nestado int
	Declare @rep_iidcuenta int
	Select @rep_nestado = rep_nestado, @rep_iidcuenta = rep_iidcuenta From inserted
	If(@rep_nestado != @before_rep_nestado and @rep_nestado = 3)
	Begin
		Declare @iValor Int
		EXEC _Datos.dbo.SGSP_AlarmaGenerar @idCta=@rep_iidcuenta, @cAlarma='_RA', @cContenido='SoftGuard'
	End
END