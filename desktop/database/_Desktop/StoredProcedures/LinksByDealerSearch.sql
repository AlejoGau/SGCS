-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[LinksByDealerSearch]
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort NVARCHAR(128) = '',
	@filter NVARCHAR(2048) = '',      
	@UserId INT = 0,
	@token NVARCHAR(128)     
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   IF (@UserId = 0)
	BEGIN
		SELECT @UserId = dbo.GetUserIdByToken(@token)
	END

	 --RANGOS 
	DECLARE @SqlFilterRango AS VARCHAR(max)
	EXEC getLinksRangosForToken @table = 't_linkurl', @token = @token, @SqlFilterRango = @SqlFilterRango OUTPUT

	 --Temp          
	CREATE TABLE #Temp (RowNumber INT, Id INT)                
           
	DECLARE @Sql NVARCHAR(MAX)    
	set @Sql = ''
    set @Sql = @Sql + ' WHERE 1 = 1'  

	--Filters
	IF @filter != '' 
	BEGIN
		SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')   
		DECLARE @FilterProperty NVARCHAR(32)
		DECLARE @FilterValue NVARCHAR(1024)
		DECLARE @Index INT
		SET @Index = 1

		WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
		BEGIN
			--Read
			SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
			SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'

			DECLARE @ObjectTypeId VARCHAR(64)
			DECLARE @ObjectId VARCHAR(11)
			DECLARE @RelationObjectTypeId VARCHAR(64)	
			DECLARE @RelationObjectId VARCHAR(11)
			DECLARE @RelationMethod VARCHAR(12) = ' IN '
			DECLARE  @objectType VARCHAR(64) = 'Cuenta'
			DECLARE @ObjectDatos bit;
			DECLARE @RelationObjectDatos bit;

			IF PATINDEX('%:RelationParent', @FilterProperty) > 0
			BEGIN 
				SET @FilterProperty = REPLACE(@FilterProperty, ':RelationParent', '')
				SET @ObjectDatos = 0
				SET @RelationObjectDatos = 0

				SELECT @ObjectTypeId = CAST(dbo.GetObjectId(@FilterProperty) AS VARCHAR), 
				@ObjectId = @FilterValue, 
				@RelationObjectTypeId = CAST(dbo.GetObjectId(@objectType) AS VARCHAR)

				SET @Sql = @Sql + ' AND c.cue_iid ' + @RelationMethod + ' (SELECT RelationObjectId FROM _datos..RelationObject WHERE ObjectTypeId = ' + @ObjectTypeId + ' AND ObjectId = ' + @ObjectId + ' AND RelationObjectTypeId = ' + @RelationObjectTypeId + ') '
			END
			ELSE IF @FilterProperty = 'url_cname'
				BEGIN
					SET @Sql = @Sql + ' AND ' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''  
				END
			ELSE IF @FilterProperty = 'url_cdescripcion'
				BEGIN	
					SET @Sql = @Sql + ' AND ' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''  
				END
			ELSE IF @FilterProperty = 'url_curl'
				BEGIN
					SET @Sql = @Sql + ' AND ' + @FilterProperty + ' LIKE N''%' + @FilterValue + '%'''  
					print '@FilterProperty' + @FilterProperty + ' @FilterValue '+@FilterValue
				END


			SET @Index = @Index + 1
		END
		PRINT 'SQL - - - '+@Sql
		DROP TABLE #Filters
	END
	 
	DECLARE @SqlFrom  NVARCHAR(MAX)  


	print '@SqlFilterRango'+@SqlFilterRango

	set @SqlFrom = '
		SELECT [url_idKey] as Id
		,[url_cname]
		,[url_cdescripcion]
		,[url_curl]
		,[url_cDealer]
		FROM [_Tablas].[dbo].t_linkurl
		' + @Sql + ' ' +@SqlFilterRango
		print 'slq from ' + @SqlFrom 
		
		Execute (@SqlFrom)
END