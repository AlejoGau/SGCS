IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_formatos] (
    [for_ccodigo] char(4) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [for_cdescripcion] varchar(40) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [for_cformato] varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [for_cnombre] varchar(30) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [for_calarma] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [for_idKey] int NOT NULL,
    [for_cProtocolo] varchar(150) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [for_ckey] nvarchar(170) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_m_formatos] PRIMARY KEY CLUSTERED ([for_ckey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [nc_for_cCodigo] ON [dbo].[m_formatos] ([for_ccodigo] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_m_formatos_CalarmaIN] ON [dbo].[m_formatos] ([for_cformato] ASC, [for_calarma] ASC);
GO
