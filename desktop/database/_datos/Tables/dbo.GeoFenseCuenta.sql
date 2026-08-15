IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[GeoFenseCuenta] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [GeoFenseId] int NOT NULL,
    [CuentaId] int NOT NULL,
    [Estado] int NOT NULL,
    [FechaUltPosicion] datetime NOT NULL,
    CONSTRAINT [PK_GeoFenseCuenta] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_Cuenta] ON [dbo].[GeoFenseCuenta] ([CuentaId] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_CuentaId] ON [dbo].[GeoFenseCuenta] ([CuentaId] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_GeoFense] ON [dbo].[GeoFenseCuenta] ([GeoFenseId] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_GeoFenseId] ON [dbo].[GeoFenseCuenta] ([GeoFenseId] ASC);
GO
