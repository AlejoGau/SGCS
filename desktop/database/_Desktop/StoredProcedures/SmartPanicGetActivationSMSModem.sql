-- =============================================
-- Author:		Rodrigo Román
-- Create date: 02/04/2020
-- Description:	Obtiene el modemsms para poder enviar activaciones a un smartpanic usando la cuenta
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SmartPanicGetActivationSMSModem] 
	-- Add the parameters for the stored procedure here
	@dsp_cdealer char(3),
	@SMSMODEM int OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	Declare @jSon As nVarChar(max)
	declare @config nvarchar(max)
	declare @SMSACTIVATION varchar(10)
	declare @hierarchy TABLE
	(
		NAME VARCHAR(2000),
		StringValue NVARCHAR(MAX) NOT NULL
	)

    print '[SmartPanicGetActivationSMSModem] me fijo si el dealer de la cuenta tiene configurado modemsms.'
	select @config =dsp_config from _datos..m_dealer_spconfig where dsp_cdealer='LEO'
	insert into @hierarchy select name, StringValue from parseJSON(@config)
	--select @SMSACTIVATION = StringValue from @hierarchy where name = 'SMSACTIVATION'
	select @SMSMODEM = convert(int,StringValue) from @hierarchy where name = 'SMSMODEM'

	if @SMSMODEM is null
	BEGIN
		select @SMSACTIVATION = null, @SMSMODEM= null
		delete from @hierarchy
		print '[SmartPanicGetActivationSMSModem] tomo el modem de la metadata global.'
		Set @json = (Select XmlData From _Desktop.dbo.MetaData WHERE ObjectTypeId = _Desktop.dbo.GetObjectId('UIApplication') AND ObjectId = 30)
		select @config=StringValue from parseJSON(@json) where name = 'Config'
		insert into @hierarchy select name, StringValue from parseJSON(@config)
		--select @SMSACTIVATION = StringValue from @hierarchy where name = 'SMSACTIVATION'
		select @SMSMODEM = convert(int,StringValue) from @hierarchy where name = 'SMSMODEM'
	END

END