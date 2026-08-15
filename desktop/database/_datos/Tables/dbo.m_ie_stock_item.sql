IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_ie_stock_item] (
    [msi_iCodigo_ID] int NOT NULL,
    [msi_iProducto] int NOT NULL,
    [msi_nCantidad] numeric(10,0) CONSTRAINT [DF_m_ie_stock_ite_msi_nCantidad] DEFAULT ((0)) NOT NULL
);
GO

CREATE NONCLUSTERED INDEX [IX_m_ie_stock_item] ON [dbo].[m_ie_stock_item] ([msi_iCodigo_ID] ASC);
GO
