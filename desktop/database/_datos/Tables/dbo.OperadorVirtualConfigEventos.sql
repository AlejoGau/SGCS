IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[OperadorVirtualConfigEventos] (
    [ove_iOperadorVirtualConfigId] int NOT NULL,
    [ove_cEvento] char(3) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_OperadorVirtualConfigEventos] PRIMARY KEY CLUSTERED ([ove_iOperadorVirtualConfigId] ASC, [ove_cEvento] ASC),
    CONSTRAINT [FK_OperadorVirtualConfigEventos_Config] FOREIGN KEY ([ove_iOperadorVirtualConfigId]) REFERENCES [dbo].[OperadorVirtualConfig] ([ovc_idKey]) ON DELETE CASCADE
);
GO

CREATE NONCLUSTERED INDEX [NC_OperadorVirtualConfigEventos_Evento] ON [dbo].[OperadorVirtualConfigEventos] ([ove_iOperadorVirtualConfigId] ASC, [ove_cEvento] ASC);
GO
