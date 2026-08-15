--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.720 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.780 
--#############################################################################


CREATE OR ALTER PROCEDURE [dbo].[SearchTimelineQ7](@IdEvento NVARCHAR(128), @page int = 0, @start int = 0, @limit int = 20)
as 
begin
set nocount on
--Resolucion y Categorizacion del evente sale de
--Lo llamamos Q7
		Select IsNull(res_cdescripcion,Space(40)) As cCat, IsNull(cat_cdescripcion,Space(60)) As cRes
		 From _datos..p_recepcion PR With (NOLOCK) 
			Left Outer Join _Tablas.dbo.t_resoluciones TR On PR.rec_idResolucion = TR.res_ccodigo 
			Left Outer Join _Tablas.dbo.t_categorizacion TC On PR.rec_cCategorizacion = TC.cat_ccodigo 
	  	 Where PR.rec_iid=@IdEvento
end