IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SerTecMovilesVisitas] (
    [smv_idKey] int NOT NULL,
    [smv_iMovil] int NOT NULL,
    [smv_iVisita] int NOT NULL,
    [smv_iusuarioDss] int NOT NULL,
    CONSTRAINT [PK_SerTecMovilesVisitas] PRIMARY KEY CLUSTERED ([smv_idKey] ASC)
);
GO
