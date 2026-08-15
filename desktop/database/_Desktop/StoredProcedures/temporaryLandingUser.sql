-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Verificacion de usuario para App SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[temporaryLandingUser]
	@plw_metadata VARCHAR(MAX),
    @plw_email VARCHAR(128) = '', -- landing hoteles no lleva email
    @plw_status INT = 0,
    @plw_date VARCHAR(128) = '',
	@plw_imei VARCHAR(256),
	@mailBodyActiveAccount VARCHAR(MAX) = '',
	@mailSubjectActiveAccount VARCHAR(MAX) = '',
	@preapproval_plan_id_mensual VARCHAR(MAX) = '',
	@reason VARCHAR(MAX) = '',
	@origen VARCHAR(256) = '',
    -- 11/02/2020 https://basecamp.com/2249105/projects/16594557/todos/407419924
    @autoActivarSP VARCHAR(2) = 'no',
	@suscription_id varchar(255) = 'no',
	@plw_token VARCHAR(256) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	print 'inserto en la tabla con metadata'
	print @plw_metadata
	INSERT INTO [_Datos].[dbo].[p_landingWorkflow]
	( [plw_date],[plw_status],[plw_metadata],[plw_email],[plw_imei],[plw_iniciador],[sp_id_suscriptions])
	VALUES (@plw_date,@plw_status,@plw_metadata,@plw_email,@plw_imei,@origen, @preapproval_plan_id_mensual)

    Print 'Obtengo el Token creado en el Insert el cual es unico y sirve para identificar al cliente a mandar el email'
    SELECT @plw_token = plw_token FROM [_Datos].[dbo].[p_landingWorkflow] WHERE @plw_imei = plw_imei

    -- Obtengo la URL del Desktop desde el parametro
    declare @DESKTOPEXTERNALURL varchar(250);
    select  @DESKTOPEXTERNALURL = par_cvalor from _tablas..t_parametros where par_ccodigo = 'DESKTOPEXTERNALURL';
	/*
		IF (@preapproval_plan_id_mensual != '')
		BEGIN
		declare @fecha datetime;
		set @fecha = GETDATE();
			EXEC MP_SuscriptionRequestInsert
				@fecha = @fecha,
				@token = @plw_token,
				@mail = @plw_email,
				@preapproval_plan_id = @preapproval_plan_id_mensual,
				@reason = @reason,
				@external_reference = @plw_token,
				@payer_email = @plw_email,
				@card_token_id = null,
				@back_url = null,
				@status = null,
				@estado = 'CREADO'
		END
	*/
    IF ( @autoActivarSP = 'no' )
        BEGIN
			print 'NO DEBO AUTOACTIVAR LA CUENTA, ES LO DEFAULT.'
            -- Envio el email
            -- Toma de datos para el envio del email
            DECLARE @body NVARCHAR(MAX) = REPLACE(@mailBodyActiveAccount,'{url}', @DESKTOPEXTERNALURL+'/handler/validateLandingFinalUser?token='+@plw_token);
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
                (@mailSubjectActiveAccount
                ,@cFromName+'<'+@cFrom+'>'
                ,@body
                ,getdate()
                ,1
                ,'A'
                ,'Select strval As Email From _Datos.dbo.ParseArray('''+@plw_email+''','';'')'
                ,'MAIL'
                ,'900'
            )

        END
	ELSE
        -- DEBO AUTOACTIVAR LA CUENTA, - SE PASO AL HANDLER DE temporaryLandingUser
        BEGIN
            -- Armo la URL para la insercion
            DECLARE @url VARCHAR(MAX) = @DESKTOPEXTERNALURL+'/handler/validateLandingFinalUser?token='+@plw_token+'&oauth_token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87'

            -- Inserto en RemoteCall el llamado para activacion de la cuenta automaticamente
            -- EXEC _Desktop..RemoteCallQueueIns @Name = '', @rcq_tipo = 'HTTPGET', @rcq_url = @url
        END

END