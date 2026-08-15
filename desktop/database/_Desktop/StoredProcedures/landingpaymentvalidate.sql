--#############################################################################
-- SOFTGUARD DESKTOP
-- Created : 2019-05-06 2:00:00 PM
-- Description : Stored Procedure que se encarga de validar si se desea o no habilitar el boton de MercadoPago en la LandingPage
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[landingpaymentvalidate]
	
AS 
SET NOCOUNT ON
	
	-- Busco el parametro LANDINGPAYMENT
	declare @LANDINGPAYMENT varchar(8);
	SELECT  par_cvalor, par_ivalor from _tablas..t_parametros where par_ccodigo = 'LANDINGPAYMENT';