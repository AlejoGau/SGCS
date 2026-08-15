IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Action] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Description] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ActionType] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Date] datetime NOT NULL,
    [Status] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [IssueId] int NOT NULL,
    [CreatorObjectTypeId] int NOT NULL,
    [CreatorObjectId] int NOT NULL,
    CONSTRAINT [PK_Action] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
