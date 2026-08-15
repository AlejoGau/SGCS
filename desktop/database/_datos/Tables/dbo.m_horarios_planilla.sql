IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_horarios_planilla] (
    [hor_iid] int NOT NULL,
    [hor_ndiaapertura] numeric(1,0) CONSTRAINT [DF_m_horarios_planilla_hor_ndiaapertura] DEFAULT ((1)) NOT NULL,
    [hor_choraapertura] char(5) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_planilla_hor_choraapertura] DEFAULT ('00:00') NOT NULL,
    [hor_ndiacierre] numeric(1,0) CONSTRAINT [DF_m_horarios_planilla_hor_ndiacierre] DEFAULT ((1)) NOT NULL,
    [hor_choracierre] char(5) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_planilla_hor_choracierre] DEFAULT ('23:59') NOT NULL,
    [hor_idKey] int NOT NULL,
    CONSTRAINT [PK_m_horarios_planilla] PRIMARY KEY CLUSTERED ([hor_idKey] ASC)
);
GO
