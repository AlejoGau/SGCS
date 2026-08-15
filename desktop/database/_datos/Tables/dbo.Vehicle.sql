IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Vehicle] (
    [Id] int NOT NULL,
    [Brand] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Model] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Year] int NOT NULL,
    [Domain] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Colour] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [VehicleType] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Photo] image NOT NULL,
    [PhotoType] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [OwnerId] int NOT NULL,
    [RequestLoginImage] int NOT NULL,
    [InsuranceExpiration] datetime NOT NULL,
    [InsuranceCompany] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [VTVExpiration] datetime NOT NULL,
    [Blacklist] int CONSTRAINT [DF_Vehicle_Blacklist] DEFAULT ((0)) NOT NULL,
    [LastUpdate] datetime CONSTRAINT [DF_Vehicle_LastUpdate] DEFAULT (getdate()) NOT NULL,
    [ProfileVehicleId] int CONSTRAINT [DF_Vehicle_ProfileVehicleId] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_Vehicle] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [UX_Vehicle_Domain] ON [dbo].[Vehicle] ([Domain] ASC);
GO
