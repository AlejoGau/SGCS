IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SV_Routes] (
    [svr_iid] int NOT NULL,
    [svr_iCuentaId] int NOT NULL,
    [svr_cName] nvarchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [svr_cDescripcion] nvarchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [svr_cRouteType] varchar(64) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [svr_dDateStart] datetime NOT NULL,
    [svr_iParallel] int NOT NULL,
    CONSTRAINT [PK__SV_Route__D8B36B42B6249003] PRIMARY KEY CLUSTERED ([svr_iid] ASC)
);
GO
