-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER TRIGGER [dbo].[MP_Facturas_Update]
   ON  [dbo].[MP_Facturas]
   AFTER UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	INSERT INTO [dbo].[MP_Facturas_History]
           ([id]
		   ,[type]
           ,[date_created]
           ,[last_modified]
           ,[suscription_id]
           ,[plan_name]
           ,[currency_id]
           ,[transaction_amount]
           ,[status]
           ,[payment_status]
           ,[payment_gateway]
		   ,[meta_data]
		   ,[fecha_modificacion])
    SELECT [id]
		   ,[type]
           ,[date_created]
           ,[last_modified]
           ,[suscription_id]
           ,[plan_name]
           ,[currency_id]
           ,[transaction_amount]
           ,[status]
           ,[payment_status]
           ,[payment_gateway]
		   ,[meta_data]
		   ,GETDATE()
	FROM deleted

END