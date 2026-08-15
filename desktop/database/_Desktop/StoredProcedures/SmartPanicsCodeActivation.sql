-- =============================================
-- Author:		Rodrigo Román
-- Create date: 02/04/2019
-- Description:	Analiza un codigo de activación de smartpanics y actualiza el imei del dispositivo si es válido
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SmartPanicsCodeActivation]
	-- Add the parameters for the stored procedure here
	@code varchar(10),
	@telefono varchar(25),
	@imei nvarchar(255),
	@token varchar(255)=''
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @spa_smartpanicsiid int
	declare @spa_idkey int
    -- Insert statements for procedure here
	select @spa_smartpanicsiid = [spa_smartpanicsiid], @spa_idkey = spa_idkey
		from _datos..SmartPanicActivacion
		inner join _datos..SmartPanic on id = [spa_smartpanicsiid]
		where RIGHT(spa_telefono, 8) = RIGHT(@telefono, 8)
			and spa_status = 1

	if @spa_idkey > 0
	BEGIN
		update _datos..SmartPanic set Imei = @imei where id = @spa_smartpanicsiid
		update _datos..SmartPanicActivacion set spa_status = 2 where spa_idkey = @spa_idkey
		select 1 as status, 'El código es válido.' as message
	END
	ELSE
	BEGIN
		select 2 as status, 'El código es inválido.'
	END
END