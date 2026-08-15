IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[EventosInformados] (
    [evi_idKey] int NOT NULL,
    [evi_iRecId] int CONSTRAINT [DF_EventosInformados_evi_iRecId] DEFAULT ((0)) NOT NULL,
    [evi_iCuentaId] int CONSTRAINT [DF_EventosInformados_evi_iCuentaId] DEFAULT ((0)) NOT NULL,
    [evi_iUsuario] int CONSTRAINT [DF_EventosInformados_evi_iUsuario] DEFAULT ((0)) NOT NULL,
    [evi_cUsuarioNombre] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosInformados_evi_cUsuarioNombre] DEFAULT ('') NOT NULL,
    [evi_cAlarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosInformados_evi_cAlarma] DEFAULT ('') NOT NULL,
    [evi_cAlarmaDesc] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosInformados_evi_cAlarmaDesc] DEFAULT ('') NOT NULL,
    [evi_iCheck] int CONSTRAINT [DF_EventosInformados_evi_iCheck] DEFAULT ((0)) NOT NULL,
    [evi_iCheckType] int CONSTRAINT [DF_EventosInformados_evi_iCheckType] DEFAULT ((0)) NOT NULL,
    [evi_tCheckExec] datetime CONSTRAINT [DF_EventosInformados_evi_tCheckExec] DEFAULT (getdate()) NOT NULL,
    [evi_iDevice] int CONSTRAINT [DF_EventosInformados_evi_iDevice] DEFAULT ((0)) NOT NULL,
    [evi_iStatus] int CONSTRAINT [DF_EventosInformados_evi_iStatus] DEFAULT ((0)) NOT NULL,
    [evi_tStatusExec] datetime NOT NULL,
    [evi_iGenRecId] int CONSTRAINT [DF_EventosInformados_evi_iGenRecId] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_EventosInformados] PRIMARY KEY CLUSTERED ([evi_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_EventosRecID] ON [dbo].[EventosInformados] ([evi_iCheckType] ASC, [evi_iRecId] ASC, [evi_iCuentaId] ASC, [evi_iStatus] ASC, [evi_iCheck] ASC);
GO
