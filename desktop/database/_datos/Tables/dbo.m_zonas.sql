IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_zonas] (
    [zon_iidcuenta] int NOT NULL,
    [zon_ccodigo] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_zon_ccodigo] DEFAULT ('') NOT NULL,
    [zon_cdescripcion] varchar(60) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_zon_cdescripcion] DEFAULT ('') NOT NULL,
    [zon_codigoalarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_zon_codigoalarma] DEFAULT ('') NOT NULL,
    [zon_clistaemergencia] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_zon_clistaemergencia] DEFAULT ('') NOT NULL,
    [zon_cimagen] varchar(60) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_zon_cimagen] DEFAULT ('') NOT NULL,
    [zon_mobservacion] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_zon_mobservacion] DEFAULT ('') NOT NULL,
    [zon_ccodigorestauracion] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_zon_ccodigorestauracion] DEFAULT ('') NOT NULL,
    [zon_nminutosrestauracion] numeric(3,0) CONSTRAINT [DF_m_zonas_zon_nminutosrestauracion] DEFAULT ((0)) NOT NULL,
    [zon_nmostrar] numeric(1,0) CONSTRAINT [DF_m_zonas_zon_nmostrar] DEFAULT ((0)) NOT NULL,
    [zon_cdealer] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_zon_cdealer] DEFAULT ('') NOT NULL,
    [zon_ccuenta] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_zon_ccuenta] DEFAULT ('') NOT NULL,
    [zon_nautoprocesa] numeric(1,0) CONSTRAINT [DF_m_zonas_zon_nautoprocesa] DEFAULT ((2)) NOT NULL,
    [zon_cAlarmaAGenerar] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_zonas_zon_cAlarmaAGenerar] DEFAULT ('') NOT NULL,
    [zon_idKey] int NOT NULL
);
GO

CREATE CLUSTERED INDEX [cuenta] ON [dbo].[m_zonas] ([zon_iidcuenta] ASC, [zon_ccodigo] ASC);
GO

CREATE NONCLUSTERED INDEX [minutos] ON [dbo].[m_zonas] ([zon_nminutosrestauracion] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_m_zonas_Idkey] ON [dbo].[m_zonas] ([zon_idKey] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_mZonas_DealerCuentaCodigo] ON [dbo].[m_zonas] ([zon_cdealer] ASC, [zon_ccuenta] ASC, [zon_ccodigo] ASC);
GO

CREATE NONCLUSTERED INDEX [restauracion] ON [dbo].[m_zonas] ([zon_ccodigorestauracion] ASC);
GO

CREATE NONCLUSTERED INDEX [zona] ON [dbo].[m_zonas] ([zon_ccodigo] ASC);
GO
