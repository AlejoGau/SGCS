CREATE OR ALTER PROCEDURE [dbo].[SGSP_ReSendEventos]
AS
--Reenvio de eventos en caso de falla.Inicialmente para Soflex
--Autor : Pablo O. Canónico
--Fecha : 15/08/2023

Set NoCount ON
BEGIN TRY
	Declare @Now datetime = GetDate()
	Declare @Menos24Horas VarChar(19) = ( Select CONVERT(CHARACTER, DATEADD(HOUR,-24,@Now), 120) )

	;WITH UpdateRQ
	AS
	( SELECT [rdq_idKey],[rdq_iStatus],[rdq_tStatusExec],[rdq_iReSend],[rdq_tReSendExec]
	  FROM [_Datos].[dbo].[RedirectorQueue]
		INNER JOIN [_Tablas].[dbo].[t_ReDirector] On  [rdq_iReDirector]=[trd_idKey]
		INNER JOIN [_Tablas].[dbo].[t_ReDirectorDestino] ON [trd_iDestino]=[rrd_idKey]
		WHERE Upper(rrd_cnombre) = Upper('RedirectorSoflex')
		And [rdq_cRespuesta] Not Like '%result":"ok"%'
		And [rdq_tFechaHora] > @Menos24Horas )
	UPDATE UpdateRQ
	Set [rdq_iStatus]=0,
		[rdq_tStatusExec]=@Now,
		[rdq_iReSend]=[rdq_iReSend]+1,
		[rdq_tReSendExec]=@Now

	;WITH UpdateRQ0
	AS
	( SELECT [rdq_idKey],[rdq_iStatus],[rdq_tStatusExec],[rdq_iReSend],[rdq_tReSendExec]
	  FROM [_Datos].[dbo].[RedirectorQueue]
		WHERE [rdq_iReDirector]=0
		And [rdq_cRespuesta] Not Like '%result":"ok"%'
		And [rdq_tFechaHora] > @Menos24Horas )
	UPDATE UpdateRQ0
	Set [rdq_iStatus]=0,
		[rdq_tStatusExec]=@Now,
		[rdq_iReSend]=[rdq_iReSend]+1,
		[rdq_tReSendExec]=@Now
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