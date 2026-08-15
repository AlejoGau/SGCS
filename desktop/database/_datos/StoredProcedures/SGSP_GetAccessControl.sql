CREATE OR ALTER PROCEDURE [dbo].[SGSP_GetAccessControl]
	@cMarca [VarChar](150) = '',
	@cModelo [VarChar](150) = '',
	@cDealer [VarChar](150) = '',
	@cCual [VarChar](10) = '',
	@iPlatform Int = 64

WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta el servicio de AccessControl para obetener configuracion del panel y custom commands si los tuviera
--Autor :Pablo O. Canónico
--Fecha :06/08/2019
--2023-05-02 : Pablo. Comandos en formato jSon (Library.AccessControlList usa cmd_iid, lo dejo para no modificar todo el servicio)
--2025-07-14 : Pablo. Controla si se recibe por parametros marca y modelo
Set NoCount On
BEGIN TRY
	Declare @cSQL [VarChar](max)  = ''

	If @cMarca = '' And @cModelo = ''
	Begin
		If @iPlatform = 64
		Begin
			Set @cMarca = 'Siera'',''HikVision'',''Dahua'
			Set @cModelo = 'SAC3000'',''HikvisionHPPAccessController'',''Access Controller'
		End
		Else
		Begin
			Set @cMarca = 'Intelektron'',''HikVision'
			Set @cModelo = 'ITKCOM'',''HikvisionAccessController'
		End
	End

	Set @cSQL =';With AccessControl As (
	Select [pan_iidcuenta],[pan_cConfig],Replace([rec_cdll],''PacketParser'',''AccessControl'') As cDll 
		From [dbo].[m_Paneles]  WITH (NOLOCK)
		Inner Join [_Tablas].[dbo].[T_ReceptorProtocolModel]  WITH (NOLOCK) On [rpm_idKey]=[pan_rpmidKey]
		Inner Join [dbo].[m_receptores_cab] WITH (NOLOCK) On [rpm_iReceptor] = [rec_iid]
		Inner Join [dbo].[m_cuentas] WITH (NOLOCK) On [cue_iid] = [pan_iidcuenta]
	Where [rpm_cMarca] IN('+CHAR(39)+@cMarca+CHAR(39)+') And [rpm_cModelo] IN('+CHAR(39)+@cModelo+CHAR(39)+') And [pan_cConfig]!='''' '

	If @cDealer!=''
		Set @cSQL += ' And [cue_clinea] IN('+CHAR(39)+Replace(@cDealer,',',CHAR(39)+','+CHAR(39))+CHAR(39)+')'

	If @cCual='Next'
		Begin
			Set @cSQL +=')
			Select [pan_iidcuenta],[pan_cConfig],'
			If @iPlatform = 64
				Set @cSQL +='Replace([cdll],''HikVision'',''HikVisionHPP'') As [cDll],'
			Else 
				Set @cSQL +='[cDll],'
			
			Set @cSQL +=' 0 As cmd_iid
				,Comandos = (Select IsNull([cmd_iid],0) As cmd_iid,IsNull([cmd_cValores],'''') As cmd_cValores,IsNull([cmd_nEstado],0) As cmd_nEstado,IsNull([cmd_cRespuesta],'''') As cmd_cRespuesta
				From [p_comandos_ip] Where [cmd_idCuenta]=[pan_iidcuenta] And [cmd_nEstado] = 1 AND [cmd_iEsCustom] = 2	Order By [cmd_tFechaHora] FOR JSON PATH, ROOT (''Comandos'') )		
				,UserABM = (Select [acc_idKey],[acc_iStatus],IsNull([usu_cnombre],''--Eliminado--'') As cNombre,IsNull([usu_cclave],'''') As cClave,IsNull([usu_ntipo],0) As nTipo,[acc_cIdExtendido],IsNull([usu_cidentificacion],[acc_cIdentificacion]) As cIdentificacion,[usu_iCodigo],Rtrim(Cast([usu_mobservacion] As VarChar(100))) As cObs,IsNull([usu_cimagen],'''') As cPicture  
				FROM [dbo].[m_UsuariosAccesos]
				Left Outer Join [_Datos].[dbo].[m_usuarios] On [usu_iidcuenta]=[acc_iCtaId] And [usu_idKey]=[acc_iUsuIdK]
				Where [acc_iCtaId]=[pan_iidcuenta] FOR JSON PATH, ROOT (''UsersAccess''))
				From AccessControl
				Order By [cDll],[pan_iidcuenta]'
		End
	Else
		Begin
			Set @cSQL +=')
			Select [pan_iidcuenta],[pan_cConfig],'
			If @iPlatform = 64
				Set @cSQL +='Replace([cdll],''HikVision'',''HikVisionHPP'') As [cDll],'
			Else 
				Set @cSQL +='[cDll],'

			Set @cSQL +=' 0 As cmd_iid,'''' As Comandos,'''' As UserABM
				From AccessControl
				Order By [cDll],[pan_iidcuenta]'

		End

	--Print @cSql
	Exec (@cSQL)

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