IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_comprobantes_item_impuestos] (
    [cii_idkey] int NOT NULL,
    [cii_cbcicodigoid] int NOT NULL,
    [cii_cbiidkey] int NOT NULL,
    [cii_impuesto] float NOT NULL,
    [cii_impidkey] int NOT NULL,
    CONSTRAINT [PK_m_comprobantes_item_impuestos] PRIMARY KEY CLUSTERED ([cii_idkey] ASC)
);
GO
