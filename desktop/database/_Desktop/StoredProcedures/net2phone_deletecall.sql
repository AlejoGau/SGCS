-- =============================================
-- Author:		Rodrigo Román
-- Create date: 03/06/2020
-- Description:	Actualiza llamada net2phone al colgar
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[net2phone_deletecall]
	-- Add the parameters for the stored procedure here
	@reciid int,
	@response varchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @status int = 2
	declare @oldstatus int = 0

	select @oldstatus = n2p_status from _datos..m_net2phone_call where n2p_reciid = @reciid

    -- Insert statements for procedure here
	update _datos..m_net2phone_call set [n2p_delete_response]=@response, n2p_status=@status, n2p_dhang = getdate() where n2p_reciid = @reciid and n2p_status = 1
END