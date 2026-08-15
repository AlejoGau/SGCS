-- =============================================
-- Author:		Rodrigo Roman
-- Create date: 16/10/2019
-- Description:	llena los valores de geography en las geocercas faltantes
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[geofengeFillGeography]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @id int
	DECLARE @name VARCHAR(50) -- database name 
	DECLARE @metadata VARCHAR(max) -- path for backup files 

	DECLARE db_cursor CURSOR FOR 
	SELECT id, name,metadata from [_Datos].[dbo].[GeoFense]
	where GeoData is null

	OPEN db_cursor  
	FETCH NEXT FROM db_cursor INTO @id,@name,@metadata  

	WHILE @@FETCH_STATUS = 0  
	BEGIN  
		  begin try
			declare @GeoData geography

			EXECUTE [_Desktop].[dbo].[GeoFenceGeographyFromMetadata] 
			   @metadata
			  ,@GeoData OUTPUT

			if @GeoData is not null
			BEGIN
				print 'Actualizo geocerca '+@name
				update [_Datos].[dbo].[GeoFense] set GeoData = @GeoData where id = @id
			END
		  end try
		  begin catch
			print 'error en geocerca: ' + @name
			print @metadata
			print ERROR_MESSAGE()
		  end catch

		  FETCH NEXT FROM db_cursor INTO  @id,@name,@metadata  
 
	END 

	CLOSE db_cursor  
	DEALLOCATE db_cursor 
END