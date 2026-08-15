-- =============================================
-- Author:	Roman Rodrigo
-- Create date: 18/03/2019
-- Description:	Actualiza el contador de sms enviados en m_status
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[SmsActualizaContadorM_status]
   ON  dbo.p_SMSqueue
   AFTER update
AS 
BEGIN

	SET NOCOUNT ON;

	declare @tgm_ntipo int; -- tipo gateway
	declare @idcuenta int
    
	select top 1 @tgm_ntipo = tgm_ntipo,@idcuenta=que_idCuenta FROM inserted
	inner join _Tablas..t_modems_sms t on que_iModemSMS = t.sms_icodigo		--sms_idKey  ?ablo : 2020/09/09
	inner join _tablas..t_gatewaysmsg g on t.sms_igateway = g.tgm_idkey
	where que_nestado = 1

	--Print  '[SmsActualizaContadorM_status] Tipo de Gateway ('+Cast(@tgm_ntipo As VarChar(10))+')'
	if @idcuenta > 0 AND @tgm_ntipo IN(4,5,6,7,8) -- solo actualizo smartsms-OpenVox-Voiprint-Broadcaster-c3ntro
	BEGIN
		update _datos..m_status
		set sta_iEnviadosSMS = sta_iEnviadosSMS+1
		where sta_iidcuenta = @idcuenta

		Execute SGSP_VerificoLimiteYDisponiblesSMS @idcuenta
	END
	Print  '[SmsActualizaContadorM_status] Tipo de Gateway ('+Cast(@tgm_ntipo As VarChar(10))+')'
END