IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[EventosControlDealer] (
    [ced_idKey] int NOT NULL,
    [ced_idCuenta] int CONSTRAINT [DF_EventosControlDealer_ced_idCuenta] DEFAULT ((0)) NOT NULL,
    [ced_iRecId] int CONSTRAINT [DF_EventosControlDealer_ced_iRecId] DEFAULT ((0)) NOT NULL,
    [ced_tFechaHora] datetime CONSTRAINT [DF_EventosControlDealer_idr_ced_tFechaHora] DEFAULT (getdate()) NOT NULL,
    [ced_cAlarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosControlDealer_ced_cAlarma] DEFAULT ('') NOT NULL,
    [ced_cAlarmaGenerar] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosControlDealer_ced_cAlarmaGenerar] DEFAULT ('') NOT NULL,
    [ced_iMinutos] int CONSTRAINT [DF_EventosControlDealer_ced_iMinutos] DEFAULT ((1)) NOT NULL,
    [ced_iStatus] int CONSTRAINT [DF_EventosControlDealer_ced_iStatus] DEFAULT ((0)) NOT NULL,
    [ced_tStatusExec] datetime NOT NULL,
    CONSTRAINT [PK_EventosControlDealer] PRIMARY KEY CLUSTERED ([ced_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_EventosActivos] ON [dbo].[EventosControlDealer] ([ced_iRecId] ASC, [ced_idCuenta] ASC, [ced_cAlarma] ASC, [ced_tFechaHora] ASC);
GO
