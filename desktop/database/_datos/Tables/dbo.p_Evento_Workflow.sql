IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[p_Evento_Workflow] (
    [pew_idkey] int NOT NULL,
    [pew_proceso_estados] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pew_name] nvarchar(125) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pew_evento_estados] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pew_dealers] nvarchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pew_codalarmas] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pew_codalarmagrupo] int NOT NULL,
    [pew_sql] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pew_config] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [pew_form_config] nvarchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_p_Evento_Workflow] PRIMARY KEY CLUSTERED ([pew_idkey] ASC)
);
GO
