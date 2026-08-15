CREATE OR ALTER PROCEDURE [dbo].[SGSP_CuentaDelete]
	@iCta [int] = 0,
	@cImei [nVarChar](20) = '',
	@cDealer [char](3) = '',
	@cCuenta [nVarChar](10) = ''
As

SET NOCOUNT ON;
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | INICIO'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

If @iCta = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | @iCta=0. No Borra!!!'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_cuentas_video'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_cuentas_video Where cuv_iidCuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_cuentas_video_links'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_cuentas_video_links Where cvl_iidCuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_CuentasXtraInfo'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_CuentasXtraInfo Where cue_iidCuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_estado_cuenta_cab'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_estado_cuenta_cab Where est_iidCuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_estado_cuenta_item'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_estado_cuenta_item Where est_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_falsas'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_falsas Where fal_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete p_InfoDxRadial'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From p_InfoDxRadial Where idr_idCuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_horarios'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_horarios Where hor_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_horarios_alternativos'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_horarios_alternativos  Where alt_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_cuentas_video'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_horarios_excepcion Where exc_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_horarios_tolerancia'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_horarios_tolerancia Where tol_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_cuentas_video'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_medical_info Where mnf_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_notas'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_notas Where not_iidcuenta = @iCta	

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_paneles'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_paneles Where pan_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_reportes_automaticos'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_reportes_automaticos Where rep_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_status'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_status Where sta_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_sms'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_sms Where sms_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_telefonos'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_telefonos Where tel_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_tst_prueba'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_tst_prueba Where tst_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_usuarios'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_usuarios Where usu_iidcuenta = @iCta	

--Tiene que estar antes de zonas porque sino el trigger de zonas no deja eliminar
Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete t_CheckPoints_VC'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From [_Tablas].[dbo].[t_CheckPoints_VC] Where  [chp_iCuenta] = @iCta
--

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_zonas'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_zonas Where zon_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_zonas PAR'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_zonas Where zon_ccodigo Like 'PAR%' And zon_cdealer=@cDealer And zon_ccuenta=@cCuenta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete p_comandos_ip'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From p_comandos_ip  Where cmd_idCuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete p_CtrlEventos'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From p_CtrlEventos Where cte_iCta = @iCta 

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete p_eventos'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From p_eventos Where eve_iidCuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete p_Gps'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From p_Gps Where gps_idCuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete p_grabacion_audio'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From p_grabacion_audio  Where gra_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete p_grabacion_img'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From p_grabacion_img Where gri_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete m_CuentasConn'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From m_CuentasConn Where cco_iidCuenta = @iCta

--_RegistrosAEliminar tiene un indice UNIQUE por [rae_cTabla],[rae_iID]
BEGIN TRY
	Declare @iCtrl Int = 0
	--Delete From p_PosicionesGPS  Where gps_idCuenta = @iCta	
	Select Top 1 @iCtrl=[rae_idKey] From [_Datos].[dbo].[_RegistrosAEliminar] Where [rae_cTabla]='p_PosicionesGPS' And [rae_iID]=@iCta
	If @iCtrl Is Null Or @iCtrl = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Insert _RegistrosAEliminar p_PosicionesGPS'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		Insert Into _RegistrosAEliminar ([rae_cTabla],[rae_iID]) Values ('p_PosicionesGPS', @iCta)
	End	
	--Delete From p_recepcion WHERE rec_iidcuenta = @iCta     
	Select Top 1 @iCtrl=[rae_idKey] From [_Datos].[dbo].[_RegistrosAEliminar] Where [rae_cTabla]='p_recepcion' And [rae_iID]=@iCta
	If @iCtrl Is Null Or @iCtrl = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Insert _RegistrosAEliminar p_recepcion'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		Insert Into _RegistrosAEliminar ([rae_cTabla],[rae_iID]) Values ('p_recepcion', @iCta)
	End
	/*
	Declare TmpDeleteCursor CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY 
	   For Select table_name From information_schema.columns Where
		 table_name Like 'p_recepcion%' And table_name Not In ('p_recepcion','p_recepcion_notas','p_recepcion_proceso','p_recepcion_D')
			 Group By table_name

	Declare @cTableName Char(17)
	Declare @cSQL VARCHAR(MAX)
	Open TmpDeleteCursor

	FETCH NEXT FROM  TmpDeleteCursor INTO @cTableName
	WHILE @@FETCH_STATUS = 0
	Begin
		Insert Into _RegistrosAEliminar ([rae_cTabla],[rae_iID]) Values (@cTableName, @iCta)   
   
		FETCH NEXT FROM  TmpDeleteCursor INTO @cTableName
	End

	Close TmpDeleteCursor
	DEALLOCATE TmpDeleteCursor
	*/
	If Not OBJECT_ID('EventosPendientes') IS NULL
	Begin
		--Delete From EventosPendientes Where rec_iidCuenta = @iCta
		Select Top 1 @iCtrl=[rae_idKey] From [_Datos].[dbo].[_RegistrosAEliminar] Where [rae_cTabla]='EventosPendientes' And [rae_iID]=@iCta
		If @iCtrl Is Null Or @iCtrl = 0
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Insert _RegistrosAEliminar EventosPendientes'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Insert Into _RegistrosAEliminar ([rae_cTabla],[rae_iID]) Values ('EventosPendientes', @iCta)
		End
	End 	

	If Not OBJECT_ID('EventosTimeLine') IS NULL
	Begin
		--Delete From EventosTimeLine Where etl_iCuenta = @iCta
		Select Top 1 @iCtrl=[rae_idKey] From [_Datos].[dbo].[_RegistrosAEliminar] Where [rae_cTabla]='EventosTimeLine' And [rae_iID]=@iCta
		If @iCtrl Is Null Or @iCtrl = 0
		Begin
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Insert _RegistrosAEliminar EventosTimeLine'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Insert Into _RegistrosAEliminar ([rae_cTabla],[rae_iID]) Values ('EventosTimeLine', @iCta)
		End
	End 
END TRY
BEGIN CATCH
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
END CATCH

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete p_reporte_autoridades'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From p_reporte_autoridades  Where rep_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete p_timer'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From p_timer  Where tim_iidcuenta = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete p_EventosTimer'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From p_EventosTimer  Where [pet_idCuenta] = @iCta

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete SmartMail_Program'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From SmartMail_Program  Where CueIid = @iCta

If Not OBJECT_ID('SmartPanic') IS NULL
Begin
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete SmartPanic'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Delete From SmartPanic  Where CuentaId = @iCta
End

If Not OBJECT_ID('DispositivoMovil') IS NULL
Begin
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete DispositivoMovil'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Delete From DispositivoMovil Where OwnerId = @iCta

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete EquipoDispositivoMovil'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Delete From EquipoDispositivoMovil  Where idCuenta = @iCta
	
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete GeoFenseCuenta'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT	
	Delete From GeoFenseCuenta  Where CuentaId = @iCta

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete Vehicle'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Delete From Vehicle  Where OwnerId = @iCta
End 	

If Not OBJECT_ID('SmartTrack') IS NULL
Begin
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete SmartTrack'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Delete From SmartTrack  Where CuentaId = @iCta

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete t_CheckPoints_VC'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Delete From _Tablas.dbo.t_CheckPoints_VC  Where chp_iCuenta = @iCta
	
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete VC_Route_Checkpoints'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Delete From VC_Route_Checkpoints Where RouteId In (Select Id From Vc_routes Where CuentaId = @iCta)

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete VC_Route_Programs'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Delete From VC_Route_Programs Where RouteId In (Select Id From Vc_routes Where CuentaId = @iCta)

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete VC_Routes'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Delete From VC_Routes  Where CuentaId = @iCta
End

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete p_heartbeats'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
Delete From p_heartbeats WHERE hbs_cIMEI = @cImei

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Update particion'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
UPDATE m_cuentas SET cue_nparticion = 0 Where cue_nparticion = @iCta

If Not OBJECT_ID('schedulerprograms') IS NULL
Begin
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Delete schedulerprograms'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	Delete From schedulerprograms Where CuentaId = @iCta

	--Delete From scheduler Where idcuenta= @iCta 
	Select Top 1 @iCtrl=[rae_idKey] From [_Datos].[dbo].[_RegistrosAEliminar] Where [rae_cTabla]='scheduler' And [rae_iID]=@iCta
	If @iCtrl Is Null Or @iCtrl = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | Insert _RegistrosAEliminar scheduler'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		Insert Into _RegistrosAEliminar ([rae_cTabla],[rae_iID]) Values ('scheduler', @iCta)
	End
End

Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_CuentaDelete] | FIN'
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

Set NoExec Off