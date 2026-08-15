IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SmartPanicActivacion] (
    [spa_idkey] int NOT NULL,
    [spa_smartpanicsiid] int NOT NULL,
    [spa_code] varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [spa_token] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [spa_telefono] varchar(25) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [spa_dfechaalta] datetime CONSTRAINT [DF_SmartpanicActivaciones_spa_dfechaalta] DEFAULT (getdate()) NOT NULL,
    [spa_dfechaactivacion] datetime NOT NULL,
    [spa_status] int CONSTRAINT [DF_SmartpanicActivaciones_spa_status] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_SmartPanicActivacion] PRIMARY KEY CLUSTERED ([spa_idkey] ASC)
);
GO
