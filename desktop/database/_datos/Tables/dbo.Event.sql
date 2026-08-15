IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Event] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [EventType] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Company] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PlaceName] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PlaceAddress] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PlaceCity] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PlacePhone] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PlaceContact] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PlaceEmail] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [StartDate] datetime NOT NULL,
    [EndDate] datetime NOT NULL,
    [SmallComment] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [LargeComment] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Schedule] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Price] int NOT NULL,
    [AllowRegistration] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PlaceLat] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PlaceLong] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [AlertTime] int NOT NULL,
    [AlertType] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
