CREATE OR ALTER PROCEDURE [dbo].[SmartMail_NextProgram]	
           @Filter nVarChar(2048) = '',
            @Sort nVarChar(256) = ''           
AS
            SET NOCOUNT ON 
 
            --Sort
            DECLARE @SqlSort AS nVarChar(256)
            SELECT @SqlSort = dbo.GetSqlSortForJson(@Sort, 'Id ASC')
 
            --Filters
            DECLARE @SqlFilter AS nVarChar(4000)

		    --SELECT @SqlFilter = dbo.GetSqlFilterForJson(@Filter, 'SmartMail_Program')
			--2025-12-04 Pablo. Si ejecuta el de datos da error
			SELECT @SqlFilter = _desktop.dbo.GetSqlFilterForJson(@Filter, 'SmartMail_Program')
 
            --Query
            DECLARE @Sql nVarChar(MAX)
            SET @Sql = 'SELECT TOP 1 Id, Name, [From], Body, TransportType, Query, '''' as RecurrentType, 0 as RecurrentTime, getdate() as RecurrentDateEnd 			
                        FROM SmartMail_Program
                        WHERE DateStart < GETDATE() 
							AND datalength(transporttype)>0
							And transporttype IS NOT NULL
							AND datalength(body)>0
							And body IS NOT NULL
                        AND Status = ''A'' ' + @SqlFilter + ' ORDER BY ' + @SqlSort
                                   
            --PRINT(@Sql)                                               
            EXEC(@Sql)