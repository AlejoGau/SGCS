IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_heartbeats] (
    [hbs_iid] int NOT NULL,
    [hbs_tfechahora] datetime CONSTRAINT [DF_p_heartbeats_hbs_tfechahora] DEFAULT (getdate()) NOT NULL,
    [hbs_ipuerto] int CONSTRAINT [DF_p_heartbeats_hbs_ipuerto] DEFAULT ((0)) NOT NULL,
    [hbs_cIMEI] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_heartbeats_hbs_cIMEI] DEFAULT ('') NOT NULL,
    [hbs_cCorteLinea] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_heartbeats_hbs_cCorteLinea] DEFAULT ('') NOT NULL,
    [hbs_cEntDigital] char(2) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_heartbeats_hbs_cEntDigital] DEFAULT ('') NOT NULL,
    [hbs_nNivel] numeric(4,0) CONSTRAINT [DF_p_heartbeats_hbs_nNivel] DEFAULT ((0)) NOT NULL,
    [hbs_cInfoExtra] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_heartbeats_hbs_cInfoExtra] DEFAULT ('') NOT NULL,
    [hbs_iConexion] int CONSTRAINT [DF_p_heartbeats_hbs_iConexion] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_p_heartbeats] PRIMARY KEY CLUSTERED ([hbs_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_HB_IMEILinea] ON [dbo].[p_heartbeats] ([hbs_iid] ASC, [hbs_ipuerto] ASC, [hbs_cIMEI] ASC, [hbs_cCorteLinea] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_HB_PuertoFecha] ON [dbo].[p_heartbeats] ([hbs_ipuerto] ASC, [hbs_tfechahora] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_HB_PuertoIMEIConexion] ON [dbo].[p_heartbeats] ([hbs_ipuerto] ASC, [hbs_cIMEI] ASC, [hbs_iConexion] ASC);
GO
