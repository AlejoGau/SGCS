IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_EventosTimer] (
    [pet_idKey] int NOT NULL,
    [pet_cTipo] char(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pet_idCuenta] int CONSTRAINT [DF_p_EventosTimer_pet_idCuenta] DEFAULT ((0)) NOT NULL,
    [pet_iRecId] int CONSTRAINT [DF_p_EventosTimer_pet_iRecId] DEFAULT ((0)) NOT NULL,
    [pet_tFechaHora] datetime CONSTRAINT [DF_p_EventosTimer_idr_pet_tFechaHora] DEFAULT (getdate()) NOT NULL,
    [pet_cAlarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_EventosTimer_pet_cAlarma] DEFAULT ('') NOT NULL,
    [pet_cZona] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pet_iUsuario] int CONSTRAINT [DF_p_EventosTimer_pet_iUsuario] DEFAULT ((0)) NOT NULL,
    [pet_iRecId_NR] int NOT NULL,
    [pet_tLimite_NR] datetime NOT NULL,
    [pet_cEvento_NR] varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pet_iMinutos_NR] int NOT NULL,
    [pet_cAlarmaAGenerar_NR] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pet_cZona_NR] varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pet_iStatus] int CONSTRAINT [DF_p_EventosTimer_pet_iStatus] DEFAULT ((0)) NOT NULL,
    [pet_tStatusExec] datetime NOT NULL,
    CONSTRAINT [PK_p_EventosTimer] PRIMARY KEY CLUSTERED ([pet_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_AlarmaStatus] ON [dbo].[p_EventosTimer] ([pet_idKey] ASC, [pet_idCuenta] ASC, [pet_tFechaHora] ASC, [pet_iUsuario] ASC, [pet_cAlarma] ASC, [pet_iStatus] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_CtaAlarmaStatus] ON [dbo].[p_EventosTimer] ([pet_idKey] ASC, [pet_tFechaHora] ASC, [pet_iUsuario] ASC, [pet_idCuenta] ASC, [pet_cAlarma] ASC, [pet_iStatus] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EventosTimerFecha] ON [dbo].[p_EventosTimer] ([pet_cTipo] ASC, [pet_tFechaHora] ASC, [pet_idCuenta] ASC, [pet_iStatus] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_EventosTimer_IstatusCtipoIN] ON [dbo].[p_EventosTimer] ([pet_idCuenta] ASC, [pet_tFechaHora] ASC, [pet_cAlarma] ASC, [pet_iUsuario] ASC, [pet_iStatus] ASC, [pet_cTipo] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_TipoStatus] ON [dbo].[p_EventosTimer] ([pet_idKey] ASC, [pet_idCuenta] ASC, [pet_iRecId] ASC, [pet_tFechaHora] ASC, [pet_iRecId_NR] ASC, [pet_tLimite_NR] ASC, [pet_cEvento_NR] ASC, [pet_cAlarmaAGenerar_NR] ASC, [pet_cZona_NR] ASC, [pet_cTipo] ASC, [pet_iStatus] ASC);
GO
