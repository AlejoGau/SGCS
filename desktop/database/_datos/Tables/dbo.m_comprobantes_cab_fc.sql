IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_comprobantes_cab_fc] (
    [cbc_iCodigo_ID] int NOT NULL,
    [cbc_dFecha] datetime NOT NULL,
    [cbc_iCliente] int CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_iCliente] DEFAULT ((0)) NOT NULL,
    [cbc_cTipoCbte] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_cTipoCbte] DEFAULT ('') NOT NULL,
    [cbc_cPrefijoCbte] char(4) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_cPrefijoCbte] DEFAULT ('0000') NOT NULL,
    [cbc_iNumeroCbte] int CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_iNumeroCbte] DEFAULT ((0)) NOT NULL,
    [cbc_ySubTotal] money CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_ySubTotal] DEFAULT ((0)) NOT NULL,
    [cbc_yImpuesto1] money CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_yImpuesto1] DEFAULT ((0)) NOT NULL,
    [cbc_yImpuesto2] money CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_yImpuesto2] DEFAULT ((0)) NOT NULL,
    [cbc_yImpuesto3] money CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_yImpuesto3] DEFAULT ((0)) NOT NULL,
    [cbc_yTotal] money CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_yTotal] DEFAULT ((0)) NOT NULL,
    [cbc_cEstado] char(1) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_cEstado] DEFAULT ('') NOT NULL,
    [cbc_cCAE] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_cCAE] DEFAULT ('') NOT NULL,
    [cbc_cVtoCAE] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_comprobantes_cab_fc_cbc_cVtoCAE] DEFAULT ('') NOT NULL,
    [cbc_iOrganizacionFacturadora] int NOT NULL,
    [cbc_iVersion] int CONSTRAINT [DF_m_comprobantes_item_fc_cbi_iVersion] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_comprobantes_cab_fc] PRIMARY KEY CLUSTERED ([cbc_iCodigo_ID] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_m_comprobantes_cab_fc_cliente] ON [dbo].[m_comprobantes_cab_fc] ([cbc_iCliente] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_m_comprobantes_cab_fc_fecha] ON [dbo].[m_comprobantes_cab_fc] ([cbc_dFecha] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_m_comprobantes_cab_fc_tipocbte] ON [dbo].[m_comprobantes_cab_fc] ([cbc_cTipoCbte] ASC);
GO
