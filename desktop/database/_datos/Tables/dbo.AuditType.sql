IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[AuditType] (
    [AuditTypeID] int NOT NULL,
    [Name] varchar(20) COLLATE Modern_Spanish_CI_AS NOT NULL
);
GO
