CREATE OR ALTER TRIGGER [dbo].[TG_DEL_HorariosAltControl] ON [dbo].[m_horarios_alternativos] AFTER DELETE AS
BEGIN

	SET NOCOUNT ON
	SET DATEFIRST 7

	Declare @idCuenta Int = 0,
			@iDayOfWeek Int = DatePart(dw,GetDate()),
			@nDiaApertura Int = 0

	Select @idCuenta = [alt_iidcuenta], @nDiaApertura = [alt_ndiaapertura] From deleted
	
	Print '[TG_DEL_HorariosAltControl] idCuenta     : ' + Cast(@idCuenta As VarChar(10))
	Print '[TG_DEL_HorariosAltControl] nDiaApertura : ' + Cast(@nDiaApertura As VarChar(10))
	Print '[TG_DEL_HorariosAltControl] iDayOfWeek   : ' + Cast(@iDayOfWeek As VarChar(10))

	If @idCuenta > 0 And @nDiaApertura = @iDayOfWeek
		Execute [_Datos].[dbo].[SGSP_TimerGeneraHorariosControl] @iDOW = @iDayOfWeek ,@iCta = @idCuenta

END