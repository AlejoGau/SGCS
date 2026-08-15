--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:36.960 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:33.077 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SystemDataUpdateSearch]
	@sdt_data NVARCHAR(MAX) = '',
	@sdt_log NVARCHAR(MAX) = ''
AS
BEGIN
  IF @sdt_data != ''
		BEGIN
			select @sdt_data = REPLACE(@sdt_data,' ','+')
			UPDATE _Sistema..s_systemdata
				SET	sdt_fecha = GETDATE(),
						sdt_data = @sdt_data,
						sdt_log = @sdt_log
				WHERE sdt_code = 'LICENSE'
		END
END