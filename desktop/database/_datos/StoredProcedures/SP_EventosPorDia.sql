CREATE OR ALTER PROCEDURE [dbo].[SP_EventosPorDia]  @cDay Char(8)  AS 
--Selecciona los eventos de un dia agrupados por hora, separados por origen
--1.TI 2.PG 3.Manual 4.MG
--Autor .Pablo O. Canónico 15-11-2005

SET NOCOUNT ON
Declare @lnCont Numeric(2)

Create Table #tmpHoras (nOrigen Numeric(1),nCantidad Int, nHora Numeric(2))

Select @lnCont = 0
While @lnCont < 24
Begin
   insert into #tmpHoras Values(1, 0, @lnCont)
   insert into #tmpHoras Values(2, 0, @lnCont)
   insert into #tmpHoras Values(3, 0, @lnCont)
   Select @lnCont = @lnCont  + 1
End


SELECT Max(rec_norigen) As nOrigen,Count(rec_iid) As nCantidad,DATEPART(hh,rec_tfechahora) As nHora
 FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK)
Where CONVERT(char(8), rec_tfechahora,112) = @cDay And rec_norigen = 1
Group By DATEPART(hh,rec_tfechahora),rec_norigen
Union All 
SELECT Max(rec_norigen) As nOrigen,Count(rec_iid) As nCantidad,DATEPART(hh,rec_tfechahora) As nHora
 FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK)
Where CONVERT(char(8), rec_tfechahora,112) = @cDay And rec_norigen = 2
Group By DATEPART(hh,rec_tfechahora),rec_norigen
Union All 
SELECT Max(rec_norigen) As nOrigen,Count(rec_iid) As nCantidad,DATEPART(hh,rec_tfechahora) As nHora
 FROM [_Datos].[dbo].[p_recepcion] With (NOLOCK)
Where CONVERT(char(8), rec_tfechahora,112) = @cDay And rec_norigen = 3
Group By DATEPART(hh,rec_tfechahora),rec_norigen
Union All
Select * From #tmpHoras

Drop Table #tmpHoras