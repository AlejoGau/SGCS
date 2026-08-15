IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SerTecTimeLine] (
    [stl_idKey] int NOT NULL,
    [stl_iServicio] int NOT NULL,
    [stl_tFechaHora] datetime NOT NULL,
    [stl_cAccion] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [stl_cObservacion] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [stl_iUsuarioDSS] int NOT NULL,
    CONSTRAINT [PK_SerTecTimeLine] PRIMARY KEY CLUSTERED ([stl_idKey] ASC)
);
GO
