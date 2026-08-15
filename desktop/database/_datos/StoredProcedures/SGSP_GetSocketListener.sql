CREATE OR ALTER PROCEDURE [dbo].[SGSP_GetSocketListener]
	@cMarca [VarChar](150) = '',
	@cModelo [VarChar](150) = '',
	@cDealer [VarChar](150) = '',
	@cCual [VarChar](10) = ''

WITH EXECUTE AS CALLER
AS
--Es el store que ejecuta el servicio de SokcetListener para obetener configuracion del panel y custom commands si los tuviera
--Autor :Pablo O. Canónico
--Fecha :01/12/2022
--
Set NoCount On
BEGIN TRY
	Declare @cSQL [VarChar](max)  = ''

	If @cMarca=''
	Begin 
		Set @cMarca = 'KSENIA'
		Set @cModelo = 'KseniaWsock'
	End 

	Set @cSQL =';With Listener As (
	Select [pan_iidcuenta],[pan_cConfig],Replace([rec_cdll],''PacketParser'',''Listener'') As cDll 
		From [dbo].[m_Paneles]  WITH (NOLOCK)
		Inner Join  [_Tablas].[dbo].[T_ReceptorProtocolModel]  WITH (NOLOCK) On [rpm_idKey]=[pan_rpmidKey]
		Inner Join [dbo].[m_receptores_cab] WITH (NOLOCK) On [rpm_iReceptor] = [rec_iid]
		Inner Join [dbo].[m_cuentas] WITH (NOLOCK) On [cue_iid] = [pan_iidcuenta]
	Where [rpm_cMarca] IN('+CHAR(39)+@cMarca+CHAR(39)+') And [rpm_cModelo] IN('+CHAR(39)+@cModelo+CHAR(39)+') And [pan_cConfig]!='''' '

	If @cDealer!=''
		Set @cSQL += ' And [cue_clinea] IN('+CHAR(39)+Replace(@cDealer,',',CHAR(39)+','+CHAR(39))+CHAR(39)+')'

	If @cCual='Next'
		Begin
			Set @cSQL +=')
			Select [pan_iidcuenta],[pan_cConfig],[cDll], IsNull([cmd_iid],0) As cmd_iid,IsNull([cmd_cValores],'''') As cmd_cValores,IsNull([cmd_nEstado],0) As cmd_nEstado,IsNull([cmd_cRespuesta],'''') As cmd_cRespuesta
				From Listener
			Left Outer Join [p_comandos_ip] On [cmd_idCuenta]=[pan_iidcuenta] And [cmd_nEstado] = 1 AND [cmd_iEsCustom] = 3
				Order By [cDll],[pan_iidcuenta],[cmd_tFechaHora]'
		End
	Else
		Begin
			Set @cSQL +=')
			Select [pan_iidcuenta],[pan_cConfig],[cDll], 0 As cmd_iid, '''' As cmd_cValores, 0 As cmd_nEstado, '''' As cmd_cRespuesta
				From Listener
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