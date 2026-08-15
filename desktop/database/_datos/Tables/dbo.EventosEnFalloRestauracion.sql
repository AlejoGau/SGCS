IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[EventosEnFalloRestauracion] (
    [efr_idKey] int NOT NULL,
    [efr_iRecID] int NOT NULL,
    [efr_iidCuenta] int NOT NULL,
    [efr_tEventoFechaHora] datetime NOT NULL,
    [efr_cLinea] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [efr_cCuenta] char(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [efr_cNombre] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [efr_tFallaFechaHora] datetime NOT NULL,
    [efr_cAlarma] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [efr_cAlarmaDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [efr_nAlarmaColor] int NOT NULL,
    [efr_nAlarmaColorLetra] int NOT NULL,
    [efr_cZona] char(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [efr_cZonaDescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_EventosEnFalloRestauracion] PRIMARY KEY CLUSTERED ([efr_idKey] ASC)
);
GO
