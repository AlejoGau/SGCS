CREATE OR ALTER PROCEDURE [dbo].[MG_CrearComprobante]
	@Name VarChar(128)		
,
	@cbc_icliente Int = 0,
	@cbc_dfecha DateTime = null,
	@cbc_ctipocbte Char (3) = '' ,
	@cbc_cprefijocbte Char (4) = '' ,
	@cbc_inumerocbte Int = 0,
	@cbc_ysubtotal  Money = 0,
	@cbc_yimpuesto1  Money = 0,
	@cbc_yimpuesto2  Money = 0,
	@cbc_yimpuesto3  Money = 0,
	@cbc_ytotal  Money = 0,
	@cbc_cestado Char (1) = '' ,
	@cbc_ccae VarChar (20) = '',
	@cbc_cvtocae VarChar (10) = '',
	@cbc_iversion int = 1, --la version 1 ya usa los impuestos desde los productos
	@organizacionFacturadoraId INT = 0,
	@ID INT = 0 OUTPUT
					
	--WITH ENCRYPTION			 
	AS
	set noCount on

	DECLARE @ultimoNumeroComprobante INT
	DECLARE @prefijoComprobante nvarchar(10)

	-- si no tiene organizacion facturadora la saco del cliente
	if @organizacionFacturadoraId = 0
		select @organizacionFacturadoraId=cli_iorganizacion from _Datos..m_clientes_fc where cli_icodigo_id = @cbc_icliente

	-- pongo hoy como fecha por defecto
	if @cbc_dfecha is null
		select @cbc_dfecha = GETDATE()

	IF @cbc_inumerocbte = 0 
	BEGIN			
		print  '[MG_CrearComprobante] traigo el ultimo numero de comprobante de [t_comprobantes_fc] para el tipo '+@cbc_ctipocbte
		SELECT @ultimoNumeroComprobante = cbt_inumero , @prefijoComprobante = cbt_cprefijo
			FROM [_Tablas].[dbo].[t_comprobantes_fc] 
			WHERE cbt_ccodigo = @cbc_ctipocbte and cbt_idOrganizacionFacturadora = @organizacionFacturadoraId

		print  '[MG_CrearComprobante] @prefijoComprobante'
		print @prefijoComprobante
		print  '[MG_CrearComprobante] ultimo comprobante en [t_comprobantes_fc]:'+convert(varchar(10),@ultimoNumeroComprobante)								
		WHILE 1<2
			BEGIN															
				SET @ultimoNumeroComprobante = @ultimoNumeroComprobante+1	
				print '[MG_CrearComprobante] le sumo 1 y compruebo que no exista:'+convert(varchar(10),@ultimoNumeroComprobante)
				--verifico que no este en uso
				DECLARE @ultimoComprobante INT = 0
				SELECT TOP 1 @ultimoComprobante = cbc_inumerocbte 
					FROM _datos.dbo.m_comprobantes_cab_fc
					WHERE cbc_inumerocbte = @ultimoNumeroComprobante
						and cbc_ctipocbte = @cbc_ctipocbte
				-- si no tengo ningun comprobante con ese ID salgo de LOOP
				print '[MG_CrearComprobante] Utimo comprobante existente: '+convert(varchar(10),@ultimoComprobante)

				IF @ultimoComprobante = 0 or @ultimoComprobante is null
				BEGIN
					print '[MG_CrearComprobante] Utimo comprobante: '+convert(varchar(10),@ultimoNumeroComprobante)
					SET @cbc_inumerocbte = @ultimoNumeroComprobante
					SET @cbc_cprefijocbte = @prefijoComprobante
					--actualizo contador de comprobante
					UPDATE [_Tablas].[dbo].[t_comprobantes_fc] SET cbt_inumero = @cbc_inumerocbte
						WHERE cbt_ccodigo = @cbc_ctipocbte and cbt_idOrganizacionFacturadora = @organizacionFacturadoraId
																		
					BREAK;
				END														 
			END												
	END
	ELSE
	BEGIN
		print '[MG_CrearComprobante] Se ultilizara el numero :'+convert(varchar(20), @cbc_inumerocbte)							
	END
						
	Insert into _datos.dbo.m_comprobantes_cab_fc ([cbc_icliente],[cbc_dfecha],[cbc_ctipocbte],[cbc_cprefijocbte],[cbc_inumerocbte],[cbc_ysubtotal],[cbc_yimpuesto1],[cbc_yimpuesto2],[cbc_yimpuesto3],[cbc_ytotal],[cbc_cestado],[cbc_ccae],[cbc_cvtocae],[cbc_iOrganizacionFacturadora], cbc_iVersion)
		values ( @cbc_icliente, @cbc_dfecha, @cbc_ctipocbte, @cbc_cprefijocbte, @cbc_inumerocbte, @cbc_ysubtotal, @cbc_yimpuesto1, @cbc_yimpuesto2, @cbc_yimpuesto3, @cbc_ytotal, @cbc_cestado, @cbc_ccae, @cbc_cvtocae, @organizacionFacturadoraId, @cbc_iversion)
										
	SET @ID = SCOPE_IDENTITY()

	select * from _datos.dbo.m_comprobantes_cab_fc where cbc_iCodigo_ID = @ID