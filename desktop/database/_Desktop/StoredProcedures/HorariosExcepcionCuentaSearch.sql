CREATE OR ALTER PROCEDURE [dbo].[HorariosExcepcionCuentaSearch]
      @page INT = 1,
      @start INT = 0,
      @limit INT = 1000,
      @sort VARCHAR(256) = '',
      @group VARCHAR(256) = '',
      @filter VARCHAR(2048) = '',
      @_dc VARCHAR(256) = '',
      @token VARCHAR(128) = '',
      @idCuenta VARCHAR(20) = '',
      @codigoEvento VARCHAR(50) = '',
      @totalrows INT = 0 OUTPUT
  AS
  BEGIN
      SET NOCOUNT ON;

      SELECT
          [exc_iidcuenta],
          [exc_cevento],
          [exc_cHoraApertura],
          [exc_cHoraCierre],
          [exc_idKey]
      FROM [_Datos].[dbo].[m_horarios_excepcion]
      WHERE [exc_iidcuenta] = @idCuenta
        AND [exc_cevento] = @codigoEvento

      SET @totalrows = @@ROWCOUNT
  END