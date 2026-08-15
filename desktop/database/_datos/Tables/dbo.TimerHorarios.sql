IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[TimerHorarios] (
    [idKey] int NOT NULL,
    [idCta] int NOT NULL,
    [DOW] int NOT NULL,
    [HoraAntes] datetime NOT NULL,
    [HoraDespues] datetime NOT NULL,
    [AlarmaAntes] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [AlarmaDespues] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Tipo] char(2) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [GeneraNYO] char(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [GeneraNYC] char(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [AutoProcesaNYO] char(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [AutoProcesaNYC] char(1) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_TimerHorarios] PRIMARY KEY CLUSTERED ([idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_TimerHorarioCuentaHoras] ON [dbo].[TimerHorarios] ([idCta] ASC, [HoraAntes] ASC, [HoraDespues] ASC, [Tipo] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_TimerHorarioDOW] ON [dbo].[TimerHorarios] ([idCta] ASC, [DOW] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_TimerHorarios_GNYCHoraDTipo] ON [dbo].[TimerHorarios] ([idCta] ASC, [GeneraNYC] ASC, [HoraDespues] ASC, [Tipo] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_TimerHorarios_IdctDoTipIN] ON [dbo].[TimerHorarios] ([HoraAntes] ASC, [HoraDespues] ASC, [AlarmaAntes] ASC, [AlarmaDespues] ASC, [AutoProcesaNYC] ASC, [idCta] ASC, [DOW] ASC, [Tipo] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_TimerHorarios_TipoGNYOHoraD] ON [dbo].[TimerHorarios] ([idCta] ASC, [HoraAntes] ASC, [Tipo] ASC, [GeneraNYO] ASC, [HoraDespues] ASC);
GO
