--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.150 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.220 
--#############################################################################



CREATE OR ALTER PROCEDURE [dbo].[SearchTimelineQ2](@IdEvento NVARCHAR(128), @page int = 0, @start int = 0, @limit int = 20)
as 
begin
set nocount on
--El tema de los llamados telefonicos salen de aca
--Lo llamamos Q2
	Select PR.rec_tFechaHora,PR.rec_cContenido,PR.rec_cObservaciones,OP.ope_cnombre, 
	CONVERT(VARCHAR, PR.rec_tFechaHora, 126) AS rec_isoFechaHora
	 From _datos..p_recepcion PR
		Left Outer Join _Sistema.dbo.s_operadores OP On OP.ope_iid=PR.rec_ioperador
		Where PR.rec_iTE=@IdEvento And rec_calarma='_TE'
	   	Order By rec_tfechahora
end