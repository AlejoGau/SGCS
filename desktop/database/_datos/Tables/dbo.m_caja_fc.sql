IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_caja_fc] (
    [caj_iCodigo_ID] int NOT NULL,
    [caj_dFecha] datetime CONSTRAINT [DF_m_caja_fc_caj_dFecha] DEFAULT (getdate()) NOT NULL,
    [caj_cTipoMov] char(1) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_caja_fc_caj_cTipoMov] DEFAULT ('I') NOT NULL,
    [caj_cMotivo] varchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_caja_fc_caj_cMotivo] DEFAULT ('') NOT NULL,
    [caj_yTotal] money CONSTRAINT [DF_m_caja_fc_caj_yTotal] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_caja_fc] PRIMARY KEY CLUSTERED ([caj_iCodigo_ID] ASC)
);
GO
