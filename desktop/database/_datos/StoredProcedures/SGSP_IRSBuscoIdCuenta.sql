CREATE OR ALTER PROCEDURE [dbo].[SGSP_IRSBuscoIdCuenta]
	@iPuerto [int] = 0,
	@cCuenta [char](4) = '',
	@iConexion [int] = 0,
	@cLineCard [char](3) = '',
	@iIdCta [int] = 0 OUTPUT,
	@cLinea [char](3) = '' OUTPUT,
	@cue_cProvincia [char](3) = '' OUTPUT
AS
BEGIN
	--Busca Cuenta para IRServices
	--Devuelve el ID,la linea y la Pcia de una cuenta, usando el Puerto, la linea y el Codigo de Cuenta que leen las Dlls de los receptores
	--Autor : Pablo O. Canónico
	--Fecha : 13/04/2018
	--10-07-2019 Se modifico para resolver por IRS con puertos seriales
	Set NoCount ON
	BEGIN TRY
	
	If @cLineCard = '' Or @cLineCard = '000'
		Set @cLineCard='1'

	Declare @iLineCard Int = Cast(@cLineCard As Int)

	If @iConexion=0		--Viene de CS
	Begin
		Select Top 1 @iIdCta = C.cue_iid, @cLinea = C.cue_clinea, @cue_cProvincia = cue_cProvincia
			From m_cuentas C With (NOLOCK)
				Inner Join  _Tablas.Dbo.t_port_alias On C.cue_clinea=tpa_cdealer
				Inner Join  _Tablas.Dbo.t_puertos On pue_icodigo=tpa_ipuerto
				Inner Join _Tablas.Dbo.t_LineasXPuerto On lxp_iAlias=tpa_icodigo
			Where pue_npuerto = @iPuerto And C.cue_ncuenta = @cCuenta And pue_nestado<>1
						And lxp_nLinea=@iLineCard And lxp_nEstado=1
						--And ( @iConexion=0 Or [pue_idKey]=@iConexion )

		If @iIdCta Is null Or @iIdCta=0
			Select Top 1 @iIdCta = C.cue_iid, @cLinea = C.cue_clinea, @cue_cProvincia = cue_cProvincia
				From m_cuentas C With (NOLOCK)
					Inner Join  _Tablas.Dbo.t_port_alias On C.cue_clinea=tpa_cdealer
					Inner Join  _Tablas.Dbo.t_puertos On pue_icodigo=tpa_ipuerto
				Where pue_npuerto = @iPuerto And C.cue_ncuenta = 'XXXX'
	End
	Else
	Begin
		Select Top 1 @iIdCta = C.cue_iid, @cLinea = C.cue_clinea, @cue_cProvincia = cue_cProvincia
			From m_cuentas C With (NOLOCK)
				Inner Join  _Tablas.Dbo.t_port_alias On C.cue_clinea=tpa_cdealer
				Inner Join  _Tablas.Dbo.t_ip_con On ipc_icodigo=tpa_iportip
				Inner Join _Tablas.Dbo.t_LineasXPuerto On lxp_iAlias=tpa_icodigo
			Where ipc_nport = @iPuerto And C.cue_ncuenta = @cCuenta And ipc_nestado<>1
						And lxp_nLinea=@iLineCard And lxp_nEstado=1
						And ( @iConexion=0 Or [ipc_idKey]=@iConexion )

		If @iIdCta Is null Or @iIdCta=0
			Select Top 1 @iIdCta = C.cue_iid, @cLinea = C.cue_clinea, @cue_cProvincia = cue_cProvincia
				From m_cuentas C With (NOLOCK)
					Inner Join  _Tablas.Dbo.t_port_alias On C.cue_clinea=tpa_cdealer
					Inner Join  _Tablas.Dbo.t_ip_con On ipc_icodigo=tpa_iportip
				Where ipc_nport = @iPuerto And C.cue_ncuenta = 'XXXX'
	End
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
END