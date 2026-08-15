IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_grabacion_mp4] (
    [grm_idKey] int NOT NULL,
    [grm_iidCuenta] int CONSTRAINT [DF_p_grabacion_mp4_grm_iidcuenta] DEFAULT ((0)) NOT NULL,
    [grm_iidRecepcion] int CONSTRAINT [DF_p_grabacion_mp4_grm_iidrecepcion] DEFAULT ((0)) NOT NULL,
    [grm_dFechaHora] datetime CONSTRAINT [DF_p_grabacion_mp4_grm_dfechahora] DEFAULT (getdate()) NOT NULL,
    [grm_cCarpeta] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_grabacion_mp4_grm_ccarpeta] DEFAULT ('') NOT NULL,
    [grm_cArchivo] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_grabacion_mp4_grm_carchivo] DEFAULT ('') NOT NULL,
    [grm_cTipo] varchar(20) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_grabacion_mp4_grm_cTipo] DEFAULT ('mp4') NOT NULL,
    CONSTRAINT [PK_p_grabacion_mp4] PRIMARY KEY CLUSTERED ([grm_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_p_grabacion_mp4_Iidrecepcion] ON [dbo].[p_grabacion_mp4] ([grm_iidRecepcion] ASC);
GO
