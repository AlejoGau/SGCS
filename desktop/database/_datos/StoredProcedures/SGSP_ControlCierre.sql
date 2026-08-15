CREATE OR ALTER PROCEDURE [dbo].[SGSP_ControlCierre]
	@idCta [int]=0,
	@iRecId [int]=0
AS
--Verifica el control de cierre por dealer
--Autor : Pablo O. Canónico
--Fecha : 23/05/2022

Set NoCount ON
BEGIN TRY
	Declare @cAlarmaEsperada Char(3),
		    @cAlarmaAGenerar Char(3)
	Declare @iMinutos Int = 0

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''
	--Query
	Select @iMinutos=[lin_iMinutosControlCDDA]
	  From [_Tablas].[dbo].[t_lineas]
	Inner Join [_Datos].[dbo].[m_cuentas] On [lin_ccodigo]=[cue_clinea]
	Inner Join [_Datos].[dbo].[m_status] On [sta_iidcuenta]=[cue_iid]
	  Where [cue_iid]=@idCta And [sta_nEstado] = 1 And [lin_iControlaCierreDespuesDeApertura]=1

	--Si el query trae algun valor
	If ( @iMinutos Is Not  Null ) 
	Begin
		Declare @tLimite Datetime = DATEADD(MINUTE,@iMinutos,GetDate())
		
		Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
		Set @message = 'Start DateTime : %s | [SGSP_ControlCierre] | Grabacion de [p_CtrlCierre] | IdCuenta => '+ Rtrim(Cast(@idCta As Varchar(10)))+' | RecId => '+ Rtrim(Cast(@iRecId As Varchar(10)))+' | FechaHora Limite => '+ Rtrim(Convert(VarChar, @tLimite,120) )
		RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

		/*
		Insert Into [_Datos].[dbo].[p_CtrlCierre] ([ctc_iCta],[ctc_tFechaHora],[ctc_iRecId])
			Values (@idCta,@tLimite,@iRecId)
		*/

		MERGE INTO [_Datos].[dbo].[p_CtrlCierre] AS TGT
		USING ( Select @idCta As _iCta, @tLimite As _tFechaHora, @iRecId As _iRecId ) AS SRC 
			ON TGT.[ctc_iCta] = SRC.[_iCta]
		WHEN MATCHED THEN
			UPDATE SET
				TGT.[ctc_tFechaHora] = SRC.[_tFechaHora],
				TGT.[ctc_iRecId] = SRC.[_iRecId]
 		WHEN NOT MATCHED THEN 
			INSERT ([ctc_iCta],[ctc_tFechaHora],[ctc_iRecId])
			VALUES (SRC.[_iCta],SRC.[_tFechaHora],SRC.[_iRecId]);

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