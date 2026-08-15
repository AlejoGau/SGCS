IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartMailTracking_Email] (
    [ProgramId] int NOT NULL,
    [VersionId] int NOT NULL,
    [EmailId] int NOT NULL,
    [ObjectTypeId] int NOT NULL,
    [ObjectId] int NOT NULL,
    [Email] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [SentDate] datetime NOT NULL,
    [Read] int NOT NULL,
    [ReadDate] datetime NOT NULL,
    [LastReadDate] datetime NOT NULL,
    [QtyReadings] int NOT NULL
);
GO

CREATE NONCLUSTERED INDEX [NC_SmartMailTrackingEmail_PrgID] ON [dbo].[SmartMailTracking_Email] ([VersionId] ASC, [EmailId] ASC, [ObjectTypeId] ASC, [ObjectId] ASC, [Email] ASC, [SentDate] ASC, [Read] ASC, [ReadDate] ASC, [LastReadDate] ASC, [QtyReadings] ASC, [ProgramId] ASC);
GO
