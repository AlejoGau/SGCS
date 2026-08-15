IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Issue] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Date] datetime NOT NULL,
    [Description] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Priority] int NOT NULL,
    [Urgency] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Severity] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [IssueType] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [State] int NOT NULL,
    [LastModified] datetime NOT NULL,
    [ProjectId] int NOT NULL,
    [OwnerObjectTypeId] int NOT NULL,
    [OwnerObjectId] int NOT NULL,
    [CreatorObjectTypeId] int NOT NULL,
    [CreatorObjectId] int NOT NULL,
    [AccountType] varchar(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [AccountId] int NOT NULL
);
GO
