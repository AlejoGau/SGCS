--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.500 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.537 
--#############################################################################





CREATE OR ALTER PROCEDURE [dbo].[SearchTimelineQ5](@IdEvento NVARCHAR(128) = null, @page int = 0, @start int = 0, @limit int = 20)
as 
begin
set nocount on
--La unica forma de saber si se envio un SMS al atender un evento es
--Lo llamamos Q5
	Select PR.rec_tFechaHora,PR.rec_cContenido,PR.rec_cObservaciones,OP.ope_cnombre,
	CONVERT(VARCHAR, PR.rec_tFechaHora, 126) AS rec_isoFechaHora 
	From _datos..p_recepcion PR
		Left Outer Join _Sistema.dbo.s_operadores OP On OP.ope_iid=PR.rec_ioperador
		Where (PR.rec_iTE=@IdEvento  or @IdEvento = '' or @IdEvento is null)  And rec_calarma='_MT'
	   	Order By rec_tfechahora
end