CREATE OR ALTER PROCEDURE [dbo].[SGSP_TimerExecute]
WITH EXECUTE AS CALLER
AS
--Ejecucion de rutinas de control de horarios
--Autor : Pablo O. Canónico
--Fecha : 12/10/2017
--30/11/2017 Se Agrego control de SOSDemorado
--03/01/2018 Se Agrego control estados panel
--04-08-2018 Se agrego el DateFirst porque en sistemas en Language no US toma lunes como dia 1
--27-02-2019 Se agrego el DOW al where
--29-04-2019 Se agrego control de SinHorarioControlaEventos en NO con dias sin horario
--01-10-2019 Se activo el log en _LogDB
--25-03-2020 Se cambio el control para dias Feriados Full (tipo F)
--23-04-2020 Se cambio el control de CLO para rangos 
--22-07-2020 Se cambio el control de usuario bajo y _NG 
--17-09-2020 En control de OPN/CLO se agrego And [pet_cTipo] != 'P' para evitar eventos de Control de Estado de Panel
--14-12-2021 En control de Estado de Panel. Se verifica primero si ya llego el evento esperado
--12-01-2022 Se cambio el control para dias Feriados (tipo F) con horarios por cuenta
--15-03-2022 Se cambio en control CLO el <0 por >0 Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) > 0 Then 'OK'
--30-06-2022 Se cambio en control CLO para cuando es TIPO='C' y el horario esta dentro de limites
--22-07-2022 En el control de SOSDemorado se agrego la busqueda de Lat/Lng de la ultima posicion recibida para guardala como posicion del evento de control generado
--01-09-2022 Se cambio en control CLO el Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) por Datediff(second,pe.pet_tFechaHora,ph.HoraDespues)
--17-01-2023 Se cambio en control OPN para considerar TIPO='V'
--09-09-2024 Se cambio mensaje de push para nueva V1
--19-06-2025 Se agrego al control de OPN que si el evento tiene una antiguedad de mas de 2 horas no lo controle y lo marque como procesado

Set NoCount ON

-----------------------------------
DECLARE @LogTable TABLE (
	LogLevel		VARCHAR(50),
	LogMessage		VARCHAR(Max),
	LogException	VARCHAR(2000),
	LogDate		DateTime DEFAULT GetDate());
-----------------------------------

BEGIN TRY

-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'TimerExecute', @Repetition = 10
--

Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

Declare  @iDebugSQL Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='DEBUGSQL' )
Declare  @iExecute Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='TIMEREXECUTE' )
If @iExecute = 0
Begin	
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecute | Configurado para NO ejecutar'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Set NoExec On
End

SET DATEFIRST 7
--Cuando no se utlice mas Timer CS hay que habilitar esto para saber si hay que controlar o no horarios
--Declare  @iProcesoHorarios Int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='PROCESAHORARIOS' )
--If @iProcesoHorarios > 0
--    Begin	
--	  End

Declare @idKey Int = 0,
		@idCuenta Int = 0,
		@iUsuario Int = 0,
		@iDay Int = DATEPART(dw, GetDate()),
		@iStatus Int = 1

Declare @AlarmaIngresada Char(3) = '',
		@AlarmaGenerar Char(3) = '',
		@AutoProcesaNY Char(1) = ''

Declare @tFechaHora Datetime

-----------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------

--Control de OPN
Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | TimerExecute | Control de OPN'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

--Cuando TIPO es OC, alarmaGenerar tiene que ser AlarmaAntes x que en AlarmaDespues esta el CLO
Declare EventosTimer CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
 With ControlHorarios As (
	Select pe.pet_idKey,pe.pet_idCuenta,pe.pet_iUsuario,pe.pet_tFechaHora,
		Antes = Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then '' Else 'X' End,
		Despues = Case When ph.[Tipo]IN ('F','V') And Convert(Char(8),ph.HoraAntes,108)='00:00:00' And Convert(Char(5),ph.HoraDespues,108)='23:59' Then 'X' Else ( Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then '' Else 'X' End) End,
		AlarmaGenerar = Case When ph.[Tipo] IN ('F','V') And Convert(Char(8),ph.HoraAntes,108)='00:00:00' And Convert(Char(5),ph.HoraDespues,108)='23:59' Then ph.AlarmaAntes Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else (Case When ph.Tipo IN('OC','M','V','F') Then ph.AlarmaAntes Else ph.AlarmaDespues End ) End) Else ph.AlarmaAntes End ) End,
		--Despues = Case When ph.[Tipo]='F' And Convert(Char(8),ph.HoraAntes,108)='00:00:00' And Convert(Char(8),ph.HoraDespues,108)='23:59:00' Then 'X' Else ( Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then '' Else 'X' End) End,
		--AlarmaGenerar = Case When ph.[Tipo]='F' And Convert(Char(8),ph.HoraAntes,108)='00:00:00' And Convert(Char(8),ph.HoraDespues,108)='23:59:00' Then ph.AlarmaAntes Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else (Case When ph.Tipo IN('OC','M','V','F') Then ph.AlarmaAntes Else ph.AlarmaDespues End ) End) Else ph.AlarmaAntes End ) End,
		----Despues = Case When ph.[Tipo]='F' Then 'X' Else ( Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then '' Else 'X' End) End,
		----AlarmaGenerar = Case When ph.[Tipo]='F' Then ph.AlarmaAntes Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else (Case When ph.Tipo IN('OC','M','V','F') Then ph.AlarmaAntes Else ph.AlarmaDespues End ) End) Else ph.AlarmaAntes End ) End,
		------Despues = Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then '' Else 'X' End,
		------AlarmaGenerar = Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else (Case When ph.Tipo IN('OC','M','V','F') Then ph.AlarmaAntes Else ph.AlarmaDespues End ) End) Else ph.AlarmaAntes End,
		ph.AutoProcesaNYO,pe.pet_cAlarma,
		ROW_NUMBER() OVER(PARTITION BY pe.pet_idCuenta Order By 
			(Case When DateDIFF(second,pe.pet_tFechaHora,ph.HoraAntes)>0 Then DateDIFF(second,pe.pet_tFechaHora,ph.HoraAntes)
				  When DateDIFF(second,ph.HoraDespues,pe.pet_tFechaHora)>0 Then DateDIFF(second,ph.HoraDespues,pe.pet_tFechaHora) 
				  When pe.pet_tfechahora Between ph.[HoraAntes] And ph.[HoraDespues] Then 0 End) Asc, pe.[pet_tFechaHora]) As rTop
	From [_Datos].[dbo].[p_EventosTimer] pe With (NOLOCK)
	Inner Join [_Datos].[dbo].[TimerHorarios] ph On ph.[idCta]=pe.[pet_idCuenta] And @iDay=ph.[DOW]
	Inner Join [_Tablas].[dbo].[t_codigos_alarma] ca On pe.[pet_cAlarma]=ca.[cod_ccodigo]
	Where ca.[cod_ntipo] = 1 And [pet_iStatus]=0 And ph.[Tipo] IN('O','OC','M','V','F') And ph.[idCta]=pe.[pet_idCuenta] And [pet_cTipo] != 'P'
	)
Select ch.pet_idKey,ch.pet_idCuenta,ch.pet_iUsuario,ch.pet_tFechaHora,ch.AlarmaGenerar,ch.AutoProcesaNYO,ch.pet_cAlarma
	From ControlHorarios ch
	Where ch.rTop = 1 And (Antes='X' Or Despues = 'X' Or AlarmaGenerar='OK')

OPEN EventosTimer
FETCH NEXT FROM EventosTimer INTO @idKey,@idCuenta,@iUsuario,@tFechaHora,@AlarmaGenerar,@AutoProcesaNY,@AlarmaIngresada
WHILE @@FETCH_STATUS = 0
BEGIN
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecute | Control de OPN | IdCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10)))+' | Usuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))+' | Alarma Ingresada => '+ @AlarmaIngresada+' | FechaHora Evento => '+ Rtrim(Convert(VarChar, @tFechaHora,120) )+' | Alarma a Generar => '+ @AlarmaGenerar+' | AutoProcesa NYO => '+ @AutoProcesaNY 
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	--No importa si es valido o no el OPN, si tiene seteado el autoproceso hay que procesarlo
	If @AutoProcesaNY = 'S'
		Execute SGSP_TimerAutoProcesoNY @idCuenta,@AlarmaIngresada,@tFechaHora,'NYO' 

	--Si viene de SinHorarioControlaEventos en No
	If @AlarmaGenerar='_NC'
	Begin
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | TimerExecute | Control de OPN | --No tiene horario. Sin horario controla evento en NO--'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		If @iDebugSQL = 1
			INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

		Set @iStatus = 3
	End
	Else
	Begin
		If ABS(DATEDIFF(HOUR, GetDate(), @tFechaHora)) >= 2 --2horas
		Begin
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | TimerExecute | Control de OPN | --No se controla supera 2 horas--'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

			Set @iStatus = 5
		End
		Else
		Begin
			--Si el OPN esta entre Aperturas Permitidas hay que controlar Usuario por si es Tipo Bajo y Generar OPV 
			If @AlarmaGenerar IN('OK','_NG')
				Set @AlarmaGenerar = 'OKO'

			Execute SGSP_TimerControlUsuario @idCuenta,@iUsuario,@AlarmaGenerar,@tFechaHora

			Set @iStatus = 1
		End
	End

	--Actualizo Status EventosTimer
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecute | Control de OPN | --Actualizo Status EventosTimer OPN-- '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Update [_Datos].[dbo].[p_EventosTimer] WITH (UPDLOCK)
		Set [pet_iStatus]=@iStatus,
		    [pet_tStatusExec]=GetDate()
	Where [pet_idKey]=@idKey
	
	FETCH NEXT FROM EventosTimer INTO @idKey,@idCuenta,@iUsuario,@tFechaHora,@AlarmaGenerar,@AutoProcesaNY,@AlarmaIngresada
End

CLOSE EventosTimer
DEALLOCATE EventosTimer;

-----------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------

--Control de CLO
Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | TimerExecute | Control de CLO'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

--Cuando TIPO es OC, alarmaGenerar tiene que ser AlarmaDespues x que en AlarmaAntes esta el OPN
Declare EventosTimer CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
 With ControlHorarios As (
	Select pe.pet_idKey,pe.pet_idCuenta,pe.pet_iUsuario,pe.pet_tFechaHora,
		Antes = Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then '' Else 'X' End,
		Despues = Case When ph.[Tipo]='F'  And Convert(Char(8),ph.HoraAntes,108)='00:00:00' And Convert(Char(8),ph.HoraDespues,108)='23:59:00' Then 'X' Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraDespues) > 0 Then '' Else 'X' End) End,
		--Despues = Case When ph.[Tipo]='F'  And Convert(Char(8),ph.HoraAntes,108)='00:00:00' And Convert(Char(8),ph.HoraDespues,108)='23:59:00' Then 'X' Else ( Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then '' Else 'X' End) End,
		AlarmaGenerar = Case When ph.[Tipo]='F' And Convert(Char(8),ph.HoraAntes,108)='00:00:00' And Convert(Char(8),ph.HoraDespues,108)='23:59:00' Then ph.AlarmaDespues 
			Else ( Case When ph.[Tipo] = 'C' And Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 And Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' 
			Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraDespues) > 0 Then 'OK' Else ph.AlarmaDespues End) Else  (Case When ph.[Tipo] IN('OC','M','V','F') Then ph.AlarmaDespues Else ph.AlarmaAntes End)  End ) End) End,
		--AlarmaGenerar = Case When ph.[Tipo]='F' And Convert(Char(8),ph.HoraAntes,108)='00:00:00' And Convert(Char(8),ph.HoraDespues,108)='23:59:00' Then ph.AlarmaDespues 
		--	--Else ( Case When ph.[Tipo] IN ('C','OC') And Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 And Datediff(second,pe.pet_tFechaHora,ph.HoraDespues) < 0 Then 'OK' 
		--	Else ( Case When ph.[Tipo] = 'C' And Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 And Datediff(second,pe.pet_tFechaHora,ph.HoraDespues) < 0 Then 'OK' 
		--	Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraDespues) > 0 Then 'OK' Else ph.AlarmaDespues End) Else  (Case When ph.[Tipo] IN('OC','M','V','F') Then ph.AlarmaDespues Else ph.AlarmaAntes End)  End ) End) End,
		----AlarmaGenerar = Case When ph.[Tipo]='F' And Convert(Char(8),ph.HoraAntes,108)='00:00:00' And Convert(Char(8),ph.HoraDespues,108)='23:59:00' Then ph.AlarmaDespues 
		----	Else ( Case When ph.[Tipo]='C' And Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 And Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' 
		----	Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then ( Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) > 0 Then 'OK' Else ph.AlarmaDespues End) Else  (Case When ph.[Tipo] IN('OC','M','V','F') Then ph.AlarmaDespues Else ph.AlarmaAntes End)  End ) End) End,
		----AlarmaGenerar = Case When ph.[Tipo]='F'  And Convert(Char(8),ph.HoraAntes,108)='00:00:00' And Convert(Char(8),ph.HoraDespues,108)='23:59:00' Then ph.AlarmaDespues Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) > 0 Then 'OK' Else ph.AlarmaDespues End) Else  (Case When ph.[Tipo] IN('OC','M','V','F') Then ph.AlarmaDespues Else ph.AlarmaAntes End)  End ) End,
		------AlarmaGenerar = Case When ph.[Tipo]='F'  And Convert(Char(8),ph.HoraAntes,108)='00:00:00' And Convert(Char(8),ph.HoraDespues,108)='23:59:00' Then ph.AlarmaDespues Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else ph.AlarmaDespues End) Else  (Case When ph.[Tipo] IN('OC','M','V','F') Then ph.AlarmaDespues Else ph.AlarmaAntes End)  End ) End,
		--------Despues = Case When ph.[Tipo]='F' Then 'X' Else ( Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then '' Else 'X' End) End,
		--------AlarmaGenerar = Case When ph.[Tipo]='F' Then ph.AlarmaDespues Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else ph.AlarmaDespues End) Else  (Case When ph.[Tipo] IN('OC','M','V','F') Then ph.AlarmaDespues Else ph.AlarmaAntes End)  End ) End,
		----------AlarmaGenerar = Case When ph.[Tipo]='F' Then ph.AlarmaDespues Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else ph.AlarmaDespues End) Else  (Case When ph.[Tipo]='OC' Then ph.AlarmaDespues Else ph.AlarmaAntes End)  End ) End,
		------------AlarmaGenerar = Case When ph.[Tipo]='F' Then ph.AlarmaDespues Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else ph.AlarmaDespues End) Else ph.AlarmaDespues  End ) End,
		--------------AlarmaGenerar = Case When ph.[Tipo]='F' Then ph.AlarmaDespues Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else ph.AlarmaDespues End) Else ( Case When ph.[Tipo]='V' Then ph.AlarmaDespues Else ph.AlarmaAntes End )  End ) End,
		----------------AlarmaGenerar = Case When ph.[Tipo]='F' Then ph.AlarmaDespues Else ( Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else ph.AlarmaDespues End) Else ph.AlarmaAntes End ) End,
		------------------Despues = Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then '' Else 'X' End,
		------------------AlarmaGenerar = Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else ph.AlarmaDespues End) Else ph.AlarmaAntes End,
		--------------------AlarmaGenerar = Case When Datediff(second,pe.pet_tFechaHora,ph.HoraAntes) < 0 Then (Case When Datediff(second,ph.HoraDespues,pe.pet_tFechaHora) < 0 Then 'OK' Else  ph.AlarmaDespues End) Else ph.AlarmaDespues End,
		ph.AutoProcesaNYC,pe.pet_cAlarma,
		ROW_NUMBER() OVER(PARTITION BY pe.pet_idCuenta Order By 
			(Case When DateDIFF(second,pe.pet_tFechaHora,ph.HoraAntes)>0 Then DateDIFF(second,pe.pet_tFechaHora,ph.HoraAntes)
				  When DateDIFF(second,ph.HoraDespues,pe.pet_tFechaHora)>0 Then DateDIFF(second,ph.HoraDespues,pe.pet_tFechaHora) 
				  When pe.pet_tfechahora Between ph.[HoraAntes] And ph.[HoraDespues] Then 0 End) Asc, pe.[pet_tFechaHora]) As rTop
	From [_Datos].[dbo].[p_EventosTimer] pe With (NOLOCK)
	Inner Join [_Datos].[dbo].[TimerHorarios] ph On ph.[idCta]=pe.[pet_idCuenta] And @iDay=ph.[DOW]
	Inner Join [_Tablas].[dbo].[t_codigos_alarma] ca On pe.[pet_cAlarma]=ca.[cod_ccodigo]
	Where ca.[cod_ntipo] = 2 And [pet_iStatus]=0 And ph.[Tipo] IN('C','OC','M','V','F') And ph.[idCta]=pe.[pet_idCuenta] And [pet_cTipo] != 'P'
	)
Select ch.pet_idKey,ch.pet_idCuenta,ch.pet_iUsuario,ch.pet_tFechaHora,ch.AlarmaGenerar,ch.AutoProcesaNYC,ch.pet_cAlarma
	From ControlHorarios ch
	Where ch.rTop = 1 And (Antes='X' Or Despues = 'X' Or AlarmaGenerar='OK')

OPEN EventosTimer
FETCH NEXT FROM EventosTimer INTO @idKey,@idCuenta,@iUsuario,@tFechaHora,@AlarmaGenerar,@AutoProcesaNY,@AlarmaIngresada
WHILE @@FETCH_STATUS = 0
BEGIN
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecute | Control de CLO | IdCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10)))+' | Usuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))+' | Alarma Ingresada => '+ @AlarmaIngresada+' | FechaHora Evento => '+ Rtrim(Convert(VarChar, @tFechaHora,120) )+' | Alarma a Generar => '+ @AlarmaGenerar+' | AutoProcesa NYC => '+ @AutoProcesaNY
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	--No importa si es valido o no el CLO, si tiene seteado el autoproceso hay que procesarlo
	If @AutoProcesaNY = 'S'
		Execute SGSP_TimerAutoProcesoNY @idCuenta,@AlarmaIngresada,@tFechaHora,'NYC' 

	--Si viene de SinHorarioControlaEventos en No
	If @AlarmaGenerar='_NC'
	Begin
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | TimerExecute | Control de CLO | --No tiene horario. Sin horario controla evento en NO--'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		If @iDebugSQL = 1
			INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

		Set @iStatus = 3
	End
	Else
	Begin
		--Si el CLO esta entre Cierres Permitidos hay que controlar Usuario por si es Tipo Bajo y Generar CLV 
		If @AlarmaGenerar IN('OK','_NG')
			Set @AlarmaGenerar = 'OKC'

		Execute SGSP_TimerControlUsuario @idCuenta,@iUsuario,@AlarmaGenerar,@tFechaHora

		Set @iStatus = 1
	End

	--Actualizo Status EventosTimer
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecute | Control de CLO | --Actualizo Status EventosTimer CLO-- '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Update [_Datos].[dbo].[p_EventosTimer] WITH (UPDLOCK)
		Set [pet_iStatus]=@iStatus,
		    [pet_tStatusExec]=GetDate()
	Where [pet_idKey]=@idKey

	FETCH NEXT FROM EventosTimer INTO @idKey,@idCuenta,@iUsuario,@tFechaHora,@AlarmaGenerar,@AutoProcesaNY,@AlarmaIngresada
End

CLOSE EventosTimer
DEALLOCATE EventosTimer;

-----------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------

--Control de NY
Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | TimerExecute | Control de NY'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

Declare @HoraLimite Datetime
Declare @EstadoPanel Char(5) = ''

Declare NotYet CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
Select [idCta],[HoraLimite],[AlarmaGenerar],Case When ST.sta_nEstado=0 Then 'Close' Else 'Open' End As EstadoPanel,[idKey]
	From [_Datos].[dbo].[TimerLimites] With (NOLOCK)
	Inner Join [_Datos].[dbo].[m_status] ST On [idCta]=ST.sta_iidCuenta
	--Where [HoraLimite]>=Getdate() And [iStatus]=0
	Where Getdate()>[HoraLimite] And [iStatus]=0

Order By HoraLimite, idCta

OPEN NotYet
FETCH NEXT FROM NotYet INTO @idCuenta,@HoraLimite,@AlarmaGenerar,@EstadoPanel,@idKey
WHILE @@FETCH_STATUS = 0
BEGIN
	If Getdate()>@HoraLimite
	Begin
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | TimerExecute | Control de NYO/NYC | Getdate()>@HoraLimite | IdCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10)))+' | Alarma a Generar => '+ @AlarmaGenerar+' | GetDate() => '+ Rtrim(Convert(VarChar, GetDate(),120) )+' | Hora Limite => '+ Rtrim(Convert(VarChar, @HoraLimite,120) )+' | EstadoPanel => '+ @EstadoPanel
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	End

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecute | Control de NYO/NYC | IdCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10)))+' | Alarma a Generar => '+ @AlarmaGenerar+' | Hora Limite => '+ Rtrim(Convert(VarChar, @HoraLimite,120) )+' | EstadoPanel => '+ @EstadoPanel
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	If (@EstadoPanel = 'Close' And @AlarmaGenerar = 'NYO') 
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | TimerExecute | Control de NYO/NYC | --Esta Cerrado / Genero NYO-- '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		If @iDebugSQL = 1
			INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');
			
		Execute SGSP_TimerGeneroNY @idCuenta,@AlarmaGenerar
	End

	If (@EstadoPanel = 'Open' And @AlarmaGenerar = 'NYC')	
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | TimerExecute | Control de NYO/NYC | --Esta Abierto / Genero NYC-- '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		If @iDebugSQL = 1
			INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');
			
		Execute SGSP_TimerGeneroNY @idCuenta,@AlarmaGenerar
	End

	--Actualizo Status TimerLimites
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecute | Control de NYO/NYC | --Actualizo Status TimerLimites-- '
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Update [_Datos].[dbo].[TimerLimites] WITH (UPDLOCK)
		Set [iStatus]=1,
			[tStatusExec]=GetDate()
	Where [idKey]=@idKey

	FETCH NEXT FROM NotYet INTO @idCuenta,@HoraLimite,@AlarmaGenerar,@EstadoPanel,@idKey
End

CLOSE NotYet
DEALLOCATE NotYet;

-----------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------

Declare @iRecId_NR Int = 0,
		@iRecId Int = 0,
		@iValor Int = 0

Declare @tHoraActual Datetime = Getdate()

-----------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------

--Control de SOSDemorado ( En Camino )
Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | TimerExecute | Control de En Camino'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

Set @idKey = 0
Set @idCuenta = 0
Set @iUsuario = 0
Set @AlarmaGenerar = ''
Set @AlarmaIngresada = ''
Set @tFechaHora = Null

Declare @cAlarmasAEsperar nVarChar(30) = ''

--1ero Busco los SOSDemorado ( En Camino ) que ya se cancelaron
Declare SOSDemoradoTimer CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
With SOSDemorado As (
  Select sct_idKey,sct_tFechaHoraInicio,sct_tFechaHoraLimite,sct_idCuenta,sct_iUsuario,sct_cAlarmasAEsperar
	From SmartPanicsControlTiempo With (NOLOCK)
	Where CONVERT(char(8), sct_tFechaHoraLimite,112) >= CONVERT(char(8), GetDate()-1,112)
	)
Select sct_idKey,sct_idCuenta,sct_iUsuario,rec_calarma,rec_tFechaHora From SOSDemorado SD
	Inner Join p_recepcion On rec_iidcuenta=SD.sct_idCuenta And rec_iusuario=SD.sct_iUsuario
	Where rec_calarma In ( Select strval From [dbo].[ParseArray](SD.sct_cAlarmasAEsperar,'|') Group By strval ) 
	  And rec_tFechaHora>=SD.sct_tFechaHoraInicio
	  And rec_tFechaHora<=SD.sct_tFechaHoraLimite

OPEN SOSDemoradoTimer
FETCH NEXT FROM SOSDemoradoTimer INTO @idKey,@idCuenta,@iUsuario,@AlarmaIngresada,@tFechaHora
WHILE @@FETCH_STATUS = 0
BEGIN
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecute | Control de SOSDemorado ( En Camino ). Se recibio un evento que cancela el SOSDemorado ( En Camino ) | IdCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10)))+' | Usuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))+' | Alarma Ingresada => '+ @AlarmaIngresada+' | FechaHora Evento => '+ Rtrim(Convert(VarChar, @tFechaHora,120) )
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Delete From SmartPanicsControlTiempo
		Where sct_idKey=@idKey

	FETCH NEXT FROM SOSDemoradoTimer INTO @idKey,@idCuenta,@iUsuario,@AlarmaIngresada,@tFechaHora
End

CLOSE SOSDemoradoTimer
DEALLOCATE SOSDemoradoTimer;

--2do Busco los SOSDemorado ( En Camino ) sin cancelar y con Limite antes de la Hora Actual
Declare @tFechaHoraLimite Datetime,
		@tLimiteMenos1Minuto Datetime,
		@tFechaCreacion Datetime
Declare @iSmartPanicID Int = 0
Declare @cPushToken nVarChar(1024) = '',
		@msg [nvarchar](max) = ''

Set @iRecId = 0


Declare SOSDemoradoTimer CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
Select sct_idKey,sct_tFechaHoraLimite,sct_idCuenta,sct_iUsuario,sct_cAlarmasAEsperar,DATEADD(second,-60,sct_tFechaHoraLimite),sct_iSmartPanicID,sct_cPushToken,sct_iRecId
	From SmartPanicsControlTiempo With (NOLOCK)
	Where CONVERT(char(8), sct_tFechaHoraLimite,112) >= CONVERT(char(8), GetDate()-1,112)

OPEN SOSDemoradoTimer
FETCH NEXT FROM SOSDemoradoTimer INTO @idKey,@tFechaHoraLimite,@idCuenta,@iUsuario,@cAlarmasAEsperar,@tLimiteMenos1Minuto,@iSmartPanicID,@cPushToken,@iRecId
WHILE @@FETCH_STATUS = 0
BEGIN
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecute | Control de SOSDemorado ( En Camino ) | Verifico si el Limite esta Antes de la Hora Actual | IdCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10)))+' | Usuario => '+ Rtrim(Cast(@iUsuario As varchar(10)))+' | Alarmaa Esperadas => '+ @cAlarmasAEsperar+' | FechaHora Limite => '+ Rtrim(Convert(VarChar, @tFechaHoraLimite,120)) +' | FechaHora Limite Menos 1 Minuto => '+ Rtrim(Convert(VarChar, @tLimiteMenos1Minuto,120))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Set @tFechaCreacion = GetDate()
	If @tFechaHoraLimite < GetDate()
	Begin
		--Generar SMARTPANICS: SOS Demorado ( En Camino ) NO Recibido
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | TimerExecute | Control de SOSDemorado ( En Camino ) | --Generar SMARTPANICS: ALARMA EN CAMINO INCOMPLETO y enviar Push-- '
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		If @iDebugSQL = 1
			INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');
			
		Execute [dbo].[SGSP_TimerGeneroEVT] @idCuenta = @idCuenta, 	@AlarmaGenerar = '_SD', @iUsuario = @iUsuario, @iValor = @iValor OUTPUT
		If @iValor > 0
		Begin
		    --Si tengo el recId del evento que inicio el control de en camino, puedo buscar en posiciones y con eso grabar la misma para el nuevo evento
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | TimerExecute | Control de SOSDemorado ( En Camino ) | --Generar SMARTPANICS: ALARMA EN CAMINO INCOMPLETO y enviar Push-- | iRecId => '+ Rtrim(Cast(@iRecId As Varchar(10)))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

			If @iRecId > 0
			Begin
				Declare @cIMEI VarChar(128) = ''
				Declare @rLat Real,
						@rLng Real
				Declare @iSPID Int = 0 

				--Primero busco en p_posicionesSP y obtengo el IMEI y el IDKEY
				Select @iSPID=[sp_iid], @cIMEI=[sp_cIMEI] 
					From p_posicionesSP With (NOLOCK)
					Where [sp_reciid]=@iRecId

				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | TimerExecute | Control de SOSDemorado ( En Camino ) | --Generar SMARTPANICS: ALARMA EN CAMINO INCOMPLETO y enviar Push-- | iSPID => '+ Rtrim(Cast(@iSPID As Varchar(10))) + ' | cIMEI => '+@cIMEI
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				--Con el IMEI y IDKEY busco la ultima posicion disponible
				If @cIMEI!='' And @iSPID>0
				Begin
					Select Top 1 @rLat=[sp_rLatitud], @rLng=[sp_rLongitud]
						From p_posicionesSP With (NOLOCK)
						Where [sp_cIMEI]=@cIMEI
							And [sp_iid]>=@iSPID
						Order By [sp_iid] Desc

					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | TimerExecute | Control de SOSDemorado ( En Camino ) | --Generar SMARTPANICS: ALARMA EN CAMINO INCOMPLETO y enviar Push-- | Datos de la ultima posicion guardada | rLat => '+ Rtrim(Cast(@rLat As Varchar(10))) + ' | rLng => '+ Rtrim(Cast(@rLng As Varchar(10)))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
					If @iDebugSQL = 1
						INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

					--Grabo p_posicionesSP para el evento de control generado con Lat/Lng de la ultima posicion conocida
					If @rLat!=0 And @rLng!=0
					Begin
						Insert Into [dbo].[p_posicionesSP] ([sp_tfechahora],[sp_cIMEI],[sp_rLatitud],[sp_rLongitud],[sp_reciid])
							 Values (Getdate(),@cIMEI,@rLat,@rLng,@iValor)
					End
				End
			End
			
			Delete From SmartPanicsControlTiempo
				Where sct_idKey=@idKey
		End
		/*
		--Set @msg = '{ "data": {"action": "EN_CAMINO_FIRE" }, "notification": {"content_available": true}, "to": "' + @cPushToken + '"}'
		Set @msg = '{ "message": { "data": { "action": "EN_CAMINO_FIRE", "content_available": "true" }, "token": "' + @cPushToken + '"} }'

		Execute  [_Desktop].[dbo].[p_push_queueIns] @ppq_msg = @msg, @ppq_fechacreacion = @tFechaCreacion
		*/
	End
	Else
	Begin
		If @tLimiteMenos1Minuto < GetDate()
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | TimerExecute | Control de SOSDemorado ( En Camino ) | --Enviar Push En Camino por finalizar-- '
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			If @iDebugSQL = 1
				INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

			/*
			Set @msg = '{ "data": {"action": "EN_CAMINO_1_MIN" }, "notification": {
				  "content_available": true,"title": "SmartPanics", "body": "EN CAMINO: En breve finaliza la cuenta regresiva",
				  "sound":"default" }, "to": "' + @cPushToken + '"}'
			*/
			--Set @msg = '{ "data": {"action": "EN_CAMINO_FIRE" }, "notification": {"content_available": true}, "to": "' + @cPushToken + '"}'
			Set @msg = '{ "message": { "data": { "action": "EN_CAMINO_FIRE", "content_available": "true" }, "token": "' + @cPushToken + '"} }'

			Execute  [_Desktop].[dbo].[p_push_queueIns] @ppq_msg = @msg, @ppq_fechacreacion = @tFechaCreacion
		End
	End

	FETCH NEXT FROM SOSDemoradoTimer INTO @idKey,@tFechaHoraLimite,@idCuenta,@iUsuario,@cAlarmasAEsperar,@tLimiteMenos1Minuto,@iSmartPanicID,@cPushToken,@iRecId
End

CLOSE SOSDemoradoTimer
DEALLOCATE SOSDemoradoTimer;

-----------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------

--Control Estados de Panel
Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | TimerExecute | Control Estados Panel'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
If @iDebugSQL = 1
	INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

Set @idKey = 0
Set @idCuenta = 0
Set @AlarmaGenerar = ''
Set @tFechaHora = Null
Set @iRecId = 0
Set	@iValor = 0
Set @tHoraActual = Getdate()

Declare @iUsuarioEsperado Int = 0
Declare @cAlarmaEsperada VarChar(10) = ''
Declare @tLimite Datetime

--Primero me fijo si ya llegaron eventos de control para marcar y no controlar
Declare EstadosPanelTimer CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select [pet_idKey],[pet_idCuenta],[pet_tLimite_NR],[pet_iUsuario],[rec_tfechahora],[rec_calarma]
		From [_Datos].[dbo].[p_EventosTimer] With (NOLOCK)
		Inner Join [_Datos].[dbo].[p_recepcion] On rec_iidcuenta=[pet_idCuenta] AND rec_calarma=[pet_cEvento_NR] AND rec_tFechaHora<=[pet_tLimite_NR] AND rec_tFechaHora>=pet_tFechaHora 
	Where [pet_iStatus]=0 And [pet_cTipo] = 'P' 

OPEN EstadosPanelTimer
FETCH NEXT FROM EstadosPanelTimer INTO @idKey,@idCuenta,@tLimite,@iUsuarioEsperado,@tFechaHora,@cAlarmaEsperada
WHILE @@FETCH_STATUS = 0
BEGIN
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecute | Control Estados de Panel | IdCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10)))+' | Alarma Recibida => '+ @cAlarmaEsperada+' | Hora Limite => '+ Rtrim(Convert(VarChar, @tLimite,120) )
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Begin
		--Verifico si la hora del evento esta antes de la hora limite
		If @tFechaHora < @tLimite
			Begin
				--Actualizo Status EstadosPanelTimer
				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | TimerExecute | Control Estados de Panel | --Actualizo Status EventosTimer-- '
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				Update [_Datos].[dbo].[p_EventosTimer] WITH (UPDLOCK)
					Set [pet_iStatus]=1,
						[pet_tStatusExec]=GetDate()
				Where [pet_idKey]=@idKey

			End
	End	
	FETCH NEXT FROM EstadosPanelTimer INTO @idKey,@idCuenta,@tLimite,@iUsuarioEsperado,@tFechaHora,@cAlarmaEsperada
End

CLOSE EstadosPanelTimer
DEALLOCATE EstadosPanelTimer;

--Ahora busco si no llegaron eventos esperados y hay que generar alarma
Declare EstadosPanelTimer CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR
	Select [pet_idKey],[pet_idCuenta],[pet_tLimite_NR],[pet_cAlarmaAGenerar_NR],[pet_cEvento_NR],[pet_tFechaHora],[pet_iUsuario]
	From [_Datos].[dbo].[p_EventosTimer] With (NOLOCK)
	Left Outer Join [_Datos].[dbo].[p_recepcion] On rec_iidcuenta=[pet_idCuenta] AND rec_calarma=[pet_cEvento_NR] AND rec_tFechaHora>=[pet_tFechaHora]	 
	Where [pet_iStatus]=0 And [pet_cTipo] = 'P' 

OPEN EstadosPanelTimer
FETCH NEXT FROM EstadosPanelTimer INTO @idKey,@idCuenta,@tLimite,@AlarmaGenerar,@cAlarmaEsperada,@tFechaHora,@iUsuarioEsperado
WHILE @@FETCH_STATUS = 0
BEGIN
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | TimerExecute | Control Estados de Panel | IdCuenta => '+ Rtrim(Cast(@idCuenta As Varchar(10)))+' | Alarma Esperada => '+ @cAlarmaEsperada+' | Hora Limite => '+ Rtrim(Convert(VarChar, @tLimite,120) )+' | Alarma a Generar => '+ @AlarmaGenerar
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @iDebugSQL = 1
		INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

	Begin
		--Verifico si el Limite esta Antes de la Hora Actual
		If @tLimite < @tHoraActual
			Begin
				If @AlarmaGenerar=''
					Set @AlarmaGenerar='_NE'

				Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | TimerExecute | Control Estados de Panel | --Limite esta Antes de la Hora Actual-- | --Generar Evento--'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				If @iDebugSQL = 1
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

				Execute [dbo].[SGSP_TimerGeneroEVT] @idCuenta = @idCuenta, 	@AlarmaGenerar = @AlarmaGenerar, @iUsuario = @iUsuarioEsperado, @iValor = @iValor OUTPUT

				If @iValor > 0
					Begin
						--Actualizo Status EstadosPanelTimer
						Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
						Set @message = 'Start DateTime : %s | TimerExecute | Control Estados de Panel | --Actualizo Status EventosTimer-- '
						RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
						If @iDebugSQL = 1
							INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'DEBUG', Replace(@message,'Start DateTime : %s | ','');

						Update [_Datos].[dbo].[p_EventosTimer] WITH (UPDLOCK)
							Set [pet_iStatus]=1,
								[pet_tStatusExec]=GetDate()
						Where [pet_idKey]=@idKey
					End
			End
	End
			
	FETCH NEXT FROM EstadosPanelTimer INTO @idKey,@idCuenta,@tLimite,@AlarmaGenerar,@cAlarmaEsperada,@tFechaHora,@iUsuarioEsperado
End

CLOSE EstadosPanelTimer
DEALLOCATE EstadosPanelTimer;

-----------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------

Set NoExec Off
If @iDebugSQL = 1
	BEGIN
		BEGIN TRY
			-- Insert Logging into Table 
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer],[LogModule])
				SELECT  [LogDate], @@SPID, [LogLevel], OBJECT_NAME(@@PROCID), [LogMessage], [LogException], @@PROCID, schema_name(), db_name(), @@SERVERNAME , 'Timer' FROM @LogTable
		END TRY
		BEGIN CATCH
		END CATCH;				
	END
END TRY
BEGIN CATCH
	If @iDebugSQL = 0
		Begin
			IF ERROR_NUMBER() = 2627
			BEGIN
				PRINT 'Handling PK violation...';
			END;
			ELSE IF ERROR_NUMBER() = 547
			BEGIN
				PRINT 'Handling CHECK/FK constraint violation...';
			END;
			ELSE IF ERROR_NUMBER() = 515
			BEGIN
				PRINT 'Handling NULL violation...';
			END;
			ELSE IF ERROR_NUMBER() = 245
			BEGIN
				PRINT 'Handling conversion error...';
			END;
			ELSE
			BEGIN
				PRINT 'Re-throwing error...';
			END;

			PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
			PRINT 'Error Message : ' + ERROR_MESSAGE();
			PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
			PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
			PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
			PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
		End
	Else
		Begin
			-- Create Error/Exception Message
			DECLARE @LogException	VARCHAR(2000);
			SET @LogException = (SELECT 'Error Number : ' + CAST(ERROR_NUMBER() AS NVARCHAR) + ' | Error Severity : ' + CAST(ERROR_SEVERITY() AS NVARCHAR) + ' | Error Proc : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc') + ' | Error State : ' + CAST(ERROR_STATE() AS NVARCHAR) + ' | Error Line : ' + CAST(ERROR_LINE() AS NVARCHAR) + ' | Error Message : ' + ERROR_MESSAGE());
		
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | TimerExecute | '+Rtrim(@LogException)
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			-- Rollback open transactions
			IF @@TRANCOUNT > 0
			BEGIN
			SET @LogException = @LogException + ' | TranCount : ' + CAST(@@TRANCOUNT AS NVARCHAR)
				BEGIN TRY
					INSERT INTO @LogTable (LogLevel, LogMessage) SELECT 'ERROR', 'Rolling back ' + CAST(@@TRANCOUNT AS VARCHAR) + ' open transaction(s)..';
				END TRY
				BEGIN CATCH
				END CATCH;

				ROLLBACK TRANSACTION;
			END
		
			BEGIN TRY
				INSERT INTO @LogTable (LogLevel, LogMessage, LogException) SELECT 'ERROR', '-- Exception --', @LogException;
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer],[LogModule])
					SELECT  [LogDate], @@SPID, [LogLevel], OBJECT_NAME(@@PROCID), [LogMessage], [LogException], @@PROCID, schema_name(), db_name(), @@SERVERNAME , 'Timer' FROM @LogTable

			END TRY
			BEGIN CATCH
			END CATCH;

			-- Raise error to the calling instance
			RAISERROR(@LogException, 16, 1);
		End
END CATCH