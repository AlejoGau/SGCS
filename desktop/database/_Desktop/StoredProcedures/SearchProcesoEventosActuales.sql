CREATE OR ALTER PROCEDURE [dbo].[SearchProcesoEventosActuales]
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
DECLARE @SqlFilter AS VARCHAR(4096) = ''
SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '[_Datos].[dbo].eventospendientes')
print @SqlFilter


--RANGOS 
DECLARE @SqlFilterRango AS VARCHAR(max) = ''
EXEC getSqlRangesForToken @table = '[_Datos].[dbo].eventospendientes', @token = @token, @alias = 'c.', @SqlFilterRango = @SqlFilterRango OUTPUT

print '---';
print @SqlFilterRango
print '---';

SET @SqlFilter = @SqlFilter + @SqlFilterRango
print @SqlFilter
 
--print  @SqlSort


--Sql
DECLARE @Sql NVARCHAR(MAX) = '';
select @Sql = @Sql + 'Select count(rec_nestado) as cantidad,
	(Case When rec_nestado=0 Then ''Pendiente''
		When rec_nestado=1 Then ''En proceso''
		When rec_nestado=2 Then ''Espera''
			Else ''Habilitado'' End ) As situacion
	FROM [_Datos].[dbo].eventospendientes
		INNE JOIN [_Datos].[dbo].[m_cuentas] c on c.cue_iid = rec_iidcuenta
	WHERE 1 = 1' + isnull(@SqlFilter,'') + '
		And rec_nestado < 3  
		And CONVERT(char, rec_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
		group by rec_nestado'

print @sql
exec (@sql)