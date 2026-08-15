CREATE OR ALTER PROCEDURE [dbo].[SGSP_GetDateTimeOffSet] @iCta int, @tFechaHora Datetime AS
Declare @FechaOffSet DatetimeOffSet 
Set @FechaOffSet = ( Select  SWITCHOFFSET (TODATETIMEOFFSET (@tFechaHora, DATENAME ( TZoffset , SYSDATETIMEOFFSET() )),
	IsNull(TZ.ttz_nOffSet,0.00)*60 ) 
	From _Datos.dbo.m_cuentas MC
	Left Outer Join _Tablas.dbo.t_TimeZone TZ On TZ.ttz_idKey=MC.cue_iZonaHoraria
	Where MC.cue_iid = @iCta )
	
Select Cast ( @FechaOffSet As Datetime ) As FechaOffSet