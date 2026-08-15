IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MetaData] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [DataType] varchar(25) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [XmlData] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ObjectTypeId] int NOT NULL,
    [ObjectId] int NOT NULL,
    [Model] varchar(25) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_MetaData] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
