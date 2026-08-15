CREATE OR ALTER PROCEDURE [dbo].[MP_FacturasInsert]
           @id varchar(255) = ''
		   ,@type varchar(50) = ''
           ,@date_created datetime = '19000101'
           ,@last_modified datetime = '19000101'
           ,@suscription_id varchar(max) = ''
           ,@plan_name varchar(max) = ''
           ,@currency_id varchar(50) = ''
           ,@transaction_amount decimal(16,2) = 0
           ,@status varchar(50) = ''
           ,@payment_status varchar(250) = ''
		   ,@payment_gateway varchar(250) = ''
           ,@meta_data varchar(8000) = ''
	--WITH ENCRYPTION			 
	AS
	set noCount on
	DECLARE @idControl varchar(MAX) = 'NO'

	SELECT @idControl=id FROM _Datos..MP_Facturas WHERE id=@id

	IF @idControl = 'NO'
	BEGIN
		INSERT INTO _Datos..MP_Facturas
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
           ,[meta_data])
		VALUES
           (@id
		   ,@type
           ,@date_created
           ,@last_modified
           ,@suscription_id
           ,@plan_name
           ,@currency_id
           ,@transaction_amount
           ,@status
           ,@payment_status
           ,@payment_gateway
           ,@meta_data)	
	END
	ELSE
	BEGIN
		UPDATE _Datos..MP_Facturas
		SET 
		   [type] = @type
		  ,[date_created] = @date_created
		  ,[last_modified] = @last_modified
		  ,[suscription_id] = @suscription_id
		  ,[plan_name] = @plan_name
		  ,[currency_id] = @currency_id
		  ,[transaction_amount] = @transaction_amount
		  ,[status] = @status
		  ,[payment_status] = @payment_status
		  ,[payment_gateway] = @payment_gateway
		  ,[meta_data] = @meta_data
		WHERE [id] = @id
	END