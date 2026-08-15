IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[EquipoDispositivoMovil] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [idCuenta] int NOT NULL,
    [idEquipo] int NOT NULL,
    [Config] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [isTemplate] int NOT NULL,
    [cRemoteIP] varchar(15) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [iRemotePort] int NOT NULL,
    CONSTRAINT [PK_EquipoDispositivoMovil] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_edm_idcuenta] ON [dbo].[EquipoDispositivoMovil] ([idCuenta] ASC, [idEquipo] ASC);
GO
