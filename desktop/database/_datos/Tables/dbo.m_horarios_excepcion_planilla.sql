IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_horarios_excepcion_planilla] (
    [exc_iid] int NOT NULL,
    [exc_cevento] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_excepcion_planilla_exc_cevento] DEFAULT ('') NOT NULL,
    [exc_cHoraApertura] char(5) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_excepcion_planilla_exc_cHoraApertura] DEFAULT ('00:00') NOT NULL,
    [exc_cHoraCierre] char(5) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_excepcion_planilla_exc_cHoraCierre] DEFAULT ('23:59') NOT NULL
);
GO
