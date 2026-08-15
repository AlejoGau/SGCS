--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:35.380 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:31.627 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[Slbf_Token_CreateToken]    
 @ClientId NVARCHAR(200),    
 @UserId NVARCHAR(200),  
 @UserData NVARCHAR(MAX)   
AS    
 SET NOCOUNT ON    
     
 --VALID APPLICATION    
 DECLARE @ValidApplication INT    
 DECLARE @tokenCount int
 --SELECT @UserData = '' -- user data es la IP remota del usuario... 
 SELECT @ValidApplication = COUNT(Id) FROM [Application] WHERE ClientId = @ClientId    
 SELECT @tokenCount = COUNT(Id) FROM Token WHERE ClientId = @ClientId AND UserId = @UserId
     
 --CREATE TOKEN    
 IF (@ValidApplication = 1)-- AND @tokenCount = 0)
 BEGIN
	-- si el usuario es demo
	if (@UserId = 'demo@softguard.com')
	BEGIN
		declare @istoken int;
		select @istoken = count(*) from token WHERE ClientId = @ClientId and UserId = @UserId
		if (@istoken = 0)
		BEGIN
		INSERT INTO Token (ClientId, UserId, Code, AccessToken, UserData)    
		  VALUES (@ClientId, @UserId, NEWID(), NEWID(), @UserData) 
		END

	END
	ELSE
	BEGIN
		-- no borro el token y si existe lo dejo pasar
		--DELETE FROM Token WHERE ClientId = @ClientId and UserId = @UserId
		if exists (select AccessToken from Token where ClientId = @ClientId and UserId = @UserId)
		BEGIN
			UPDATE Token set ClientId=@ClientId
				, UserId=@UserId
				, Code = NEWID()
				, AccessToken = NEWID()
				, UserData = @UserData 
				where ClientId = @ClientId and UserId = @UserId
		END
		ELSE 
		BEGIN
			INSERT INTO Token (ClientId, UserId, Code, AccessToken, UserData)    
				VALUES (@ClientId, @UserId, NEWID(), NEWID(), @UserData)
		END
	 
	  
	END 
	
	-- piso los permisos con el perfil actualizado
	declare @udw_iperfil int
	declare @udw_idkey int

	Select @udw_iperfil = udw_iperfil,@udw_idkey = udw_idkey  from _sistema..usersdesktopweb where udw_usuario = @UserId
	-- si hay perfil actualizo
	if (@udw_iperfil is not null AND @udw_iperfil!=0)
	exec _desktop..ApplyProfile @udw_idkey=@udw_idkey,@udw_iperfil=@udw_iperfil
	

 END
        
 --RETURN CODE  
 SELECT Code FROM Token WHERE ClientId = @ClientId AND UserId = @UserId