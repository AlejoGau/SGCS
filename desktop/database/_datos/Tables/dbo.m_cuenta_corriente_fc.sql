IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_cuenta_corriente_fc] (
    [cta_iCodigo_ID] int NOT NULL,
    [cta_iCodigoCbte] int CONSTRAINT [DF_m_cuenta_corriente_fc_cta_iCodigoCbte] DEFAULT ((0)) NOT NULL,
    [cta_nCuota] numeric(2,0) CONSTRAINT [DF_m_cuenta_corriente_fc_cta_nCuota] DEFAULT ((0)) NOT NULL,
    [cta_yTotal] money CONSTRAINT [DF_m_cuenta_corriente_fc_cta_yTotal] DEFAULT ((0)) NOT NULL,
    [cta_ySaldo] money CONSTRAINT [DF_m_cuenta_corriente_fc_cta_ySaldo] DEFAULT ((0)) NOT NULL,
    [cta_dVencimiento] datetime NOT NULL,
    [cta_dCobro] datetime NOT NULL,
    CONSTRAINT [PK_m_cuenta_corriente_fc] PRIMARY KEY CLUSTERED ([cta_iCodigo_ID] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_m_cuenta_corriente_fc] ON [dbo].[m_cuenta_corriente_fc] ([cta_iCodigoCbte] ASC);
GO
