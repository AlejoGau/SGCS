-- =============================================
-- Author:		Roman Rodrigo	
-- Create date: 2020/12/02
-- Description:	Crea servicios tecnicos con pocos datos para smartpanics
-- 2023-11-24 : Pablo, Se agrega _plain para campo de la orden de servicio y grabacion sin llamar a store para obtener el nro de orden
-- 2023-11-27 : Pablo, En @tel_iid la app envie en realidad el tel_idkey. Con ese valor obtengo el verdadero valor de idCuenta
--			  : Se modifico para contener en las observaciones el usuarioReal de SP y el Contacto				 	
-- 2023-11-29 : Pablo, Si llegan observaciones se concatenan con los datos generados
-- 2025-06-13 : Pablo, se agrego a las observaciones para precepcion el campo @stc_mobservaciones
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[sertecCreaDesdeSp]
	-- Add the parameters for the stored procedure here
	@token varchar(255),
	@tel_iid int = 0,
	@stc_iid_cuenta int,
	@stc_mobservaciones ntext,
	@stc_ccontacto varchar(30) = '',
	@tip_idKey int,
	@cuv_idKey int = 0,
	@cue_iid_movil int = 0,
	@cue_iid_cuenta int = 0 
AS
BEGIN
	SET NOCOUNT ON;

DECLARE @RC int
DECLARE @Name nvarchar(128)
DECLARE @stc_inumero int
DECLARE @stc_ctipo_servicio char(3)
DECLARE @stc_dfecha_desde_1 datetime = '1900-1-1'
DECLARE @stc_dfecha_hasta_1 datetime = '1900-1-1'
DECLARE @stc_dfecha_desde_2 datetime = '1900-1-1'
DECLARE @stc_dfecha_hasta_2 datetime = '1900-1-1'
DECLARE @stc_dfecha_desde_3 datetime = '1900-1-1'
DECLARE @stc_dfecha_hasta_3 datetime = '1900-1-1'
DECLARE @stc_dfecha_cierre datetime = '1900-1-1'
DECLARE @stc_nestado numeric(1,0) = 1
DECLARE @stc_ctecnico_1 char(3) = 0
DECLARE @stc_ctecnico_2 char(3) = 0
DECLARE @stc_ctecnico_3 char(3) = 0
DECLARE @stc_ctecnico_4 char(3) = 0
DECLARE @stc_ctecnico_5 char(3) = 0
DECLARE @stc_yValor money
DECLARE @stc_nreclamo_1 numeric(1,0) =0
DECLARE @stc_creclamo_1 nvarchar(50) = ''
DECLARE @stc_nreclamo_2 numeric(1,0) = 0
DECLARE @stc_creclamo_2 nvarchar(50) = ''
DECLARE @stc_nreclamo_3 numeric(1,0) = 0
DECLARE @stc_creclamo_3 nvarchar(50) = ''
DECLARE @stc_nreclamo_4 numeric(1,0) = 0
DECLARE @stc_creclamo_4 nvarchar(50) = ''
DECLARE @stc_nreclamo_5 numeric(1,0) = 0
DECLARE @stc_creclamo_5 nvarchar(50) = ''
DECLARE @stc_cmovil_1 char(3) = ''
DECLARE @stc_cmovil_2 char(3) = ''
DECLARE @stc_dfecha_modificacion datetime
DECLARE @stc_ioperador int =0
DECLARE @stc_minsumos varchar(max) = ''
DECLARE @stc_dintecnico_1 datetime = '1900-1-1'
DECLARE @stc_doutecnico_1 datetime = '1900-1-1'
DECLARE @stc_dintecnico_2 datetime = '1900-1-1'
DECLARE @stc_doutecnico_2 datetime = '1900-1-1'
DECLARE @stc_dintecnico_3 datetime = '1900-1-1'
DECLARE @stc_doutecnico_3 datetime = '1900-1-1'
DECLARE @stc_cdeposito char(3) = ''
DECLARE @stf_dfecha_vto_orden datetime = '1900-1-1'
DECLARE @stc_dsalida_al_cliente_DSS datetime = '1900-1-1'
DECLARE @stc_darribo_al_cliente_DSS datetime = '1900-1-1'
DECLARE @stc_dsalida_desde_cliente_DSS datetime = '1900-1-1'
DECLARE @stc_iforma_viaje_DSS int
DECLARE @stc_cconformidad_html nvarchar(max)
DECLARE @stc_idorigenorden int = 0
DECLARE @usu_iid int
Declare @newtel_iid int = 0

DECLARE @tel_ctelefono_obs varchar(30) --para agregar en la observación

-- seteo valores 
select @stc_ctipo_servicio = tip_ccodigo, @stc_yValor = tip_yvalor from _tablas..t_tiposervicio where tip_idkey = @tip_idKey
select @stc_dfecha_modificacion = getdate()
select @stc_dfecha_desde_1 = getdate()
select @stc_cconformidad_html = '<table><tbody><tr><th colspan="2">CONFORMIDAD DEL SERVICIO</th></tr><tr><td><strong>CLIENTE</strong></td><td><strong>TECNICO</strong></td></tr><tr><td class="firma"><strong>Firma</strong></td><td class="firma"><strong>Firma</strong></td></tr><tr><td class="firma"><strong>Aclaracion</strong></td><td class="firma"><strong>Aclaracion</strong></td></tr></tbody></table>'

if @stc_ccontacto = '' and @tel_iid>0
begin
	select @stc_ccontacto = usu_cnombre--,@tel_ctelefono_obs=tel_ctelefono
		,@usu_iid = usu_iid,@newtel_iid=t.tel_iid--,@stc_iid_cuenta=tel_iidcuenta 
	from _datos..m_usuarios u
	inner join _datos..m_telefonos t WITH ( NOLOCK ) on (usu_iidcuenta = t.tel_iidcuenta and usu_iid = t.tel_iid+700 and t.tel_nsp IN (1,3))
	--where tel_iid = @tel_iid and tel_iidcuenta=@stc_iid_cuenta
	where tel_idKey = @tel_iid 
end

----------------asignación de observación----
/*************************************************************
	---https://basecamp.com/2249105/projects/16594557/todos/431017650 
**************************************************************/

----------------PARA OBTENER USUARIO SMARTPANIC------------------
DECLARE @awccUserId INT
DECLARE @udw_idKey INT
DECLARE @udw_usuario AS Varchar(255)

Declare @usuarioReal varchar(30) = ''

select @awccUserId = sp.awccUserId,@newtel_iid=t.tel_iid, @newtel_iid=t.tel_iid,@stc_iid_cuenta=tel_iidcuenta,@tel_ctelefono_obs=tel_ctelefono,@usuarioReal=tel_cnombre
	from _datos..SmartPanic sp
inner join _datos..m_telefonos t on sp.CuentaId = t.tel_iidcuenta
	where sp.CuentaId=t.tel_iidcuenta and right(t.tel_ctelefono,8) = right(sp.Telefono,8)  
	--and t.tel_iid=@tel_iid and t.tel_iidcuenta=@stc_iid_cuenta
	and t.tel_idKey=@tel_iid 

select @udw_usuario = udw_usuario from  [_Sistema].[dbo].[UsersDesktopWeb] where udw_idKey = @awccUserId 


DECLARE @zon_cdescripcion as varchar (255) -- para obtener la zona que va en el item Cámara
select @zon_cdescripcion = zon_cdescripcion from _datos.dbo.m_cuentas_video_links vl
	INNER JOIN _datos.dbo.m_zonas z on vl.cvl_czona = z.zon_ccodigo
	WHERE vl.cvl_idKey=@cuv_idKey


DECLARE @obs_locale AS VARCHAR(1024);
EXECUTE _desktop.[dbo].[LocalizationGetLocale] @Name = N'Obs.', @soloOutput=1,@translation = @obs_locale OUTPUT;

DECLARE @nro_orden_locale AS VARCHAR(1024);
EXECUTE _desktop.[dbo].[LocalizationGetLocale] @Name = N'Nro. de Orden', @soloOutput=1,@translation = @nro_orden_locale OUTPUT;

DECLARE @usuario_locale AS VARCHAR(1024);
EXECUTE _desktop.[dbo].[LocalizationGetLocale] @Name = N'Usuario', @soloOutput=1,@translation = @usuario_locale OUTPUT;

DECLARE @usuario_smartpanics_locale AS VARCHAR(1024);
EXECUTE _desktop.[dbo].[LocalizationGetLocale] @Name = N'Usuario Smartpanics', @soloOutput=1,@translation = @usuario_smartpanics_locale OUTPUT;

DECLARE @telefono_locale AS VARCHAR(1024);
EXECUTE _desktop.[dbo].[LocalizationGetLocale] @Name = N'Teléfono', @soloOutput=1,@translation = @telefono_locale OUTPUT;

DECLARE @camara_locale AS VARCHAR(1024);
EXECUTE _desktop.[dbo].[LocalizationGetLocale] @Name = N'Cámara', @soloOutput=1,@translation = @camara_locale OUTPUT;

DECLARE @contacto_locale AS VARCHAR(1024);
EXECUTE _desktop.[dbo].[LocalizationGetLocale] @Name = N'Contacto', @soloOutput=1,@translation = @contacto_locale OUTPUT;

DECLARE @observacion AS VARCHAR(1024);
DECLARE @observacion_plain AS VARCHAR(1024);

DECLARE @usuario_plain as varchar(1024);
DECLARE @usuario_smartpanics_plain as varchar(1024);
DECLARE @telefono_plain as varchar(1024);
DECLARE @camara_plain as varchar(1024);
DECLARE @contacto_plain as varchar(1024);

set @usuario_plain=concat(@usuario_locale,':',@udw_usuario)
set @usuario_smartpanics_plain=concat(@usuario_smartpanics_locale,':',@usuarioReal)
set @telefono_plain=concat(@telefono_locale,':',@tel_ctelefono_obs)
set @contacto_plain=concat(@contacto_locale,':',@stc_ccontacto)
set @observacion_plain=@usuario_plain + Char(10) + @usuario_smartpanics_plain + Char(10) + @telefono_plain + Char(10) + @contacto_plain

if @zon_cdescripcion Is Not Null And @zon_cdescripcion !=''
Begin
	set @camara_plain=concat(@camara_locale,':',@zon_cdescripcion);
	set @observacion_plain += Char(10) + @camara_plain
End

Declare @obs Varchar(max) = @stc_mobservaciones
if @obs Is Not Null And @obs !=''
	set @obs += Char(10)

set @obs += @observacion_plain

Declare @stc_iid int
Declare @stc_dfechapago DateTime = 0,
		@stc_nvalorpagotecnico  Money = 0,
		@stc_ncostomanodeobra  Money = 0,
		@stc_iPrioridad Int = 0

Select @stc_iid = ISNULL(MAX(stc_iid),0) + 1 FROM [_Datos]..[m_st_cabecera]
Select @stc_inumero = ISNULL(MAX(stc_inumero),0) + 1 FROM [_Datos]..[m_st_cabecera]

Insert Into [_Datos]..[m_st_cabecera] ([stc_iid],[stc_iid_cuenta],[stc_inumero],[stc_ctipo_servicio],[stc_mobservaciones],[stc_dfecha_desde_1],[stc_dfecha_hasta_1],[stc_dfecha_desde_2],[stc_dfecha_hasta_2],[stc_dfecha_desde_3],[stc_dfecha_hasta_3],[stc_dfecha_cierre],[stc_ccontacto],[stc_nestado],[stc_ctecnico_1],[stc_ctecnico_2],[stc_ctecnico_3],[stc_ctecnico_4],[stc_ctecnico_5],[stc_yValor],[stc_nreclamo_1],[stc_creclamo_1],[stc_nreclamo_2],[stc_creclamo_2],[stc_nreclamo_3],[stc_creclamo_3],[stc_nreclamo_4],[stc_creclamo_4],[stc_nreclamo_5],[stc_creclamo_5],[stc_cmovil_1],[stc_cmovil_2],[stc_dfecha_modificacion],[stc_ioperador],[stc_minsumos],[stc_dintecnico_1],[stc_doutecnico_1],[stc_dintecnico_2],[stc_doutecnico_2],[stc_dintecnico_3],[stc_doutecnico_3],[stc_cdeposito],[stf_dfecha_vto_orden],[stc_dsalida_al_cliente_DSS],[stc_darribo_al_cliente_DSS],[stc_dsalida_desde_cliente_DSS],[stc_iforma_viaje_DSS],[stc_cconformidad_html],[stc_idorigenorden],[stc_dfechapago],[stc_nvalorpagotecnico],[stc_ncostomanodeobra],[stc_iPrioridad])
							values ( @stc_iid,@stc_iid_cuenta, @stc_inumero, @stc_ctipo_servicio, @obs, @stc_dfecha_desde_1, @stc_dfecha_hasta_1, @stc_dfecha_desde_2, @stc_dfecha_hasta_2, @stc_dfecha_desde_3, @stc_dfecha_hasta_3, @stc_dfecha_cierre, @stc_ccontacto, @stc_nestado, @stc_ctecnico_1, @stc_ctecnico_2, @stc_ctecnico_3, @stc_ctecnico_4, @stc_ctecnico_5, @stc_yValor, @stc_nreclamo_1, @stc_creclamo_1, @stc_nreclamo_2, @stc_creclamo_2, @stc_nreclamo_3, @stc_creclamo_3, @stc_nreclamo_4, @stc_creclamo_4, @stc_nreclamo_5, @stc_creclamo_5, @stc_cmovil_1, @stc_cmovil_2, @stc_dfecha_modificacion, @stc_ioperador, @stc_minsumos, @stc_dintecnico_1, @stc_doutecnico_1, @stc_dintecnico_2, @stc_doutecnico_2, @stc_dintecnico_3, @stc_doutecnico_3, @stc_cdeposito, @stf_dfecha_vto_orden, @stc_dsalida_al_cliente_DSS, @stc_darribo_al_cliente_DSS, @stc_dsalida_desde_cliente_DSS, @stc_iforma_viaje_DSS, @stc_cconformidad_html , @stc_idorigenorden, @stc_dfechapago, @stc_nvalorpagotecnico, @stc_ncostomanodeobra, @stc_iPrioridad)

------------
--SP App necesitas el Select
Exec m_st_cabeceraSel @stc_iid

------------
DECLARE @obs_str as varchar(1024);
DECLARE @orden_str as varchar(1024);
DECLARE @usuario_str as varchar(1024);
DECLARE @usuario_smartpanics_str as varchar(1024);
DECLARE @telefono_str as varchar(1024);
DECLARE @camara_str as varchar(1024);
DECLARE @contacto_str as varchar(1024);

set @obs_str=concat('<table><tr><td>',@obs_locale,':</td><td>',Cast(@stc_mobservaciones As VARCHAR(1000))+'</td></tr>');
set @orden_str=concat('<tr><td>',@nro_orden_locale,':</td><td>',CAST(@stc_inumero as VARCHAR(24))+'</td></tr>');
set @usuario_str=concat('<tr><td>',@usuario_locale,':</td><td>',@udw_usuario,'</td></tr>');
set @usuario_smartpanics_str=concat('<tr><td>',@usuario_smartpanics_locale,':</td><td>',@usuarioReal,'</td></tr>');
set @telefono_str=concat('<tr><td>',@telefono_locale,':</td><td>',@tel_ctelefono_obs,'</td></tr>');
set @contacto_str=concat('<tr><td>',@contacto_locale,':</td><td>',@stc_ccontacto,'</td></tr>');

set @observacion=@obs_str+@orden_str+@usuario_str+@usuario_smartpanics_str+@telefono_str+@contacto_str;
if @zon_cdescripcion Is Not Null And @zon_cdescripcion !=''
Begin
	set @camara_str=concat('<tr><td>',@camara_locale,':</td><td>',@zon_cdescripcion,'</td></tr>');
	set @observacion = @observacion + @camara_str;
End
set @observacion=@observacion+'</table>'

------------

print '[sertecCreaDesdeSp] genero alarma _OC'
declare @idusuario int;
--select @idusuario = @tel_iid + 700
select @idusuario = @newtel_iid + 700

Exec [_desktop]..[AlarmaGenerar] @idCta = @stc_iid_cuenta
		,@cAlarma ='_OC'
		, @rawFechaHora =@stc_dfecha_modificacion
		,@idUsuario = @idusuario
		,@cObservaciones = @observacion

END