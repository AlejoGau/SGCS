-- =============================================
-- Author:		Rodrigo Román
-- Create date: 01/12/2017
-- Description:	Alta de smartpanic masiva desde landing publica
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[AltaLandingSearch] 
	@dealer char(3),
    @plantillaSP varchar(3),
	@groupMax varchar(3),
	@nombre varchar(60),
	@email varchar(150) = '',
	@pais int = 1,
	@provincia varchar(128) = '',
	@localidad varchar(128) = '',
	@telefono varchar(128),
	@comentario varchar(300) = '',
    @mailTo varchar(max) = '',
    @mailSubject varchar(300) = '',
    @mailBody varchar(max) = '',
    @dni varchar(100) = '',
    @direccion varchar(300) = '',
    @empresa varchar(300) = '',
	@AppType int = 0,

    -- Agregado BC 
	@awcc int,

	@mailSubjectCustomer varchar(300) = '',
	@mailBodyCustomer nvarchar(max) = '',

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
	@_cue_cCustom varchar(100) = ''
AS
BEGIN
	SET NOCOUNT ON;

	PRINT 'INICIO'
	declare @iid int
	
    -- busco si hay un usuario con ese telefono
    DECLARE @Exists INT 
    SELECT @Exists = ISNULL(COUNT(*),0) FROM [_Datos].[dbo].[SmartPanic] 
	WHERE Telefono LIKE '%'+RIGHT(@telefono,8)+'%'
    IF @Exists != 0
    BEGIN
        print 'En caso de existir un usuario y se indique que deseamos blanquear Imei hago Update'
        print 'No blanqueo por default, dado que esto se usa en la validacion de formulario y no solo al crear un usuario'
		       
        IF @imei != ''
        BEGIN
            -- busco el imei anterior
            declare @oldimei varchar(50)
			DECLARE @idCta VARCHAR(50)
            select @oldimei = imei from [_Datos].[dbo].[SmartPanic] WHERE Telefono LIKE '%'+RIGHT(@telefono,8)+'%' AND Imei != ''
            select @idCta = Cuentaid  from [_Datos].[dbo].[SmartPanic] WHERE Telefono LIKE '%'+RIGHT(@telefono,8)+'%' AND Imei != ''

            UPDATE [_Datos].[dbo].[SmartPanic]
            SET Imei = @imei
            WHERE Telefono LIKE '%'+RIGHT(@telefono,8)+'%' AND Imei != ''
            UPDATE [_Datos]..[p_landingWorkflow] set plw_imei=@imei where plw_imei=@oldimei
            SELECT 1 AS Codigo, 'Limpieza OK de Imei, usuario ya existia, hacer login' AS Descripcion
			IF @dealer != ''
			BEGIN
				 UPDATE _Datos..m_cuentas
				 SET cue_clinea = @dealer, cue_cnombre=UPPER(@nombre)
				 WHERE cue_iid=@idCta
			END
		END
            
    END
	ELSE
	BEGIN


		SELECT @iid = par_ivalor+1 
		From _Tablas.dbo.t_parametros (UPDLOCK) 
		Where par_cCodigo='M_CUENTAS'     
		UPDATE _Tablas.dbo.t_parametros SET par_ivalor = @iid Where par_cCodigo='M_CUENTAS'     
		PRINT 'Este es el @iid' + CONVERT(VARCHAR(50), @iid)
		/*
		-- calculo el proximo ncuenta
		-- traigo el ultimo ncuenta del dealer
		declare @cue_ncuenta varchar(10)

		select top 1 @cue_ncuenta = cue_ncuenta from _datos..m_cuentas where cue_clinea = @dealer order by cue_ncuenta desc
		-- lo transformo a int
		declare @ncuenta36 int
		select @ncuenta36 = dbo.Base36Decode(@cue_ncuenta)
		-- sumo 1 y obtengo en nuevo ncuenta
		declare @ncuentaNew varchar(10) = '';
		select @ncuentaNew = upper(dbo.Base36Encode(@ncuenta36+1))
		-- Elimino los blancos
		SET @ncuentaNew = REPLACE (@ncuentaNew,' ','')
		-- Agrego los 4 digitos std
		SET @ncuentaNew = RIGHT('00000'+@ncuentaNew, 4)
		*/

		/*
		5/6/2023: Se comento el calculo de cuenta a mano y se procedio a realizarlo con el store correspondiente
		*/
		declare @ncuentaNew varchar(10) = '';
		DECLARE	@return_value int,
			@cue_ncuenta char(10)
		EXEC	@return_value = [dbo].[SearchCuentaProximoNumero]
			@cue_clinea = @dealer,
			@cue_ncuenta = @cue_ncuenta OUTPUT
		SET @ncuentaNew = @cue_ncuenta

		-- Hago calculo de dealer si el que vino por la landing es ***
		IF (@dealer = '***')
			BEGIN
				-- traigo el ultimo deler del cliente
				DECLARE @cue_clinea varchar(3)
				SELECT top 1 @cue_clinea = cue_clinea FROM _datos..m_cuentas ORDER BY cue_clinea DESC
				-- Lo transformo a int
				DECLARE @clinea36 int
				SELECT @clinea36 = dbo.Base36Decode(@cue_clinea)
				-- Le sumo 1 y obtengo un nuevo cue_clinea
				DECLARE @clineaNew varchar(3) = '';
				SELECT @clineaNew = upper(dbo.Base36Encode(@clinea36+1))
				-- Elimino los blancos
				SET @clineaNew = REPLACE (@clineaNew,' ','')
				-- Agrego los 4 digitos std
				SET @clineaNew = RIGHT('000'+@clineaNew, 3)

				-- Realizo el Insert en Tablas..T_Lineas de los datos que vinieron de la Landing
				INSERT INTO _Tablas..t_lineas
					(
						[lin_ccodigo],
						[lin_crazonsocial],
						[lin_clocalidad],
						[lin_ccalle],
						[lin_cmail],
						[lin_ctelfono]
					)
				VALUES
					(
						@clineaNew,
						@empresa,
						@provincia,
						@direccion,
						@email,
						@telefono
					)

				SELECT @dealer = upper(@clineaNew)
			END
		ELSE
			BEGIN
				SELECT @dealer = upper(@dealer)
			END

		-- Consulto si la cuenta es automonitoreo o no
		declare @automonitoreoInt int
		IF (@automonitoreo = 'si')
			BEGIN
				SET @automonitoreoInt = 1
			END
		ELSE
			BEGIN
				SET @automonitoreoInt = 0
			END

		-- transformo a uppercase el nombre de la cuenta
		SET @nombre = UPPER(@nombre)

		IF (@observacion != '')
			SET @observacion = REPLACE(@observacion, '<br>', CHAR(13) + CHAR(10));


		DECLARE @cue_dfechaalta DATETIME
		DECLARE @cue_dservicio DATETIME
		SET @cue_dfechaalta = GETDATE()
		SET @cue_dservicio = GETDATE()

		-- creo la cuenta
		exec [CuentaIns] 
			  @cue_iid = @iid
			, @Name = @nombre
			, @cue_clinea = @dealer
			, @cue_ncuenta = @ncuentaNew
			, @cue_cnombre = @nombre
			, @cue_cprovincia = @provincia
			, @cue_clocalidad = @localidad
			, @cue_ccalle = @direccion
			, @cue_cemail = @email
			, @cue_ctelefono = @telefono	
			, @cue_nAutoMonitoreo = @automonitoreoInt
			, @cue_nprioridad = 1
			, @cue_nllaveul = 1
			, @est_nduracion = @diasprueba
			, @cue_ctipo = @cuentatipo	
			, @cue_iZonaHoraria = @zonaHoraria
			, @cue_ccodigopostal = @codPostal
			, @cue_cobservacion = @observacion
			, @cue_dfechaalta = @cue_dfechaalta       
			, @cue_dservicio =@cue_dservicio
		print 'pase primer insert'
		-- 05/11 Agregado por alta directa desde App y no por Landing
		-- Cancelo si vino por App directo, la creacion del SP porque ya la hizo la App.
		DECLARE @maxId INT;
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
				DECLARE @smartpid int
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
		ELSE
			BEGIN
				-- Pedido por Defensor, devolver un JSON con cue_iid y id SP 16/08/2018
				SET @cuentaCreada = @iid;
				SET @cuentaSPCreada = @SPcreado;

				-- 05/11 Hago Update del dispositivo SP creado desde la App Directo
				UPDATE _datos..smartpanic
				SET CuentaId = @iid
				WHERE Id = @SPcreado;

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
					, @SPcreado
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
			   ,@ncuentaNew
			   ,@ncuentaNew)


		PRINT '--@Awcc,' + CONVERT(VARCHAR(1),@awcc)

		IF(@awcc = 1)
			BEGIN
				-- Agregado de Creacion de usuario + Asignacion de Rangos y Modulo AWCC
				-- Creo el USUARIO a mano SIMULANDO USERDESKTOPWEBINS PARA PODER MANTENER EL @@IDENTITY (Id que se creo en UserDesktopWeb para la asignacion de Modulos)
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
				BEGIN
					SELECT @IdWeb = udw_idKey FROM [_Sistema]..[UsersDesktopWeb]
					WHERE udw_usuario = @email
					update _datos.dbo.SmartPanic set awccUserId = @IdWeb where Id = @smartpid

					PRINT @IdWeb;
				END
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

								
					-- asigno el usuario awcc al smartpanic
					update _datos.dbo.SmartPanic set awccUserId = @IdWeb where Id = @smartpid
										 
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
										 
					EXEC [UsersDesktopWebSel]
					@IdWeb
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
						,@ncuentaNew
						,@ncuentaNew
						,''	)
	
			
					-- 03/01/2019 Agregado SOLO para ventas
				-- Se agrega el rango de la cuenta DEMO indicada en Modificar.JS
				-- Se agregan los modulos TrackGuard Monitoreo y Video
					PRINT '--@Demo,' + @demo

					IF(@demo != 'no')
					BEGIN

						-- BC 393313093 : Se agrega cuenta TSP fija
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
								,'TSP'
								,'0002'
								,'0002'
								,''	)
	

						DECLARE @cLineaDemo VARCHAR(3) = ''
						DECLARE @cNumeroDemo VARCHAR(4) = ''
						SELECT @cLineaDemo = Item FROM dbo.SplitString(@demo, '-') WHERE Id = 1
						SELECT @cNumeroDemo = Item FROM dbo.SplitString(@demo, '-') WHERE Id = 2

						PRINT '--@cLineaDemo,' + @cLineaDemo
						PRINT '--@cNumeroDemo,' + @cNumeroDemo

						-- Rangos en base a lo indicado en Modificar.JS
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
								,@cLineaDemo
								,@cNumeroDemo
								,@cNumeroDemo
								,''	)

						-- TrackGuard Monitoreo
						DECLARE @IdTrackguardmonitoreo INT;
						SELECT @IdTrackguardmonitoreo = udm_idKey FROM _Sistema..UsersDesktopModules WHERE udm_key_reference = 'TrackGuardMonitoreo'
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
								,@IdTrackguardmonitoreo
								,''
								,''
								,''
								,''
								,''	)

						-- Agrego modulo TrackGuard Monitoreo
						INSERT INTO [_Sistema]..[UsersDesktopWebModulosSecurity]
							(  [ums_idWeb]
								,[ums_idModules]
								,[ums_data]	)
						VALUES 
							(	@IdWeb
								,@IdTrackguardmonitoreo
								,'{"modules":[{"text":"Responsables","iconCls":"icon-usuarios","leaf":true,"url":"","class":"","view":"griduser","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Geocercas","iconCls":"icon-geocerca","leaf":true,"url":"","class":"","view":"geocercagridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"SMS enviados","iconCls":"icon-sms","leaf":true,"url":"","class":"","view":"smsgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"SMS recibidos","iconCls":"icon-sms","leaf":true,"url":"","class":"","view":"smsrecibidosgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Histórico Posiciones","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"vehiclehistorico","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Rutas","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"rutagridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Comandos","iconCls":"icon-ipod-cast","leaf":true,"url":"","class":"","view":"comandosgpsconfigview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}],"rights":[],"event":[]}'
							)
					
						-- Video
						DECLARE @IdVideo INT;
						SELECT @IdVideo = udm_idKey FROM _Sistema..UsersDesktopModules WHERE udm_key_reference = 'Video'
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
								,@IdVideo
								,''
								,''
								,''
								,''
								,''	)


						-- BC 393533009 : Se desea agregar nuevos modulos para TrySmartpanics
						-- Dado que la variable demo solo es para TrySmartpanics, lo dejo dentro de este IF

						--Web Dealer
						DECLARE @IdWebDealer INT;
						SELECT @IdWebDealer = udm_idKey FROM _Sistema..UsersDesktopModules WHERE udm_key_reference = 'WebDealer'
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
								,@IdWebDealer
								,''
								,''
								,''
								,''
								,''	)

						-- Agrego modulo Web Dealer
						INSERT INTO [_Sistema]..[UsersDesktopWebModulosSecurity]
							(  [ums_idWeb]
								,[ums_idModules]
								,[ums_data]	)
						VALUES 
							(	@IdWeb
								,@IdWebDealer
								,'{"modules":[{"text":"Cuenta","iconCls":"icon-cuenta","leaf":true,"url":"","class":"","view":"cuentaformview","profile":"1","closable":false,"viewConfig":"","opened":false,"folder":""},{"text":"Situación","iconCls":"icon-search","leaf":true,"url":"","class":"","view":"estadoview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Automonitoreo","iconCls":"icon-monitor-lightning","leaf":true,"url":"","class":"","view":"automonitoreoformview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Documentos","iconCls":"icon-book-link","leaf":true,"url":"","class":"","view":"documentosgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Usuarios","iconCls":"icon-usuarios","leaf":true,"url":"","class":"","view":"griduser","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Contactos","iconCls":"icon-telefonos","leaf":true,"url":"","class":"","view":"gridphones","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Contactos Juridiccionales","iconCls":"icon-phone","leaf":true,"url":"","class":"","view":"tablastelefonosjuridiccionalesaccgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Zonas","iconCls":"icon-zonas","leaf":true,"url":"","class":"","view":"gridzone","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Particiones","iconCls":"icon-application-cascade","leaf":true,"url":"","class":"","view":"particioneschooserview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Notas","iconCls":"icon-notas","leaf":true,"url":"","class":"","view":"formnote","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Bitacora","iconCls":"icon-book","leaf":true,"url":"","class":"","view":"bitacoraview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Horarios","iconCls":"icon-horarios","leaf":true,"url":"","class":"","view":"horarioview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Informacion Médica","iconCls":"icon-medica","leaf":true,"url":"","class":"","view":"medicalinfoview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Falsas","iconCls":"icon-date-edit","leaf":true,"url":"","class":"","view":"formfalsetest","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Test","iconCls":"icon-test","leaf":true,"url":"","class":"","view":"formtest","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Panel de alarma","iconCls":"icon-panel","leaf":true,"url":"","class":"","view":"panelview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Sms","iconCls":"icon-sms","leaf":true,"url":"","class":"","view":"smsview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Usuarios AWCC","iconCls":"icon-usuarios","leaf":true,"url":"","class":"","view":"awccdiyuntor","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Video link","iconCls":"icon-film","leaf":true,"url":"","class":"","view":"videoxcuentapanelview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"SmartPanics","iconCls":"icon-smartpanic","leaf":true,"url":"","class":"","view":"smartpanicgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Servicio Tecnico","iconCls":"icon-wrench-orange","leaf":true,"url":"","class":"","view":"multicuentaserviciotecnicoextdelaersearchgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Reporte Histórico","iconCls":"icon-reportes","leaf":true,"url":"","class":"","view":"recepcionview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Reporte Gráfico.","iconCls":"icon-reporteGrafico","leaf":true,"url":"","class":"","view":"reportegraficoview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Gestión -> Llamadas","iconCls":"icon-telephone-go","leaf":true,"url":"","class":"","view":"llamadagridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"MoneyGuard","iconCls":"icon-moneyguard-16","leaf":true,"url":"","class":"","view":"mgcuentaview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Sms transmitidos","iconCls":"icon-phone-sound","leaf":true,"url":"","class":"","view":"notificacionestabpanelview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"informe -> Multimedia","iconCls":"icon-photos","leaf":true,"url":"","class":"","view":"multimediaeventospanelview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Scheduler (beta)","iconCls":"icon-cog","leaf":true,"url":"","class":"","view":"schedulegridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Comandos (beta)","iconCls":"icon-ipod-cast","leaf":true,"url":"","class":"","view":"comandosgpsconfigview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""},{"text":"Control estados panel","iconCls":"icon-timeline-marker","leaf":true,"url":"","class":"","view":"m_estadospanelgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":""}],"rights":{},"event":[{"Name":"","udm_idKey":1,"udm_disponible":true,"udm_modulo":"Administrador","udm_key_reference":"Administrator","QuantityOfUsers":115,"_localeModule":"Administrador"},{"Name":"","udm_idKey":37,"udm_disponible":true,"udm_modulo":"Administrador de cercos","udm_key_reference":"FenceManager","QuantityOfUsers":0,"_localeModule":"Administrador de cercos"},{"Name":"","udm_idKey":22,"udm_disponible":true,"udm_modulo":"Administrador de Notificaciones","udm_key_reference":"SgAppNotificationReport","QuantityOfUsers":31,"_localeModule":"Administrador de Notificaciones"},{"Name":"","udm_idKey":24,"udm_disponible":false,"udm_modulo":"AWDMobile","udm_key_reference":"AWDMobile","QuantityOfUsers":10,"_localeModule":"AWD Mobile"},{"Name":"","udm_idKey":10,"udm_disponible":true,"udm_modulo":"CRM","udm_key_reference":"WebCRM","QuantityOfUsers":34,"_localeModule":"CRM"},{"Name":"","udm_idKey":40,"udm_disponible":true,"udm_modulo":"IPRS Manager","udm_key_reference":"IPRSManager","QuantityOfUsers":0,"_localeModule":"IPRS Manager"},{"Name":"","udm_idKey":33,"udm_disponible":true,"udm_modulo":"Link","udm_key_reference":"Link","QuantityOfUsers":2,"_localeModule":"URL Launcher"},{"Name":"","udm_idKey":34,"udm_disponible":true,"udm_modulo":"Logger","udm_key_reference":"Logger","QuantityOfUsers":5,"_localeModule":"Logger Web"},{"Name":"","udm_idKey":4,"udm_disponible":true,"udm_modulo":"MoneyGuard","udm_key_reference":"WebMG","QuantityOfUsers":1,"_localeModule":"Informe -> MoneyGuard"},{"Name":"","udm_idKey":19,"udm_disponible":true,"udm_modulo":"MultiMonitor Web","udm_key_reference":"SgAppMultiMonitorWeb","QuantityOfUsers":55,"_localeModule":"MultiMonitor Web"},{"Name":"","udm_idKey":3,"udm_disponible":true,"udm_modulo":"SerTec","udm_key_reference":"SerTec","QuantityOfUsers":75,"_localeModule":"Servicio Técnico"},{"Name":"","udm_idKey":43,"udm_disponible":true,"udm_modulo":"SgAppAccessControl","udm_key_reference":"SgAppAccessControl","QuantityOfUsers":1,"_localeModule":"Control Acceso"},{"Name":"","udm_idKey":36,"udm_disponible":true,"udm_modulo":"Situator","udm_key_reference":"Situator","QuantityOfUsers":0,"_localeModule":"Situator"},{"Name":"","udm_idKey":21,"udm_disponible":true,"udm_modulo":"SmartPanics","udm_key_reference":"SmartPanics","QuantityOfUsers":0,"_localeModule":"SmartPanics"},{"Name":"","udm_idKey":30,"udm_disponible":true,"udm_modulo":"Video","udm_key_reference":"Video","QuantityOfUsers":86,"_localeModule":"Vídeo"},{"Name":"","udm_idKey":31,"udm_disponible":true,"udm_modulo":"VigiControl","udm_key_reference":"VigiControl","QuantityOfUsers":66,"_localeModule":"VigiControl"},{"Name":"","udm_idKey":11,"udm_disponible":true,"udm_modulo":"Web Cliente Corporativo","udm_key_reference":"AWCC","QuantityOfUsers":4659,"_localeModule":"AWCC"},{"Name":"","udm_idKey":6,"udm_disponible":true,"udm_modulo":"Web Manager","udm_key_reference":"WebManager","QuantityOfUsers":33,"_localeModule":"Web Manager"},{"Name":"","udm_idKey":15,"udm_disponible":true,"udm_modulo":"Web Reporte Autoridades","udm_key_reference":"WebReporteAut","QuantityOfUsers":31,"_localeModule":"Web Reporte Autoridades"}]}'
							)

						--MWR
						DECLARE @IdMWR INT;
						SELECT @IdMWR = udm_idKey FROM _Sistema..UsersDesktopModules WHERE udm_key_reference = 'WebRemoto'
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
								,@IdMWR
								,''
								,''
								,''
								,''
								,''	)

						-- Agrego modulo MWR
						INSERT INTO [_Sistema]..[UsersDesktopWebModulosSecurity]
							(  [ums_idWeb]
								,[ums_idModules]
								,[ums_data]	)
						VALUES 
							(	@IdWeb
								,@IdMWR
								,'{"Usuario":"TrySmartPanics","ope_iid":41,"AtenderAuto":"false","ControlOperador":"","ControlOperadorHoraDesde":"","ControlOperadorHoraHasta":"","Filtros":"{\"Estado\":[],\"Origen\":[],\"Prioridad\":[],\"Grupo\":[],\"Otros\":[]}","mostrarFiltros":"todos","EnvioSMSMasivo":"","eventOrder":"","eventOrderPriority":"","colaborador":"","EnvioSmsSimple":"","Security":"{\"modules\":[],\"rights\":[],\"event\":[{\"text\":\"Timeline\",\"iconCls\":\"icon-clock\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"eventotimelinegridview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Evento\",\"iconCls\":\"icon-page-white-text\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"eventoformview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Imagenes\",\"iconCls\":\"icon-photo\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"eventimagesgridview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Llamadas\",\"iconCls\":\"icon-telephone\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"eventphonegridview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Llamadas post-procesado\",\"iconCls\":\"icon-telephone\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"llamadahelperview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Observaciones\",\"iconCls\":\"icon-book-open\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"eventobservacionesgridview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Sms\",\"iconCls\":\"icon-email\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"eventsmsgridview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Procesamientos\",\"iconCls\":\"icon-cog\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"eventprocesamientogridview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Comentario/Recategorizacion\",\"iconCls\":\"icon-note-edit\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"eventobservacionesformview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Reporte Autoridades\",\"iconCls\":\"icon-shield\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"eventorepautgridview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Vigicontrol\",\"iconCls\":\"icon-shield\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"vcreadonlyview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"SmartPanics\",\"iconCls\":\"icon-shield\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"spreadonlyview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Mapa\",\"iconCls\":\"icon-map\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"smartpanicgpsview\",\"profile\":\"0\",\"closable\":true,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true},{\"text\":\"Sonido\",\"iconCls\":\"icon-sound\",\"leaf\":true,\"url\":\"\",\"class\":\"\",\"view\":\"eventsoundview\",\"profile\":\"\",\"closable\":false,\"viewConfig\":\"\",\"opened\":false,\"folder\":\"\",\"parentId\":null,\"index\":-1,\"depth\":0,\"expanded\":false,\"expandable\":true,\"checked\":null,\"cls\":\"\",\"icon\":\"\",\"root\":false,\"isLast\":false,\"isFirst\":false,\"allowDrop\":true,\"allowDrag\":true,\"loaded\":false,\"loading\":false,\"href\":\"\",\"hrefTarget\":\"\",\"qtip\":\"\",\"qtitle\":\"\",\"qshowDelay\":0,\"children\":null,\"visible\":true}]}","SIPPROTOCOLTAG":"[]","generadorEventos":"","rights":"{\"claves\":false}","grabarLlamadasEntrantes":"","sonido":"true","sineventosdeposicion":"false","supervision":0,"otrasorganizaciones":"false","asignaciones":"false","procesartodos":"","procesarporlote":"","procesarmultiple":"","procesartodospendientes":"false","procesarporlotependientes":"false","procesarmultiplependientes":"false","procesartodosproceso":"false","procesarporloteproceso":"false","procesarmultipleproceso":"false","bitacora":"false","timeline":"false","notas":"false"}'
							)

						--WebReports
						DECLARE @IdWebReport INT;
						SELECT @IdWebReport = udm_idKey FROM _Sistema..UsersDesktopModules WHERE udm_key_reference = 'SgAppWebReport'
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
								,@IdWebReport
								,''
								,''
								,''
								,''
								,''	)

						--MapGuard
						DECLARE @IdMapGuard INT;
						SELECT @IdMapGuard = udm_idKey FROM _Sistema..UsersDesktopModules WHERE udm_key_reference = 'SgAppMapGuardWeb'
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
								,@IdMapGuard
								,''
								,''
								,''
								,''
								,''	)

						-- Agrego password al usuario creado
						UPDATE [_Sistema]..[UsersDesktopWeb]
						SET udw_clave = 'hnqN+/G9ZFJXcCakl7RedA==' --S0ftgu4rd (Generada desde Server ventas por la llave puntual)
						WHERE udw_idKey = @IdWeb

						-- Reemplazar los strings en @mailBodyCustomer (template_bienvenida.html) de {servidor}, {usuarioFinal}, {passwordFinal}
						declare @desktopUrl varchar(100)
						Set @desktopUrl = ( Select Cast(par_cvalor As Varchar(100)) From _Tablas.dbo.t_parametros Where par_ccodigo = 'DESKTOPEXTERNALURL')
					
						SET @mailBodyCustomer = REPLACE(@mailBodyCustomer, '{servidor}', @desktopUrl);
						SET @mailBodyCustomer = REPLACE(@mailBodyCustomer, '{usuarioFinal}', @email);
						SET @mailBodyCustomer = REPLACE(@mailBodyCustomer, '{passwordFinal}', 'S0ftgu4rd');


					END


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
		SET @_cue_cCustom = @dni;
		IF @_cue_cCustom <> ''
		BEGIN
			exec m_CuentasXtraInfoiStatusRDUpdateCreate
			@cue_iidCuenta =@cuentaCreada, @cue_iStatusRD = 0;
			exec m_CuentasXtraInfoUpdateCreate 
			@cue_iidCuenta = @cuentaCreada,
			@cue_ilicenciapar = 2,
			@cue_cCustom = @_cue_cCustom,
			@cue_iImportancia = 4
		END
	END
END