IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Project] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Description] varchar(2048) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [CreatedDate] datetime NOT NULL,
    [Status] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL
);
GO
