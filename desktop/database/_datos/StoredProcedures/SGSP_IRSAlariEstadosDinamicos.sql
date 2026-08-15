CREATE OR ALTER PROCEDURE [dbo].[SGSP_IRSAlariEstadosDinamicos]
	@iCuenta [int] = 0,
	@cEvt nVarChar(10) = '',
	@iGenera [int] = 0 OUTPUT
AS
--Analizador de Eventos con estados dinamicos para IRServices EXCLUSIVO para la dll de Alari
--Autor : Pablo O. Canónico
--Fecha : 08/08/2017

Set NoCount ON
BEGIN TRY
Declare @message nVarChar(Max) = '',
	    @StartDateTimeText VarChar(Max) = ''

Declare @cCodigo nVarChar(10)=''
Declare @iValor Int=0

Set @cEvt = Right(Rtrim(@cEvt),2)
Declare @iEvt Int = ( Select ( Case When @cEvt='00' Then 0 When @cEvt='01' Then 1 When @cEvt='02' Then 2
								When @cEvt='03' Then 3 When @cEvt='04' Then 4 When @cEvt='05' Then 5 
								When @cEvt='06' Then 6 When @cEvt='07' Then 7 When @cEvt='08' Then 8
								When @cEvt='09' Then 9 When @cEvt='0A' Then 10 When @cEvt='0B' Then 11 
								When @cEvt='0C' Then 12 When @cEvt='0D' Then 13 When @cEvt='0E' Then 14
								When @cEvt='0F' Then 15 Else 0 End ) )

--Primero hay que consultar el estado actual por idCta
Select @iValor = [ped_iValor]
	FROM [_Datos].[dbo].[p_EstadosDinamicos]
	Where [ped_iCtaId]=@iCuenta And [ped_cCodigo]= '_UltEvt'

--Actualizo con ultimo valor
MERGE INTO [dbo].[p_EstadosDinamicos] AS TGT
USING ( Select '_UltEvt' As cCodigo, @iEvt As iValor, @iCuenta As iCtaId) AS SRC 
		ON TGT.[ped_iCtaId] = SRC.[iCtaId] And TGT.[ped_cCodigo] = SRC.[cCodigo]
WHEN MATCHED THEN
	UPDATE SET
		TGT.[ped_iValor] = SRC.[iValor]
WHEN NOT MATCHED THEN 
	INSERT ([ped_cCodigo],[ped_iValor],[ped_iCtaId])
	VALUES (SRC.[cCodigo],SRC.[iValor],SRC.[iCtaId]);

--Tercero comparar iValor con el Hex2Dec del evento recibido
If @iValor <> @iEvt
	Set @iGenera = 1

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