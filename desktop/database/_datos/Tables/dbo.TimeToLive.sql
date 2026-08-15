IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[TimeToLive] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Token] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [DateCreated] datetime NOT NULL,
    [Service] varchar(512) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_TimeToLive] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_TimeToLive_TokenService] ON [dbo].[TimeToLive] ([Token] ASC, [Service] ASC, [Id] ASC, [Name] ASC, [DateCreated] ASC);
GO
