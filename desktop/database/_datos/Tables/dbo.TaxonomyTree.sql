IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[TaxonomyTree] (
    [ParentId] int NOT NULL,
    [ChildId] int NOT NULL,
    CONSTRAINT [PK_TaxonomyTree] PRIMARY KEY CLUSTERED ([ParentId] ASC, [ChildId] ASC)
);
GO
