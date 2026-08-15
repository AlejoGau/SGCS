--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.883 
-- exec [SoftGuard_MembershipProvider_ValidateUser_test]  @Username ='pflores@synapticlinks.com.ar',@Password = 'pflores',@EncryptedPassword='pflores'
-- exec [SoftGuard_MembershipProvider_ValidateUser_test]  @Username ='pflores@synapticlinks.com.ar',@Password = 'pflores',@EncryptedPassword='ZlypMqEFTtk15y1JH8AfXA=='
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_MembershipProvider_ValidateUser_test]      
 @Username NVARCHAR(50),      
 @Password NVARCHAR(128),    
 @EncryptedPassword NVARCHAR(128) = ''    
AS      
 SET NOCOUNT ON

DECLARE @loginresult INT = 0, @udw_idKey int = 0,@udw_estado tinyint, @udw_iloginfallido int = 0, @udw_fechahorabloqueo datetime, @loginsuccess tinyint = 0, @usertiempobloqueo int = 0
       
SELECT @udw_idKey = udw_idKey, @udw_iloginfallido = udw_iloginfallido,@udw_fechahorabloqueo = udw_fechahorabloqueo, @udw_estado = udw_estado
	, @loginsuccess = case when udw_clave = @EncryptedPassword then 1 else 0 end
FROM _Sistema.dbo.UsersDesktopWeb
WHERE udw_usuario = @Username

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


if (@udw_idKey > 0)
BEGIN
	IF (@usertiempobloqueo = 0)
	BEGIN
		SET @loginresult = @loginsuccess  --0/1 if success or not

		--CLEANUP
		UPDATE _Sistema.dbo.UsersDesktopWeb
		SET udw_estado = 0, udw_fechahorabloqueo = null, udw_iloginfallido = 0
		WHERE udw_idKey = @udw_idKey 

		print 'aqui'
	END
	ELSE -- @usertiempobloqueo > 0
	BEGIN
		print 'aqui3'
		SELECT @loginresult = 
			CASE 
				WHEN @udw_estado = 1 AND @loginsuccess = 1 AND (DATEDIFF(MINUTE, @udw_fechahorabloqueo, GETDATE()) >= @usertiempobloqueo) THEN 1
				WHEN @udw_estado = 1 AND @loginsuccess = 1 AND (DATEDIFF(MINUTE, @udw_fechahorabloqueo, GETDATE()) < @usertiempobloqueo) THEN -1
				WHEN @udw_estado = 1 AND @loginsuccess = 0 THEN -1
				WHEN @udw_estado = 0 AND @loginsuccess = 1 THEN 1
				WHEN @udw_estado = 0 AND @loginsuccess = 0 AND @udw_iloginfallido IN (0,1) THEN 0
				WHEN @udw_estado = 0 AND @loginsuccess = 0 AND @udw_iloginfallido = 2 THEN -1
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
		ELSE IF (@loginresult = -1 AND @udw_estado = 0 AND @loginsuccess = 0 AND @udw_iloginfallido = 2) -- not blocked user but with 2 attempts, should be blocked
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
	print 'aqui2'
	PRINT @loginresult
END

SELECT @loginresult