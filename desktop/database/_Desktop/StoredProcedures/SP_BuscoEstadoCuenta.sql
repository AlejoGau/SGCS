--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.037 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:32.230 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SP_BuscoEstadoCuenta]
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
 

	DECLARE @idcuenta NVARCHAR(32)
  DECLARE @linea NVARCHAR(32)

	IF @filter != ''          
	 BEGIN        
		SELECT * INTO #Filters FROM dbo.parseJSON(@filter) WHERE NAME IN ('property', 'value')     		
		
		DECLARE @FilterProperty NVARCHAR(32)
		DECLARE @FilterValue NVARCHAR(64)

		DECLARE @Index INT

		

		SET @Index = 1
		WHILE((SELECT COUNT(*) FROM #Filters WHERE parent_ID = @Index) != 0)
		BEGIN		
			--Read
			SELECT @FilterProperty = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'property'
			SELECT @FilterValue = StringValue FROM #Filters WHERE parent_ID = @Index AND NAME = 'value'				
			
			--Set Filters
			IF @FilterProperty = 'iidcuenta'
				BEGIN
					SET @idcuenta = @FilterValue				
				END

			IF @FilterProperty = 'linea'
				BEGIN
					SET @linea = @FilterValue				
				END
 			
			SET @Index = @Index + 1
		END
		

		DROP TABLE #Filters
	END   	 


  Select Top 1 * FROM _Datos..m_clientes_fc
	Inner Join _Datos..m_relacion_cliente_cuentas_fc
	On cli_icodigo_ID = rel_icliente
	Where cli_nsituacion = 2 And 
		( ( rel_icuenta= @idcuenta  ) Or
		  ( rel_icuenta=-1 ) )



 
END