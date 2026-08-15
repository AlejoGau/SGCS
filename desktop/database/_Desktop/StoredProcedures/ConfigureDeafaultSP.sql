-- =============================================
-- Author:		RodrigoRoman
-- Create date: 23-06-2016
-- Description:	Copia la configuracion de un SP modelo a otro SP, para usar en server ventas para demos
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[ConfigureDeafaultSP]
	-- Add the parameters for the stored procedure here
	@spfrom int,
	@spto int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @metadata varchar(max)

	select @metadata = config from _datos..smartpanic where id = @spfrom

	update _datos..smartpanic set config = @metadata where id = @spto
END