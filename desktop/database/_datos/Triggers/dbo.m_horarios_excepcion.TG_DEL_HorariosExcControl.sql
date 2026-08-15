CREATE OR ALTER TRIGGER [dbo].[TG_DEL_HorariosExcControl] ON [dbo].[m_horarios_excepcion] AFTER DELETE AS
BEGIN

	SET NOCOUNT ON
	SET DATEFIRST 7

	Declare @idCuenta Int = 0,
			@iDayOfWeek Int = DatePart(dw,GetDate())
	Declare @DiaHoy DateTime = GetDate()
	Declare @HoyCeroHoras DateTime = DateADD(day, 0, DateDIFF(day, 0, @DiaHoy))


    --For perfomance issues--
	If ( Select Count(exc_iidcuenta) From deleted ) > 1
		Begin
			Print '[TG_UPD_HorariosExcControl | Hay mas de 1'
			Declare cHor CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
				For	Select [exc_iidcuenta] From deleted

			Open cHor
			Fetch Next From cHor Into @idCuenta
			While @@FETCH_STATUS = 0
			Begin
				Print '[TG_DEL_HorariosExcControl] idCuenta     : ' + Cast(@idCuenta As VarChar(10))
				Print '[TG_DEL_HorariosExcControl] iDayOfWeek   : ' + Cast(@iDayOfWeek As VarChar(10))

				If @idCuenta > 0 
				Begin
					--Execute [_Datos].[dbo].[SGSP_TimerGeneraHorariosControl] @iDOW = @iDayOfWeek ,@iCta = @idCuenta
					Delete From [dbo].[TimerHorarios] Where [DOW]=@iDayOfWeek And [idCta]=@idCuenta
					Delete From [dbo].[TimerLimites] Where [HoraLimite]>=@HoyCeroHoras And [idCta]=@idCuenta
			    End
				Fetch Next From cHor Into @idCuenta
			End

			Close cHor
			Deallocate cHor
		End	
	Else	--Evito el Cursor	 
		Begin
			Select @idCuenta = [exc_iidcuenta] From deleted
	
			Print '[TG_DEL_HorariosExcControl] idCuenta     : ' + Cast(@idCuenta As VarChar(10))
			Print '[TG_DEL_HorariosExcControl] iDayOfWeek   : ' + Cast(@iDayOfWeek As VarChar(10))

			Begin
				--Execute [_Datos].[dbo].[SGSP_TimerGeneraHorariosControl] @iDOW = @iDayOfWeek ,@iCta = @idCuenta
				Delete From [dbo].[TimerHorarios] Where [DOW]=@iDayOfWeek And [idCta]=@idCuenta
				Delete From [dbo].[TimerLimites] Where [HoraLimite]>=@HoyCeroHoras And [idCta]=@idCuenta
			End
		End

END