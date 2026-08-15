IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[ObjectTaxonomy] (
    [Id] int NOT NULL,
    [ObjectTypeId] int NOT NULL,
    [ObjectId] int NOT NULL,
    [TaxonomyId] int NOT NULL,
    [FirstParentId] int NOT NULL,
    [DateCreated] datetime CONSTRAINT [DF_ObjectTaxonomy_DateCreated] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_ObjectTaxonomy] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
