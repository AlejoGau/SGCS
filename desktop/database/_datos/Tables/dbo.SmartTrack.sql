IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartTrack] (
    [Id] int NOT NULL,
    [Telefono] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Imei] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Modelo] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Marca] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Version] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Tipo] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [CuentaId] int NOT NULL,
    [Nombre] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Config] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [fechaAlta] datetime CONSTRAINT [DF_SmartTrack_fechaAlta] DEFAULT (getdate()) NOT NULL,
    [AppVersion] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pushToken] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [EnFalloDeTesteo] int NOT NULL,
    [EnFalloDeTesteoDesde] datetime NOT NULL,
    [HBTime] int CONSTRAINT [DF_SmartTrack_HBTime] DEFAULT ((0)) NOT NULL,
    [AppType] varchar(64) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_SmartTrack_AppType] DEFAULT ('VIGICONTROL') NOT NULL,
    CONSTRAINT [PK_SmartTrack] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_SmartTrack_imei] ON [dbo].[SmartTrack] ([CuentaId] ASC, [Nombre] ASC, [Imei] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_smarttrack_idcuenta] ON [dbo].[SmartTrack] ([CuentaId] ASC);
GO
