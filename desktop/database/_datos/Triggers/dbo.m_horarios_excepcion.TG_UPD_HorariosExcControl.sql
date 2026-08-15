CREATE OR ALTER TRIGGER [dbo].[TG_UPD_HorariosExcControl] ON [dbo].[m_horarios_excepcion] AFTER INSERT, UPDATE AS
BEGIN
	SET NOCOUNT ON;
	SET DATEFIRST 7

	Declare @idCuenta Int = 0,
			@iDayOfWeek Int = DatePart(dw,GetDate())

    --For perfomance issues--
	If ( Select Count(exc_iidcuenta) From inserted ) > 1
		Begin
			Print '[TG_UPD_HorariosExcControl | Hay mas de 1'

			Declare cHor CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
				For	Select [exc_iidcuenta] From inserted

			Open cHor
			Fetch Next From cHor Into @idCuenta
			While @@FETCH_STATUS = 0
			Begin
				Print '[TG_UPD_HorariosExcControl] idCuenta     : ' + Cast(@idCuenta As VarChar(10))
				Print '[TG_UPD_HorariosExcControl] iDayOfWeek   : ' + Cast(@iDayOfWeek As VarChar(10))

				If @idCuenta > 0 
					Execute [_Datos].[dbo].[SGSP_TimerGeneraHorariosControl] @iDOW = @iDayOfWeek ,@iCta = @idCuenta

				Fetch Next From cHor Into @idCuenta
			End

			Close cHor
			Deallocate cHor
		End	
	Else	--Evito el Cursor	 
		Begin

			Select @idCuenta = [exc_iidcuenta] From inserted
	
			Print '[TG_UPD_HorariosExcControl] idCuenta     : ' + Cast(@idCuenta As VarChar(10))
			Print '[TG_UPD_HorariosExcControl] iDayOfWeek   : ' + Cast(@iDayOfWeek As VarChar(10))

			If @idCuenta > 0 
				Execute [_Datos].[dbo].[SGSP_TimerGeneraHorariosControl] @iDOW = @iDayOfWeek ,@iCta = @idCuenta
		End
END