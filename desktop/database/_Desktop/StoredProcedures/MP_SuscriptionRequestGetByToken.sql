CREATE OR ALTER PROCEDURE [dbo].[MP_SuscriptionRequestGetByToken]
	@token varchar(max) = ''
	--WITH ENCRYPTION
	AS
	SELECT *
	FROM [_datos].dbo.[MP_SuscriptionRequest]
	WHERE [token] = @token