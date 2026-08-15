IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Task] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [DateCreated] datetime NOT NULL,
    [StartDate] datetime NOT NULL,
    [EndDate] datetime NOT NULL,
    [Comments] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Status] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Effort] decimal(18,2) NOT NULL,
    [EffortType] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Completed] int NOT NULL,
    [ParentTypeId] int NOT NULL,
    [ParentId] int NOT NULL,
    [Priority] int NOT NULL,
    [OwnerTypeId] int NOT NULL,
    [OwnerId] int NOT NULL,
    CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
