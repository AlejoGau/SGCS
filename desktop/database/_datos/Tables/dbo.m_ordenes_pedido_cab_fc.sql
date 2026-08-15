IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_ordenes_pedido_cab_fc] (
    [opc_iCodigo_ID] int NOT NULL,
    [opc_dFecha] datetime NOT NULL,
    [opc_iCliente] int CONSTRAINT [DF_m_ordenes_pedido_cab_fc_opc_iCliente] DEFAULT ((0)) NOT NULL,
    [opc_iNumeroCbte] int CONSTRAINT [DF_m_ordenes_pedido_cab_fc_opc_iNumeroCbte] DEFAULT ((0)) NOT NULL,
    [opc_ySubTotal] money CONSTRAINT [DF_m_ordenes_pedido_cab_fc_opc_ySubTotal] DEFAULT ((0)) NOT NULL,
    [opc_yImpuesto1] money CONSTRAINT [DF_m_ordenes_pedido_cab_fc_opc_yImpuesto1] DEFAULT ((0)) NOT NULL,
    [opc_yImpuesto2] money CONSTRAINT [DF_m_ordenes_pedido_cab_fc_opc_yImpuesto2] DEFAULT ((0)) NOT NULL,
    [opc_yImpuesto3] money CONSTRAINT [DF_m_ordenes_pedido_cab_fc_opc_yImpuesto3] DEFAULT ((0)) NOT NULL,
    [opc_yTotal] money CONSTRAINT [DF_m_ordenes_pedido_cab_fc_opc_yTotal] DEFAULT ((0)) NOT NULL,
    [opc_cEstado] char(1) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_ordenes_pedido_cab_fc_opc_cEstado] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_ordenes_pedido_cab_fc] PRIMARY KEY CLUSTERED ([opc_iCodigo_ID] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_m_ordenes_pedido_cab_fc_cliente] ON [dbo].[m_ordenes_pedido_cab_fc] ([opc_iCliente] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_m_ordenes_pedido_cab_fc_fecha] ON [dbo].[m_ordenes_pedido_cab_fc] ([opc_dFecha] ASC);
GO
