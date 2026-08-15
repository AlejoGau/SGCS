CREATE OR ALTER PROCEDURE [dbo].[FIX_limpiezaHorarios_ProblemaIntegridadDatos]
	@accion  VARCHAR(50) = 'count'
AS
BEGIN
	/**
	* Sirve para limpiar problemas de integridad en las plantillas
	* verifica cada tabla hija si tiene un padre (m_planillas)
	*/


	IF @accion != 'limpiar'
		BEGIN
			
			SELECT (SELECT COUNT(1) FROM _Datos..m_horarios_tolerancia_planilla tp
							LEFT JOIN _Datos..m_planillas p ON p.pla_iid = tp.tol_iid
							WHERE pla_iid IS NULL) as m_horarios_tolerancia_planilla ,

							(SELECT COUNT(1) FROM _Datos..m_horarios_planilla hp
							LEFT JOIN _Datos..m_planillas p ON p.pla_iid = hp.hor_iid
							WHERE pla_iid IS NULL) as m_horarios_planilla ,

							(SELECT COUNT(1) FROM _Datos..m_horarios_excepcion_planilla ep
							LEFT JOIN _Datos..m_planillas p ON p.pla_iid = ep.exc_iid
							WHERE pla_iid IS NULL) as m_horarios_excepcion_planilla ,

							(SELECT COUNT(1) FROM _Datos..m_horarios_alternativos_planilla ap
							LEFT JOIN _Datos..m_planillas p ON p.pla_iid = ap.alt_iid
							WHERE pla_iid IS NULL) as m_horarios_alternativos_planilla
		
		END
	ELSE
		BEGIN

			--limpio tolerancia
			DELETE  tp FROM _Datos..m_horarios_tolerancia_planilla tp
				LEFT JOIN _Datos..m_planillas p ON p.pla_iid = tp.tol_iid
				WHERE pla_iid IS NULL

			--limpio horarios
			DELETE  hp FROM _Datos..m_horarios_planilla hp
				LEFT JOIN _Datos..m_planillas p ON p.pla_iid = hp.hor_iid
				WHERE pla_iid IS NULL

			--limpio excepcion
			DELETE ep FROM _Datos..m_horarios_excepcion_planilla ep
				LEFT JOIN _Datos..m_planillas p ON p.pla_iid = ep.exc_iid
				WHERE pla_iid IS NULL


			--limpio alternativo
			DELETE ap FROM _Datos..m_horarios_alternativos_planilla ap
				LEFT JOIN _Datos..m_planillas p ON p.pla_iid = ap.alt_iid
				WHERE pla_iid IS NULL

		END


END