IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_reporte_autoridades] (
    [rep_iid] int NOT NULL,
    [rep_cautoridad] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_reporte_autoridades_rep_cautoridad] DEFAULT ('') NOT NULL,
    [rep_iidcuenta] int CONSTRAINT [DF_p_reporte_autoridades_rep_iidcuenta] DEFAULT ((0)) NOT NULL,
    [rep_calarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_reporte_autoridades_rep_calarma] DEFAULT ('') NOT NULL,
    [rep_dfechahora] datetime CONSTRAINT [DF_p_reporte_autoridades_rep_dfechahora] DEFAULT (getdate()) NOT NULL,
    [rep_mcomentario] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_reporte_autoridades_rep_mcomentario] DEFAULT ('') NOT NULL,
    [rep_nestado] numeric(1,0) CONSTRAINT [DF_p_reporte_autoridades_rep_nestado] DEFAULT ((0)) NOT NULL,
    [rep_dresolfechahora] datetime CONSTRAINT [DF_p_reporte_autoridades_rep_dresolfechahora] DEFAULT (NULL) NOT NULL,
    [rep_czona] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_reporte_autoridades_rep_czona] DEFAULT ('') NOT NULL,
    [rep_dEnvioFechaHora] datetime CONSTRAINT [DF_p_reporte_autoridades_rep_dEnvioFechaHora] DEFAULT (getdate()) NOT NULL,
    [rep_iidrecepcion] int CONSTRAINT [DF_p_reporte_autoridades_rep_iidrecepcion] DEFAULT ((0)) NOT NULL,
    [rep_iresolucion] int NOT NULL,
    [rep_icategorizacion] int NOT NULL,
    CONSTRAINT [PK_p_reporte_autoridades] PRIMARY KEY CLUSTERED ([rep_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_ReporteAut_AutFechaEstado] ON [dbo].[p_reporte_autoridades] ([rep_iid] ASC, [rep_iidcuenta] ASC, [rep_cautoridad] ASC, [rep_dfechahora] ASC, [rep_nestado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_ReporteAut_IdRec] ON [dbo].[p_reporte_autoridades] ([rep_cautoridad] ASC, [rep_iidrecepcion] ASC);
GO
