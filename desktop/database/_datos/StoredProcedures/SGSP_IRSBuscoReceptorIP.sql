CREATE OR ALTER PROCEDURE [dbo].[SGSP_IRSBuscoReceptorIP]
	@iPuerto [Int] = 0,
	@iConexion [int] = 0,
	@iReceptor [Int] = 0 OUTPUT,
	@cDll [nVarChar](50) = '' OUTPUT
AS
--Busca Receptor para IRServices
--Devuelve el Receptor y la dll usando el Puerto de conexion
--Autor : Pablo O. Canónico
--Fecha : 08/05/2017
--2018-08-08 : Se modifico para considerar conexion IRS
Set NoCount ON
BEGIN TRY
Select @iReceptor = I.ipc_iReceptor, @cDll = R.rec_cdll
	From _Tablas.dbo.t_ip_con I
		Inner Join  _Datos.dbo.m_receptores_cab R On R.rec_iid = I.ipc_ireceptor
	Where  I.ipc_nport= @iPuerto
	And ( @iConexion=0 Or [ipc_idKey]=@iConexion)
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