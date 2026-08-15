IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[GoogleGeocodingCache_Spatial] (
    [IdCache] int NOT NULL,
    [LatFloat] float NOT NULL,
    [LngFloat] float NOT NULL,
    CONSTRAINT [PK_GoogleGeocodingCache_Spatial] PRIMARY KEY CLUSTERED ([IdCache] ASC)
);
GO

CREATE NONCLUSTERED INDEX [IX_Spatial_Coords] ON [dbo].[GoogleGeocodingCache_Spatial] ([LatFloat] ASC, [LngFloat] ASC);
GO
