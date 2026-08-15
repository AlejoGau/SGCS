IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SerTecVisitas] (
    [svi_idKey] int NOT NULL,
    [svi_tFechaHora] datetime NOT NULL,
    [svi_tSalidaHaciaCliente] datetime NOT NULL,
    [svi_tArriboAlCliente] datetime NOT NULL,
    [svi_tSalidaDelCliente] datetime NOT NULL,
    [svi_iEstado] int NOT NULL,
    [svi_iServicio] int NOT NULL,
    [svi_iFormaDeViaje] int NOT NULL,
    [svi_cObservacion] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [svi_iusuarioDss] int NOT NULL,
    [svi_cHorasPlanificadas] varchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_t_lineas_lin_cmail] DEFAULT ('') NOT NULL,
    [svi_nDuracionEstimada] decimal(5,2) CONSTRAINT [DF_SerTecVisitas_svi_nDuracionEstimada] DEFAULT ((1)) NOT NULL,
    CONSTRAINT [PK_SerTecVisitas] PRIMARY KEY CLUSTERED ([svi_idKey] ASC)
);
GO
