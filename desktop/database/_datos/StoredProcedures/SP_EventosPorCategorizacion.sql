CREATE OR ALTER PROCEDURE [dbo].[SP_EventosPorCategorizacion] @cDesde Char(8),@cHasta Char(8)  AS 
--Selecciona los eventos de un periodo dado agrupados por categorizacion
--Autor .Pablo O. Canónico 28-07-2008
SET NOCOUNT ON
Select Max(res_cdescripcion) As cDesc, Count(*) As nCant  
   From p_recepcion With (NOLOCK)  
   Inner Join _Tablas.dbo.t_resoluciones On res_ccodigo = rec_idResolucion
   Where (rec_nestado<>0 and rec_nestado<>2) 
     And ( CONVERT(char(8), rec_tfechahora,112) >= @cDesde And CONVERT(char(8), rec_tfechahora,112) <= @cHasta )
   Group By rec_idResolucion