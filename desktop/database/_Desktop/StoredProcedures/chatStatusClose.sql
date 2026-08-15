-- =============================================
-- Author:		Rodrigo Román
-- Create date: 30/03/2021
-- Description:	Cierra un chat y envia los push a todos los miembros smartpanics.
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[chatStatusClose]
	-- Add the parameters for the stored procedure here
	@chs_idkey int,
	@token varchar(1024)
AS
BEGIN
	SET NOCOUNT ON;

	declare @ahora datetime;
	select @ahora = getdate()

	print '[chatStatusClose] cierro channel de chat'
	UPDATE [_Datos]..[p_ChatSession] SET
			[chs_lastModification] = @ahora
			,[chs_status] = 2
	where chs_idkey = @chs_idkey

END