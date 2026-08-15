CREATE OR ALTER PROCEDURE [dbo].[SP_VtoModoPrueba] AS 
--Detecta Cuentas en Modo Prueba con fecha hasta vencidas
--Autor .Pablo O. Canónico 03-09-2007
--Modificado 06-11-2007 para que considere tipo Prueba x Zonas
--Modificado 08-05-2025 para que considerar cuentas en otros husos horarios

SET NOCOUNT ON
-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'VtoModoPrueba', @Repetition = 2
--	
Declare @dDiaHoy DateTime = GETDATE()
/*
;WITH Updates 
AS
(SELECT est_nestado,est_ntipo,est_dfechadesde,est_nduracion,est_dfechahasta,est_mnota
	From m_estado_cuenta_Cab With (NOLOCK) 
  Where est_nEstado IN(1,3) And @dDiaHoy > est_dfechahasta)

UPDATE Updates
	SET est_nestado = 0 ,est_ntipo=0, est_dfechadesde=CONVERT(Char(8),@dDiaHoy,112) ,est_nduracion=0,est_dfechahasta=CONVERT(Char(8), @dDiaHoy,112), est_mnota=''
*/
DECLARE @nowUtc DATETIME = GETUTCDATE();

;WITH Updates AS
(
    SELECT 
        ec.*,
        -- Offset de la cuenta en minutos (p. ej. -5 → -300)
        CAST(ISNULL(tz.ttz_nOffSet,0) * 60 AS INT) AS OffsetUserMin
    FROM m_estado_cuenta_Cab ec
    JOIN _Datos.dbo.m_cuentas cu 
      ON cu.cue_iid = ec.est_iidcuenta
    JOIN _Tablas.dbo.t_TimeZone tz 
      ON tz.ttz_idKey = cu.cue_iZonaHoraria
    WHERE 
      ec.est_nestado IN (1,3) AND @nowUtc > DATEADD(MINUTE, - IsNull(TZ.ttz_nOffSet,0.00)*60 ,  ec.est_dfechahasta )
)
UPDATE Updates
	SET est_nestado = 0 ,est_ntipo=0, est_dfechadesde=CONVERT(Char(8),@dDiaHoy,112) ,est_nduracion=0,est_dfechahasta=CONVERT(Char(8), @dDiaHoy,112), est_mnota=''