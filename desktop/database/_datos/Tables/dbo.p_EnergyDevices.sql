IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_EnergyDevices] (
    [ped_idKey] int NOT NULL,
    [ped_idCta] int CONSTRAINT [DF_p_EnergyDevices_crx_iRecId] DEFAULT ((0)) NOT NULL,
    [ped_cUri] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ped_cDeviceID] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ped_cLabel] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ped_cName] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [ped_tCreatedAt] datetime NOT NULL,
    [ped_iVarCount] int NOT NULL,
    [ped_cLastActivity] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_EnergyDevices] PRIMARY KEY CLUSTERED ([ped_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_EnergyDevicesCta] ON [dbo].[p_EnergyDevices] ([ped_idCta] ASC);
GO
