-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[Searchp_smsqueue_sent]
	-- Add the parameters for the stored procedure here
	@id int,
	@error int = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	if (@id>0)
	BEGIN
		if ( @error=0)
		update _datos..p_SMSqueue set que_nEstado = 1 where que_iid=@id
		else
		update _datos..p_SMSqueue set que_nEstado = 2 where que_iid=@id
	END
END