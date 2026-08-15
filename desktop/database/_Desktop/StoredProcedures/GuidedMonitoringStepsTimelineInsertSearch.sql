CREATE OR ALTER PROCEDURE [dbo].[GuidedMonitoringStepsTimelineInsertSearch]
@gst_iRecID Int = 0
,@gst_iStepNumber Int = 0
,@gst_iTemplateID Int = 0
,@gst_iStepID Int = 0
,@gst_cObs VarChar (1024) = ''
,@gst_iStatus Int = 0,
@gst_iOperador int = 0



--WITH ENCRYPTION			 
AS
set noCount on





Insert into _datos.dbo.GuidedMonitoringStepsTimeline ([gst_iRecID]
           ,[gst_iStepNumber]
           ,[gst_iTemplateID]
           ,[gst_iStepID]
           ,[gst_cObs]
           ,[gst_iStatus]
           ,[gst_tDateTime]
		   ,gst_iOperador) values(@gst_iRecID ,@gst_iStepNumber,@gst_iTemplateID,@gst_iStepID,@gst_cObs,@gst_iStatus,GETDATE(),@gst_iOperador)

  
										
--exec p_controlAcceso_AutorizacionSel @@Identity 						 
select [gst_iRecID]
           ,[gst_iStepNumber]
           ,[gst_iTemplateID]
           ,[gst_iStepID]
           ,[gst_cObs]
           ,[gst_iStatus]
           ,[gst_tDateTime], gst_iOperador from _datos.dbo.GuidedMonitoringStepsTimeline where gst_idKey = @@Identity