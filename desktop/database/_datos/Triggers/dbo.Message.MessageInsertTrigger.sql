CREATE OR ALTER TRIGGER [dbo].[MessageInsertTrigger]
ON [dbo].[Message]
AFTER INSERT
AS

BEGIN
-- =============================================
-- Author:	Roman Rodrigo
-- Create date: 13/01/2017
-- Description:	Genera un mensaje de push cuando hay un nuevo mensaje a un SP
-- 2026-01-29 Pablo : se controla si @body = 'EVENT_IM_HERE'
-- =============================================
SET NOCOUNT ON;
declare @id int;
declare @typeid int;
declare @message varchar(128);
declare @idmessage int;
declare @metadata varchar(max) = '';
declare @rec_iid int;
declare @MessageType varchar(50);
declare @title varchar (50);
declare @notification_sound VARCHAR(255)='notification_push.wav'
Declare @body varchar(max) = ''

Declare @Text nVarChar(Max) = '',
		@StartDateTimeText nVarChar(max)=''

Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
Set @Text = 'Start DateTime : %s | [MessageInsertTrigger] Entre al trigger'
RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT

DECLARE @messageCursor as CURSOR;
 
SET @messageCursor = CURSOR FOR	
	select  Id, ToId, totypeid, [name], Customdata, eventoId, MessageType, [Body] from INSERTED

 
OPEN @messageCursor;
FETCH NEXT FROM @messageCursor INTO @idmessage, @id, @typeid, @message, @metadata, @rec_iid, @MessageType, @body ;
 
WHILE @@FETCH_STATUS = 0
BEGIN
	-- busco el token del smartpanic

	declare @token varchar(1024) = ''
	declare @idcuenta int = 0
	declare @tipo varchar(256)
	declare @appversion varchar(6)
	select @token = pushToken,@idcuenta = CuentaId, @tipo = Tipo, @appversion = substring(dbo.GetNumeric(appversion),0,7)  from _datos..SmartPanic where Id = @id
	
	-- me fijo si hay metadata
	-- no se agregan mas estos datos pedido por BC https://basecamp.com/2249105/projects/14758734/todos/363760111

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @Text = 'Start DateTime : %s | [MessageInsertTrigger] @appversion => '+@appversion+' | '+substring(@appversion,0,3)
	RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT
	
	if (@metadata <> '')
	BEGIN
		-- hay metadata parseo el json
		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @Text = 'Start DateTime : %s | [MessageInsertTrigger] Hay metadata parseo el json'
		RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT

		declare @cod_cdescripcion varchar(500) = ''
		declare @usu_cdescripcion varchar(500) = ''
		declare @zon_cdescripcion varchar(500) = ''

		select @usu_cdescripcion = usu_cnombre, @zon_cdescripcion = zon_cdescripcion, @idcuenta = r.rec_iidcuenta
			from p_recepcion r
			LEFT JOIN [_Datos].[dbo].[m_zonas] z ON z.zon_iidcuenta = r.rec_iidcuenta AND LTRIM(RTRIM(z.zon_ccodigo)) = LTRIM(RTRIM(r.rec_czona))      
			LEFT JOIN [_Datos].[dbo].[m_usuarios] u ON u.usu_iidcuenta = r.rec_iidcuenta AND u.usu_iid = r.rec_iusuario and u.usu_icodigo!=0    
			where rec_iid = @rec_iid

		SELECT @cod_cdescripcion = StringValue from dbo.parseJson(@metadata) WHERE NAME = 'cod_cdescripcion' ORDER BY element_ID DESC  
		select @message = @cod_cdescripcion 

		-- busco el sonido
		SELECT @notification_sound = ISNULL(StringValue,'notification_push.wav') from dbo.parseJson(@metadata) WHERE NAME = 'notification_sound' ORDER BY element_ID DESC 
		/*
		if (@usu_cdescripcion!= '')
			select @message = @message + ' | ' +@usu_cdescripcion
			
		if (@zon_cdescripcion!= '')	
			select @message = @message + ' | '+ @zon_cdescripcion 
		*/

		Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
		Set @Text = 'Start DateTime : %s | [MessageInsertTrigger] message quedo asi : '+@message
		RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT
	END
	
	if (@typeid = 3067 AND @token != '' AND @token is not null)
		BEGIN
			/*
			-- calculo la cantidad de mensajes pendientes y lo mando como badge
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @Text = 'Start DateTime : %s | [MessageInsertTrigger] Calculo la cantidad de mensajes pendientes y lo mando como badge'
			RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT
			*/
			declare @badge nvarchar(10) = ''
			declare @SIGNATURENOMBRE varchar(1024) = 'SmartPanics' 
			select  @SIGNATURENOMBRE = isnull(par_cvalor,'SmartPanics') from _tablas..t_parametros where par_ccodigo = 'SIGNATURENOMBRE';

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @Text = 'Start DateTime : %s | [MessageInsertTrigger] El badge lo calcula [createPushMessage]'
			RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT
			/*
			select @badge= cast(count(*) as nvarchar(10)) from _datos..Message where totypeid = 3067 and (Status not in ('3','2') or status is null) and toid = @id and (dateread < '1980-1-1' or dateread is null)
			*/

			declare @msgtype varchar(128) = 'NEW_MESSAGE'
			If @body = 'EVENT_IM_HERE'
			Begin
				select @msgtype = 'EVENT_IM_HERE'
				set @body = ''
			End
			Else
			Begin
				if @tipo = 'ANDROID' and @notification_sound !='notification_push.wav' and substring(@appversion,0,3) >='22'
					select @msgtype = 'NEW_DATAMESSAGE'
			End

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @Text = 'Start DateTime : %s | [MessageInsertTrigger] EXEC _desktop..[createPushMessage] con @msgType => '+@msgType
			RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT
			
			EXEC _desktop..[createPushMessage]
				@spId = @idmessage,
				--@spId = @id,
				@spToken = @token,
				@msgType = @msgtype,
				@badge = @badge,
				@title = @SIGNATURENOMBRE,
				@data = @message,
				@idcuenta = @idcuenta,
				@notification_sound = @notification_sound
		END


	/**
	 * BC 387098520 : Mensaje desde VigiControl al vigilador
	 * Debo realizar la busqueda del Token de sesión para el SmartTrack
	 */
	 -- busco el token del VigiControl
	if (@typeid = 3013)
		BEGIN
			SELECT @token = st.pushToken , @idcuenta = vucs_cueiid
			FROM [_Datos]..[SmartTrack] st
				INNER JOIN [_Datos]..[VigicontrolUserCurrentSession] vcucs ON (vcucs.vucs_vcid = st.Id)
				INNER JOIN [_Datos]..[m_usuarios] mu ON (vcucs.vucs_usuidkey = mu.usu_idkey)
			where usu_idKey = @id
		END
	if (@typeid = 3013 AND @token != '' AND @token is not null)
		BEGIN
			-- calculo la cantidad de mensajes pendientes y lo mando como badge
			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @Text = 'Start DateTime : %s | [MessageInsertTrigger] Calculo la cantidad de mensajes pendientes y lo mando como badge'
			RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT

			declare @badgeVC nvarchar(10) = ''			
			select @badgeVC = cast(count(*) as nvarchar(10)) 
			from _datos..Message 
			where totypeid = 3013 
				and (Status not in ('3','2') or status is null)
				and toid = @id and (dateread < '1980-1-1' or dateread is null)

			Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
			Set @Text = 'Start DateTime : %s | [MessageInsertTrigger] EXEC _desktop..[createPushMessage] con @msgType => NEW_DATAMESSAGE'
			RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT

			EXEC _desktop..[createPushMessage]
			@spId = @idmessage,
			@spToken = @token,
			@msgType = 'NEW_DATAMESSAGE',
			@badge = @badgeVC,
			@title = VigiControl,
			@data = @message,
			@idcuenta = @idcuenta

		END

	
	FETCH NEXT FROM @messageCursor INTO @idmessage, @id, @typeid, @message,@metadata,@rec_iid,@MessageType, @body ;
END
 
CLOSE @messageCursor;
DEALLOCATE @messageCursor;

Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
Set @Text = 'Start DateTime : %s | [MessageInsertTrigger] Sali del trigger'
RAISERROR( @Text, 10,1,@StartDateTimeText) WITH NOWAIT

End