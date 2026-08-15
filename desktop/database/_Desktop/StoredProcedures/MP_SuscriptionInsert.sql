CREATE OR ALTER PROCEDURE [dbo].[MP_SuscriptionInsert]
           @id varchar(max) = ''
           ,@payer_id varchar(max) = ''
           ,@payer_email varchar(250) = ''
           ,@status varchar(50) = ''
           ,@plan_id varchar(max) = ''
		   ,@plan_name varchar(max) = ''
           ,@external_reference varchar(max) = ''
           ,@date_created datetime = '19000101'
           ,@last_modified datetime = '19000101'
           ,@auto_recurring_frequency int = 0
           ,@auto_recurring_frequency_type varchar(50) = ''
           ,@auto_recurring_transaction_amount decimal(9,2)
           ,@auto_recurring_currency_id varchar(50) = ''
           ,@auto_recurring_start_date datetime = '19000101'
           ,@last_payment_date datetime = '19000101'
		   ,@next_payment_date datetime = '19000101'
		   ,@payment_gateway varchar(255) = ''
		   ,@meta_data varchar(8000) = ''
	--WITH ENCRYPTION			 
	AS
	set noCount on
	DECLARE @idControl varchar(MAX) = 'NO'

	SELECT @idControl=id FROM _Datos..MP_Subscriptions WHERE id=@id

	IF @idControl = 'NO'
	BEGIN
		INSERT INTO _Datos..MP_Subscriptions
           ([id]
           ,[payer_id]
           ,[payer_email]
           ,[status]
           ,[plan_id]
           ,[plan_name]
           ,[external_reference]
           ,[date_created]
           ,[last_modified]
           ,[auto_recurring_frequency]
           ,[auto_recurring_frequency_type]
           ,[auto_recurring_transaction_amount]
           ,[auto_recurring_currency_id]
           ,[auto_recurring_start_date]
           ,[last_payment_date]
           ,[next_payment_date]
           ,[payment_gateway]
		   ,[meta_data])
		VALUES
           (@id
           ,@payer_id
           ,@payer_email
           ,@status
           ,@plan_id
           ,@plan_name
           ,@external_reference
           ,@date_created
		   ,@last_modified
           ,@auto_recurring_frequency
           ,@auto_recurring_frequency_type
           ,@auto_recurring_transaction_amount
           ,@auto_recurring_currency_id
           ,@auto_recurring_start_date
           ,@last_payment_date
		   ,@next_payment_date
		   ,@payment_gateway
		   ,@meta_data)
	END
	ELSE
	BEGIN
		UPDATE _Datos..MP_Subscriptions
		SET [id]=@id
           ,[payer_id]=@payer_id
           ,[payer_email]=@payer_email
           ,[status]=@status
           ,[plan_id]=@plan_id
           ,[plan_name]=@plan_name
           ,[external_reference]=@external_reference
           ,[date_created]=@date_created
           ,[last_modified]=@last_modified
           ,[auto_recurring_frequency]=@auto_recurring_frequency
           ,[auto_recurring_frequency_type]=@auto_recurring_frequency_type
           ,[auto_recurring_transaction_amount]=@auto_recurring_transaction_amount
           ,[auto_recurring_currency_id]=@auto_recurring_currency_id
           ,[auto_recurring_start_date]=@auto_recurring_start_date
           ,[last_payment_date]=@last_payment_date
           ,[next_payment_date]=@next_payment_date
           ,[payment_gateway]=@payment_gateway
		   ,[meta_data]=@meta_data
		WHERE [id] = @id
	END