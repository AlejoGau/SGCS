CREATE OR ALTER PROCEDURE [dbo].[HorariosCuentaSearch]
      @page INT = 1,
      @start INT = 0,
      @limit INT = 1000,
      @sort VARCHAR(256) = '',
      @group VARCHAR(256) = '',
      @filter VARCHAR(2048) = '',
      @_dc VARCHAR(256) = '',
      @token VARCHAR(128) = '',
      @idCuenta VARCHAR(20) = '',
	  @totalrows INT = 1 OUTPUT
  AS
  BEGIN
      DECLARE @SqlWhere NVARCHAR(MAX);
      SET @SqlWhere = '';

      IF (@idCuenta != '')
      BEGIN
          SET @SqlWhere = ' WHERE hor_iidcuenta = ' + @idCuenta;
      END

      DECLARE @sql AS VARCHAR(MAX)
      SET @sql = '
          SELECT
              hor_iidcuenta,
              hor_ndiaapertura,
              hor_choraapertura,
              hor_ndiacierre,
              hor_choracierre,
              hor_idKey
          FROM [_Datos].[dbo].[m_horarios]
          ' + @SqlWhere + '
          ORDER BY hor_ndiaapertura ASC, hor_choraapertura ASC'

      EXECUTE (@sql)
  END