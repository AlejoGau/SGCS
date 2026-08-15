CREATE OR ALTER PROCEDURE [dbo].[MP_Verifica_Status]
	@token varchar(max)
	--WITH ENCRYPTION
	AS
	SELECT JSON_VALUE(Convert(varchar(max),JsonRequest), '$.status') AS 'status'
	FROM _Datos..MP_Log
	WHERE token = @token
	AND tipo = 'SUSCRIPTION RESPONSE'