IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[DeviceChannelPower] (
    [dcp_idKey] int NOT NULL,
    [dcp_iIdCta] int CONSTRAINT [DF_DeviceChannelPower_dcp_iIdCta] DEFAULT ((0)) NOT NULL,
    [dcp_cIMEI] varchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_DeviceChannelPower_dcp_cIMEI] DEFAULT ('') NOT NULL,
    [dcp_iChannel] int CONSTRAINT [DF_DeviceChannelPower_dcp_iChannel] DEFAULT ((0)) NOT NULL,
    [dcp_tDateTime] datetime2(3) NOT NULL,
    [dcp_nPowerWatts] decimal(9,3) NOT NULL,
    [dcp_nVoltage] decimal(6,2) NOT NULL,
    CONSTRAINT [PK_DeviceChannelPower] PRIMARY KEY CLUSTERED ([dcp_iIdCta] ASC, [dcp_iChannel] ASC, [dcp_tDateTime] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_DeviceChannelPower_IMEITs] ON [dbo].[DeviceChannelPower] ([dcp_iChannel] ASC, [dcp_nPowerWatts] ASC, [dcp_cIMEI] ASC, [dcp_tDateTime] ASC);
GO

CREATE NONCLUSTERED INDEX [UX_DeviceChannelPower_idKey] ON [dbo].[DeviceChannelPower] ([dcp_idKey] ASC);
GO
