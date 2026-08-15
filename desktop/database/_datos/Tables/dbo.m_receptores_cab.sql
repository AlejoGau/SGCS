IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_receptores_cab] (
    [rec_iid] int NOT NULL,
    [rec_cdescripcion] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_receptores_cab_rec_cdescripcion] DEFAULT ('') NOT NULL,
    [rec_cdll] varchar(50) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_receptores_cab_rec_cdll] DEFAULT ('') NOT NULL,
    [rec_ntcpip] numeric(1,0) CONSTRAINT [DF_m_receptores_cab_rec_ntcpip] DEFAULT ((2)) NOT NULL,
    [rec_iEsIRS] int CONSTRAINT [DF_m_receptores_cab_rec_iEsIRS] DEFAULT ((0)) NOT NULL,
    [rec_cConfig] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rec_iEsGPS] int CONSTRAINT [DF_m_receptores_cab_rec_iEsGPS] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_receptores_cab] PRIMARY KEY CLUSTERED ([rec_cdll] ASC)
);
GO

CREATE NONCLUSTERED INDEX [nc_rec_cdll] ON [dbo].[m_receptores_cab] ([rec_cdll] ASC, [rec_ntcpip] ASC, [rec_iEsIRS] ASC);
GO
