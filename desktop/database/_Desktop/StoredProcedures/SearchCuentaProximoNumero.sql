-- 25/07 Modificado por Mauro con ayuda de Pablo 
-- 03/08 Modificado por Pablo para mejorar perfomance
-- 2023/09/22 Pablo : cambio de rutina para dar vuelta si llego a ZZZZ y ademas buscar cuentas sin usar
CREATE OR ALTER PROCEDURE [dbo].[SearchCuentaProximoNumero]
(
	@cue_clinea NVARCHAR(128),
	@cue_ncuenta char(10)  = '' OUTPUT
)
AS
	BEGIN

	--Primero la temporal para Cuentas
	If OBJECT_ID('tempdb..#CtasTemp') Is Not NULL
		Drop Table #CtasTemp

	Select Distinct cue_ncuenta Into #CtasTemp From [_Datos].[dbo].[m_cuentas] Where [cue_clinea]=@cue_clinea

	Declare @message VarChar(Max) = '',
		    @StartDateTimeText VarChar(Max) = ''
		
	Declare @control Int = 0
	Declare @loop Int = 0
	Declare @maxCta Char(4) = ''

	Select @maxCta = MAX(RTRIM(cue_ncuenta))
		From [_Datos].[dbo].[m_cuentas] 
		Where [cue_clinea]=@cue_clinea

	Declare @Decode Decimal(36, 0) = 0
	Select @Decode = _Desktop.dbo.Base36Decode(RTRIM(@maxCta))
	Print @Decode
	If @Decode = 1679615	--Es ZZZZ
		Set @cue_ncuenta = '0000'
	Else	
		Select @cue_ncuenta = RIGHT('0000' + RTRIM(UPPER(_Desktop.dbo.Base36Encode(@Decode + 1))), 4)  
	
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Cuenta  '+@cue_ncuenta
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	IF RTRIM(@cue_ncuenta) = '0000'
	Begin
		WHILE @control = 0 And @loop <= 9999
		Begin
			Set @loop += 1
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Loop  '+Convert(Varchar(10),@loop)
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			SET @control = ISNULL((Select 1 WHERE @cue_ncuenta Not In (Select cue_ncuenta FROM #CtasTemp )), 0)

			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Control  '+Convert(Varchar(10),@control)
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			IF @control = 0
			Begin
				Select @Decode = _Desktop.dbo.Base16HexaDecode(RTRIM(@cue_ncuenta))
				If @Decode = 1679615	--Es ZZZZ
					Set @cue_ncuenta = '0000'
				Else	
					Set @cue_ncuenta = RIGHT('0000' + RTRIM(UPPER(_Desktop.dbo.Base16HexaEncode(@Decode + 1))), 4)  

				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | Cuenta  '+@cue_ncuenta
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End
		End
	End

	--Esto tiene que estar para que funcione el Razor
	Select RTRIM(@cue_ncuenta) As cue_ncuenta

	/*
		DECLARE @control BIT=0
		Declare @loop Int = 0

		SELECT @cue_ncuenta = RIGHT('0000' + RTRIM(UPPER(dbo.base36encode(dbo.base36decode(MAX(RTRIM(cue_ncuenta))) + 1))), 4)  
			FROM _datos..m_cuentas s  WHERE cue_clinea = @cue_clinea

		IF RTRIM(@cue_ncuenta) != '0000'
		BEGIN
			WHILE @control = 0 And @loop <= 9999
			BEGIN
				Set @loop += 1

				--SET @control = ISNULL((SELECT TOP 1 1 FROM _datos..m_cuentas s WHERE cue_clinea = @cue_clinea AND 
				SET @control = ISNULL((SELECT 1 WHERE  
				@cue_ncuenta NOT IN (SELECT cue_ncuenta FROM _datos..m_cuentas s WHERE cue_clinea = @cue_clinea)), 0)

				IF @control = 0
				BEGIN
					SET @cue_ncuenta = (SELECT RIGHT('0000' + RTRIM(UPPER(dbo.base36encode(dbo.base36decode(RTRIM(@cue_ncuenta)) + 1))), 4))
				END
			END
		END

		SELECT RTRIM(@cue_ncuenta) cue_ncuenta
	*/
	END