IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SerTecProductosOrden] (
    [spr_idKey] int NOT NULL,
    [spr_iServicio] int NOT NULL,
    [spr_iVisita] int NOT NULL,
    [spr_iProducto] int NOT NULL,
    [spr_iCantidad] real NOT NULL,
    [spr_iusuarioDss] int NOT NULL,
    CONSTRAINT [PK_SerTecProductosOrden] PRIMARY KEY CLUSTERED ([spr_idKey] ASC)
);
GO
