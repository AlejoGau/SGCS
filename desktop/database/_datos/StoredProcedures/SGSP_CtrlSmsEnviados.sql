CREATE OR ALTER PROCEDURE [dbo].[SGSP_CtrlSmsEnviados] As
--Controla y resetea los contadores de SMS Enviados
--Autor :Pablo O. Canónico
--Fecha :13/03/2013

SET NOCOUNT ON
-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'CtrlSmsEnviados', @Repetition = 1500
--	

Declare @iCuenta Int
Declare @nLimiteCada Numeric(3,0)
Declare @nCadaUnidadTiempo Numeric(1,0)		--0.dia 1.mes 2.año
Declare @tEnviadosSMSDesde DateTime
Declare @nControl Int 
Declare @dDiaHoy DateTime
Set @dDiaHoy = GetDate()

--1ero controlo los que son por dia
Declare cSms CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select rep_iidcuenta,rep_nLimiteCada,rep_nCadaUnidadTiempo,sta_tEnviadosSMSDesde
	From m_reportes_automaticos
		Inner Join m_status On rep_iidcuenta=sta_iidcuenta
		Where rep_iLimiteSMS > 0 And rep_iLimiteSMS <> 9999 And rep_nCadaUnidadTiempo=0
	
OPEN cSms
FETCH NEXT FROM cSms INTO @iCuenta,@nLimiteCada,@nCadaUnidadTiempo,@tEnviadosSMSDesde
	WHILE @@FETCH_STATUS = 0
		Begin
		Set @nControl = DATEDIFF(DAY, @tEnviadosSMSDesde, @dDiaHoy)
		If @nControl >= @nLimiteCada
			Begin
				--Deberia Resetear todo si paso la unidad de tiempo
				UPDATE [_Datos].[dbo].[m_status]
					SET sta_iEnviadosSMS=0,sta_tEnviadosSMSDesde=null,sta_nEnviaSMS=0
					WHERE sta_iidcuenta=@iCuenta

			End	

		FETCH NEXT FROM cSms INTO @iCuenta,@nLimiteCada,@nCadaUnidadTiempo,@tEnviadosSMSDesde
		End

CLOSE cSms
DEALLOCATE cSms

--2do controlo los que son por mes
Declare cSms CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select rep_iidcuenta,rep_nLimiteCada,rep_nCadaUnidadTiempo,sta_tEnviadosSMSDesde
	From m_reportes_automaticos
		Inner Join m_status On rep_iidcuenta=sta_iidcuenta
		Where rep_iLimiteSMS > 0 And rep_iLimiteSMS <> 9999 And rep_nCadaUnidadTiempo=1
	
OPEN cSms
FETCH NEXT FROM cSms INTO @iCuenta,@nLimiteCada,@nCadaUnidadTiempo,@tEnviadosSMSDesde
	WHILE @@FETCH_STATUS = 0
		Begin
		Set @nControl = DATEDIFF(MONTH, @tEnviadosSMSDesde, @dDiaHoy)
		If @nControl >= @nLimiteCada
			Begin
				--Deberia Resetear todo si paso la unidad de tiempo
				UPDATE [_Datos].[dbo].[m_status]
					SET sta_iEnviadosSMS=0,sta_tEnviadosSMSDesde=null,sta_nEnviaSMS=0
					WHERE sta_iidcuenta=@iCuenta

			End	

		FETCH NEXT FROM cSms INTO @iCuenta,@nLimiteCada,@nCadaUnidadTiempo,@tEnviadosSMSDesde
		End

CLOSE cSms
DEALLOCATE cSms

--3ro controlo los que son por año
Declare cSms CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select rep_iidcuenta,rep_nLimiteCada,rep_nCadaUnidadTiempo,sta_tEnviadosSMSDesde
	From m_reportes_automaticos
		Inner Join m_status On rep_iidcuenta=sta_iidcuenta
		Where rep_iLimiteSMS > 0 And rep_iLimiteSMS <> 9999 And rep_nCadaUnidadTiempo=2
	
OPEN cSms
FETCH NEXT FROM cSms INTO @iCuenta,@nLimiteCada,@nCadaUnidadTiempo,@tEnviadosSMSDesde
	WHILE @@FETCH_STATUS = 0
		Begin
		Set @nControl = DATEDIFF(YEAR, @tEnviadosSMSDesde, @dDiaHoy)
		If @nControl >= @nLimiteCada
			Begin
				--Deberia Resetear todo si paso la unidad de tiempo
				UPDATE [_Datos].[dbo].[m_status]
					SET sta_iEnviadosSMS=0,sta_tEnviadosSMSDesde=null,sta_nEnviaSMS=0
					WHERE sta_iidcuenta=@iCuenta

			End	

		FETCH NEXT FROM cSms INTO @iCuenta,@nLimiteCada,@nCadaUnidadTiempo,@tEnviadosSMSDesde
		End

CLOSE cSms
DEALLOCATE cSms

--4tro reseteo los que tienen limite en 9999 x si los dejaron de controlar
Declare cSms CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select rep_iidcuenta
	From m_reportes_automaticos
		Inner Join m_status On rep_iidcuenta=sta_iidcuenta
		Where rep_iLimiteSMS = 9999
	
OPEN cSms
FETCH NEXT FROM cSms INTO @iCuenta
	WHILE @@FETCH_STATUS = 0
		Begin
			UPDATE [_Datos].[dbo].[m_status]
				SET sta_iEnviadosSMS=0,sta_tEnviadosSMSDesde=null,sta_nEnviaSMS=0
				WHERE sta_iidcuenta=@iCuenta

		FETCH NEXT FROM cSms INTO @iCuenta
		End

CLOSE cSms
DEALLOCATE cSms