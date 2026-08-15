IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[DeviceCloudEvent] (
    [dce_idKey] int NOT NULL,
    [dce_iIdCta] int CONSTRAINT [DF_DeviceCloudEvent_dce_iIdCta] DEFAULT ((0)) NOT NULL,
    [dce_cIMEI] varchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_DeviceCloudEvent_dce_cIMEI] DEFAULT ('') NOT NULL,
    [dce_tDateTime] datetime2(3) NOT NULL,
    [dce_bConnected] bit NOT NULL,
    CONSTRAINT [PK_DeviceCloudEvent] PRIMARY KEY CLUSTERED ([dce_iIdCta] ASC, [dce_tDateTime] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_DeviceCloudEvent_IMEITs] ON [dbo].[DeviceCloudEvent] ([dce_bConnected] ASC, [dce_cIMEI] ASC, [dce_tDateTime] ASC);
GO

CREATE NONCLUSTERED INDEX [UX_DeviceCloudEvent_idKey] ON [dbo].[DeviceCloudEvent] ([dce_idKey] ASC);
GO
