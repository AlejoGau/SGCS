IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_EstadosPanel] (
    [mep_idKey] int NOT NULL,
    [mep_idCuenta] int CONSTRAINT [DF_m_EstadosPanel_mep_idCuenta] DEFAULT ((0)) NOT NULL,
    [mep_cAlarmaControl] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_EstadosPanel_mep_cAlarmaControl] DEFAULT ('') NOT NULL,
    [mep_iUsuarioControl] int CONSTRAINT [DF_m_EstadosPanel_mep_iUsuarioControl] DEFAULT ((0)) NOT NULL,
    [mep_cAlarmaEsperada] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_EstadosPanel_mep_cAlarmaEsperada] DEFAULT ('') NOT NULL,
    [mep_iUsuarioEsperado] int CONSTRAINT [DF_m_EstadosPanel_mep_iUsuarioEsperado] DEFAULT ((0)) NOT NULL,
    [mep_iMinutos] int CONSTRAINT [DF_m_EstadosPanel_mep_iMinutos] DEFAULT ((0)) NOT NULL,
    [mep_iAutoProcesa] int CONSTRAINT [DF_m_EstadosPanel_mep_iAutoProcesa] DEFAULT ((0)) NOT NULL,
    [mep_cAlarmaAGenerar] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_EstadosPanel_mep_cAlarmaAGenerar] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_EstadosPanel] PRIMARY KEY CLUSTERED ([mep_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [UX_m_EstadosPanel_Cuenta_Control] ON [dbo].[m_EstadosPanel] ([mep_idCuenta] ASC, [mep_cAlarmaControl] ASC);
GO
