CREATE OR ALTER PROCEDURE [dbo].[SGSP_TimerLimites]
	@iDOW [Int] = 0,
	@iIdCta [Int] = 0 
As
--Busca Limite OPN/CLO de un dia de la semana
--Autor : Pablo O. Canónico
--Fecha : 17/10/2017
--04-08-2018 se agrego el DateFirst porque en sistemas en Language no US toma lunes como dia 1
--28-09-2018 se agrego Join con Tolerancias para obtener la HoraOPNDepues en horarios tipo OC ( Rango )
--25-03-2019 se agrego [DOW]=@iDOW
--06-11-2019 se agrego feriados por nueva estructura con horarios
--23-03-2020 en feriados si los horarios son 00:00 a 23:59 no se consideran para limites
--27-04-2020 se separo feriados del resto en NYC porque los horarios alternativos empiezan en 00:00
--17-06-2021 se controla para NYC no consuderar los horarios que  empiezan en 00:00 y tereminen en 23:59 (Son horario de un dia para el otro }
--28-08-2021 se cambia a NOT (CONVERT(VARCHAR(5),[HoraAntes],108) = '00:00' And CONVERT(VARCHAR(5),[HoraDespues],108) = '23:59' ) para contemplar NYC de horarios alternativos
--09-11-2021 se separo el NYC de tipo C y OC
Set NoCount ON
BEGIN TRY
Set DATEFIRST 7
Declare @DiaHoy DateTime = GetDate()
If @iDOW = 0
	Set @iDOW = DatePart(dw,@DiaHoy)

Declare @HoyCeroHoras DateTime = DateADD(day, 0, DateDIFF(day, 0, @DiaHoy))
Declare @iDiff Int = DatePart(dw, @DiaHoy)
WHILE @iDiff <> @iDOW
Begin
	Set @DiaHoy = DateADD(day, 1, DateDIFF(day, 0, @DiaHoy))
	Set @iDiff = DATEPART(dw, @DiaHoy)
End
Select @HoyCeroHoras = DateADD(day, 0, DateDIFF(day, 0, @DiaHoy))

If @iIdCta = 0
	Set @iIdCta = Null

If @iIdCta > 0
	Delete From [_Datos].[dbo].[TimerLimites] Where [HoraLimite]>=@HoyCeroHoras And [idCta]=@iIdCta
Else
	Delete From [_Datos].[dbo].[TimerLimites] Where [HoraLimite]>=@HoyCeroHoras;

WITH Limites AS (
	Select [idCta]
		  ,'NYO' As AlarmaGenerar
		  ,[HoraDespues] As HoraLimite
		  ,[GeneraNYO] As GeneraNY
	  From [_Datos].[dbo].[TimerHorarios] 
	  Where [Tipo] ='O' 
		And [GeneraNYO]='S'
		And [DOW]=@iDOW
		And (@iIdCta Is Null Or [idCta]=@iIdCta)
	Union All
	(
	Select [idCta]
		  ,'NYO' As AlarmaGenerar
		  ,DATEADD(minute, [tol_nAperturaAntes]+[tol_nAperturaDespues], [HoraAntes] ) As HoraLimite
		  ,[GeneraNYO] As GeneraNY
	  From [_Datos].[dbo].[TimerHorarios] 
	  Inner Join [_Datos].[dbo].[m_horarios_tolerancia] On [idCta]=[tol_iidCuenta]  
	  Where [Tipo] = 'OC' 
		And [GeneraNYO]='S'
		And [DOW]=@iDOW
		And (@iIdCta Is Null Or [idCta]=@iIdCta)
	)
	Union All
	(
	Select [idCta]
		  ,'NYO' As AlarmaGenerar
		  ,DATEADD(minute, [tol_nAperturaAntes]+[tol_nAperturaDespues], [HoraAntes] ) As HoraLimite
		  ,[GeneraNYO] As GeneraNY
	  From [_Datos].[dbo].[TimerHorarios] 
	  Inner Join [_Datos].[dbo].[m_horarios_tolerancia] On [idCta]=[tol_iidCuenta]  
	  Where [Tipo] ='F' 
		And [GeneraNYO]='S'
		And [DOW]=@iDOW
		And (@iIdCta Is Null Or [idCta]=@iIdCta)
		And NOT (CONVERT(VARCHAR(5),[HoraAntes],108) = '00:00' And CONVERT(VARCHAR(5),[HoraDespues],108) = '23:59' )
	)
	Union All
	(
	Select [idCta]
		  ,'NYC' As AlarmaGenerar
		  ,[HoraDespues] As HoraLimite
		  ,[GeneraNYC] As GeneraNY
	  From [_Datos].[dbo].[TimerHorarios]
	  Where [Tipo] IN('OC') 
		And [GeneraNYC]='S'
		And [DOW]=@iDOW
		And (@iIdCta Is Null Or [idCta]=@iIdCta)
		And NOT (CONVERT(VARCHAR(5),[HoraAntes],108) = '00:00' And CONVERT(VARCHAR(5),[HoraDespues],108) = '23:59' )
		And NOT ([AlarmaAntes]='_NG' And [AlarmaDespues]='_NG')
	)
	Union All
	(
	Select [idCta]
		  ,'NYC' As AlarmaGenerar
		  ,[HoraDespues] As HoraLimite
		  ,[GeneraNYC] As GeneraNY
	  From [_Datos].[dbo].[TimerHorarios]
	  Where [Tipo] IN('C') 
		And [GeneraNYC]='S'
		And [DOW]=@iDOW
		And (@iIdCta Is Null Or [idCta]=@iIdCta)
		And NOT (CONVERT(VARCHAR(5),[HoraAntes],108) = '00:00' And CONVERT(VARCHAR(5),[HoraDespues],108) = '23:59' )
	)
	Union All
	(
	Select [idCta]
		  ,'NYC' As AlarmaGenerar
		  ,[HoraDespues] As HoraLimite
		  ,[GeneraNYC] As GeneraNY
	  From [_Datos].[dbo].[TimerHorarios]
	  Where [Tipo] ='F' 
		And [GeneraNYC]='S'
		And [DOW]=@iDOW
		And (@iIdCta Is Null Or [idCta]=@iIdCta)
		And NOT (CONVERT(VARCHAR(5),[HoraAntes],108) = '00:00' And CONVERT(VARCHAR(5),[HoraDespues],108) = '23:59' )
	)
)
Select li.idCta,li.HoraLimite,li.AlarmaGenerar,0 As Status,Null As StatusExec
  From Limites li
  Where li.HoraLimite>=@DiaHoy	
Order By HoraLimite, idCta

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