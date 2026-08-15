IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[AccountLPRCamerasDestination] (
    [SourceAccountID] int NOT NULL,
    [DestinationCameraAccountID] int NOT NULL,
    CONSTRAINT [PK_AccountLPRCamerasDestination] PRIMARY KEY CLUSTERED ([SourceAccountID] ASC, [DestinationCameraAccountID] ASC)
);
GO
