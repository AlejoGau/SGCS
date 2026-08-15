CREATE OR ALTER PROCEDURE [dbo].[SGSP_GenerateCommand]
	@idCta [int] = 0,
	@cReference [varchar](100) = '',
	@iReceptor [int] = 0
AS
--Es el store que ejecuta IPRS_packetProcesor para obetener la clave del panel y generar un comando a futuro
--Autor :Pablo O. Canónico
--Fecha :02/11/2021

Set NoCount On

BEGIN TRY
	Declare @message VarChar(Max) = '',
			@StartDateTimeText VarChar(Max) = ''

	Set @StartDateTimeText = Convert(VarChar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_GenerateCommand] Busco clave del panel'
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT
				
	Declare @cClavePanel VarChar(20) = ''
	Select @cClavePanel=[pan_cClavePanel]
		From [_Datos].[dbo].[m_paneles]
	Where [pan_iidcuenta]=@idCta 

	If @cClavePanel!='' And @cClavePanel Is Not Null
	Begin
		Set @message = 'Start DateTime : %s | [SGSP_GenerateCommand] Clave panel : ' + @cClavePanel
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		Declare @FechaHora DateTime = DATEADD(SECOND, 30, Getdate())
		Insert Into [_Datos].[dbo].[p_comandos_ip]
				   ([cmd_tfechahora]
				   ,[cmd_idCuenta]
				   ,[cmd_idReceptor]
				   ,[cmd_iComando]
				   ,[cmd_cValores]
				   ,[cmd_nEstado]
				   ,[cmd_cObservaciones]
				   ,[cmd_iEsCustom]
				   )
			 Values
				   (@FechaHora
				   ,@idCta
				   ,@iReceptor
				   ,0
				   ,'$IMG['+@cClavePanel+'|'+@cReference+']'
				   ,1
				   ,'Login para solicitar imagen'
				   ,0
				   )
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
	print 'ROLLBACK'
	IF @@TRANCOUNT>0
		ROLLBACK TRAN

END CATCH