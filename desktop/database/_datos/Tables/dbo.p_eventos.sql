IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_eventos] (
    [eve_cTerminal] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_eventos_eve_cTerminal] DEFAULT ('') NOT NULL,
    [eve_tFechaHora] smalldatetime CONSTRAINT [DF_p_eventos_eve_tFechaHora] DEFAULT (getdate()) NOT NULL,
    [eve_iidCuenta] int CONSTRAINT [DF_p_eventos_eve_iidCuenta] DEFAULT ((0)) NOT NULL,
    [eve_nEstado] numeric(1,0) CONSTRAINT [DF_p_eventos_eve_nEstado] DEFAULT ((0)) NOT NULL
);
GO

CREATE CLUSTERED INDEX [PK_p_eventos] ON [dbo].[p_eventos] ([eve_cTerminal] ASC);
GO
