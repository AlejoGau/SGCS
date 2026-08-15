IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_novedades_facturacion_fc] (
    [nfc_icodigo_ID] int NOT NULL,
    [nfc_icliente] int CONSTRAINT [DF_m_novedades_facturacion_fc_nfc_icliente] DEFAULT ((0)) NOT NULL,
    [nfc_inovedad] int CONSTRAINT [DF_m_novedades_facturacion_fc_nfc_inovedad] DEFAULT ((0)) NOT NULL,
    [nfc_nrecurrente] numeric(1,0) CONSTRAINT [DF_m_novedades_facturacion_fc_nfc_nrecurrente] DEFAULT ((2)) NOT NULL,
    [nfc_nestado] numeric(1,0) CONSTRAINT [DF_m_novedades_facturacion_fc_nfc_nestado] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_novedades_facturacion_fc] PRIMARY KEY CLUSTERED ([nfc_icodigo_ID] ASC)
);
GO
