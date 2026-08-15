/*
exec [SearchRetornoComprobantesCreditoDebitoCliente]
1, 0, 50, '', '', '[{"property":"iCliente","value":"1"},{"property":"nTipoDesde","value":1},{"property":"nTipoHasta","value":6}]'
*/


CREATE OR ALTER PROCEDURE [dbo].[SearchRetornoComprobantesCreditoDebitoCliente]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS  
 SET NOCOUNT ON   
 
 --Sort
 --DECLARE @SqlSort AS VARCHAR(256)
 --SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'cli_icodigo_ID ASC')
 
 --Filters
 --DECLARE @SqlFilter AS VARCHAR(4096)
 --SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')
 
 declare @iCliente Int,  @nTipoDesde Numeric, @nTipoHasta Numeric
 
 IF @filter != ''          
 BEGIN        
    DECLARE @FilterTable TABLE(element_id INT NOT NULL, parent_ID INT, Object_ID INT, NAME VARCHAR(2000), StringValue VARCHAR(MAX) NOT NULL, ValueType VARCHAR(10) NOT null)
	INSERT INTO @FilterTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType) SELECT * FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')		
 
	DECLARE @FilterProperty VARCHAR(32)
	DECLARE @FilterValue VARCHAR(64)

	DECLARE @FilterIndex INT
	SET @FilterIndex = 1
	WHILE((SELECT COUNT(*) FROM @FilterTable WHERE parent_ID = @FilterIndex) != 0)
	BEGIN		
		--Read
		SELECT @FilterProperty = REPLACE(StringValue, '''', '''''') FROM @FilterTable WHERE parent_ID = @FilterIndex AND NAME = 'property'
		SELECT @FilterValue = RTRIM(LTRIM(REPLACE(StringValue, '''', ''''''))) FROM @FilterTable WHERE parent_ID = @FilterIndex AND NAME = 'value'																
					
		--Set Filters
		IF @FilterValue != ''
		BEGIN
			IF @FilterProperty = 'iCliente'
				SET @iCliente = convert (int, @FilterValue)
			ELSE IF @FilterProperty = 'nTipoDesde'
				SET @nTipoDesde = convert(numeric, @FilterValue)
			ELSE IF @FilterProperty = 'nTipoHasta'
				SET @nTipoHasta = convert(numeric, @FilterValue)
		END
		
		--Next
		SET @FilterIndex = @FilterIndex + 1			
	END		
 END
 print ('@iCliente ' + convert(varchar,@iCliente))
 print ('@nTipoDesde ' + convert(varchar,@nTipoDesde))
 print ('@nTipoHasta ' + convert(varchar,@nTipoHasta))
 --Sql
 exec _datos..[RetornoComprobantesCreditoDebitoCliente] @iCliente, @nTipoDesde, @nTipoHasta