CREATE OR ALTER PROCEDURE [dbo].[ReporteUsuarioCreadoPorSearch]
 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '',  
 @token VARCHAR(256) = '',  
 @totalrows INT = 1, --OUTPUT

 @cue_clinea VARCHAR(256) = '',   
 @cue_ncuenta VARCHAR(256) = '',   
 @cue_cnombre VARCHAR(256) = '',

 @fechadesde NVARCHAR(256) = '', 
 @fechahasta NVARCHAR(256) = ''

AS  
 SET NOCOUNT ON   
 
 --Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, 'p_recepcion')
 print @SqlFilter

 select @cue_cnombre = Replace(@cue_cnombre,'''','''''')

 --Sql
 DECLARE @Sql NVARCHAR(MAX)
 SET @Sql = ' 
		SELECT fa.* , fae.UserName
		FROM _Audit..FrameworkAudit fa
			INNER JOIN _Audit..FrameworkAuditExtend fae ON (fa.Id = fae.Id)
		WHERE 1 = 1
			AND ObjectName = ''Cuenta'' AND ObjectId = 0 AND  XmlNew LIKE ''%<cue_clinea>'+@cue_clinea+'</cue_clinea><cue_ncuenta>'+RTRIM(@cue_ncuenta)+'</cue_ncuenta>%'' 
			AND fa.AuditDate >= '''+@fechadesde+''' AND fa.AuditDate <= '''+@fechahasta+'''
	'

 print @Sql
 --Total Rows  			  	 
 EXECUTE sp_executesql @Sql