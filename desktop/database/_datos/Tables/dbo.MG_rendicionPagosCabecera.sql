IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_rendicionPagosCabecera] (
    [rpc_idkey] int NOT NULL,
    [rpc_uploaddate] date NOT NULL,
    [rpc_createdate] date NOT NULL,
    [rpc_orgid] int NOT NULL,
    [rpc_conidkey] int NOT NULL,
    [rpc_usuiid] int NOT NULL
);
GO
