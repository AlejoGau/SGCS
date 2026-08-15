--#############################################################################
-- SOFTGUARD DESKTOP
-- Created : 2019-05-06 2:00:00 PM
-- Description : Stored Procedure que se encarga de validar el Cupon de Descuento de la Landing Page
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[landingfreecouponvalidate]
	@cupon NVARCHAR(128) = ''
AS 
SET NOCOUNT ON
	
	IF (@cupon != '')
		BEGIN
			SELECT par_cvalor, par_ivalor
			from _tablas..t_parametros 
			where par_ccodigo = 'LANDINGFREECOUPON' AND par_cvalor = @cupon
		END
	ELSE
		-- Consulta inicial para chequeo de habilitación del Cupón
		BEGIN
			SELECT par_cvalor, par_ivalor
			from _tablas..t_parametros 
			where par_ccodigo = 'LANDINGFREECOUPON'
		END