CREATE OR ALTER PROCEDURE [dbo].[ConsultaSaldoSearch]
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @sort NVARCHAR(256) = '',   
	 @group NVARCHAR(256) = '',            
	 @filter NVARCHAR(2048) = '',
	 @_dc NVARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT, 
	 @token VARCHAR(128) = ''

AS
	SET NOCOUNT ON
	/*
	 * APLICANDO FILTROS y RANGOS
	 */
	--Filters
	DECLARE @SqlFilter AS VARCHAR(4096)
	SET @SqlFilter = [_Desktop].dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[m_cuentas]')

	--RANGOS 
	DECLARE @SqlFilterRango AS VARCHAR(max) = ''
	EXEC [_Desktop]..getSqlRangesForToken @table = '[_Datos].[dbo].[m_cuentas]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

	print '---';
	print @SqlFilterRango
	print '---';

	SET @SqlFilter = @SqlFilter + @SqlFilterRango
	print @SqlFilter
 
	--print  @SqlSort

	-- BC https://basecamp.com/2249105/projects/16594557/todos/414428513 define filtrar 1 mes para atras. ( cambiar para pruebas el -1 por si no trae datos )
    DECLARE @fec_desde VARCHAR(MAX) = convert(varchar,DATEADD(m, -4, GETDATE()), 121), @fec_hasta VARCHAR(MAX) = convert(varchar,GETDATE(), 121)

	--Sql
	DECLARE @Sql NVARCHAR(MAX) = '';
	select @Sql = ' 
			DECLARE @table AS TABLE (ID int,
				FechaComprobante date,
				TipoComprobante varchar(20),
				NroComprobante varchar(25),
				Importe decimal(10,2),
				Saldo decimal(10,2)
			)

			INSERT INTO @table
			SELECT 1 as id,  MAX('''+@fec_desde+''') as ''FechaComprobante'', ''Saldo Inicial '' as ''TipoComprobante'', MAX(''0000'') as ''NroComprobante'',
			SUM(ROUND(cast(Saldo as decimal(10,2)),2)) Importe, SUM(SUM(ROUND(cast(Saldo as decimal(10,2)),2))) OVER (ORDER BY cod_cliente ASC) as SaldoAcumulado
			FROM  ST_TANGO..STS_RESUMEN_CTA 
				INNER JOIN ST_TANGO..ST_SmartPanic_tango on STS_RESUMEN_CTA.Cod_cliente COLLATE Latin1_general_CI_AI  = cli_tango COLLATE Latin1_general_CI_AI
				INNER JOIN [_datos].[dbo].[m_cuentas] c ON ( c.cue_ncuenta collate database_default = Nro_lote collate database_default )
				INNER JOIN [_Datos].[dbo].[SmartPanic] sp ON ( c.cue_iid = sp.CuentaId )
			where Fecha < '''+@fec_desde+'''' + @SqlFilter+' 
			group by  cod_cliente   

			INSERT INTO @table
			SELECT 2 as id, CAST(FechaComprobante AS date) as ''FechaComprobante'', TipoComprobante as ''TipoComprobante'', NroComprobante as ''NroComprobante'', 
			SUM(ROUND(cast(Saldo as decimal(10,2)),2)) Importe, SUM(SUM(ROUND(cast(Saldo as decimal(10,2)),2))) OVER (ORDER BY FechaComprobante, NroComprobante ASC) as SaldoAcumulado
			FROM ST_TANGO..STS_RESUMEN_CTA 
				INNER JOIN ST_TANGO..ST_SmartPanic_tango on STS_RESUMEN_CTA.Cod_cliente COLLATE Latin1_general_CI_AI  = cli_tango COLLATE Latin1_general_CI_AI 
				INNER JOIN [_datos].[dbo].[m_cuentas] c ON ( c.cue_ncuenta collate database_default = Nro_lote collate database_default )
				INNER JOIN [_Datos].[dbo].[SmartPanic] sp ON ( c.cue_iid = sp.CuentaId )
			where Fecha BETWEEN '''+@fec_desde+''' and '''+@fec_hasta+'''' +@SqlFilter+'
			group by cod_cliente, FechaComprobante, TipoComprobante, NroComprobante

			select FechaComprobante, TipoComprobante, NroComprobante, SUM(Importe) Importe,  
			SUM(SUM(ROUND(Importe,2))) OVER (ORDER BY id, FechaComprobante, TipoComprobante, NroComprobante ASC) as SaldoAcumulado
			from @table
			group by  id, FechaComprobante, TipoComprobante, NroComprobante			
			
			
			
			/*
			SELECT src.TipoComprobante, src.NroComprobante, src.FechaComprobante, src.Importe, src.Saldo 
            FROM [_datos].[dbo].[m_cuentas] c
                INNER JOIN [_Datos].[dbo].[SmartPanic] sp ON ( c.cue_iid = sp.CuentaId )
                INNER JOIN [ST_TANGO].[dbo].[ST_SmartPanic_tango] stst ON ( c.cue_ncuenta collate database_default = stst.Nro_lote collate database_default )
                INNER JOIN [ST_TANGO].[dbo].[STS_RESUMEN_CTA] src ON (  stst.cli_tango collate database_default = src.Cod_cliente collate database_default)
            WHERE 1 = 1 ' + @SqlFilter + '
			ORDER BY FechaComprobante DESC
			*/
		'
	print @sql
	exec (@sql)