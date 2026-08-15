CREATE OR ALTER PROCEDURE [dbo].[SP_AltasAnual] AS 
--Selecciona las altas de cuentas del ultimo año
--Autor .Pablo O. Canónico 22-11-2005
--Modifico 22-08-2012 para considerar solo cuentas efectivas
SET NOCOUNT ON
Declare @tFecha As DateTime
Declare @lnMes  INT
Declare @lnAnio INT
Declare @lnCont INT
Declare @i      INT
Declare @ln     INT
Declare @cDay   Char(8)

Select @tFecha = Getdate()
Select @cDay = CONVERT(Char(8), @tFecha,112)
-- Obtiene Mes y Año de Fecha pasada por parametro
Select @lnMes  = month(@tFecha)
Select @lnAnio = year(@tFecha)

-- Crea tabla temporal
Create Table #tmpVacia (cantidad int, mes int, anio int)
Insert #tmpVacia 
	SELECT Count(cue_iid),Month(cue_dfechaalta),Year(cue_dfechaalta)
	FROM [_Datos].[dbo].[m_cuentas] With (NOLOCK)
	Where DateDiff(MONTH,cue_dfechaalta,@cDay) < 12
		And cue_nEfectiva=1
	Group By  year(cue_dfechaalta), month(cue_dfechaalta)
	Order By  year(cue_dfechaalta), month(cue_dfechaalta)

-- Cuenta regresiva de año actual
Select @lnCont = 0
Select @i = 0
Select @i = @lnMes
While (@i > 0)
Begin
   Select @lnCont = @lnCont  + 1
   Insert into #tmpVacia values(0, @i, @lnAnio)
   Select @i = @i - 1
End

-- Cuenta regresiva de año anterior, si es aplicable
If @lnCont < 12
Begin
   Select @ln = @lnCont
   Select @i = 12
   While (@i > @ln)
   Begin
      Select @lnCont = @lnCont  + 1
      Insert into #tmpVacia values(0, @i, @lnAnio-1)
      Select @i = @i - 1
   End
End

-- Select final agrupando meses con datos y los sin datos
Select 	Sum(cantidad) As nCant, mes, anio
  From 	#tmpVacia
  Group by anio, mes 
  Order by anio, mes

Drop Table #tmpVacia