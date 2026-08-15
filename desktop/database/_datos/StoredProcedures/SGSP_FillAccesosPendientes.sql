CREATE OR ALTER PROCEDURE  [dbo].[SGSP_FillAccesosPendientes]
	@idRec [int] = 0,
	@idCta [int] = 0,
	@cIdExtendido [varchar](100)=''	,
	@tEventoFechaHora [datetime] = Null,
	@iPuntoAcceso [int] = 0
AS
--Inserta datos para control de accesos
--Autor :Pablo O. Canónico
--Fecha :25/10/2021
SET NOCOUNT ON;
BEGIN TRY
	Declare @cLinea [char](3) ='',
			@cCuenta [char](10) = '',
			@cNombre [nVarChar](100) ='',
			@cUsuarioNombre [varchar](256) = '', 
			@cUsuarioFoto [varchar](100) = '',
			@cVehiculoDominio [varchar](50) = '',
			@cVehiculoFoto [varchar](100) = '',
			@cIdentificacion [varchar](50) = ''

	;With ControlAccesos As (
		Select cue_clinea,cue_ncuenta, cue_cnombre, usu_cnombre,usu_cimagen,
				Cast(JSON_VALUE([usu_cmetadata],'$.domain') As Varchar(10)) As Patente,
				Cast(JSON_VALUE([usu_cmetadata],'$.photo') As Varchar(100)) As FotoVehiculo,
				usu_cIdExtendido, usu_cidentificacion
		From [_Datos].[dbo].[m_cuentas]
		Inner join [_Datos].[dbo].[m_usuarios] ON [cue_iid] = [usu_iidcuenta] 
		Where  [usu_cmetadata] Like '%"domain"%' 
			And cue_iid=@idCta
			And usu_cIdExtendido=@cIdExtendido
		Union All 
		(
		Select cue_clinea,cue_ncuenta, cue_cnombre, usu_cnombre,usu_cimagen,
			Space(10) As Patente,
			Space(100) As FotoVehiculo,
			usu_cIdExtendido, usu_cidentificacion
				From [_Datos].[dbo].[m_cuentas]
				Inner join [_Datos].[dbo].[m_usuarios] ON cue_iid = [usu_iidcuenta] 
		Where  [usu_cmetadata] Not Like '%"domain"%' 
		And cue_iid=@idCta
		And usu_cIdExtendido=@cIdExtendido
		)
	)
	Select @cLinea=cue_clinea, @cCuenta=cue_ncuenta, @cNombre=cue_cnombre, @cUsuarioNombre=usu_cnombre, @cUsuarioFoto=usu_cimagen, @cVehiculoDominio=Patente, @cVehiculoFoto=FotoVehiculo, @cIdentificacion=usu_cIdExtendido
		From ControlAccesos

	--Inserto Datos--
	INSERT INTO [dbo].[AccesosPendientes]
			   ([acp_iPuntoAcceso]
			   ,[acp_iRecID]
			   ,[acp_tEventoFechaHora]
			   ,[acp_iidCuenta]
			   ,[acp_cLinea]
			   ,[acp_cCuenta]
			   ,[acp_cNombre]
			   ,[acp_cIdentificacion]
			   ,[acp_cIdExtendido]
			   ,[acp_cUsuarioNombre]
			   ,[acp_cUsuarioFoto]
			   ,[acp_cVehiculoDominio]
			   ,[acp_cVehiculoFoto]
			   )
		 VALUES
			   (@iPuntoAcceso
			   ,@idRec
			   ,@tEventoFechaHora
			   ,@idCta
			   ,@cLinea
			   ,@cCuenta
			   ,@cNombre
			   ,@cIdentificacion
			   ,@cIdExtendido
			   ,@cUsuarioNombre
			   ,@cUsuarioFoto
			   ,@cVehiculoDominio
			   ,@cVehiculoFoto
			   )
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