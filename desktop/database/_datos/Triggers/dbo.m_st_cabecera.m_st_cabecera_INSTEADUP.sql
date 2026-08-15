CREATE OR ALTER TRIGGER [dbo].[m_st_cabecera_INSTEADUP] 
   ON [dbo].[m_st_cabecera] 
   INSTEAD OF UPDATE
AS 
BEGIN
	SET NOCOUNT ON;
	DECLARE @fecha_aux datetime = GETDATE()
	DECLARE @fecha_cierre datetime 
	DECLARE @stc_iOrganizacion Int = 0
	
	Declare @tipo_servicio Char(3) = ''
	Declare @nestado Int = 0
	Declare @nDias Int = 0
	Declare @nVto Int = 0
	Declare @idCuenta Int = 0,
			@iPrioridad Int = 0
	Declare @cObservaciones nVarchar(Max) = '',
			@Contacto VarChar(30)
	Declare	@nvalorpagotecnico  Money = 0,
			@yValor Money = 0,
			@ncostomanodeobra  Money = 0

	SELECT @fecha_cierre = stc_dfecha_cierre,@tipo_servicio=[stc_ctipo_servicio],@nestado=[stc_nestado],@idCuenta=[stc_iid_cuenta],@Contacto=[stc_cContacto],@yValor=[stc_yValor],@nvalorpagotecnico=[stc_nvalorpagotecnico],@ncostomanodeobra=[stc_ncostomanodeobra],@iPrioridad=[stc_iPrioridad], @stc_iOrganizacion=[stc_iOrganizacion] from inserted
	if ABS(DATEDIFF(DAY,@fecha_aux,@fecha_cierre))=0
	begin
		if ABS(DATEDIFF(MINUTE,@fecha_aux,@fecha_cierre))<1
		begin
			SET @fecha_aux = @fecha_cierre
		end
	end

	If @nestado=4	--Finalizado
	Begin
		--Busco si el tipo de servicio tiene configurado valor en dias proximo servicio
		Select Top 1 @nDias=[tip_nDias],@nVto=[tip_nvto]
			From [_Tablas].[dbo].[t_tiposervicio] With (NOLOCK)
		Where [tip_ccodigo] = @tipo_servicio
	End

	UPDATE [m_st_cabecera]  set [stc_dfecha_modificacion]=@fecha_aux, stc_iid=i.stc_iid, stc_nestado=i.stc_nestado
	,stc_iid_cuenta=i.stc_iid_cuenta, stc_inumero=i.stc_inumero,stc_ctipo_servicio=i.stc_ctipo_servicio
	,stc_mobservaciones=i.stc_mobservaciones, stc_dfecha_desde_1=i.stc_dfecha_desde_1,stc_dfecha_hasta_1=i.stc_dfecha_hasta_1
	,stc_dfecha_desde_2=i.stc_dfecha_desde_2, stc_dfecha_hasta_2=i.stc_dfecha_hasta_2, stc_dfecha_desde_3=i.stc_dfecha_desde_3
	,stc_dfecha_hasta_3=i.stc_dfecha_hasta_3, stc_dfecha_cierre=i.stc_dfecha_cierre, stc_ccontacto=i.stc_ccontacto
	,stc_ctecnico_1=i.stc_ctecnico_1, stc_ctecnico_2=i.stc_ctecnico_2, stc_ctecnico_3=i.stc_ctecnico_3
	,stc_ctecnico_4=i.stc_ctecnico_4, stc_ctecnico_5=i.stc_ctecnico_5, stc_yValor=i.stc_yValor, stc_nreclamo_1=i.stc_nreclamo_1
	,stc_creclamo_1=i.stc_creclamo_1
	,stc_creclamo_2=i.stc_creclamo_2, stc_nreclamo_3=i.stc_nreclamo_3, stc_creclamo_3=i.stc_creclamo_3
	,stc_nreclamo_4=i.stc_nreclamo_4, stc_creclamo_4=i.stc_creclamo_4, stc_nreclamo_5=i.stc_nreclamo_5
	,stc_creclamo_5=i.stc_creclamo_5, stc_cmovil_1=i.stc_cmovil_1, stc_cmovil_2=i.stc_cmovil_2
	,stc_dfecha_creacion=i.stc_dfecha_creacion, stc_ioperador=i.stc_ioperador, stc_minsumos=i.stc_minsumos
	,stc_dintecnico_1=i.stc_dintecnico_1, stc_doutecnico_1=i.stc_doutecnico_1, stc_dintecnico_2=i.stc_dintecnico_2
	,stc_doutecnico_2=i.stc_doutecnico_2, stc_dintecnico_3=i.stc_dintecnico_3, stc_doutecnico_3=i.stc_doutecnico_3
	,stc_cdeposito=i.stc_cdeposito, stf_dfecha_vto_orden=i.stf_dfecha_vto_orden, stc_dsalida_al_cliente_DSS=i.stc_dsalida_al_cliente_DSS
	,stc_darribo_al_cliente_DSS=i.stc_darribo_al_cliente_DSS,stc_dsalida_desde_cliente_DSS=i.stc_dsalida_desde_cliente_DSS
	,stc_iforma_viaje_DSS=i.stc_iforma_viaje_DSS, stc_cconformidad_html=i.stc_cconformidad_html
	,stc_idorigenorden=i.stc_idorigenorden, stc_dfechapago=i.stc_dfechapago, stc_nvalorpagotecnico=i.stc_nvalorpagotecnico
	,stc_ncostomanodeobra=i.stc_ncostomanodeobra, stc_iPrioridad=i.stc_iPrioridad, stc_iOrganizacion=i.stc_iOrganizacion

	FROM [m_st_cabecera]
	INNER JOIN inserted i on m_st_cabecera.[stc_iid] = i.stc_iid


	--Si se configuraron dias para proximo servicio se genera uno nuevo
	If @nDias > 0
	Begin
		Declare @stc_dfecha_modificacion Datetime = dateadd(day,@nDias,getdate()),
				@stc_dfecha_creacion Datetime = dateadd(day,@nDias,getdate()),
				@stc_dfecha_desde_1 Datetime = dateadd(day,@nDias,getdate()),
				@stc_dfecha_hasta_1 DateTime = dateadd(day,@nDias+1,getdate())

		Declare @stc_cconformidad_html nVarchar(Max) = (Select Rtrim(Ltrim(par_cValor)) From [_Tablas].[dbo].[t_parametros] Where [par_ccodigo]='CONFORMIDADSERVICIOST')
		If @stc_cconformidad_html = '' Or @stc_cconformidad_html Is Null
			Set @stc_cconformidad_html = '<table><tbody><tr><th colspan="2">CONFORMIDAD DEL SERVICIO</th></tr><tr><td><strong>CLIENTE</strong></td><td><strong>TECNICO</strong></td></tr><tr><td class="firma"><strong>Firma</strong></td><td class="firma"><strong>Firma</strong></td></tr><tr><td class="firma"><strong>Aclaracion</strong></td><td class="firma"><strong>Aclaracion</strong></td></tr></tbody></table>'

		If @nVto = 0
			Set @nVto = 3650 --Le sumo 10 años al vto, porque si se configuro en 0 ( sin vencimiento ) igual se graba la fecha de @stc_dfecha_modificacion

		Declare @stc_inumero int = 0,
				@stc_dfechapago DateTime = 0,
				@stf_dfecha_vto_orden DateTime = dateadd(day,@nVto,@stc_dfecha_modificacion),
				@stc_dfecha_desde_2 DateTime = '1900-1-1',
				@stc_dfecha_hasta_2 DateTime = '1900-1-1',
				@stc_dfecha_desde_3 DateTime = '1900-1-1',
				@stc_dfecha_hasta_3 DateTime = '1900-1-1',
				@stc_dfecha_cierre DateTime = '1900-1-1',
				@stc_nestado numeric(1,0) = 1,	--Pendiente
				@stc_ctecnico_1 Char(3) = '',
				@stc_ctecnico_2 Char(3) = '',
				@stc_ctecnico_3 Char(3) = '',
				@stc_ctecnico_4 Char(3) = '',
				@stc_ctecnico_5 Char(3) = '',
				@stc_nreclamo_1 numeric(1,0) = 0,
				@stc_creclamo_1 nVarchar(50) = '',
				@stc_nreclamo_2 numeric(1,0) = 0,
				@stc_creclamo_2 nVarchar(50) = '',
				@stc_nreclamo_3 numeric(1,0) = 0,
				@stc_creclamo_3 nVarchar(50) = '',
				@stc_nreclamo_4 numeric(1,0) = 0,
				@stc_creclamo_4 nVarchar(50) = '',
				@stc_nreclamo_5 numeric(1,0) = 0,
				@stc_creclamo_5 nVarchar(50) = '',
				@stc_cmovil_1 Char(3) = '',
				@stc_cmovil_2 Char(3) = '',
				@stc_ioperador Int = 0,
				@stc_minsumos Varchar(max) = '',
				@stc_dintecnico_1 DateTime = '1900-1-1',
				@stc_doutecnico_1 DateTime = '1900-1-1',
				@stc_dintecnico_2 DateTime = '1900-1-1',
				@stc_doutecnico_2 DateTime = '1900-1-1',
				@stc_dintecnico_3 DateTime = '1900-1-1',
				@stc_doutecnico_3 DateTime = '1900-1-1',
				@stc_cdeposito Char(3) = '',
				@stc_dsalida_al_cliente_DSS DateTime = '1900-1-1',
				@stc_darribo_al_cliente_DSS DateTime = '1900-1-1',
				@stc_dsalida_desde_cliente_DSS DateTime = '1900-1-1',
				@stc_iforma_viaje_DSS Int = 0,
				@stc_idorigenorden Int = 0
				
		Declare @iid Int = 0
		Select @iid = ISNULL(MAX(stc_iid),0) + 1 From [_Datos].[dbo].[m_st_cabecera]
		Select @stc_inumero = ISNULL(MAX(stc_inumero),0) + 1 From [_Datos].[dbo].[m_st_cabecera]

		Insert Into [_Datos].[dbo].[m_st_cabecera] 
				([stc_iid],[stc_iid_cuenta],[stc_inumero],[stc_ctipo_servicio],[stc_mobservaciones],[stc_dfecha_desde_1],[stc_dfecha_hasta_1],[stc_dfecha_desde_2],[stc_dfecha_hasta_2],[stc_dfecha_desde_3],[stc_dfecha_hasta_3],[stc_dfecha_cierre],[stc_ccontacto],[stc_nestado],[stc_ctecnico_1],[stc_ctecnico_2],[stc_ctecnico_3],[stc_ctecnico_4],[stc_ctecnico_5],[stc_yValor],[stc_nreclamo_1],[stc_creclamo_1],[stc_nreclamo_2],[stc_creclamo_2],[stc_nreclamo_3],[stc_creclamo_3],[stc_nreclamo_4],[stc_creclamo_4],[stc_nreclamo_5],[stc_creclamo_5],[stc_cmovil_1],[stc_cmovil_2],[stc_dfecha_modificacion],[stc_dfecha_creacion],[stc_ioperador],[stc_minsumos],[stc_dintecnico_1],[stc_doutecnico_1],[stc_dintecnico_2],[stc_doutecnico_2],[stc_dintecnico_3],[stc_doutecnico_3],[stc_cdeposito],[stf_dfecha_vto_orden],[stc_dsalida_al_cliente_DSS],[stc_darribo_al_cliente_DSS],[stc_dsalida_desde_cliente_DSS],[stc_iforma_viaje_DSS],[stc_cconformidad_html],[stc_idorigenorden],[stc_dfechapago],[stc_nvalorpagotecnico],[stc_ncostomanodeobra],[stc_iPrioridad], [stc_iOrganizacion])
		Values (@iid,@idCuenta, @stc_inumero, @tipo_servicio, @cObservaciones, @stc_dfecha_desde_1, @stc_dfecha_hasta_1, @stc_dfecha_desde_2, @stc_dfecha_hasta_2, @stc_dfecha_desde_3, @stc_dfecha_hasta_3, @stc_dfecha_cierre, @contacto, @stc_nestado, @stc_ctecnico_1, @stc_ctecnico_2, @stc_ctecnico_3, @stc_ctecnico_4, @stc_ctecnico_5, @yValor, @stc_nreclamo_1, @stc_creclamo_1, @stc_nreclamo_2, @stc_creclamo_2, @stc_nreclamo_3, @stc_creclamo_3, @stc_nreclamo_4, @stc_creclamo_4, @stc_nreclamo_5, @stc_creclamo_5, @stc_cmovil_1, @stc_cmovil_2, @stc_dfecha_modificacion,@stc_dfecha_creacion, @stc_ioperador, @stc_minsumos, @stc_dintecnico_1, @stc_doutecnico_1, @stc_dintecnico_2, @stc_doutecnico_2, @stc_dintecnico_3, @stc_doutecnico_3, @stc_cdeposito, @stf_dfecha_vto_orden, @stc_dsalida_al_cliente_DSS, @stc_darribo_al_cliente_DSS, @stc_dsalida_desde_cliente_DSS, @stc_iforma_viaje_DSS, @stc_cconformidad_html , @stc_idorigenorden, @stc_dfechapago, @nvalorpagotecnico, @ncostomanodeobra, @iPrioridad, @stc_iOrganizacion)

	End
END