IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[GoogleGeocodingCache] (
    [Id] int NOT NULL,
    [Lat] varchar(20) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Lng] varchar(20) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [DataXML] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Address] varchar(300) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [DateCreated] datetime CONSTRAINT [DF_GoogleGeocodingCache_DateCreated] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_GoogleGeocodingCache] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
