-- =============================================
-- Author:		Rodrigo Román
-- Create date: 31/05/2021
-- Description:	Devuelve los eventos de "mi entorno" para el smarpanic definido por el parámetro imei
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[getEventosMiEntorno]
	-- Add the parameters for the stored procedure here
	@token varchar(255),
	@imei Varchar(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @MIENTORNOTIEMPO int
	select  @MIENTORNOTIEMPO=par_ivalor from _tablas..t_parametros where par_ccodigo = 'MIENTORNOTIEMPO'
	
	--declare @token varchar(255) = 'C854E14C-FD2C-43C8-9C0D-3B7D1BB54CC2'
	declare @userid int
	select @userid = id from _Sistema..UsersDesktopWeb inner join _Datos..Token on udw_usuario = UserId where AccessToken =@token

	--declare @imei Varchar(255) = '7d817b22-a340-415a-83f1-8a94b533d206'

	declare @dealer char(3)


	select @dealer = cue_clinea from _datos..m_cuentas inner join _datos..SmartPanic on cue_iid = CuentaId where Imei = @imei

	select 
		 rec_calarma
		,cod_cdescripcion
		,rec_tfechahora
		,gps_rLatitud
		,gps_rLongitud
		,gps_cDireccion
		,rec_cObservaciones
		,rec_iid
		,cue_iid
		,rxt_cEvento
		,evi_iStatus = (Select Top 1 evi_iStatus From _Datos..EventosInformados with (nolock) where rec_iid = evi_iRecId And rec_iusuario = evi_iUsuario
								and (evi_iStatus = 0 or evi_iStatus is null))
		,rec_iusuario
		,usu_cnombre
	from _datos..p_recepcion with (nolock)
		inner join _tablas..t_codigos_alarma with (nolock) on rec_calarma = cod_ccodigo
		inner join _datos..m_cuentas with (nolock) on rec_iidcuenta = cue_iid
		inner join _datos..p_PosicionesGPS with (nolock) on rec_iid = gps_idRec
		inner join _datos..p_RXtraInfo with (nolock) on rec_iid = rxt_iRecId
		left join _Datos..m_usuarios with (nolock) on rec_iidcuenta = usu_iidcuenta And rec_iusuario=usu_icodigo
	where (rxt_nSPIP=1 or rxt_nSPSMS=1)
		and rec_tfechahora > DATEADD(hour,-@MIENTORNOTIEMPO,getdate())
		and cue_clinea = @dealer
		and cod_ccodigo not in ('S70','#RP','#RA','#CC','#AR','S66','S57','_AT','_AN','S69','S70','S71','S52','S54','S56','_NE','#EC','_NE','__G','__I','POS','#PP','#PA','#AA','#DI','#DH','#DG','#DF','#DE','#DA','#DB','#DC','CVP')
	END