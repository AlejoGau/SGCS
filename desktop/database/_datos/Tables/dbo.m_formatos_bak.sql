IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_formatos_bak] (
    [for_ccodigo] char(4) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [for_cdescripcion] varchar(40) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_formatos_for_cdescripcion] DEFAULT ('') NOT NULL,
    [for_cformato] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_formatos_for_cformato] DEFAULT ('') NOT NULL,
    [for_cnombre] varchar(30) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_formatos_for_cnombre] DEFAULT ('') NOT NULL,
    [for_calarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_formatos_for_calarma] DEFAULT ('') NOT NULL,
    [for_idKey] int NOT NULL,
    [for_cProtocolo] varchar(150) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_formatos_for_cProtocolo] DEFAULT ('') NOT NULL,
    [for_ckey] nvarchar(170) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_m_formatos_bak] PRIMARY KEY CLUSTERED ([for_ccodigo] ASC)
);
GO

CREATE NONCLUSTERED INDEX [nc_for_calarma_bak] ON [dbo].[m_formatos_bak] ([for_calarma] ASC);
GO

CREATE NONCLUSTERED INDEX [nc_for_cformato_bak] ON [dbo].[m_formatos_bak] ([for_cformato] ASC);
GO

CREATE NONCLUSTERED INDEX [nc_for_idkey_bak] ON [dbo].[m_formatos_bak] ([for_idKey] ASC);
GO
