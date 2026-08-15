CREATE OR ALTER PROCEDURE [dbo].[MP_Planes_Suscripcion_Update]
           @id varchar(max),
           @name varchar(max),
           @status varchar(50),
           @last_change datetime,
           @currency_code varchar(50),
           @amount decimal(16,2),
           @frecuency_type varchar(50),
           @frecuency_unit int
	--WITH ENCRYPTION
	AS
UPDATE _Datos..[MP_Planes_Suscripcion]
SET [name] = @name
    ,[status] = @status
    ,[last_change] = @last_change
    ,[currency_code] = @currency_code
    ,[amount] = @currency_code
    ,[frecuency_type] = @frecuency_type
    ,[frecuency_unit] = @frecuency_unit
WHERE [id] = @id