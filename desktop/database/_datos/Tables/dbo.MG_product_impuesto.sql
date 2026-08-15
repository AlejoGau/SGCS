IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_product_impuesto] (
    [mpi_idkey] int NOT NULL,
    [mpi_idproduct] int NOT NULL,
    [mpi_impidkey] int NOT NULL,
    CONSTRAINT [PK_MG_product_impuesto] PRIMARY KEY CLUSTERED ([mpi_idkey] ASC)
);
GO
