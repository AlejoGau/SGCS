CREATE OR ALTER PROCEDURE [dbo].[MP_SuscriptionRequestIsert]
	@fecha datetime,
	@token varchar(max),
	@mail varchar(max),
	@preapproval_plan_id varchar(max),
	@reason varchar(max),
	@external_reference varchar(max),
	@payer_email varchar(max),
	@card_token_id varchar(max),
	@back_url varchar(max),
	@status varchar(max),
	@estado varchar(max)
	--WITH ENCRYPTION			 
	AS
	set noCount on
	INSERT INTO [_Datos]..[MP_SuscriptionRequest]
    ([fecha],[token],[mail],[preapproval_plan_id],[reason],[external_reference],[payer_email],[card_token_id],
	 [back_url],[status],[estado])
	VALUES
    (@fecha,@token,@mail,@preapproval_plan_id,@reason,@external_reference,@payer_email,@card_token_id,
	 @back_url,@status,@estado)	
	exec MP_SuscriptionRequestSel @@Identity