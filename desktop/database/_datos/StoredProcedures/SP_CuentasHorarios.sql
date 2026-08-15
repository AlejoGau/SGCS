CREATE OR ALTER PROCEDURE [dbo].[SP_CuentasHorarios] As
--Crea Horarios ficticios para controlar Aperturas/Cierres en dias sin horario y con control
--Autor .Pablo O. Canónico 01-11-2006
--Se modifico 12-06-2008 para considerar alarmas de tolerancias
--Se modifico 01-09-2014 para considerar nuevo parametro
--Se modifico 08-01-2015 para considerar vacaciones 

SET NOCOUNT ON
Declare @iParametro Int
Set @iParametro = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='OPNCLOVERIFICABLE' )
If @iParametro = 0
    Begin	
		SELECT cue_iid, Cast('23:59:59' As DateTime) As HoraAperturaAntes,
		MAX(Case When tol_cAperturaAntesAlarma = Space(3) Then 'OPF' Else tol_cAperturaAntesAlarma End) As AlarmaAperturaAntes,
		 Cast('23:59:59' As DateTime) As HoraAperturaDespues,
		MAX(Case When tol_cAperturaDespuesAlarma = Space(3) Then 'OPF' Else tol_cAperturaDespuesAlarma End) As AlarmaAperturaDespues,
		 Cast('23:59:59' As DateTime) As HoraCierreAntes,
		MAX(Case When tol_cCierreAntesAlarma = Space(3) Then 'CLF' Else tol_cCierreAntesAlarma End) As AlarmaCierreAntes,
		Cast('23:59:59' As DateTime) As HoraCierreDespues,
		MAX(Case When tol_cCierreDespuesAlarma = Space(3) Then 'CLF' Else tol_cCierreDespuesAlarma End) As AlarmaCierreDespues,
		0 As tol_nModo
		FROM m_cuentas With (NOLOCK)
			Inner Join m_horarios_tolerancia On cue_iid=tol_iidcuenta
		  Where tol_nControl = 1
			Group by cue_iid
	End
Else
    Begin	

		SELECT cue_iid, Cast('23:59:59' As DateTime) As HoraAperturaAntes,
		'OVF' As AlarmaAperturaAntes,
		Cast('23:59:59' As DateTime) As HoraAperturaDespues,
		'OVF' AlarmaAperturaDespues,
		Cast('23:59:59' As DateTime) As HoraCierreAntes,
		'CVF' As AlarmaCierreAntes,
		Cast('23:59:59' As DateTime) As HoraCierreDespues,
		'CVF' As AlarmaCierreDespues,
		0 As tol_nModo
		FROM m_cuentas With (NOLOCK)
			Inner Join m_horarios_tolerancia On cue_iid=tol_iidcuenta
  		  Where tol_nControl = 1 Or ( tol_nControl = 2 And  ( Case When CONVERT(char(8),tol_dVacacionesDesde,112)<=CONVERT(char(8), GetDate(),112) And CONVERT(char(8),tol_dVacacionesHasta,112)>=CONVERT(char(8), GetDate(),112) Then 1 Else 0 End = 1))
			Group by cue_iid
	End