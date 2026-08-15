IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MP_Log] (
    [id] int NOT NULL,
    [fecha] datetime NOT NULL,
    [token] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mail] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tipo] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [JsonRequest] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_MP_Log] PRIMARY KEY CLUSTERED ([id] ASC)
);
GO
