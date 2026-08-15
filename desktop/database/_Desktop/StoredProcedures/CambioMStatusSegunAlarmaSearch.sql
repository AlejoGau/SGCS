CREATE OR ALTER PROCEDURE [dbo].[CambioMStatusSegunAlarmaSearch]
	@CodigoAlarma varchar(3),
	@idCuenta int
AS
BEGIN
  If @CodigoAlarma = 'OPV'
	Begin
		UPDATE _Datos..m_status
		SET sta_nestado=1   ,sta_dfechaOPNdesde=GETDATE()
		Where sta_iidcuenta = @idCuenta

		--2019-06-11 Pablo
		MERGE INTO [_Datos].[dbo].[m_CuentasXtraInfo] AS TGT
		USING ( Select @idCuenta As rec_iidcuenta, GETDATE() As rec_tFechaHora) AS SRC 
			ON TGT.[cue_iidCuenta] = SRC.[rec_iidcuenta]
		WHEN MATCHED THEN
			UPDATE SET
				TGT.[cue_dFechaOPN] = SRC.[rec_tFechaHora]
 		WHEN NOT MATCHED THEN 
			INSERT ([cue_iidCuenta],[cue_dFechaOPN])
			VALUES (SRC.[rec_iidcuenta],SRC.[rec_tFechaHora]);
		--
	End
  Else
		UPDATE _Datos..m_status
		SET sta_nestado=0,sta_dfechaOPNdesde=Null,sta_dFechaultimo3ertst=GETDATE()
		Where sta_iidcuenta = @idCuenta
END