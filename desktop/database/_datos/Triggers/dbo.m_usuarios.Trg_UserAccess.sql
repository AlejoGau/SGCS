CREATE OR ALTER TRIGGER [dbo].[Trg_UserAccess] ON [dbo].[m_usuarios] INSTEAD OF INSERT, UPDATE, DELETE As
Begin
  Declare @message nVarChar(Max) = '',
		  @StartDateTimeText VarChar(max) = ''

  Declare @iExecute Int = 0
  Select @iExecute=[par_ivalor] From [_Tablas].[dbo].[t_parametros] Where par_ccodigo ='_DISABLETRIGGER'
  Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
  Set @message = 'Start DateTime : %s | Trg_UserAccess | @iExecute ='+convert(varchar(10), @iExecute)
  RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

  --Determine if this is an INSERT,UPDATE, or DELETE Action or a "failed delete".
  Declare @Action As Char(1)
  Set @Action = (Case When EXISTS(Select * From inserted) And EXISTS(Select * From deleted) Then 'U'  -- Set Action to Updated.
                        When EXISTS(Select * From inserted) Then 'I'  -- Set Action to Insert.
                        When EXISTS(Select * From deleted) Then 'D'  -- Set Action to Deleted.
                        Else NULL -- Skip. It may have been a "failed delete".   
                    End)				
				
	Declare @iStatus Int = 0,	--1.Alta 2.Baja 3.Modificacion
			@iCtaId Int = 0,
			@idKey Int = 0,
			@cIdExtendido VarChar(10) = '',
			@usu_icodigo Int = 0,
			@countInserted Int = 0,
			@cidentificacionOld VarChar(255) = '',
			@cidentificacionNew VarChar(255) = ''

	Declare @iCuantos Int = 0

	If @Action Is Null
		Set @message = 'Start DateTime : %s | Trg_UserAccess | @Action NULL'
	Else
		Set @message = 'Start DateTime : %s | Trg_UserAccess | @Action : '+@Action


	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	If @Action = 'I'
	Begin
		Set @iStatus = 1
		Select @iCtaId = [usu_iidcuenta], @cIdExtendido = [usu_cIdExtendido], @idKey = [usu_idKey], @usu_icodigo = [usu_icodigo], @cidentificacionOld = IsNull([usu_cidentificacion],'')  From inserted
		Select @countInserted = count(*) From inserted
		/**-------------------------------
		Daniel O. Medina https://softguard.atlassian.net/browse/DS-191
		ocurría un error al agregar un usuario de unidad funcional. El error es que se violaba
		la clave única usu_iidcuenta-usu_icodigo
		*/
		if @usu_icodigo < 0 and @countInserted = 1
			begin
				Select @usu_icodigo = Max(usu_icodigo) + 1 From dbo.m_usuarios Where usu_iidcuenta = @iCtaId
				if @usu_icodigo is null
					Set @usu_icodigo = 1
			end
		/*-------------------------------*/
	End
	Else If @Action = 'D'
	Begin
		--Si estan borrando masivamente solo borra un idKey
		--Me fijo si son varios registros a eliminar
		Select @iCuantos = COUNT(*) FROM deleted

		Set @iStatus = 2
		Select @iCtaId = [usu_iidcuenta], @cIdExtendido = [usu_cIdExtendido], @idKey = [usu_idKey], @cidentificacionOld = IsNull([usu_cidentificacion],'') From deleted
	End
	Else If @Action = 'U'
	Begin
		Set @iStatus = 3
		Select @cidentificacionOld = IsNull([usu_cidentificacion],'') From deleted
		Select @iCtaId = [usu_iidcuenta], @cIdExtendido = [usu_cIdExtendido], @idKey = [usu_idKey], @cidentificacionNew = IsNull([usu_cidentificacion],'') From inserted
	End

	--Actualizo el cambio
	If @Action = 'I' 
	Begin
		/**
		Daniel O. Medina https://softguard.atlassian.net/browse/DS-191
		ocurría un error al agregar un usuario de unidad funcional. El error es que se violaba
		la clave única usu_iidcuenta/usu_icodigo

		en usu_icodigo asigno una variable @usu_icodigo 
		
		if @countInserted=1
			begin
				INSERT INTO [dbo].[m_usuarios]([usu_iidcuenta],[usu_icodigo],[usu_cnombre],[usu_iid],[usu_cclave],[usu_ntipo],[usu_cimagen],[usu_mobservacion],[usu_cIdExtendido],[usu_cmetadata],[usu_teliid],[usu_cidentificacion])
				Select [usu_iidcuenta],@usu_icodigo,[usu_cnombre],[usu_iid],[usu_cclave],[usu_ntipo],[usu_cimagen],[usu_mobservacion],[usu_cIdExtendido],[usu_cmetadata],[usu_teliid],[usu_cidentificacion] From inserted
			end
		Else
			begin
				INSERT INTO [dbo].[m_usuarios]([usu_iidcuenta],[usu_icodigo],[usu_cnombre],[usu_iid],[usu_cclave],[usu_ntipo],[usu_cimagen],[usu_mobservacion],[usu_cIdExtendido],[usu_cmetadata],[usu_teliid],[usu_cidentificacion])
				Select [usu_iidcuenta],[usu_icodigo],[usu_cnombre],[usu_iid],[usu_cclave],[usu_ntipo],[usu_cimagen],[usu_mobservacion],[usu_cIdExtendido],[usu_cmetadata],[usu_teliid],[usu_cidentificacion] From inserted
			end
		*/
		--Pablo 13-04-2023
	    INSERT INTO [dbo].[m_usuarios]([usu_iidcuenta],[usu_icodigo],[usu_cnombre],[usu_iid],[usu_cclave],[usu_ntipo],[usu_cimagen],[usu_mobservacion],[usu_cIdExtendido],[usu_cmetadata],[usu_teliid],[usu_cidentificacion])
				Select [usu_iidcuenta],Case When @countInserted=1 Then @usu_icodigo Else [usu_icodigo] End,[usu_cnombre],[usu_iid],[usu_cclave],[usu_ntipo],[usu_cimagen],[usu_mobservacion],[usu_cIdExtendido],[usu_cmetadata],[usu_teliid],[usu_cidentificacion] From inserted
			
		Select @idKey = SCOPE_IDENTITY()

	End
	Else If @Action = 'D'
	Begin
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Trg_UserAccess | @iCuantos '+convert(varchar(10), @iCuantos) + ' | @iCtaId '+convert(varchar(10), @iCtaId)
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		If @iCuantos = 1
			Delete [dbo].[m_usuarios] Where [usu_idKey] = @idKey
		Else
		Begin
			Delete mu 
			From [dbo].[m_usuarios] mu
			Inner Join deleted d On mu.usu_idKey = d.usu_idKey
		End
	End
	Else If @Action = 'U'
	Begin
		Update MU
		   SET MU.[usu_iidcuenta] = I.[usu_iidcuenta]
			  ,MU.[usu_icodigo] = I.[usu_icodigo]
			  ,MU.[usu_cnombre] = I.[usu_cnombre]
			  ,MU.[usu_iid] = I.[usu_iid]
			  ,MU.[usu_cclave] = I.[usu_cclave]
			  ,MU.[usu_ntipo] = I.[usu_ntipo]
			  ,MU.[usu_cimagen] = I.[usu_cimagen]
			  ,MU.[usu_mobservacion] = I.[usu_mobservacion]
			  ,MU.[usu_cIdExtendido] = I.[usu_cIdExtendido]
			  ,MU.[usu_cmetadata] = I.[usu_cmetadata]
			  ,MU.[usu_teliid] = I.[usu_teliid]
			  ,MU.[usu_cidentificacion] = I.[usu_cidentificacion]
			  ,MU.[usu_itipoidentificacion] = I.[usu_itipoidentificacion]
			  ,MU.[usu_email] = I.[usu_email]
		From [dbo].[m_usuarios] MU
		Join inserted I On I.[usu_idKey]=MU.[usu_idKey]
	End


	If @iExecute = 1
		Set NoExec On

	--Tiene que estar al final x que si es un INSERT no tengo el idKey hasta que realmente inserte
	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | Trg_UserAccess | @iStatus '+convert(varchar(10), @iStatus)
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
	--Es obligatorio que los usuarios para controles de acceso tengan cargado el campo [usu_cIdExtendido]
	If @iStatus > 0 And @iCtaId > 0 And @cIdExtendido != '' 
	Begin
		--2023-04-14 Pablo
		--Si es un Update del campo [usu_cidentificacion] desde el servicio no hay que grabar [m_UsuariosAccesos]
		If @Action = 'U' And ( @cidentificacionOld = '' And @cidentificacionNew != '' )
		Begin
			Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
			Set @message = 'Start DateTime : %s | Trg_UserAccess | Es actualizacion de cidentificacion desde el servicio. No haga nada con m_UsuariosAccesos'
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		End
		Else
		Begin
			--Tengo que verificar si la cuenta tiene Modelo Panel ITKCOM/HIK AC/HPP AC/Dahua AC
			If ( Select MP.[pan_idKey] From [_Datos].[dbo].[m_paneles] MP
				  Inner Join [_Tablas].[dbo].[t_paneles] TP On TP.[pan_ccodigo]=MP.[pan_ccodigo]
				  Inner JoIn [_Tablas].[dbo].[T_PanelesModelos] PM On PM.[pam_idKey]=TP.[pan_iModelo]
				  Where MP.[pan_iidcuenta]=@iCtaId And PM.[pam_idKey] In(8,9,11,12) ) > 0
			Begin
				/* 2023-04-12 Pablo
				Reemplace por MERGE para no tener decenas de registros antes varias modificaciones sin confirmar
					INSERT INTO [dbo].[m_UsuariosAccesos]([acc_iCtaId],[acc_cIdExtendido],[acc_iStatus])
					VALUES (@iCtaId, @cIdExtendido, @iStatus)
				*/
				Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
				Set @message = 'Start DateTime : %s | Trg_UserAccess | La cuenta esta configurada con tipo Acceso. Inserto/Actualizo en m_UsuariosAccesos'
				RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

				MERGE INTO [m_UsuariosAccesos] AS TGT
				USING ( Select @iCtaId As iCtaId, @cIdExtendido As cIdExtendido, @iStatus As iStatus, @idKey As iUsuIdK, @cidentificacionOld As cIdentificacion) AS SRC 
					ON TGT.[acc_iUsuIdK] = SRC.[iUsuIdK] And TGT.[acc_iStatus] = SRC.[iStatus]
					--ON TGT.[acc_iCtaId] = SRC.[iCtaId] --And TGT.[acc_cIdExtendido] = SRC.[cIdExtendido]
				WHEN MATCHED THEN
					UPDATE SET
						TGT.[acc_iCtaId] = SRC.[iCtaId],
						TGT.[acc_cIdExtendido] = SRC.[cIdExtendido],
						TGT.[acc_cIdentificacion] = SRC.[cIdentificacion]
 				WHEN NOT MATCHED THEN 
					INSERT ([acc_iCtaId],[acc_cIdExtendido],[acc_iStatus],[acc_iUsuIdK],[acc_cIdentificacion])
					VALUES (SRC.[iCtaId],SRC.[cIdExtendido],SRC.[iStatus],SRC.[iUsuIdK],SRC.[cIdentificacion]);
			End
		End
	End

	Set NoExec Off
End