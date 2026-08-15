CREATE OR ALTER TRIGGER [dbo].[TG_DEL_PlanillaCascada] 
   ON  [dbo].[m_planillas]
   AFTER DELETE
AS 
BEGIN
	SET NOCOUNT ON;

	Declare @idPlantilla int
	Declare @cNombreTabla nVarChar(50)
	
	Select @idPlantilla=[pla_iid], @cNombreTabla=[pla_cNombreTabla] From deleted
	If(Left(@cNombreTabla,7) = 'M_ZONAS')
	Begin
		Delete From [dbo].[m_zonas_planilla]
		Where [zon_iid]=@idPlantilla
	End

	If(Left(@cNombreTabla,10) = 'M_HORARIOS')
	Begin
		Delete From [dbo].[m_horarios_planilla]
		Where [hor_iid]=@idPlantilla
	End
END