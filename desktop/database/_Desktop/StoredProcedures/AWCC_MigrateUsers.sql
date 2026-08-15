-- =============================================
-- Author:		Rodrigo Román
-- Create date: 26/12/2018
-- Description:	Migra usuarios de AWCC a Cloud
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[AWCC_MigrateUsers]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @id_login int;
	declare @nombrelogin varchar(250)

	print 'tomo el id del modulo awcc'
	declare @dwm_idmodules int
	select @dwm_idmodules=udm_idkey from _sistema..usersdesktopmodules where [udm_key_reference] = 'AWCC'

	print 'elimino los usuarios que vienen de AWCC y ya existan'
	delete from _Sistema..usersdesktopweb 
		where udw_tipo = 2
		and udw_usuario in (select case when CHARINDEX('@',[nombrelogin]) > 0 then rtrim(nombrelogin) ELSE rtrim(nombrelogin)+ '@awcc.com' END as udw_usuario from [_Sistema].[dbo].[w_usuarios] )


	print 'busco los usuarios a migrar'
	DECLARE awcc_user CURSOR FOR   
    SELECT id_login, nombrelogin
    FROM [_Sistema].[dbo].[w_usuarios]  
    WHERE rtrim(nombrelogin) not in (select rtrim(udw_usuario) from _Sistema..usersdesktopweb)
			and  rtrim(nombrelogin)+ '@awcc.com' not in (select rtrim(udw_usuario) from _Sistema..usersdesktopweb)

    OPEN awcc_user  
    FETCH NEXT FROM awcc_user INTO @id_login,@nombrelogin

    WHILE @@FETCH_STATUS = 0  
    BEGIN  

		print 'inserto en la tabla de usuarios'
		print @nombrelogin
		insert into _Sistema..usersdesktopweb (udw_usuario,udw_clave,udw_nombre,udw_apellido,udw_empresa,udw_estado,udw_metadata,udw_tipo)
		select  
			case when CHARINDEX('@',[nombrelogin]) > 0 then rtrim(nombrelogin) ELSE rtrim(nombrelogin)+ '@awcc.com' END as udw_usuario,
			--'UWPCmnwJAgsEs8uwa9FtIg==' as udw_clave,
			'CRYPT:'+contrasena as udw_clave,
			nombre_mostrar as udw_nombre,
			'' as udw_apellido,
			'' as udw_empresa,
			0 as udw_estado,
			'{"controlaIp":null,"language":"'+
			CASE when idioma = 'espanol.csv' then 'es-ar' 
			when idioma = 'espanol.csv' then 'es-es'
			when idioma = 'catalan.csv' then 'ca-es'
			when idioma = 'ingles.csv' then 'en-en'
			when idioma = 'italiano.csv' then 'it-it'
			when idioma = 'portugesbra.csv' then 'pt-br'
			when idioma = 'portuges.csv' then 'pt-pt'
			when idioma = 'polaco.csv' then 'pl-pl'
			else idioma end
			+'","provincia":{"nombre":"","id":null}}' as udw_metadata,
			2 as udw_tipo
			from [_Sistema].[dbo].[w_usuarios]  
			where rtrim(nombrelogin) not in (select rtrim(udw_usuario) from _Sistema..usersdesktopweb)
				and  rtrim(nombrelogin)+ '@awcc.com' not in (select rtrim(udw_usuario) from _Sistema..usersdesktopweb)
				and id_login = @id_login

			print'tomo el id del usuario insertado o si existia en la base'
			declare @udw_idkey int
			select @udw_idkey = udw_idkey from _Sistema..usersdesktopweb
				where rtrim(@nombrelogin) = rtrim(udw_usuario) 
				or  rtrim(@nombrelogin)+ '@awcc.com' = rtrim(udw_usuario)
				and udw_tipo = 2

			print 'inserto el modulo AWCC si no existe'
			if not exists (select * from _sistema..usersdesktopwebmodulos where dwm_idweb=@udw_idkey and dwm_idmodules = @dwm_idmodules)
			BEGIN
				insert into _sistema..usersdesktopwebmodulos (dwm_idweb,dwm_idmodules,dwm_idtabla,dwm_dealer,dwm_cuenta_desde,dwm_cuenta_hasta,dwm_data) values (@udw_idkey, @dwm_idmodules,'','','','','')
				print 'inserto la seguridad'
				declare @ums_data varchar(max)
				select @ums_data = '{"modules":
				[
					{"text":"Cuenta","iconCls":"icon-cuenta","leaf":true,"url":"","class":"","view":"cuentaformview","profile":"1","closable":false,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
					,{"text":"Usuarios","iconCls":"icon-usuarios","leaf":true,"url":"","class":"","view":"griduser","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
					,{"text":"Contactos","iconCls":"icon-telefonos","leaf":true,"url":"","class":"","view":"gridphones","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
					,{"text":"Zonas","iconCls":"icon-zonas","leaf":true,"url":"","class":"","view":"gridzone","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
					,{"text":"Horarios","iconCls":"icon-horarios","leaf":true,"url":"","class":"","view":"horarioview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
					,{"text":"Informacion Médica","iconCls":"icon-medica","leaf":true,"url":"","class":"","view":"medicalinfoview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
					,{"text":"Panel de alarma","iconCls":"icon-panel","leaf":true,"url":"","class":"","view":"panelview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
					,{"text":"SmartPanics","iconCls":"icon-smartpanic","leaf":true,"url":"","class":"","view":"smartpanicgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
					,{"text":"Reporte Histórico","iconCls":"icon-reportes","leaf":true,"url":"","class":"","view":"recepcionview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
					,{"text":"Reporte Gráfico.","iconCls":"icon-reporteGrafico","leaf":true,"url":"","class":"","view":"reportegraficoview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}'

				if exists (select * FROM [_Sistema].[dbo].[w_permisos_x_usuario] where id_usuario = @id_login and id_permiso = 1)
				BEGIN
					select @ums_data = @ums_data +',{"text":"MoneyGuard","iconCls":"icon-moneyguard-16","leaf":true,"url":"","class":"","view":"mgcuentaview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}'
				END
				ELSE
				BEGIN
					select @ums_data = @ums_data +',{"text":"MoneyGuard","iconCls":"icon-moneyguard-16","leaf":true,"url":"","class":"","view":"mgcuentaview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}'
				END

				if exists (select * FROM [_Sistema].[dbo].[w_permisos_x_usuario] where id_usuario = @id_login and id_permiso = 2)
				BEGIN
					select @ums_data = @ums_data +',{"text":"Gestión -> Llamadas","iconCls":"icon-telephone-go","leaf":true,"url":"","class":"","view":"llamadagridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}'
				END
				ELSE
				BEGIN
					select @ums_data = @ums_data +',{"text":"Gestión -> Llamadas","iconCls":"icon-telephone-go","leaf":true,"url":"","class":"","view":"llamadagridview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}'
				END

				if exists (select * FROM [_Sistema].[dbo].[w_permisos_x_usuario] where id_usuario = @id_login and id_permiso = 3)
				BEGIN
					select @ums_data = @ums_data +',{"text":"Imagenes de eventos","iconCls":"icon-photos","leaf":true,"url":"","class":"","view":"imagenesview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}'
				END
				ELSE
				BEGIN
					select @ums_data = @ums_data +',{"text":"Imagenes de eventos","iconCls":"icon-photos","leaf":true,"url":"","class":"","view":"imagenesview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}'
				END

				if exists (select * FROM [_Sistema].[dbo].[w_permisos_x_usuario] where id_usuario = @id_login and id_permiso = 5)
				BEGIN
					select @ums_data = @ums_data +',{"text":"Servicio Tecnico","iconCls":"icon-wrench-orange","leaf":true,"url":"","class":"","view":"multicuentaserviciotecnicoextdelaersearchgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}'
				END
				ELSE
				BEGIN
					select @ums_data = @ums_data +',{"text":"Servicio Tecnico","iconCls":"icon-wrench-orange","leaf":true,"url":"","class":"","view":"multicuentaserviciotecnicoextdelaersearchgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}'
				END

				if exists (select * FROM [_Sistema].[dbo].[w_permisos_x_usuario] where id_usuario = @id_login and id_permiso = 8)
				BEGIN
					select @ums_data = @ums_data +',{"text":"Sms transmitidos","iconCls":"icon-phone-sound","leaf":true,"url":"","class":"","view":"notificacionestabpanelview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sms","iconCls":"icon-sms","leaf":true,"url":"","class":"","view":"notificacionespanelview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}'
				END
				ELSE
				BEGIN
					select @ums_data = @ums_data +',{"text":"Sms transmitidos","iconCls":"icon-phone-sound","leaf":true,"url":"","class":"","view":"notificacionestabpanelview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true},{"text":"Sms","iconCls":"icon-sms","leaf":true,"url":"","class":"","view":"notificacionespanelview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}'
				END

				select @ums_data = @ums_data +'
					]
					,"rights":{}
					'
				if exists (select * FROM [_Sistema].[dbo].[w_permisos_x_usuario] where id_usuario = @id_login and id_permiso = 6)
				BEGIN
				select @ums_data = @ums_data +'
					,"event":[
						{"text":"Timeline","iconCls":"icon-clock","leaf":true,"url":"","class":"","view":"eventotimelinegridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Evento","iconCls":"icon-page-white-text","leaf":true,"url":"","class":"","view":"eventoformverticalview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Imagenes","iconCls":"icon-photo","leaf":true,"url":"","class":"","view":"eventimagesgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Llamadas","iconCls":"icon-telephone","leaf":true,"url":"","class":"","view":"eventphonegridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Llamadas post-procesado","iconCls":"icon-telephone","leaf":true,"url":"","class":"","view":"llamadahelperview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Observaciones","iconCls":"icon-book-open","leaf":true,"url":"","class":"","view":"eventobservacionesgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Sms","iconCls":"icon-email","leaf":true,"url":"","class":"","view":"eventsmsgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Procesamientos","iconCls":"icon-cog","leaf":true,"url":"","class":"","view":"eventprocesamientogridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Comentario/Recategorizacion","iconCls":"icon-note-edit","leaf":true,"url":"","class":"","view":"eventobservacionesformview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Reporte Autoridades","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"eventorepautgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Vigicontrol","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"vcreadonlyview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"vigicontrolgpsview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"SmartPanics","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"spreadonlyview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"smartpanicgpsview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"vehicleslavegpsview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Sonido","iconCls":"icon-sound","leaf":true,"url":"","class":"","view":"eventsoundview","profile":"1","closable":false,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Video SmartPanics","iconCls":"icon-cctv-camera","leaf":true,"url":"","class":"","view":"speventovideoview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Links","iconCls":"icon-linkurl","leaf":true,"url":"","class":"","view":"linkurlgridview","profile":"1","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
					]'
				END
				ELSE
				BEGIN
				select @ums_data = @ums_data +'
					,"event":[
						{"text":"Timeline","iconCls":"icon-clock","leaf":true,"url":"","class":"","view":"eventotimelinegridview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Evento","iconCls":"icon-page-white-text","leaf":true,"url":"","class":"","view":"eventoformverticalview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Imagenes","iconCls":"icon-photo","leaf":true,"url":"","class":"","view":"eventimagesgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Llamadas","iconCls":"icon-telephone","leaf":true,"url":"","class":"","view":"eventphonegridview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Llamadas post-procesado","iconCls":"icon-telephone","leaf":true,"url":"","class":"","view":"llamadahelperview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Observaciones","iconCls":"icon-book-open","leaf":true,"url":"","class":"","view":"eventobservacionesgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Sms","iconCls":"icon-email","leaf":true,"url":"","class":"","view":"eventsmsgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Procesamientos","iconCls":"icon-cog","leaf":true,"url":"","class":"","view":"eventprocesamientogridview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Comentario/Recategorizacion","iconCls":"icon-note-edit","leaf":true,"url":"","class":"","view":"eventobservacionesformview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Reporte Autoridades","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"eventorepautgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Vigicontrol","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"vcreadonlyview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"vigicontrolgpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"SmartPanics","iconCls":"icon-shield","leaf":true,"url":"","class":"","view":"spreadonlyview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"smartpanicgpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Mapa","iconCls":"icon-map","leaf":true,"url":"","class":"","view":"vehicleslavegpsview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Sonido","iconCls":"icon-sound","leaf":true,"url":"","class":"","view":"eventsoundview","profile":"0","closable":false,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Video SmartPanics","iconCls":"icon-cctv-camera","leaf":true,"url":"","class":"","view":"speventovideoview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
						,{"text":"Links","iconCls":"icon-linkurl","leaf":true,"url":"","class":"","view":"linkurlgridview","profile":"0","closable":true,"viewConfig":"","opened":false,"folder":"","parentId":null,"index":-1,"depth":0,"expanded":false,"expandable":true,"checked":null,"cls":"","icon":"","root":false,"isLast":false,"isFirst":false,"allowDrop":true,"allowDrag":true,"loaded":false,"loading":false,"href":"","hrefTarget":"","qtip":"","qtitle":"","qshowDelay":0,"children":null,"visible":true}
					]'
				END
				select @ums_data = @ums_data +'}'
				delete from _Sistema..UsersDesktopWebModulosSecurity
					where ums_idweb = @udw_idkey
						and ums_idmodules = @dwm_idmodules
				insert into _Sistema..UsersDesktopWebModulosSecurity (ums_idweb, ums_idmodules,ums_data) values (@udw_idkey,@dwm_idmodules,@ums_data)
			END

			print 'inserto los rangos del usuario'
			if exists (select * from _Sistema..usersdesktopweb where udw_idkey = @udw_idkey)
			BEGIN
				insert into _sistema..usersdesktopwebmodulos
					select 
						@udw_idkey as dwm_idweb,
						0 as dwm_idmodules, -- son rangos del usuario
						'' as dwm_idtabla,
						cue_clinea as dwm_dealer,
						cue_ncuenta as dwm_cuenta_desde,
						cue_ncuenta as dwm_cuenta_hasta,
						'' as dwm_data
						from [_Sistema].[dbo].[w_cuentas_x_usuario] w
						inner join _datos..m_cuentas c on w.cue_iid = c.cue_iid
						where [id_usuario] = @id_login
						and w.cue_iid>0
						and not exists (select * from _sistema..usersdesktopwebmodulos 
							where dwm_idweb = @udw_idkey
								and dwm_dealer = cue_clinea
								and dwm_cuenta_desde = cue_ncuenta
								and dwm_cuenta_hasta = cue_ncuenta)
			END

        FETCH NEXT FROM awcc_user INTO @id_login ,@nombrelogin
        END  

    CLOSE awcc_user  
    DEALLOCATE awcc_user  

	print 'FIN'
	
END