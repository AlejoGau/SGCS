CREATE OR ALTER PROCEDURE [dbo].[SearchObtieneIdPagoMP]
(
	@token NVARCHAR(128)=''
)
AS
	BEGIN
		DECLARE @idPago VARCHAR(MAX)=''
		DECLARE @JsonRequest VARCHAR(MAX)=''

		SELECT @JsonRequest = JsonRequest
		FROM _Datos..MP_Log
		WHERE tipo='SUSCRIPTION RESPONSE' AND token=@token 
			   
		SELECT @idPago=value FROM OpenJson(@JsonRequest)
		WHERE [key] = 'id'

		SELECT @idPago
	END