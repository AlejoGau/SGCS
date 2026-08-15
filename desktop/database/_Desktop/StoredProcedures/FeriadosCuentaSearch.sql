CREATE OR ALTER PROCEDURE [dbo].[FeriadosCuentaSearch]
      @page INT = 1,
      @start INT = 0,
      @limit INT = 1000,
      @sort VARCHAR(256) = '',
      @group VARCHAR(256) = '',
      @filter VARCHAR(2048) = '',
      @_dc VARCHAR(256) = '',
      @token VARCHAR(128) = '',
      @idCuenta VARCHAR(20) = '',
      @fechaDesde VARCHAR(20) = '',
      @fechaHasta VARCHAR(20) = '',
	  @totalrows INT = 1 OUTPUT
  AS
  BEGIN
      DECLARE @SqlWhere NVARCHAR(MAX);
      SET @SqlWhere = '';

      IF (@idCuenta != '')
      BEGIN
          SET @SqlWhere = @SqlWhere + ' AND e.exc_iidcuenta = ' + @idCuenta;
      END

      IF (@fechaDesde != '')
      BEGIN
          SET @SqlWhere = @SqlWhere + ' AND f.eve_dfechadesde >= ''' + @fechaDesde + '''';
      END

      IF (@fechaHasta != '')
      BEGIN
          SET @SqlWhere = @SqlWhere + ' AND f.eve_dfechadesde <= ''' + @fechaHasta + '''';
      END

      DECLARE @sql AS VARCHAR(MAX)
      SET @sql = '
          SELECT
			 [eve_ccodigo]
			,[eve_cdescripcion]
			,[eve_dfechadesdes]
			,[eve_choradesde]
			,[eve_dfechahasta]
			,[eve_chorahasta]
			,[eve_idKey]
          FROM [_Datos].[dbo].[m_horarios_excepcion] e
          INNER JOIN [_Tablas].[dbo].[t_eventos_feriados] f ON f.eve_ccodigo = e.exc_cevento
          WHERE 1=1
          ' + @SqlWhere + '
          ORDER BY f.eve_dfechadesde ASC'

      EXECUTE (@sql)
  END