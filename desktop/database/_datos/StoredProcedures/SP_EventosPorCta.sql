CREATE OR ALTER PROCEDURE [dbo].[SP_EventosPorCta] @idCta Int AS 
--Selecciona las eventos reales ingresados por PG de los ultimos 30 dias
--Autor .Pablo O. Canónico 07-09-2007
SET NOCOUNT ON
Declare @tFecha DateTime 
Set @tFecha = GetDate()-30
Select Count(rec_iid) As nCant,Day(rec_tfechahora) As dia,Month(rec_tfechahora) As Mes,Year(rec_tfechahora) As Anio
   FROM [_Datos].[dbo].[p_recepcion]  With (NOLOCK)
	Where rec_iidCuenta = @idCta And rec_nOrigen = 2 And rec_tfechahora>=CONVERT(char(8), @tFecha,112) 
	Group By Day(rec_tfechahora),Month(rec_tfechahora),Year(rec_tfechahora)
	Order By Year(rec_tfechahora),Month(rec_tfechahora),Day(rec_tfechahora)