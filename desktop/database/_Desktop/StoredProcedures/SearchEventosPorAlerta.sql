CREATE OR ALTER PROCEDURE [dbo].[SearchEventosPorAlerta]
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @sort NVARCHAR(256) = '',   
	 @group NVARCHAR(256) = '',            
	 @filter NVARCHAR(2048) = '',        
	 @_dc NVARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT, 
	 @token VARCHAR(128) = '',
	 @fechadesde NVARCHAR(50) = '',
	 @fechahasta NVARCHAR(50) = '',
	 --@extramonth NVARCHAR(5) = 'true',
     @table NVARCHAR(128) = ''

AS
SET NOCOUNT ON
/*
 * APLICANDO FILTROS y RANGOS
 */
--Filters
DECLARE @SqlFilter AS VARCHAR(4096)
SET @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].[p_recepcion]')

--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Datos].[dbo].[m_cuentas]', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

print '---';
print @SqlFilterRango
print '---';

SET @SqlFilter = isnull(@SqlFilter,'') + isnull(@SqlFilterRango,'')
print @SqlFilter
 
/* APLICANDO LOS VALORES HORA */
DECLARE @SqlWhere NVARCHAR(MAX);
SET @SqlWhere = '';

IF @fechadesde != '' 
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND pr.rec_tfechahora >= '''+convert(varchar,convert(date,@fechadesde,120),112)+'''';
	END
IF @fechahasta != '' 
	BEGIN
		SET @SqlWhere = @SqlWhere + ' AND pr.rec_tfechahora <= '''+convert(varchar,convert(date,@fechahasta,120),112)+'''';
	END
 
IF @token != ''
	BEGIN
		EXEC getSqlRangesForToken @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT
		SET @SqlWhere = @SqlWhere + @SqlFilterRango
	END

IF (@table = '' )
    BEGIN
        set @table = '[_Datos]..p_recepcion pr, [_Datos]..eventospendientes ev'
    END
ELSE
    BEGIN
        set @table = '_Datos..'+@table+' pr With (NOLOCK)'
    END 

/*	
-- Estoy agregando la validacion del comboBox de Historico para que se consulte la tabla por mes de p_recepcion.
if(@table = 'p_recepcion')
	BEGIN
		--set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112) +',p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
		set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112)
	END


-- Pregunta precaria si el combo de Historico esta en blanco (esto aplica al iniciar el reporte)
if(@table = '')
	BEGIN
		--set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , -1 , getdate() )  , 112) +',p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
		set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), DATEADD (MONTH , 0 , getdate() )  , 112)
	END

if(@extramonth = 'false')
	BEGIN
		-- set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112) + ',eventospendientes'
		set @table = 'p_recepcion'+ CONVERT(NVARCHAR(6), getdate(), 112)
	END
-- FIN
*/

DECLARE @ng AS VARCHAR(30) = 'No genera Alerta'
DECLARE @ngt AS VARCHAR(30)
EXECUTE [dbo].[LocalizationGetLocale] @Name = @ng, @soloOutput = 1, @translation = @ngt OUTPUT;
DECLARE @g AS VARCHAR(30) = 'Genera Alerta'
DECLARE @gat AS VARCHAR(30)
EXECUTE [dbo].[LocalizationGetLocale] @Name = @g, @soloOutput = 1, @translation = @gat OUTPUT;
DECLARE @o AS VARCHAR(30) = 'otro'
DECLARE @ot AS VARCHAR(30)
EXECUTE [dbo].[LocalizationGetLocale] @Name = @o, @soloOutput = 1, @translation = @ot OUTPUT;

--Sql
DECLARE @Sql NVARCHAR(MAX) = '';
select @Sql = '
	SELECT count(ca.cod_nalerta) as cant, 
			(CASE
				WHEN ca.cod_nalerta = 0 THEN '''+@ngt+'''
				WHEN ca.cod_nalerta = 1 THEN '''+@gat+'''
			ELSE '''+@ot+''' END) as alerta

	FROM '+@table+' 
		INNER JOIN [_Tablas].[dbo].t_codigos_alarma ca on ca.cod_ccodigo = rec_calarma
        INNER JOIN _datos..m_cuentas c on c.cue_iid = rec_iidcuenta

	WHERE 1 = 1 
	
	' + isnull(@SqlFilter,'') + @SqlWhere + '

	GROUP BY
		(CASE
			WHEN ca.cod_nalerta = 0 THEN '''+@ngt+'''
			WHEN ca.cod_nalerta = 1 THEN '''+@gat+'''
		ELSE '''+@ot+''' END)
	'	

print @sql
exec (@sql)