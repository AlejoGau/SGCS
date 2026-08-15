IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_RXLogDep] (
    [rxl_iId] int NOT NULL,
    [rxl_iRecId] int NOT NULL,
    [rxl_cLog] varchar(1000) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rxl_cDll] char(2) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rxl_cEvento] varchar(10) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rxl_cLineCard] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL
);
GO

CREATE CLUSTERED INDEX [CI_RXLogDep] ON [dbo].[p_RXLogDep] ([rxl_iId] ASC);
GO
