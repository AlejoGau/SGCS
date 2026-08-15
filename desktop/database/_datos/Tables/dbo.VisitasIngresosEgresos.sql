IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[VisitasIngresosEgresos] (
    [vie_idKey] int NOT NULL,
    [vie_tFechaHora] datetime CONSTRAINT [DF_VisitasIngresosEgresos_vie_tFechaHora] DEFAULT (getdate()) NOT NULL,
    [vie_cMatricula] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_VisitasIngresosEgresos_vie_cMatricula] DEFAULT ('') NOT NULL,
    [vie_cUnidadFuncional] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_VisitasIngresosEgresos_vie_cUnidadFuncional] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_VisitasIngresosEgresos] PRIMARY KEY CLUSTERED ([vie_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_EventosFecha] ON [dbo].[VisitasIngresosEgresos] ([vie_cMatricula] ASC, [vie_cUnidadFuncional] ASC, [vie_tFechaHora] ASC);
GO
