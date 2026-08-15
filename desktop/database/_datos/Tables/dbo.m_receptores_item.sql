IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_receptores_item] (
    [rec_iid] int NOT NULL,
    [rec_cformato] char(4) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_receptores_item_rec_cformato] DEFAULT ('') NOT NULL,
    [rec_idKey] int NOT NULL,
    [rec_iConexion] int CONSTRAINT [DF_m_receptores_item_rec_iConexion] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_receptores_item] PRIMARY KEY CLUSTERED ([rec_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_receptores_item_CformatoIN] ON [dbo].[m_receptores_item] ([rec_iid] ASC, [rec_cformato] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_ReceptoresCabConexionFormato] ON [dbo].[m_receptores_item] ([rec_idKey] ASC, [rec_iid] ASC, [rec_iConexion] ASC, [rec_cformato] ASC);
GO

CREATE NONCLUSTERED INDEX [nk_codigo] ON [dbo].[m_receptores_item] ([rec_iid] ASC);
GO
