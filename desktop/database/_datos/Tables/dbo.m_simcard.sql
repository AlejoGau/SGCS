IF SCHEMA_ID(N'dbo') IS NULL
    EXEC('CREATE SCHEMA [dbo]');
GO

CREATE TABLE [dbo].[m_simcard] (
    [sim_idkey] int NOT NULL,
    [sim_cuenta] int NOT NULL,
    [sim_apn] int NOT NULL,
    [sim_csid] int NOT NULL,
    [sim_fecha_activacion] datetime NOT NULL,
    [sim_iccid] varchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sim_marca] int NOT NULL,
    [sim_estado] int NOT NULL,
    [sim_codigo] nvarchar(100) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sim_observaciones] varchar(500) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sim_ClaveMaster] char(6) COLLATE Modern_Spanish_CI_AS NOT NULL,
    [sim_udw_idKey] int NOT NULL,
    CONSTRAINT [PK__m_simcar__19B0CFAD452F34FF] PRIMARY KEY CLUSTERED ([sim_idkey] ASC)
);
GO

CREATE NONCLUSTERED INDEX [NC_SimcardCCID] ON [dbo].[m_simcard] ([sim_iccid] ASC);
GO
