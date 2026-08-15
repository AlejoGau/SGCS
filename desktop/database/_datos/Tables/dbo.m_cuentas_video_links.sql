IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_cuentas_video_links] (
    [cvl_iidCuenta] int NOT NULL,
    [cvl_calarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_video_links_cvl_calarma] DEFAULT ('') NOT NULL,
    [cvl_czona] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_video_links_cuv_czona] DEFAULT ('') NOT NULL,
    [cvl_clink] varchar(500) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_video_links_cuv_clink] DEFAULT ('') NOT NULL,
    [cvl_cLinkDSS] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_video_links_cvl_clinkDSS] DEFAULT ('') NOT NULL,
    [cvl_idKey] int NOT NULL,
    [cvl_iVideoID] int NOT NULL,
    [cvl_rLatitud] real NOT NULL,
    [cvl_rLongitud] real NOT NULL,
    [cvl_cCameraName] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cvl_cCameraDesc] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cuv_iTodosLosEventos] int CONSTRAINT [DF_m_cuentas_video_links_cvl_iTodosLosEventos] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_cuentas_video_links] PRIMARY KEY NONCLUSTERED ([cvl_idKey] ASC)
);
GO

CREATE CLUSTERED INDEX [IX_m_cuentas_video_links] ON [dbo].[m_cuentas_video_links] ([cvl_iidCuenta] ASC, [cvl_calarma] ASC, [cvl_czona] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_m_cuentas_video_links_Ivideoid] ON [dbo].[m_cuentas_video_links] ([cvl_iVideoID] ASC);
GO
