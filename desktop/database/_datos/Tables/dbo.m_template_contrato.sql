IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_template_contrato] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tmp_asunto] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tmp_cuerpo] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tmp_metadata] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [tmp_iorganizacion] int NOT NULL,
    [tmp_itipo] int NOT NULL,
    CONSTRAINT [PK_m_template_contrato] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
