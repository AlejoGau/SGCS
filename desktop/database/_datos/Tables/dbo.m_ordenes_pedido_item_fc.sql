IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_ordenes_pedido_item_fc] (
    [opi_iCodigoCab] int CONSTRAINT [DF_m_ordenes_pedido_item_fc_opi_iCodigoCab] DEFAULT ((0)) NOT NULL,
    [opi_iRenglon] smallint CONSTRAINT [DF_m_ordenes_pedido_item_fc_opi_iRenglon] DEFAULT ((0)) NOT NULL,
    [opi_iProducto] int CONSTRAINT [DF_m_ordenes_pedido_item_fc_opi_iProducto] DEFAULT ((0)) NOT NULL,
    [opi_yImporte] money CONSTRAINT [DF_m_ordenes_pedido_item_fc_opc_yImporte] DEFAULT ((0)) NOT NULL,
    [opi_iCantidad] smallint CONSTRAINT [DF_m_ordenes_pedido_item_fc_opc_iCantidad] DEFAULT ((1)) NOT NULL,
    [opi_nDescuento] numeric(5,2) CONSTRAINT [DF_m_ordenes_pedido_item_fc_opi_nDescuento] DEFAULT ((0)) NOT NULL
);
GO

CREATE NONCLUSTERED INDEX [IX_m_ordenes_pedido_item_fc] ON [dbo].[m_ordenes_pedido_item_fc] ([opi_iCodigoCab] ASC);
GO
