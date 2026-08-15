IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_CuentasConn] (
    [cco_idKey] int NOT NULL,
    [cco_iidCuenta] int CONSTRAINT [DF_m_CuentasConn_cco_iidCuenta] DEFAULT ((0)) NOT NULL,
    [cco_iConexion] int CONSTRAINT [DF_m_CuentasConn_cco_iConexion] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_CuentasConn] PRIMARY KEY CLUSTERED ([cco_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_CuentasConexion] ON [dbo].[m_CuentasConn] ([cco_idKey] ASC, [cco_iidCuenta] ASC, [cco_iConexion] ASC);
GO
