IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[WeSafeConfig] (
    [wcf_idKey] int NOT NULL,
    [wcf_cDealer] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeConfig_wcf_cDealer] DEFAULT ('') NOT NULL,
    [wcf_cAppNameAppStore] varchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeConfig_wcf_cAppNameAppStore] DEFAULT ('') NOT NULL,
    [wcf_cIssuerID] varchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeConfig_wcf_cIssuerID] DEFAULT ('') NOT NULL,
    [wcf_cKeyIdAppStore] varchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeConfig_wcf_cKeyIdAppStore] DEFAULT ('') NOT NULL,
    [wcf_cPrivateKeyAppStore] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeConfig_wcf_cPrivateKeyAppStore] DEFAULT ('') NOT NULL,
    [wcf_cEndPointAppStore] varchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeConfig_wcf_cEndPointAppStore] DEFAULT ('') NOT NULL,
    [wcf_cAppNameGoogleStore] varchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeConfig_wcf_cAppNameGoogleStore] DEFAULT ('') NOT NULL,
    [wcf_cMailGoogleStore] varchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeConfig_wcf_cMailGoogleStore] DEFAULT ('') NOT NULL,
    [wcf_cPrivateKeyGoogleStore] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeConfig_wcf_cPrivateKeyGoogleStore] DEFAULT ('') NOT NULL,
    [wcf_cEndPointGooglePlay] varchar(1024) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeConfig_wcf_cEndPointGooglePlay] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_WeSafeConfig] PRIMARY KEY CLUSTERED ([wcf_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_Dealer] ON [dbo].[WeSafeConfig] ([wcf_cDealer] ASC);
GO
