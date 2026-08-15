CREATE OR ALTER PROCEDURE [dbo].[getSqlOrganizationParentForToken]
 @childObjectName NVARCHAR(128) = 'Organization',
 @childObjectIdName NVARCHAR(64) = 'Id',
 @token NVARCHAR(128) = '',
 @SqlFilterOrganization NVARCHAR(MAX) = '' OUTPUT,
 @alias NVARCHAR(10) = 'o'
AS
BEGIN

/***
@token = Token del usuario para tomar el rango
@alias = es string para acoplar con el store que lo utiliza
@SqlFilterOrganization = output

**** CODIGO DE IMPLEMENTACION ****

 -- Organizaciones
DECLARE @SqlFilterOrganization AS NVARCHAR(max)
EXEC [getSqlOrganizationParentForToken] @token = @token, @SqlFilterOrganization = @SqlFilterOrganization OUTPUT

SET @SqlFilter = @SqlFilter + @SqlFilterOrganization

*/


--Load Security    
 DECLARE @UserId INT    
 SELECT @UserId = dbo.GetUserIdByToken(@token)
 
 print '[getSqlOrganizationParentForToken] @UserId'
 print @UserId 
     
 DECLARE @HasAdministratorModule INT 
 SELECT @HasAdministratorModule = dbo.UserDesktopWebHasModule(@UserId, 'Administrator')  

 DECLARE @HasWebManagerModule INT 
 SELECT @HasWebManagerModule = dbo.UserDesktopWebHasModule(@UserId, 'WebManager')  
 
 DECLARE @HasWebRemotoModule INT 
 SELECT @HasWebRemotoModule = dbo.UserDesktopWebHasModule(@UserId, 'WebRemoto') 
 
 DECLARE @HasDealerModule INT 
 SELECT @HasDealerModule = dbo.UserDesktopWebHasModule(@UserId, 'WebDealer')

 DECLARE @HasMasterDealerModule INT 
 SELECT @HasMasterDealerModule = dbo.UserDesktopWebHasModule(@UserId, 'MasterWebDealer')
 
 DECLARE @HasTrackguardModule INT 
 SELECT @HasTrackguardModule = dbo.UserDesktopWebHasModule(@UserId, 'TrackGuard')    

 DECLARE @HasSmarttrackModule INT 
 SELECT @HasSmarttrackModule = dbo.UserDesktopWebHasModule(@UserId, 'VigiControl')  

 DECLARE @HasSmartpanicsModule INT 
 SELECT @HasSmartpanicsModule = dbo.UserDesktopWebHasModule(@UserId, 'SmartPanics')

 DECLARE @HasTrackGuardMonitoreoModule INT 
 SELECT @HasTrackGuardMonitoreoModule = dbo.UserDesktopWebHasModule(@UserId, 'TrackGuardMonitoreo')  

 DECLARE @HasSerTecModule INT 
 SELECT @HasSerTecModule = dbo.UserDesktopWebHasModule(@UserId, 'SerTec') 

 DECLARE @HasAwccModule INT 
 SELECT @HasAwccModule = dbo.UserDesktopWebHasModule(@UserId, 'AWCC') 

 print '[getSqlOrganizationParentForToken] Busco modulos para el token: '+@token


 IF (@HasDealerModule = 1 
	OR @HasTrackguardModule = 1 
	OR @HasTrackGuardMonitoreoModule = 1
	OR @HasSmarttrackModule = 1
	OR @HasSmartpanicsModule = 1
	OR @HasSerTecModule = 1
	OR @HasMasterDealerModule = 1
	OR @HasWebManagerModule = 1
	OR @HasAwccModule = 1)
	AND (@HasAdministratorModule != 1)
 BEGIN
	print '[getSqlOrganizationParentForToken] preparo el filter de organizaciones'
	declare @organizationid int = 0

	select @organizationid = convert(int, udw_empresa) from _sistema..usersdesktopweb where udw_idkey=@userid

	DECLARE @ObjectTypeId VARCHAR(64)		
	DECLARE @ObjectId VARCHAR(11)
	DECLARE @RelationObjectTypeId VARCHAR(64)			 											 										
	DECLARE @RelationObjectId VARCHAR(11)

	declare @RelationTable varchar(64) = '_datos';
					
	declare @parentObjectName varchar(64) = 'Organization'

	SELECT @ObjectTypeId = CAST(dbo.GetObjectId(@parentObjectName) AS VARCHAR), 
		@ObjectId = @organizationid, 
		@RelationObjectTypeId = CAST(dbo.GetObjectId(@childObjectName) AS VARCHAR)
		
	print '[getSqlOrganizationParentForToken] @ObjectTypeId'
	print @ObjectTypeId
	print '[getSqlOrganizationParentForToken] @ObjectId'
	print @ObjectId
	print '[getSqlOrganizationParentForToken] @RelationObjectTypeId'
	print @RelationObjectTypeId
	print '[getSqlOrganizationParentForToken] @alias'
	print @alias
	print '[getSqlOrganizationParentForToken] @childObjectIdName'
	print @childObjectIdName

	SET @SqlFilterOrganization = ' AND '+@alias+'.'+@childObjectIdName+' IN (select '+@ObjectId+' union SELECT RelationObjectId FROM '+@RelationTable+'..RelationObject WHERE ObjectTypeId = ' + @ObjectTypeId + ' AND ObjectId = ' + @ObjectId + ' AND RelationObjectTypeId = ' + @RelationObjectTypeId + ') '     
	print '[getSqlOrganizationParentForToken] @SqlFilterOrganization'
	print @SqlFilterOrganization
 END   
 ELSE
 BEGIN
 print '[getSqlOrganizationParentForToken] @HasDealerModule'
 print @HasDealerModule
  print '[getSqlOrganizationParentForToken] @HasTrackguardModule'
 print @HasTrackguardModule
  print '[getSqlOrganizationParentForToken] @HasTrackGuardMonitoreoModule'
 print @HasTrackGuardMonitoreoModule
  print '[getSqlOrganizationParentForToken] @HasSmarttrackModule'
 print @HasSmarttrackModule
  print '[getSqlOrganizationParentForToken] @HasSmartpanicsModule'
 print @HasSmartpanicsModule
  print '[getSqlOrganizationParentForToken] @HasSerTecModule'
 print @HasSerTecModule
  print '[getSqlOrganizationParentForToken] @HasSerTecModule'
 print @HasSerTecModule
  print '[getSqlOrganizationParentForToken] @HasMasterDealerModule'
 print @HasMasterDealerModule
  print '[getSqlOrganizationParentForToken] @HasWebManagerModule'
 print @HasWebManagerModule
   print '[getSqlOrganizationParentForToken] @HasAwccModule'
 print @HasAwccModule
   print '[getSqlOrganizationParentForToken] @HasAdministratorModule'
 print @HasAdministratorModule

	print '[getSqlOrganizationParentForToken] no se deben filtrar las organizaciones por token'
 END

 print '[getSqlOrganizationParentForToken] @SqlFilterOrganization:'+@SqlFilterOrganization
END