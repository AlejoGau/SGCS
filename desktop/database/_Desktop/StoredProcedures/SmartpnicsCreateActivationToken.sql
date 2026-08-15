-- =============================================
-- Author:		Rodrigo Román
-- Create date: 30/03/2020
-- Description:	Crea un nuevo token de activación
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[SmartpnicsCreateActivationToken]
	-- Add the parameters for the stored procedure here
	@telefono varchar(25),
	@smartpanicid int,
	@spa_idkey int OUTPUT,
	@status int OUTPUT, -- 1: creado con exito, 2: ya existe
	@activationtoken varchar(255) OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @code varchar(10)

    -- vuelvo a validar que no existe una activacion para ese telefono
	select @spa_idkey = spa_idkey from _datos..SmartPanicActivacion 
		where RIGHT(spa_telefono, 8) = RIGHT(@telefono, 8)
		and spa_status = 1
		and @smartpanicid = [spa_smartpanicsiid]

	if @spa_idkey >0
	BEGIN
		-- ya existe un token activo lo devuelvo ypaso status 2
		select @status = 2
	END
	ELSE
	BEGIN


	select @activationtoken = NEWID()
	select @code = ABS(CHECKSUM(@activationtoken))%900000 + 100000 -- 6 RND 6 digitos

	INSERT INTO _datos.[dbo].SmartPanicActivacion
           ([spa_smartpanicsiid]
           ,[spa_code]
           ,[spa_token]
           ,[spa_telefono]
           ,[spa_dfechaalta]
           ,[spa_status])
     VALUES
           (@smartpanicid
           ,@code
           ,@activationtoken
           ,@telefono
           ,getdate()
           ,1)

		select @status = 1
	END
END