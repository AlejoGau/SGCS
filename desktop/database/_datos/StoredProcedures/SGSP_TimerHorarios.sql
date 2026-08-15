CREATE OR ALTER PROCEDURE [dbo].[SGSP_TimerHorarios]
	@iDay [int] = 0,
	@iIdCta [int] = 0
WITH EXECUTE AS CALLER
AS
--Busca horarios de un dia de la semana
--Autor : Pablo O. Canónico
--Fecha : 05/09/2017
--04-08-2018 se agrego el DateFirst porque en sistemas en Language no US toma lunes como dia 1
--17-01-2019 se agrego el sin horario controla eventos
--11-03-2019 se agrego control de IsDate para horarios mal cargados
--29-04-2019 se modifico SinHorarioControlaEvento con preCarga
--30-08-2019 se agrego control en aperturas para evitar alternativos con '00:00' que son los generados desde atencion de un evento
--02-09-2019 se agrego control para aperturas alternativas con 00:00
--06-09-2019 se agrego control registros duplicados al no existir aperturas alternativas con 00:00
--06-11-2019 se modifico feriados para nueva estructura con horarios
--13-12-2019 en feriados si los horarios son 00:00 a 23:59 no se consideran las tolerancias
--28-01-2020 se modifica SinHorarioControlaEvento para configuraciones con eventos en Tolerancia
--06-04-2020 se modifica SinHorarioControlaEvento para no generarse si hay feriados
--06-04-2020 se modifica Feriados para no generarse si hay vacaciones
--07-04-2020 se modifica horarios alternatios
--29-04-2020 se quito verificacion de vacaciones en obtencion de cierres alternativos del dia generados por cierre alternativo desde atencion del evento, para control NYC en vacaciones
--16-06-2020 se modifica SinHorarioControlaEvento. No filtra por tol_nControl
--07-04-2021 se contemplan horarios semanales del tipo Lunes 06.00 hasta Sabado 21.15
--18-06-2021 se modifica --3ro obtengo las aperturas del dia con cierres a futuro que no sea mañana--
--07-09-2021 en los feriados si el parametro OPNCLOVERIFICABLE = 2 (Feriados utiliza Tolerancias) entonces AlarmaAntes y AlarmaDespues son _NG
--18-10-2021 en los feriados si el parametro OPNCLOVERIFICABLE = 2 (Feriados utiliza Tolerancias) entonces AlarmaAntes y AlarmaDespues son los de la tolerancia
--26-10-2021 se modifico --8vo obtengo los cierres de hoy con aperturas en el pasado que no sea ayer--
--11-11-2021 se modifico SinHorarioControlaEvento para considerar el modo y asi cambiar el tipo
--28-12-2021 se modifico SinHorarioControlaEvento Modo 1 controlando que no tenga dias de apertura y cierre diferentes
--22-04-2022 se modifica Modo 1 Cierres del dia y cierres de Mañana
--15-06-2022 se modifico SinHorarioControlaEvento, para considerar tener un dia con cierre pero no con apertura
--22-07-2022 se agrego --9no genero registro control de aperturas para cierres de hoy con aperturas en el pasado que no sea ayer--
--04-10-2022 se modifica Modo 0 Cierres del dia con aperturas en el pasado que no sea ayer
--29-11-2024 se modifica --3ro obtengo las cierres de mañana con aperturas del dia de hoy y se agrego --7mo obtengo los cierres de hoy con aperturas de ayer
--29-12-2025 se agrego control para no considerar cuentas de VC ( _iidcuenta NOT IN (Select cue_iid From v_CuentasVC) ) - DK-1364
Set NoCount ON
BEGIN TRY
If @iIdCta = 0
	Set @iIdCta = Null

If @iDay = 0
	Set @iDay = DatePart(dw,GetDate())

SET DATEFIRST 7
Declare @DiaHoy DateTime
Set @DiaHoy = GetDate()
Declare @iDiff Int = DATEPART(dw, @DiaHoy)
WHILE @iDiff <> @iDay
BEGIN
	Set @DiaHoy = DateADD(day, 1, @DiaHoy)
	Set @iDiff = DATEPART(dw, @DiaHoy)
END
Declare @iTomorrow Int = Case When @iDay = 7 Then 1 Else @iDay+1 End
Declare @DiaTomorrow DateTime
Set @DiaTomorrow = DateADD(day, 1, @DiaHoy)

Declare @iYesterday Int = Case When @iDay = 1 Then 7 Else @iDay-1 End
Declare @DiaYesterday DateTime
Set @DiaYesterday = DateADD(day, -1, @DiaHoy)

Declare @iParametro Int = IsNull(( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='OPNCLOVERIFICABLE' ),0)
Declare @iVerificable Int = IsNull(( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='SINHORARIOVERIFICABLE' ),1)

--Primero la temporal para SinHorarioControlaEvento
IF OBJECT_ID('tempdb..#SHCETemp') IS Not NULL
	Drop Table #SHCETemp

;With SinHorarioControlaEvento As (
Select tol_iidcuenta As idCta, @iDay As DOW,
 		DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy))) As HoraAntes,
		DateAdd(second, 59, DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy)))) As HoraDespues,
		--Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'OPV' Else 'OPF' End) Else '_NC' End As AlarmaAntes,
		--Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'CLV' Else 'CLF' End) Else '_NC' End As AlarmaDespues,
		Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'OPV' Else ( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) End) Else '_NC' End As AlarmaAntes,
		Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'OPV' Else ( Case When tol_cAperturaDespuesAlarma = Space(3) Then 'OPF' Else tol_cAperturaDespuesAlarma  End)  End) Else '_NC' End As AlarmaDespues,
	'O' As Tipo,
  	'N' As GeneraNYO, 
	'N' As GeneraNYC, 
	'N' As AutoProcesaNYO, 
	'N' As AutoProcesaNYC 
From m_horarios_tolerancia
Left Outer Join m_horarios ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or tol_iidcuenta=@iIdCta)
	And tol_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	--And tol_nControl = 1
	And tol_nModo=0
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And ( IsNull(hor_ndiaApertura,0) != @iDay And IsNull(hor_ndiaCierre,0) != @iDay  )
	--And @iDay Not In ( Select hor_ndiaApertura From m_horarios Where hor_iidCuenta=tol_iidCuenta Union Select hor_ndiaCierre From m_horarios Where hor_iidCuenta=tol_iidCuenta)
	And @iDay Not In ( Select hor_ndiaCierre From m_horarios Where hor_iidCuenta=tol_iidCuenta)

	And tol_iidcuenta NOT IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaHoy,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaHoy,112)	)

Union All

Select tol_iidcuenta As idCta, @iDay As DOW,
 		DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy))) As HoraAntes,
		DateAdd(second, 59, DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy)))) As HoraDespues,
		Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'CLV' Else ( Case When tol_cCierreAntesAlarma = Space(3) Then 'CLF' Else tol_cCierreAntesAlarma End) End) Else '_NC' End As AlarmaAntes,
		Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'CLV' Else ( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End)  End) Else '_NC' End As AlarmaDespues,
	'C' As Tipo,
  	'N' As GeneraNYO, 
	'N' As GeneraNYC, 
	'N' As AutoProcesaNYO, 
	'N' As AutoProcesaNYC 
From m_horarios_tolerancia
Left Outer Join m_horarios ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or tol_iidcuenta=@iIdCta)
	And tol_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	--And tol_nControl = 1
	And tol_nModo=0
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And ( IsNull(hor_ndiaApertura,0) != @iDay And IsNull(hor_ndiaCierre,0) != @iDay  )
	And @iDay Not In ( Select hor_ndiaApertura From m_horarios Where hor_iidCuenta=tol_iidCuenta Union Select hor_ndiaCierre From m_horarios Where hor_iidCuenta=tol_iidCuenta)
	And tol_iidcuenta NOT IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaHoy,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaHoy,112))
UNION ALL
--Modo 1 
Select tol_iidcuenta As idCta, @iDay As DOW,
 		DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy))) As HoraAntes,
		DateAdd(second, 59, DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy)))) As HoraDespues,
		--Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'OPV' Else 'OPF' End) Else '_NC' End As AlarmaAntes,
		--Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'CLV' Else 'CLF' End) Else '_NC' End As AlarmaDespues,
		Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'OPV' Else ( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) End) Else '_NC' End As AlarmaAntes,
		Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'OPV' Else ( Case When tol_cAperturaDespuesAlarma = Space(3) Then 'OPF' Else tol_cAperturaDespuesAlarma  End)  End) Else '_NC' End As AlarmaDespues,
	'O' As Tipo,
  	'N' As GeneraNYO, 
	'N' As GeneraNYC, 
	'N' As AutoProcesaNYO, 
	'N' As AutoProcesaNYC 
From m_horarios_tolerancia
Left Outer Join m_horarios ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or tol_iidcuenta=@iIdCta)
	And tol_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	--And tol_nControl = 1
	And tol_nModo=1
	--And tol_iidcuenta NOT IN ( SELECT Distinct [hor_iidcuenta] FROM [m_horarios] Where ABS([hor_ndiacierre]-[hor_ndiaapertura]) > 0)
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And ( IsNull(hor_ndiaApertura,0) != @iDay And IsNull(hor_ndiaCierre,0) != @iDay  )
	--And @iDay Not In ( Select hor_ndiaApertura From m_horarios Where hor_iidCuenta=tol_iidCuenta Union Select hor_ndiaCierre From m_horarios Where hor_iidCuenta=tol_iidCuenta)
	And @iDay Not In ( Select hor_ndiaApertura From m_horarios Where hor_iidCuenta=tol_iidCuenta )

	And tol_iidcuenta NOT IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaHoy,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaHoy,112)	)

UNION ALL
Select tol_iidcuenta As idCta, @iDay As DOW,
 		DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy))) As HoraAntes,
		DateAdd(second, 59, DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy)))) As HoraDespues,
		Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'CLV' Else ( Case When tol_cCierreAntesAlarma = Space(3) Then 'CLF' Else tol_cCierreAntesAlarma End) End) Else '_NC' End As AlarmaAntes,
		Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'CLV' Else ( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End)  End) Else '_NC' End As AlarmaDespues,
	'C' As Tipo,
  	'N' As GeneraNYO, 
	'N' As GeneraNYC, 
	'N' As AutoProcesaNYO, 
	'N' As AutoProcesaNYC 
From m_horarios_tolerancia
Left Outer Join m_horarios ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or tol_iidcuenta=@iIdCta)
	And tol_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	--And tol_nControl = 1
	And tol_nModo=1
	--And tol_iidcuenta NOT IN ( SELECT Distinct [hor_iidcuenta] FROM [m_horarios] Where ABS([hor_ndiacierre]-[hor_ndiaapertura]) > 0)
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And ( IsNull(hor_ndiaApertura,0) != @iDay And IsNull(hor_ndiaCierre,0) != @iDay  )
	And @iDay Not In ( Select hor_ndiaApertura From m_horarios Where hor_iidCuenta=tol_iidCuenta Union Select hor_ndiaCierre From m_horarios Where hor_iidCuenta=tol_iidCuenta)
	And tol_iidcuenta NOT IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaHoy,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaHoy,112))

/*2024-05-08 Quedo descomentado en UN y en WeMonitor
UNION ALL
--Modo 1
Select tol_iidcuenta As idCta, @iDay As DOW,
 		DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy))) As HoraAntes,
		DateAdd(second, 59, DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy)))) As HoraDespues,
		Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'OPV' Else ( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) End) Else '_NC' End As AlarmaAntes,
		Case When tol_nControl = 1 Then (Case When @iVerificable = 1 Then 'CLV' Else ( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End)  End) Else '_NC' End As AlarmaDespues,
	'OC' As Tipo,
  	'N' As GeneraNYO, 
	'N' As GeneraNYC, 
	'N' As AutoProcesaNYO, 
	'N' As AutoProcesaNYC 
From m_horarios_tolerancia
Left Outer Join m_horarios ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or tol_iidcuenta=@iIdCta)
	And tol_nModo=1
	--
    And tol_iidcuenta IN ( SELECT Distinct [hor_iidcuenta] FROM [m_horarios] Where ABS([hor_ndiacierre]-[hor_ndiaapertura]) > 0)
    --
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And ( IsNull(hor_ndiaApertura,0) != @iDay And IsNull(hor_ndiaCierre,0) != @iDay  )
	And @iDay Not In ( Select hor_ndiaApertura From m_horarios Where hor_iidCuenta=tol_iidCuenta Union Select hor_ndiaCierre From m_horarios Where hor_iidCuenta=tol_iidCuenta)
	And tol_iidcuenta NOT IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaHoy,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaHoy,112))
*/
	)
Select idCta,DOW,HoraAntes,HoraDespues,AlarmaAntes,AlarmaDespues,Tipo,GeneraNYO,GeneraNYC,AutoProcesaNYO,AutoProcesaNYC 
Into #SHCETemp
From SinHorarioControlaEvento
Where DOW=@iDay
Group By idCta,DOW,HoraAntes,HoraDespues,AlarmaAntes,AlarmaDespues,Tipo,GeneraNYO,GeneraNYC,AutoProcesaNYO,AutoProcesaNYC
--

;With TimerHorariosControl As (
--Modo 0
--1ero obtengo las aperturas del dia
SELECT hor_iidCuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nAperturaAntes, Cast(hor_choraapertura As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nAperturaDespues, Cast(hor_choraapertura As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) As AlarmaAntes,
	( Case When tol_cAperturaDespuesAlarma = Space(3) Then 'OPF' Else tol_cAperturaDespuesAlarma  End) As AlarmaDespues,
	'O' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios 
INNER JOIN m_horarios_tolerancia ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or hor_iidCuenta=@iIdCta)
	And hor_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And hor_ndiaApertura = @iDay
	And tol_nModo=0
	And IsDate(hor_choraapertura)=1	And IsDate(hor_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And NOT hor_iidCuenta IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaHoy,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaHoy,112)
								) 
	And  NOT hor_iidCuenta IN (	SELECT alt_iidCuenta FROM m_horarios_alternativos 
									LEFT OUTER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta
									WHERE alt_ndiaApertura = @iDay AND alt_iidCuenta=hor_iidCuenta --AND alt_choraapertura!='00:00'
								)
Union All
(
--2do obtengo las cierres del dia de hoy con apertura del mismo dia
SELECT hor_iidCuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nCierreAntes, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cCierreAntesAlarma = Space(3) Then 'CLF' Else tol_cCierreAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'C' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios 
INNER JOIN m_horarios_tolerancia ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or hor_iidCuenta=@iIdCta)
	And hor_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	--And hor_ndiaCierre = @iDay
	And ( hor_ndiaApertura = @iDay And hor_ndiaCierre = @iDay  )
	And tol_nModo=0
	And IsDate(hor_choraapertura)=1	And IsDate(hor_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And NOT hor_iidCuenta IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaHoy,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaHoy,112)
								) 
	And  NOT hor_iidCuenta IN (	SELECT alt_iidCuenta FROM m_horarios_alternativos 
									LEFT OUTER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta
									WHERE alt_ndiaCierre = @iDay AND alt_iidCuenta=hor_iidCuenta 
								)
)
Union All
(
--3ro obtengo las cierres de mañana con aperturas del dia de hoy
SELECT hor_iidCuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nCierreAntes, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaTomorrow)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaTomorrow)) As HoraDespues,
	( Case When tol_cCierreAntesAlarma = Space(3) Then 'CLF' Else tol_cCierreAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'C' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios 
INNER JOIN m_horarios_tolerancia ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or hor_iidCuenta=@iIdCta)
	And hor_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And ( hor_ndiaapertura = @iDay And hor_ndiaCierre = @iTomorrow ) 
	And tol_nModo=0
	And IsDate(hor_choraapertura)=1	And IsDate(hor_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And NOT hor_iidCuenta IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaTomorrow,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaTomorrow,112)
								) 
	And  NOT hor_iidCuenta IN (	SELECT alt_iidCuenta FROM m_horarios_alternativos 
									LEFT OUTER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta
									WHERE alt_ndiaCierre = @iDay AND alt_iidCuenta=hor_iidCuenta 
								)
)
Union All
(
--4to obtengo las aperturas alternativas del dia
SELECT alt_iidcuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nAperturaAntes, Cast(alt_choraapertura As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nAperturaDespues, Cast(alt_choraapertura As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) As AlarmaAntes,
	( Case When tol_cAperturaDespuesAlarma = Space(3) Then 'OPF' Else tol_cAperturaDespuesAlarma  End) As AlarmaDespues,
	'O' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios_alternativos 
INNER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or alt_iidCuenta=@iIdCta)
	And alt_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And alt_ndiaApertura = @iDay
	And tol_nModo=0
	And IsDate(alt_choraapertura)=1	And IsDate(alt_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	--And alt_choraapertura!='00:00'
)
Union All
(
--5to obtengo las cierres alternativos del dia
SELECT alt_iidcuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nCierreAntes, Cast(alt_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(alt_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cCierreAntesAlarma = Space(3) Then 'CLF' Else tol_cCierreAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'C' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios_alternativos 
INNER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or alt_iidCuenta=@iIdCta)
	And alt_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And alt_ndiaCierre = @iDay
	And tol_nModo=0
	And IsDate(alt_choraapertura)=1	And IsDate(alt_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
)
Union All
(
--6to obtengo los cierres de hoy con aperturas en el pasado que no sea ayer
SELECT hor_iidCuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nCierreAntes, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cCierreAntesAlarma = Space(3) Then 'CLF' Else tol_cCierreAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'C' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios 
INNER JOIN m_horarios_tolerancia ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or hor_iidCuenta=@iIdCta)
	And hor_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And ( hor_ndiaapertura != @iDay And hor_ndiaapertura != @iYesterday And hor_ndiaCierre = @iDay ) 
	And tol_nModo=0
	And IsDate(hor_choraapertura)=1	And IsDate(hor_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And NOT hor_iidCuenta IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @iYesterday,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @iYesterday,112)
								) 
	And  NOT hor_iidCuenta IN (	SELECT alt_iidCuenta FROM m_horarios_alternativos 
									LEFT OUTER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta
									WHERE alt_ndiaCierre = @iDay AND alt_iidCuenta=hor_iidCuenta --AND alt_choraapertura!='00:00'
								)
)
Union All
(
--7mo obtengo los cierres de hoy con aperturas de ayer
SELECT hor_iidCuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nCierreAntes, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cCierreAntesAlarma = Space(3) Then 'CLF' Else tol_cCierreAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'C' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios 
INNER JOIN m_horarios_tolerancia ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or hor_iidCuenta=@iIdCta)
	And hor_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And (  hor_ndiaapertura = @iYesterday And hor_ndiaCierre = @iDay ) 
	And tol_nModo=0
	And IsDate(hor_choraapertura)=1	And IsDate(hor_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And NOT hor_iidCuenta IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @iYesterday,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @iYesterday,112)
								) 
	And  NOT hor_iidCuenta IN (	SELECT alt_iidCuenta FROM m_horarios_alternativos 
									LEFT OUTER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta
									WHERE alt_ndiaCierre = @iDay AND alt_iidCuenta=hor_iidCuenta --AND alt_choraapertura!='00:00'
								)

)
----
Union All
----
--Modo 1
--1ero obtengo las aperturas del dia con cierres del dia
(
SELECT hor_iidCuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nAperturaAntes, Cast(hor_choraapertura As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'OC' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios 
INNER JOIN m_horarios_tolerancia ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or hor_iidCuenta=@iIdCta)
	And hor_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And ( hor_ndiaApertura = @iDay And hor_ndiaCierre = @iDay  )
	And tol_nModo=1
	And IsDate(hor_choraapertura)=1	And IsDate(hor_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And NOT hor_iidCuenta IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaHoy,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaHoy,112)
								) 
	And  NOT hor_iidCuenta IN (	SELECT alt_iidCuenta FROM m_horarios_alternativos 
									LEFT OUTER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta
									WHERE alt_ndiaApertura = @iDay AND alt_iidCuenta=hor_iidCuenta --AND alt_choraapertura!='00:00'
								)
)
Union All
(
--2do obtengo las cierres de mañama
SELECT hor_iidCuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nAperturaAntes, Cast(hor_choraapertura As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaTomorrow)) As HoraDespues,
	( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'OC' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios 
INNER JOIN m_horarios_tolerancia ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or hor_iidCuenta=@iIdCta)
	And hor_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And ( hor_ndiaapertura = @iDay And hor_ndiaCierre = @iTomorrow ) 
	And tol_nModo=1
	And IsDate(hor_choraapertura)=1	And IsDate(hor_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And NOT hor_iidCuenta IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaTomorrow,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaTomorrow,112)
								) 
	And  NOT hor_iidCuenta IN (	SELECT alt_iidCuenta FROM m_horarios_alternativos 
									LEFT OUTER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta
									WHERE alt_ndiaCierre = @iDay AND alt_iidCuenta=hor_iidCuenta 
								)
)
Union All
(
--3ro obtengo las aperturas del dia con cierres a futuro que no sea mañana
SELECT hor_iidCuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nAperturaAntes, Cast(hor_choraapertura As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DateAdd(second, 59, DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy)))) As HoraDespues,
	( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'OC' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios 
INNER JOIN m_horarios_tolerancia ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or hor_iidCuenta=@iIdCta)
	And hor_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And ( hor_ndiaApertura = @iDay And hor_ndiaCierre != @iDay And hor_ndiaCierre != @iTomorrow )
	And tol_nModo=1
	And IsDate(hor_choraapertura)=1	And IsDate(hor_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And NOT hor_iidCuenta IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaHoy,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaHoy,112)
								) 
	And  NOT hor_iidCuenta IN (	SELECT alt_iidCuenta FROM m_horarios_alternativos 
									LEFT OUTER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta
									WHERE alt_ndiaApertura = @iDay AND alt_iidCuenta=hor_iidCuenta --AND alt_choraapertura!='00:00'
								)
)
Union All
(
--4to obtengo las aperturas de ayer y cierres de hoy
SELECT hor_iidCuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nAperturaAntes, Cast(hor_choraapertura As DateTime) )+DateADD(day, -1, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'OC' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios 
INNER JOIN m_horarios_tolerancia ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or hor_iidCuenta=@iIdCta)
	And hor_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And ( hor_ndiaapertura = @iYesterday And hor_ndiaCierre = @iDay ) 
	And tol_nModo=1
	And IsDate(hor_choraapertura)=1	And IsDate(hor_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And NOT hor_iidCuenta IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @iYesterday,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @iYesterday,112)
								) 
	And  NOT hor_iidCuenta IN (	SELECT alt_iidCuenta FROM m_horarios_alternativos 
									LEFT OUTER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta
									WHERE alt_ndiaCierre = @iDay AND alt_iidCuenta=hor_iidCuenta --AND alt_choraapertura!='00:00'
								)
)
Union All
(
--5to obtengo las aperturas alternativas del dia con cierres alternativos del dia
SELECT alt_iidcuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nAperturaAntes, Cast(alt_choraapertura As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(alt_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'OC' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios_alternativos 
INNER JOIN m_horarios_tolerancia ON alt_iidcuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or alt_iidcuenta=@iIdCta)
	And alt_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And ( alt_ndiaApertura = @iDay And alt_ndiaCierre = @iDay  )
	And tol_nModo=1
	And IsDate(alt_choraapertura)=1	And IsDate(alt_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And alt_choraapertura!='00:00'
)
Union All
(
--6to obtengo las aperturas alternativos de ayer y cierres alternativos de hoy
SELECT alt_iidcuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nAperturaAntes, Cast(alt_choraapertura As DateTime) )+DateADD(day, -1, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(alt_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'OC' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios_alternativos 
INNER JOIN m_horarios_tolerancia ON alt_iidcuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or alt_iidcuenta=@iIdCta)
	And alt_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And ( alt_ndiaapertura = @iYesterday And alt_ndiaCierre = @iDay ) 
	And tol_nModo=1
	And IsDate(alt_choraapertura)=1	And IsDate(alt_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
--	And alt_choraapertura!='00:00'
)
Union All
(
--7mo obtengo las aperturas alternativas del dia con cierres alternativos del dia generados por cierre alternativo desde atencion del evento
SELECT alt_iidcuenta As idCta, @iDay As DOW,
	 DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(alt_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'OC' As Tipo,
  	'N' As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	'N'  As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios_alternativos 
INNER JOIN m_horarios_tolerancia ON alt_iidcuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or alt_iidcuenta=@iIdCta)
	And alt_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And ( alt_ndiaApertura = @iDay And alt_ndiaCierre = @iDay  AND alt_choraapertura='00:00' )
	And tol_nModo=1
	And IsDate(alt_choraapertura)=1	And IsDate(alt_choracierre)=1
	--And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
)	
Union All
(
--8vo obtengo los cierres de hoy con aperturas en el pasado que no sea ayer
SELECT hor_iidCuenta As idCta, @iDay As DOW,
	 DATEADD(minute, -tol_nCierreAntes, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	( Case When tol_cCierreAntesAlarma = Space(3) Then 'CLF' Else tol_cCierreAntesAlarma End) As AlarmaAntes,
	( Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma  End) As AlarmaDespues,
	'C' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
FROM m_horarios 
INNER JOIN m_horarios_tolerancia ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or hor_iidCuenta=@iIdCta)
	And hor_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And ( hor_ndiaapertura != @iDay And hor_ndiaapertura != @iYesterday And hor_ndiaCierre = @iDay ) 
	And tol_nModo=1
	And IsDate(hor_choraapertura)=1	And IsDate(hor_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And NOT hor_iidCuenta IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @iYesterday,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @iYesterday,112)
								) 
	And  NOT hor_iidCuenta IN (	SELECT alt_iidCuenta FROM m_horarios_alternativos 
									LEFT OUTER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta
									WHERE alt_ndiaCierre = @iDay AND alt_iidCuenta=hor_iidCuenta --AND alt_choraapertura!='00:00'
								)
)
Union All
--9no genero registro control de aperturas para cierres de hoy con aperturas en el pasado que no sea ayer
(
SELECT hor_iidCuenta As idCta, @iDay As DOW,
	 DATEADD(minute, tol_nCierreDespues, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 DATEADD(minute, tol_nCierreDespues, Cast(hor_choraCierre As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	'_NG' As AlarmaAntes,
	( Case When tol_cAperturaDespuesAlarma = Space(3) Then 'OPF' Else tol_cAperturaDespuesAlarma  End) As AlarmaDespues,
	'O' As Tipo,
  	'N' As GeneraNYO, 
	'N' As GeneraNYC, 
	'N' As AutoProcesaNYO, 
	'N' As AutoProcesaNYC 
FROM m_horarios 
INNER JOIN m_horarios_tolerancia ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or hor_iidCuenta=@iIdCta)
	And hor_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And ( hor_ndiaapertura != @iDay And hor_ndiaapertura != @iYesterday And hor_ndiaCierre = @iDay ) 
	And tol_nModo=1
	And IsDate(hor_choraapertura)=1	And IsDate(hor_choracierre)=1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And NOT hor_iidCuenta IN ( SELECT  exc_iidcuenta FROM m_horarios_excepcion
									INNER JOIN _tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
       								WHERE DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
									AND CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @iYesterday,112)
									AND CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @iYesterday,112)
								) 
	And  NOT hor_iidCuenta IN (	SELECT alt_iidCuenta FROM m_horarios_alternativos 
									LEFT OUTER JOIN m_horarios_tolerancia ON alt_iidCuenta=tol_iidCuenta
									WHERE alt_ndiaCierre = @iDay AND alt_iidCuenta=hor_iidCuenta --AND alt_choraapertura!='00:00'
								)
)
----
Union All
----
(
--Vacaciones
Select tol_iidcuenta As idCta, @iDay As DOW,
 	 Case When @iParametro = 1 Then DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy))) Else DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) End As HoraAntes,
	 DateAdd(second, 59, DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy)))) As HoraDespues,
	 Case When @iParametro = 1 Then 'OVF' Else (Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End)  End As AlarmaAntes,
	 Case When @iParametro = 1 Then 'CVF' Else (Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma End) End As AlarmaDespues,
	'V' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
From m_horarios_tolerancia
Where (@iIdCta Is Null Or tol_iidcuenta=@iIdCta)
	And tol_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And @DiaHoy Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
)
Union All
---
(
--Feriados
Select exc_iidcuenta As idCta, @iDay As DOW,
 	 --------DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 --------DateAdd(second, 1, DateADD(day, 0, DateDIFF(day, 0, @DiaHoy))) As HoraDespues,
	 ------Case When @iParametro = 1 Then DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy))) Else DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) End As HoraAntes,
	 ------DateAdd(second, 59, DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy)))) As HoraDespues,
	 ----DATEADD(minute, -tol_nAperturaAntes, Cast([eve_choradesde] As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 ----DATEADD(minute, tol_nCierreDespues, Cast([eve_chorahasta] As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	 --DATEADD(minute, -tol_nAperturaAntes, Cast([exc_cHoraApertura] As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraAntes,
	 --DATEADD(minute, tol_nAperturaDespues, Cast([exc_cHoraCierre] As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) As HoraDespues,
	 Case When [exc_cHoraApertura]='00:00' And [exc_cHoraCierre]='23:59' Then Cast([exc_cHoraApertura] As DateTime)+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) 
		  Else DATEADD(minute, -tol_nAperturaAntes, Cast([exc_cHoraApertura] As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) End As HoraAntes,
	 Case When [exc_cHoraApertura]='00:00' And [exc_cHoraCierre]='23:59' Then Cast([exc_cHoraCierre] As DateTime) +DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) 
		  Else DATEADD(minute, tol_nCierreDespues, Cast([exc_cHoraCierre] As DateTime) )+DateADD(day, 0, DateDIFF(day, 0, @DiaHoy)) End As HoraDespues,
	 ----Case When @iParametro = 1 Then 'OVF' Else (Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End)  End As AlarmaAntes,
	 ----Case When @iParametro = 1 Then 'CVF' Else (Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma End) End As AlarmaDespues,
	 --Case When @iParametro = 2 Then '_NG' Else (Case When @iParametro = 1 Then 'OVF' Else (Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) End) End As AlarmaAntes,
	 --Case When @iParametro = 2 Then '_NG' Else (Case When @iParametro = 1 Then 'CVF' Else (Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma End) End) End As AlarmaDespues,
	 Case When @iParametro = 2 Then tol_cAperturaAntesAlarma Else (Case When @iParametro = 1 Then 'OVF' Else (Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) End) End As AlarmaAntes,
	 Case When @iParametro = 2 Then tol_cCierreDespuesAlarma Else (Case When @iParametro = 1 Then 'CVF' Else (Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma End) End) End As AlarmaDespues,
	'F' As Tipo,
  	(Case When tol_nNYO=1 Then 'S' Else 'N' End ) As GeneraNYO, 
	(Case When tol_nNYC=1 Then 'S' Else 'N' End ) As GeneraNYC, 
	(Case When tol_nAPNYO=1 Then 'S' Else 'N' End ) As AutoProcesaNYO, 
	(Case When tol_nAPNYC=1 Then 'S' Else 'N' End ) As AutoProcesaNYC 
From m_horarios_excepcion
INNER JOIN m_horarios_tolerancia ON exc_iidcuenta=tol_iidCuenta
INNER JOIN _Tablas.dbo.t_eventos_feriados ON exc_cevento=eve_ccodigo
Where (@iIdCta Is Null Or tol_iidcuenta=@iIdCta)
	And tol_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And DATEPART(dw, eve_dfechadesdes)<=@iDay AND @iDay <=DATEPART(dw, eve_dfechahasta)
	And CONVERT(char(8), eve_dfechadesdes,112) >= CONVERT(char(8), @DiaHoy,112)
	And CONVERT(char(8), eve_dfechahasta,112) <= CONVERT(char(8), @DiaHoy,112)
	And tol_iidcuenta Not In (Select tol_iidcuenta From m_horarios_tolerancia
								Where (@iIdCta Is Null Or tol_iidcuenta=@iIdCta)
							And @DiaHoy Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
							)
)
----
Union All
----
--SinHorarioControlaEvento
(
Select * From #SHCETemp Where DOW=@iDay
)
/*
(
Select tol_iidcuenta As idCta, @iDay As DOW,
 	 DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy))) As HoraAntes,
	 DateAdd(second, 59, DateADD(Minute, 59, DateADD(HOUR, 23, DateDIFF(day, 0, @DiaHoy)))) As HoraDespues,
	 'OPV' As AlarmaAntes,
	 'CLV' As AlarmaDespues,
	'M' As Tipo,
  	'N' As GeneraNYO, 
	'N' As GeneraNYC, 
	'N' As AutoProcesaNYO, 
	'N' As AutoProcesaNYC 
From m_horarios_tolerancia
Left Outer Join m_horarios ON hor_iidCuenta=tol_iidCuenta  
Where (@iIdCta Is Null Or tol_iidcuenta=@iIdCta)
	And tol_iidcuenta NOT IN (Select cue_iid From v_CuentasVC)
	And tol_nControl = 1
	And @DiaHoy Not Between IsNull(tol_dVacacionesDesde,@DiaHoy-1) And IsNull(tol_dVacacionesHasta,@DiaHoy-1)
	And ( IsNull(hor_ndiaApertura,0) != @iDay And IsNull(hor_ndiaCierre,0) != @iDay  )
	And @iDay Not In ( Select hor_ndiaApertura From m_horarios Where hor_iidCuenta=tol_iidCuenta)
)
*/
----
--Order By 1,3
)
Select idCta, DOW, HoraAntes, HoraDespues, AlarmaAntes, AlarmaDespues, Tipo, GeneraNYO, GeneraNYC, AutoProcesaNYO, AutoProcesaNYC
From TimerHorariosControl
Group By idCta, DOW, HoraAntes, HoraDespues, AlarmaAntes, AlarmaDespues, Tipo, GeneraNYO, GeneraNYC, AutoProcesaNYO, AutoProcesaNYC
Order By 1,3


END TRY
BEGIN CATCH
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
END CATCH