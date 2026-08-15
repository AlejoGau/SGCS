IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Controller_x_package] (
    [Controller] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Package] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [RazorType] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [id] int NOT NULL
);
GO
