CREATE OR ALTER PROCEDURE [dbo].[SGSP_IRSBuscoReceptor]
	@iPuerto [Int] = 0,
	@iReceptor [Int] = 0 OUTPUT,
	@cDll [nVarChar](50) = '' OUTPUT
AS
--Busca Receptor para IRServices para puertos seriales
--Devuelve el Receptor y la dll usando el Puerto de conexion
--Autor : Pablo O. Canónico
--Fecha : 13/04/2018
Set NoCount ON
BEGIN TRY
Select @iReceptor = I.pue_iReceptor, @cDll = R.rec_cdll
	From _Tablas.dbo.t_puertos I
		Inner Join  _Datos.dbo.m_receptores_cab R On R.rec_iid = I.pue_iReceptor
	Where  I.pue_npuerto = @iPuerto
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

	PRINT 'Error Number  : ' + CAST(ERROR_NUMBER() AS VarChar(10));
	PRINT 'Error Message : ' + ERROR_MESSAGE();
	PRINT 'Error Severity: ' + CAST(ERROR_SEVERITY() AS VARCHAR(10));
	PRINT 'Error State   : ' + CAST(ERROR_STATE() AS VARCHAR(10));
	PRINT 'Error Line    : ' + CAST(ERROR_LINE() AS VARCHAR(10));
	PRINT 'Error Proc    : ' + ISNULL(ERROR_PROCEDURE(), 'Not within proc');
END CATCH