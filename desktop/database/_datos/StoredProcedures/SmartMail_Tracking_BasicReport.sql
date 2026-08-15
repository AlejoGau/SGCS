CREATE OR ALTER PROCEDURE [dbo].[SmartMail_Tracking_BasicReport]  
 @ProgramId int,  
 @VersionId int  
AS  
 SET NOCOUNT ON  
  
 --Version  
 SELECT V.ProgramId, V.VersionId, V.StartedDate, V.EndedDate, V.QtyTotal, V.QtySent   
   FROM SmartMailTracking_Version V  
  WHERE V.ProgramId = @ProgramId AND V.VersionId = @VersionId  
  
 --Emails  
 SELECT COUNT(E.EmailId) AS QtySent, SUM([Read]) AS QtyDistinctReadings, SUM(E.QtyReadings) AS QtyReadings   
   FROM SmartMailTracking_Email E    
     WHERE E.ProgramId = @ProgramId AND E.VersionId = @VersionId  
   
 --Links  
 SELECT L.Name, L.Url, COUNT(UL.LinkId) AS QtyDistinctOpenings, ISNULL(SUM(UL.QtyOpenings),0) AS QtyOpenings  
      FROM SmartMailTracking_Link L
		   LEFT JOIN SmartMailTracking_UserLink UL ON UL.LinkId = L.LinkId  
     WHERE L.ProgramId = @ProgramId AND L.VersionId = @VersionId  
  GROUP BY L.Name, L.Url