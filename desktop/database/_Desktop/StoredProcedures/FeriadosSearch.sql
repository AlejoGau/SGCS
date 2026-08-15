CREATE OR ALTER PROCEDURE [dbo].[FeriadosSearch]
      @page INT = 1,                                                                                                             
      @start INT = 0,                                                                                                            
      @limit INT = 1000,
      @sort VARCHAR(256) = '',
      @group VARCHAR(256) = '',
      @filter VARCHAR(2048) = '',
      @_dc VARCHAR(256) = '',
      @token VARCHAR(128) = '',
      @fechaDesde VARCHAR(20) = '',
      @fechaHasta VARCHAR(20) = '',
      @totalrows INT = 0 OUTPUT
  AS
  BEGIN
      SET NOCOUNT ON;

      SELECT
          [eve_ccodigo],
          [eve_cdescripcion],
          [eve_dfechadesdes],
          [eve_choradesde],
          [eve_dfechahasta],
          [eve_chorahasta],
          [eve_idKey]
      FROM [_Tablas].[dbo].[t_eventos_feriados]
      WHERE (@fechaDesde = '' OR [eve_dfechadesdes] >= @fechaDesde)
        AND (@fechaHasta = '' OR [eve_dfechadesdes] <= @fechaHasta)
      ORDER BY [eve_dfechadesdes]

      SET @totalrows = @@ROWCOUNT
  END