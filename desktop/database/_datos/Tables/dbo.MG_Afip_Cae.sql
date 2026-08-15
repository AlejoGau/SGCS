IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_Afip_Cae] (
    [mac_idkey] int NOT NULL,
    [mac_idcbte] int NOT NULL,
    [mac_estado] int NOT NULL,
    [mac_fechaalta] datetime NOT NULL,
    [mac_fechamod] datetime NOT NULL,
    CONSTRAINT [PK_MG_Afip_Cae] PRIMARY KEY CLUSTERED ([mac_idkey] ASC)
);
GO
