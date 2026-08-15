IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_mov_stock_items] (
    [msi_iid_cabecera] int NOT NULL,
    [msi_cProducto] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [msi_nCantidad] numeric(18,0) CONSTRAINT [DF_m_mov_stock_items_msc_nCantidad] DEFAULT ((0)) NOT NULL
);
GO
