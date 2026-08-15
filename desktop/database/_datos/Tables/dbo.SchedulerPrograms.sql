IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SchedulerPrograms] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [cuentaId] int NOT NULL,
    [eventos] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [eventogenerar] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [zonaiid] int NOT NULL,
    [usuarioiid] int NOT NULL,
    [programtype] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [starthour] int NOT NULL,
    [startminutes] int NOT NULL,
    [endhour] int NOT NULL,
    [endminutes] int NOT NULL,
    [dayofweek] int NOT NULL,
    [dayofmonth] int NOT NULL,
    [repitehoras] int NOT NULL,
    [repiteminutos] int NOT NULL,
    CONSTRAINT [PK_SchedulerPrograms] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
