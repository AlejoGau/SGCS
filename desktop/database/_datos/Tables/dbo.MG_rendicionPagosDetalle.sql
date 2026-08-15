IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_rendicionPagosDetalle] (
    [rpd_idkey] int NOT NULL,
    [rpd_fechaarchivo] date NOT NULL,
    [rpd_fechaproceso] datetime NOT NULL,
    [rpd_monto] money NOT NULL,
    [rpd_idcomprobanterecibo] int NOT NULL,
    [rpd_mgmidkey] int NOT NULL,
    [rpd_pagicodigoid] int NOT NULL
);
GO
