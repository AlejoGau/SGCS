IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SerTecTecnicoVisitas] (
    [stv_idKey] int NOT NULL,
    [stv_iTecnico] int NOT NULL,
    [stv_iVisita] int NOT NULL,
    [stv_iFormaDeViaje] int NOT NULL,
    [stv_iusuarioDss] int NOT NULL,
    CONSTRAINT [PK_SerTecTecnicoVisitas] PRIMARY KEY CLUSTERED ([stv_idKey] ASC)
);
GO
