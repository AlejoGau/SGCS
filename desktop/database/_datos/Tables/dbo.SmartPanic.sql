IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartPanic] (
    [Id] int NOT NULL,
    [Telefono] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Imei] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Modelo] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Marca] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Version] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Tipo] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [CuentaId] int CONSTRAINT [DF_SmartPanic_CuentaId] DEFAULT ((15462)) NOT NULL,
    [Nombre] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Config] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [GrupoId] int NOT NULL,
    [Linea] varchar(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [fechaAlta] datetime CONSTRAINT [DF_SmartPanic_fechaAlta] DEFAULT (getdate()) NOT NULL,
    [awccUserId] int NOT NULL,
    [EnFalloDeTesteo] int NOT NULL,
    [EnFalloDeTesteoDesde] datetime NOT NULL,
    [AppVersion] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pushToken] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [AppType] int CONSTRAINT [DF_SmartPanic_AppType] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_SmartPanic] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_smartpanic_imei] ON [dbo].[SmartPanic] ([Imei] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_SmartPanic_ApptypIN] ON [dbo].[SmartPanic] ([Telefono] ASC, [AppType] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_SmartPanic_CuentaFallo] ON [dbo].[SmartPanic] ([CuentaId] ASC, [EnFalloDeTesteo] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_SmartPanic_Imei] ON [dbo].[SmartPanic] ([Telefono] ASC, [CuentaId] ASC, [Config] ASC, [Imei] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_SmartPanic_Telefono] ON [dbo].[SmartPanic] ([Telefono] ASC);
GO

CREATE NONCLUSTERED INDEX [nc_smartpanics_imei] ON [dbo].[SmartPanic] ([Telefono] ASC, [CuentaId] ASC, [Imei] ASC);
GO
