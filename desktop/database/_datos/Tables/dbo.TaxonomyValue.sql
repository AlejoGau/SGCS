IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[TaxonomyValue] (
    [Id] int NOT NULL,
    [Name] varchar(150) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [type] int NOT NULL,
    [metadata] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [editable] int CONSTRAINT [DF_TaxonomyValue_editable] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_TaxonomyValue] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
