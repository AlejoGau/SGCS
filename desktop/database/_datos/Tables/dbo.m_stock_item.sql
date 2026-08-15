IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_stock_item] (
    [sti_idkey] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sti_idcabecera] int NOT NULL,
    [sti_idproducto] int NOT NULL,
    [sti_cant] real NOT NULL,
    CONSTRAINT [PK_m_stock_item] PRIMARY KEY CLUSTERED ([sti_idkey] ASC)
);
GO
