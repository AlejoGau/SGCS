IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[VC_Route_Programs] (
    [Id] int NOT NULL,
    [routeId] int NOT NULL,
    [programtype] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [starthour] int NOT NULL,
    [startminutes] int NOT NULL,
    [dayofweek] int NOT NULL,
    [dayofmonth] int NOT NULL,
    CONSTRAINT [PK_VC_Route_Programs_Id] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_VC_Route_Programs_routeId] ON [dbo].[VC_Route_Programs] ([programtype] ASC, [starthour] ASC, [startminutes] ASC, [dayofweek] ASC, [dayofmonth] ASC, [routeId] ASC);
GO
