CREATE OR ALTER PROCEDURE [dbo].[FIX_IntegridadEventosPendientes]
AS
BEGIN

-- actualizo diferencias de estado y asignación entre eventos pendientes y p_recepcion
	UPDATE epu
		SET epu.rec_ioperador = pu.rec_ioperador ,
			epu.rec_nestado = pu.rec_nestado,
			epu.ope_cLogin = ope.ope_clogin,
			epu.ope_cNombre = ope.ope_cnombre
	FROM _Datos..EventosPendientes epu
	JOIN _Datos..p_recepcion pu ON epu.rec_iid = pu.rec_iid
	join _Sistema..s_operadores ope on ope_iid = pu.rec_ioperador
		WHERE epu.rec_nEstado != pu.rec_nestado OR epu.rec_ioperador != pu.rec_ioperador

	-- limpio operador de eventos con estado pendiente

	update _Datos..p_recepcion 
	set rec_ioperador = 0 where rec_nestado = 0 and rec_ioperador > 0


END