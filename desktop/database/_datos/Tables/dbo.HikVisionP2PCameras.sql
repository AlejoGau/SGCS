IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[HikVisionP2PCameras] (
    [hpc_idKey] int NOT NULL,
    [hpc_iSiteId] int CONSTRAINT [DF_HikVisionP2PCameras_hpc_iSiteId] DEFAULT ((0)) NOT NULL,
    [hpc_cDeviceSerial] varchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_HikVisionP2PCameras_hpc_cDeviceSerial] DEFAULT ('') NOT NULL,
    [hpc_iChannelNo] int CONSTRAINT [DF_HikVisionP2PCameras_hpc_iChannelNo] DEFAULT ((0)) NOT NULL,
    [hpc_cChannelName] varchar(255) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_HikVisionP2PCameras_hpc_cChannelName] DEFAULT ('') NOT NULL,
    [hpc_iStatus] int CONSTRAINT [DF_HikVisionP2PCameras_hpc_iStatus] DEFAULT ((0)) NOT NULL,
    [hpc_cIsShared] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_HikVisionP2PCameras_hpc_cIsShared] DEFAULT ('') NOT NULL,
    [hpc_bIsEncrypt] bit CONSTRAINT [DF_HikVisionP2PCameras_hpc_bIsEncrypt] DEFAULT ((0)) NOT NULL,
    [hpc_bIsDeleted] bit CONSTRAINT [DF_HikVisionP2PCameras_hpc_bIsDeleted] DEFAULT ((0)) NOT NULL,
    [hpc_tLastUpdated] datetime CONSTRAINT [DF_HikVisionP2PCameras_hpc_tLastUpdated] DEFAULT (getdate()) NOT NULL,
    [hpc_tCreatedDate] datetime CONSTRAINT [DF_HikVisionP2PCameras_hpc_tCreatedDate] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_HikVisionP2PCameras] PRIMARY KEY CLUSTERED ([hpc_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_HikVisionP2PCameras_DeviceSerial] ON [dbo].[HikVisionP2PCameras] ([hpc_iChannelNo] ASC, [hpc_cChannelName] ASC, [hpc_iStatus] ASC, [hpc_cIsShared] ASC, [hpc_bIsEncrypt] ASC, [hpc_cDeviceSerial] ASC);
GO
