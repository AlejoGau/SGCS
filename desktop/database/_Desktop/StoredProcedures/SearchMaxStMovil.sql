CREATE OR ALTER PROCEDURE [dbo].[SearchMaxStMovil]
AS
BEGIN
  SELECT TOP 1 * FROM [_tablas]..[t_movilespatrulla] 
	WHERE tmp_cnumero LIKE '%ST%'
	ORDER BY tmp_cnumero DESC
END