IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[SV_Route_Programs] (
    [srp_iid] int NOT NULL,
    [srp_iRouteId] int NOT NULL,
    [srp_cProgramType] nvarchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [srp_iStartHour] int NOT NULL,
    [srp_iStartMinutes] int NOT NULL,
    [srp_iDayOfWeek] int NOT NULL,
    [srp_iDayOfMonth] int NOT NULL,
    CONSTRAINT [PK__SV_Route__1F2FEEDD1E753B3F] PRIMARY KEY CLUSTERED ([srp_iid] ASC)
);
GO
