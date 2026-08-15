--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2023-09-28 16:43:00.000 
-- exec [SoftGuard_MembershipProvider_ValidateBlocking]  @Username ='pflores@synapticlinks.com.ar',@Loginsuccess=0
-- exec [SoftGuard_MembershipProvider_ValidateBlocking]  @Username ='pflores@synapticlinks.com.ar',@Loginsuccess=1
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_MembershipProvider_ValidateBlocking]
 @Username NVARCHAR(50),      
 @Loginsuccess tinyint = 0
AS
BEGIN
	SET NOCOUNT ON

	DECLARE @loginresult INT = 0, @udw_idKey int = 0,@udw_estado tinyint, @udw_iloginfallido int = 0, @udw_fechahorabloqueo datetime, @usertiempobloqueo int = 0
       
	SELECT @udw_idKey = udw_idKey, @udw_iloginfallido = udw_iloginfallido,@udw_fechahorabloqueo = udw_fechahorabloqueo, @udw_estado = udw_estado
	FROM _Sistema.dbo.UsersDesktopWeb
	WHERE udw_usuario = @Username

	IF (@udw_estado = 1) --Federico V 01/12/2025 agrego esta condicion a pedido de esta tarea https://softguard.atlassian.net/browse/DSS-1424. 
    BEGIN
        SELECT -1
        RETURN
    END

	select @usertiempobloqueo = par_ivalor from _Tablas.dbo.t_parametros where par_ccodigo = 'USERTIEMPOBLOQUEO'
	/*
	Cases:
	- IF not existing user
		- Return 0
	- ELSE If existing user
		IF Parameter disabled
			RETURN 0/1, CLEANUP
		ELSE
			IF (user is blocked)
				IF (login is Success)
					IF (Awaiting period passed)
						RETURN 1, CLEANUP
					ELSE
						RETURN -1
				ELSE
					RETURN -1
			ELSE (not blocked user)
				IF (login is Success)
					RETURN 1, CLEANUP
				ELSE
					IF (Counter = 0 or 1)
						RETURN 0 / INCREMENT COUNTER
					IF (Counter =2)
						RETURN -1 / DISABLE ACCOUNT / SET FechaHoraBloqueo / SET COUNTER=1					
	*/

	IF (@udw_idKey > 0)
	BEGIN
		IF (@usertiempobloqueo = 0)
		BEGIN
			SET @loginresult = @Loginsuccess  --0/1 if success or not

			--CLEANUP
			UPDATE _Sistema.dbo.UsersDesktopWeb
			SET udw_estado = 0, udw_fechahorabloqueo = null, udw_iloginfallido = 0
			WHERE udw_idKey = @udw_idKey 
		END
		ELSE -- @usertiempobloqueo > 0
		BEGIN
			SELECT @loginresult = 
				CASE 
					WHEN @udw_estado = 1 AND @Loginsuccess = 1 AND (DATEDIFF(MINUTE, @udw_fechahorabloqueo, GETDATE()) >= @usertiempobloqueo) THEN 1
					WHEN @udw_estado = 1 AND @Loginsuccess = 1 AND (DATEDIFF(MINUTE, @udw_fechahorabloqueo, GETDATE()) < @usertiempobloqueo) THEN -1
					WHEN @udw_estado = 1 AND @Loginsuccess = 0 THEN -1
					WHEN @udw_estado = 0 AND @Loginsuccess = 1 THEN 1
					WHEN @udw_estado = 0 AND @Loginsuccess = 0 AND @udw_iloginfallido IN (0,1) THEN 0
					WHEN @udw_estado = 0 AND @Loginsuccess = 0 AND @udw_iloginfallido = 2 THEN -1
				END
		
			-- User not blocked but login not done successfully, increment loginfallido counter
			IF (@loginresult = 0)
			BEGIN
				UPDATE _Sistema.dbo.UsersDesktopWeb
				SET udw_iloginfallido = udw_iloginfallido + 1
				WHERE udw_idKey = @udw_idKey
			END
			ELSE IF (@loginresult = 1) -- user login success, cleanup blocking data
			BEGIN
				UPDATE _Sistema.dbo.UsersDesktopWeb
				SET udw_estado = 0, udw_fechahorabloqueo = null, udw_iloginfallido = 0
				WHERE udw_idKey = @udw_idKey
			END
			ELSE IF (@loginresult = -1 AND @udw_estado = 0 AND @Loginsuccess = 0 AND @udw_iloginfallido = 2) -- not blocked user but with 2 attempts, should be blocked
			BEGIN
				UPDATE _Sistema.dbo.UsersDesktopWeb
				SET udw_estado = 1, udw_fechahorabloqueo = GETDATE(), udw_iloginfallido = udw_iloginfallido + 1
				WHERE udw_idKey = @udw_idKey
			END
		END	
	END
	ELSE 
	BEGIN
		SET @loginresult = 0
	END

	SELECT ISNULL(@loginresult,1) --Daniel O. Medina 06/06/2024 agrego esto porque si el usuario está tiene valor en uno en udw_estado y NULL en udw_fechahorabloqueo devolvía NULL
							      --y fallaba el ingreso al Desktop de sencha.
END