CREATE OR ALTER PROCEDURE [dbo].[AWCC_DetalleFactura]
	@idCabecera INT,	
	@page INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort VARCHAR(256) = '',   
	@group VARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '',              
	@totalrows INT = 1 OUTPUT     
AS  
	SET NOCOUNT ON 
	
	EXEC [_Datos]..ArmaItemsFacturaReImpresion @idCabecera