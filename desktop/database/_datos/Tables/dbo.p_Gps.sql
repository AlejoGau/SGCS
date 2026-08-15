IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_Gps] (
    [gps_iid] int NOT NULL,
    [gps_tfechahora] datetime CONSTRAINT [DF_p_Gps_gps_tfechahora] DEFAULT (getdate()) NOT NULL,
    [gps_idCuenta] int CONSTRAINT [DF_p_Gps_gps_idCuenta] DEFAULT ((0)) NOT NULL,
    [gps_idRec] int CONSTRAINT [DF_p_Gps_gps_idRec] DEFAULT ((0)) NOT NULL,
    [gps_rLatitud] real CONSTRAINT [DF_p_Gps_gps_rLatitud] DEFAULT ((0)) NOT NULL,
    [gps_rLongitud] real CONSTRAINT [DF_p_Gps_gps_rLongitud] DEFAULT ((0)) NOT NULL,
    [gps_iVelocidad] int CONSTRAINT [DF_p_GPS_gps_iVelocidad] DEFAULT ((0)) NOT NULL,
    [gps_iOdometro] int CONSTRAINT [DF_p_GPS_gps_iOdometro] DEFAULT ((0)) NOT NULL,
    [gps_iRumbo] int CONSTRAINT [DF_p_GPS_gps_iRumbo] DEFAULT ((0)) NOT NULL,
    [gps_cDireccion] varchar(300) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_GPS_gps_cDireccion] DEFAULT ('') NOT NULL,
    [gps_tRawfechahora] datetime CONSTRAINT [DF_p_GPS_gps_tRawfechahora] DEFAULT (getdate()) NOT NULL,
    [gps_cIMEI] varchar(128) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_Gps_gps_cIMEI] DEFAULT ('') NOT NULL,
    [gps_rAccuracy] real CONSTRAINT [DF_p_Gps_gps_rAccuracy] DEFAULT ((0)) NOT NULL,
    [gps_cMethod] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_Gps_gps_cMethod] DEFAULT ('') NOT NULL,
    [gps_iBattery] int CONSTRAINT [DF_p_Gps_gps_iBattery] DEFAULT ((0)) NOT NULL,
    [gps_iNivelSenial] int CONSTRAINT [DF_p_Gps_gps_iNivelSenial] DEFAULT ((0)) NOT NULL,
    [gps_iSatelites] int CONSTRAINT [DF_p_Gps_gps_iSatelites] DEFAULT ((0)) NOT NULL,
    [gps_iExtBattery] int CONSTRAINT [DF_p_Gps_gps_iExtBattery] DEFAULT ((0)) NOT NULL,
    [gps_iFuel] int CONSTRAINT [DF_p_Gps_gps_iFuel] DEFAULT ((0)) NOT NULL,
    [gps_iEngineStatus] int CONSTRAINT [DF_p_Gps_gps_iEngineStatus] DEFAULT ((3)) NOT NULL,
    CONSTRAINT [PK_p_Gps] PRIMARY KEY CLUSTERED ([gps_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_GPS_idRec] ON [dbo].[p_Gps] ([gps_idRec] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_IDCtaIMEIGPS] ON [dbo].[p_Gps] ([gps_iid] ASC, [gps_idCuenta] ASC, [gps_cIMEI] ASC);
GO
