CREATE OR ALTER PROCEDURE [dbo].[SP_BuscoIdCuenta] @nPuerto Numeric(2,0), @cCuenta Character(4), @nLinea numeric(2,0) AS
--Devuelve el ID de una cuenta, usando el Puerto y el Codigo de Cuenta que leen las Dlls de los receptores
--Autor :Pablo O. Canónico 13-12-2004
--Modifica :Pablo O. Canónico 12-07-2006 sin utilizar linea
--Modifica :Pablo O. Canónico 15-04-2011 utilizando linea
SET NOCOUNT ON
DECLARE @iId Int
SET @iId = (Select Top 1 cue_iid From m_cuentas With (NOLOCK)
		Inner Join  _Tablas.Dbo.t_port_alias
			On cue_clinea=tpa_cdealer
		Inner Join  _Tablas.Dbo.t_puertos
			On pue_icodigo=tpa_ipuerto
		Inner Join _Tablas.Dbo.t_LineasXPuerto 
			On lxp_iAlias=tpa_icodigo
			Where pue_npuerto = @nPuerto
			And cue_ncuenta = @cCuenta 
			And lxp_nLinea=@nLinea
			And lxp_nEstado=1
		Order By cue_iid)

If @iId Is null
   Begin
	SET @iId = (Select Top 1 cue_iid From m_cuentas With (NOLOCK)
			Inner Join  _Tablas.Dbo.t_port_alias
				On cue_clinea=tpa_cdealer
			Inner Join  _Tablas.Dbo.t_puertos
				On pue_icodigo=tpa_ipuerto
				Where pue_npuerto = @nPuerto
				And cue_ncuenta = 'XXXX' 
			Order By cue_iid)
   End

Select @iId As cue_iid