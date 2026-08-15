CREATE OR ALTER PROCEDURE [dbo].[IPRS_GetVehicleDomain]
	@Patente [nVarChar](20) = '',
	@cue_iid [int] = 0 OUTPUT,
	@cue_clinea [Char](3) = '' OUTPUT,
	@cue_cProvincia [Char](3) = '' OUTPUT
AS
--Es el store que ejecuta IPRS_packetProcesor para obetener el idCta de una patente. Esta separado porque usa comandos de SQL2012 o superior
--Autor :Pablo O. Canónico
--Fecha :07/10/2021
--2024-12-20 Pablo : se agrego control para evitar cuentas tipo LPR => Not (tip_nTipo=13 And tip_nCondicion=6)

Set NoCount On

BEGIN TRY
	Declare @message VarChar(Max) = '',
			@StartDateTimeText VarChar(Max) = '',
			@cComando VarChar(200) = ''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_GetVehicleDomain] Resuelvo Patente'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	/*				
	Select Top 1 @cue_iid=[cue_iid],@cue_clinea=cue_clinea,@cue_cProvincia=cue_cProvincia
		From [_Datos].[dbo].[m_cuentas]
	Where cue_iid In (Select [usu_iidcuenta] From [_Datos].[dbo].[m_usuarios]
						Where [usu_iidcuenta]>0 And [usu_cmetadata] Like '%"domain"%' 
						And Cast(JSON_VALUE([usu_cmetadata],'$.domain') As Varchar(10))=@Patente)
	*/

	Select Top 1 @cue_iid=[cue_iid],@cue_clinea=cue_clinea,@cue_cProvincia=cue_cProvincia
		From [_Datos].[dbo].[m_cuentas]
		Inner Join [_Tablas].[dbo].[t_tipos] On tip_ccodigo=cue_ctipo
	Where Not (tip_nTipo=13 And tip_nCondicion=6)
		And cue_iid In (Select [usu_iidcuenta] From [_Datos].[dbo].[m_usuarios]
						Where [usu_iidcuenta]>0 
						And [usu_cmetadata] Like '%"domain"%' 
						And ISJSON(usu_cmetadata) = 1 
						And Cast(JSON_VALUE([usu_cmetadata],'$.domain') As Varchar(10))=@Patente)
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
	print 'ROLLBACK'
	IF @@TRANCOUNT>0
		ROLLBACK TRAN

END CATCH