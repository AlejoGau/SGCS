IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_dealer_vcconfig] (
    [dvc_idKey] int NOT NULL,
    [dvc_cdealer] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [dvc_config] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [dvc_apptype] varchar(64) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_dealer_vcconfig_dvc_apptype] DEFAULT ('VIGICONTROL') NOT NULL,
    CONSTRAINT [PK_m_dealer_vcconfig] PRIMARY KEY CLUSTERED ([dvc_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [idx_dvc_cdealer] ON [dbo].[m_dealer_vcconfig] ([dvc_cdealer] ASC, [dvc_apptype] ASC);
GO
