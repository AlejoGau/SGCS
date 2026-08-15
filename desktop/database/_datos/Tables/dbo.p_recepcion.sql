IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_recepcion] (
    [rec_iid] int NOT NULL,
    [rec_iidcuenta] int NOT NULL,
    [rec_calarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_recepcion_rec_calarma] DEFAULT ('') NOT NULL,
    [rec_czona] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_recepcion_rec_czona] DEFAULT ('') NOT NULL,
    [rec_iusuario] int CONSTRAINT [DF_p_recepcion_rec_iusuario] DEFAULT ((0)) NOT NULL,
    [rec_tfechahora] datetime CONSTRAINT [DF_p_recepcion_rec_tfechahora] DEFAULT (getdate()) NOT NULL,
    [rec_nestado] numeric(1,0) CONSTRAINT [DF_p_recepcion_rec_nestado] DEFAULT ((0)) NOT NULL,
    [rec_cContenido] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_tFechaProceso] datetime NOT NULL,
    [rec_ioperador] int NOT NULL,
    [rec_cObservaciones] ntext COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_cTerminal] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_idResolucion] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_idReceptor] int NOT NULL,
    [rec_cCategorizacion] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_iNYR] int NOT NULL,
    [rec_iTE] int NOT NULL,
    [rec_tFechaRecepcion] datetime NOT NULL,
    [rec_nOrigen] numeric(1,0) CONSTRAINT [DF_p_recepcion_rec_nOrigen] DEFAULT ((1)) NOT NULL,
    [rec_idMap] int NOT NULL,
    [rec_idFwd] int NOT NULL,
    [rec_iMinutosEspera] int CONSTRAINT [DF_p_recepcion_rec_iMinutosEspera] DEFAULT ((1)) NOT NULL,
    [rec_iPuerto] smallint CONSTRAINT [DF_p_recepcion_rec_iPuerto] DEFAULT ((0)) NOT NULL,
    [rec_idLoc] int NOT NULL,
    [rec_iPrioridad] int NOT NULL,
    CONSTRAINT [PK_p_recepcion] PRIMARY KEY CLUSTERED ([rec_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_Alarma] ON [dbo].[p_recepcion] ([rec_calarma] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_CtaAlarmaFecha] ON [dbo].[p_recepcion] ([rec_iid] ASC, [rec_iidcuenta] ASC, [rec_calarma] ASC, [rec_tfechahora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Cuenta] ON [dbo].[p_recepcion] ([rec_iidcuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Estado] ON [dbo].[p_recepcion] ([rec_nestado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Fecha] ON [dbo].[p_recepcion] ([rec_tfechahora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_FechaEstado] ON [dbo].[p_recepcion] ([rec_tfechahora] ASC, [rec_nestado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_ITelefono] ON [dbo].[p_recepcion] ([rec_iTE] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_recepcion_IidcuentaCcontenido] ON [dbo].[p_recepcion] ([rec_iidcuenta] ASC, [rec_cContenido] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_recepcion_NestadoIN] ON [dbo].[p_recepcion] ([rec_iidcuenta] ASC, [rec_tFechaProceso] ASC, [rec_idResolucion] ASC, [rec_cCategorizacion] ASC, [rec_nestado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_recepcion_NorigenTfechahoraIN] ON [dbo].[p_recepcion] ([rec_iidcuenta] ASC, [rec_idReceptor] ASC, [rec_nOrigen] ASC, [rec_tfechahora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_PR_EstadoIte] ON [dbo].[p_recepcion] ([rec_nestado] ASC, [rec_iTE] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_pRecepcion_AlarmaITE] ON [dbo].[p_recepcion] ([rec_cContenido] ASC, [rec_calarma] ASC, [rec_iTE] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_pRecepcionPerformance] ON [dbo].[p_recepcion] ([rec_calarma] ASC, [rec_iidcuenta] ASC, [rec_iusuario] ASC, [rec_tfechahora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Puerto] ON [dbo].[p_recepcion] ([rec_iPuerto] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_PuertoFechaOrigen] ON [dbo].[p_recepcion] ([rec_iPuerto] ASC, [rec_tFechaRecepcion] ASC, [rec_nOrigen] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_ReceptorFechaOrigen] ON [dbo].[p_recepcion] ([rec_iPuerto] ASC, [rec_idReceptor] ASC, [rec_tfechahora] ASC, [rec_nOrigen] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Terminal] ON [dbo].[p_recepcion] ([rec_cTerminal] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Zona] ON [dbo].[p_recepcion] ([rec_czona] ASC);
GO
