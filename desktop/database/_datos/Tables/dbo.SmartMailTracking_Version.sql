IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartMailTracking_Version] (
    [ProgramId] int NOT NULL,
    [VersionId] int NOT NULL,
    [StartedDate] datetime CONSTRAINT [DF_SmartMailTracking_Version_StartedDate] DEFAULT (NULL) NOT NULL,
    [EndedDate] datetime CONSTRAINT [DF_SmartMailTracking_Version_EndedDate] DEFAULT (NULL) NOT NULL,
    [QtyTotal] int CONSTRAINT [DF_SmartMailTracking_Version_QtyTotal] DEFAULT ((0)) NOT NULL,
    [QtySent] int CONSTRAINT [DF_SmartMailTracking_Version_QtySent] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_SmartMailTracking_Version] PRIMARY KEY CLUSTERED ([VersionId] ASC)
);
GO
