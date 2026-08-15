IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Application] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [RequestURI] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ClientId] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ClientSecret] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [UserAccount] int NOT NULL,
    [ErrorRequestURI] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_Application] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
