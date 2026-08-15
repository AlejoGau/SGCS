IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[GeoFense] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [GeoType] varchar(64) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Dealer] varchar(4) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [MetaData] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Style] varchar(512) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [MaxSpeed] int CONSTRAINT [DF_GeoFense_MaxSpeed] DEFAULT ((0)) NOT NULL,
    [GeoData] [sys].[geography] NOT NULL,
    [GeoGroup] int NOT NULL,
    CONSTRAINT [PK_GeoFense] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_Dealer] ON [dbo].[GeoFense] ([Dealer] ASC);
GO
