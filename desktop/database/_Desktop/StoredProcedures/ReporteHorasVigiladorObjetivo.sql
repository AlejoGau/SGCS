--EXEC ReporteHorasVigiladorObjetivo
CREATE OR ALTER PROCEDURE [dbo].[ReporteHorasVigiladorObjetivo]
	@page INT = 1,
	@start INT = 0,
	@limit INT = 1000,
	@sort VARCHAR(256) = '',
	@filter VARCHAR(2048) = '',
	@_dc VARCHAR(256) = '',
	@token VARCHAR(128) = '',
	@cuentaEspecifica int = null,
	@cuentaDesde int = null,
	@cuentaHasta int = 0,
	             
	@totalrows INT = 1 OUTPUT
AS
BEGIN
  SELECT TOP (1000) [hor_iidcuenta]
      ,[hor_ndiaapertura]
      ,[hor_choraapertura]
      ,[hor_ndiacierre]
      ,[hor_choracierre]
      ,[hor_idKey]
  FROM [_Datos].[dbo].[m_horarios]
  where hor_iidcuenta = @cuentaEspecifica
END;