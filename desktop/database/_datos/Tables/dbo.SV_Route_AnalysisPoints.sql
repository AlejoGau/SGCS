IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SV_Route_AnalysisPoints] (
    [sra_iid] int NOT NULL,
    [sra_iRouteId] int NOT NULL,
    [sra_iAnalysisPointId] int NOT NULL,
    [sra_iOrder] int NOT NULL,
    [sra_cReference] char(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sra_cCameraType] nvarchar(20) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sra_iCameraRefId] int NOT NULL,
    [sra_cConfig] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK__SV_Route__560D73A503711E54] PRIMARY KEY CLUSTERED ([sra_iid] ASC)
);
GO
