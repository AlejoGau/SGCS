CREATE OR ALTER PROCEDURE [dbo].[SearchCuentaProximoNumeroHexa]
(
	@cue_ncuenta char(4)  = '' OUTPUT
)
AS
--Busca numeros de cuenta no utilizadas sin considerar el dealer y solamente para valores validos hexadecimales
--Autor :Pablo O. Canónico
--Fecha :03/08/2022
Begin
	--Primero la temporal para Cuentas
	If OBJECT_ID('tempdb..#CtasTemp') Is Not NULL
		Drop Table #CtasTemp

	Select Distinct cue_ncuenta Into #CtasTemp From [_Datos].[dbo].[m_cuentas] 

	Declare @message VarChar(Max) = '',
		    @StartDateTimeText VarChar(Max) = ''
		
	Declare @control Int = 0
	Declare @loop Int = 0
	Declare @maxCta Char(4) = ''

	--Obtengo el MAX de cuentas dentro de un rango de valores HEXA validos
	Select @maxCta = MAX(RTRIM(cue_ncuenta))
		From [_Datos].[dbo].[m_cuentas] 
		Where cue_ncuenta Between '0000' And 'FFFF' 

	Declare @iHexDecode Int= 0
	Select @iHexDecode = _Desktop.dbo.Base16HexaDecode(RTRIM(@maxCta))
	If @iHexDecode = 719835	--Es el valor de FFFF
		Set @cue_ncuenta = '0000'
	Else	
		Select @cue_ncuenta = RIGHT('0000' + RTRIM(UPPER(_Desktop.dbo.Base16HexaEncode(@iHexDecode + 1))), 4)  

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
				Select @iHexDecode = _Desktop.dbo.Base16HexaDecode(RTRIM(@cue_ncuenta))
				If @iHexDecode = 719835	--Es el valor de FFFF
					Set @cue_ncuenta = '0000'
				Else	
					Set @cue_ncuenta = RIGHT('0000' + RTRIM(UPPER(_Desktop.dbo.Base16HexaEncode(@iHexDecode + 1))), 4)  

				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | Cuenta  '+@cue_ncuenta
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			End
		End
	End

	--Esto tiene que estar para que funcione el Razor
	Select RTRIM(@cue_ncuenta) cue_ncuenta
End