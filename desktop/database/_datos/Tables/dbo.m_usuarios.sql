IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_usuarios] (
    [usu_iidcuenta] int NOT NULL,
    [usu_icodigo] int NOT NULL,
    [usu_cnombre] varchar(256) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_usuarios_usu_cnombre] DEFAULT ('') NOT NULL,
    [usu_iid] int NOT NULL,
    [usu_cclave] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_usuarios_usu_cclave] DEFAULT ('') NOT NULL,
    [usu_ntipo] numeric(1,0) CONSTRAINT [DF_m_usuarios_usu_ntipo] DEFAULT ((0)) NOT NULL,
    [usu_cimagen] varchar(60) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_usuarios_usu_cimagen] DEFAULT ('') NOT NULL,
    [usu_mobservacion] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_usuarios_usu_mobservacion] DEFAULT ('') NOT NULL,
    [usu_idKey] int NOT NULL,
    [usu_cIdExtendido] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_usuarios_usu_cIdExtendido] DEFAULT ('') NOT NULL,
    [usu_cmetadata] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [usu_teliid] int NOT NULL,
    [usu_cidentificacion] varchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [usu_itipoidentificacion] int NOT NULL,
    [usu_email] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_m_usuarios] PRIMARY KEY NONCLUSTERED ([usu_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_m_usuarios_CidextendidoIN] ON [dbo].[m_usuarios] ([usu_icodigo] ASC, [usu_cIdExtendido] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_m_usuarios_IidcuentaIidIN] ON [dbo].[m_usuarios] ([usu_cimagen] ASC, [usu_iidcuenta] ASC, [usu_iid] ASC);
GO
