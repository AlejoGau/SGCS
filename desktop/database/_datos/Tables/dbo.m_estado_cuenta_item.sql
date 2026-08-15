IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_estado_cuenta_item] (
    [est_iidcuenta] int NOT NULL,
    [est_czona] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_estado_cuenta_item_est_czona] DEFAULT ('') NOT NULL,
    [est_idKey] int NOT NULL,
    [est_cData] varchar(2000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_m_estado_cuenta_item] PRIMARY KEY CLUSTERED ([est_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_m_estado_cuenta_item] ON [dbo].[m_estado_cuenta_item] ([est_iidcuenta] ASC);
GO
