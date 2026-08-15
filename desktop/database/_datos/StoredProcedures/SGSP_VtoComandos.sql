CREATE OR ALTER PROCEDURE [dbo].[SGSP_VtoComandos]
AS
--Pasa a vencido los comandos que no se enviaron en cierto tiempo configurado en un parametro
--Autor : Pablo O. Canónico
--Fecha : 06/05/2021
SET NOCOUNT ON

BEGIN TRY
	-- Aviso que la tarea esta funcionando
	Exec [dbo].[TaskStatus_SetLastExecutedTime] @JobName = N'VtoComandos', @Repetition = 4
	--
	SET DATEFIRST 7
	DECLARE @cSQL nVarChar(Max) = '',
		@message nVarChar(Max) = '',
		@StartDateTimeText VARCHAR(max) = ''

	Declare @iMinutos Int = ( Select par_ivalor From [_Tablas].[dbo].[t_parametros] With (NOLOCK) Where par_cCodigo='TIEMPOCOMANDOS')
	If @iMinutos Is Null Or @iMinutos < 2
		Set @iMinutos = 1440

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | VtoComandos | TIEMPOCOMANDOS => '+ Rtrim(Cast(@iMinutos As Varchar(10)))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	UPDATE [_Datos].[dbo].[p_comandos_ip]
		SET cmd_nEstado = 6
	WHERE cmd_nEstado = 1 AND DATEDIFF(MINUTE, cmd_tfechahora, getdate()) > @iMinutos
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