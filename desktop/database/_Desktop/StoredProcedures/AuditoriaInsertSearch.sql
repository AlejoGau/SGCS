--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:38.280 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[AuditoriaInsertSearch]
@aud_iidOperador INT = 1,   
@aud_cLogin NVARCHAR(256) = '',   
@aud_cProceso NVARCHAR(256) = '',
@aud_cAccion CHAR(1) = '',
@aud_cTerminal CHAR(3) = '',
@aud_cObservacion NVARCHAR(MAX) = ''
AS
BEGIN

 INSERT INTO _Sistema..s_auditoria (
	aud_iidOperador,
	aud_cLogin,
	aud_cProceso,
	aud_cAccion,
	aud_cTerminal,
	aud_cObservacion,
	aud_tFechaHora
)
VALUES
	(
		@aud_iidOperador 
		,@aud_cLogin 
		,@aud_cProceso 
		,@aud_cAccion 
		,@aud_cTerminal 
		,@aud_cObservacion
		,GETDATE()
	)
END