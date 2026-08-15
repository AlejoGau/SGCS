IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[RelationValues] (
    [RelationValueId] int NOT NULL,
    [RelationId] int NOT NULL,
    [RelationType] varchar(15) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ValueType] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Value] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_RelationValues] PRIMARY KEY CLUSTERED ([RelationValueId] ASC)
);
GO
