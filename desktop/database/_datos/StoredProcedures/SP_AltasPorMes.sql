CREATE OR ALTER PROCEDURE [dbo].[SP_AltasPorMes] @tFecha DateTime AS 
--Selecciona las altas de cuentas del mes seleccioando
--Autor .Pablo O. Canónico 22-11-2005
--Modifico 22-08-2012 para considerar solo cuentas efectivas
SET NOCOUNT ON
Select Count(cue_iid) As nCant,Day(cue_dfechaalta) As dia,Month(cue_dfechaalta) As Mes,Year(cue_dfechaalta) As Anio
   FROM [_Datos].[dbo].[m_cuentas]  With (NOLOCK)
	Where Month(cue_dfechaalta)=Month(@tFecha) And Year(cue_dfechaalta) = Year(@tFecha)
		And cue_nEfectiva=1
	Group By Day(cue_dfechaalta),Month(cue_dfechaalta),Year(cue_dfechaalta)
	Order By Day(cue_dfechaalta),Month(cue_dfechaalta),Year(cue_dfechaalta)