CREATE OR ALTER PROCEDURE [dbo].[SGSP_OrdenSTAutomaticas]
	@cCodAlarma Char(3) = '',
	@idCuenta Int = 0,
	@cFecha Char(10) = '',
	@cHora Char(10) = ''

As
--Verifica si el codigo de alarma recibido esta configurado para generar Orden de ST automatica
--Autor : Pablo O. Canónico
--Fecha : 25/04/2024

Set NoCount ON

BEGIN TRY
	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_OrdenSTAutomaticas] | CodAlarma ' + @cCodAlarma + ' | Id Cuenta => ' + Rtrim(Cast(@idCuenta As varchar(10)))  
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	--Me fijo si la cuenta esta en situacion NO Habilitada
	Declare @_SituacionCuenta nVarChar(100)
	Select @_SituacionCuenta=(Case When est_nEstado=1 And GetDate() BetWeen est_dfechadesde And est_dfechahasta Then 'Prueba' When est_nEstado=2 Then 'No Habilitado' 
			When est_nEstado=3 Then 'Prueba x Zonas' Else 'Habilitado' End )
		From m_estado_cuenta_cab Where est_iidcuenta = @idCuenta

	If @_SituacionCuenta='No Habilitado' 
	Begin	
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_OrdenSTAutomaticas] | Cuenta esta en situacion NO Habilitada. No se genera Orden de ST'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

	Declare @cCodigo Char(3) = ''
	Declare @yValor Money = 0
	Declare @nVto Int = 0

	--Busco si el codigo de alarma esta configurado en algun tipo de st
	Select Top 1 @cCodigo=[tip_ccodigo], @yValor=[tip_yvalor], @nVto=[tip_nvto]
		From [_Tablas].[dbo].[t_tiposervicio] With (NOLOCK)
	Where [tip_ntipo] = 1	--Correctivo
		 And CHARINDEX(@cCodAlarma, [tip_cEventos]) > 0 
	Order By [tip_idKey]

	If @cCodigo = '' Or @cCodigo Is Null
	Begin	
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_OrdenSTAutomaticas] | Evento no configurado para Orden ST Automatica'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End
	
	--Buscar que no exista Orden del mismo tipo pendiente
	Declare @iid Int = 0
	Select Top 1 @iid=[stc_iid] 
		From [m_st_cabecera] With (NOLOCK)
	Where [stc_ctipo_servicio]=@cCodigo
		and stc_nestado IN(1,2,5) 
		And stc_iid_cuenta = @idCuenta
	Order by [stc_iid]

	If @iid > 0 
	Begin
		Set @message = 'Start DateTime : %s | [SGSP_OrdenSTAutomaticas] | Ya existe orden anterior pendiente => ' +  Rtrim(Cast(@iid As varchar(10)))  
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

	Declare @cObservaciones nVarchar(Max),
			@translation nVarchar(Max)=''

	If @cFecha='' Or @cHora=''
	Begin
		Set @cFecha = (Select Convert(Char(10), GetDate(),103))
		Set @cHora = (Select Convert(Char(10), GetDate(),108))
	End

	Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'Orden autogenerada por evento', @soloOutput=1, @translation = @translation OUTPUT
	Set @cObservaciones = Rtrim(@translation) + ' ' + @cCodAlarma
	Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'del dia', @soloOutput=1, @translation = @translation OUTPUT
	Set @cObservaciones +=  ' ' + Rtrim(@translation) + ' ' + @cFecha
	Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'a las', @soloOutput=1, @translation = @translation OUTPUT
	Set @cObservaciones +=  ' ' + Rtrim(@translation) + ' ' + @cHora

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_OrdenSTAutomaticas] | Obs => '+ @cObservaciones
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Declare @stc_dfecha_modificacion Datetime = GetDate(),
			@stc_dfecha_desde_1 Datetime = GetDate()

	Declare @stc_cconformidad_html nVarchar(Max) = (Select Rtrim(Ltrim(par_cValor)) From [_Tablas].[dbo].[t_parametros] Where [par_ccodigo]='CONFORMIDADSERVICIOST')
	If @stc_cconformidad_html = '' Or @stc_cconformidad_html Is Null
		Set @stc_cconformidad_html = '<table><tbody><tr><th colspan="2">CONFORMIDAD DEL SERVICIO</th></tr><tr><td><strong>CLIENTE</strong></td><td><strong>TECNICO</strong></td></tr><tr><td class="firma"><strong>Firma</strong></td><td class="firma"><strong>Firma</strong></td></tr><tr><td class="firma"><strong>Aclaracion</strong></td><td class="firma"><strong>Aclaracion</strong></td></tr></tbody></table>'

	Declare @stc_inumero int = 0,
			@stc_dfechapago DateTime = 0,
			@stc_nvalorpagotecnico  Money = 0,
			@stc_ncostomanodeobra  Money = 0,
			@stc_iPrioridad Int = 0,
			@stf_dfecha_vto_orden DateTime = dateadd(day,@nVto,getdate()),
			@stc_dfecha_hasta_1 DateTime = '1900-1-1',
			@stc_dfecha_desde_2 DateTime = '1900-1-1',
			@stc_dfecha_hasta_2 DateTime = '1900-1-1',
			@stc_dfecha_desde_3 DateTime = '1900-1-1',
			@stc_dfecha_hasta_3 DateTime = '1900-1-1',
			@stc_dfecha_cierre DateTime = '1900-1-1',
			@stc_ccontacto Varchar(30) = '',
			@stc_nestado numeric(1,0) = 1,
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

	Select @iid = ISNULL(MAX(stc_iid),0) + 1 From [_Datos].[dbo].[m_st_cabecera]
	Select @stc_inumero = ISNULL(MAX(stc_inumero),0) + 1 From [_Datos].[dbo].[m_st_cabecera]

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_OrdenSTAutomaticas] | Insert Into [_Datos].[dbo].[m_st_cabecera] | @stc_iid => ' +  Rtrim(Cast(@iid As varchar(10)))  
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Insert Into [_Datos].[dbo].[m_st_cabecera] 
			([stc_iid],[stc_iid_cuenta],[stc_inumero],[stc_ctipo_servicio],[stc_mobservaciones],[stc_dfecha_desde_1],[stc_dfecha_hasta_1],[stc_dfecha_desde_2],[stc_dfecha_hasta_2],[stc_dfecha_desde_3],[stc_dfecha_hasta_3],[stc_dfecha_cierre],[stc_ccontacto],[stc_nestado],[stc_ctecnico_1],[stc_ctecnico_2],[stc_ctecnico_3],[stc_ctecnico_4],[stc_ctecnico_5],[stc_yValor],[stc_nreclamo_1],[stc_creclamo_1],[stc_nreclamo_2],[stc_creclamo_2],[stc_nreclamo_3],[stc_creclamo_3],[stc_nreclamo_4],[stc_creclamo_4],[stc_nreclamo_5],[stc_creclamo_5],[stc_cmovil_1],[stc_cmovil_2],[stc_dfecha_modificacion],[stc_ioperador],[stc_minsumos],[stc_dintecnico_1],[stc_doutecnico_1],[stc_dintecnico_2],[stc_doutecnico_2],[stc_dintecnico_3],[stc_doutecnico_3],[stc_cdeposito],[stf_dfecha_vto_orden],[stc_dsalida_al_cliente_DSS],[stc_darribo_al_cliente_DSS],[stc_dsalida_desde_cliente_DSS],[stc_iforma_viaje_DSS],[stc_cconformidad_html],[stc_idorigenorden],[stc_dfechapago],[stc_nvalorpagotecnico],[stc_ncostomanodeobra],[stc_iPrioridad])
	Values (@iid,@idCuenta, @stc_inumero, @cCodigo, @cObservaciones, @stc_dfecha_desde_1, @stc_dfecha_hasta_1, @stc_dfecha_desde_2, @stc_dfecha_hasta_2, @stc_dfecha_desde_3, @stc_dfecha_hasta_3, @stc_dfecha_cierre, @stc_ccontacto, @stc_nestado, @stc_ctecnico_1, @stc_ctecnico_2, @stc_ctecnico_3, @stc_ctecnico_4, @stc_ctecnico_5, @yValor, @stc_nreclamo_1, @stc_creclamo_1, @stc_nreclamo_2, @stc_creclamo_2, @stc_nreclamo_3, @stc_creclamo_3, @stc_nreclamo_4, @stc_creclamo_4, @stc_nreclamo_5, @stc_creclamo_5, @stc_cmovil_1, @stc_cmovil_2, @stc_dfecha_modificacion, @stc_ioperador, @stc_minsumos, @stc_dintecnico_1, @stc_doutecnico_1, @stc_dintecnico_2, @stc_doutecnico_2, @stc_dintecnico_3, @stc_doutecnico_3, @stc_cdeposito, @stf_dfecha_vto_orden, @stc_dsalida_al_cliente_DSS, @stc_darribo_al_cliente_DSS, @stc_dsalida_desde_cliente_DSS, @stc_iforma_viaje_DSS, @stc_cconformidad_html , @stc_idorigenorden, @stc_dfechapago, @stc_nvalorpagotecnico, @stc_ncostomanodeobra, @stc_iPrioridad)

	
	Set NoExec Off
END TRY
BEGIN CATCH
		Begin
			IF ERROR_NUMBER() = 2627
			BEGIN
				PRINT 'Handling PK violation...';
			END;
			ELSE IF ERROR_NUMBER() = 547
			BEGIN
				PRINT 'Handling CHECK/FK constraint violation...';
			END;
			ELSE IF ERROR_NUMBER() = 515
			BEGIN
				PRINT 'Handling NULL violation...';
			END;
			ELSE IF ERROR_NUMBER() = 245
			BEGIN
				PRINT 'Handling conversion error...';
			END;
			ELSE
			BEGIN
				PRINT 'Re-throwing error...';
			END;

			PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VARCHAR(10));
			PRINT 'Error Message : ' + ERROR_MESSAGE();
			PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
			PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
			PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
			PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
		End
END CATCH