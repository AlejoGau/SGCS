CREATE OR ALTER PROCEDURE [dbo].[SGSP_FillEventosIngEgr]
	@iRecId [int]=0,
	@idCta [int]=0,
	@cObs [nvarchar](max)=''

AS
--Inserta eventos de ingreso/egreso
--Autor : Pablo O. Canónico
--Fecha : 23/12/2024

Set NoCount ON
BEGIN TRY
	Set DATEFORMAT DMY
	Declare @tFechaHora Datetime
	Declare @cMatricula nVarchar(10) = '',
			@cUnidadFuncional nVarchar(10) = '',
			@cVecino nVarchar(100) = '',
			@cTransito nVarchar(20) = '',
			@cUsuario nVarchar(100) = ''

	Declare @message nVarChar(Max) = '',
			@StartDateTimeText VarChar(max) = ''

	Set @StartDateTimeText = CONVERT(Varchar, GetDate(),120)  
	Set @message = 'Start DateTime : %s | [SGSP_FillEventosIngEgr] | Insert [dbo].[EventosIngresosEgresos] | IdCuenta => '+ Rtrim(Cast(@idCta As Varchar(10)))+' | RecId => '+ Rtrim(Cast(@iRecId As Varchar(10)))
	RAISERROR( @message, 10,1,@StartDateTimeText) WITH NOWAIT

	Declare @cAux Varchar(50) = ''
	Set @cAux = SUBSTRING(@cObs, PATINDEX('%Fecha y Hora:%', @cObs) + 14, CHARINDEX('<br>', @cObs, PATINDEX('%Fecha y Hora:%', @cObs)) - (PATINDEX('%Fecha y Hora:%', @cObs) + 14))
	Set @tFechaHora = Cast(@cAux As DateTime)
    Set @cMatricula = Ltrim(SUBSTRING(@cObs, PATINDEX('%Matricula:%', @cObs) + 11, CHARINDEX('<br>', @cObs, PATINDEX('%Matricula:%', @cObs)) - (PATINDEX('%Matricula:%', @cObs) + 11)))
    Set @cUnidadFuncional = Ltrim(SUBSTRING(@cObs, PATINDEX('%Vecino:%', @cObs) + 8, 8))
    Set @cVecino = Ltrim(SUBSTRING(@cObs, PATINDEX('%Nombre Visita:%', @cObs) + 15, CHARINDEX('<br>', @cObs, PATINDEX('%Nombre Visita:%', @cObs)) - (PATINDEX('%Nombre Visita:%', @cObs) + 15)))
    Set @cTransito = Ltrim(SUBSTRING(@cObs, PATINDEX('%Tipo de Transito:%', @cObs) + 17, CHARINDEX('<br>', @cObs, PATINDEX('%Tipo de Transito:%', @cObs)) - (PATINDEX('%Tipo de Transito:%', @cObs) + 17)))
    Set @cUsuario = Ltrim(SUBSTRING(@cObs, PATINDEX('%Usuario:%', @cObs) + 9, CHARINDEX('<br>', @cObs, PATINDEX('%Usuario:%', @cObs)) - (PATINDEX('%Usuario:%', @cObs) + 9)))

	INSERT INTO [dbo].[EventosIngresosEgresos]
           ([eie_iRecId]
           ,[eie_iCuentaId]
           ,[eie_tFechaHora]
           ,[eie_cMatricula]
           ,[eie_cUnidadFuncional]
           ,[eie_cVecino]
           ,[eie_cTransito]
           ,[eie_cUsuario])
     VALUES
           (@iRecId
           ,@idCta
           ,@tFechaHora
           ,@cMatricula
           ,@cUnidadFuncional
           ,@cVecino
           ,@cTransito
           ,@cUsuario)

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