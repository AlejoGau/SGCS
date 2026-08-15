IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_grabacion_audio] (
    [gra_iid] int NOT NULL,
    [gra_iidcuenta] int CONSTRAINT [DF_p_grabacion_audio_gra_iidcuenta] DEFAULT ((0)) NOT NULL,
    [gra_iidrecepcion] int CONSTRAINT [DF_p_grabacion_audio_gra_iidrecepcion] DEFAULT ((0)) NOT NULL,
    [gra_dfechahora] datetime CONSTRAINT [DF_p_grabacion_audio_gra_dfechahora] DEFAULT (getdate()) NOT NULL,
    [gra_carchivo] varchar(100) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_grabacion_audio_gra_carchivo] DEFAULT ('') NOT NULL,
    [gra_nduracion] numeric(10,2) CONSTRAINT [DF_p_grabacion_audio_gra_nduracion] DEFAULT ((0)) NOT NULL,
    [gra_ioperador] int CONSTRAINT [DF_p_grabacion_audio_gra_ioperador] DEFAULT ((0)) NOT NULL,
    [gra_cTerminal] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_grabacion_audio_gra_cTerminal] DEFAULT ('') NOT NULL,
    [gra_iidLlamado] int CONSTRAINT [DF_p_grabacion_audio_gra_iidLlamado] DEFAULT ((0)) NOT NULL,
    [gra_nestado] numeric(1,0) NOT NULL,
    [gra_ctelefono] varchar(30) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_grabacion_audio] PRIMARY KEY CLUSTERED ([gra_iid] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_GrabacionAudioIdCta] ON [dbo].[p_grabacion_audio] ([gra_iid] ASC, [gra_iidcuenta] ASC);
GO
