CREATE OR ALTER TRIGGER [dbo].[Trg_CuentaUpdate] ON dbo.m_cuentas FOR UPDATE AS
BEGIN

	SET NOCOUNT ON;

	Declare @cCuentaOld nVarChar(10)='',
			@cCuentaNew nVarChar(10)='',
			@cLineaOld Char(3)='',
			@cLineaNew Char(3)='',
			@cue_nparticion int,
			@cue_iid int

	Select Top 1 @cCuentaOld=[cue_ncuenta], @cLineaOld=[cue_clinea] From deleted
	Select Top 1 @cue_iid = cue_iid ,@cue_nparticion=cue_nparticion ,@cCuentaNew=[cue_ncuenta], @cLineaNew=[cue_clinea] From inserted

	-- Lleno los campos "madre" si es una particion
	if @cue_nparticion > 0
	BEGIN
		exec _desktop..m_cuentas_UpdateMadreFields @cue_iid = @cue_iid
	END

	If @cCuentaOld <> @cCuentaNew Or @cLineaOld <> @cLineaNew
	Begin
		-- me fijo si hay rangos unicos para moverlos (SP, creados con landing)
		IF Exists ( Select Top 1 [zon_idKey] From [dbo].[m_zonas] Where [zon_cdealer] = @cLineaOld And [zon_ccuenta] = @cCuentaOld )
		Begin
			UPDATE [dbo].[m_zonas]
			   SET [zon_cdealer] = @cLineaNew
				  ,[zon_ccuenta] = @cCuentaNew
			 WHERE [zon_cdealer] = @cLineaOld And [zon_ccuenta] = @cCuentaOld 
		End 


		-- me fijo si hay zonas asociadas a la cuenta para moverlas
		IF Exists ( SELECT TOP 1 [dwm_idKey]
			FROM [_Sistema].[dbo].[UsersDesktopWebModulos]
			where dwm_idmodules = 0
			AND dwm_dealer = @cLineaOld
			and dwm_cuenta_desde = @cCuentaOld
			and dwm_cuenta_hasta = @cCuentaOld )
		Begin
			UPDATE [_Sistema].[dbo].[UsersDesktopWebModulos]
			   SET dwm_dealer = @cLineaNew
				  ,dwm_cuenta_desde = @cCuentaNew
				  ,dwm_cuenta_hasta = @cCuentaNew
			 WHERE dwm_idmodules = 0
				AND dwm_dealer = @cLineaOld
				and dwm_cuenta_desde = @cCuentaOld
				and dwm_cuenta_hasta = @cCuentaOld
		End 
	End
END