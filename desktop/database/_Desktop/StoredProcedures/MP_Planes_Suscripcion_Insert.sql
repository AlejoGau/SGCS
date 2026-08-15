CREATE OR ALTER PROCEDURE [dbo].[MP_Planes_Suscripcion_Insert]
           @id varchar(max),
           @name varchar(max),
           @status varchar(50),
           @date_created datetime,
           @last_change datetime,
           @currency_code varchar(50),
           @amount decimal(16,2),
           @frecuency_type varchar(50),
           @frecuency_unit int,
           @pay_gateway varchar(50)
	--WITH ENCRYPTION
	AS
	DECLARE @ID_CONTROL VARCHAR(MAX) = '';
	SELECT @ID_CONTROL = ID FROM _Datos..[MP_Planes_Suscripcion]
	WHERE id = @id

	IF @ID_CONTROL = ''
	BEGIN
		INSERT INTO _Datos..[MP_Planes_Suscripcion]
           (
            [id]
           ,[name]
           ,[status]
           ,[date_created]
           ,[last_change]
           ,[currency_code]
           ,[amount]
           ,[frecuency_type]
           ,[frecuency_unit]
           ,[pay_gateway])
		VALUES
           (
            @id
           ,@name
           ,@status
           ,@date_created
           ,@last_change
           ,@currency_code
           ,@amount
           ,@frecuency_type
           ,@frecuency_unit
           ,@pay_gateway)
	END
	ELSE
	BEGIN
		UPDATE _Datos..[MP_Planes_Suscripcion]
		SET [name] = @name
           ,[status] = @status
           ,[last_change] = @last_change
           ,[currency_code] = @currency_code
           ,[amount] = @amount
           ,[frecuency_type] = @frecuency_type
           ,[frecuency_unit] = @frecuency_unit
		WHERE id = @id
	END