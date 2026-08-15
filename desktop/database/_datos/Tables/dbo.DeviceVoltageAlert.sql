IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[DeviceVoltageAlert] (
    [dva_idKey] int NOT NULL,
    [dva_iIdCta] int CONSTRAINT [DF_DeviceVoltageAlert_dva_iIdCta] DEFAULT ((0)) NOT NULL,
    [dva_cIMEI] varchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_DeviceVoltageAlert_dva_cIMEI] DEFAULT ('') NOT NULL,
    [dva_iChannel] int CONSTRAINT [DF_DeviceVoltageAlert_dva_iChannel] DEFAULT ((0)) NOT NULL,
    [dva_tDateTime] datetime2(3) NOT NULL,
    [dva_bUnder] int NOT NULL,
    [dva_nVoltage] decimal(6,2) NOT NULL,
    [dva_iSwitch] int NOT NULL,
    [dva_iRefId] int NOT NULL,
    CONSTRAINT [PK_DeviceVoltageAlert] PRIMARY KEY CLUSTERED ([dva_iIdCta] ASC, [dva_iChannel] ASC, [dva_tDateTime] ASC, [dva_bUnder] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_DeviceVoltageAlert_IMEITs] ON [dbo].[DeviceVoltageAlert] ([dva_iChannel] ASC, [dva_bUnder] ASC, [dva_nVoltage] ASC, [dva_cIMEI] ASC, [dva_tDateTime] ASC);
GO

CREATE NONCLUSTERED INDEX [UX_DeviceVoltageAlert_idKey] ON [dbo].[DeviceVoltageAlert] ([dva_idKey] ASC);
GO
