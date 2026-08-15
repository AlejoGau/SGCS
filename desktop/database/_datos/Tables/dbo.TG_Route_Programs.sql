IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[TG_Route_Programs] (
    [Id] int NOT NULL,
    [routeId] int NOT NULL,
    [programtype] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [starthour] int NOT NULL,
    [startminutes] int NOT NULL,
    [dayofweek] int NOT NULL,
    [dayofmonth] int NOT NULL,
    CONSTRAINT [PK_TG_Route_Programs] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [tg_route_programs_routeid_type] ON [dbo].[TG_Route_Programs] ([routeId] ASC, [programtype] ASC);
GO
