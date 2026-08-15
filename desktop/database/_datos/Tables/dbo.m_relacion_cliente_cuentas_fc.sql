IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_relacion_cliente_cuentas_fc] (
    [rel_icliente] int CONSTRAINT [DF_m_relacion_cliente_cuentas_fc_rel_icliente] DEFAULT ((0)) NOT NULL,
    [rel_icuenta] int CONSTRAINT [DF_m_relacion_cliente_cuentas_fc_rel_icuenta] DEFAULT ((0)) NOT NULL,
    [rel_ntipo] numeric(1,0) CONSTRAINT [DF_m_relacion_cliente_cuentas_fc_rel_ntipo] DEFAULT ((0)) NOT NULL,
    [rel_cdealer] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_relacion_cliente_cuentas_fc_rel_cdealer] DEFAULT ('') NOT NULL,
    [rel_inovedadtabla] int CONSTRAINT [DF_m_relacion_cliente_cuentas_fc_rel_inovedadtabla] DEFAULT ((0)) NOT NULL
);
GO

CREATE CLUSTERED INDEX [PK_m_relacion_cliente_cuentas_fc] ON [dbo].[m_relacion_cliente_cuentas_fc] ([rel_icliente] ASC);
GO
