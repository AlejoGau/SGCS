IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[VC_Routes] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cuentaId] int NOT NULL,
    [userId] int NOT NULL,
    [routetype] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [datestart] datetime NOT NULL,
    [time] int NOT NULL,
    [startbeforetolerance] int NOT NULL,
    [startaftertolerance] int NOT NULL,
    [endbeforetolerance] int NOT NULL,
    [endaftertolerance] int NOT NULL,
    CONSTRAINT [PK_VC_Routes] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
