IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_comprobantes_item_fc] (
    [cbi_iCodigoCab] int CONSTRAINT [DF_m_comprobantes_item_fc_cbi_iCodigoCab] DEFAULT ((0)) NOT NULL,
    [cbi_iRenglon] smallint CONSTRAINT [DF_m_comprobantes_item_fc_cbi_iRenglon] DEFAULT ((0)) NOT NULL,
    [cbi_iProducto] int CONSTRAINT [DF_m_comprobantes_item_fc_cbi_iProducto] DEFAULT ((0)) NOT NULL,
    [cbi_iNovedad] int CONSTRAINT [DF_m_comprobantes_item_fc_cbi_iNovedad] DEFAULT ((0)) NOT NULL,
    [cbi_iNovedadTabla] int CONSTRAINT [DF_m_comprobantes_item_fc_cbi_iNovedadTabla] DEFAULT ((0)) NOT NULL,
    [cbi_yImporte] money CONSTRAINT [DF_m_comprobantes_item_fc_cbc_yImporte] DEFAULT ((0)) NOT NULL,
    [cbi_iCantidad] smallint CONSTRAINT [DF_m_comprobantes_item_fc_cbc_iCantidad] DEFAULT ((1)) NOT NULL,
    [cbi_nDescuento] numeric(5,2) CONSTRAINT [DF_m_comprobantes_item_fc_cbi_nDescuento] DEFAULT ((0)) NOT NULL,
    [cbi_idKey] int NOT NULL,
    [cbi_ccodigo] nvarchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cbi_cdescripcion] nvarchar(4000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cbi_cimpuestos] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_m_comprobantes_item_fc] PRIMARY KEY CLUSTERED ([cbi_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_m_comprobantes_item_fc] ON [dbo].[m_comprobantes_item_fc] ([cbi_iCodigoCab] ASC);
GO
