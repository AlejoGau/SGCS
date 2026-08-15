CREATE OR ALTER PROCEDURE [dbo].[BundleById]
	@idBundle VARCHAR(25) = '',
	@_dc VARCHAR(256) = ''

AS
BEGIN


SELECT * FROM Bundle WHERE 1 = 1 AND Id = @idBundle
 

END