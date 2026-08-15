IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_estado_cuenta_cab] (
    [est_iidcuenta] int NOT NULL,
    [est_nestado] numeric(1,0) CONSTRAINT [DF_m_estado_cuenta_cab_est_nestado] DEFAULT ((0)) NOT NULL,
    [est_ntipo] numeric(1,0) CONSTRAINT [DF_m_estado_cuenta_cab_est_ntipo] DEFAULT ((1)) NOT NULL,
    [est_dfechadesde] datetime NOT NULL,
    [est_nduracion] numeric(3,0) CONSTRAINT [DF_m_estado_cuenta_cab_est_nduracion] DEFAULT ((0)) NOT NULL,
    [est_dfechahasta] datetime NOT NULL,
    [est_mnota] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_estado_cuenta_cab_est_mnota] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_m_estado_cuenta_cab] PRIMARY KEY CLUSTERED ([est_iidcuenta] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_estado] ON [dbo].[m_estado_cuenta_cab] ([est_nestado] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EC_CtaId] ON [dbo].[m_estado_cuenta_cab] ([est_iidcuenta] ASC, [est_nestado] ASC, [est_dfechahasta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_m_estado_cuenta_cab_NestadoNtipoDfechadesde] ON [dbo].[m_estado_cuenta_cab] ([est_nestado] ASC, [est_ntipo] ASC, [est_dfechadesde] ASC);
GO
