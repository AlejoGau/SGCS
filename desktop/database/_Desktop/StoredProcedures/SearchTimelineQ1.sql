--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.050 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.080 
--#############################################################################


CREATE OR ALTER PROCEDURE [dbo].[SearchTimelineQ1](@IdEvento NVARCHAR(128), @page int = 0, @start int = 0, @limit int = 20)
as 
begin
set nocount on
--La info mas importante sale de aca 
--Lo llamamos Q1
	Select IsNull(OP.ope_cnombre,SPACE(60)) As ope_cnombre,PP.pro_nProceso,PP.pro_tfechahora,PR.rec_tfechahora,
	CONVERT(VARCHAR, PP.pro_tfechahora, 126) AS pro_isofechahora
	 From _datos..p_recepcion PR 
	  Inner Join _datos..p_recepcion_proceso PP On PR.rec_iid = PP.pro_recid 
	  Left Outer Join _Sistema.dbo.s_operadores OP On PP.pro_iOperador = OP.ope_iid  
  	 Where PR.rec_iid=@IdEvento
   	Order By pro_tfechahora, pro_nProceso 
end