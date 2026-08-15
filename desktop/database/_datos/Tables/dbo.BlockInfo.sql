IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[BlockInfo] (
    [blo_id] int NOT NULL,
    [blo_datetime] datetime NOT NULL,
    [blo_session_id] int NOT NULL,
    [blo_blocking_session_id] int NOT NULL,
    [blo_wait_time] int NOT NULL,
    [blo_wait_type] nvarchar(60) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [blo_last_wait_type] nvarchar(60) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [blo_wait_resource] nvarchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [blo_transaction_isolation_level] varchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [blo_lock_timeout] int NOT NULL,
    [blo_query_session] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [blo_query_blocking] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL
);
GO
