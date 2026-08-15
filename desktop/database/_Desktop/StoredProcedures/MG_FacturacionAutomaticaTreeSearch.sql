CREATE OR ALTER PROCEDURE [dbo].[MG_FacturacionAutomaticaTreeSearch]
	@page	 INT = 1,               
	@start INT = 0,               
	@limit INT = 50,               
	@sort VARCHAR(256) = '',   
	@group VARCHAR(256) = '',            
	@filter VARCHAR(2048) = '',        
	@_dc VARCHAR(256) = '', 
	@id int = 0,             
	@node varchar(10) = ''	
AS
BEGIN
	IF @node = 'root'
		BEGIN
			EXEC MG_m_clientes_fcTreeSearch  @filter = @filter, @limit = @limit, @start = @start, @page = @page

		END
	ELSe 
		BEGIN
			declare @nodeInt INT  = convert(INT, @node) 
			EXEC MG_ArmarItemsFacturaAutomaticaTreeSearch  @iCliente = @nodeInt
		END
  
END