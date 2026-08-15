IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_GpsSP] (
    [gps_iid] int NOT NULL,
    [gps_cIMEI] varchar(128) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_GpsSP_gps_cIMEI] DEFAULT ('') NOT NULL,
    [gps_tfechahora] datetime CONSTRAINT [DF_p_GpsSP_gps_tfechahora] DEFAULT (getdate()) NOT NULL,
    [gps_idCuenta] int CONSTRAINT [DF_p_GpsSP_gps_idCuenta] DEFAULT ((0)) NOT NULL,
    [gps_idRec] int CONSTRAINT [DF_p_GpsSP_gps_idRec] DEFAULT ((0)) NOT NULL,
    [gps_rLatitud] real CONSTRAINT [DF_p_GpsSP_gps_rLatitud] DEFAULT ((0)) NOT NULL,
    [gps_rLongitud] real CONSTRAINT [DF_p_GpsSP_gps_rLongitud] DEFAULT ((0)) NOT NULL,
    [gps_iVelocidad] int CONSTRAINT [DF_p_GpsSP_gps_iVelocidad] DEFAULT ((0)) NOT NULL,
    [gps_iOdometro] int CONSTRAINT [DF_p_GpsSP_gps_iOdometro] DEFAULT ((0)) NOT NULL,
    [gps_iRumbo] int CONSTRAINT [DF_p_GpsSP_gps_iRumbo] DEFAULT ((0)) NOT NULL,
    [gps_cDireccion] varchar(300) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_GpsSP_gps_cDireccion] DEFAULT ('') NOT NULL,
    [gps_tRawfechahora] datetime CONSTRAINT [DF_p_GpsSP_gps_tRawfechahora] DEFAULT (getdate()) NOT NULL,
    [gps_rAccuracy] real CONSTRAINT [DF_p_GpsSP_gps_rAccuracy] DEFAULT ((0)) NOT NULL,
    [gps_cMethod] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_GpsSP_gps_cMethod] DEFAULT ('') NOT NULL,
    [gps_iBattery] int CONSTRAINT [DF_p_GpsSP_gps_iBattery] DEFAULT ((0)) NOT NULL,
    [gps_iNivelSenial] int CONSTRAINT [DF_p_GpsSP_gps_iNivelSenial] DEFAULT ((0)) NOT NULL,
    [gps_iSatelites] int CONSTRAINT [DF_p_GpsSP_gps_iSatelites] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_p_GpsSP] PRIMARY KEY CLUSTERED ([gps_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_GpsSP_CtaLatLng] ON [dbo].[p_GpsSP] ([gps_idCuenta] ASC, [gps_rLatitud] ASC, [gps_rLongitud] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_GpsSPIMEI] ON [dbo].[p_GpsSP] ([gps_iid] ASC, [gps_cIMEI] ASC);
GO
