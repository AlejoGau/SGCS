CREATE OR ALTER PROCEDURE [dbo].[SGSP_AutoAsignaEventoAVC]
As
--AutoAsgina Eventos a VC segun configuracion del dealer
--Autor : Pablo O. Canónico
--Fecha : 23/07/2024
--2024-11-07 : Se agrego control para VC con cuenta desasignada
--2024-11-26 : Se agrego excepcion de registros asignados en estado 2
--2024-12-09 : Se agrego control para evitar asignar vc con evento cancelado
--2025-10-02 : Se elimino Update [_Datos].[dbo].[m_asignacion_movil]  para eventos ya asignados ( evita push recursivo )
--2025-10-03 : Se agrego control para estado de VC asignado o en camino amv_estado IN(1,11)

Set NoCount ON

BEGIN TRY
-- Aviso que la tarea esta funcionando
Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'AutoAsignaEventoAVC', @Repetition = 10
--	
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(max) = ''

DECLARE @TraceIDStr NVARCHAR(36);
-- Obtener como string (porque así se guardó)
SET @TraceIDStr = CONVERT(NVARCHAR(36), SESSION_CONTEXT(N'TraceID'));

-- Si nunca se seteó, @TraceID será NULL
IF @TraceIDStr IS NULL
BEGIN
	SET @TraceIDStr = CONVERT(NVARCHAR(36), NEWID());
	-- Opcional: guardarlo en el contexto para futuras llamadas en la misma sesión
	EXEC sp_set_session_context @key = N'TraceID', @value = @TraceIDStr;
END
	
Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | INICIO | '+@TraceIDStr
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

BEGIN TRY
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
								Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
END TRY
BEGIN CATCH
END CATCH;	

--Busco en EventosPendientes los registros taggeados que no tengan asignado un VC
Declare @cDealer Char(3) = '',
		@cCodAlarma Char(3) = ''
Declare @idRec Int = 0,
		@iStatus Int = 0,
		@iVigi Int = 0
Declare @rLatitud Decimal(18, 15) = 0,
		@rLongitud Decimal(18, 15) = 0
Declare @LatLng Varchar(30) = ''
Declare @nEstado Numeric(1) = 0

Declare cTagged CURSOR STATIC LOCAL READ_ONLY FORWARD_ONLY FOR 
	Select [rec_iid],[rec_cAlarma],[cue_clinea],IsNull([gps_rLatitud],0),IsNUll([gps_rLongitud],0),[cue_cLatLng],[rec_nEstado],
	iStatus = Isnull((Select amv_estado From [_Datos].[dbo].[m_asignacion_movil] Where amv_objecttypeid = 3113 And amv_rec_iid=[rec_iid]),0),
	iVigi = Isnull((Select amv_objectid From [_Datos].[dbo].[m_asignacion_movil] Where amv_objecttypeid = 3113 And amv_rec_iid=[rec_iid]),0)
		From [_Datos].[dbo].[EventosPendientes]
	Where [_Tagged]=1
	And [rec_nEstado] IN(0,1)
	--And [rec_iid] Not IN(Select amv_rec_iid From [_Datos].[dbo].[m_asignacion_movil] Where amv_objecttypeid = 3113 And amv_estado!=2)
	Order By rec_iid

Open cTagged
Fetch Next From cTagged Into @idRec,@cCodAlarma,@cDealer,@rLatitud,@rLongitud,@LatLng,@nEstado,@iStatus,@iVigi
While @@FETCH_STATUS = 0
Begin
	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | @idRec : '+Cast(@idRec As Varchar(10)) + ' | @cCodAlarma : '+@cCodAlarma +'| @iStatus : '+Cast(@iStatus As Varchar(10)) +'| @iVigi : '+Cast(@iVigi As Varchar(10))+'| @cDealer : '+@cDealer
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;	

	If @iStatus = 1 --Asignado
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | Ya esta asignado'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		Fetch Next From cTagged Into @idRec,@cCodAlarma,@cDealer,@rLatitud,@rLongitud,@LatLng,@nEstado,@iStatus,@iVigi
		Continue
	End

	Declare	@idKey Int = 0

	Select @idKey=[dealer_idKey]
		From [_Datos].[dbo].[m_dealer_vcconfig_desnormalized]
		Inner Join [_Datos].[dbo].[m_dealer_vcconfig] On [dvc_idKey]=[dealer_idKey]
	Where [dvc_cdealer]=@cDealer And [dvc_apptype]='VIGICONTROL'

	If @idKey Is Null
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | Dealer no tiene configurado auto asignacion de VC'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		Fetch Next From cTagged Into @idRec,@cCodAlarma,@cDealer,@rLatitud,@rLongitud,@LatLng,@nEstado,@iStatus,@iVigi
		Continue
	End

	--Busco si el codigo de alarma tiene codigos de autoproceso
	Declare @nearEnabled Int = 0,
			@nearDistance Int = 0
	Declare @operador Varchar(100) = ''

	Select @nearEnabled=[aa_nearEnabled],@nearDistance=[aa_nearDistance],@operador=[aa_operador]
	  From [_Datos].[dbo].[m_dealer_vcconfig_desnormalized]
		Cross Apply STRING_SPLIT([aa_eventos], ',')
		Where value = @cCodAlarma
		And [dealer_idKey]=@idKey

	If @operador Is Null Or @operador =''
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | La configuracion no contiene al codigo de alarma : '+@cCodAlarma+' , o falta configurar algun valor necesario' 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		Fetch Next From cTagged Into @idRec,@cCodAlarma,@cDealer,@rLatitud,@rLongitud,@LatLng,@nEstado,@iStatus,@iVigi
		Continue
	End

	if @nEstado=0
	Begin
		--Ejecutar SearchAtencionEventoAtender
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | Execute [_Desktop].[dbo].[SearchAtencionEventoAtender]'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
		--Se cambio para evitar el error An INSERT EXEC statement cannot be nested.   
		BEGIN TRY
			EXECUTE [_Desktop].[dbo].[SearchAtencionEventoAtender] @rec_iid=@idRec, @_UserId=@operador, @ReturnResult = 0   
		END TRY
		BEGIN CATCH
			Declare @Error Int = ERROR_NUMBER()
			Declare @Msg nVarchar(255) = ERROR_MESSAGE()
        
			Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | Execute [_Desktop].[dbo].[SearchAtencionEventoAtender] volvio con error : '+@Msg
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			BEGIN TRY
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
			END TRY
			BEGIN CATCH
			END CATCH;	

			Fetch Next From cTagged Into @idRec,@cCodAlarma,@cDealer,@rLatitud,@rLongitud,@LatLng,@nEstado,@iStatus,@iVigi
			Continue

		END CATCH
	End 

	Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | Evento Latitud : ' + Cast(@rLatitud As Varchar(30)) + ' | Evento Longitud : ' + Cast(@rLongitud As Varchar(30))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	BEGIN TRY
		INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
									Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
	END TRY
	BEGIN CATCH
	END CATCH;	

	--Buscar el VC Online mas cercano
	--Si tiene posicion el evento uso eso
	If @rLatitud = 0 Or @rLongitud = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | El evento no tiene Lat/Lng, Utilizo la posicion de la cuenta'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		If Len(Rtrim(@LatLng)) <= 3
		Begin
			Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | La cuenta no tiene Lat/Lng'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

			BEGIN TRY
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
			END TRY
			BEGIN CATCH
			END CATCH;	

			Fetch Next From cTagged Into @idRec,@cCodAlarma,@cDealer,@rLatitud,@rLongitud,@LatLng,@nEstado,@iStatus,@iVigi
			Continue
		End
		Else
		Begin
			Declare @comaIndex INT = CHARINDEX(',', @LatLng)

			Set @rLatitud = CONVERT(DECIMAL(18, 15), SUBSTRING(@LatLng, 1, @comaIndex - 1))
			Set @rLongitud = CONVERT(DECIMAL(18, 15), SUBSTRING(@LatLng, @comaIndex + 1, LEN(@LatLng) - @comaIndex))

			Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | Cuenta Latitud : ' + Cast(@rLatitud As Varchar(30)) + ' | Cuenta Longitud : ' + Cast(@rLongitud As Varchar(30))
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			
			BEGIN TRY
				INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
											Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
			END TRY
			BEGIN CATCH
			END CATCH;	

		End
	End

	--Tengo Lat-Lng busco el VC
	Declare	@iVC Int = 0
	-- Convertir las variables de latitud y longitud a un tipo geography
	Declare @targetPoint GEOGRAPHY = GEOGRAPHY::Point(@rLatitud, @rLongitud, 4326);

	If @nearEnabled=1
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | Control de cercanía esta habilitado | @nearDistance : ' + Cast(@nearDistance As Varchar(30))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | @iStatus : ' + Cast(@iStatus As Varchar(30))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		If (@iStatus=2 ) --Cancelado
		Begin
			-- Query para encontrar el ID más cercano dentro del radio especificado
			;WITH PosicionesGeography AS (
				Select 
					vcucs.vucs_vcid,
					GEOGRAPHY::Point(g.gps_rLatitud, g.gps_rLongitud, 4326) AS GeoPosition
				From [_Datos].[dbo].[SmartTrack] st
							INNER JOIN [_Datos].[dbo].[VigicontrolUserCurrentSession] vcucs ON (vcucs.vucs_vcid = st.Id)
							INNER JOIN [_Datos].[dbo].[m_usuarios] mu ON (vcucs.vucs_usuidkey = mu.usu_idkey)
							INNER JOIN [_Datos].[dbo].[m_cuentas] c ON (c.cue_iid = vcucs.vucs_cueiid)
							INNER JOIN [_Datos].[dbo].[p_GpsSP] g ON (g.gps_idCuenta= c.cue_iid And g.gps_cIMEI=st.Imei)
							--INNER JOIN [_Datos].[dbo].[smarttrack] s On s.Id=vcucs.vucs_vcid
							INNER JOIN [_Datos].[dbo].[smarttrack] s On s.Id=vcucs.vucs_vcid And vcucs.vucs_cueiid=s.CuentaId
							Where st.AppType = 'VIGICONTROL'
							AND [cue_clinea] = @cDealer
							AND st.Id Not In( Select amv_objectid From [_Datos].[dbo].[m_asignacion_movil] Where amv_objecttypeid = 3113 And amv_estado IN(1,11) )
							AND st.Id !=@iVigi
			)
			Select Top 1
				@iVC=vucs_vcid
			From
				PosicionesGeography
			Where
				GeoPosition.STDistance(@targetPoint) <= @nearDistance
			Order By 
				GeoPosition.STDistance(@targetPoint),vucs_vcid ;
		End
		Else
		Begin
			-- Query para encontrar el ID más cercano dentro del radio especificado
			;WITH PosicionesGeography AS (
				Select 
					vcucs.vucs_vcid,
					GEOGRAPHY::Point(g.gps_rLatitud, g.gps_rLongitud, 4326) AS GeoPosition
				From [_Datos].[dbo].[SmartTrack] st
							INNER JOIN [_Datos].[dbo].[VigicontrolUserCurrentSession] vcucs ON (vcucs.vucs_vcid = st.Id)
							INNER JOIN [_Datos].[dbo].[m_usuarios] mu ON (vcucs.vucs_usuidkey = mu.usu_idkey)
							INNER JOIN [_Datos].[dbo].[m_cuentas] c ON (c.cue_iid = vcucs.vucs_cueiid)
							INNER JOIN [_Datos].[dbo].[p_GpsSP] g ON (g.gps_idCuenta= c.cue_iid And g.gps_cIMEI=st.Imei)
							--INNER JOIN [_Datos].[dbo].[smarttrack] s On s.Id=vcucs.vucs_vcid
							INNER JOIN [_Datos].[dbo].[smarttrack] s On s.Id=vcucs.vucs_vcid And vcucs.vucs_cueiid=s.CuentaId
							Where st.AppType = 'VIGICONTROL'
							AND [cue_clinea] = @cDealer
							AND st.Id Not In( Select amv_objectid From [_Datos].[dbo].[m_asignacion_movil] Where amv_objecttypeid = 3113 And amv_estado IN(1,11) )
					)
			Select Top 1
				@iVC=vucs_vcid
			From
				PosicionesGeography
			Where
				GeoPosition.STDistance(@targetPoint) <= @nearDistance				
			Order By 
				GeoPosition.STDistance(@targetPoint),vucs_vcid ;
		End
	End
	Else
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | Control de cercanía esta deshabilitado' 
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	


		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | @iStatus : ' + Cast(@iStatus As Varchar(30))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	
		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		If (@iStatus=2 ) --Cancelado
		Begin
			-- Query para encontrar el ID más cercano dentro del radio especificado
			;WITH PosicionesGeography AS (
				Select 
					vcucs.vucs_vcid,
					GEOGRAPHY::Point(g.gps_rLatitud, g.gps_rLongitud, 4326) AS GeoPosition
				From [_Datos].[dbo].[SmartTrack] st
							INNER JOIN [_Datos].[dbo].[VigicontrolUserCurrentSession] vcucs ON (vcucs.vucs_vcid = st.Id)
							INNER JOIN [_Datos].[dbo].[m_usuarios] mu ON (vcucs.vucs_usuidkey = mu.usu_idkey)
							INNER JOIN [_Datos].[dbo].[m_cuentas] c ON (c.cue_iid = vcucs.vucs_cueiid)
							INNER JOIN [_Datos].[dbo].[p_GpsSP] g ON (g.gps_idCuenta= c.cue_iid And g.gps_cIMEI=st.Imei)
							--INNER JOIN [_Datos].[dbo].[smarttrack] s On s.Id=vcucs.vucs_vcid
							INNER JOIN [_Datos].[dbo].[smarttrack] s On s.Id=vcucs.vucs_vcid And vcucs.vucs_cueiid=s.CuentaId
							Where st.AppType = 'VIGICONTROL'
							AND [cue_clinea] = @cDealer
							AND st.Id Not In( Select amv_objectid From [_Datos].[dbo].[m_asignacion_movil] Where amv_objecttypeid = 3113 And amv_estado IN(1,11) )
							AND st.Id !=@iVigi
			)
			Select Top 1
				@iVC=vucs_vcid
			From
				PosicionesGeography
			Order By 
				GeoPosition.STDistance(@targetPoint),vucs_vcid ;
		End
		Else
		Begin
			-- Query para encontrar el ID más cercano dentro del radio especificado
			;WITH PosicionesGeography AS (
				Select 
					vcucs.vucs_vcid,
					GEOGRAPHY::Point(g.gps_rLatitud, g.gps_rLongitud, 4326) AS GeoPosition
				From [_Datos].[dbo].[SmartTrack] st
							INNER JOIN [_Datos].[dbo].[VigicontrolUserCurrentSession] vcucs ON (vcucs.vucs_vcid = st.Id)
							INNER JOIN [_Datos].[dbo].[m_usuarios] mu ON (vcucs.vucs_usuidkey = mu.usu_idkey)
							INNER JOIN [_Datos].[dbo].[m_cuentas] c ON (c.cue_iid = vcucs.vucs_cueiid)
							INNER JOIN [_Datos].[dbo].[p_GpsSP] g ON (g.gps_idCuenta= c.cue_iid And g.gps_cIMEI=st.Imei)
							--INNER JOIN [_Datos].[dbo].[smarttrack] s On s.Id=vcucs.vucs_vcid
							INNER JOIN [_Datos].[dbo].[smarttrack] s On s.Id=vcucs.vucs_vcid And vcucs.vucs_cueiid=s.CuentaId
							Where st.AppType = 'VIGICONTROL'
							AND [cue_clinea] = @cDealer
							AND st.Id Not In( Select amv_objectid From [_Datos].[dbo].[m_asignacion_movil] Where amv_objecttypeid = 3113 And amv_estado IN(1,11) )
					)
			Select Top 1
				@iVC=vucs_vcid
			From
				PosicionesGeography
			Order By 
				GeoPosition.STDistance(@targetPoint),vucs_vcid ;
		End

	End
	

	If @iVC Is Null Or @iVC = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | NO existen VC disponibles / o ya estan con eventos asignados'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		Fetch Next From cTagged Into @idRec,@cCodAlarma,@cDealer,@rLatitud,@rLongitud,@LatLng,@nEstado,@iStatus,@iVigi
		Continue
	End

	If @iStatus = 0
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | Insert Into [_Datos].[dbo].[m_asignacion_movil] | @iVC : '+Cast(@iVC As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		Insert Into [_Datos].[dbo].[m_asignacion_movil] ([amv_rec_iid],[amv_objecttypeid],[amv_objectid],[amv_estado],[amv_prioridad])
												Values ( @idRec,3113,@iVC,1,0)
	End
	/*
	Else
	Begin
		Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | El idRec ya fue asignado. Update [_Datos].[dbo].[m_asignacion_movil] | @iVC : '+Cast(@iVC As Varchar(10))+'| @idRec : '+Cast(@idRec As Varchar(10))+'| @iVigi : '+Cast(@iVigi As Varchar(10))
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		BEGIN TRY
			INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
										Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
		END TRY
		BEGIN CATCH
		END CATCH;	

		Update [_Datos].[dbo].[m_asignacion_movil] 
			Set [amv_estado]=1, [amv_objectid]=@iVC
		Where amv_objecttypeid = 3113
			And amv_rec_iid=@idRec
	End
	*/
	Fetch Next From cTagged Into @idRec,@cCodAlarma,@cDealer,@rLatitud,@rLongitud,@LatLng,@nEstado,@iStatus,@iVigi
End
Close cTagged
Deallocate cTagged

Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_AutoAsignaEventoAVC] | FIN ' + @TraceIDStr
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
BEGIN TRY
	INSERT INTO [_LogDB].[dbo].[Log4TSQL] ([Date], [Thread], [Level], [Logger], [Message], [Exception], [DbProcId], [DbSchema], [DbName], [DbServer])
								Values (Getdate(), @TraceIDStr, 'DEBUG', OBJECT_NAME(@@PROCID), @message, '', @@PROCID, schema_name(), db_name(), @@SERVERNAME )
END TRY
BEGIN CATCH
END CATCH;	

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

			PRINT 'Error Number  : ' + Cast(ERROR_NUMBER() As Varchar(10));
			PRINT 'Error Message : ' + ERROR_MESSAGE();
			PRINT 'Error Severity: ' + Cast(ERROR_SEVERITY() As Varchar(10));
			PRINT 'Error State   : ' + Cast(ERROR_STATE() As Varchar(10));
			PRINT 'Error Line    : ' + Cast(ERROR_LINE() As Varchar(10));
			PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
		End
END CATCH