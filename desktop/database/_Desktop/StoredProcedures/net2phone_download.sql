-- =============================================
-- Author:		Rodrigo Román
-- Create date: 03/06/2020
-- Description:	Actualiza llamada net2phone en evento luego de colgar
-- =============================================
CREATE OR ALTER PROCEDURE net2phone_download
	-- Add the parameters for the stored procedure here
	@callid varchar(500),
	@response varchar(max),
	@url varchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	update _datos..m_net2phone_call set [n2p_recording_response]=@response, [n2p_recording_url]=@url, n2p_status=3 where n2p_callid = @callid
END