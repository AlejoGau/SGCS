IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_encuesta] (
    [enc_idkey] int NOT NULL,
    [enc_name] nvarchar(255) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [enc_descripcion] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [enc_status] int NOT NULL,
    CONSTRAINT [PK_p_encuesta] PRIMARY KEY CLUSTERED ([enc_idkey] ASC)
);
GO
