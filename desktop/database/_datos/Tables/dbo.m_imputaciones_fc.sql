IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_imputaciones_fc] (
    [imp_iCodigo_ID] int NOT NULL,
    [imp_dFecha] datetime NOT NULL,
    [imp_iCodigoCbteDebito] int CONSTRAINT [DF_m_imputaciones_fc_imp_iCodigoCbteDebito] DEFAULT ((0)) NOT NULL,
    [imp_nCuotaDebito] numeric(2,0) CONSTRAINT [DF_m_imputaciones_fc_imp_nCuota] DEFAULT ((0)) NOT NULL,
    [imp_iCodigoCbteCredito] int CONSTRAINT [DF_m_imputaciones_fc_imp_iCodigoCbteCredito] DEFAULT ((0)) NOT NULL,
    [imp_nCuotaCredito] numeric(2,0) CONSTRAINT [DF_m_imputaciones_fc_imp_nCuotaCredito] DEFAULT ((0)) NOT NULL,
    [imp_yImporteImputado] money CONSTRAINT [DF_m_imputaciones_fc_imp_yImporteInputado] DEFAULT ((0)) NOT NULL,
    [imp_mgmcidkey] int NOT NULL,
    [imp_mgmidkey] int NOT NULL,
    CONSTRAINT [PK_m_imputaciones_fc] PRIMARY KEY CLUSTERED ([imp_iCodigo_ID] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_m_imputaciones_fc_cr] ON [dbo].[m_imputaciones_fc] ([imp_iCodigoCbteCredito] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_m_imputaciones_fc_db] ON [dbo].[m_imputaciones_fc] ([imp_iCodigoCbteDebito] ASC);
GO
