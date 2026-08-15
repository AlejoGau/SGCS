CREATE OR ALTER PROCEDURE [dbo].[SystemDataSearch]
AS
BEGIN
	SELECT * FROM _Sistema..s_systemdata WHERE sdt_code = 'LICENSE'
END