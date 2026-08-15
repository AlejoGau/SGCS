-- =============================================
-- Author:		Rodrigo
-- Create date: 22/1/2016
-- Description:	agrega el modulo desktop a los usuarios que no lo tengan
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[UsersDesktopWebModulos_FIX_dekstopmodule]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    DECLARE @udw_idKey int

	DECLARE MY_CURSOR CURSOR 
	  LOCAL STATIC READ_ONLY FORWARD_ONLY
	FOR 
	SELECT udw_idKey FROM [_Sistema].[dbo].[UsersDesktopWeb] u
	where udw_idKey not in (SELECT [dwm_idWeb] FROM [_Sistema].[dbo].[UsersDesktopWebModulos] m where m.[dwm_idWeb] = u.[udw_idKey] and m.[dwm_idModules]=8)

	OPEN MY_CURSOR
	FETCH NEXT FROM MY_CURSOR INTO @udw_idKey
	WHILE @@FETCH_STATUS = 0
	BEGIN 

		PRINT @udw_idKey

		INSERT INTO [_Sistema]..[UsersDesktopWebModulos]
           ([dwm_idWeb]
           ,[dwm_idModules])
     VALUES
           (@udw_idKey
           ,8)

		FETCH NEXT FROM MY_CURSOR INTO @udw_idKey
	END
	CLOSE MY_CURSOR
	DEALLOCATE MY_CURSOR
END