IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[Audit] (
    [AuditID] int NOT NULL,
    [Table] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Column] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [OldValue] varchar(200) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [NewValue] varchar(200) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [UserID] nvarchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [Date] datetime NOT NULL,
    [Type] int NOT NULL,
    [InsertedAccountID] int NOT NULL,
    [DeletedAccountID] int NOT NULL
);
GO
