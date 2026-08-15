IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_listas_precios] (
    [mglp_idkey] int NOT NULL,
    [mglp_nombre] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [mglp_tipo] int NOT NULL,
    [mglp_multiplicador] real NOT NULL,
    [mglp_idorganizacion] int NOT NULL,
    [mglp_currency] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_MG_listas_precios] PRIMARY KEY CLUSTERED ([mglp_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [MG_listas_precios_org] ON [dbo].[MG_listas_precios] ([mglp_nombre] ASC, [mglp_tipo] ASC, [mglp_currency] ASC, [mglp_idorganizacion] ASC);
GO
