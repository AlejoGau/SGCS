CREATE OR ALTER PROCEDURE [dbo].[m_CuentasXtraInfoUpdateCreate]
@cue_iidCuenta Int,
@cue_iLicenciasSP Int = 0,
@cue_cConfig VarChar (MAX) = '',
@cue_cCustom VarChar (100) = '',
@cue_iEngineStatus int = 0,
@cue_iImportancia int = 0,
@cue_ilicenciapar int = 0,
@cue_iTipoServicio Int = 0

AS
BEGIN
	IF EXISTS (select cue_idKey from _Datos..m_CuentasXtrainfo where cue_iidCuenta = @cue_iidCuenta)
		BEGIN
			DECLARE @_cue_iLicenciasSP INT
			DECLARE @_cue_cConfig VarChar (MAX)
			DECLARE @_cue_cCustom VarChar (100)
			DECLARE @_cue_iEngineStatus INT
			DECLARE @_cue_iImportancia INT
			DECLARE @_cue_ilicenciapar INT
			DECLARE @_cue_iTipoServicio INT

			SELECT 
				@_cue_iLicenciasSP = cue_iLicenciasSP,
				@_cue_cConfig = cue_cConfig,
				@_cue_cCustom = cue_cCustom,
				@_cue_iEngineStatus = cue_iEngineStatus,
				@_cue_iImportancia = cue_iImportancia,
				@_cue_ilicenciapar = cue_ilicenciapar,
				@_cue_iTipoServicio = cue_iTipoServicio
			FROM _Datos..m_CuentasXtrainfo 
			WHERE cue_iidCuenta = @cue_iidCuenta
			
			IF @cue_iLicenciasSP = 0 
				SET @cue_iLicenciasSP = @_cue_iLicenciasSP

			IF @cue_ilicenciapar = 0 
				SET @cue_ilicenciapar = @_cue_ilicenciapar

			IF @cue_cConfig = ''
				SET @cue_cConfig = @_cue_cConfig
			/*
			// no me permite limpiar el valor de cue_cCustom
			IF @cue_cCustom = ''
				SET @cue_cCustom = @_cue_cCustom
			*/

			IF @cue_iEngineStatus = ''
				SET @cue_iEngineStatus = @_cue_iEngineStatus
	

			UPDATE _Datos..m_CuentasXtrainfo 
				SET [cue_iLicenciasSP] = @cue_iLicenciasSP,
						[cue_cConfig] = @cue_cConfig,
						[cue_cCustom] = @cue_cCustom,
						[cue_iEngineStatus] = @cue_iEngineStatus,
						[cue_iImportancia] = @cue_iImportancia,
						[cue_ilicenciapar] = @cue_ilicenciapar,
						[cue_iTipoServicio] = @cue_iTipoServicio
				WHERE cue_iidCuenta = @cue_iidCuenta
		END
	ELSE
		BEGIN
			Insert into _Datos..m_CuentasXtrainfo (cue_iidCuenta,cue_iLicenciasSP,cue_cConfig,cue_cCustom, cue_iEngineStatus,cue_iImportancia,cue_ilicenciapar,cue_iTipoServicio)
			values ( @cue_iidCuenta,@cue_iLicenciasSP,@cue_cConfig,@cue_cCustom,@cue_iEngineStatus,@cue_iImportancia,@cue_ilicenciapar,@cue_iTipoServicio)
										
		END

	select * from _Datos..m_CuentasXtrainfo where cue_iidCuenta = @cue_iidCuenta

END