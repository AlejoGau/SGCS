IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_reportes_automaticos] (
    [rep_iidcuenta] int NOT NULL,
    [rep_ntipo] numeric(1,0) CONSTRAINT [DF_m_reportes_automaticos_rep_ntipo] DEFAULT ((4)) NOT NULL,
    [rep_tproximoenvio] datetime NOT NULL,
    [rep_nfrecuencia] numeric(1,0) CONSTRAINT [DF_m_reportes_automaticos_rep_nfrecuencia] DEFAULT ((5)) NOT NULL,
    [rep_cmail] varchar(4000) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_reportes_automaticos_rep_cmail] DEFAULT ('') NOT NULL,
    [rep_idKey] int NOT NULL,
    [rep_iLimiteSMS] smallint CONSTRAINT [DF_m_reportes_automaticos_rep_iLimiteSMS] DEFAULT ((0)) NOT NULL,
    [rep_nLimiteCada] numeric(3,0) CONSTRAINT [DF_m_reportes_automaticos_rep_nLimiteCada] DEFAULT ((0)) NOT NULL,
    [rep_nCadaUnidadTiempo] numeric(1,0) CONSTRAINT [DF_m_reportes_automaticos_rep_nCadaUnidadTiempo] DEFAULT ((0)) NOT NULL,
    [rep_cMailRuteoSMS] varchar(150) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_reportes_automaticos_rep_cMailRuteoSMS] DEFAULT ('') NOT NULL,
    [rep_cSMSParaInforme] varchar(150) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_reportes_automaticos_rep_cSMSParaInforme] DEFAULT ('') NOT NULL,
    [rep_iModemSMS] int CONSTRAINT [DF_m_reportes_automaticos_rep_iModemSMS] DEFAULT ((0)) NOT NULL,
    [rep_idGrupo] int NOT NULL,
    CONSTRAINT [PK_m_reportes_automaticos] PRIMARY KEY CLUSTERED ([rep_iidcuenta] ASC)
);
GO
