CREATE OR ALTER PROCEDURE [dbo].[MG_LoteFacturasByFiltersSearch]
	 @page INT = 1,               
 @start INT = 0,               
 @limit INT = 50,               
 @sort VARCHAR(256) = '',   
 @group VARCHAR(256) = '',            
 @filter VARCHAR(2048) = '',        
 @_dc VARCHAR(256) = '', 
 @codigoTipoComprobante varchar(3) = '',
--0 = no, 1 = si
 @envio INT = 0,
 @tipoEnvio VARCHAR(200) = 'Email',
 @template INT = 0

AS
BEGIN

	--Filters
 DECLARE @SqlFilter AS VARCHAR(4096)
 SELECT @SqlFilter = dbo.GetSqlFilterForJson(@filter, '')

	DECLARE @Sql VARCHAR (MAX)
	SET @Sql = '
		
		--BEGIN TRY
			
			DECLARE @IdCliente INT		
			DECLARE clientes_cursor CURSOR LOCAL FOR
				SELECT cli_icodigo_ID FROM _Datos..m_clientes_fc WHERE 1=1' + @SqlFilter +'; 

			OPEN clientes_cursor;
			FETCH NEXT FROM clientes_cursor INTO @IdCliente;

			WHILE @@FETCH_STATUS = 0
				 BEGIN
					EXEC MG_LoteFacturasSearch 
							@arrayClientes = @IdCliente, 
							@codigoTipoComprobante = '''+@codigoTipoComprobante+''',
							@envio = '+CONVERT(varchar(20),@envio)+',
							@tipoEnvio = '''+@tipoEnvio+''',
							@template = '+CONVERT(varchar(20),@template)+'

					FETCH NEXT FROM clientes_cursor INTO @IdCliente;
			 END;
		

			CLOSE clientes_cursor;
			DEALLOCATE clientes_cursor;
		
		/*END TRY
		BEGIN CATCH
				SELECT ERROR_NUMBER() AS ErrorNumber;
		END CATCH;*/
		
	'

	EXEC(@Sql)

END