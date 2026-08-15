--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.383 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.630 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[SearchSMSMasivo]
 @asunto NVARCHAR(256) = '',
 @cuentas NVARCHAR(max) = '',
 @modem  NVARCHAR(max) = ''
AS
BEGIN
  SET NOCOUNT ON   
 


IF @cuentas = 'allSelected'
BEGIN
	SET @cuentas = 'SELECT cue_iid FROM _Datos..m_cuentas';
END

 
DECLARE @tel_iidcuenta INT
DECLARE @tel_ctelefono NVARCHAR(100)
declare @sqlstatement NVARCHAR(4000)

set @sqlstatement = 'INSERT INTO _Datos..p_SMSqueue (que_tfechahora,que_idCuenta,que_iModemSMS,que_cAsunto,que_cDestino,que_nEstado,que_idCmd,que_nRechazo)
	SELECT getdate(), tel_iidcuenta,'+convert(varchar(2),@modem)+','''+@asunto+''', RTRIM(LTRIM(tel_ctelefono)) ,0,0,0
	from _datos..[m_telefonos] o WHERE tel_nsms = 1 AND tel_iidcuenta IN  ('+@cuentas+')
'

print @sqlstatement;

exec sp_executesql @sqlstatement


END