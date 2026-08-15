CREATE OR ALTER PROCEDURE [dbo].[ReporteHorasProyectadasCuentasSearch]
      @page INT = 1,                                                                                                             
      @start INT = 0,                                                                                                            
      @limit INT = 1000,
      @sort VARCHAR(256) = '',
      @group VARCHAR(256) = '',
      @filter VARCHAR(2048) = '',
      @_dc VARCHAR(256) = '',
      @token VARCHAR(128) = '',
      @dealer VARCHAR(20) = '',
      @cuentaEspecifica VARCHAR(20) = '',
      @cuentaDesde VARCHAR(10) = '',
      @cuentaHasta VARCHAR(10) = '',
      @totalrows INT = 0 OUTPUT
  AS
  BEGIN
      SET NOCOUNT ON;

      SELECT
          [cue_iid],
          [cue_clinea],
          [cue_ncuenta],
          [cue_cnombre],
          [cue_ccalle],
          [cue_clocalidad],
          [cue_cprovincia],
          [cue_ccodigopostal]
      FROM [_Datos].[dbo].[m_cuentas]
      WHERE [cue_clinea] = @dealer
		AND [cue_ctipo] IN (SELECT tip_ccodigo FROM _Tablas..t_tipos
  WHERE tip_nTipo=5)
        AND (@cuentaEspecifica = '' OR [cue_iid] = @cuentaEspecifica)
        AND (@cuentaDesde = '' OR [cue_ncuenta] >= @cuentaDesde)
        AND (@cuentaHasta = '' OR [cue_ncuenta] <= @cuentaHasta)
      ORDER BY [cue_ncuenta]

      SET @totalrows = @@ROWCOUNT
  END