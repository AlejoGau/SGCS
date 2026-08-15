IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_Poi] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [FullAddress] varchar(512) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Icon] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Country] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [State] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [City] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Address] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Number] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Latitude] float NOT NULL,
    [Longitude] float NOT NULL,
    [CDealer] varchar(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Organization] int NOT NULL,
    CONSTRAINT [PK_p_Poi] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
