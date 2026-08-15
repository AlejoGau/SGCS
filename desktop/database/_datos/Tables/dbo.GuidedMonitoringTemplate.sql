IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[GuidedMonitoringTemplate] (
    [gmt_idKey] int NOT NULL,
    [gmt_cTemplateName] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_GuidedMonitoringTemplate_gmt_cTemplateName] DEFAULT ('') NOT NULL,
    [gmt_cDesc] varchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_GuidedMonitoringTemplate_gmt_cDesc] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_GuidedMonitoringTemplate] PRIMARY KEY CLUSTERED ([gmt_idKey] ASC)
);
GO
