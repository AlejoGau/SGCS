--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.387 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchHorario]
@page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort NVARCHAR(256) = '',   
 @group NVARCHAR(256) = '',            
 @filter NVARCHAR(2048) = '',        
 @_dc NVARCHAR(256) = '',              
 @totalrows INT = 1 OUTPUT     
AS
BEGIN

	--Sort
 DECLARE @SqlSort AS NVARCHAR(256)
 SELECT @SqlSort = dbo.GetSqlSortForJson(@sort, 'hor_idKey DESC')
 
 --Filters
 DECLARE @SqlFilter AS NVARCHAR(MAX)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'horario')


 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = '
			Select [hor_idKey] Id, hor_iidcuenta, hor_ndiaapertura, hor_choraapertura, hor_ndiacierre, hor_choracierre
			from _Datos.dbo.[m_horarios]
			WHERE 1 = 1 ' + @SqlFilter + ' ORDER BY ' + @SqlSort 


exec (@Sql);

  
END