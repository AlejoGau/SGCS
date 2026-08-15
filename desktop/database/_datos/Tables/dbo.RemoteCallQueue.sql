IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[RemoteCallQueue] (
    [rcq_idkey] int NOT NULL,
    [rcq_estado] int NOT NULL,
    [rcq_tipo] nvarchar(50) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rcq_url] nvarchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rcq_result] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rcq_fechaprograma] datetime NOT NULL,
    [rcq_fechaalta] datetime NOT NULL,
    [rcq_fechamodificacion] datetime NOT NULL,
    [rcq_config] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_RemoteCallQueue] PRIMARY KEY CLUSTERED ([rcq_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [rcq_idx_search] ON [dbo].[RemoteCallQueue] ([rcq_estado] ASC, [rcq_tipo] ASC, [rcq_fechaprograma] ASC, [rcq_idkey] ASC, [rcq_url] ASC, [rcq_fechaalta] ASC, [rcq_fechamodificacion] ASC);
GO
