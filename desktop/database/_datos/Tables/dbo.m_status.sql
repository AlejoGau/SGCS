IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_status] (
    [sta_iidcuenta] int NOT NULL,
    [sta_nestado] numeric(1,0) CONSTRAINT [DF_m_status_sta_nestado] DEFAULT ((0)) NOT NULL,
    [sta_cultimaalarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_status_sta_cultimaalarma] DEFAULT ('') NOT NULL,
    [sta_dfechautimaalarma] datetime NOT NULL,
    [sta_ncontadorfa] int CONSTRAINT [DF_m_status_sta_ncontadorfa] DEFAULT ((0)) NOT NULL,
    [sta_dfechaultimotst] datetime NOT NULL,
    [sta_dfechaprimerfa] datetime NOT NULL,
    [sta_dfechaultimooc] datetime NOT NULL,
    [sta_dfechaultimo2dotst] datetime NOT NULL,
    [sta_ncuentaenfallodetst] numeric(1,0) CONSTRAINT [DF_m_status_sta_ncuentaenfallodetst] DEFAULT ((0)) NOT NULL,
    [sta_ncuentaenfallo2dotst] numeric(1,0) CONSTRAINT [DF_m_status_sta_ncuentaenfallo2dotst] DEFAULT ((0)) NOT NULL,
    [sta_dfechaOPNdesde] datetime NOT NULL,
    [sta_dfechaultimo3ertst] datetime NOT NULL,
    [sta_ncuentaenfallo3ertst] numeric(1,0) CONSTRAINT [DF_m_status_sta_ncuentaenfallo3ertst] DEFAULT ((0)) NOT NULL,
    [sta_nEventoParaOPV] numeric(1,0) CONSTRAINT [DF_m_status_sta_nEventoParaOPV] DEFAULT ((0)) NOT NULL,
    [sta_cUltimaAlerta] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_status_sta_cUltimaAlerta] DEFAULT ('') NOT NULL,
    [sta_dFechaUltimaAlerta] datetime NOT NULL,
    [sta_tEnFalloDeTSTDesde] datetime NOT NULL,
    [sta_tEnFalloDeTST2Desde] datetime NOT NULL,
    [sta_tEnFalloDeTST3Desde] datetime NOT NULL,
    [sta_nEnFalloDeAC] numeric(1,0) CONSTRAINT [DF_m_status_sta_nEnFalloDeAC] DEFAULT ((0)) NOT NULL,
    [sta_iEnviadosSMS] smallint CONSTRAINT [DF_m_status_sta_iEnviadosSMS] DEFAULT ((0)) NOT NULL,
    [sta_tEnviadosSMSDesde] datetime NOT NULL,
    [sta_nEnviaSMS] numeric(1,0) CONSTRAINT [DF_m_status_sta_nEnviaSMS] DEFAULT ((0)) NOT NULL,
    [sta_nEnvioMailFA] numeric(1,0) CONSTRAINT [DF_m_status_sta_nEnvioMailFA] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_status] PRIMARY KEY CLUSTERED ([sta_iidcuenta] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_status_Nestado] ON [dbo].[m_status] ([sta_nestado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_Status_Mail] ON [dbo].[m_status] ([sta_iidcuenta] ASC, [sta_ncontadorfa] ASC, [sta_nEnvioMailFA] ASC);
GO
