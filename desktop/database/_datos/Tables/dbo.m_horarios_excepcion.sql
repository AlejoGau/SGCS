IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_horarios_excepcion] (
    [exc_iidcuenta] int NOT NULL,
    [exc_cevento] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_excepcion_exc_cevento] DEFAULT ('') NOT NULL,
    [exc_idKey] int NOT NULL,
    [exc_cHoraApertura] char(5) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_excepcion_exc_cHoraApertura] DEFAULT ('00:00') NOT NULL,
    [exc_cHoraCierre] char(5) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_excepcion_exc_cHoraCierre] DEFAULT ('23:59') NOT NULL,
    CONSTRAINT [PK_m_horarios_excepcion] PRIMARY KEY NONCLUSTERED ([exc_idKey] ASC)
);
GO

CREATE CLUSTERED INDEX [cuenta] ON [dbo].[m_horarios_excepcion] ([exc_iidcuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_m_horarios_excepcion_CeventoIN] ON [dbo].[m_horarios_excepcion] ([exc_cHoraApertura] ASC, [exc_cHoraCierre] ASC, [exc_cevento] ASC);
GO
