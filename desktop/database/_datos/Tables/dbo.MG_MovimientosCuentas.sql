IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[MG_MovimientosCuentas] (
    [mgm_idkey] bigint NOT NULL,
    [mgm_idcuenta] int NOT NULL,
    [mgm_monto] money NOT NULL,
    [mgm_saldo] money NOT NULL,
    [mgm_fecha] datetime NOT NULL,
    [mgm_estado] int NOT NULL,
    [mgm_idcomprobante] int NOT NULL
);
GO

CREATE NONCLUSTERED INDEX [NC_mgm_idcomprobante] ON [dbo].[MG_MovimientosCuentas] ([mgm_idcuenta] ASC, [mgm_monto] ASC, [mgm_estado] ASC, [mgm_idcomprobante] ASC, [mgm_fecha] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_mgm_idcuenta] ON [dbo].[MG_MovimientosCuentas] ([mgm_monto] ASC, [mgm_saldo] ASC, [mgm_idcomprobante] ASC, [mgm_idcuenta] ASC, [mgm_fecha] ASC, [mgm_estado] ASC);
GO

CREATE CLUSTERED INDEX [PK_MGM_idkey] ON [dbo].[MG_MovimientosCuentas] ([mgm_idkey] ASC);
GO
