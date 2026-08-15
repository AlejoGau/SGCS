CREATE OR ALTER PROCEDURE [dbo].[MP_SuscriptionResponseAuthorizedInsert]
           @id varchar(200) = '',
           @payer_id int = 0,
           @payer_email varchar(max) = '',
           @back_url varchar(max) = '',
           @collector_id int = 0,
           @application_id int = 0,
           @status varchar(max) = '',
           @reason varchar(max) = '',
           @external_reference varchar(max) = '',
           @date_created datetime = null,
           @last_modified datetime = null,
           @init_point varchar(max) = '',
           @preapproval_plan_id varchar(max) = '',
           @frequency int = 0,
           @frequency_type varchar(max) = '',
           @transaction_amount decimal(16,2) = 0,
           @currency_id varchar(max) = '',
           @start_date datetime = null,
           @billing_day int = 0,
           @billing_day_proportional bit = 0,
           @has_billing_day bit = 0,
           @free_trial varchar(max) = '',
           @next_payment_date datetime = null,
           @payment_method_id varchar(max) = '',
           @card_id varchar(max) = '',
           @first_invoice_offset varchar(max) = '',
           @token varchar(max) = ''

	--WITH ENCRYPTION			 
	AS
	set noCount on

	INSERT INTO [_Datos]..[MP_SuscriptionResponseAuthorized]
    (id,payer_id,payer_email,back_url,collector_id,application_id,status,
     reason,external_reference,date_created,last_modified,init_point,
     preapproval_plan_id,frequency,frequency_type,transaction_amount,currency_id,
     start_date,billing_day,billing_day_proportional,has_billing_day,free_trial,
     next_payment_date,payment_method_id,card_id,first_invoice_offset,token)
     VALUES
    (@id,@payer_id,@payer_email,@back_url,@collector_id,@application_id,@status,
     @reason,@external_reference,@date_created,@last_modified,@init_point,
     @preapproval_plan_id,@frequency,@frequency_type,@transaction_amount,@currency_id,
     @start_date,@billing_day,@billing_day_proportional,@has_billing_day,@free_trial,
     @next_payment_date,@payment_method_id,@card_id,@first_invoice_offset,@token);

	 exec [dbo].[MP_SuscriptionRequestUpdate]
		@token = @token,
		@estado = @status