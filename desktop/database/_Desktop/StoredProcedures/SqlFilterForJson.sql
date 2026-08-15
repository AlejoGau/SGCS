CREATE OR ALTER PROCEDURE [dbo].[SqlFilterForJson]
	@Filter NVARCHAR(max), 
	@ObjectType VARCHAR(64),
	@SqlFilter NVARCHAR(MAX) OUTPUT,
	@sqlElseSpName nvarchar(128) = null
AS     
	 SET NOCOUNT ON
	 
     SET @SqlFilter = ''
     
	 IF @Filter != ''          
	 BEGIN        
	    DECLARE @FilterTable TABLE(element_id INT NOT NULL, parent_ID INT, Object_ID INT, NAME VARCHAR(2000), StringValue VARCHAR(MAX) NOT NULL, ValueType VARCHAR(10) NOT null)
		INSERT INTO @FilterTable (element_id, parent_ID, Object_ID, NAME, StringValue, ValueType) SELECT * FROM dbo.parseJSON(@Filter) WHERE NAME IN ('property', 'value')		
	 
		DECLARE @FilterProperty VARCHAR(128)
		DECLARE @FilterValue NVARCHAR(128)

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
				IF PATINDEX('%:Relation%', @FilterProperty) > 0
				BEGIN			
					DECLARE @RelationMethod VARCHAR(12)	
					SET @RelationMethod = ' IN '			 						
					IF PATINDEX('%:NOT', @FilterProperty) > 0
					   SET @RelationMethod = ' NOT IN '	
					   
					SET @FilterProperty = REPLACE(@FilterProperty, ':NOT', '')			
					
					DECLARE @ObjectTypeId VARCHAR(64)		
					DECLARE @ObjectId VARCHAR(11)
					DECLARE @RelationObjectTypeId VARCHAR(64)			 											 										
					DECLARE @RelationObjectId VARCHAR(11)				
					
					IF PATINDEX('%:RelationParent', @FilterProperty) > 0
					BEGIN
						SET @FilterProperty = REPLACE(@FilterProperty, ':RelationParent', '')		
						
						SELECT @ObjectTypeId = CAST(dbo.GetObjectId(@FilterProperty) AS VARCHAR), 
							   @ObjectId = @FilterValue, 
							   @RelationObjectTypeId = CAST(dbo.GetObjectId(@ObjectType) AS VARCHAR)					
						
						SET @SqlFilter = @SqlFilter + ' AND o.Id ' + @RelationMethod + ' (SELECT RelationObjectId FROM RelationObject WHERE ObjectTypeId = ' + @ObjectTypeId + ' AND ObjectId = ' + @ObjectId + ' AND RelationObjectTypeId = ' + @RelationObjectTypeId + ') '     
					END
					ELSE IF PATINDEX('%:RelationChild', @FilterProperty) > 0
					BEGIN
						SET @FilterProperty = REPLACE(@FilterProperty, ':RelationChild', '')		
						
						SELECT @ObjectTypeId = CAST(dbo.GetObjectId(@ObjectType) AS VARCHAR),											   
							   @RelationObjectTypeId = CAST(dbo.GetObjectId(@FilterProperty) AS VARCHAR),
							   @RelationObjectId = @FilterValue
						
						SET @SqlFilter = @SqlFilter + ' AND o.Id ' + @RelationMethod + ' (SELECT ObjectId FROM RelationObject WHERE ObjectTypeId = ' + @ObjectTypeId + ' AND RelationObjectTypeId = ' + @RelationObjectTypeId + ' AND RelationObjectId = ' + @RelationObjectId + ') '     					
					END								   				
				END											
				ELSE IF @FilterProperty = 'Taxonomy'
				BEGIN													
					DECLARE @TaxonomyObjectTypeId VARCHAR(64)
					SELECT @TaxonomyObjectTypeId = CAST(dbo.GetObjectId(@objectType) AS VARCHAR)
				    
					DECLARE @TaxonomyIndex INT
					DECLARE @TaxonomyId VARCHAR(100)
					
					DECLARE @TaxonomyMethod VARCHAR(6)
					SET @TaxonomyMethod = ' AND '	
					IF PATINDEX('%:OR', @FilterProperty) > 0
						SET @TaxonomyMethod = ' OR '	
					
					DECLARE @Taxonomies TABLE(Id INT, Value VARCHAR(64))
					INSERT INTO @Taxonomies (Id, Value) SELECT Id, Value FROM dbo.ParseArrayWithId(@FilterValue, ',')
					
					SET @TaxonomyIndex = 1
					WHILE((SELECT COUNT(*) FROM @Taxonomies WHERE Id = @TaxonomyIndex)>0)
					BEGIN
						SELECT @TaxonomyId = Value FROM @Taxonomies WHERE Id = @TaxonomyIndex
						SET @SqlFilter = @SqlFilter + @TaxonomyMethod + ' (SELECT COUNT(*) FROM ObjectTaxonomy WHERE ObjectTypeId = ' + @TaxonomyObjectTypeId + ' and ObjectId = o.Id AND TaxonomyId IN (SELECT TaxonomyId FROM dbo.GetTaxonomyChilds(''' + @TaxonomyId + '''))) > 0 '
						SET @TaxonomyIndex = @TaxonomyIndex + 1     
					END		
				END
							
				ELSE IF PATINDEX('%:LIKE', @FilterProperty) > 0				
					SET @SqlFilter = @SqlFilter + ' AND ' + REPLACE(@FilterProperty, ':LIKE', '') + ' LIKE ''%' + @FilterValue + '%'''     
				
				ELSE IF PATINDEX('%:LIKENOT', @FilterProperty) > 0				
				begin
					SET @SqlFilter = @SqlFilter + ' AND ' + REPLACE(@FilterProperty, ':LIKENOT', '') + ' NOT LIKE ''%' + @FilterValue + '%'''     
					continue
				end
				ELSE IF PATINDEX('%:IN', @FilterProperty) > 0
					SET @SqlFilter = @SqlFilter + ' AND ' + REPLACE(@FilterProperty, ':IN', '') + ' collate modern_spanish_ci_as IN (SELECT RTRIM(LTRIM(strval)) FROM dbo.ParseArray(''' + @FilterValue + ''', '',''))'     				
				ELSE IF PATINDEX('%:NOT IN', @FilterProperty) > 0
					SET @SqlFilter = @SqlFilter + ' AND ' + REPLACE(@FilterProperty, ':NOT IN', '') + ' NOT IN (SELECT RTRIM(LTRIM(strval)) FROM dbo.ParseArray(''' + @FilterValue + ''', '',''))'     																			
				
				
				ELSE IF PATINDEX('%:LTINT', @FilterProperty) > 0				
				BEGIN
					SET @SqlFilter = @SqlFilter + ' AND ' + REPLACE(@FilterProperty, ':LTINT', '') + ' < convert(int, ''' + @FilterValue + ''')'
					continue
				end
				ELSE IF PATINDEX('%:GTINT', @FilterProperty) > 0				
				begin
					SET @SqlFilter = @SqlFilter + ' AND ' + REPLACE(@FilterProperty, ':GTINT', '') + ' > convert(int, ''' + @FilterValue + ''')'
					continue
				end
				ELSE IF PATINDEX('%:LTEINT', @FilterProperty) > 0				
				BEGIN
					SET @SqlFilter = @SqlFilter + ' AND ' + REPLACE(@FilterProperty, ':LTEINT', '') + ' <= convert(int, ''' + @FilterValue + ''')'
					continue
				end
				ELSE IF PATINDEX('%:GTEINT', @FilterProperty) > 0				
				begin
					SET @SqlFilter = @SqlFilter + ' AND ' + REPLACE(@FilterProperty, ':GTEINT', '') + ' >= convert(int, ''' + @FilterValue + ''')'
					continue
				end
				ELSE IF PATINDEX('%:FUNCTION', @FilterProperty) > 0		
				BEGIN
					DECLARE @ResultFunction VARCHAR(MAX)
					DECLARE @ParamFunction NVARCHAR(64) = '@Result VARCHAR(MAX) OUTPUT'
					DECLARE @SqlFunction NVARCHAR(256) = 'SELECT @Result = dbo.[' + REPLACE(@FilterProperty, ':FUNCTION', '') + '](' + @FilterValue + ')'
					EXEC sp_executesql @SqlFunction, @ParamFunction, @Result = @ResultFunction OUTPUT
					
					SET @SqlFilter = @SqlFilter + @ResultFunction
				END
						
				ELSE IF @FilterProperty = 'Name'
					SET @SqlFilter = @SqlFilter + ' AND ' + @FilterProperty + ' LIKE ''%' + @FilterValue + '%'''     				
				ELSE
					SET @SqlFilter = @SqlFilter + ' AND ' + @FilterProperty + ' = ''' + @FilterValue + ''''     				
			END
			else
			begin
				IF PATINDEX('%:ISNULL', @FilterProperty) > 0		
				begin
					SET @SqlFilter = @SqlFilter + ' AND ' + REPLACE(@FilterProperty, ':ISNULL', '') + ' is null'     				
					continue
				end	
				else IF PATINDEX('%:NOT', @FilterProperty) > 0		
				begin
					SET @SqlFilter = @SqlFilter + ' AND ('
						 + REPLACE(@FilterProperty, ':NOT', '') + ' != ''' + @FilterValue + ''''
						  --+ ' OR ' + REPLACE(@FilterProperty, ':NOT', '') + ' is not null'
						  + ')'
					continue
				end
				ELSE IF PATINDEX('%:ISEMPTY', @FilterProperty) > 0		
				begin
					SET @SqlFilter = @SqlFilter + ' AND ' + REPLACE(@FilterProperty, ':ISEMPTY', '') + ' = '''''     				
					continue
				end	
				ELSE IF PATINDEX('%:ISNULLOREMPTY', @FilterProperty) > 0		
				begin
					SET @SqlFilter = @SqlFilter + ' AND (' + REPLACE(@FilterProperty, ':ISNULLOREMPTY', '') + ' is null or ' + REPLACE(@FilterProperty, ':ISNULLOREMPTY', '') + ' = '''')'
					continue
				end	
				ELSE IF PATINDEX('%:ISNOTNULLOREMPTYTRIM', @FilterProperty) > 0		
				begin
					SET @SqlFilter = @SqlFilter + ' AND (' + REPLACE(@FilterProperty, ':ISNOTNULLOREMPTYTRIM', '') + ' is not null and trim(' + REPLACE(@FilterProperty, ':ISNOTNULLOREMPTYTRIM', '') + ') != '''')'
					continue
				end	
				ELSE IF PATINDEX('%:ISNOTNULLOREMPTY', @FilterProperty) > 0		
				begin
					SET @SqlFilter = @SqlFilter + ' AND (' + REPLACE(@FilterProperty, ':ISNOTNULLOREMPTY', '') + ' is not null and ' + REPLACE(@FilterProperty, ':ISNOTNULLOREMPTY', '') + ' != '''')'
					continue
				end	
			end
			
			--Next
			SET @FilterIndex = @FilterIndex + 1			
		END		
	 END