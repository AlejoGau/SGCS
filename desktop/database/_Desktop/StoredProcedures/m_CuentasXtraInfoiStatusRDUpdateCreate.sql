CREATE OR ALTER PROCEDURE [dbo].[m_CuentasXtraInfoiStatusRDUpdateCreate]
@cue_iidCuenta Int = 0,
@cue_iStatusRD Int = 0

AS
BEGIN
	If @cue_iidCuenta = 0
		Print 'idCuenta en cero!!!'
	Else
	Begin
		IF EXISTS (select cue_idKey from _Datos..m_CuentasXtrainfo where cue_iidCuenta = @cue_iidCuenta)
			BEGIN
				UPDATE _Datos..m_CuentasXtrainfo 
					SET [cue_iStatusRD] = @cue_iStatusRD
				WHERE cue_iidCuenta = @cue_iidCuenta
			END
		ELSE
			BEGIN
				Insert into _Datos.dbo.m_CuentasXtrainfo (cue_iidCuenta,cue_iLicenciasSP,cue_cConfig,cue_cCustom, cue_iEngineStatus,cue_iImportancia,cue_ilicenciapar,cue_iTipoServicio,cue_iStatusRD)
				values ( @cue_iidCuenta,0,'','',0,0,0,0,@cue_iStatusRD)
			END
	End
END