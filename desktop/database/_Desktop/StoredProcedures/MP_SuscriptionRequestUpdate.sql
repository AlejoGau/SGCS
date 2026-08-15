CREATE OR ALTER PROCEDURE [dbo].[MP_SuscriptionRequestUpdate]
	@token varchar(max),
	@card_token_id varchar(max) = '',
	@estado varchar(max) = '',
	@message varchar(max) = '',
	@code varchar(max) = ''
	--WITH ENCRYPTION			 
	AS
	set noCount on
	IF @card_token_id != ''
	BEGIN
		UPDATE [_Datos]..[MP_SuscriptionRequest]
		SET [card_token_id]=@card_token_id,[estado]=@estado,[message]=@message,[code]=@code
		WHERE [token] = @token
	END
	ELSE
	BEGIN
		UPDATE [_Datos]..[MP_SuscriptionRequest]
		SET [estado]=@estado
		WHERE [token] = @token
	END