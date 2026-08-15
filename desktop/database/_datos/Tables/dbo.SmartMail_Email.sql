IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartMail_Email] (
    [Id] int NOT NULL,
    [Name] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Email] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL
);
GO
