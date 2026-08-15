CREATE OR ALTER PROCEDURE [dbo].[SmartMail_ProgramAttachments]  
 @ProgramId INT  
AS  
 SET NOCOUNT ON  
   
 SELECT Name as FullName   
   FROM _Datos.dbo.SmartMail_ProgramAttach
  WHERE ProgramId = @ProgramId