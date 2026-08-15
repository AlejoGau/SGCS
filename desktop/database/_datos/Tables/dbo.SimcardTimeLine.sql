IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SimcardTimeLine] (
    [Stl_idkey] int NOT NULL,
    [Stl_simcardidkey] int NOT NULL,
    [Stl_tFechaHora] datetime NOT NULL,
    [Stl_cAccion] int CONSTRAINT [DF_StlTimeLine_Stl_cAccion] DEFAULT ((0)) NOT NULL,
    [Stl_cOriginal] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Stl_cActualizado] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Stl_cUserDss] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_StlTimeLine] PRIMARY KEY CLUSTERED ([Stl_idkey] ASC)
);
GO
