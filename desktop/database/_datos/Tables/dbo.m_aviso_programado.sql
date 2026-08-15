IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_aviso_programado] (
    [Id] int NOT NULL,
    [Name] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [prg_from] varchar(256) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [prg_to] varchar(1024) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [prg_estado] int NOT NULL,
    [prg_gateway] varchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [prg_objecttypeid] int NOT NULL,
    [prg_objectid] int NOT NULL,
    [prg_prgdatetime] datetime NOT NULL,
    [prg_enviodatetime] datetime NOT NULL,
    [prg_mensaje] varchar(max) COLLATE Modern_Spanish_CI_AS NOT NULL,
    CONSTRAINT [PK_m_aviso_programado] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO
