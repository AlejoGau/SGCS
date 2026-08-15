IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[GuidedMonitoringTemplateSteps] (
    [gms_idKey] int NOT NULL,
    [gms_iTemplateID] int CONSTRAINT [DF_GuidedMonitoringTemplateSteps_gms_iTemplateID] DEFAULT ((1)) NOT NULL,
    [gms_iStepNumber] int CONSTRAINT [DF_GuidedMonitoringTemplateSteps_gms_iStepNumber] DEFAULT ((1)) NOT NULL,
    [gms_iStepID] int CONSTRAINT [DF_GuidedMonitoringTemplate_gmt_iStepID] DEFAULT ((1)) NOT NULL,
    [gms_cToolTip] varchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_GuidedMonitoringTemplateSteps_gms_cToolTip] DEFAULT ('') NOT NULL,
    [gms_cText] varchar(2048) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_GuidedMonitoringTemplateSteps_gms_cText] DEFAULT ('') NOT NULL,
    [gms_cListID] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_GuidedMonitoringTemplateSteps_gms_cListID] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_GuidedMonitoringTemplateSteps] PRIMARY KEY CLUSTERED ([gms_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_GuidedMonitoringTemplateSteps] ON [dbo].[GuidedMonitoringTemplateSteps] ([gms_idKey] ASC, [gms_iTemplateID] ASC, [gms_iStepNumber] ASC, [gms_iStepID] ASC);
GO
