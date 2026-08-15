IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[DispositivoMovil] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Brand] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Model] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Year] int NOT NULL,
    [Domain] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Colour] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [VehicleType] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Photo] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PhotoType] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [VehicleBrand] int NOT NULL,
    [VehicleModel] int NOT NULL,
    [OwnerTypeId] int NOT NULL,
    [OwnerId] int NOT NULL,
    [DriverTypeId] int NOT NULL,
    [DriverId] int NOT NULL,
    [SIM1] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [CompaniaSIM1] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [SIM2] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [CompaniaSIM2] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [NroMotor] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [NroChasis] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PersonaDNI] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PersonaGenero] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [PersonaFechaNacimiento] datetime CONSTRAINT [DF_DispositivoMovil_PersonaFechaNacimiento] DEFAULT ('1900-01-01 00:00:00.000') NOT NULL,
    [MascotaRaza] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [MascotaFechaNacimiento] datetime CONSTRAINT [DF_DispositivoMovil_MascotaFechaNacimiento] DEFAULT ('1900-01-01 00:00:00.000') NOT NULL,
    [MascotaGenero] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [MascotaColor] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [OtroTextolibre] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [MaxSpeed] int CONSTRAINT [DF_DispositivoMovil_MaxSpeed] DEFAULT ((0)) NOT NULL,
    [OdometerDate] datetime NOT NULL,
    [Odometer] int NOT NULL,
    [ParkingLot] bit CONSTRAINT [DF_DispositivoMovil_ParkingLot] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_DispositivoMovil] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_DispositivoMovil_Owner] ON [dbo].[DispositivoMovil] ([Id] ASC, [MaxSpeed] ASC, [OwnerId] ASC);
GO
