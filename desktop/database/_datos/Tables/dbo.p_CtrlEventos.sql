IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_CtrlEventos] (
    [cte_iId] int NOT NULL,
    [cte_iCta] int CONSTRAINT [DF_p_CtrlEventos_cte_iCta] DEFAULT ((0)) NOT NULL,
    [cte_cLog] text COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cte_tFechaHora] smalldatetime CONSTRAINT [DF_p_CtrlEventos_cte_tFechaHora] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_p_CtrlEventos] PRIMARY KEY CLUSTERED ([cte_iId] ASC)
);
GO

CREATE NONCLUSTERED INDEX [CtrlEventosCta] ON [dbo].[p_CtrlEventos] ([cte_iCta] ASC);
GO
