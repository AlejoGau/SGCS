IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_llaves] (
    [lla_idkey] int NOT NULL,
    [lla_cdescripcion] nvarchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [lla_cnumero] nvarchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [lla_cubicacion] nvarchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [lla_responsable] nvarchar(128) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [lla_iidcuenta] int NOT NULL,
    CONSTRAINT [PK_m_llaves] PRIMARY KEY CLUSTERED ([lla_idkey] ASC)
);
GO
