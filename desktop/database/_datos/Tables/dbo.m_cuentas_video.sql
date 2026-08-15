IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_cuentas_video] (
    [cuv_iidCuenta] int NOT NULL,
    [cuv_clink] varchar(500) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_video_cuv_clink] DEFAULT ('') NOT NULL,
    [cuv_meventos] text COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_video_cuv_meventos] DEFAULT (' ') NOT NULL,
    [cuv_cLinkDSS] varchar(max) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_m_cuentas_video_cuv_clinkDSS] DEFAULT ('') NOT NULL,
    [cuv_idKey] int NOT NULL,
    [cuv_iVideoID] int NOT NULL,
    [cuv_rLatitud] real NOT NULL,
    [cuv_rLongitud] real NOT NULL,
    [cuv_cCameraName] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cuv_cCameraDesc] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cuv_iTodosLosEventos] int CONSTRAINT [DF_m_cuentas_video_cuv_iTodosLosEventos] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_m_cuentas_video] PRIMARY KEY CLUSTERED ([cuv_iidCuenta] ASC)
);
GO
