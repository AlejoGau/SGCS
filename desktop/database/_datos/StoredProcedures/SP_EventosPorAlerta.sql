CREATE OR ALTER PROCEDURE [dbo].[SP_EventosPorAlerta]  @cDesde Char(8),@cHasta Char(8)  AS 
--Selecciona los eventos de un periodo dado agrupados por Alerta
--Autor .Pablo O. Canónico 02-12-2005

SET NOCOUNT ON
--Genera Alerta
SELECT Count(rec_iid) As nCant, 'GA' As cTipo
	FROM p_recepcion With (NOLOCK)
	INNER JOIN _tablas.dbo.t_codigos_alarma ON rec_cAlarma= cod_cCodigo 
		And _Tablas.dbo.t_codigos_alarma.cod_nalerta=1
	WHERE rec_nestado IN (0,1,2,3,5,6,7) 
	And ( CONVERT(char(8), rec_tfechahora,112) >= @cDesde And CONVERT(char(8), rec_tfechahora,112) <= @cHasta )
Union All
--No Genera Alerta
SELECT Count(rec_iid) As nCant, 'NG' As cTipo
	FROM p_recepcion With (NOLOCK)
	INNER JOIN _tablas.dbo.t_codigos_alarma ON rec_cAlarma= cod_cCodigo 
		And _Tablas.dbo.t_codigos_alarma.cod_nalerta=0
	WHERE rec_nestado IN (0,1,2,3,5,6,7)
	And ( CONVERT(char(8), rec_tfechahora,112) >= @cDesde And CONVERT(char(8), rec_tfechahora,112) <= @cHasta )