-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SgGeocodeSearch]
	@GPSLatitude real = 0.0,
	@GPSLongitude real = 0.0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.

	SET NOCOUNT ON;
	DECLARE @Address VARCHAR(300) -- Variable para recibir la dirección
    DECLARE @Status BIT

	IF @GPSLatitude = 0.0 OR @GPSLongitude = 0.0
	BEGIN
		SET @Address = 'Error'
		SET @Status = 0
	END
	ELSE
	BEGIN
		-- Ejecutar el geocodificador solo si los valores no son 0.0
		EXEC _Desktop.dbo.spGeocodeHandler @GPSLatitude, @GPSLongitude, @Address OUTPUT
		Set @Status = 1
		-- Insertar lógica adicional si es necesario para manejar otros casos
		-- Si se produce un error en el geocodificador, ajusta @Address y @Status en función del error.
	END
		
	SELECT @Address as ResultAddress, @Status as Status
END