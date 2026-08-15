IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_notas] (
    [not_iidcuenta] int NOT NULL,
    [not_mnotaprincipal] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_notas_not_mnotaprincipal] DEFAULT ('') NOT NULL,
    [not_mnotatemporal] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_notas_not_mnotatemporal] DEFAULT ('') NOT NULL,
    [not_dtemporaldesde] datetime NOT NULL,
    [not_dtemporalhasta] datetime NOT NULL,
    CONSTRAINT [PK_m_notas] PRIMARY KEY CLUSTERED ([not_iidcuenta] ASC)
);
GO
