-- =============================================
-- Create date: 08/01/2020
-- Description:	Setea el campo [tst_iCtrlExec] de la tabla [_Datos].[dbo].[m_tst_prueba] a 0 cuando existe una actualizacion de la fecha de OPN/CLO
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[Trg_iCtrlExec_Update] ON [dbo].[m_CuentasXtraInfo] FOR UPDATE
AS 
BEGIN
	Declare @dFechaOPNOld Datetime,
			@dFechaOPNNew Datetime,
			@dFechaCLOOld Datetime,
			@dFechaCLONew Datetime

	Select @dFechaOPNOld=[cue_dFechaOPN], @dFechaCLOOld=[cue_dFechaCLO] From deleted
	Select @dFechaOPNNew=[cue_dFechaOPN], @dFechaCLONew=[cue_dFechaCLO] From inserted

	--IF UPDATE([cue_dFechaOPN]) OR UPDATE([cue_dFechaCLO])
	If @dFechaOPNOld!=@dFechaOPNNew Or @dFechaCLOOld!=@dFechaCLONew
	BEGIN
		Declare @idCuenta Int = (Select cue_iidcuenta From inserted)
	
		Update [_Datos].[dbo].[m_tst_prueba] 
		Set [tst_iCtrlExec]=0
		Where [tst_iidcuenta]=@idCuenta
		Print '[Trg_iCtrlExec_Update] | Se actualizo fecha/hora de ultimo OPN/CLO, seteo [_Datos].[dbo].[m_tst_prueba].[tst_iCtrlExec] = 0'
	END
END