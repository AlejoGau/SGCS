CREATE OR ALTER PROCEDURE [dbo].[SearchEvolucionCuentas30Dias]
	 @page INT = 1,               
	 @start INT = 0,               
	 @limit INT = 50,               
	 @sort NVARCHAR(256) = '',   
	 @group NVARCHAR(256) = '',            
	 @filter NVARCHAR(2048) = '',        
	 @_dc NVARCHAR(256) = '',              
	 @totalrows INT = 1 OUTPUT,
	 @token VARCHAR(128)--Daniel O. Medina 12/08/2024 https://softguard.atlassian.net/browse/DSS-1066

AS
SET NOCOUNT ON

SELECT sts_tfechahora as fecha, sts_cdescripcion as descripcion, sts_icantidad as cantidad, CONVERT(CHAR(5),sts_tfechahora,3) As fecha_format
	FROM [_Sistema].[dbo].s_stats 
	WHERE CONVERT(CHAR,sts_tfechahora,112) > CONVERT(CHAR,DATEADD(day,-30,GETDATE()),112) 
		    AND CONVERT(char, sts_tfechahora,112) <= CONVERT(CHAR,GETDATE(),112)
		    AND sts_ctipo = 'SC' 
		    AND sts_cdescripcion = 'Habilitado'
ORDER BY sts_tfechahora ASC