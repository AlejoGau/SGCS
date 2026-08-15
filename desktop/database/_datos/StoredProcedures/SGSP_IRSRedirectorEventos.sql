CREATE OR ALTER PROCEDURE [dbo].[SGSP_IRSRedirectorEventos]
	@iCuenta [int] = 0,
	@iRecID [int] = 0,
	@cAlarma Char(3) = ''
AS
--Redirector de Eventos para IRServices
--Autor : Pablo O. Canónico
--Fecha : 19/06/2017
--2020-12-23 : Se controla VERSIONREDIRECTOR
--2024-06-14 : Si es RedirectorSoftGuardWAAutomation se cambia de estado al evento
--2025-07-08 : Si es RedirectorE911 hay que ver si tiene activada la redireccion en la cuenta
Set NoCount ON
BEGIN TRY
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(Max) = ''

Declare @cDealer Char(3) = ''
--1ro. busco el dealer de la cuenta
Select @cDealer=cue_cLinea From m_cuentas Where cue_iid=@iCuenta

If @cDealer Is Null
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_IRSRedirectorEventos] | Busco el dealer de iCta ('+Cast(@iCuenta As Varchar(10))+') devolvio null'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

--2do. busco si hay Destino a los cuales redirigir el evento
Declare	@cHandlerURL nVarChar(1000)=''

Select Top 1 @cHandlerURL=rrd_cURL
	From _Tablas.dbo.t_ReDirector
	Inner Join _Tablas.dbo.t_ReDirectorDestino On rrd_idKey=trd_iDestino
	Where CHARINDEX(@cAlarma,trd_cEventos) > 0   And (trd_cDealer=@cDealer or trd_cDealer = '')

If @cHandlerURL Is Null Or @cHandlerURL=''
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_IRSRedirectorEventos] | No hay Destino al cual redirigir el evento'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End


--3ro. si hay que redirigir verifico la URL
Declare @cURLDesktop nVarChar(1000)= ( Select par_cValor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='URLDESKTOP' )
If Upper(Rtrim(@cURLDesktop)) = Upper('http://DesktopURL:PORT')
	Begin
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_IRSRedirectorEventos] | Falta configurar el parametro URLDESKTOP'
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Set NoExec On
	End

Declare @cParamURL nVarChar(10) = 'rec_iid'
Declare @idGps Int = 0
Declare @bE911Habilitado BIT = 0

--4to. si @iRecID viene con 0 quiere decir que es una posicion y no se guardo en pRecepcion por lo tanto tengo que informar el gps_iid en lugar de rec_iid
If @iRecID = 0
	Begin
		Select Top 1 @iRecID=[gps_iid] From p_posicionesGPS
			Where [gps_idCuenta] = @iCuenta And [gps_idRec] = 0
			Order By [gps_iid] Desc

		If @iRecID = 0
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_IRSRedirectorEventos] | @iRecID viene con 0 y No hay posiciones guardadas'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Set NoExec On
			End

		Set @cParamURL = 'gps_iid'
		Set @idGps = @iRecID
	End

--5to. si llego por parametro el tiRecId > 0 o se obtuvo el valor en el paso Cuarto puedo seguir
--Ver version del redirector    0=version remotecall (legacy)  1=Version redirector (new service)
Declare	@iVersion int = ( Select par_ivalor From _Tablas.dbo.t_parametros With (NOLOCK) Where par_cCodigo='VERSIONREDIRECTOR' )
Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
Set @message = 'Start DateTime : %s | [SGSP_IRSRedirectorEventos] | iVersion => '+ Cast(@iVersion As VarChar(10)) 
RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

If @iVersion = 0
Begin
	;WITH cReDirector 
	AS
	(Select rrd_cURL
		From _Tablas.dbo.t_ReDirector
		Inner Join _Tablas.dbo.t_ReDirectorDestino On rrd_idKey=trd_iDestino
		Where CHARINDEX(@cAlarma,trd_cEventos) > 0  And (trd_cDealer=@cDealer or trd_cDealer = '')
	)
	INSERT INTO [dbo].[RemoteCallQueue]
		Select 0 ,'HTTPGET',Ltrim(@cURLDesktop)+Ltrim(rrd_cURL)+'?'+@cParamURL+'='+Ltrim(Cast(@iRecID As Varchar(10))),Null,Null,Null,Null,Null
		From cReDirector 

End
Else
Begin
	--Para RedirectorE911 hay que ver si esta habilitado la redireccion en la cuenta
	Set @bE911Habilitado = (Select Case When ISNULL(cue_iStatusRD, 0) = 1 Then 1 Else 0 End From _Datos.Dbo.m_CuentasXtraInfo Where cue_iidCuenta = @iCuenta)

	;WITH cReDirector 
	AS
	(Select trd_idKey,rrd_cURL
		From _Tablas.dbo.t_ReDirector
		Inner Join _Tablas.dbo.t_ReDirectorDestino On rrd_idKey=trd_iDestino
		Where CHARINDEX(@cAlarma,trd_cEventos) > 0  And (trd_cDealer=@cDealer or trd_cDealer = '')
		      And ( rrd_cURL NOT LIKE '%RedirectorE911%'  Or (rrd_cURL LIKE '%RedirectorE911%' And @bE911Habilitado = 1) )
	)
	INSERT INTO [dbo].[RedirectorQueue] ([rdq_iReDirector], [rdq_idRec], [rdq_idGps], [rdq_tFechaHora], [rdq_cLlamado], [rdq_cRespuesta])  
		Select trd_idKey,Case When @idGps=0 Then @iRecID Else 0 End,@idGps,Getdate(), Ltrim(@cURLDesktop)+Ltrim(rrd_cURL)+'?'+@cParamURL+'='+Ltrim(Cast(@iRecID As Varchar(10))),Null 
		From cReDirector 

		If @iRecID > 0
		Begin
			Declare @Exists Int = 0
			Select Top 1 @Exists=[trd_idkey]
				From _Tablas.dbo.t_ReDirector
				Inner Join _Tablas.dbo.t_ReDirectorDestino On rrd_idKey=trd_iDestino
				Where CHARINDEX(@cAlarma,trd_cEventos) > 0  And (trd_cDealer=@cDealer or trd_cDealer = '') And [rrd_cNombre]='RedirectorSoftGuardWAAutomation'
	
			IF @Exists > 0
			Begin
				Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | [SGSP_IRSRedirectorEventos] | Se dispara RedirectorSoftGuardWAAutomation. Hay que cambiar estado del evento'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				Declare @Obs nVarchar(max) = ''
				Declare @iEstado Int = 0
				Select @Obs=rec_cobservaciones, @iEstado=rec_nestado From [_Datos].[dbo].[p_recepcion] Where rec_iid = @iRecId
				
				If @iEstado = 0 -- Evento Nuevo/Pendiente	
				Begin
					Declare @cObservaciones nVarchar(Max)
					Declare @translation nVarchar(Max)=''

					Execute [_Desktop].[dbo].[LocalizationGetLocale] @Name = N'En Espera Automaticamente aguardando notificacion por WhatsApp ', @soloOutput=1, @translation = @translation OUTPUT
					Set @cObservaciones = '['+Convert(Varchar, GetDate(), 103)+' ' +Substring(Convert(Varchar, GetDate(), 114), 1, 5)+  '] [Sistema] '+ Rtrim(@translation)

					Set @StartDateTimeText = CONVERT(varchar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | SGSP_IRSRedirectorEventos | Update => '+ @cObservaciones
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

					If (@Obs Is Not Null And @Obs != '')
						Set @Obs += Char(13) + @cObservaciones
					Else
						Set @Obs = @cObservaciones
					
					Declare @iMinutosEspera Int = 0
					Select @iMinutosEspera=par_ivalor From [_Tablas].[dbo].[t_parametros] Where [par_ccodigo] = 'TIEMPOREDIRECTORWA'
					
					If (@iMinutosEspera Is null Or @iMinutosEspera=0)
						Set @iMinutosEspera = 10

					Update p_recepcion	
						Set rec_nEstado=2, rec_cObservaciones=@Obs, rec_iMinutosEspera=@iMinutosEspera
					Where rec_iid = @iRecId
				End
				Else
				Begin
					Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
					Set @message = 'Start DateTime : %s | [SGSP_IRSRedirectorEventos] | El evento no esta pendiente. Estado =>' + Cast(@iEstado As Char(1))
					RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				End
			End
		End
End

Set NoExec Off		
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