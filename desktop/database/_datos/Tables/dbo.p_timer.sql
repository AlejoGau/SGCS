IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_timer] (
    [tim_iid] int NOT NULL,
    [tim_tfechahora] datetime CONSTRAINT [DF_p_timer_tim_tfechahora] DEFAULT (getdate()) NOT NULL,
    [tim_iidcuenta] int CONSTRAINT [DF_p_timer_tim_iidcuenta] DEFAULT ((0)) NOT NULL,
    [tim_calarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_timer_tim_calarma] DEFAULT ('') NOT NULL,
    [tim_czona] char(10) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_timer_tim_czona] DEFAULT ('') NOT NULL,
    [tim_cusuario] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_timer_tim_cusuario] DEFAULT ('') NOT NULL,
    [tim_copnclo] char(1) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_timer_tim_copnclo] DEFAULT ('') NOT NULL,
    [tim_irecid] int CONSTRAINT [DF_p_timer_tim_irecid] DEFAULT ((0)) NOT NULL,
    [tim_cAlarmaAGenerar] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_timer_tim_cAlarmaAGenerar] DEFAULT ('') NOT NULL,
    [tim_iIdEventoNR] int CONSTRAINT [DF_p_timer_tim_iIdEventoNR] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_p_timer] PRIMARY KEY CLUSTERED ([tim_iid] ASC)
);
GO
