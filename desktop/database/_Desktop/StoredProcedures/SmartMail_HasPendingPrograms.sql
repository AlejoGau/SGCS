CREATE OR ALTER PROCEDURE [dbo].[SmartMail_HasPendingPrograms]	
	@Filter VARCHAR(2048) = ''
AS
	SET NOCOUNT ON 
	
	--Filters
	DECLARE @SqlFilter AS VARCHAR(4096)
	SELECT @SqlFilter = dbo.GetSqlFilterForJson(@Filter, 'SmartMail_Program')

	--Query
	DECLARE @Sql VARCHAR(MAX)		
    SET @Sql = 'SELECT COUNT(*)
				  FROM SmartMail_Program o
				 WHERE o.DateStart < GETDATE() 		 
					AND datalength(transporttype)>0
					and transporttype IS NOT NULL
					AND datalength(body)>0
					and body IS NOT NULL
					   AND o.Status = ''A'' ' + @SqlFilter
									   
	EXEC(@Sql)