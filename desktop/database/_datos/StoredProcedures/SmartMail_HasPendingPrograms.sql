CREATE OR ALTER PROCEDURE [dbo].[SmartMail_HasPendingPrograms]	
@Filter nVarChar(2048) = ''
AS
   SET NOCOUNT ON 
   --Filters
   DECLARE @SqlFilter AS nVarChar(4000)
   --SELECT @SqlFilter = dbo.GetSqlFilterForJson(@Filter, 'SmartMail_Program')
   --2025-12-04 Pablo. Si ejecuta el de datos da error
   SELECT @SqlFilter = _desktop.dbo.GetSqlFilterForJson(@Filter, 'SmartMail_Program')
   --Query
   DECLARE @Sql nVarChar(MAX)                    
   SET @Sql = 'SELECT COUNT(*)
                FROM SmartMail_Program o
                WHERE o.DateStart < GETDATE()       
							AND datalength(transporttype)>0
							And transporttype IS NOT NULL
							AND datalength(body)>0
							And body IS NOT NULL                  
                 AND o.Status = ''A'' ' + @SqlFilter
                                                                                                            
/*
   Print '-----'
   Print @Sql
*/
   EXEC(@Sql)