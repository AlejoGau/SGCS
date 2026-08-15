IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[crm_contrato_item] (
    [Id] int NOT NULL,
    [idcontrato] int NOT NULL,
    [Price] decimal(18,2) NOT NULL,
    [Currency] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Status] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Description] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Quantity] int NOT NULL,
    [QuantityDelivered] int NOT NULL,
    [Code] varchar(512) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [VAT] decimal(9,2) NOT NULL,
    [ProductId] int NOT NULL,
    [idlista] int NOT NULL,
    CONSTRAINT [PK_crm_contrato_item] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NonClusteredIndex-Contrato] ON [dbo].[crm_contrato_item] ([idcontrato] ASC);
GO
