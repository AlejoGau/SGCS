IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Attach] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [FullName] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Format] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Weight] varchar(30) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Location] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Width] int NOT NULL,
    [Height] int NOT NULL,
    [SaveAs] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Target] varchar(25) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Link] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Status] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [SmallComment] varchar(2000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [LargeComment] varchar(4000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [DateCreated] datetime NOT NULL,
    [FolderId] int NOT NULL,
    CONSTRAINT [PK_Attach] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
