/*
tipos de usuarios:

ID TIPO	DESCRIPCION
1	SUPERIOR
2	NORMAL
3	BAJO
5	ACCESO ADMINISTRADOR
6	ACCESO PROPIETARIO
7	ACCESO VISITA
8	ACCESO PROVEEDOR
*/

/*
tipos de visitas
1: Visita
3: Pariente
4: Fiesta
5: Evento
6: Delivery

*/

CREATE OR ALTER PROCEDURE [dbo].[invitaciones_createInvitaciones]
	@Name VarChar(128),
	@tipoVisita Int = 0,
	@fechaVisita NVARCHAR(255) = '',
	@documento VARCHAR(255) = '',
	@marcaVehiculo VARCHAR(255) = '',
	@patente VARCHAR(20) = '',
	@motivo VARCHAR(255) = '',
	@usuidkeyAutoriza INT,
	@vigenciaInvitado  INT = 0 -- SI ES UN DELIVERY SE TOMA ESTE PARAMETRO PARA SABER CUANTAS HS. ESTA DISPONIBLE LA INVITACION
	--WITH ENCRYPTION			 
AS
SET NOCOUNT ON



	IF (@fechaVisita != '')
		BEGIN
			SET @fechaVisita = convert(date,@fechaVisita,120);
		END
	ELSE
		BEGIN
			SET @fechaVisita = convert(date,GETDATE(),120);
		END
	
	DECLARE @caa_codigo VARCHAR(255) --para sortear el problema de SCOPE_IDENTITY 
	SET @caa_codigo = NEWID()

	DECLARE @usu_ntipo INT  -- su es delivery el valor que tomará será 8 si no será 7
	DECLARE @horaDesde VARCHAR(5)
	DECLARE @horaHasta VARCHAR(5)
	DECLARE @fechaHastaVisita DATE
	SET @fechaHastaVisita=@fechaVisita
	IF(@tipoVisita = 6)
		BEGIN
			SET @usu_ntipo = 8
			SET @horaDesde = CONVERT(VARCHAR(5),GETDATE(),108)
			SET @horaHasta = CONVERT(VARCHAR(5),DATEADD(HOUR,@vigenciaInvitado ,GETDATE()),108)
			SET @fechaHastaVisita = CONVERT(DATE, DATEADD(HOUR,@vigenciaInvitado ,GETDATE()),108)
		END
	ELSE
		BEGIN
			SET @usu_ntipo = 7
			SET @horaDesde = '00:00'
			set @horaHasta = '23:59'
		END
	DECLARE @caa_estado INT --si el invitado no tiene DNI el estado de la autorización será 2(pendiente), si viene el DNI el estado 1(activo)




	DECLARE @cuentaAutoriza INT;
	SELECT @cuentaAutoriza = usu_iidcuenta FROM _datos..m_usuarios WHERE usu_iidcuenta = @usuidkeyAutoriza
	
	PRINT '@cuentaAutoriza '+CAST(@cuentaAutoriza AS VARCHAR)

	-- Busco DNI si ya existe obtengo el usu_iid y ese es a utilizar en la autorizacion, sino creo uno.
	DECLARE @usu_iidYACREADO VARCHAR(10)
	DECLARE @usu_iidNVO VARCHAR(10)
		SELECT @usu_iidYACREADO = usu_idKey FROM _datos..m_usuarios 
		WHERE usu_cidentificacion = @documento AND usu_iidcuenta = @cuentaAutoriza
	
	IF((@documento IS NULL OR @documento = '' OR @documento='null') AND (@tipoVisita != 6))---para pedir carga de datos de personas a todos menos a delivery
		BEGIN
			SET @caa_estado=2
			SET @usu_iidYACREADO = NULL
		END
	ELSE
		BEGIN
			SET @caa_estado=1
		END
	PRINT '@usu_iidYACREADO '+CAST(@usu_iidYACREADO AS VARCHAR)
	PRINT '@documento '+CAST(@documento AS VARCHAR)
	

	IF (@usu_iidYACREADO IS NULL OR @usu_iidYACREADO = '' OR @documento IS NULL OR @documento = '')
		BEGIN
		
			PRINT 'ENTRE AL IF'

			
			IF(@tipoVisita != 6)
				BEGIN
					DECLARE @usu_cmetadata Varchar(Max)
					SELECT @usu_cmetadata = concat('{"solicitarimagenlogin":0,"brand":"',@marcaVehiculo,'","model":"","domain":"',@patente,'","colour":"","year":"","vehicleType":"","seguroVto":"","seguroCia":"","vtv":""}')
					-- Calculo del proximo usuario posible
					
					DECLARE @usu_iid int
					SELECT @usu_iid = MAX(usu_iid) + 1	
						FROM _datos..m_usuarios
					WHERE usu_iidcuenta = @cuentaAutoriza

					-- Creo el usuario asociado a la cuenta SP
					Insert into _datos..m_usuarios (
						[usu_iidcuenta],
						[usu_icodigo],
						[usu_cnombre],
						[usu_iid],
						[usu_cidentificacion],
						[usu_ntipo],
						[usu_cidextendido],
						[usu_cmetadata]
					)
					VALUES ( 
						@cuentaAutoriza, 
						@usu_iid, 
						@Name, 
						@usu_iid,
						@documento,
						@usu_ntipo,
						@caa_codigo,
						@usu_cmetadata
					)
					/*MODIFICACIONES MARTIN POR TAREA DS-664 QUE COPIA EL USUARIO EN LAS CUENTAS
					QUE TRAE EL PARAMETRO CUENTAACCESO 27/04/2023*/
					DECLARE @cuenta int;
					DECLARE cursor_cuentas CURSOR FOR 
					SELECT value FROM STRING_SPLIT(
					(SELECT par_cValor FROM _Tablas..T_Parametros
					WHERE par_ccodigo = 'CUENTAACCESO'), ',');

					OPEN cursor_cuentas;

					FETCH NEXT FROM cursor_cuentas INTO @cuenta;

					WHILE @@FETCH_STATUS = 0
					BEGIN
						Insert into _datos..m_usuarios (
							[usu_iidcuenta],
							[usu_icodigo],
							[usu_cnombre],
							[usu_iid],
							[usu_cidentificacion],
							[usu_ntipo],
							[usu_cidextendido],
							[usu_cmetadata]
						)
						VALUES ( 
							@cuenta, 
							@usu_iid, 
							@Name, 
							@usu_iid,
							'',
							@usu_ntipo,
							@documento,
							@usu_cmetadata
						)
						
						FETCH NEXT FROM cursor_cuentas INTO @cuenta;
					END

					CLOSE cursor_cuentas;
					DEALLOCATE cursor_cuentas;
					/*FIN MODIFICACIONES*/
					--SELECT @usu_iidNVO = SCOPE_IDENTITY() --NO ESTA FUNCIONANDO POR EL TRIGGER
					SELECT @usu_iidNVO =usu_idkey FROM  _datos..m_usuarios where usu_cidextendido=@caa_codigo
					PRINT 'id de usuario creado' + CAST(@usu_iidNVO AS VARCHAR(MAX))
				END
			
		END
	ELSE
		BEGIN
			SELECT @usu_iidNVO = @usu_iidYACREADO
		END
    
	-- Creo la visita
	Insert into _datos.dbo.p_controlAcceso_Autorizacion (
		[caa_idautorizado],
		[caa_tipoVisita],
		[caa_fechadesde],
		[caa_fechahasta],
		[caa_diasemana],
		[caa_horadesde],
		[caa_horahasta],
		[caa_estado],
		[caa_codigo],
		[caa_usuautoriza],
		[caa_comentarios],
		[caa_marcavehiculo],
		[caa_patenteVehiculo]

	)
	values ( 
		@usu_iidNVO,
		@tipoVisita, 
		@fechaVisita,
		@fechaHastaVisita,
		0, 
		@horaDesde,--'00:00', 
		@horaHasta,--'23:59',
		@caa_estado,
		@caa_codigo,
		@cuentaAutoriza,
		@motivo,
		@marcaVehiculo,
		@patente
	)
	
	-- Devuelvo la ultima invitacion creada, para manipular compartir Whatsapp
	DECLARE @caa_idkey INT;
	SELECT @caa_idkey = SCOPE_IDENTITY()
	
	PRINT '@caa_idkey '+CAST(@caa_idkey AS VARCHAR)
		
	
	/*INSERT INTO OPENQUERY (MYSQL, 'SELECT uf,txt_nombre,txt_documento,txt_patente,txt_marca_veh,txt_motivo,fec_valido_desde,cant_dias_valido,id_tipo_entrada,id_tipo_invitado,id_tipo_reingreso,id_tipo_ingreso,avisar_propietario,ID_Consorcio,idAutorizacion FROM invitados')
    select 
        cue_ncuenta
        ,usu_cnombre
        ,usu_cidentificacion
        ,caa_patenteVehiculo
        ,caa_marcavehiculo
        ,caa_comentarios
        ,SUBSTRING (convert(varchar(10),caa_fechadesde,121),0,11)
        ,1
        ,1
        ,1
        ,1
        ,1
        ,'N'
		,9999
		,caa_idkey
    from [_Datos]..[p_controlAcceso_Autorizacion]
		left join _datos..m_usuarios on usu_idkey = caa_idautorizado
		left join _datos..m_cuentas on cue_iid = usu_iidcuenta
    where caa_idkey = @caa_idkey*/


	DECLARE @filter VARCHAR(max) = '[{"property":"caa_idkey", "value":"'+convert(VARCHAR(10),@caa_idkey)+'"}]'

	EXEC dbo.invitaciones_SearchInvitados @filter=@filter