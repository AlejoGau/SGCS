IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[temporalToken] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [token] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [creationDate] datetime NOT NULL,
    [status] char(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [userId] int NOT NULL,
    [metadata] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK__temporal__3214EC074AECD9A2] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
