CREATE OR ALTER TRIGGER [dbo].[TG_UPD_HorariosAltControl] ON [dbo].[m_horarios_alternativos] AFTER INSERT, UPDATE AS
BEGIN
	SET NOCOUNT ON;
	
	-- Si el UPDATE no afecto ninguna fila, no hay nada que procesar
	IF NOT EXISTS (SELECT 1 FROM inserted)
		RETURN

	SET DATEFIRST 7

	Declare @idCuenta Int = 0,
			@iDayOfWeek Int = DatePart(dw,GetDate()),
			@nDiaApertura Int = 0,
			@iError Int = 0

	Declare @cHoraApertura Char(5) = '',
			@cHoraCierre Char(5) = ''

	Select Top 1 @idCuenta = [alt_iidcuenta], @nDiaApertura = [alt_ndiaapertura] , @cHoraApertura = [alt_choraapertura], @cHoraCierre = [alt_choracierre] From inserted
	
	BEGIN TRANSACTION 
	Print '[TG_UPD_HorariosControl] idCuenta      : ' + Cast(@idCuenta As VarChar(10))
	Print '[TG_UPD_HorariosControl] nDiaApertura  : ' + Cast(@nDiaApertura As VarChar(10))
	Print '[TG_UPD_HorariosControl] iDayOfWeek    : ' + Cast(@iDayOfWeek As VarChar(10))
	Print '[TG_UPD_HorariosControl] cHoraApertura : ' + @cHoraApertura
	Print '[TG_UPD_HorariosControl] cHoraCierre   : ' + @cHoraCierre

	If IsDate(@cHoraApertura)=0	Or IsDate(@cHoraCierre)=0
		BEGIN 
			Raiserror('%s',0,1,'Horario Alternativo INVALIDO.')
			Set @iError = 1
		END 
    ELSE 
		BEGIN
			If @idCuenta > 0 And @nDiaApertura = @iDayOfWeek
				Execute [_Datos].[dbo].[SGSP_TimerGeneraHorariosControl] @iDOW = @iDayOfWeek ,@iCta = @idCuenta
		END

	If @iError = 1
		ROLLBACK TRANSACTION 
	ELSE
		COMMIT 

END