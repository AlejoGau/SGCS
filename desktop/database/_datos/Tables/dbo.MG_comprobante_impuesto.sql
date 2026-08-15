IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_comprobante_impuesto] (
    [mci_idkey] int NOT NULL,
    [mci_cbcicodigoid] int NOT NULL,
    [mci_impidkey] int NOT NULL,
    [mci_total] money NOT NULL,
    [mci_baseimponible] money CONSTRAINT [DF_MG_comprobante_impuesto_mci_baseimponible] DEFAULT ((0)) NOT NULL,
    [mci_mgmidkey] int NOT NULL,
    CONSTRAINT [PK_MG_comprobante_impuesto] PRIMARY KEY CLUSTERED ([mci_idkey] ASC)
);
GO
