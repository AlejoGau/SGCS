-- =============================================
-- Author:		Román Rodrigo	
-- Create date: 02/12/2019
-- Description:	CAlcula geodata de la geocerca al momento de insertar
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[trg_geofense_geodata]
   ON  [dbo].[GeoFense] 
   AFTER INSERT,UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @id int
	DECLARE @name VARCHAR(50) 
	DECLARE @metadata VARCHAR(max) 
	declare @GeoData geography
	
	SELECT @id = id, @name = name, @metadata = metadata from inserted

    EXECUTE [_Desktop].[dbo].[GeoFenceGeographyFromMetadata] 
		@metadata
		,@GeoData OUTPUT

	if @GeoData is not null
	BEGIN
		print 'Actualizo geocerca '+@name
		update [_Datos].[dbo].[GeoFense] set GeoData = @GeoData where id = @id
	END

END