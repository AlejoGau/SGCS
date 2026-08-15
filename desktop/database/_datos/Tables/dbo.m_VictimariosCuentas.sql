IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_VictimariosCuentas] (
    [vct_idKey] int NOT NULL,
    [vct_idKeyVictimario] int CONSTRAINT [DF_m_VictimariosCuentas_apv_idKeyVictimario] DEFAULT ((0)) NOT NULL,
    [vct_idKeyCuenta] int CONSTRAINT [DF_m_VictimariosCuentas_vct_idKeyCuenta] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_VictimariosCuentas] PRIMARY KEY CLUSTERED ([vct_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_VictimariosCuentas] ON [dbo].[m_VictimariosCuentas] ([vct_idKeyCuenta] ASC, [vct_idKeyVictimario] ASC);
GO
