--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:36.883 

-- exec [SoftGuard_MembershipProvider_ValidateUser]  @Username ='pflores@synapticlinks.com.ar',@Password = 'pflores',@EncryptedPassword='ZlypMqEFTtk15y1JH8AfXA=1'
-- exec [SoftGuard_MembershipProvider_ValidateUser]  @Username ='pflores@synapticlinks.com.ar',@Password = 'pflores',@EncryptedPassword='ZlypMqEFTtk15y1JH8AfXA=='


--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SoftGuard_MembershipProvider_ValidateUser]      
 @Username NVARCHAR(50),      
 @Password NVARCHAR(128),    
 @EncryptedPassword NVARCHAR(128) = ''    
AS      
 SET NOCOUNT ON              
       
 SELECT COUNT(*) FROM _Sistema.dbo.UsersDesktopWeb WHERE udw_usuario = @Username AND udw_clave = @EncryptedPassword