CREATE OR ALTER PROCEDURE [dbo].[SP_GET_EVENTOS_PENDIENTES_BCO_RIO]
AS
SELECT 
	evp_idKey, 
	rec_tFechaHora, 
	rec_iidCuenta, 
	cue_cLinea, 
	cue_nCuenta,
	cue_cNombre, 
	cue_cLocalidad, 
	cod_cDescripcion, 
	cue_nParticion
FROM _Datos..EventosPendientes
ORDER BY rec_iid desc