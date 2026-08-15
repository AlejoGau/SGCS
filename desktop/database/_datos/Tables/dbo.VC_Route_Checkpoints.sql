IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[VC_Route_Checkpoints] (
    [Id] int NOT NULL,
    [routeId] int NOT NULL,
    [checkpointId] int NOT NULL,
    [time] int NOT NULL,
    [beforetolerance] int NOT NULL,
    [aftertolerance] int NOT NULL,
    [order] int NOT NULL
);
GO

CREATE NONCLUSTERED INDEX [NC_VC_Route_Checkpoints] ON [dbo].[VC_Route_Checkpoints] ([routeId] ASC, [checkpointId] ASC, [time] ASC, [beforetolerance] ASC, [aftertolerance] ASC, [order] ASC);
GO

CREATE CLUSTERED INDEX [PK_VC_Route_Checkpoints] ON [dbo].[VC_Route_Checkpoints] ([Id] ASC);
GO
