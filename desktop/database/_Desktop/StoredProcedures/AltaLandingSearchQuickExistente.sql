-- =============================================
-- Author:		Rodrigo Román
-- Create date: 01/12/2017
-- Description:	Alta de smartpanic masiva desde landing publica
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[AltaLandingSearchQuickExistente] 
	@dealer char(3),
    @plantillaSP varchar(3),
	@groupMax varchar(3),
	@nombre varchar(60),
	@email varchar(150) = '',
	@pais int = 1,
	@provincia varchar(128) = '',
	@telefono varchar(128),
	@comentario varchar(300) = '',
    @mailTo varchar(max),
    @mailSubject varchar(300),
    @mailBody varchar(max),
    @dni varchar(10) = '',
    @direccion varchar(300) = '',
    @empresa varchar(300) = '',
	@AppType int = 0,

    -- Agregado BC 
	@awcc int,

	@mailSubjectCustomer varchar(300),
	@mailBodyCustomer nvarchar(max),

    -- Agregado BC 362335347
    @automonitoreo varchar(2),
    @diasprueba int,    
	@cuentaCreada INT OUTPUT,
	@cuentaSPCreada INT OUTPUT,

    -- Agregado BC 363973822
    @cuentatipo varchar(128) = '',

    -- Agregado BC 370066296
    @enviarEmail varchar(2) = 'si',

    -- 05/11 Agregado por alta directa desde App y no por Landing
    @crearSP VARCHAR(256) = 'true',
    @SPcreado INT = 0,

	-- 03/01/2019 Agregado SOLO para ventas
	@demo VARCHAR(8) = '',

	-- 06/01/2020 Se suma la posibilidad de elegir ZonaHoraria ( Ver t_TimeZone los codigos )
	@zonaHoraria INT = 0,

    -- 14/04/2020 https://basecamp.com/2249105/projects/9796281/todos/399729704
    @observacion VARCHAR(300) = '',
    @codPostal VARCHAR(8) = '',
	--23/21/2022 se agrega el imei
	@imei varchar(255) = '',
	@cue_ncuenta char(10),
	@cue_iid int = 0
AS
BEGIN
	SET NOCOUNT ON;

	declare @iid int;
	SET @iid=@cue_iid;
    DECLARE @maxId INT;
	DECLARE @smartpid int;
	--PARA LANDING QUICK CON CUENTA EXISTENTE SI VA


    IF (@crearSP = 'true')
        BEGIN
		print 'INGRESO POR EL CAMINO DE @crearSP = TRUE'
            -- CREO el SmartPanics
            -- Asigno permisos de grupo, segun lo que se trajo del Modificar.js de la Landing
            declare @configSmartPanic varchar(256)
            IF (@groupMax > 0)
                BEGIN
                    SET @configSmartPanic = '{"groupEnabled":1, "groupMax":'+@groupMax+', "funcMiGrupo":1}'
                END
			ELSE
			    BEGIN
                    SET @configSmartPanic = '{"groupEnabled":1, "groupMax":'+@groupMax+', "funcMiGrupo":1}'
                END
            
            Insert into _datos.dbo.SmartPanic 
                ( [Telefono]
                , [CuentaId]
                , [Nombre]
                , [Linea]
                , [Imei]
                , [Config]
                , [AppType])
            VALUES 
                ( @Telefono
                , @iid
                , @Nombre
                , @dealer
                , @imei
                , @configSmartPanic
				, @AppType )
            SELECT @smartpid = SCOPE_IDENTITY()
            print @smartpid

            -- Actualizo y le asigno una cuenta al SmartPanics
            EXEC [SearchSmartPanicAsignarCuenta]
                @smartpid
                ,@iid
				,@dni

            -- Pedido por Defensor, devolver un JSON con cue_iid y id SP 16/08/2018
            SET @cuentaCreada = @iid;
            SET @cuentaSPCreada = @smartpid;
            
            -- Genero las notificaciones para los eventos de SmartPanics
            SELECT @maxId = isnull(MAX(sms_iid),0) + 1 FROM _datos.dbo.m_sms
            Insert into _datos.dbo.m_sms 
                ( sms_iid
                ,[sms_iidcuenta]
                , [sms_meventos]
                , [sms_cplantillapush]
                , [sms_cidspushsmartpanic]
                )
            VALUES 
                ( @maxId
                , @iid
                , 'S51,S53,S55,S60,S67,S69,S72,_EG,_IG,#AA,#AR,#CC,#EC,#PA,#PP,#RA,#RP,ACP,APR,PR1,PR2,PR3,PR4,PR5,PR6,PR7,PRP'
                , @plantillaSP
                , @smartpid
                )
        END

	-- crear el usuario (LO HACE EL LOGIN)
	-- crear el contacto (LO HACE EL LOGIN)
	-- crear la organizacion en CRM

	declare @orgid int
    declare @provinciaId int

	-- BC 384707810 : Sumar la posibilidad de ocultar Ciudad, para lo cual viene en blanco.
	-- De serlo, la organizacion se creara con State = ''
	IF (@provincia != '')
		BEGIN
			select @provinciaId = pro_idKey FROM _tablas..t_provincias WHERE pro_ccodigo = @provincia
		END
	ELSE
		BEGIN
			SET @provinciaId = null
		END

	--AGREGADO POR EMPRESA SECURITY24
	DECLARE @contrl INT = 0;

	SELECT @contrl = ISNULL(A.Id, 0)
	FROM _Datos..Organization A
	INNER JOIN [_Sistema]..[DealerRango] B ON A.Id=B.IdEntidad
	WHERE B.Dealer = @dealer AND B.CuentaDesde = @cue_ncuenta AND B.CuentaHasta = @cue_ncuenta

	IF @contrl = 0
	BEGIN
		Insert into _Datos..[Organization] ( [Name],[Country],[State],[address],[Mobile],[Email],[StateTax],[LegalName],[Status],[SmallComment])
		values (@nombre, @pais, @provinciaId, @direccion, @Telefono, @Email,@dni, @empresa, 2, @comentario)

		select @orgid = SCOPE_IDENTITY()  
		print @orgid

		-- Agrupo prospectos en CRM
		-- Ejecuto TAXO_comonosconocio_Create para crear en la tabla en _Datos..TaxonomyValue el valor Landing y _ComoNosConocio
		EXEC _Desktop..Taxo_comonosconocio_create
		-- Busco Id de _comoNosConocio en Taxo _Datos
		DECLARE @comoNosConocio INT
		SELECT @comoNosConocio = tv.Id FROM _Datos..TaxonomyValue tv
							 INNER JOIN _Datos..TaxonomyTree tt ON tt.ChildId = tv.Id
							 INNER JOIN _Datos..TaxonomyValue tvp ON tt.ParentId = tvp.Id
							 WHERE tvp.Name = '_comoNosConocio' AND tv.type= 1
		SELECT @comoNosConocio
		-- Ejecuto Taxo 
		exec dbo.Taxo_ObjectTaxonomyInsORUpd
			@ObjectType = 'Organization',
			@ObjectId = @orgid,
			@Id = @comoNosConocio

		-- asocio la cuenta a la organizacion.
		INSERT INTO [_Sistema]..[DealerRango]
           ([Name]
           ,[NombreEntidad]
           ,[IdEntidad]
           ,[Dealer]
           ,[CuentaDesde]
           ,[CuentaHasta])
		VALUES
           (@nombre
           ,@nombre
           ,@orgid
           ,@dealer
           ,@cue_ncuenta
           ,@cue_ncuenta)

		PRINT '--@Awcc,' + CONVERT(VARCHAR(1),@awcc)
	END
	ELSE
	BEGIN
		SET @orgid = @contrl
	END
	IF(@awcc = 1)
		BEGIN
		DECLARE @IdWeb varchar(255)

			-- me fijo si el usuario existe
			IF EXISTS (SELECT 1 FROM [_Sistema]..[UsersDesktopWeb]
			WHERE udw_usuario = @email)
			BEGIN
				SET @IdWeb = 1;
			END
			ELSE
			BEGIN
				SET @IdWeb = 0;
			END

			IF @IdWeb = 1
			SELECT @IdWeb = udw_idKey FROM [_Sistema]..[UsersDesktopWeb]
			WHERE udw_usuario = @email

			PRINT @IdWeb;

			IF @IdWeb = 0
			BEGIN
				print 'El usuario no existe, lo creo'
				-- Agregado de Creacion de usuario + Asignacion de Rangos y Modulo AWCC
				-- Creo el USUARIO a mano SIMULANDO USERDESKTOPWEBINS PARA PODER MANTENER EL @@IDENTITY (Id que se creo en UserDesktopWeb para la asignacion de Modulos)
				Insert into [_Sistema]..[UsersDesktopWeb]
					(	[udw_usuario]
						,[udw_clave]
						,[udw_nombre]
						,[udw_apellido]
						,[udw_empresa]
						,[udw_tipo]
						,[udw_metadata]
						,[udw_iperfil]	)
				values 
					(	@email
						,''
						,@nombre
						,''
						,@orgid
						,2
						,'{"controlaIp":2,"language":"es-ar","provincia":{"nombre":"","id":null}}'
						,''	)
										
				SELECT @IdWeb = SCOPE_IDENTITY()
				print 'El usuario creado es '+@idweb
								 
				DECLARE @IdDesktop INT;
				SELECT @IdDesktop = udm_idKey FROM _Sistema..UsersDesktopModules WHERE udm_key_reference = 'Desktop'
									 							 
				INSERT INTO [_Sistema]..[UsersDesktopWebModulos]
					(	[dwm_idWeb]
						,[dwm_idModules]
						,[dwm_idTabla]
						,[dwm_dealer]
						,[dwm_cuenta_desde]
						,[dwm_cuenta_hasta]
						,[dwm_data]	)
				VALUES 
					(	@IdWeb
						,@IdDesktop
						,''
						,''
						,''
						,''
						,''	)
										 
				EXEC [UsersDesktopWebSel] @IdWeb
			-- FIN REEMPLAZO USERDESKTOPWEBINS

				-- Asigno Rangos al USUARIO
				INSERT INTO [_Sistema]..[UsersDesktopWebModulos]
					   ( [dwm_idWeb]
						,[dwm_idModules]
						,[dwm_idTabla]
						,[dwm_dealer]
						,[dwm_cuenta_desde]
						,[dwm_cuenta_hasta]
						,[dwm_data] )
				 VALUES
					(	@IdWeb
						,0
						,''
						,@dealer
						,@cue_ncuenta
						,@cue_ncuenta
						,''	)
	
			
				-- 03/01/2019 Agregado SOLO para ventas
				-- Se agrega el rango de la cuenta DEMO indicada en Modificar.JS
				-- Se agregan los modulos TrackGuard Monitoreo y Video

				-- Asigno el modulo AWCC
				DECLARE @IdAWCC INT;
				SELECT @IdAWCC = udm_idKey FROM _Sistema..UsersDesktopModules WHERE udm_key_reference = 'AWCC'
				INSERT INTO [_Sistema]..[UsersDesktopWebModulos]
						( [dwm_idWeb]
						,[dwm_idModules]
						,[dwm_idTabla]
						,[dwm_dealer]
						,[dwm_cuenta_desde]
						,[dwm_cuenta_hasta]
						,[dwm_data] )
					VALUES
					(	@IdWeb
						,@IdAWCC
						,''
						,''
						,''
						,''
						,''	)
	
				-- Agrego modulo AWCC el cual tiene CUENTA, Reporte Historico y Reporte de Imagenes en modo Lectura
				INSERT INTO [_Sistema]..[UsersDesktopWebModulosSecurity]
					(  [ums_idWeb]
						,[ums_idModules]
						,[ums_data]	)
				VALUES 
					(	@IdWeb
						,@IdAWCC
						,'{"modules":[{"text":"Cuenta","iconCls":"icon-cuenta","leaf":true,"url":"","class":"","view":"cuentaformview","profile":"1","closable":false,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Usuarios","iconCls":"icon-usuarios","leaf":true,"url":"","class":"","view":"griduser","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Contactos","iconCls":"icon-telefonos","leaf":true,"url":"","class":"","view":"gridphones","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Zonas","iconCls":"icon-zonas","leaf":true,"url":"","class":"","view":"gridzone","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Horarios","iconCls":"icon-horarios","leaf":true,"url":"","class":"","view":"horarioview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Informacion Médica","iconCls":"icon-medica","leaf":true,"url":"","class":"","view":"medicalinfoview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Panel de alarma","iconCls":"icon-panel","leaf":true,"url":"","class":"","view":"panelview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sms","iconCls":"icon-sms","leaf":true,"url":"","class":"","view":"notificacionespanelview","profile":"3","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"SmartPanics","iconCls":"icon-smartpanic","leaf":true,"url":"","class":"","view":"smartpanicgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Servicio Tecnico","iconCls":"icon-wrench-orange","leaf":true,"url":"","class":"","view":"multicuentaserviciotecnicoextdelaersearchgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Reporte Histórico","iconCls":"icon-reportes","leaf":true,"url":"","class":"","view":"recepcionview","profile":"1","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Reporte Gráfico.","iconCls":"icon-reporteGrafico","leaf":true,"url":"","class":"","view":"reportegraficoview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Gestión -> Llamadas","iconCls":"icon-telephone-go","leaf":true,"url":"","class":"","view":"llamadagridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"MoneyGuard","iconCls":"icon-moneyguard-16","leaf":true,"url":"","class":"","view":"mgcuentaview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sms transmitidos","iconCls":"icon-phone-sound","leaf":true,"url":"","class":"","view":"notificacionestabpanelview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Imagenes de eventos","iconCls":"icon-photos","leaf":true,"url":"","class":"","view":"imagenesview","profile":"1","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}],"rights":{},"event":[{"text":"Timeline","iconCls":"icon-clock","leaf":true,"url":"","class":"","view":"eventotimelinegridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Evento","iconCls":"icon-page-white-text","leaf":true,"url":"","class":"","view":"eventoformverticalview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Imagenes","iconCls":"icon-photo","leaf":true,"url":"","class":"","view":"eventimagesgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Llamadas","iconCls":"icon-telephone","leaf":true,"url":"","class":"","view":"eventphonegridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Llamadas post-procesado","iconCls":"icon-telephone","leaf":true,"url":"","class":"","view":"llamadahelperview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Observaciones","iconCls":"icon-book-open","leaf":true,"url":"","class":"","view":"eventobservacionesgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sms","iconCls":"icon-email","leaf":true,"url":"","class":"","view":"eventsmsgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Procesamientos","iconCls":"icon-cog","leaf":true,"url":"","class":"","view":"eventprocesamientogridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Comentario/Recategorizacion","iconCls":"icon-note-edit","leaf":true,"url":"","class":"","view":"eventobservacionesformview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Reporte Autoridades","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"eventorepautgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Vigicontrol","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"vcreadonlyview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"vigicontrolgpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"SmartPanics","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"spreadonlyview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"smartpanicgpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"vehicleslavegpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sonido","iconCls":"icon-sound","leaf":true,"url":"","class":"","view":"eventsoundview","profile":"","closable":false,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Video SmartPanics","iconCls":"icon-cctv-camera","leaf":true,"url":"","class":"","view":"speventovideoview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Links","iconCls":"icon-linkurl","leaf":true,"url":"","class":"","view":"linkurlgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}]}'
					)
			END
			-- asigno el usuario awcc al smartpanic
			update _datos.dbo.SmartPanic set awccUserId = @IdWeb where Id = @smartpid
		
		END
	
	
        -- mando el mail a la central
        declare @cFromName varchar(100)
        Set @cFromName = ( Select Cast(par_cvalor As Varchar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDERNAME')
        Set @cFromName = Ltrim(Rtrim(@cFromName))
        declare @cFrom varchar(150)
        set @cFrom = ( Select Cast(par_cvalor As Varchar(150)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'MAILSENDER')
        set @cFrom = Ltrim(Rtrim(@cFrom))
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
            ,[CueIid]
        )
        VALUES (
            @mailSubject
            ,@cFromName+'<'+@cFrom+'>'
            ,@mailBody
            ,getdate()
            ,1
            ,'A'
            ,'Select strval As Email From _Datos.dbo.ParseArray('''+@mailTo+''','';'')'
            ,'MAIL'
            ,'900'
            ,@iid
        )

    IF @enviarEmail = 'si'
		BEGIN
			-- Envio de Correo Electronico al cliente Registrado, este envia los links de descarga / o email de Bienvenida ( Si es template ).
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
				,[CueIid]
					)
			VALUES (@mailSubjectCustomer
				,@cFromName+'<'+@cFrom+'>'
				,@mailBodyCustomer
				,getdate()
				,1
				,'A'
				,'Select strval As Email From _Datos.dbo.ParseArray('''+@email+''','';'')'
				,'MAIL'
				,'900'
				,@iid
			)
		END -- cierra IF de enviarEmail
		
	SELECT c.cue_iid as idCuenta, sp.Id as idSmartPanic
	FROM _datos..m_cuentas c
		INNER JOIN _datos..SmartPanic sp ON (sp.CuentaId = c.cue_iid)
	WHERE c.cue_iid = @cuentaCreada AND sp.Id = @cuentaSPCreada 
	--PARA LANDING QUICK CON CUENTA EXISTENTE DEJAR SOLO @cuentaSPCreada
END