IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartTrackGeoFense] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [GeoType] varchar(64) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Imei] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [MetaData] varchar(4096) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Style] varchar(512) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Status] int NOT NULL,
    CONSTRAINT [PK_SmartTrackGeoFense] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
