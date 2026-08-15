IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartMail_Tracking] (
    [Id] int NOT NULL,
    [Code] varchar(25) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Email] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ReadDate] datetime NOT NULL
);
GO
