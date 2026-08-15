CREATE OR ALTER PROCEDURE [dbo].[SP_BuscoReceptor] @iPuerto Int AS
SET NOCOUNT ON
DECLARE @axSelect INT

SET @axSelect=0
SET @axSelect = (Select pue_iReceptor From _tablas.dbo.t_puertos
	Where  pue_nPuerto= @iPuerto)

SELECT @axSelect as iid