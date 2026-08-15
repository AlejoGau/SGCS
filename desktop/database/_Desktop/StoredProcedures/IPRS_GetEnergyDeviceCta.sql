CREATE OR ALTER PROCEDURE [dbo].[IPRS_GetEnergyDeviceCta]
	@cDeviceID [nVarChar](100) = '',
	@cue_iid [int] = 0 OUTPUT,
	@cue_clinea [Char](3) = '' OUTPUT,
	@cue_cProvincia [Char](3) = '' OUTPUT
AS
--Es el store que ejecuta IPRS_packetProcesor para obetener el idCta de un panel de energia
--Autor :Pablo O. Canónico
--Fecha :06/09/2023

Set NoCount On

BEGIN TRY
	Declare @message VarChar(Max) = '',
			@StartDateTimeText VarChar(Max) = '',
			@cComando VarChar(200) = ''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [IPRS_GetEnergyDeviceCta] Busco idCta'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Select Top 1 @cue_iid=[ped_idCta],@cue_clinea=cue_clinea,@cue_cProvincia=cue_cProvincia
		From [_Datos].[dbo].[p_EnergyDevices]
		Inner Join [_Datos].[dbo].[m_cuentas] WITH (NOLOCK) On [cue_iid]=[ped_idCta] 
	Where [ped_cDeviceID] = @cDeviceID
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