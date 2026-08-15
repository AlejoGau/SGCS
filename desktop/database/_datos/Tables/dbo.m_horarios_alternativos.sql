IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_horarios_alternativos] (
    [alt_iidcuenta] int NOT NULL,
    [alt_ndiaapertura] numeric(1,0) CONSTRAINT [DF_m_horarios_alternativos_alt_ndiaapertura] DEFAULT ((1)) NOT NULL,
    [alt_choraapertura] char(5) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_alternativos_alt_choraapertura] DEFAULT ('00:00') NOT NULL,
    [alt_ndiacierre] numeric(1,0) CONSTRAINT [DF_m_horarios_alternativos_alt_ndiacierre] DEFAULT ((1)) NOT NULL,
    [alt_choracierre] char(5) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_horarios_alternativos_alt_choracierre] DEFAULT ('23:59') NOT NULL,
    [alt_idKey] int NOT NULL,
    CONSTRAINT [PK_m_horarios_alternativos] PRIMARY KEY NONCLUSTERED ([alt_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [dia] ON [dbo].[m_horarios_alternativos] ([alt_ndiaapertura] ASC);
GO

CREATE CLUSTERED INDEX [m_horarios_alternativos_cuenta] ON [dbo].[m_horarios_alternativos] ([alt_iidcuenta] ASC);
GO
