--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:38.167 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.230 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[DesktopModulesAvailableByUser]      
 @Id INT,      
 @page INT = 1,                     
 @start INT = 0,                     
 @limit INT = 50,                     
 @sort NVARCHAR(64) = '',                  
 @filter NVARCHAR(2048) = '',            
 @token NVARCHAR(128)= '',    
 @_dc NVARCHAR(256) = '',                    
 @totalrows INT = 1 OUTPUT                     
AS        
 SET NOCOUNT ON        
     
 --Load Security    
 DECLARE @UserId INT    
 SELECT @UserId = dbo.GetUserIdByToken(@token)   
 
 declare @UserType int 
 select @UserType = udw_tipo from _sistema..usersdesktopweb
     
 DECLARE @HasAdministratorModule INT    
 DECLARE @HasMasterWebDealerModule INT    
 DECLARE @HasTrackguardModule INT  
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator'), 
 @HasMasterWebDealerModule = dbo.UserDesktopWebHasModule(@UserId, 'MasterWebDealer'), 
 @HasTrackguardModule = dbo.UserDesktopWebHasModule(@UserId, 'Trackguard') 

     
 --Load - User Has MasterWebDealer or Dealer    
 DECLARE @UserHasMasterWebDealer INT    
 DECLARE @UserHasWebDealer INT     
 SELECT @UserHasMasterWebDealer = dbo.UserDesktopWebHasModule(@Id, 'MasterWebDealer'), 
 @UserHasWebDealer = dbo.UserDesktopWebHasModule(@Id, 'WebDealer')
     
     
 --Load - User Has Trackguard or TrackguardMonitoreo    
 DECLARE @UserHasTrackguard INT    
 DECLARE @UserHasTrackguardMonitoreo INT    
 SELECT @UserHasTrackguard = dbo.UserDesktopWebHasModule(@Id, 'Trackguard'), @UserHasTrackguardMonitoreo = dbo.UserDesktopWebHasModule(@Id, 'Trackguardmonitoreo')    
     
 --Query    
 DECLARE @Sql NVARCHAR(1024)    

 
 SET @Sql = 'SELECT *, dbo.SoftGuard_SecurityManager_Module_GetQuantityOfUsers(udm_idKey) AS QuantityOfUsers  
        FROM _Sistema.dbo.UsersDesktopModules     
        WHERE udm_disponible IN (1,3) 
            AND udm_idKey NOT IN (SELECT dwm_idModules FROM _Sistema.dbo.UsersDesktopWebModulos WHERE dwm_idWeb = ' + CAST(@Id AS VARCHAR) + ') 
     ' 
         
    
 --Filter - User Has MasterWebDealer or Dealer    
 IF (@UserHasMasterWebDealer != 0)
 SET @Sql = @Sql + ' AND udm_key_reference != ''WebDealer'' ' 
     
IF @UserHasWebDealer != 0    
 SET @Sql = @Sql + ' AND udm_key_reference != ''MasterWebDealer'' '     
    
 --Filter - User Has MasterWebDealer or Dealer    
 IF @UserHasTrackguard != 0 
 SET @Sql = @Sql + ' AND udm_key_reference != ''TrackguardMonitoreo'' '    
     
IF @UserHasTrackguardMonitoreo != 0    
 SET @Sql = @Sql + ' AND udm_key_reference != ''Trackguard'' '   
 
IF @UserType = 2  AND @HasMasterWebDealerModule = 1
 SET @Sql = @Sql + ' AND udm_key_reference != ''Trackguard'' '   


PRINT '@HasAdministratorModule ' + CAST(@HasAdministratorModule AS VARCHAR(MAX));
PRINT '@HasMasterWebDealerModule ' + CAST(@HasMasterWebDealerModule AS VARCHAR(MAX));

 --Filter Security    
 IF @HasAdministratorModule = 0 AND @HasMasterWebDealerModule = 0    
 SET @Sql = @Sql + ' AND 1=2 '    
     
 IF @HasAdministratorModule = 0 AND @HasMasterWebDealerModule = 1 
 BEGIN   
	SET @Sql = @Sql + ' AND udm_key_reference != ''MasterWebDealer'' AND udm_idKey IN (SELECT dwm_idModules FROM _Sistema.dbo.UsersDesktopWebModulos WHERE dwm_idWeb = ' + CAST(@UserId AS VARCHAR) + ') '  
 END

 IF @HasAdministratorModule = 0 AND @HasMasterWebDealerModule = 1 AND @Id != @UserId AND @UserHasWebDealer = 0  
 BEGIN      
	SET @Sql = @Sql + ' OR udm_key_reference = ''WebDealer'' '
 END

 IF @UserHasMasterWebDealer = 1 AND @Id != @UserId AND @UserHasTrackguard = 1  
 BEGIN    
	SET @Sql = @Sql + ' OR udm_key_reference = ''TrackguardMonitoreo'' '
 END

 IF @UserHasMasterWebDealer = 1 AND @Id != @UserId AND @UserHasTrackguardMonitoreo = 1  
 BEGIN    
	SET @Sql = @Sql + ' OR udm_key_reference = ''Trackguard'' '
 END

  -- testeo que el administrator sea full
 if  @HasAdministratorModule = 1  
 BEGIN
	-- es administrador me fijo que sea full
	declare @iscuentas int = 0;

	select @iscuentas = count(*) FROM [_Sistema].[dbo].[UsersDesktopWebModulosSecurity]
						where charindex('"rights":{"cuenta":true',ums_data) >0
						and ums_idModules = 1 
						and [ums_idWeb] = @UserId

	-- si es cuentas le saco el administrator
	if @iscuentas > 0
		BEGIN
            SET @Sql = @Sql + ' AND udm_key_reference != ''Administrator'' AND udm_idKey IN (SELECT dwm_idModules FROM _Sistema.dbo.UsersDesktopWebModulos WHERE dwm_idWeb = ' + CAST(@UserId AS VARCHAR) + ') '  
        END
END 
 

 SET @Sql = @Sql + ' ORDER BY udm_modulo ASC '    
     
print @Sql
-- Execute Query    
EXEC(@Sql)