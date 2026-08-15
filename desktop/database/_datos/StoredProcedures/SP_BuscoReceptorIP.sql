CREATE OR ALTER PROCEDURE [dbo].[SP_BuscoReceptorIP]	@iPuerto [int],
	@iReceptor [int] = 0 OUTPUT
AS
SET NOCOUNT ON
--DECLARE @axSelect INT

SET @iReceptor = (Select ipc_iReceptor From _Tablas.dbo.t_ip_con
	Where  ipc_nport= @iPuerto)

SELECT @iReceptor As iid