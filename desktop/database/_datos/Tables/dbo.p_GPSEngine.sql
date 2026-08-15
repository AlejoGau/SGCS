IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_GPSEngine] (
    [gen_iId] int NOT NULL,
    [gen_iCta] int CONSTRAINT [DF_p_GPSEngine_gen_iCta] DEFAULT ((0)) NOT NULL,
    [gen_iStatus] int CONSTRAINT [DF_p_GPSEngine_gen_iStatus] DEFAULT ((0)) NOT NULL,
    [gen_tFechaHoraOn] datetime NOT NULL,
    [gen_iRecIdOn] int CONSTRAINT [DF_p_GPSEngine_gen_iRecIdOn] DEFAULT ((0)) NOT NULL,
    [gen_tFechaHoraOff] datetime NOT NULL,
    [gen_iRecIdOff] int CONSTRAINT [DF_p_GPSEngine_gen_iRecIdOff] DEFAULT ((0)) NOT NULL,
    CONSTRAINT [p_GPSEnginePK] PRIMARY KEY CLUSTERED ([gen_iId] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_EngineCta] ON [dbo].[p_GPSEngine] ([gen_iStatus] ASC, [gen_iCta] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EngineFechaOff] ON [dbo].[p_GPSEngine] ([gen_tFechaHoraOff] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_EngineFechaOn] ON [dbo].[p_GPSEngine] ([gen_tFechaHoraOn] ASC);
GO
