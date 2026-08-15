IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_horarios_alternativos_planilla] (
    [Alt_iid] int NOT NULL,
    [Alt_ndiaapertura] numeric(1,0) CONSTRAINT [DF_m_horarios_alternativos_planilla_Alt_ndiaapertura] DEFAULT ((1)) NOT NULL,
    [Alt_choraapertura] char(5) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_alternativos_planilla_Alt_choraapertura] DEFAULT ('00:00') NOT NULL,
    [Alt_ndiacierre] numeric(1,0) CONSTRAINT [DF_m_horarios_alternativos_planilla_Alt_ndiacierre] DEFAULT ((1)) NOT NULL,
    [Alt_choracierre] char(5) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_alternativos_planilla_Alt_choracierre] DEFAULT ('23:59') NOT NULL
);
GO
