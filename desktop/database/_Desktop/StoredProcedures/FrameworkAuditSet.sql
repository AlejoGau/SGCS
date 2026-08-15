--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:39.233 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:35.180 
--#############################################################################

CREATE OR ALTER PROCEDURE [dbo].[FrameworkAuditSet]  
 @UserId int,  
 @ObjectTypeId int,  
 @ObjectId int,  
 @FunctionName NVARCHAR(25),  
 @Xml NVARCHAR(max) = null  
AS    	   

 SET NOCOUNT ON
 
 DECLARE @ObjectName NVARCHAR(64)
 SELECT @ObjectName = Name FROM [Object] WHERE Id = @ObjectTypeId
  
 DECLARE @FunctionId INT  
 SELECT @FunctionId = Id FROM [Function] WHERE Name = @FunctionName  
       
 DECLARE @Audit INT  
 SELECT @Audit = isnull(Audit, 0) FROM Permission WHERE ObjectId = @ObjectTypeId and FunctionId = @FunctionId  
   
 IF @Audit <> 0  
 BEGIN  
  DECLARE @AuditDate DATETIME  
  SELECT @AuditDate = getdate()  
   
  INSERT INTO FrameworkAudit (UserId, ObjectTypeId, ObjectId, ObjectName, FunctionId, AuditDate, [XmlNew])   
               VALUES (@UserId, @ObjectTypeId, @ObjectId, @ObjectName, @FunctionId, @AuditDate, @Xml)  
 END