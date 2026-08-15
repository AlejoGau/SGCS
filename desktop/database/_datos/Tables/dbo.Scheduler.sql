IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Scheduler] (
    [Id] int NOT NULL,
    [Name] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [template] int NOT NULL,
    [limitdate] datetime NOT NULL,
    [status] int NOT NULL,
    [lastchange] datetime NOT NULL,
    [config] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [eventid] int NOT NULL,
    [eventtype] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [condition] varchar(254) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sql] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [idCuenta] int NOT NULL,
    [iRoute] int NOT NULL,
    [rLatitud] real NOT NULL,
    [rLongitud] real NOT NULL,
    [idUsuario] int NOT NULL,
    [cZona] varchar(5) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [result] varchar(254) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [programId] int CONSTRAINT [DF_Scheduler_programId] DEFAULT ((0)) NOT NULL,
    [startdate] datetime NOT NULL,
    CONSTRAINT [PK_Scheduler] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_scheduller_repeated_program] ON [dbo].[Scheduler] ([template] ASC, [limitdate] ASC, [status] ASC, [eventtype] ASC, [idCuenta] ASC, [iRoute] ASC, [idUsuario] ASC, [cZona] ASC, [programId] ASC);
GO

CREATE NONCLUSTERED INDEX [nc_scheduller_st_temp_date] ON [dbo].[Scheduler] ([idCuenta] ASC, [status] ASC, [template] ASC, [limitdate] ASC);
GO

CREATE NONCLUSTERED INDEX [NC_scheduller_type_route] ON [dbo].[Scheduler] ([Id] ASC, [eventtype] ASC, [iRoute] ASC);
GO
