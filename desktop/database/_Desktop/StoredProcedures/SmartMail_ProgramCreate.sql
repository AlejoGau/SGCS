--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:51:37.977 
--#############################################################################

--#############################################################################
-- SOFTGUARD DESKTOP
-- updated : 2017-06-15 08:45:34.060 
--#############################################################################
CREATE OR ALTER PROCEDURE [dbo].[SmartMail_ProgramCreate]    
 @FromName NVARCHAR(128),    
 @FromEmail NVARCHAR(128),    
 @Subject NVARCHAR(256),    
 @Body TEXT,    
 @DateStart DATETIME = GETDATE,    
 @Count INT,    
 @Query NVARCHAR(MAX),     
 @TransportType NVARCHAR(64) = 'MAIL',    
 @Attachments NVARCHAR(MAX) = '',
 @Priority INT = 0,
 @CueIid INT = NULL   
AS    
 SET NOCOUNT ON    
     
 --INSERT PROGRAM    
 DECLARE @ProgramId INT    
 DECLARE @From NVARCHAR(256)    
 SET @From = @FromName + '<'+@FromEmail+'>'  
   
 print @From
 print @Subject
 print @Query
      
 INSERT INTO _Datos.dbo.SmartMail_Program (Name, [From], Body, DateStart, Count, Status, Query, TransportType, Priority, CueIid)    
           VALUES (@Subject, @From, @Body, @DateStart, @Count, 'A', @Query, @TransportType, @Priority, @CueIid)    
               
 SET @ProgramId = @@IDENTITY               

 IF LEN(@Attachments) > 0    
 BEGIN
	INSERT INTO _Datos.dbo.SmartMail_ProgramAttach (Name, ProgramId) SELECT strval, @ProgramId FROM _Datos.dbo.ParseArray(@Attachments, ',')       
END