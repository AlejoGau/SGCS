IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_RXAcumulado] (
    [rxa_iId] int NOT NULL,
    [rxa_idCuenta] int CONSTRAINT [DF_p_RXAcumulado_rxa_idCuenta] DEFAULT ((0)) NOT NULL,
    [rxa_cAlarma] char(3) COLLATE Modern_Spanish_CI_AS CONSTRAINT [DF_p_RXAcumulado_rxa_cAlarma] DEFAULT ('') NOT NULL,
    [rxa_tFechaHora] smalldatetime CONSTRAINT [DF_p_RXAcumulado_rxa_tFechaHora] DEFAULT (getdate()) NOT NULL,
    [rxa_iExcHora] int CONSTRAINT [DF_p_RXAcumulado_rxa_iExcHora] DEFAULT ((0)) NOT NULL,
    [rxa_iExcDia] int CONSTRAINT [DF_p_RXAcumulado_rxa_iExcDia] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [PK_p_RXAcumulado] PRIMARY KEY CLUSTERED ([rxa_iId] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NCFechaIndex] ON [dbo].[p_RXAcumulado] ([rxa_tFechaHora] ASC);
GO
