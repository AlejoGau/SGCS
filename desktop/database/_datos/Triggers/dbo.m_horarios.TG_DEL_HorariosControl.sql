CREATE OR ALTER TRIGGER [dbo].[TG_DEL_HorariosControl] ON [dbo].[m_horarios] AFTER DELETE AS
BEGIN

	SET NOCOUNT ON
	SET DATEFIRST 7

	Declare @idCuenta Int = 0,
			@iDayOfWeek Int = DatePart(dw,GetDate()),
			@nDiaApertura Int = 0

	Select @idCuenta = [hor_iidcuenta], @nDiaApertura = [hor_ndiaapertura] From deleted
	
	Print '[TG_DEL_HorariosControl] idCuenta     : ' + Cast(@idCuenta As VarChar(10))
	Print '[TG_DEL_HorariosControl] nDiaApertura : ' + Cast(@nDiaApertura As VarChar(10))
	Print '[TG_DEL_HorariosControl] iDayOfWeek   : ' + Cast(@iDayOfWeek As VarChar(10))

	If @idCuenta > 0 And @nDiaApertura = @iDayOfWeek
	Begin
		Delete From [TimerHorarios] Where idCta=@idCuenta
		Delete From [TimerLimites] Where idCta=@idCuenta

		--Execute [_Datos].[dbo].[SGSP_TimerGeneraHorariosControl] @iDOW = @iDayOfWeek ,@iCta = @idCuenta
	End

END