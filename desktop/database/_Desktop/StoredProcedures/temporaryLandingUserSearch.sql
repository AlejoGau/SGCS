-- =============================================
-- Author:		Juan Bonforti
-- Create date: 30/11/2018
-- Description:	Verificacion de usuario para App SmartPanics
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[temporaryLandingUserSearch] 
	-- Parametros para verificacion
	@token VARCHAR(255) = ''

AS
BEGIN
	SET NOCOUNT ON;
		INSERT INTO _Datos.dbo.[MP_Log]
           ([fecha]
           ,[token]
           ,[JsonRequest])
     VALUES
           (GETDATE(),
           @token,
           'SOY temporaryLandingUserSearch')
	DECLARE @metadata NVARCHAR(MAX) = '';
	DECLARE @accion VARCHAR(15) = '';
	SELECT @metadata = plw_metadata FROM _datos..p_landingWorkflow WHERE plw_token = @token --AND plw_status = 0

	SELECT @accion = StringValue FROM parseJSON(@metadata) as metadata 
	WHERE NAME = 'accion'

	SELECT TOP 1 plw.*, @accion as accion FROM _datos..p_landingWorkflow  plw WHERE plw.plw_token = @token
	
END