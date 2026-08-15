IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_PosicionesGPS] (
    [gps_iid] int NOT NULL,
    [gps_tfechahora] datetime CONSTRAINT [DF_p_PosicionesGPS_gps_tfechahora] DEFAULT (getdate()) NOT NULL,
    [gps_idCuenta] int CONSTRAINT [DF_p_PosicionesGPS_gps_idCuenta] DEFAULT ((0)) NOT NULL,
    [gps_idRec] int CONSTRAINT [DF_p_PosicionesGPS_gps_idRec] DEFAULT ((0)) NOT NULL,
    [gps_rLatitud] real CONSTRAINT [DF_p_PosicionesGPS_gps_rLatitud] DEFAULT ((0)) NOT NULL,
    [gps_rLongitud] real CONSTRAINT [DF_p_PosicionesGPS_gps_rLongitud] DEFAULT ((0)) NOT NULL,
    [gps_iRumbo] int CONSTRAINT [DF_p_PosicionesGPS_gps_iRumbo] DEFAULT ((0)) NOT NULL,
    [gps_tRawfechahora] datetime CONSTRAINT [DF_p_PosicionesGPS_gps_tRawfechahora] DEFAULT (getdate()) NOT NULL,
    [gps_iVelocidad] int CONSTRAINT [DF_p_PosicionesGPS_gps_iVelocidad] DEFAULT ((0)) NOT NULL,
    [gps_iOdometro] int CONSTRAINT [DF_p_PosicionesGPS_gps_iOdometro] DEFAULT ((0)) NOT NULL,
    [gps_cDireccion] varchar(300) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_PosicionesGPS_gps_cDireccion] DEFAULT ('') NOT NULL,
    [gps_cIMEI] varchar(128) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_PosicionesGPS_gps_cIMEI] DEFAULT ('') NOT NULL,
    [gps_rAccuracy] real CONSTRAINT [DF_p_PosicionesGPS_gps_rAccuracy] DEFAULT ((0)) NOT NULL,
    [gps_cMethod] varchar(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_PosicionesGPS_gps_cMethod] DEFAULT ('') NOT NULL,
    [gps_iBattery] int CONSTRAINT [DF_p_PosicionesGPS_gps_iBattery] DEFAULT ((0)) NOT NULL,
    [gps_iNivelSenial] int CONSTRAINT [DF_p_PosicionesGPS_gps_iNivelSenial] DEFAULT ((0)) NOT NULL,
    [gps_iSatelites] int CONSTRAINT [DF_p_PosicionesGPS_gps_iSatelites] DEFAULT ((0)) NOT NULL,
    [gps_iExtBattery] int CONSTRAINT [DF_p_PosicionesGPS_gps_iExtBattery] DEFAULT ((0)) NOT NULL,
    [gps_geopoint] [sys].[geography] NOT NULL,
    [gps_iFuel] int CONSTRAINT [DF_p_PosicionesGPS_gps_iFuel] DEFAULT ((0)) NOT NULL,
    [gps_iEngineStatus] int CONSTRAINT [DF_p_PosicionesGPS_gps_iEngineStatus] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_p_PosicionesGPS] PRIMARY KEY CLUSTERED ([gps_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [gps_idRec] ON [dbo].[p_PosicionesGPS] ([gps_cMethod] ASC, [gps_idRec] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_Date] ON [dbo].[p_PosicionesGPS] ([gps_tfechahora] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_IdRec] ON [dbo].[p_PosicionesGPS] ([gps_rLatitud] ASC, [gps_rLongitud] ASC, [gps_idRec] ASC);
GO

CREATE NONCLUSTERED INDEX [IX_RawDate] ON [dbo].[p_PosicionesGPS] ([gps_tRawfechahora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_IDCuentaGPS] ON [dbo].[p_PosicionesGPS] ([gps_iid] ASC, [gps_idCuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_PosicionesGPS_IdcuentaIvelocidadIN] ON [dbo].[p_PosicionesGPS] ([gps_tRawfechahora] ASC, [gps_idCuenta] ASC, [gps_iVelocidad] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_PosicionesGPS_IdcuentaTrawfechahoraIN] ON [dbo].[p_PosicionesGPS] ([gps_iVelocidad] ASC, [gps_idCuenta] ASC, [gps_tRawfechahora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_PosicionesGPS_IdrecIN] ON [dbo].[p_PosicionesGPS] ([gps_iOdometro] ASC, [gps_iSatelites] ASC, [gps_iNivelSenial] ASC, [gps_iBattery] ASC, [gps_cMethod] ASC, [gps_rAccuracy] ASC, [gps_cIMEI] ASC, [gps_cDireccion] ASC, [gps_geopoint] ASC, [gps_iVelocidad] ASC, [gps_tRawfechahora] ASC, [gps_iRumbo] ASC, [gps_rLongitud] ASC, [gps_rLatitud] ASC, [gps_idCuenta] ASC, [gps_tfechahora] ASC, [gps_iExtBattery] ASC, [gps_idRec] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_PosicionesGPS_Cuenta] ON [dbo].[p_PosicionesGPS] ([gps_idRec] ASC, [gps_rLatitud] ASC, [gps_rLongitud] ASC, [gps_cIMEI] ASC, [gps_rAccuracy] ASC, [gps_idCuenta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_PosicionesGPS_CuentaRaw] ON [dbo].[p_PosicionesGPS] ([gps_iid] ASC, [gps_idRec] ASC, [gps_rLatitud] ASC, [gps_rLongitud] ASC, [gps_iOdometro] ASC, [gps_idCuenta] ASC, [gps_tRawfechahora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_PosicionesGps_Imei_idRec] ON [dbo].[p_PosicionesGPS] ([gps_iid] ASC, [gps_tRawfechahora] ASC, [gps_cIMEI] ASC, [gps_idRec] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_PosicionesGPSDir] ON [dbo].[p_PosicionesGPS] ([gps_cDireccion] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_pposiciones_IID] ON [dbo].[p_PosicionesGPS] ([gps_iid] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_pPosicionesGPS_cDireccion] ON [dbo].[p_PosicionesGPS] ([gps_iid] ASC, [gps_idCuenta] ASC, [gps_rLatitud] ASC, [gps_rLongitud] ASC, [gps_cDireccion] ASC);
GO
