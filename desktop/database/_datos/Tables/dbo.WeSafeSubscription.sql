IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[WeSafeSubscription] (
    [wsu_idKey] int NOT NULL,
    [wsu_cDealer] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeSubscription_wsu_cDealer] DEFAULT ('') NOT NULL,
    [wsu_cID] char(4) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeSubscription_wsu_cID] DEFAULT ('') NOT NULL,
    [wsu_cName] varchar(40) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeSubscription_wsu_cName] DEFAULT ('') NOT NULL,
    [wsu_cDesc] varchar(45) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeSubscription_wsu_cDesc] DEFAULT ('') NOT NULL,
    [wsu_iPriceID] int CONSTRAINT [DF_WeSafeSubscription_wsu_iPriceID] DEFAULT ((1)) NOT NULL,
    [wsu_iPeriodicityID] int CONSTRAINT [DF_WeSafeSubscription_wsu_iPeriodicityID] DEFAULT ((6)) NOT NULL,
    [wsu_tDateCreation] datetime CONSTRAINT [DF_WeSafeSubscription_wsu_tDateCreation] DEFAULT (getdate()) NOT NULL,
    [wsu_tDateUpdateAndroid] datetime NOT NULL,
    [wsu_iStatusAndroid] int CONSTRAINT [DF_WeSafeSubscription_wsu_iStatusAndroid] DEFAULT ((0)) NOT NULL,
    [wsu_tDateUpdateIOS] datetime NOT NULL,
    [wsu_iStatusIOS] int CONSTRAINT [DF_WeSafeSubscription_wsu_iStatusIOS] DEFAULT ((0)) NOT NULL,
    [wsu_cSubscriptionGroupIdIOS] varchar(128) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeSubscription_wsu_cSubscriptionGroupIdIOS] DEFAULT ('') NOT NULL,
    [wsu_cSubscriptionIdIOS] varchar(128) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_WeSafeSubscription_wsu_cSubscriptionIdIOS] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_WeSafeSubscription] PRIMARY KEY CLUSTERED ([wsu_idKey] ASC)
);
GO
