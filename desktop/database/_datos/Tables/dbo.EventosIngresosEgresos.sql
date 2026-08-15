IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[EventosIngresosEgresos] (
    [eie_idKey] int NOT NULL,
    [eie_iRecId] int CONSTRAINT [DF_EventosIngresosEgresos_eie_iRecId] DEFAULT ((0)) NOT NULL,
    [eie_iCuentaId] int CONSTRAINT [DF_EventosIngresosEgresos_eie_iCuentaId] DEFAULT ((0)) NOT NULL,
    [eie_tFechaHora] datetime CONSTRAINT [DF_EventosIngresosEgresos_eie_tFechaHora] DEFAULT (getdate()) NOT NULL,
    [eie_cMatricula] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosIngresosEgresos_eie_cMatricula] DEFAULT ('') NOT NULL,
    [eie_cUnidadFuncional] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosIngresosEgresos_eie_cUnidadFuncional] DEFAULT ('') NOT NULL,
    [eie_cVecino] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosIngresosEgresos_eie_cVecino] DEFAULT ('') NOT NULL,
    [eie_cTransito] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosIngresosEgresos_eie_cTransito] DEFAULT ('') NOT NULL,
    [eie_cUsuario] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_EventosIngresosEgresos_eie_cUsuario] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_EventosIngresosEgresos] PRIMARY KEY CLUSTERED ([eie_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_EventosFecha] ON [dbo].[EventosIngresosEgresos] ([eie_cMatricula] ASC, [eie_cUnidadFuncional] ASC, [eie_cVecino] ASC, [eie_cTransito] ASC, [eie_cUsuario] ASC, [eie_tFechaHora] ASC);
GO
