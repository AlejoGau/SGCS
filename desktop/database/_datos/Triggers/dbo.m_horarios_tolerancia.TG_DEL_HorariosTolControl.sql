CREATE OR ALTER TRIGGER [dbo].[TG_DEL_HorariosTolControl] ON [dbo].[m_horarios_tolerancia] AFTER DELETE AS
BEGIN

	SET NOCOUNT ON
	SET DATEFIRST 7

	Declare @idCuenta Int = 0,
			@iDayOfWeek Int = DatePart(dw,GetDate())

	Select @idCuenta = [tol_iidcuenta] From deleted
	
	Print '[TG_DEL_HorariosTolControl] idCuenta     : ' + Cast(@idCuenta As VarChar(10))
	Print '[TG_DEL_HorariosTolControl] iDayOfWeek   : ' + Cast(@iDayOfWeek As VarChar(10))

	If @idCuenta > 0 
		Execute [_Datos].[dbo].[SGSP_TimerGeneraHorariosControl] @iDOW = @iDayOfWeek ,@iCta = @idCuenta

END