CREATE OR ALTER PROCEDURE [dbo].[SP_CalculaTiempoTranscurrido] @iId Int AS
--Calcula el tiempo que paso desde la recepcion del evento hasta la fechahora actual
--Modificado 08-07-2009 para evitar fechas de p_recepcion mayores a GetDate()
SET NOCOUNT ON
Select Case When Year(Getdate() - rec_tFechaHora) < 1900 Then GetDate()-GetDate() Else Getdate() - rec_tFechaHora End  As Hora From _Datos.dbo.p_recepcion
Where rec_iid = @iId