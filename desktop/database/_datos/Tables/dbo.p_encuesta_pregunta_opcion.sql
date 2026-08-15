IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_encuesta_pregunta_opcion] (
    [epo_idkey] int NOT NULL,
    [epo_epgidkey] int NOT NULL,
    [epo_name] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [epo_descripcion] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [epo_status] int NOT NULL,
    [epo_tipo] int NOT NULL,
    [epo_values] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_encuesta_pregunta_opcion] PRIMARY KEY CLUSTERED ([epo_idkey] ASC)
);
GO
