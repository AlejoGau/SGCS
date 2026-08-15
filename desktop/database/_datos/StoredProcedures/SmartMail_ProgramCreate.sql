CREATE OR ALTER PROCEDURE [dbo].[SmartMail_ProgramCreate]
	@FromName [nvarchar](128),
	@FromEmail [nvarchar](128),
	@Subject [nvarchar](256),
	@Body [ntext],
	@DateStart [datetime],
	@Count [int],
	@Query [nvarchar](max),
	@TransportType [nvarchar](64) = 'MAIL',
	@Attachments [nvarchar](2048) = '',
	@Priority [int] = 0,
	@CueIid [int] = NULL
WITH EXECUTE AS CALLER
AS
SET NOCOUNT ON    
     
 --INSERT PROGRAM    
 DECLARE @ProgramId INT    
 DECLARE @From nVarChar(256)    
 SET @From = @FromName + '<'+@FromEmail+'>'    
      
 INSERT INTO _Datos.dbo.SmartMail_Program (Name, [From], Body, DateStart, Count, Status, Query, TransportType, Priority, CueIid)    
           VALUES (@Subject, @From, @Body, @DateStart, @Count, 'A', @Query, @TransportType, @Priority, @CueIid)    
 
  SET @ProgramId = @@IDENTITY               

 IF LEN(LTRIM(@Attachments)) > 0    
 BEGIN
	INSERT INTO _Datos.dbo.SmartMail_ProgramAttach (Name, ProgramId) SELECT strval, @ProgramId FROM _Datos.dbo.ParseArray(@Attachments, ',')       
END
--