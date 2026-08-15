IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_cuentas_drawing] (
    [drw_idkey] int NOT NULL,
    [drw_type] nvarchar(64) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [drw_cueiid] int NOT NULL,
    [drw_metadata] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [drw_descripcion] nvarchar(512) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_m_cuentas_drawing] PRIMARY KEY CLUSTERED ([drw_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [idx_mcuentasdrawing_cueiid] ON [dbo].[m_cuentas_drawing] ([drw_descripcion] ASC, [drw_type] ASC, [drw_cueiid] ASC);
GO
