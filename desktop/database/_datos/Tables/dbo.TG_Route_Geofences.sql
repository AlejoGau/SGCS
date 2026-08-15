IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[TG_Route_Geofences] (
    [Id] int NOT NULL,
    [routeId] int NOT NULL,
    [geofenceid] int NOT NULL,
    [time] int NOT NULL,
    [beforetolerance] int NOT NULL,
    [aftertolerance] int NOT NULL,
    [order] int NOT NULL,
    CONSTRAINT [PK_TG_Route_Geofences] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE NONCLUSTERED INDEX [tg_route_geofences_id_geoid_order] ON [dbo].[TG_Route_Geofences] ([routeId] ASC, [geofenceid] ASC, [order] ASC);
GO
