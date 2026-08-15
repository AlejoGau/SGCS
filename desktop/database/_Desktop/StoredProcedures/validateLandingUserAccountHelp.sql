-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Verificacion de usuario para App SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[validateLandingUserAccountHelp] 
	-- Parametros para verificacion
	@nombreAyuda VARCHAR(128),
    @telefonoAyuda VARCHAR(128),
    @emailAyuda VARCHAR(128),
    @emailContactoAyuda VARCHAR(128),
	@comentarioAyuda VARCHAR(MAX)

AS
BEGIN
	SET NOCOUNT ON;

	-- Envio el email
	-- Toma de datos para el envio del email
	DECLARE @body NVARCHAR(MAX) = '<div>El cliente : '+@nombreAyuda+', solicita asistencia dado que no ha podido validar la cuenta indicada. <br/>Comunicarse al siguiente número : '+@telefonoAyuda+' o bien via E-mail a : '+@emailAyuda+', el comentario que indica el cliente es : '+@comentarioAyuda+'</div>';
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
		('SmartPanics - Solicitud de Ayuda en Validacion de Cuenta'
		,@cFromName+'<'+@cFrom+'>'
		,@body
		,getdate()
		,1
		,'A'
		,'Select strval As Email From _Datos.dbo.ParseArray('''+@emailContactoAyuda+''','';'')'
		,'MAIL'
		,'900'
			)
END