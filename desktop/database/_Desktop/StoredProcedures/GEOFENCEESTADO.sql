-- =============================================
-- Author:		dedalo
-- Create date: 2/1/2019
-- Description:	Guarda la fecha de la alarma de una geocerca para filtrar posiciones anteriores.
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[GEOFENCEESTADO]
	-- Add the parameters for the stored procedure here
	@idCta int,
	@GeofenceId int,
	@Estado int = null,
	@rawFechaHora datetime
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	update _Datos..GeoFenseCuenta 
		set 
		fechaultposicion = @rawFechaHora 
		,Estado = @Estado
		where GeoFenseId = @GeofenceId
		and CuentaId = @idCta
END