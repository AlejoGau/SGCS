IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[RedirectorQueue] (
    [rdq_idKey] int NOT NULL,
    [rdq_iReDirector] int CONSTRAINT [DF_RedirectorQueue_rdq_iReDirector] DEFAULT ((0)) NOT NULL,
    [rdq_idRec] int NOT NULL,
    [rdq_idGps] int NOT NULL,
    [rdq_tFechaHora] datetime CONSTRAINT [DF_RedirectorQueue_rdq_tFechaHora] DEFAULT (getdate()) NOT NULL,
    [rdq_cLlamado] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rdq_cRespuesta] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rdq_iStatus] int CONSTRAINT [DF_RedirectorQueue_rdq_iStatus] DEFAULT ((0)) NOT NULL,
    [rdq_tStatusExec] datetime NOT NULL,
    [rdq_iReSend] int CONSTRAINT [DF_p_RedirectorQueue_rdq_iReSend] DEFAULT ((0)) NOT NULL,
    [rdq_tReSendExec] datetime NOT NULL,
    CONSTRAINT [PK_RedirectorQueue] PRIMARY KEY CLUSTERED ([rdq_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_RedirectorQueue_IstatusIN] ON [dbo].[RedirectorQueue] ([rdq_cLlamado] ASC, [rdq_iStatus] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_RedirectorQueueFecha] ON [dbo].[RedirectorQueue] ([rdq_tFechaHora] ASC, [rdq_iReDirector] ASC, [rdq_iStatus] ASC);
GO
