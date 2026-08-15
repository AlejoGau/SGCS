IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_encuesta_pregunta] (
    [epg_idkey] int NOT NULL,
    [epg_encidkey] int NOT NULL,
    [epg_name] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [epg_descripcion] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [epg_tipo] int NOT NULL,
    [epg_status] int NOT NULL,
    CONSTRAINT [PK_p_encuesta_pregunta] PRIMARY KEY CLUSTERED ([epg_idkey] ASC)
);
GO
