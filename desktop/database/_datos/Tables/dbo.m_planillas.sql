IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_planillas] (
    [pla_iid] int NOT NULL,
    [pla_cDescripcion] char(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_planillas_pla_cDescripcion] DEFAULT ('') NOT NULL,
    [pla_cNombreTabla] char(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_planillas_pla_cNombreTabla] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_planillas] PRIMARY KEY CLUSTERED ([pla_iid] ASC)
);
GO
