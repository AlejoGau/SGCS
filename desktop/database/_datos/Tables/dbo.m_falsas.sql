IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_falsas] (
    [fal_iidcuenta] int NOT NULL,
    [fal_nmargen] numeric(3,0) CONSTRAINT [DF_m_falsas_fal_nmargen] DEFAULT ((0)) NOT NULL,
    [fal_nmeses] numeric(2,0) CONSTRAINT [DF_m_falsas_fal_nmeses] DEFAULT ((0)) NOT NULL,
    [fal_mnota] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_falsas_fal_mnota] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_falsas] PRIMARY KEY CLUSTERED ([fal_iidcuenta] ASC)
);
GO
