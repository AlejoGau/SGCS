IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_reportes_automaticos_dealer] (
    [rad_idKey] int NOT NULL,
    [rad_linidkey] int NOT NULL,
    [rad_ntipo] int NOT NULL,
    [rad_tproximoenvio] datetime NOT NULL,
    [rad_nfrecuencia] int NOT NULL,
    [rad_cmail] nvarchar(150) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [rad_idGrupo] int NOT NULL,
    [rad_nAlerta] int NOT NULL,
    CONSTRAINT [PK_m_reportes_automaticos_dealer] PRIMARY KEY CLUSTERED ([rad_idKey] ASC)
);
GO
