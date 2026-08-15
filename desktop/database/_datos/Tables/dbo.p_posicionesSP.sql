IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_posicionesSP] (
    [sp_iid] int NOT NULL,
    [sp_tfechahora] datetime NOT NULL,
    [sp_cIMEI] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sp_rLatitud] real NOT NULL,
    [sp_rLongitud] real NOT NULL,
    [sp_rAccuracy] real NOT NULL,
    [sp_iVelocidad] int NOT NULL,
    [sp_iRumbo] int NOT NULL,
    [sp_iOdometro] int NOT NULL,
    [sp_iBatt] int NOT NULL,
    [sp_iSecuencia] int NOT NULL,
    [sp_reciid] int NOT NULL,
    CONSTRAINT [PK_p_posicionesSP] PRIMARY KEY CLUSTERED ([sp_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_Date] ON [dbo].[p_posicionesSP] ([sp_tfechahora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_p_posicionesSP_CimeiTfechahora] ON [dbo].[p_posicionesSP] ([sp_cIMEI] ASC, [sp_tfechahora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_posicionesSP_IMEI] ON [dbo].[p_posicionesSP] ([sp_cIMEI] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_posicionesSP_RecIID] ON [dbo].[p_posicionesSP] ([sp_iid] ASC, [sp_tfechahora] ASC, [sp_cIMEI] ASC, [sp_rLatitud] ASC, [sp_rLongitud] ASC, [sp_rAccuracy] ASC, [sp_iVelocidad] ASC, [sp_iRumbo] ASC, [sp_iOdometro] ASC, [sp_iBatt] ASC, [sp_iSecuencia] ASC, [sp_reciid] ASC);
GO

CREATE NONCLUSTERED INDEX [nc_sp_cimei] ON [dbo].[p_posicionesSP] ([sp_cIMEI] ASC);
GO
