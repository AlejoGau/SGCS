CREATE OR ALTER PROCEDURE [dbo].[SmartMail_NextProgram]	
	@Filter VARCHAR(2048) = '',
	@Sort VARCHAR(256) = ''           
AS
	SET NOCOUNT ON 

	--Sort
	DECLARE @SqlSort AS VARCHAR(256)
	SELECT @SqlSort = dbo.GetSqlSortForJson(@Sort, 'Id ASC')

	--Filters
	DECLARE @SqlFilter AS VARCHAR(4096)
	SELECT @SqlFilter = dbo.GetSqlFilterForJson(@Filter, 'SmartMail_Program')

	--Query
	DECLARE @Sql VARCHAR(MAX)
	SET @Sql = 'SELECT TOP 1 Id, [From], Name, Body, Query, TransportType, RecurrentType, RecurrentTime, RecurrentDateEnd 
				  FROM SmartMail_Program
				 WHERE DateStart < GETDATE() 
					   AND Status = ''A'' ' + @SqlFilter + ' ORDER BY ' + @SqlSort
			
	PRINT(@Sql)				   
	EXEC(@Sql)