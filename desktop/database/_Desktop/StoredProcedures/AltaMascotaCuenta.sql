-- =============================================
-- Author:		Rodrigo Román
-- Create date: 12/11/2019
-- Description:	Alta de mascota y cuenta asociada
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[AltaMascotaCuenta]
	-- Add the parameters for the stored procedure here
	@Name nvarchar(60),
	@imei varchar(120),
	@raza nvarchar(256),
	@dealer char(3),
	@userid int,
	@token NVARCHAR(128)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


	-- busco el próximo ncuenta para ese dealer
	declare @cue_ncuenta char(10);
	EXECUTE _Desktop.[dbo].[SearchCuentaProximoNumero] 
	   @dealer
	  ,@cue_ncuenta OUTPUT

	-- busco el primer tipo mascota disponible
	declare @cue_ctipo char(3);
	select top 1 @cue_ctipo = tip_ccodigo from _tablas..t_tipos where tip_nTipo = 3

	declare @cue_dfechaalta datetime;
	select @cue_dfechaalta = getdate();

	declare @cue_iid int

	EXECUTE _desktop.[dbo].[CuentaIns] 
	   @Name = @Name
	  ,@cue_clinea = @dealer
	  ,@cue_ncuenta = @cue_ncuenta
	  ,@cue_cnombre = @Name
	  ,@cue_ctipo = @cue_ctipo
	  ,@cue_dfechaalta = @cue_dfechaalta
	  ,@cue_nllaveul = 1
	  ,@cue_cIMEI = @imei
	  ,@Situacion = 'habilitada'
	  ,@idcuenta = @cue_iid output
	 

	-- agrego la cuenta al rango del usuario
	INSERT INTO [_Sistema]..[UsersDesktopWebModulos]
			( [dwm_idWeb]
			,[dwm_idModules]
			,[dwm_idTabla]
			,[dwm_dealer]
			,[dwm_cuenta_desde]
			,[dwm_cuenta_hasta]
			,[dwm_data] )
		VALUES
		(	@userid
			,0
			,''
			,@dealer
			,@cue_ncuenta
			,@cue_ncuenta
			,''	)

	-- creo el dispositivo movil
	EXECUTE [dbo].[DispositivoMovilIns] 
		@Name = @Name
		,@OwnerId = @cue_iid
		,@MascotaRaza = @raza


END