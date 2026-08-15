IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Product] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [SmallComment] varchar(2000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [LargeComment] varchar(4000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Body] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Available] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Price] decimal(9,2) NOT NULL,
    [Structure] varchar(25) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Weight] int NOT NULL,
    [MetaDescription] varchar(2000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [MetaKeywords] varchar(2000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Status] varchar(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [AttachId] int NOT NULL,
    [Code] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [VAT] decimal(9,2) NOT NULL,
    [Cost] decimal(9,2) NOT NULL,
    [MeasureUnit] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pro_iidorganizacion] int NOT NULL,
    [pro_itipo] int NOT NULL,
    [pro_currency] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pro_cantidad_auto] int CONSTRAINT [DF__Product__pro_can__49EA4D00] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_product_codigo] ON [dbo].[Product] ([Code] ASC, [pro_iidorganizacion] ASC);
GO

CREATE NONCLUSTERED INDEX [nc_product_organizacion] ON [dbo].[Product] ([pro_iidorganizacion] ASC, [Status] ASC);
GO
