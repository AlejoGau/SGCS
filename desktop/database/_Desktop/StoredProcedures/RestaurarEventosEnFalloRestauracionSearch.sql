CREATE OR ALTER PROCEDURE [dbo].[RestaurarEventosEnFalloRestauracionSearch]
 @idKey INT,
 @idCtaEvento INT = 0,
 @cAlarmaEvento VARCHAR(3) = '',
 @cObservacionesEvento VARCHAR(max) = ''
AS
BEGIN
  DELETE FROM _datos.dbo.EventosEnFalloRestauracion WHERE efr_idKey = @idKey

	-- GENERO Evento
	IF @idCtaEvento != 0 
		BEGIN
	   EXEC _Desktop..AlarmaGenerar @idCta = @idCtaEvento, @cAlarma = @cAlarmaEvento, @cObservaciones = @cObservacionesEvento;  
		END
END