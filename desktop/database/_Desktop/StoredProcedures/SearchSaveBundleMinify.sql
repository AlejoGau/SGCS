--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.290 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.217 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SearchSaveBundleMinify]
	@Id Int = 0,
	@Data NVARCHAR(MAX) = '',
	@Customdata NVARCHAR(MAX) = ''
AS
BEGIN
	IF @Id = 0
	BEGIN
		SELECT 'No hay id' Msg
		RETURN
	END
	
	IF @Data = ''
	BEGIN
		SELECT 'El bundle esta vacio' Msg
		RETURN
	END

  update [Bundle] set [Data] = @Data, [Customdata] = @Customdata  where [Id] = @Id	
	SELECT 'Se guardo' Msg

END