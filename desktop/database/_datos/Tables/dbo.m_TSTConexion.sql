IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_TSTConexion] (
    [txc_idKey] int NOT NULL,
    [txc_idCuenta] int CONSTRAINT [DF_m_TSTConexion_txc_idCuenta] DEFAULT ((0)) NOT NULL,
    [txc_idIRSConn] int CONSTRAINT [DF_m_TSTConexion_txc_idIRSConn] DEFAULT ((0)) NOT NULL,
    [txc_cAlarmaEsperada] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_TSTConexion_txc_cAlarmaEsperada] DEFAULT ('') NOT NULL,
    [txc_iMinutos] int CONSTRAINT [DF_m_TSTConexion_txc_iMinutos] DEFAULT ((0)) NOT NULL,
    [txc_cAlarmaAGenerar] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_TSTConexion_txc_cAlarmaAGenerar] DEFAULT ('') NOT NULL,
    [txc_cAlarmaAutoprocesa] varchar(200) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_TSTConexion_txc_cAlarmaAutoprocesa] DEFAULT ('') NOT NULL,
    [txc_tEnFalloDeDesde] datetime NOT NULL,
    [txc_tFechaUltimaRX] datetime NOT NULL,
    CONSTRAINT [PK_m_TSTConexion] PRIMARY KEY CLUSTERED ([txc_idKey] ASC)
);
GO
