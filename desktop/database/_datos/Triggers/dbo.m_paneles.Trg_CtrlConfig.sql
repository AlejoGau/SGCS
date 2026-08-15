CREATE OR ALTER TRIGGER [dbo].[Trg_CtrlConfig] ON [dbo].[m_paneles] INSTEAD OF INSERT, UPDATE As
Begin
  Declare @message nVarChar(Max) = '',
		  @StartDateTimeText VarChar(max) = ''

  --Determine if this is an INSERT,UPDATE Action 
  Declare @Action As Char(1)
  Set @Action = (Case When EXISTS(Select * From inserted) And EXISTS(Select * From deleted) Then 'U'  -- Set Action to Updated.
                        When EXISTS(Select * From inserted) Then 'I'  -- Set Action to Insert.
                        Else NULL -- Skip. It may have been a "failed delete".   
                    End)				

	If @Action Is Null
		Set @message = 'Start DateTime : %s | Trg_CtrlConfig | @Action NULL'
	Else
		Set @message = 'Start DateTime : %s | Trg_CtrlConfig | @Action : '+@Action

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Declare @idKey Int = 0
	Declare @cConfig NVarchar(max) = ''

	--Filtro por Dahua-Access Controller
	Select @idKey = [pan_idKey], @cConfig = LEFT([pan_cConfig], CHARINDEX('\"User\":', [pan_cConfig]) - 1) From inserted
		Inner Join [_Tablas].[dbo].[T_ReceptorProtocolModel] WITH (NOLOCK) On [rpm_idKey]=[pan_rpmidKey]
	Where [pan_cConfig] !='' And [rpm_cMarca]='Dahua' And [rpm_cModelo]='Access Controller'

	Declare @iGrabo Int = 1
	--Si existe verifico que el contenido de @cConfig no exista en otro panel
	If @idKey>0
	Begin
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | Trg_CtrlConfig | @cConfig : '+@cConfig
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		If NOT EXISTS (	Select 1
			From [m_paneles]
			Inner Join [_Tablas].[dbo].[T_ReceptorProtocolModel] pm  WITH (NOLOCK) On [rpm_idKey]=[pan_rpmidKey]
			Where [pan_cConfig] !='' and rpm_cMarca='Dahua' and rpm_cModelo='Access Controller'
				And [pan_cConfig] Like '%'+@cConfig+'%'
				AND [pan_idKey] <> @idkey -- Evitar comparar el mismo registro
		)
		BEGIN
			Set @message = 'Start DateTime : %s | Trg_CtrlConfig | No hay duplicados : '+@cConfig
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
		END
		ELSE
		BEGIN
			Set @message = 'Start DateTime : %s | Trg_CtrlConfig | Ya existe : '+@cConfig
			RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
			Set @iGrabo = 0
		END
	End


	If @iGrabo = 0
		Raiserror('%s',0,1,'Configuracion ya existe. No se puede grabar!!!')
	Else
	Begin
		--Actualizo el cambio
		If @Action = 'I' 
		Begin
			INSERT INTO [dbo].[m_paneles]([pan_iidcuenta],[pan_ccodigo],[pan_mubicacion],[pan_ccallerid1],[pan_ccallerid2],[pan_ccallerid3]
					   ,[pan_ccallerid4],[pan_ccallerid5],[pan_nmostrar],[pan_csender],[pan_cNroSim1]
					   ,[pan_cCompania1],[pan_cNroSim2],[pan_cCompania2],[pan_cGPRS],[pan_cRemoteIP],[pan_iRemotePort],[pan_iReceptor]
					   ,[pan_cConfig],[pan_rpmidKey],[pan_iTipoCom],[pan_cClavePanel],[pan_cModemSMS])
			Select [pan_iidcuenta],[pan_ccodigo],[pan_mubicacion],[pan_ccallerid1],[pan_ccallerid2],[pan_ccallerid3]
					   ,[pan_ccallerid4],[pan_ccallerid5],[pan_nmostrar],[pan_csender],[pan_cNroSim1]
					   ,[pan_cCompania1],[pan_cNroSim2],[pan_cCompania2],[pan_cGPRS],[pan_cRemoteIP],[pan_iRemotePort],[pan_iReceptor]
					   ,[pan_cConfig],[pan_rpmidKey],[pan_iTipoCom],[pan_cClavePanel],[pan_cModemSMS] From inserted
		End
		Else If @Action = 'U'
		Begin
			UPDATE MP
			   SET MP.[pan_iidcuenta] = I.[pan_iidcuenta]
				  ,MP.[pan_ccodigo] = I.[pan_ccodigo]
				  ,MP.[pan_mubicacion] = I.[pan_mubicacion]
				  ,MP.[pan_ccallerid1] = I.[pan_ccallerid1]
				  ,MP.[pan_ccallerid2] = I.[pan_ccallerid2]
				  ,MP.[pan_ccallerid3] = I.[pan_ccallerid3]
				  ,MP.[pan_ccallerid4] = I.[pan_ccallerid4]
				  ,MP.[pan_ccallerid5] = I.[pan_ccallerid5]
				  ,MP.[pan_nmostrar] = I.[pan_nmostrar]
				  ,MP.[pan_csender] = I.[pan_csender]
				  ,MP.[pan_cNroSim1] = I.[pan_cNroSim1]
				  ,MP.[pan_cCompania1] = I.[pan_cCompania1]
				  ,MP.[pan_cNroSim2] = I.[pan_cNroSim2]
				  ,MP.[pan_cCompania2] = I.[pan_cCompania2]
				  ,MP.[pan_cGPRS] = I.[pan_cGPRS]
				  ,MP.[pan_cRemoteIP] = I.[pan_cRemoteIP]
				  ,MP.[pan_iRemotePort] = I.[pan_iRemotePort]
				  ,MP.[pan_iReceptor] = I.[pan_iReceptor]
				  ,MP.[pan_cConfig] = I.[pan_cConfig]
				  ,MP.[pan_rpmidKey] = I.[pan_rpmidKey]
				  ,MP.[pan_iTipoCom] = I.[pan_iTipoCom]
				  ,MP.[pan_cClavePanel] = I.[pan_cClavePanel]
				  ,MP.[pan_cModemSMS] = I.[pan_cModemSMS]
			From [dbo].[m_paneles] MP
			Join inserted I On I.[pan_idKey]=MP.[pan_idKey]
 		End
	End

End