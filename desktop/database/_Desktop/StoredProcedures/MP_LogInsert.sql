CREATE OR ALTER PROCEDURE [dbo].[MP_LogInsert]
	@token varchar(max),
	@tipo varchar(max) = '',
	@JsonRequest varchar(max)

	--WITH ENCRYPTION			 
	AS
	set noCount on

	INSERT INTO [_Datos]..[MP_Log]
    ([fecha],[token],[tipo],[JsonRequest])
     VALUES
	(GETDATE(),@token,@tipo,@JsonRequest)

	--VARIABLE SUSCRIPCIONES
	DECLARE @external_reference varchar(max) = '';
	DECLARE @resource NVARCHAR(MAX);
	DECLARE @id varchar(max) = '';
	DECLARE @status varchar(50) = '';
	DECLARE @plan_id varchar(max) = '';
	DECLARE @plan_name varchar(max) = '';
    DECLARE @auto_recurring_frequency int = 0;
    DECLARE @auto_recurring_frequency_type varchar(50) = '';
    DECLARE @auto_recurring_transaction_amount decimal(9,2);
    DECLARE @auto_recurring_currency_id varchar(50) = '';
	DECLARE @date_created datetime = '19000101';
	DECLARE @auto_recurring_start_date datetime = '19000101';
	DECLARE @last_modified datetime = '19000101';
	DECLARE @subscriber NVARCHAR(MAX);
	DECLARE @payer_id varchar(max);
	DECLARE @payer_email varchar(250) = '';
	DECLARE @payment_gateway varchar(255);
	DECLARE @meta_data varchar(8000);
	DECLARE @billing_info NVARCHAR(MAX);
	DECLARE @next_payment_date datetime = '19000101';
	DECLARE @last_payment NVARCHAR(MAX);
	DECLARE @last_payment_date datetime = '19000101';


	IF @tipo = 'WEB HOOK PAYPAL'
	BEGIN
		DECLARE @event_type VARCHAR(255);
		SELECT @event_type = value FROM OpenJson(@JsonRequest)
		WHERE [key] = 'event_type'
		
		IF @event_type = 'BILLING.SUBSCRIPTION.ACTIVATED' OR @event_type = 'BILLING.SUBSCRIPTION.CANCELLED' OR @event_type = 'BILLING.SUBSCRIPTION.SUSPENDED'
		BEGIN
			SELECT @resource = value FROM OpenJson(@JsonRequest)
			WHERE [key] = 'resource'
			
			--ID SUSCRIPCION
			SELECT @id=value FROM OpenJson(@resource)
			WHERE [key] = 'id'
			--STATUS
			SELECT @status=value FROM OpenJson(@resource)
			WHERE [key] = 'status'
			--ID PLAN			
			SELECT @plan_id=value FROM OpenJson(@resource)
			WHERE [key] = 'plan_id'
			--NAME PLAN - FRECUENCY UNIT - FRECUENCY TYPE, CURRENCY, AMOUNT
			SELECT 
				@plan_name = name, 
				@auto_recurring_frequency = frecuency_unit,
				@auto_recurring_frequency_type = frecuency_type,
				@auto_recurring_transaction_amount = amount,
				@auto_recurring_currency_id = currency_code
			FROM _Datos..MP_Planes_Suscripcion
			WHERE id=@plan_id
			--DATE CREATED
			SELECT @date_created=value, @auto_recurring_start_date=value FROM OpenJson(@resource)
			WHERE [key] = 'create_time'
			--LAST MODIFIED 
			SELECT @last_modified=value FROM OpenJson(@resource)
			WHERE [key] = 'update_time'

			SELECT @subscriber = value FROM OpenJson(@resource)
			WHERE [key] = 'subscriber'

			--PAYER ID
			SELECT @payer_id = value FROM OpenJson(@subscriber)
			WHERE [key] = 'payer_id'
			--PAYER EMAIL
			SELECT @payer_email = value FROM OpenJson(@subscriber)
			WHERE [key] = 'email_address'
			--PAYMENT GATEWAY
			SET @payment_gateway = 'PAYPAL';
		    SET @meta_data = @JsonRequest;
		    
			SELECT @billing_info = value FROM OpenJson(@resource)
			WHERE [key] = 'billing_info'

			--NEXT PAYMENT DATE			
			IF @event_type = 'BILLING.SUBSCRIPTION.ACTIVATED'
			BEGIN
				SELECT @next_payment_date = value FROM OpenJson(@billing_info)
				WHERE [key] = 'next_billing_time'
			END

			--LAST PAYMENT DATE
			SELECT @last_payment = value FROM OpenJson(@billing_info)
			WHERE [key] = 'last_payment'
            
			SELECT @last_payment_date = value FROM OpenJson(@last_payment)
			WHERE [key] = 'time';

			EXEC MP_SuscriptionInsert @id, @payer_id, @payer_email, @status, @plan_id, @plan_name,
				@external_reference, @date_created, @last_modified, @auto_recurring_frequency,
				@auto_recurring_frequency_type, @auto_recurring_transaction_amount, @auto_recurring_currency_id,
				@auto_recurring_start_date, @last_payment_date, @next_payment_date, @payment_gateway,
				@meta_data
		END
		
		IF @event_type = 'PAYMENT.SALE.COMPLETED'
		BEGIN
			DECLARE @resourcePago NVARCHAR(MAX);
			SELECT @resourcePago = value FROM OpenJson(@JsonRequest)
			WHERE [key] = 'resource'
			
			--ID FACTURA
			DECLARE @F_id varchar(max) = ''
			SELECT @F_id=value FROM OpenJson(@resourcePago)
			WHERE [key] = 'id'

			DECLARE @F_type varchar(50) = ''

			--DATE CREATE
			DECLARE @F_date_created datetime = '19000101'
			SELECT @F_date_created=value FROM OpenJson(@resourcePago)
			WHERE [key] = 'create_time'

			--LAST MODIFIED
			DECLARE @F_last_modified datetime = '19000101'
			SELECT @F_last_modified=value FROM OpenJson(@resourcePago)
			WHERE [key] = 'update_time'

			--SUSCRIPCION ID
			DECLARE @F_suscription_id varchar(max) = ''
			SELECT @F_suscription_id=value FROM OpenJson(@resourcePago)
			WHERE [key] = 'billing_agreement_id'

			--NAME PLAN 
			DECLARE @F_plan_name varchar(max) = ''
			SELECT 
				@F_plan_name = A.name
			FROM _Datos..MP_Subscriptions B
			INNER JOIN _Datos..MP_Planes_Suscripcion A ON A.id=B.plan_id
			WHERE B.id='I-8CSU0C76P8FW'

			DECLARE @F_amount NVARCHAR(MAX);
			SELECT @F_amount = value FROM OpenJson(@resourcePago)
			WHERE [key] = 'amount'

			--CURRENCY ID
			DECLARE @F_currency_id varchar(50) = ''
			SELECT @F_currency_id=value FROM OpenJson(@F_amount)
			WHERE [key] = 'currency'

			--TRANSACTION AMOUNT
			DECLARE @F_transaction_amount decimal(16,2) = 0
			SELECT @F_transaction_amount=value FROM OpenJson(@F_amount)
			WHERE [key] = 'total'

			--STATUS
			DECLARE @F_status varchar(max) = ''
			DECLARE @F_@payment_status varchar(max) = ''
			SELECT @F_status=value, @F_@payment_status=value FROM OpenJson(@resourcePago)
			WHERE [key] = 'state'

			DECLARE @F_payment_gateway varchar(50) = 'PAY PAL'
           
            DECLARE @F_meta_data varchar(8000) = @JsonRequest

			EXEC MP_FacturasInsert @F_id, @F_type, @F_date_created, @F_last_modified, @F_suscription_id, 
				@F_plan_name, @F_currency_id, @F_transaction_amount, @F_status, @F_@payment_status,
				@F_payment_gateway, @F_meta_data
		END
	END
	/*IF @tipo = 'SUSCRIPTION RESPONSE'
	BEGIN
			SELECT @external_reference = 
			value FROM OpenJson(@JsonRequest)
			WHERE [key] = 'external_reference'
			
			SELECT @id=value FROM OpenJson(@JsonRequest)
			WHERE [key] = 'id'

			SELECT @status=value FROM OpenJson(@JsonRequest)
			WHERE [key] = 'status'

			SELECT @plan_id=value FROM OpenJson(@JsonRequest)
			WHERE [key] = 'preapproval_plan_id'

			SELECT 
				@plan_name = name, 
				@auto_recurring_frequency = frecuency_unit,
				@auto_recurring_frequency_type = frecuency_type,
				@auto_recurring_transaction_amount = amount,
				@auto_recurring_currency_id = currency_code
			FROM _Datos..MP_Planes_Suscripcion
			WHERE id=@plan_id

			SELECT @date_created=value, @auto_recurring_start_date=value FROM OpenJson(@JsonRequest)
			WHERE [key] = 'date_created'

			SELECT @last_modified=value FROM OpenJson(@JsonRequest)
			WHERE [key] = 'last_modified'

			SELECT @payer_id = value FROM OpenJson(@JsonRequest)
			WHERE [key] = 'payer_id'

			SELECT @payer_email = value FROM OpenJson(@JsonRequest)
			WHERE [key] = 'payer_email'
		    SET @payment_gateway = 'MERCADO PAGO'

		    SET @meta_data = @JsonRequest;

			SELECT @next_payment_date = value FROM OpenJson(@JsonRequest)
			WHERE [key] = 'next_payment_date'

			SELECT @last_payment_date = @next_payment_date

			EXEC MP_SuscriptionInsert @id, @payer_id, @payer_email, @status, @plan_id, @plan_name,
				@external_reference, @date_created, @last_modified, @auto_recurring_frequency,
				@auto_recurring_frequency_type, @auto_recurring_transaction_amount, @auto_recurring_currency_id,
				@auto_recurring_start_date, @last_payment_date, @next_payment_date, @payment_gateway,
				@meta_data
	END*/