CREATE OR ALTER PROCEDURE [dbo].[SP_EventosPorTipo]  @cDesde Char(8),@cHasta Char(8)  AS 
--Selecciona los eventos de un periodo dado agrupados por tipo de evento
--Autor .Pablo O. Canónico 01-12-2005

SET NOCOUNT ON
--Opn-Clo
SELECT Count(rec_iid) As nCant, 'OC' As cTipo
	FROM p_recepcion With (NOLOCK)
	INNER JOIN _tablas.dbo.t_codigos_alarma ON rec_cAlarma= cod_cCodigo 
		And _Tablas.dbo.t_codigos_alarma.cod_ntipo IN(1,2)
	WHERE rec_nestado IN (0,1,2,3,5,6,7) 
	And ( CONVERT(char(8), rec_tfechahora,112) >= @cDesde And CONVERT(char(8), rec_tfechahora,112) <= @cHasta )
Union All
--Emergencia
SELECT Count(rec_iid) As nCant, 'EM' As cTipo
	FROM p_recepcion With (NOLOCK)
	INNER JOIN _tablas.dbo.t_codigos_alarma ON rec_cAlarma= cod_cCodigo 
		And _Tablas.dbo.t_codigos_alarma.cod_ntipo=0 
		And _Tablas.dbo.t_codigos_alarma.cod_nalerta=1
	WHERE rec_nestado IN (0,1,2,3,5,6,7)
	And ( CONVERT(char(8), rec_tfechahora,112) >= @cDesde And CONVERT(char(8), rec_tfechahora,112) <= @cHasta )
Union All
--No Emergencia
SELECT Count(rec_iid) As nCant, 'NE' As cTipo
	FROM p_recepcion With (NOLOCK)
	INNER JOIN _tablas.dbo.t_codigos_alarma ON rec_cAlarma= cod_cCodigo 
		And ( _Tablas.dbo.t_codigos_alarma.cod_ntipo IN(3,4) Or
		     (_Tablas.dbo.t_codigos_alarma.cod_ntipo=0 And _Tablas.dbo.t_codigos_alarma.cod_nalerta=0))
	WHERE rec_nestado IN (0,1,2,3,5,6,7)
	And ( CONVERT(char(8), rec_tfechahora,112) >= @cDesde And CONVERT(char(8), rec_tfechahora,112) <= @cHasta )