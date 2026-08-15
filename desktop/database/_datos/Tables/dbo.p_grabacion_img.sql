IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_grabacion_img] (
    [gri_iid] int NOT NULL,
    [gri_iidcuenta] int CONSTRAINT [DF_p_grabacion_img_gri_iidcuenta] DEFAULT ((0)) NOT NULL,
    [gri_iidrecepcion] int CONSTRAINT [DF_p_grabacion_img_gri_iidrecepcion] DEFAULT ((0)) NOT NULL,
    [gri_dfechahora] datetime CONSTRAINT [DF_p_grabacion_img_gri_dfechahora] DEFAULT (getdate()) NOT NULL,
    [gri_ccarpeta] varchar(200) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_grabacion_img_gri_ccarpeta] DEFAULT ('') NOT NULL,
    [gri_carchivo] varchar(200) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_grabacion_img_gri_carchivo] DEFAULT ('') NOT NULL,
    [gri_ioperador] int CONSTRAINT [DF_p_grabacion_img_gri_ioperador] DEFAULT ((0)) NOT NULL,
    [gri_cTerminal] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_grabacion_img_gri_cTerminal] DEFAULT ('') NOT NULL,
    CONSTRAINT [PK_p_grabacion_img] PRIMARY KEY CLUSTERED ([gri_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_GrabacionImg_idcuenta_idrec] ON [dbo].[p_grabacion_img] ([gri_iid] ASC, [gri_dfechahora] ASC, [gri_ccarpeta] ASC, [gri_carchivo] ASC, [gri_ioperador] ASC, [gri_cTerminal] ASC, [gri_iidcuenta] ASC, [gri_iidrecepcion] ASC);
GO
