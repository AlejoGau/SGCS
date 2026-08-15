IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[TimerLimites] (
    [idKey] int NOT NULL,
    [idCta] int NOT NULL,
    [HoraLimite] datetime NOT NULL,
    [AlarmaGenerar] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [iStatus] int CONSTRAINT [DF_TimerLimites_iStatus] DEFAULT ((0)) NOT NULL,
    [tStatusExec] datetime NOT NULL,
    CONSTRAINT [PK_TimerLimites] PRIMARY KEY CLUSTERED ([idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_StatusLimite] ON [dbo].[TimerLimites] ([idKey] ASC, [idCta] ASC, [AlarmaGenerar] ASC, [iStatus] ASC, [HoraLimite] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_TimerLimitesCuentaHoraStatus] ON [dbo].[TimerLimites] ([idCta] ASC, [HoraLimite] ASC, [iStatus] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_TimerLimitesHora] ON [dbo].[TimerLimites] ([idCta] ASC, [HoraLimite] ASC);
GO
