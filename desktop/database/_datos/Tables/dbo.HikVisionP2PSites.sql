IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[HikVisionP2PSites] (
    [hps_idKey] int NOT NULL,
    [hps_iKeyDomain] int CONSTRAINT [DF_HikVisionP2PSites_hps_iKeyDomain] DEFAULT ((0)) NOT NULL,
    [hps_cAppKey] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_HikVisionP2PSites_hps_cAppKey] DEFAULT ('') NOT NULL,
    [hps_cAppSecret] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_HikVisionP2PSites_hps_cAppSecret] DEFAULT ('') NOT NULL,
    [hps_cPlatformAddress] varchar(500) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_HikVisionP2PSites_hps_cPlatformAddress] DEFAULT ('') NOT NULL,
    [hps_bIsActive] bit CONSTRAINT [DF_HikVisionP2PSites_hps_bIsActive] DEFAULT ((1)) NOT NULL,
    [hps_tLastSyncDate] datetime NOT NULL,
    [hps_tCreatedDate] datetime CONSTRAINT [DF_HikVisionP2PSites_hps_tCreatedDate] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_HikVisionP2PSites] PRIMARY KEY CLUSTERED ([hps_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_HikVisionP2PSites_KeyDomain_AppKey] ON [dbo].[HikVisionP2PSites] ([hps_iKeyDomain] ASC, [hps_cAppKey] ASC);
GO
