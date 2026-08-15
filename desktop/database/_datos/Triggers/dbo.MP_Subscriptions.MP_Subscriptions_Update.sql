-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[MP_Subscriptions_Update]
   ON  [dbo].[MP_Subscriptions]
   AFTER UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

INSERT INTO [dbo].[MP_Subscriptions_History]
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
		   ,[meta_data]
		   ,[fecha_modificacion])
SELECT    [id]
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
		   ,[meta_data]
           ,GETDATE() FROM deleted

END