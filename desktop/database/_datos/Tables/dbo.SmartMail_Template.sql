IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartMail_Template] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Description] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Subject] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [HtmlBody] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [TextBody] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Status] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [DateCreated] datetime NOT NULL,
    [OwnerTypeId] int NOT NULL,
    [OwnerId] int NOT NULL,
    CONSTRAINT [PK_SmartMail_Template] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
