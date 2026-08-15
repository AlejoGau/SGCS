CREATE OR ALTER PROCEDURE [dbo].[Mg_EnviarComprobantePorMail]
	@idComprobante INT = 0,
	@idTemplate INT = 0,
	@email varchar(255) = ''
AS
BEGIN
	DECLARE @urlComprobante VARCHAR(500);
	DECLARE @token varchar(1024)= '8CDCD4D5-8284-48C0-B75A-4D3AAF379C87';

	/*
	 @nombreArchivo = convert(NVARCHAR(11)
		,cbc_iOrganizacionFacturadora)+'-'+convert(NVARCHAR(11)
		,cbc_cTipoCbte)+'-'+RIGHT(RTRIM ('0000'+ISNULL(NULLIF(convert(NVARCHAR(4),cbc_cPrefijoCbte),''),0)),4)	+'-'+RIGHT ('00000000'+convert(NVARCHAR(8)
		, ISNULL(NULLIF(convert(NVARCHAR(50),cbc_iNumeroCbte),''),0) ), 8)+'.pdf'
	*/
	if @email = ''
	BEGIN 
		SELECT @email = orgs.Email
		FROM _datos.dbo.m_comprobantes_cab_fc o 
			LEFT JOIN  [_Datos]..[Organization] orgs ON (cbc_iCliente = Account and account > 0)
			--LEFT JOIN  [_Datos]..m_clientes_fc cli ON cli.cli_icodigo_id = cbc_icliente
		WHERE cbc_iCodigo_ID = @idComprobante
	END 

	declare @MAILSENDER NVARCHAR(250);
	declare @MAILSENDERNAME NVARCHAR(250);
	declare @PATH NVARCHAR(MAX);
	declare @URLDESKTOP NVARCHAR(1024);

	select  @MAILSENDER = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDER';
	select  @MAILSENDERNAME = par_cvalor from _tablas..t_parametros where par_ccodigo = 'MAILSENDERNAME';
	select  @URLDESKTOP = par_cvalor from _tablas..t_parametros where par_ccodigo = 'URLDESKTOP';

	DECLARE @RC int
	DECLARE @FromName NVARCHAR(128) = @MAILSENDERNAME
	DECLARE @FromEmail NVARCHAR(128) = @MAILSENDER
	DECLARE @Subject NVARCHAR(256)
	DECLARE @Body NVARCHAR(MAX) = ''
	DECLARE @DateStart datetime = GETDATE()
	DECLARE @Count int = 0
	DECLARE @Query NVARCHAR(max) = 'Select strval As Email From _Datos.dbo.ParseArray('''+@email+''','';'')'
	DECLARE @TransportType NVARCHAR(64) = 'MAIL'
	DECLARE @Priority int = 700

	SELECT @Subject = [subject], @Body = HtmlBody FROM _Datos..SmartMail_Template WHERE Id = @idTemplate

	--https://gcs.softguard.com:443/handler/ComprobantePdfMG?idComprobante=25&oauth_token=D55AD272-13AA-4903-AC6E-C0CD1BF25B07
	select @urlComprobante = @URLDESKTOP+'/handler/ComprobantePdfMG?idComprobante='+convert(varchar(10),@idComprobante)+'&oauth_token='+@token

	select @urlComprobante=dbo.UrlEncode(@urlComprobante)

	--https://gcs.softguard.com/handler/Html2PdfNreco?oauth_token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87&url=https%3A%2F%2Fgcs.softguard.com%3A443%2Fhandler%2FComprobantePdfMG%3FidComprobante%3D25%26oauth_token%3DD55AD272-13AA-4903-AC6E-C0CD1BF25B07
	DECLARE @fullPath VARCHAR(MAX) = @URLDESKTOP+'/handler/Html2PdfNreco?filename=Factura&oauth_token='+@token+'&url='+@urlComprobante

	EXECUTE @RC = [_datos].[dbo].[SmartMail_ProgramCreate] 
		@FromName
		,@FromEmail
		,@Subject
		,@Body
		,@DateStart
		,@Count
		,@Query
		,@TransportType
		,@fullPath
		,@Priority
END