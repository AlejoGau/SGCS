CREATE OR ALTER PROCEDURE  [dbo].[SGSP_Fill_EventosEnFalloTesteo]
	@idRecNoRes [int] = 0,
	@idCuenta [int] = 0,
	@tEventoFechaHora [datetime] = Null,
	@cAlarmaAutoprocesa [nVarChar] (150) = ''
AS
--Insert eventos en Fallo de Testeo
--Autor :Pablo O. Canónico
--Fecha :06/01/2017
SET NOCOUNT ON;
BEGIN TRY
	--Primero los datos de Cuenta--
	Declare @cLinea [char](3) ='',
			@cCuenta [char](10) = '',
			@cNombre [nVarChar](100) =''

	Select  @cLinea = [cue_clinea], @cCuenta = [cue_ncuenta], @cNombre = [cue_cnombre]
		From [dbo].[m_cuentas]
	Where  [cue_iid]=@idCuenta

	--Segundo los datos de Alarma--
	Declare @cAlarmaFallo [char](3) = '',
			@cAlarmaDescripcion [nVarChar](100) = '', 
			@nAlarmaColor [int] = 0,
			@nAlarmaColorLetra [int] = 0

	Select @cAlarmaFallo = [rec_cAlarma], @cAlarmaDescripcion = IsNull([cod_cdescripcion],''), @nAlarmaColor = IsNull([cod_ncolor],0), @nAlarmaColorLetra = IsNull([cod_nColorLetra],0)
		From [dbo].[p_recepcion] 
		Left Outer Join [_Tablas].[dbo].[t_codigos_alarma] ON [cod_ccodigo]=[rec_cAlarma]
	Where  [rec_iid] = @idRecNoRes

	--Inserto Datos--
	INSERT INTO [dbo].[EventosEnFalloTesteo]
           ([eft_iRecID]
           ,[eft_iidCuenta]
           ,[eft_tEventoFechaHora]
           ,[eft_cLinea]
           ,[eft_cCuenta]
           ,[eft_cNombre]
           ,[eft_cAlarma]
           ,[eft_cAlarmaDescripcion]
           ,[eft_nAlarmaColor]
           ,[eft_nAlarmaColorLetra]
		   ,[eft_cAlarmaAutoprocesa])
     VALUES
           (@idRecNoRes
           ,@idCuenta
           ,@tEventoFechaHora
           ,@cLinea
           ,@cCuenta
           ,@cNombre
           ,@cAlarmaFallo
           ,@cAlarmaDescripcion
           ,@nAlarmaColor
           ,@nAlarmaColorLetra
		   ,@cAlarmaAutoprocesa)

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