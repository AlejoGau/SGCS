CREATE OR ALTER PROCEDURE [dbo].TotalesCuentasActividadSearch
AS  
 SET NOCOUNT ON   
 
 SELECT c.cue_clinea,
				count(*) as totalalarmas from  [_Datos].[dbo].[m_CuentasXtraInfo] x
				inner join _Datos.dbo.m_cuentas c on x.cue_iidCuenta = c.cue_iid
				where cue_cUltimaAlarmaRecibida<>'' and cue_dFechaUltimaAlarmaRecibida>=
						dateadd(day,-7,getdate())
				group by c.cue_clinea