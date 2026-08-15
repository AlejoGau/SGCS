IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[_RegistrosAEliminar] (
    [rae_idKey] int NOT NULL,
    [rae_cTabla] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rae_iID] int NOT NULL,
    CONSTRAINT [PK__RegistrosAEliminar] PRIMARY KEY CLUSTERED ([rae_idKey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC__RegistrosAEliminar_Iid] ON [dbo].[_RegistrosAEliminar] ([rae_iID] ASC);
GO

CREATE NONCLUSTERED INDEX [NC__RegistrosAEliminar_TablaID] ON [dbo].[_RegistrosAEliminar] ([rae_cTabla] ASC, [rae_iID] ASC);
GO
