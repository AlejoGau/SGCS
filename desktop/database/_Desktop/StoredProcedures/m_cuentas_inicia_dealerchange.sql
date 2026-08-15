-- =============================================
-- Author:		Rodrigo Roman
-- Create date: 2022/11/30
-- Description:	Mover una cuenta de dealer buscando el próximo ncuenta disponible
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[m_cuentas_inicia_dealerchange] 
	-- Add the parameters for the stored procedure here
	@imei varchar(255),
	@cue_clinea char(3)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @cue_iid int
	SELECT @cue_iid = CuentaId FROM _Datos..SmartPanic
	WHERE Imei = @imei
    -- primero busco el proximo ncuenta disponible en el dealer.
	exec _Desktop..m_cuentas_dealerchange @cue_iid = @cue_iid, @cue_clinea=@cue_clinea 

END