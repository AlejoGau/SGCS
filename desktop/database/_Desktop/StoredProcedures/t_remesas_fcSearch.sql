CREATE OR ALTER PROCEDURE [dbo].t_remesas_fcSearch
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @sort NVARCHAR(256) = '',   
	 @group NVARCHAR(256) = '',            
	 @filter NVARCHAR(2048) = '',
	 @_dc NVARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT, 
	 @token VARCHAR(128) = ''

AS
	SET NOCOUNT ON
	
	SELECT [rem_icodigo_ID]
      ,[rem_cdescripcion]
      ,[rem_cnombrearchivo]
      ,[rem_cnrocomercio]
      ,[rem_cidentificacion]
	  ,rem_cconfig
  FROM [_Tablas].[dbo].[t_remesas_fc]