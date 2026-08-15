CREATE OR ALTER PROCEDURE [dbo].[SearchActividadSmartpanics]
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @Mostrar INT = 0, 
	 @sort NVARCHAR(256) = '',   
	 @group NVARCHAR(256) = '',            
	 @filter NVARCHAR(2048) = '',        
	 @_dc NVARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT, 
	 @token VARCHAR(128) = '',
	 @ultimos5chk INT = 1,
	 @nombreCuenta VARCHAR(128) = '',
	 @usuario VARCHAR(128) = '',
	 @imei VARCHAR(128) = '',
	 @dealer VARCHAR(3) = '',
	 @cuentadesde VARCHAR(4) = '',
	 @cuentahasta VARCHAR(4) = ''
AS
SET NOCOUNT ON

--FILTERS
DECLARE @SqlFilter AS VARCHAR(4096)
SET @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[SmartPanic]')

--RANGES 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Datos].[dbo].[m_cuentas]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

SET @SqlFilter = isnull(@SqlFilter,'') + isnull(@SqlFilterRango,'')

/*
print '-- Rangos';
print @SqlFilterRango
print '-- Filtros Finales';
print @SqlFilter
*/
--TRANSLATION
DECLARE @i AS VARCHAR(30) = 'inclusion'
DECLARE @it AS VARCHAR(30)
EXECUTE [dbo].[LocalizationGetLocale] @Name = @i, @soloOutput = 1, @translation = @it OUTPUT;
DECLARE @ie AS VARCHAR(30) = 'inclusion y exclusion'
DECLARE @iet AS VARCHAR(30)
EXECUTE [dbo].[LocalizationGetLocale] @Name = @ie, @soloOutput = 1, @translation = @iet OUTPUT;
DECLARE @e AS VARCHAR(30) = 'exclusion'
DECLARE @et AS VARCHAR(30)
EXECUTE [dbo].[LocalizationGetLocale] @Name = @e, @soloOutput = 1, @translation = @et OUTPUT;

--MANUAL FILTERS
IF @nombreCuenta != ''
	BEGIN
		SET @SqlFilter = @SqlFilter + 'AND c.cue_cnombre LIKE ''%'+@nombreCuenta+'%'''
	END
IF @usuario != ''
	BEGIN
		SET @SqlFilter = @SqlFilter + 'AND sp.Nombre LIKE ''%'+@usuario+'%'''
	END
IF @imei != ''
	BEGIN
		SET @SqlFilter = @SqlFilter + 'AND sp.Imei LIKE ''%'+@imei+'%'''
	END
IF @dealer != ''
	BEGIN
		SET @SqlFilter = @SqlFilter + 'AND c.cue_clinea = '''+@dealer+''''
	END
IF @cuentadesde != ''
	BEGIN
		SET @SqlFilter = @SqlFilter + 'AND c.cue_ncuenta >= '''+@cuentadesde+''''
	END
IF @cuentahasta != ''
	BEGIN
		SET @SqlFilter = @SqlFilter + 'AND c.cue_ncuenta <= '''+@cuentahasta+''''
	END

--Mostrar    
 DECLARE @Top VARCHAR(64)    
 SET @Top = ''    

 -- pongo un top maximo
 if @Mostrar = 0
	set @Mostrar = 50

 SET @Top = CAST(@Mostrar AS VARCHAR)    
     
 --Order            
DECLARE @SqlSort AS VARCHAR(256)   

 IF @sort != ''              
	 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'c.cue_iid ASC')     
 else
	set @SqlSort = 'c.cue_iid ASC'


-- FIELDs
DECLARE @fields NVARCHAR(MAX) = '';
SET @fields = 'SELECT TOP ' + @Top+' 
	c.cue_iid,
	c.cue_clinea, 
	c.cue_ncuenta, 
	c.cue_cnombre, 
	sp.Nombre,
	sp.Telefono, 
	sp.Modelo, 
	sp.Marca, 
	sp.Version, 
	sp.Tipo, 
	sp.Imei, 
	sp.awccUserId,
	gps.gps_tfechahora as ultimaPosicion, 
	pr.rec_tFechaRecepcion, 
	ta.cod_ccodigo, 
	ta.cod_cdescripcion,
	ta.cod_ncolor,
	ta.cod_ncolorletra,
	ROW_NUMBER() OVER (ORDER BY ' + @SqlSort + ') AS RowNumber
	'

--SQL
DECLARE @Sql NVARCHAR(MAX) = '';
SET @Sql = '
	FROM _DATOS..SmartPanic sp
		LEFT JOIN [_datos]..[m_cuentas] c ON (c.cue_iid = sp.CuentaId ) -- Cuentas
		OUTER APPLY (
			SELECT TOP '+CONVERT(VARCHAR(1),@ultimos5chk)+' *
			FROM [_datos]..[p_recepcion] r
				INNER JOIN _datos..p_RXtraInfo rxi on (rxi.rxt_iRecId = r.rec_iid)
				INNER JOIN [_datos]..[p_posicionesSP] p ON (p.sp_tfechahora = r.rec_tfechahora)
			WHERE rec_iidcuenta = sp.CuentaId 
				AND (rxt_nSPIP = 1 or rxt_nSPSMS = 1)
				AND p.sp_cIMEI = sp.Imei
			ORDER BY 1 DESC
		) pr --Dato del evento
		OUTER APPLY (
			SELECT TOP 1 *
			FROM [_datos]..[p_posicionesSP]
			WHERE sp_cIMEI = sp.Imei AND sp_reciid != 0
			ORDER BY 1 DESC
		) psp --Ultimo evento
		OUTER APPLY (
			SELECT TOP 1 *
			FROM [_datos]..[p_GpsSP]
			WHERE gps_cimei = sp.Imei
			ORDER BY 1 DESC
		) gps --Ultima posicion
		LEFT JOIN [_Tablas].[dbo].[t_codigos_alarma] ta ON (ta.cod_ccodigo = pr.rec_calarma) -- Descripcion para Codigo de Alarma
	'

-- SET @SQL FINAL
SET @Sql = @fields + @Sql + '
	WHERE 1=1 AND sp.Imei != '''' AND sp.Imei IS NOT NULL '+@SqlFilter+'
	ORDER BY c.cue_iid ASC
	'

-- paginacion
Set @sql = 'with CTE  as ( ' +@sql+')
		Select * From CTE
		WHERE RowNumber BETWEEN ('+cast(@page as varchar(5))+' - 1) * '+cast(@limit as varchar(5))+' + 1 AND ('+cast(@page as varchar(5))+' * '+cast(@limit as varchar(5))+')'    

--Print '---------'
--Print Cast(@sql As varchar(max))

--EXEC
Execute (@sql)