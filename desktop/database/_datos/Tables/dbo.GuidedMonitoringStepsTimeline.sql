IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[GuidedMonitoringStepsTimeline] (
    [gst_idKey] int NOT NULL,
    [gst_iRecID] int CONSTRAINT [DF_GuidedMonitoringStepsTimeline_gst_iRecID] DEFAULT ((0)) NOT NULL,
    [gst_iStepNumber] int CONSTRAINT [DF_GuidedMonitoringStepsTimeline_gst_iStepNumber] DEFAULT ((0)) NOT NULL,
    [gst_iTemplateID] int CONSTRAINT [DF_GuidedMonitoringStepsTimeline_gst_iTemplateID] DEFAULT ((0)) NOT NULL,
    [gst_iStepID] int CONSTRAINT [DF_GuidedMonitoringStepsTimeline_gst_iStepID] DEFAULT ((0)) NOT NULL,
    [gst_iOperador] int CONSTRAINT [DF_GuidedMonitoringStepsTimeline_gst_iOperador] DEFAULT ((0)) NOT NULL,
    [gst_cObs] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_GuidedMonitoringStepsTimeline_gst_cObs] DEFAULT ('') NOT NULL,
    [gst_iStatus] int CONSTRAINT [DF_GuidedMonitoringStepsTimeline_gst_iStatus] DEFAULT ((0)) NOT NULL,
    [gst_tDateTime] datetime CONSTRAINT [DF_GuidedMonitoringStepsTimeline_gst_tDateTime] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_GuidedMonitoringStepsTimeline] PRIMARY KEY CLUSTERED ([gst_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_GuidedMonitoringStepsTimeline] ON [dbo].[GuidedMonitoringStepsTimeline] ([gst_idKey] ASC, [gst_iRecID] ASC, [gst_iStepNumber] ASC, [gst_iStepID] ASC);
GO
