CREATE OR ALTER PROCEDURE [dbo].[SP_BorraHorariosPlanilla] @nId int AS 
SET NOCOUNT ON
DELETE m_planillas WHERE pla_iid = @nId
DELETE m_horarios_planilla WHERE hor_iid = @nId