IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartMailTracking_Link] (
    [ProgramId] int NOT NULL,
    [VersionId] int NOT NULL,
    [LinkId] int NOT NULL,
    [Name] varchar(512) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Url] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_SmartMailTracking_Link] PRIMARY KEY CLUSTERED ([LinkId] ASC)
);
GO
