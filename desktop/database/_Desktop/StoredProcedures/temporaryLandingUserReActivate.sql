-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Verificacion de usuario para App SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[temporaryLandingUserReActivate]
	@imei VARCHAR(255)
AS
BEGIN
	SET NOCOUNT ON;

	-- Obtengo el Token creado en el Insert el cual es unico y sirve para identificar al cliente a mandar el email
	DECLARE @plw_token VARCHAR(255);
	DECLARE @plw_email VARCHAR(255);
	SELECT @plw_token = plw_token, @plw_email = plw_email FROM [_Datos].[dbo].[p_landingWorkflow] WHERE plw_imei = @imei

	-- Obtengo la URL del Desktop desde el parametro
	declare @DESKTOPEXTERNALURL varchar(250);
	select  @DESKTOPEXTERNALURL = par_cvalor from _tablas..t_parametros where par_ccodigo = 'DESKTOPEXTERNALURL';
	
	-- Envio el email
	-- Toma de datos para el envio del email
	DECLARE @body NVARCHAR(MAX) = '<div>Por favor, valide el email ingresado para finalizar su alta de SmartPanics<br/>Haga click <a href="'+@DESKTOPEXTERNALURL+'/handler/validateLandingFinalUser?token='+@plw_token+'">aqui</a></div>';
	PRINT @Body
	
	DECLARE @cueIid INT = NULL;

	-- Obtengo del parametro MailSender los datos de FROM
	declare @cFromName varchar(100)
	Set @cFromName = ( Select Cast(par_cvalor As Varchar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
	Set @cFromName = Ltrim(Rtrim(@cFromName))
	declare @cFrom varchar(150)
	set @cFrom = ( Select Cast(par_cvalor As Varchar(150)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER')
	set @cFrom = Ltrim(Rtrim(@cFrom))

	-- ToDo : Obtengo el template del Body de SmartMail


	-- Realizo el Insert a SmartMailProgram, para el envio del email.
	INSERT INTO _datos..[SmartMail_Program]
		([Name]
		,[From]
		,[Body]
		,[DateStart]
		,[Count]
		,[Status]
		,[Query]
		,[TransportType]
		,[Priority]
			)
	VALUES
		('Bienvenido a SmartPanics - Solicitud de re-activacion de cuenta'
		,@cFromName+'<'+@cFrom+'>'
		,@body
		,getdate()
		,1
		,'A'
		,'Select strval As Email From _Datos.dbo.ParseArray('''+@plw_email+''','';'')'
		,'MAIL'
		,'900'
			)

	
	SELECT plw_email, plw_status, plw_token FROM [_Datos].[dbo].[p_landingWorkflow] WHERE plw_imei = @imei

END