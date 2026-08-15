CREATE OR ALTER PROCEDURE [dbo].[AuditDenormalizationConfigSearch]
	@json VARCHAR(MAX)
AS
BEGIN
  
	

print @json
	DECLARE @name varchar(255)
	DECLARE @valuej varchar(255)


	Create Table #tmpFields (
						name varchar(200),
						value varchar(200),
						translated int
						)

	INSERT INTO #tmpFields 
		SELECT Name as name ,StringValue,0 as value FROM parseJSON(@json)

	DECLARE json_cursor CURSOR LOCAL FOR
		SELECT Name,StringValue FROM parseJSON(@json); 

	OPEN json_cursor;
	FETCH NEXT FROM json_cursor INTO @name,@valuej;

	WHILE @@FETCH_STATUS = 0
		BEGIN
			
			DECLARE @query NVARCHAR (MAX) = ''
			DECLARE @out VARCHAR (MAX) = ''
			DECLARE @traslatePost INT = 1
			
			SELECT @query = DenormalizationSelect 
				FROM [_Audit].[dbo].[AuditDenormalizationConfig]
				WHERE FieldName = @name
			print '--------------'
			print @query
			print @name
				IF @query != ''
					BEGIN
						
						EXECUTE sp_executesql @query, N'@value VARCHAR(255), @out VARCHAR(255) OUTPUT, @traslatePost INT OUTPUT', @valuej, @out OUTPUT , @traslatePost OUTPUT
						print @out

						UPDATE #tmpFields SET value = @out, translated= @traslatePost WHERE name = @name
					END

			FETCH NEXT FROM json_cursor INTO @name,@valuej;
		END;

	CLOSE json_cursor;
	DEALLOCATE json_cursor;


	SELECT * FROM #tmpFields

END