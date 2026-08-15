CREATE OR ALTER PROCEDURE [dbo].[SP_BuscoIdCuentaIP]@iPuerto [int],
	@cCuenta [char](4),
	@iId [int] = 0 OUTPUT
AS
--Devuelve el ID de una cuenta, usando el Puerto y el Codigo de Cuenta que leen las Dlls de los receptores IP
--Autor :Pablo O. Canónico 02-10-2006

--DECLARE @iId Int
SET @iId = (Select cue_iid From m_cuentas With (NOLOCK)
		Inner Join  _Tablas.Dbo.t_port_alias
			On cue_clinea=tpa_cdealer
		Inner Join  _Tablas.Dbo.t_ip_con
			On ipc_icodigo=tpa_iportip
			Where ipc_nport = @iPuerto
			And cue_ncuenta = @cCuenta )

If @iId Is null
   Begin
	SET @iId = (Select cue_iid From m_cuentas With (NOLOCK)
			Inner Join  _Tablas.Dbo.t_port_alias
				On cue_clinea=tpa_cdealer
			Inner Join  _Tablas.Dbo.t_ip_con
				On ipc_icodigo=tpa_iportip
				Where ipc_nport = @iPuerto
				And cue_ncuenta = 'XXXX' )
   End

Select @iId As cue_iid