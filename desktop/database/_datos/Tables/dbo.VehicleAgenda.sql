IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[VehicleAgenda] (
    [vea_idKey] int NOT NULL,
    [vea_cDomain] varchar(128) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_VehicleAgenda_vea_cDomain] DEFAULT ('') NOT NULL,
    [vea_dtExecution] datetime CONSTRAINT [DF_VehicleAgenda_vea_dtExecution] DEFAULT (getdate()) NOT NULL,
    [vea_cAction] char(5) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_VehicleAgenda_vea_cAction] DEFAULT ('BLACK') NOT NULL,
    [vea_iProcessed] int CONSTRAINT [DF_VehicleAgenda_vea_iProcessed] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_VehicleAgenda] PRIMARY KEY CLUSTERED ([vea_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_vea_PendingEvents] ON [dbo].[VehicleAgenda] ([vea_cDomain] ASC, [vea_cAction] ASC, [vea_dtExecution] ASC);
GO
