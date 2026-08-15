IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartMailTracking_UserLink] (
    [ProgramId] int NOT NULL,
    [VersionId] int NOT NULL,
    [EmailId] int NOT NULL,
    [LinkId] int NOT NULL,
    [OpenedDate] datetime NOT NULL,
    [LastOpenedDate] datetime NOT NULL,
    [QtyOpenings] int NOT NULL
);
GO
