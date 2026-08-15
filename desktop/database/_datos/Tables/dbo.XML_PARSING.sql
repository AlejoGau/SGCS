IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[XML_PARSING] (
    [XML_Tag] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL
);
GO
