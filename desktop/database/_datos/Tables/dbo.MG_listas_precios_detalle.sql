IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_listas_precios_detalle] (
    [mglpd_idkey] int NOT NULL,
    [mglpd_idproducto] int NOT NULL,
    [mglpd_idlista] int NOT NULL,
    [mglpd_valor] money NOT NULL,
    CONSTRAINT [PK_MG_listas_precios_detalle] PRIMARY KEY CLUSTERED ([mglpd_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [MG_listas_precios_detalle_producto] ON [dbo].[MG_listas_precios_detalle] ([mglpd_idkey] ASC, [mglpd_valor] ASC, [mglpd_idproducto] ASC, [mglpd_idlista] ASC);
GO
