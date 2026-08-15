-- =============================================
-- Author:		Rodrigo Román
-- Create date: 11/04/2019
-- Description:	Actualizo saldos con ultimo movimiento
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[mg_mestrocuentaqsActualizasaldo] 

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    

UPDATE _Datos..MG_MaestroCuentas 
SET mgmc_saldo =
(SELECT TOP 1 mgm_saldo FROM _Datos..MG_MovimientosCuentas 
WHERE mgmc_idkey = mgm_idcuenta
ORDER BY mgm_fecha DESC )
END